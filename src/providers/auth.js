var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthProviders, AuthMethods, FirebaseAuth, AngularFire } from 'angularfire2';
import { DataProvider } from './data';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { Facebook } from 'ionic-native';
var AuthProvider = (function () {
    /**
     * Construtor
     * @param {FirebaseAuth} public auth
     * @param {AngularFire}  public af
     * @param {DataProvider} public data
     * @param {Platform} private platform
     */
    function AuthProvider(auth, af, data, platform) {
        this.auth = auth;
        this.af = af;
        this.data = data;
        this.platform = platform;
    }
    /**
     * Retorna os dados do usuário logado
     * @returns Observable
     */
    AuthProvider.prototype.getUserData = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.af.auth.subscribe(function (authData) {
                if (authData) {
                    console.log('UID: ', authData.uid);
                    _this.data.object('usuarios/' + authData.uid).subscribe(function (userData) {
                        observer.next(userData);
                        observer.complete();
                    });
                }
                else {
                    observer.error();
                }
            }, function (err) {
                observer.error(err);
            });
        });
    };
    /**
     * Recuperação de senha
     * @param {[type]} email e-mail do usuário
     */
    AuthProvider.prototype.restaurarSenhaEmail = function (email) {
        return Observable.create(function (observer) {
            firebase.auth().sendPasswordResetEmail(email)
                .then(function () {
                observer.next();
                observer.complete();
            }, function (error) {
                observer.error(error);
            });
        });
    };
    /**
     * Logout
     * @returns Observable
     */
    AuthProvider.prototype.logout = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.af.auth.logout();
            observer.next(true);
            observer.complete();
        });
    };
    /**
     * Cria uma nova conta
     * @param {[type]} credentials Object com email e senha
     * @returns Observable
     */
    AuthProvider.prototype.register = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password == null) {
            return Observable.throw("Please insert credentials");
        }
        else {
            return Observable.create(function (observer) {
                var user = {
                    email: credentials.email,
                    password: credentials.password
                };
                _this.auth.createUser(user).then(function (authData) {
                    _this.af.database.list('usuarios').update(authData.uid, {
                        nome: credentials.nome,
                        email: authData.auth.email,
                        emailVerified: false,
                        provider: 'email',
                        image: 'https://freeiconshop.com/files/edd/person-solid.png',
                        telefone: credentials.telefone,
                        mostrarTelefone: true
                    });
                    observer.next(true);
                    observer.complete();
                }).catch(function (error) {
                    console.log(error);
                    observer.error(error);
                });
            });
        }
    };
    /**
     * Autenticação via email e senha
     * @param {[type]} credentials Object com email e senha
     * @returns Observable
     */
    AuthProvider.prototype.loginEmail = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password == null) {
            return Observable.throw("Informe o usuário e senha");
        }
        else {
            return Observable.create(function (observer) {
                _this.auth.login(credentials, {
                    provider: AuthProviders.Password,
                    method: AuthMethods.Password
                }).then(function (authData) {
                    observer.next(true);
                    observer.complete();
                }).catch(function (error) {
                    observer.error(error);
                });
            });
        }
    };
    /**
     * Método de autenticacao com facebook
     */
    AuthProvider.prototype.loginFacebook = function () {
        var _this = this;
        return Observable.create(function (observer) {
            if (_this.platform.is('cordova')) {
                Facebook.login(['public_profile', 'email']).then(function (facebookData) {
                    var provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
                    firebase.auth().signInWithCredential(provider).then(function (firebaseData) {
                        _this.af.database.list('usuarios').update(firebaseData.uid, {
                            nome: firebaseData.displayName,
                            email: firebaseData.email,
                            provider: 'facebook',
                            image: firebaseData.photoURL,
                            telefone: '',
                            mostrarTelefone: false
                        });
                        observer.next();
                    });
                }, function (error) {
                    observer.error(error);
                });
            }
            else {
                _this.af.auth.login({
                    provider: AuthProviders.Facebook,
                    method: AuthMethods.Popup
                }).then(function (facebookData) {
                    _this.af.database.list('usuarios').update(facebookData.auth.uid, {
                        nome: facebookData.auth.displayName,
                        email: facebookData.auth.email,
                        provider: 'facebook',
                        image: facebookData.auth.photoURL,
                        telefone: '',
                        mostrarTelefone: false
                    });
                    observer.next();
                }).catch(function (error) {
                    console.info("error", error);
                    observer.error(error);
                });
            }
        });
    };
    /**
     * Apagar Conta
     */
    AuthProvider.prototype.apagarConta = function () {
        var _this = this;
        return Observable.create(function (observer) {
            var currentUser = firebase.auth().currentUser;
            if (currentUser) {
                currentUser.delete().then(function () {
                    _this.logout().subscribe(function () {
                        observer.next(true);
                        observer.complete();
                    });
                }, function (error) {
                    observer.error(error);
                });
            }
            else {
                observer.error('Usuário não está logado');
            }
        });
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FirebaseAuth,
        AngularFire,
        DataProvider,
        Platform])
], AuthProvider);
export { AuthProvider };
//# sourceMappingURL=auth.js.map