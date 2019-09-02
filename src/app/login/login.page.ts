import { Component,OnInit } from '@angular/core';
import {  NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import { FirebaseServiceService } from '../firebase-service.service';
import { FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../validators/email';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// import { ServiceListPage } from '../service-list/service-list';
// import { TabsPage } from '../tabs/tabs';
// import { TestPage } from '../test/test';

// @IonicPage()
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  login;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  passwordType2: string = 'password';
  passwordShown2: boolean = false;


  constructor(public menuCtrl: MenuController, public firebaseService: FirebaseServiceService,public router:Router,
    public FirebaseService: FirebaseServiceService, public navCtrl: NavController,
     public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
      this.login = "Login";

  }



  public togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'string';
    }
  }
  public togglePassword2() {
    if (this.passwordShown2) {
      this.passwordShown2 = false;
      this.passwordType2 = 'password';
    } else {
      this.passwordShown2 = true;
      this.passwordType2 = 'string';
    }
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
        console.log(authData.user);
        if (authData.user.emailVerified) {
          this.loadingCtrl.dismiss();
          this.router.navigateByUrl('/home');

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
  signUp(form:NgForm){
    const account = {
      "firstName":form.value.firstName,
      "lastName":form.value.lastName,
      "email": form.value.email,
      "password":form.value.password
    }; 
    console.log(account)
    this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Processing...'
    }).then(loadingElement => { 
      loadingElement.present();
      this.FirebaseService.signupUserService(account).then(async () => {
        this.loadingCtrl.dismiss().then(() => {
          this.router.navigateByUrl('/home');
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

  navigateToForgotPassword() {
    this.router.navigateByUrl('/reset-password');
  }

}
