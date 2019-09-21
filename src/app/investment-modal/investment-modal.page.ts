import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-investment-modal',
  templateUrl: './investment-modal.page.html',
  styleUrls: ['./investment-modal.page.scss'],
})
export class InvestmentModalPage implements OnInit {

  countries = [
    'Nigeria',
    'America',
    'Canada',
    'Estonia',
    'United kingdom',
  ]

  sectors = [
    'Agriculture',
    'Music',
    'Art',
    'Sports',
    'Fashion Design',
  ]

  budgets = [
    '₦5000 - ₦10,000',
    '₦11,000 - ₦20,000',
    '₦21,000 - ₦30,000',
    '₦31,000 - ₦40,000',
    '₦41,000 - ₦50,000',
    '₦51,000 - ₦60,000',
    '₦61,000 - ₦70,000',
    '₦71,000 - ₦80,000',
    '₦81,000 - ₦90,000'
  ]
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }


  // async myDismiss() {
  //   const result: Date = new Date();


    
  //   await this.modalCtrl.dismiss(result);
  // }

  async submitForm(form:NgForm){
    if(form){
      const data = {
        name:form.value.name,
        country:form.value.country,
        sector: form.value.sector,
        budget:form.value.budget
      }
  
      console.log(data);
      await this.modalCtrl.dismiss(data);
    }else{
      await this.modalCtrl.dismiss();

    }


    
  }
}
