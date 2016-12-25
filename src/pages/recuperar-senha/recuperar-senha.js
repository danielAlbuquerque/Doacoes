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
import { AuthProvider } from '../../providers/auth';
import { LoginPage } from '../login/login';
var RecuperarSenhaPage = (function () {
    /**
     * Construtor
     * @param {NavController}     public navCtrl
     * @param {NavParams}         public navParams
     * @param {FormBuilder}       public formBuilder
     * @param {LoadingController} public loadingCtrl
     * @param {AlertController}   public alertCtrl
     * @param {AuthProvider}      private auth
     */
    function RecuperarSenhaPage(navCtrl, navParams, formBuilder, loadingCtrl, alertCtrl, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required])],
        });
    }
    /**
     * ação do botao recuperar senha
     */
    RecuperarSenhaPage.prototype.resetPassword = function () {
        var _this = this;
        this.submitAttempt = true;
        this.showLoading();
        this.auth.restaurarSenhaEmail(this.resetPasswordForm.value.email).subscribe(function () {
            _this.loading.dismiss();
            _this.navCtrl.setRoot(LoginPage);
            // Todo: Implementar um toast informando o sucesso da operação
        }, function (err) {
            console.log(err);
            _this.showError(err);
        });
    };
    /**
     * Não sei oq essa porra faz mas precisa ta aqui ]
     * @param {[type]} input elemento do form
     */
    RecuperarSenhaPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    /**
     * Exibe o popup loading
     */
    RecuperarSenhaPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Aguarde...'
        });
        this.loading.present();
    };
    /**
     * Exibe um erro
     * @param {[type]} text Mensagem de erro
     */
    RecuperarSenhaPage.prototype.showError = function (text) {
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
    return RecuperarSenhaPage;
}());
RecuperarSenhaPage = __decorate([
    Component({
        selector: 'page-recuperar-senha',
        templateUrl: 'recuperar-senha.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        FormBuilder,
        LoadingController,
        AlertController,
        AuthProvider])
], RecuperarSenhaPage);
export { RecuperarSenhaPage };
//# sourceMappingURL=recuperar-senha.js.map