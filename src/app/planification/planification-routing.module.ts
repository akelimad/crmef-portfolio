import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanificationPage } from './planification.page';

const routes: Routes = [
  {
    path: '',
    component: PlanificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanificationPageRoutingModule {}
