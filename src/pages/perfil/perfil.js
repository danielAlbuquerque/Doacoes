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
import { AuthProvider } from '../../providers/auth';
import { DataProvider } from '../../providers/data';
import { LoginPage } from '../login/login';
var PerfilPage = (function () {
    /**
     * Construtor
     * @param {NavController}     public navCtrl       [description]
     * @param {NavParams}         public navParams     [description]
     * @param {AuthProvider}      public auth          [description]
     * @param {DataProvider}      public data          [description]
     * @param {AlertController}   public alertCtrl     [description]
     * @param {LoadingController} public loadingCtrl   [description]
     * @param {FormBuilder} public formBuilder   [description]
     */
    function PerfilPage(navCtrl, navParams, auth, data, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.data = data;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userData = { email: '', nome: '', image: '', telefone: '', mostrarTelefone: true, $key: '' };
    }
    /**
     * Executado quando a view foi carregada
     */
    PerfilPage.prototype.ionViewDidLoad = function () {
        console.log("Carrendo");
        this.carregaPerfil();
    };
    /**
     * Atualiza as informações
     */
    PerfilPage.prototype.atualizaInformacoes = function () {
        var _this = this;
        if (this.userData.$key) {
            this.showLoading('Atualizando informações');
            var data = {
                email: this.userData.email,
                nome: this.userData.nome,
                telefone: this.userData.telefone,
                mostrarTelefone: this.userData.mostrarTelefone
            };
            this.data.update('usuarios/' + this.userData.$key, data).subscribe(function () {
                _this.loading.dismiss();
            });
        }
    };
    /**
     * Apagar Conta
     */
    PerfilPage.prototype.apagarConta = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Doações',
            message: 'Deseja excluir a sua conta?',
            buttons: [
                {
                    text: 'Não',
                    handler: function () {
                    }
                },
                {
                    text: 'Sim',
                    handler: function () {
                        _this.showLoading('Apagando conta...');
                        _this.auth.apagarConta().subscribe(function () {
                            _this.loading.dismiss();
                            _this.navCtrl.setRoot(LoginPage);
                        }, function (err) {
                            _this.loading.dismiss();
                            _this.showError(err);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    /**
     * Carrega o perfil
     */
    PerfilPage.prototype.carregaPerfil = function () {
        var _this = this;
        this.showLoading("Carregando perfil...");
        this.auth.getUserData().subscribe(function (userData) {
            _this.userData = userData;
            _this.loading.dismiss();
        }, function (err) {
            _this.showError(err);
            _this.loading.dismiss();
        });
    };
    /**
     * Exibe o popup de loading
     * @param {[type]} text Mensagem
     */
    PerfilPage.prototype.showLoading = function (text) {
        this.loading = this.loadingCtrl.create({
            content: text
        });
        this.loading.present();
    };
    /**
     * Exibe um erro
     * @param {[type]} text Mensagem de erro
     */
    PerfilPage.prototype.showError = function (text) {
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
    return PerfilPage;
}());
PerfilPage = __decorate([
    Component({
        selector: 'page-perfil',
        templateUrl: 'perfil.html',
        providers: [DataProvider, AuthProvider]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AuthProvider,
        DataProvider,
        AlertController,
        LoadingController])
], PerfilPage);
export { PerfilPage };
//# sourceMappingURL=perfil.js.map