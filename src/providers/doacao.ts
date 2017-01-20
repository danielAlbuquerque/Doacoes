import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { DataProvider } from './data';
import { AuthProvider } from './auth';
import firebase from 'firebase';

@Injectable()
export class DoacaoProvider {

	refDoacoes: Observable<any[]>;

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
			let refDoacao = firebase.database().ref('doacoes').orderByChild('uf').equalTo(uf.toUpperCase());
			refDoacao.once('value', (snap) => {
				let items = [];
				snap.forEach((snap) => {
					items.push({
						id: snap.key,
						created_at: snap.val().created_at,
						descricao: snap.val().descricao,
						doado: snap.val().doado,
						images: snap.val().images,
						lat: snap.val().lat,
						lng: snap.val().lng,
						usuario: snap.val().usuario
					});

					return false;
				});
				console.log(items);
				observer.next(items);
				observer.complete();
			});
		})
	}
	
	/**
	 * Doacoes do usuário atual
	 */
	minhasDoacoes() {
		return Observable.create(observer => {
			console.log(firebase.auth().currentUser.uid);
			let refDoacao = firebase.database().ref('doacoes').orderByChild('user').equalTo(firebase.auth().currentUser.uid);
			refDoacao.once('value', (snap) => {
				let items = [];
				snap.forEach((snap) => {
					items.push({
						id: snap.key,
						created_at: snap.val().created_at,
						descricao: snap.val().descricao,
						doado: snap.val().doado,
						images: snap.val().images,
						lat: snap.val().lat,
						lng: snap.val().lng,
						usuario: snap.val().usuario
					});

					return false;
				});
				observer.next(items);
				observer.complete();
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
					titulo: doacaoData.titulo,
					descricao: doacaoData.descricao,
					uf: doacaoData.uf.toUpperCase(),
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

	getById(doacaoId) {
		return Observable.create(observer => {
			this.data.object('doacoes/' + doacaoId).subscribe((response)=>{
				observer.next(response);
				observer.complete();
			}, err => {
				observer.error(err);
			});
		});
	}

}
