import { Component, OnInit, NgZone } from '@angular/core';
import { log } from 'util';
import { FirebaseServiceService } from '../firebase-service.service';
import { LoadingController, Events } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-select-interests',
  templateUrl: './select-interests.page.html',
  styleUrls: ['./select-interests.page.scss'],
})
export class SelectInterestsPage implements OnInit {

  userData;
  firstName;
  lastName
  email;

  testList: any = [
    {testID: 1, testName: " Science and Technology", checked: false,icon:'../../assets/icon/technology.svg'},
    {testID: 2, testName: " Arts", checked: false,icon:'../../assets/icon/art.svg'},
    {testID: 3, testName: "Entertainment", checked: false,icon:'../../assets/icon/entertainment.svg',},
    {testID: 4, testName: "Sports", checked: false,icon:'../../assets/icon/sports.svg'},
    {testID: 5, testName: "Agriculture", checked: false,icon:'../../assets/icon/agriculture.svg'}
 ]

selectedArray :any = [];

  constructor(public firebaseService:FirebaseServiceService,public events:Events,public appService:AppService,
    public loadingCtrl:LoadingController,public router:Router,public zone:NgZone,) {
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

  submitSelections(){
    console.log(this.selectedArray)
    let interestsArr = []
    for(let i=0;i<this.selectedArray.length;i++){
      interestsArr.push(this.selectedArray[i].testName)
    }
    let interestsObj = Object.assign({}, interestsArr);
    console.log(interestsObj);
    this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Processing...'
    }).then(loadingElement=>{
      loadingElement.present();
      this.firebaseService.addInterests(interestsObj).then(()=>{
        console.log(this.userData)
        let data = this.firebaseService.getUserData()
        console.log(data)
        // if(this.userData.userType == 'INVESTOR'){
        //   this.navigateToPage('/investor-home')
        // }else if(this.userData.userType == 'ENTREPRENEUR'){
          this.navigateToPage('/investor-home')
        // }
      })

    })
  }

  navigateToPage(destination) {
    this.router.navigateByUrl(destination);
  }
   
  selectMember(data){
   if (data.checked == false) {
      this.selectedArray.push(data);
    } else {
     let newArray = this.selectedArray.filter(function(el) {
       return el.testID !== data.testID;
    });
     this.selectedArray = newArray;
   }
   console.log(this.selectedArray);
  }
  ngOnInit() {
  }

}
