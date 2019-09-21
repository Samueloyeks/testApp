import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseServiceService } from './firebase-service.service';
import * as firebase from 'firebase';
import { InvestmentModalPageModule } from './investment-modal/investment-modal.module';


export const  config = {
  apiKey: "AIzaSyCp6W8icwH_NZx68FvF52kxnul5tAB5bCw",
  authDomain: "testapp-69214.firebaseapp.com",
  databaseURL: "https://testapp-69214.firebaseio.com",
  projectId: "testapp-69214",
  storageBucket: "",
  messagingSenderId: "95615464314",
  appId: "1:95615464314:web:7e82b908f0f6773f755cc3"
};
firebase.initializeApp(config);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    InvestmentModalPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
