import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalizacaoProvicer {

	  constructor(public http: Http) {}

    setUfByDDD(ddd) {
      return Observable.create(observer => {
        window.localStorage.setItem("DDD", ddd);
        this.http.get('http://ddd.pricez.com.br/ddds/'+ddd+'.json')
          .map(res => res.json())
          .subscribe((response) => {
						console.log(response);
            if(response.count) {
								console.log(response.payload[0].estado);
                window.localStorage.setItem('UF', response.payload[0].estado);
                observer.next(true);
            }else{
                observer.next(false);
            }
          }, err => {
            observer.error(err);
          });
      });
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
