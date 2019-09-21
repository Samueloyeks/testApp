import { Component, OnInit} from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FirebaseServiceService } from '../firebase-service.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-investor-signup',
  templateUrl: './investor-signup.page.html',
  styleUrls: ['./investor-signup.page.scss'],
})
export class InvestorSignupPage implements OnInit {

  constructor(public loadingCtrl:LoadingController, public FirebaseService:FirebaseServiceService,
     public appService:AppService, public router:Router, public alertCtrl:AlertController, public toastCtrl:ToastController) { }

  ngOnInit() {
  }


  signUp(form:NgForm){
    const account = {
      "firstName":form.value.firstName,
      "lastName":form.value.lastName,
      "email": form.value.email,
      "phoneNumber": form.value.phoneNumber,
      "password":form.value.password,
      "userType": "INVESTOR"
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
            "email": form.value.email
          }))
          this.router.navigateByUrl('/investor-home');
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
}
