import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';
// import 'rxjs/add/operator/map';


/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: "root"
})
export class FirebaseServiceService {
  public data: any;
  public fireAuth: any;
  public userProfile: any;
  public userOccupation: any;
  public serviceList: any;


  allInvestments = [];
  constructor(public events:Events) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('userProfile');
  }

  loginUserService(email: string, password: string): Promise<void> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUserService(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    return firebase.auth().signOut();
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  signupUserService(account: {}): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(account['email'], account['password']).then(newUserCredentials => {
      firebase.database().ref(`/userProfile/` + newUserCredentials.user.uid).set(account).then(() => {
        firebase.auth().currentUser.sendEmailVerification();
        //Email sent
      });
    })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  addInvestment(data){
   return this.userProfile.child(`${firebase.auth().currentUser.uid}`).child('investmentProfile').push(data)
  }

  addInterests(data){
    return this.userProfile.child(`${firebase.auth().currentUser.uid}`).child('interests').push(data)
  }

  getUserData(){
     this.userProfile.child(`${firebase.auth().currentUser.uid}`).once('value',data=>{
      console.log(data.val())
      return data.val()
    })
  }

  getInvestments(){
    let temp
    this.userProfile.child(`${firebase.auth().currentUser.uid}`).child('investmentProfile').on('value',data=>{
      console.log(data.val())
      this.allInvestments = []
      temp = data.val();
      for (var tempkey in temp) {
        this.allInvestments.push(temp[tempkey]);
      }
      this.events.publish('investments',this.allInvestments)
    })
  }


}
