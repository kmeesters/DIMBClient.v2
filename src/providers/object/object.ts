import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
//import { resolveDefinition } from '@angular/core/src/view/util';


/*
  Generated class for the ObjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ObjectProvider {

  constructor(public api: Api) { }

  gettype(qrobject: any) {
    let seq = this.api.get('type', qrobject).share();
    seq.subscribe(data => {
      if (data['type'] != false) {
        //console.log('Code represents: ' + data);
        return data;
      } else {
        console.log('Invalid code');
        return 'error'
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }



}
