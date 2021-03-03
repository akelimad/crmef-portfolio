import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from './file';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private storage: SQLiteObject;
  filesList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'crmef_portfolio.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchFiles(): Observable<File[]> {
    return this.filesList.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getFiles();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getFiles() {
    return this.storage.executeSql('SELECT * FROM files', []).then(res => {
      let items: File[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            title: res.rows.item(i).title,
            ref: res.rows.item(i).ref,
            link: res.rows.item(i).link,
          });
        }
      }
      this.filesList.next(items);
    });
  }

  // Add
  addFile(title, ref, link) {
    return this.storage.executeSql('INSERT INTO files (title, ref, link) VALUES (?, ?, ?)', [title, ref, link])
      .then(res => {
        this.getFiles();
      });
  }

  // Get single files
  getFile(ref) {
    return this.storage.executeSql("SELECT * FROM files WHERE ref = ?", [ref])
    .then(res => {
      return res.rows.length
    }).catch(error => alert("Error occured while getting file :" + error));
  }

  // Update
  updateFile(id, song: File) {
    let data = [song.id, song.title];
    return this.storage.executeSql(`UPDATE files SET title = ? WHERE id = ${id}`, data)
      .then(data => {
        this.getFiles();
      })
  }

  // Delete
  deleteFile(id) {
    return this.storage.executeSql('DELETE FROM files WHERE id = ?', [id])
      .then(_ => {
      this.getFiles();
    });
  }

}
