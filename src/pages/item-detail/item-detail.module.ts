import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailPage } from './item-detail';
import { CountdownTimerModule } from 'ngx-countdown-timer';

@NgModule({
  declarations: [
    ItemDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailPage),
    TranslateModule.forChild(),
    CountdownTimerModule.forRoot()
  ],
  exports: [
    ItemDetailPage
  ]
})
export class ItemDetailPageModule { }
