import { Component, NgZone } from '@angular/core';

import { Platform, NavController, ActionSheetController, LoadingController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { AppService } from './app.service';
import { FirebaseServiceService } from './firebase-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];

  //  config = {
  //   apiKey: "AIzaSyCp6W8icwH_NZx68FvF52kxnul5tAB5bCw",
  //   authDomain: "testapp-69214.firebaseapp.com",
  //   databaseURL: "https://testapp-69214.firebaseio.com",
  //   projectId: "testapp-69214",
  //   storageBucket: "",
  //   messagingSenderId: "95615464314",
  //   appId: "1:95615464314:web:7e82b908f0f6773f755cc3"
  // };

  userData;
  firstName;
  lastName
  email;
  phoneNumber;
  userType;

  entrepreneurArr = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Portfolio',
      url: '/portfolio',
      icon: 'briefcase'
    },
    {
      title: 'Investment History',
      url: '/investment-history',
      icon: 'logo-usd'
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Support',
      url: '/about',
      icon: 'information'
    },
    {
      title: "What's on Your Mind?",
      url: '/support',
      icon: 'call'
    },
    {
      title: "Chats",
      url: '/chats',
      icon: 'chatbubbles'
    },
  ]
  investorArr = [
    {
      title: 'Home',
      url: '/investor-home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Investment Profile',
      url: '/investment-profile',
      icon: 'briefcase'
    },
    {
      title: 'My Investments',
      url: '/investments',
      icon: 'cash'
    },
    {
      title: 'Companies I Follow',
      url: '/companies',
      icon: 'globe'
    },
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl:NavController,
    public actionSheetCtrl:ActionSheetController,
    public loadingCtrl:LoadingController,
    public appService:AppService,
    public firebaseService:FirebaseServiceService,
    public zone:NgZone,
    public events:Events

  ) {
    this.initializeApp();
    this.getLocallyStoredUserData()
    this.events.subscribe('userData',(userData)=>{
      this.userData = userData;
      this.firstName = this.userData.firstName;
      this.lastName = this.userData.lastName;
      this.email = this.userData.email;
      this.phoneNumber = this.userData.phoneNumber;
      this.userType = this.userData.userType;
    })
  }

  ngAfterViewInit(){
   this.getLocallyStoredUserData()
  }

  initializeApp() { 
    this.platform.ready().then(() => {
    });
    // firebase.initializeApp(this.config);
    this.platform.ready().then(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (!user) {
          console.log('going to login page');
          
          // this.rootPage = LoginPage;
          // this.navCtrl.navigateRoot('select-interests');
          this.navCtrl.navigateRoot('landing');
          unsubscribe();
        } else {

          if (user.emailVerified) {
            if(this.userType == 'ENTREPRENEUR'){
              this.zone.run(()=>{
                console.log('ENTREPRENEUR');
                this.appPages = this.entrepreneurArr
                
                this.navCtrl.navigateRoot('home');
              })

            }else if(this.userType == 'INVESTOR'){
              this.zone.run(()=>{
                console.log('INVESTOR');
                this.appPages = this.investorArr
  
                this.navCtrl.navigateRoot('investor-home');
              })

            }
            
          } else {
            console.log('cannot get user type')
            this.navCtrl.navigateRoot('landing');
          }
          unsubscribe();
        }
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async presentActionSheet(){
    this.actionSheetCtrl.create({
      header: 'Are you sure you want to Log out?',
      buttons: [
        {
          text: 'Yes',
          icon: 'log-out',
          handler: () => {
            this.presentLoader('Logging out...').then(()=>{
              this.firebaseService.logoutUserService();
              this.appService.deleteLocalStorage("userData")
              this.navigateToPage('landing')
            }).then(()=>{
              this.loadingCtrl.dismiss();

            })
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then((actionSheet)=>{
      actionSheet.present();
    })
    
  }

  getLocallyStoredUserData() {
    this.zone.run(()=>{
      this.appService.getLocalStorage("userData").then(data => {
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

  navigateToPage(destination) {
    this.appService.navigateToPage(destination);
  }

  async presentLoader(message) {
    const loading = await this.loadingCtrl.create({
      spinner: "dots",
      message: message
    });
    await loading.present();
  }


}
