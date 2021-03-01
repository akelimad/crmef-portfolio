import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: "Fiche d'identité", url: '/home', icon: 'person-circle' },
    { title: "Planification", url: '/planification', icon: 'document' },
    { title: "Gestion", url: '/gestion', icon: 'cog' },
  ];
  constructor() {}
}
