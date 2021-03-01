import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanificationPageRoutingModule } from './planification-routing.module';

import { PlanificationPage } from './planification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanificationPageRoutingModule
  ],
  declarations: [PlanificationPage]
})
export class PlanificationPageModule {}
