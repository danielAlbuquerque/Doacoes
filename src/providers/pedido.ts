import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@Injectable()
export class PedidoProvider {

	constructor() {
		
	}

	/**
	 * Retorna os pedidos por estado
	 * @param {string} uf estado de origem
	 */
	porEstado(uf: string) {
		return Observable.create(observer => {
			let ref = firebase.database().ref().child('pedidos').orderByChild('uf').equalTo(uf.toLowerCase());
			ref.once('value', snap => {
				let items = [];
				snap.forEach(doacao => {
					items.push({
						id: doacao.key,
						atendido: doacao.val().atendido,
						created_at: doacao.val().created_at,
						descricao: doacao.val().descricao,
						lat: doacao.val().lat,
						lng: doacao.val().lng,
						mostrarLocalizacao: doacao.val().mostrarLocalizacao,
						uf: doacao.val().uf,
						usuario: doacao.val().usuario
					});
					return false;
				});
				observer.next(items);
				observer.complete();
			});
		});
	}

}
