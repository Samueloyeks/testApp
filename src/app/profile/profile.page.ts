import { Component, OnInit, NgZone } from '@angular/core';
import { AppService } from '../app.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  userData;
  firstName;
  lastName
  email;
  phoneNumber;
  userType;
  
  constructor(public appService:AppService,public loadingCtrl:LoadingController,public zone:NgZone) { 
    this.getLocallyStoredUserData();
  }

  ngOnInit() {
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
        this.phoneNumber = this.userData.phoneNumber;
        this.userType = this.userData.userType;
      })
    })
    }

}
