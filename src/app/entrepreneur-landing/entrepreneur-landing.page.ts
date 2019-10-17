import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-entrepreneur-landing',
  templateUrl: './entrepreneur-landing.page.html',
  styleUrls: ['./entrepreneur-landing.page.scss'],
})
export class EntrepreneurLandingPage implements OnInit {

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
  constructor(public menuCtrl: MenuController,private router:Router) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  navigateToPage(destination) {
    this.router.navigateByUrl(destination);
  }
}
