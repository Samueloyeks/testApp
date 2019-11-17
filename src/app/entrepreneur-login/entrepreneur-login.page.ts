import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirebaseServiceService } from '../firebase-service.service';
import { AppService } from '../app.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase'

@Component({
  selector: 'app-entrepreneur-login',
  templateUrl: './entrepreneur-login.page.html',
  styleUrls: ['./entrepreneur-login.page.scss'],
})
export class EntrepreneurLoginPage implements OnInit {


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


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  logIn(form: NgForm) {
    const loginData = {
      "email": form.value.email,
      "password":form.value.password
    }; 
    console.log(loginData)

    this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Processing...'
    }).then(loadingElement => { 
      loadingElement.present();
      this.FirebaseService.loginUserService(form.value.email, form.value.password).then(async (authData: any) => {
        firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}`).once('value', async userProfileSnapshot => {
          console.log(userProfileSnapshot.val());

          this.userData = userProfileSnapshot.val();

          console.log(authData.user);
          if (authData.user.emailVerified) {

            if(this.userData.userType == 'ENTREPRENEUR'){
              this.appService.storeLocalData('userData',JSON.stringify({
                "firstName": this.userData.firstName,
                "lastName": this.userData.lastName,
                "email": this.userData.email,
                "phoneNumber": this.userData.phoneNumber,
                "userType" : this.userData.userType
              }))
              console.log('ENTREPRENEUR');

              this.navCtrl.navigateRoot('home');

            }else if(this.userData.userType == 'INVESTOR'){
              // this.appService.storeLocalData('userData',JSON.stringify({
              //   "firstName": this.userData.firstName,
              //   "lastName": this.userData.lastName,
              //   "email": this.userData.email,
              //   "phoneNumber": this.userData.phoneNumber,
              //   "userType" : this.userData.userType
              // }))
              // console.log('INVESTOR');

              // this.navCtrl.navigateRoot('terms');
              this.loadingCtrl.dismiss()
              this.customPresentAlert('No entrepreneur account with these details','Error')

            }
  
          } else {
            this.loadingCtrl.dismiss();
            this.router.navigateByUrl('/login');
            const Alert = await this.alertCtrl.create({
              message: 'Please verify email first',
              buttons: [
                { text: 'Ok', role: 'cancel' },
              ]
            });
            Alert.present();
          }
     
        });

      }, async error => {
        this.loadingCtrl.dismiss();
        let toast = await this.toastCtrl.create({
          message: "Sorry You're not registered",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    })
  }

  ngOnInit() {
  }

  navigateToPage(destination) {
    this.router.navigateByUrl(destination);
  }
  navigateToForgotPassword() {
    this.router.navigateByUrl('/reset-password');
  }

  async customPresentAlert(message, submessage) {
    const alert = await this.alertCtrl.create({
      message: message,
      subHeader: submessage,
      buttons: ["OK"]
    });
    await alert.present();
  }

}
