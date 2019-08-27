import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

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
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

   config = {
    apiKey: "AIzaSyBRVn9lTeETnhNgJfa-mH2QTUMkSkI0krw",
    authDomain: "testapp-3f14a-69aa7.firebaseapp.com",
    databaseURL: "https://testapp-3f14a-69aa7.firebaseio.com",
    projectId: "testapp-3f14a",
    storageBucket: "",
    messagingSenderId: "730596614351",
    appId: "1:730596614351:web:ff039809f83b4547"
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl:NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
    firebase.initializeApp(this.config);
    this.platform.ready().then(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (!user) {
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
}
