import { Component,OnInit } from '@angular/core';
import {  NavController, NavParams, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import { FirebaseServiceService } from '../firebase-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../validators/email';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    throw new Error("Method not implemented.");
  }
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  passwordType2: string = 'password';
  passwordShown2: boolean = false;
  login;

  constructor(formBuilder: FormBuilder, public menuCtrl: MenuController, public firebaseService: FirebaseServiceService,public router:Router,
    public FirebaseService: FirebaseServiceService, public navCtrl: NavController,
    public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.login = "Login";
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.signupForm = formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
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

  async logIn(): Promise<void> {
    var that = this;

    if (!this.loginForm.valid) {
      const Alert = await this.alertCtrl.create({
        message: 'Please enter email and password',
        buttons: [
          { text: 'Ok', role: 'cancel' },
        ]
      });
      Alert.present();
    } else {
      var loader = await this.loadingCtrl.create({
        message: "Please Wait..."
      });
      loader.present();

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

       this.FirebaseService.loginUserService(email, password).then(async (authData: any) => {
        console.log(authData.user);
        if (authData.user.emailVerified) {
          loader.dismiss();
          this.router.navigateByUrl('/home');

        } else {
          loader.dismiss();
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
        loader.dismiss();
        let toast = await this.toastCtrl.create({
          message: "Sorry You're not registered",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }
  }
  async signUp(): Promise<void> {
    var account = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,

    };

    console.log(account);
    if (!this.signupForm.valid) {
      const Alert = await this.alertCtrl.create({
        message: 'Please complete form',
        buttons: [
          { text: 'Ok', role: 'cancel' },
        ]
      });
      Alert.present();
      console.log(
        `Form is not valid yet, current value: ${this.signupForm.value}`
      );
    } else {
      var loader = await this.loadingCtrl.create({ message: "Please wait..." });
      loader.present();
      this.FirebaseService.signupUserService(account).then(async () => {
        loader.dismiss().then(() => {
          this.router.navigateByUrl('/login');
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
      loader.dismiss();
      //unable to log in
      let toast = await this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    };
  }

  }
  navigateToForgotPassword() {
    this.router.navigateByUrl('/reset-password');
  }

}
