import { Component, OnInit, NgZone } from '@angular/core';
import { AppService } from '../app.service';
import { LoadingController, MenuController, ActionSheetController, Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  userData;
  firstName;
  lastName
  email;

  constructor(public appService:AppService,public loadingCtrl:LoadingController,public menu:MenuController,
    public zone:NgZone, public actionSheetCtrl:ActionSheetController,public events:Events,public router:Router) {
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
        this.events.publish('userData',this.userData)
      })
    })
    }

  ngOnInit() {
  }

  navigateToPage(destination) {
    this.router.navigateByUrl(destination);
  }

}
