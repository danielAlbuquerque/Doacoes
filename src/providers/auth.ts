import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthProviders, AuthMethods, FirebaseAuth, AngularFire} from 'angularfire2';
import { DataProvider } from './data';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { Facebook } from 'ionic-native';


@Injectable()
export class AuthProvider {

	/**
	 * Construtor
	 * @param {FirebaseAuth} public auth 
	 * @param {AngularFire}  public af   
	 * @param {DataProvider} public data 
	 * @param {Platform} private platform 
	 */
	constructor(
		public auth: FirebaseAuth, 
		public af: AngularFire, 
		public data: DataProvider,
		private platform: Platform
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
		            this.data.object('usuarios/' + authData.uid).subscribe(userData => {
		              observer.next(userData);
		              observer.complete();
		            });
	          	} else {
	            	observer.error();
	          	}
        	}, (err) => {
        		observer.error(err);
        	});
      	});      	
  	}

  	/**
  	 * Recuperação de senha
  	 * @param {[type]} email e-mail do usuário
  	 */
  	restaurarSenhaEmail(email) {
  		return Observable.create(observer => {
  			firebase.auth().sendPasswordResetEmail(email)
  			.then(function() {
  				observer.next();
  				observer.complete();
  			}, function(error) {
  				observer.error(error);
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

	/**
	 * Método de autenticacao com facebook
	 */
	loginFacebook() {
		return Observable.create(observer => {
      		if (this.platform.is('cordova')) {
		        Facebook.login(['public_profile', 'email']).then(facebookData => {
		          let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
		          firebase.auth().signInWithCredential(provider).then(firebaseData => {
		            this.af.database.list('usuarios').update(firebaseData.uid, {
		              nome: firebaseData.displayName,
		              email: firebaseData.email,
		              provider: 'facebook',
		              image: firebaseData.photoURL
		            });
		            observer.next();
		          });
		        }, error => {
		          observer.error(error);
		        });
		    } else {
        		this.af.auth.login({
		        	provider: AuthProviders.Facebook,
		        	method: AuthMethods.Popup
        		}).then((facebookData) => {
		          	this.af.database.list('usuarios').update(facebookData.auth.uid, {
			            nome: facebookData.auth.displayName,
			            email: facebookData.auth.email,
			            provider: 'facebook',
			            image: facebookData.auth.photoURL
		          	});
          			observer.next();
		        }).catch((error) => {
		          console.info("error", error);
		          observer.error(error);
		        });
      		}
    	});
	}	
}
