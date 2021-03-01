import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'planification',
    loadChildren: () => import('./planification/planification.module').then( m => m.PlanificationPageModule)
  },
  {
    path: 'gestion',
    loadChildren: () => import('./gestion/gestion.module').then( m => m.GestionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
