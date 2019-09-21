import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController, Events, PopoverController, AlertController, MenuController } from '@ionic/angular';
import { AppService } from '../app.service';
import { ModalController } from '@ionic/angular';
import { InvestmentModalPage } from '../investment-modal/investment-modal.page';
import { OverlayEventDetail } from '@ionic/core';
import { FirebaseServiceService } from '../firebase-service.service';



@Component({
  selector: 'app-investor-home',
  templateUrl: './investor-home.page.html',
  styleUrls: ['./investor-home.page.scss'],
})
export class InvestorHomePage implements OnInit {

  userData;
  firstName;
  lastName;
  email;
  phoneNumber;
  userType;

  investments

  constructor(public loadingCtrl:LoadingController, public zone:NgZone,public alertCtrl:AlertController,public menu:MenuController,
     public appService:AppService,public events:Events, public modalController: ModalController,public firebaseService:FirebaseServiceService) { 
    this.getLocallyStoredUserData();
    this.loadingCtrl.getTop().then(v => v ? this.loadingCtrl.dismiss() : null);

    this.firebaseService.getInvestments()

    this.zone.run(()=>{
      this.events.subscribe('investments',investments=>{
        console.log(investments)
        this.investments = investments
      })
    })
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
  }


  getLocallyStoredUserData() {
    this.zone.run(()=>{
      this.appService.getLocalStorage("userData").then(data => {
        console.log(JSON.parse(data.value));
        this.userData = JSON.parse(data.value);
        this.firstName = this.userData.firstName;
        this.lastName = this.userData.lastName;
        this.email = this.userData.email;
        this.phoneNumber = this.userData.phoneNumber;
        this.userType = this.userData.userType
        this.events.publish('userData',this.userData)
      })
    })
    }

    async openModal() {
      const modal: HTMLIonModalElement =
         await this.modalController.create({
            component: InvestmentModalPage,
      });
       
      modal.onDidDismiss().then((data: OverlayEventDetail) => {
         if (data.data) {
           console.log('The result:', data);
           this.presentLoader('Adding Investment...')
           this.firebaseService.addInvestment(data.data).then(()=>{
             this.customPresentAlert('Investment added successfully','Done')
             this.loadingCtrl.dismiss()
           })
         }else{
          // this.loadingCtrl.dismiss()
         }
         
      });
      
      await modal.present();
  }

  async presentLoader(message) {
    const loading = await this.loadingCtrl.create({
      spinner: "dots",
      message: message
    });
    await loading.present();
  }
  
  async customPresentAlert(message, submessage) {
    const alert = await this.alertCtrl.create({
      message: message,
      subHeader: submessage,
      buttons: ["OK"]
    });
    await alert.present();
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
