import { Component,OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController
} from '@ionic/angular';
import {  FormGroup, } from '@angular/forms';
import { FirebaseServiceService } from '../firebase-service.service';
// import { HomePage } from '../home/home';
import { EmailValidator } from '../validators/email';
import { NgForm } from '@angular/forms';


// @IonicPage()
@Component({
  // selector: 'page-reset-password',
  // templateUrl: 'reset-password.html',
  // providers: [FirebaseServiceProvider]

  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  public resetPasswordForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public FirebaseService: FirebaseServiceService,
  ) {

  }

 async resetPassword(form:NgForm){
    const resetPasswordData = {
      "email": form.value.email,
    }; 
    console.log(resetPasswordData);
   this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Processing...'
    }).then(loadingElement => { 
      loadingElement.present();
       try {
         this.FirebaseService.resetPassword(form.value.email).then(async ()=>{
          this.loadingCtrl.dismiss();
          const alert =  await this.alertCtrl.create({
            message: 'Check your inbox for a password reset link',
            buttons: [
              { text: 'Cancel', role: 'cancel' },
              {
                text: 'Ok',
                handler: data => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
         })
      } catch (error){
         this.loadingCtrl.dismiss().then(async()=>{
          const alert =  await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await alert.present();
         })
      }
    })
  }

}

