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
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { HomePage } from '../home/home';
var RegistrarPage = (function () {
    /**
     * Construtor
     * @param {NavController}     public navCtrl
     * @param {NavParams}         public navParams
     * @param {FormBuilder}       public formBuilder
     * @param {AlertController}   public alertCtrl
     * @param {LoadingController} public loadingCtrl
     * @param {AuthProvider}      private auth
     */
    function RegistrarPage(navCtrl, navParams, formBuilder, alertCtrl, loadingCtrl, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.nomeChanged = false;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.telefoneChanged = false;
        this.submitAttempt = false;
        this.registrarForm = formBuilder.group({
            nome: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required])],
            telefone: [''],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    /**
     * Registrar
     */
    RegistrarPage.prototype.registrar = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.registrarForm.valid) {
            console.log(this.registrarForm.value);
        }
        else {
            this.showLoading();
            this.auth.register(this.registrarForm.value).subscribe(function (succ) {
                if (succ) {
                    setTimeout(function () {
                        _this.loading.dismiss();
                        _this.navCtrl.setRoot(HomePage);
                    });
                }
            }, function (err) {
                _this.showError(err);
            });
        }
    };
    /**
     * Não sei oq essa porra faz mas precisa ta aqui ]
     * @param {[type]} input elemento do form
     */
    RegistrarPage.prototype.elementChanged = function (input) {
        if (input) {
            var field = input.inputControl.name;
            this[field + "Changed"] = true;
        }
    };
    /**
     * Exibe o popup loading
     */
    RegistrarPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Aguarde...'
        });
        this.loading.present();
    };
    /**
     * Exibe um erro
     * @param {[type]} text Mensagem de erro
     */
    RegistrarPage.prototype.showError = function (text) {
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
    return RegistrarPage;
}());
RegistrarPage = __decorate([
    Component({
        selector: 'page-registrar',
        templateUrl: 'registrar.html',
        providers: [AuthProvider]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        FormBuilder,
        AlertController,
        LoadingController,
        AuthProvider])
], RegistrarPage);
export { RegistrarPage };
//# sourceMappingURL=registrar.js.map