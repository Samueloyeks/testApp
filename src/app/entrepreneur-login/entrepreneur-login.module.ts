import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EntrepreneurLoginPage } from './entrepreneur-login.page';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurLoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntrepreneurLoginPage]
})
export class EntrepreneurLoginPageModule {}
