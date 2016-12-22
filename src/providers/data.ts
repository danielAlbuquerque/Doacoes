import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';



@Injectable()
/**
 * Essa classe prover acesso rápido aos firebase
 */
export class DataProvider {

	/**
	 * Construtor da classe
	 * @param {AngularFire} private af
	 */
  	constructor(private af: AngularFire) {
    	
  	}

  	/**
  	 * Adiciona um novo item ao documento
  	 * @param {string} path documento
  	 * @param {any}    data item
  	 */
  	push(path: string, data: any) {
  		return Observable.create(observer => {
  			this.af.database.list(path).push(data).then(firebaseNewData => {
  				let newData: any = firebaseNewData;
  				observer.next(newData.path.o[newData.path.o.length - 1]);
  			}, error => {
  				observer.error(error);
  			});
  		});
  	}

  	/**
  	 * Atualiza
  	 * @param {string} path documento
  	 * @param {any}    data Item para atualizar
  	 */
  	update(path: string, data: any) {
  		this.af.database.object(path).update(data);
  	}

  	/**
  	 * Retorna uma lista de itens
  	 * @param  {string}                      path documento
  	 * @return {FirebaseListObservable<any>}      retorna uma lista de objetos
  	 */
  	list(path: string) : FirebaseListObservable<any> {
  		return this.af.database.list(path);
  	}

  	/**
  	 * Retorna um objeto específico
  	 * @param  {string}          path documento
  	 * @return {Observable<any>}      retorna o objeto solicitado
  	 */
  	object(path: string): Observable<any> {
  		return this.af.database.object(path);
  	}

  	/**
  	 * Remove um determinado item
  	 * @param  {string}          path documento
  	 */
  	remove(path) : Observable<any> {
  		return Observable.create(observer => {
  			this.af.database.object(path).remove().then(data => {
  				observer.next();
  			}, error => {
  				observer.error(error);
  			});
  		});
  	}
}
