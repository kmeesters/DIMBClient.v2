import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/item', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

  getitem(qrcode: any) {
    let seq = this.api.get('item', qrcode).share();
    seq.subscribe(data => {
      return data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
