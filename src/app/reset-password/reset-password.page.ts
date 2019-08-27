import { Component,OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from '../firebase-service.service';
// import { HomePage } from '../home/home';
import { EmailValidator } from '../validators/email';

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
    throw new Error("Method not implemented.");
  }
  public resetPasswordForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public FirebaseService: FirebaseServiceService,
    formBuilder: FormBuilder
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  async resetPassword(): Promise<void> {
    if (!this.resetPasswordForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.resetPasswordForm.value}`
      );
    } else {
      const loading = await this.loadingCtrl.create();
      loading.present();

      const email = this.resetPasswordForm.value.email;

      try {
        await this.FirebaseService.resetPassword(email);
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
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
      } catch (error) {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      }
    }
  }
}

