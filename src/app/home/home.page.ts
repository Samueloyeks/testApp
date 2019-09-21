import { Component, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { AppService } from '../app.service';
import { LoadingController, ActionSheetController, Events, MenuController } from '@ionic/angular';

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
  constructor(public appService:AppService,public loadingCtrl:LoadingController,public menu:MenuController,
    public zone:NgZone, public actionSheetCtrl:ActionSheetController,public events:Events) {
    this.getLocallyStoredUserData();
    this.loadingCtrl.getTop().then(v => v ? this.loadingCtrl.dismiss() : null);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
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
        this.events.publish('userData',this.userData)
      })
    })
    }

    async presentActionSheet() {
      const actionSheet = await this.actionSheetCtrl.create({
        // title: 'Are you sure you want to Log out?',
        buttons: [
          {text: 'Contact via phone' },
          {text: 'Email' },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
       actionSheet.present();
    }

}
