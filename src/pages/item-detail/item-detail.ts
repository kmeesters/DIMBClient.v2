import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
  
})
export class ItemDetailPage {
  item: any;
  

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public toastCtrl: ToastController) {
    console.log(navParams.get('item'));
      items.getitem(navParams.get('item'))
      .subscribe((resp) => {
      //if found
      this.item = resp;
      console.log(this.item);
      let toast = this.toastCtrl.create({
        message: "Found the item!",
        duration: 3000,
        position: 'top'
      });
      toast.present();

      
    }, (err) => {
      //if error
      let toast = this.toastCtrl.create({
        message: "Item is not valid",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  config: any = { leftTime: 10, notify: [2, 5] };
}
