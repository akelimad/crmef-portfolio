import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DatabaseService } from './../services/database.service'
import { AlertController } from '@ionic/angular';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  Data: any[] = []
  returnedpath :string = ""
  constructor(
    public fileChooser: FileChooser, 
    public filePath: FilePath,
    public databseService: DatabaseService,
    public alertController: AlertController,
    public previewAnyFile: PreviewAnyFile,
  ) {

  }

  ngOnInit() {
    this.databseService.dbState().subscribe((res) => {
      if (res) {
        this.databseService.fetchFiles().subscribe(item => {
          this.Data = item
        })
      }
    });
  }

  chooseFile() {
    this.databseService.getFile("CV").then(response => {
      if (response > 0) {
        this.showAlert("Vous avez déjà attaché votre CV, vuillez le supprimer pour pouvoir l'attacher à nouveau.")
      } else {
        this.callChooseFile()
      }
    });
  }

  callChooseFile() {
    this.fileChooser.open().then((fileuri) => {
      this.filePath.resolveNativePath(fileuri).then((resolvedPath) => {
        this.returnedpath = resolvedPath
        this.databseService.addFile("Mon CV", "CV", resolvedPath)
      })
    })
  }

  deleteFile(id) {
    this.databseService.deleteFile(id).then(async (res) => {
      this.showAlert("Le fichier a bien été supprimé")
    })
  }

  showAlert(msg) {
    this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  showAddButton(){
    return true
    let results = this.databseService.getFile("CV")
  }

  previwPdfFile(url) {
    this.previewAnyFile.preview(url).then((response) => {

    }, (error) => {
      alert(JSON.stringify(error))
    })
  }


}
