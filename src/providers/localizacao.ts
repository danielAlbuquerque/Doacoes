import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalizacaoProvider {

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

		getUf() {
			return Observable.create(observer => {
					let uf = window.localStorage.getItem('UF');
					console.log(uf);
					if (uf) {
						observer.next(uf);
					} else {
						observer.error("UF nao salva");
					}
			});

		}

  	/**
  	* Localiza o usuário via GPS
  	*/
  	getGeoLocation() {
  		return Observable.create(observer => {
  			Geolocation.getCurrentPosition().then((pos) => {
            observer.next(pos.coords);
            observer.complete();
  			}, err => {
  				  observer.erro(err);
  			});
  		});
  	}



}
