import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  returnedpath :string = ""
  constructor(public fileChooser: FileChooser, public filePath: FilePath) {
  }

  ngOnInit() {
  }

  chooseFile() {
    this.fileChooser.open().then((fileuri) => {
      this.filePath.resolveNativePath(fileuri).then((resolvedPath) => {
        this.returnedpath = resolvedPath
      })
    })
  }


}
