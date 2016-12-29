import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Localizacao {

	constructor(public http: Http) {
    	
  	}

  	/**
  	* Localiza o usuário via GPS
  	*/
  	getLocation() {
  		return Observable.create(observer => {
  			Geolocation.getCurrentPosition().then((pos) => {

  			}, err => {
  				observer.erro(err);
  			});
  		});
  	}

}
