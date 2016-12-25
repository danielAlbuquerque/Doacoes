import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from './data';
import firebase from 'firebase';

@Injectable()
export class DoacaoProvider {

	/**
	 * Construtor
	 * @param {DataProvider} data provider
	 */
	constructor(public data: DataProvider) {
    		
  	}

  	/**
  	 * Registra uma nova doacao
  	 * @param {[type]} doacaoData 
  	 */
  	salvaDoacao(doacaoData) {
  		return Observable.create(observer => {
  			let doacao = {
  				doado: false,
  				descricao: doacaoData.descricao,
  				uf: doacaoData.uf,
  				lat: doacaoData.lat,
  				lng: doacaoData.lng
  			};

  			this.data.push('doacoes', doacao).subscribe((uid) => {

  				if(doacaoData.images.length) {
  					let strgRef = firebase.storage().ref();

  					doacaoData.images.forEach((img) => {
  						let path = 'images_doacoes/' + uid + '/' + Math.random().toString(36).substr(2, 9) + '.jpg';
  						strgRef.child(path).put(img);
  					});
  				}
  				
  				
  				observer.next(uid);
  				observer.complete();
  			}, err => {
  				observer.error(err);
  			});

  		});

  	}



}
