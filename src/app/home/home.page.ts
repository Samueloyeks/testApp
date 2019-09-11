import { Component, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { AppService } from '../app.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData;
  firstName;
  lastName
  email;
  constructor(public appService:AppService,public loadingCtrl:LoadingController,public zone:NgZone) {
    this.getLocallyStoredUserData();
    this.loadingCtrl.getTop().then(v => v ? this.loadingCtrl.dismiss() : null);
  }


  getLocallyStoredUserData() {
    this.zone.run(()=>{
      this.appService.getLocalStorage("userData").then(data => {
        console.log("HOME PAGE - PASSENGER DATA");
        console.log(JSON.parse(data.value));
        this.userData = JSON.parse(data.value);
        this.firstName = this.userData.firstName;
        this.lastName = this.userData.lastName;
        this.email = this.userData.email;
      })
    })
    }

}
