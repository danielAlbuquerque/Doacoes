var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarPage } from '../registrar/registrar';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';
import { AuthProvider } from '../../providers/auth';
import { HomePage } from '../home/home';
var LoginPage = (function () {
    /**
     * [constructor description]
     * @param {NavController}     public navCtrl
     * @param {NavParams}         public navParams
     * @param {FormBuilder}       public formBuilder
     * @param {AlertController}   public alertCtrl
     * @param {LoadingController} public loadingCtrl
     * @param {AuthProvider}      private auth
     */
    function LoginPage(navCtrl, navParams, formBuilder, alertCtrl, loadingCtrl, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.verificaLogado();
    };
    /**
     * Realiza o login
     */
    LoginPage.prototype.loginEmail = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.showLoading();
            this.auth.loginEmail(this.loginForm.value).subscribe(function (result) {
                setTimeout(function () {
                    _this.loading.dismiss();
                    _this.navCtrl.setRoot(HomePage);
                });
            }, function (error) {
                _this.showError(error);
            });
        }
    };
    /**
     * Envia o usuário para a págin de criar conta
     */
    LoginPage.prototype.criarConta = function () {
        this.navCtrl.push(RegistrarPage);
    };
    /**
     * Envia o usuário para a página de recuperar senha
     */
    LoginPage.prototype.recuperarSenha = function () {
        this.navCtrl.push(RecuperarSenhaPage);
    };
    /**
     * Realiza o login através do facebook]
     */
    LoginPage.prototype.loginFacebook = function () {
        var _this = this;
        this.auth.loginFacebook().subscribe(function () {
            _this.navCtrl.setRoot(HomePage);
        }, function (err) {
            _this.showError(err);
            console.log(err);
        });
    };
    /**
     * Não sei oq essa porra faz mas precisa ta aqui ]
     * @param {[type]} input elemento do form
     */
    LoginPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    /**
     * Exibe o popup loading
     */
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Aguarde...'
        });
        this.loading.present();
    };
    /**
     * Exibe um erro
     * @param {[type]} text Mensagem de erro
     */
    LoginPage.prototype.showError = function (text) {
        var _this = this;
        setTimeout(function () {
            _this.loading.dismiss();
        });
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    /**
     * Verifica se o usuário já está logado
     */
    LoginPage.prototype.verificaLogado = function () {
        var _this = this;
        this.showLoading();
        this.auth.getUserData().subscribe(function (user) {
            _this.loading.dismiss();
            _this.navCtrl.setRoot(HomePage);
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [AuthProvider]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        FormBuilder,
        AlertController,
        LoadingController,
        AuthProvider])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map