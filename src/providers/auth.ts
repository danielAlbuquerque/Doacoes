import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthProviders, AuthMethods, FirebaseAuth, AngularFire} from 'angularfire2';
import {DataProvider} from './data';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthProdiver {

	/**
	 * Construtor
	 * @param {FirebaseAuth} public auth 
	 * @param {AngularFire}  public af   
	 * @param {DataProvider} public data 
	 */
	constructor(
		public auth: FirebaseAuth, 
		public af: AngularFire, 
		public data: DataProvider
	){}

	/**
	 * Retorna os dados do usuário logado
	 * @returns Observable
	 */
	getUserData() {
		return Observable.create(observer => {
        	this.af.auth.subscribe(authData => {
	          	if(authData) {
	            	console.log('UID: ',authData.uid);
		            this.data.object('users/' + authData.uid).subscribe(userData => {
		              observer.next(userData);
		              observer.complete();
		            });
	          	} else {
	            	observer.error();
	          	}
        	});
      	});      	
  	}

	/**
	 * Logout
	 * @returns Observable
	 */
	logout() {
  		return Observable.create(observer => {
  			this.af.auth.logout();
  			observer.next(true);
  			observer.complete();
  		})
  	}

	/**
	 * Cria uma nova conta
	 * @param {[type]} credentials Object com email e senha
	 * @returns Observable
	 */
	register(credentials) {
		if (credentials.email === null || credentials.password == null) {
  			return Observable.throw("Please insert credentials");
  		} else {
  			return Observable.create(observer => {
  				let user = { 
  					email: credentials.email, 
  					password: credentials.password 
  				};
  				this.auth.createUser(user).then((authData) => {
		            this.af.database.list('usuarios').update(authData.uid, {
		            	nome: 			credentials.nome,
		            	email: 			authData.auth.email,
		            	emailVerified:  false,
		            	provider:       'email',
		            	image: 		    'https://freeiconshop.com/files/edd/person-solid.png'
		            });

  					observer.next(true);
  					observer.complete();
  				}).catch((error) => {
		            console.log(error);
  					observer.error(error);
  				});
  				
  			});
  		}
	}

	/**
	 * Autenticação via email e senha
	 * @param {[type]} credentials Object com email e senha
	 * @returns Observable
	 */
	loginEmail(credentials) {
		if (credentials.email === null || credentials.password == null) {
        	return Observable.throw("Informe o usuário e senha");
	    } else {
	        return Observable.create(observer => {
	        	this.auth.login(credentials, {
		            provider: AuthProviders.Password,
		            method: AuthMethods.Password
		        }).then((authData) => {
	            	observer.next(true);
	            	observer.complete();
	          	}).catch((error) => {
	            	observer.error(error);
	          	});
	        });
      	}
	}
}
