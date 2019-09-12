import { Component } from '@angular/core';

import { Platform, NavController, ActionSheetController, LoadingController } from '@ionic/angular';
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
  public appPages = [
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
      title: 'About',
      url: '/about',
      icon: 'information'
    },
  ];

  //  config = {
  //   apiKey: "AIzaSyCp6W8icwH_NZx68FvF52kxnul5tAB5bCw",
  //   authDomain: "testapp-69214.firebaseapp.com",
  //   databaseURL: "https://testapp-69214.firebaseio.com",
  //   projectId: "testapp-69214",
  //   storageBucket: "",
  //   messagingSenderId: "95615464314",
  //   appId: "1:95615464314:web:7e82b908f0f6773f755cc3"
  // };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl:NavController,
    public actionSheetCtrl:ActionSheetController,
    public loadingCtrl:LoadingController,
    public appService:AppService,
    public firebaseService:FirebaseServiceService
  ) {
    this.initializeApp();
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
          this.navCtrl.navigateRoot('login');
          unsubscribe();
        } else {
          if (user.emailVerified) {
            this.navCtrl.navigateRoot('home');
            // this.rootPage = TestPage;
          } else {
            this.navCtrl.navigateRoot('login');
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
              this.navigateToPage('login')
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
