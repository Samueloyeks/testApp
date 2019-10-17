import { Component,OnInit } from '@angular/core';
import {  NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import { FirebaseServiceService } from '../firebase-service.service';
import { FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../validators/email';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppService } from '../app.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-entrepreneur-signup',
  templateUrl: './entrepreneur-signup.page.html',
  styleUrls: ['./entrepreneur-signup.page.scss'],
})
export class EntrepreneurSignupPage implements OnInit {

  login;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  passwordType2: string = 'password';
  passwordShown2: boolean = false;
  userData;

  constructor(public menuCtrl: MenuController, public firebaseService: FirebaseServiceService,public router:Router,
    public FirebaseService: FirebaseServiceService, public navCtrl: NavController,
     public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public toastCtrl: ToastController,public appService: AppService) {
      this.login = "Login";

  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  signUp(form:NgForm){
    const account = {
      "firstName":form.value.firstName,
      "lastName":form.value.lastName,
      "email": form.value.email,
      "phoneNumber": form.value.phoneNumber,
      // "password":form.value.password,
      "userType": "ENTREPRENEUR"
    }; 
    console.log(account)
    this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Processing...'
    }).then(loadingElement => { 
      loadingElement.present();
      this.FirebaseService.signupUserService(account).then(async () => {
        this.loadingCtrl.dismiss().then(() => {
          this.appService.storeLocalData('userData',JSON.stringify({
            "firstName":form.value.firstName,
            "lastName":form.value.lastName,
            "email": form.value.email,
            "phoneNumber": form.value.phoneNumber,
            "userType" : "ENTREPRENEUR"
          }))
          this.router.navigateByUrl('/terms');
        })
        const Alert = await this.alertCtrl.create({
          message: 'A confirmation email has been sent to your email address',
          buttons: [
            // { text: 'Cancel', role: 'cancel' },
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        });
        Alert.present();
      }),
    async error => {
      this.loadingCtrl.dismiss();
      //unable to log in
      let toast = await this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    };

    })
  }


  navigateToPage(destination) {
    this.router.navigateByUrl(destination);
  }
  navigateToForgotPassword() {
    this.router.navigateByUrl('/reset-password');
  }

}
