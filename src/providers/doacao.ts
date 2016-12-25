import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { DataProvider } from './data';
import { AuthProvider } from './auth';
import firebase from 'firebase';

@Injectable()
export class DoacaoProvider {

	refDoacoes: FirebaseListObservable<any[]>;

	/**
	 * Construtor
	 * @param {DataProvider} data provider
	 */
	constructor(public data: DataProvider, public auth: AuthProvider, public af: AngularFire) {

	}

	/**
	 * Retorna as doações por estado
	 */
	doacoesLocais(uf: string) {
		return Observable.create(observer => {
			this.refDoacoes = this.data.list('doacoes', {
				query: {
					orderByChild: 'uf',
					equalTo: uf
				}
			});
			this.refDoacoes.subscribe((doacoes)=>{
				doacoes.forEach(doacao => {
					let picRef = firebase.storage().ref().child('images_doacoes/'+doacao.$key);
					console.log(picRef);
					picRef.getDownloadURL().then((url) => {
						console.log('IMG', url);
					});
				});
				
				observer.next(doacoes);
				observer.complete();
			}, err => {
				observer.error(err);
			});
		})
	}
	
	/**
	 * Doacoes do usuário atual
	 */
	minhasDoacoes() {
		return Observable.create(observer => {
			let uid = firebase.auth().currentUser.uid;
			this.refDoacoes = this.data.list('doacoes', {
				query: {
					orderByChild: 'user',
					equalTo: uid
				}
			});
			this.refDoacoes.subscribe((doacoes)=>{
				observer.next(doacoes);
				observer.complete();
			}, err => {
				observer.error(err);
			});
		});
	}

	/**
	 * Registra uma nova doacao
	 * @param {[type]} doacaoData 
	 */
	salvaDoacao(doacaoData) {
		return Observable.create(observer => {
			this.auth.getUserData().subscribe((usuario) => {
				let doacao = {
					doado: false,
					descricao: doacaoData.descricao,
					uf: doacaoData.uf,
					lat: doacaoData.lat,
					lng: doacaoData.lng,
					user: doacaoData.user,
					images: doacaoData.images,
					created_at: firebase.database['ServerValue']['TIMESTAMP'],
					usuario: {
						nome: usuario.nome,
						email: usuario.email,
						foto: usuario.image,
						telefone: usuario.telefone
					}
				};

				this.data.push('doacoes', doacao).subscribe((uid) => {
					observer.next(uid);
					observer.complete();
				}, err => {
					observer.error(err);
				});
			}, err => {
				observer.error(err);
			});

			
		});

	}

	porEstado() {

	}



}
