import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router) { }

  public storeLocalData(storeName: string, storeValue: any) {
    console.log('storing '+storeName+' in storage');
    Plugins.Storage.set({key: storeName, value: storeValue});
  }

  /**
   * getLocalStorage
   */
  public getLocalStorage(storageName: string) {
    console.log('getting '+storageName+' from storage');
    return Plugins.Storage.get({key: storageName});
  }

  /**
   * deleteLocalStorage
   */
  public deleteLocalStorage(storageName: string) {
    console.log('deleting '+storageName+' from storage');
    Plugins.Storage.remove({key: storageName});
  }

  public navigateToPage(destination) {
    this.router.navigateByUrl(destination);
  }

}
