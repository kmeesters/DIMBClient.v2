import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ObjectProvider } from '../../providers';

/**
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {
  private isBackMode: boolean = true;
  private isFlashLightOn: boolean = false;
  private scanSub: any;

  objectcode: { qrcode: string} = {
    qrcode: ''
  }
  type: any;
  
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public QRScanner: QRScanner,
    public toastCtrl: ToastController,
    public objectPrv: ObjectProvider) {
}

  ionViewWillEnter(){
    this.showCamera();
    // Optionally request the permission early
    this.QRScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('Camera Permission Given');

          // start scanning
          this.scanSub = this.QRScanner.scan().subscribe((text: string) => {
            //this.presentToast(text);
            this.objectcode.qrcode =  text;
          });

          // show camera preview
          this.QRScanner.show();

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log('Camera permission denied');
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  submitCode() {
    this.objectPrv.gettype(this.objectcode)
      .subscribe((resp) => {
      //if found
      console.log(resp);
      //capitizalize the first letter for navigation page
      var targetPage = resp[0]['type'].charAt(0).toUpperCase() + resp[0]['type'].slice(1);
      this.navCtrl.push(targetPage+'DetailPage', {
          item: this.objectcode
        });
    }, (err) => {
      //if error
      let toast = this.toastCtrl.create({
        message: "Code is not valid",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  closeModal() {
    this.viewController.dismiss();
  }

  toggleFlashLight(){

    /** Default isFlashLightOn is false ,
     * enable it if false **/

    this.isFlashLightOn = !this.isFlashLightOn;
    if(this.isFlashLightOn){
      this.QRScanner.enableLight();
    }
    else{
      this.QRScanner.disableLight();
    }

  }

  toggleCamera(){
    /** Toggle Camera , Default is isBackMode is true , toggle
     * to false to enable front camera and vice versa.
     *
     * @type {boolean}
     */
    this.isBackMode =  !this.isBackMode;
    if(this.isBackMode){
      this.QRScanner.useFrontCamera();
    }
    else{
      this.QRScanner.useBackCamera();
    }
  }

  presentToast(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

 ionViewWillLeave(){
    this.hideCamera();
    this.scanSub.unsubscribe(); // stop scanning
    this.hideCamera();
  }


  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }


}