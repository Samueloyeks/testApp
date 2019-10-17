import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvestorLandingPage } from './investor-landing.page';

const routes: Routes = [
  {
    path: '',
    component: InvestorLandingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvestorLandingPage]
})
export class InvestorLandingPageModule {}
