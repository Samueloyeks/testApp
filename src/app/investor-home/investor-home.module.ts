import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvestorHomePage } from './investor-home.page';
import { InvestmentModalPageModule } from '../investment-modal/investment-modal.module';


const routes: Routes = [
  {
    path: '',
    component: InvestorHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // InvestmentModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvestorHomePage]
})
export class InvestorHomePageModule {}
