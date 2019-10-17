import { Component, OnInit, ViewChild } from '@angular/core';
import {IonSlides, MenuController} from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-investor-landing',
  templateUrl: './investor-landing.page.html',
  styleUrls: ['./investor-landing.page.scss'],
})
export class InvestorLandingPage implements OnInit {
  @ViewChild(IonSlides,{static:false}) slides: IonSlides;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
  constructor(public menuCtrl: MenuController,private router:Router) { }

  ngOnInit(){
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  
  navigateToPage(destination) {
    this.router.navigateByUrl(destination);
  }
}
