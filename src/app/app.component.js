var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth';
var MyApp = (function () {
    /**
     * Construtor
     * @param {Platform}          public  platform    [description]
     * @param {AlertController}   private alertCtrl   [description]
     * @param {LoadingController} public  loadingCtrl [description]
     * @param {AuthProvider}      private auth        [description]
     */
    function MyApp(platform, alertCtrl, loadingCtrl, auth) {
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.rootPage = LoginPage;
        this.initializeApp();
    }
    /**
     * Platform is ready
     */
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    };
    /**
     * Logout
     */
    MyApp.prototype.logout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Doações',
            message: 'Deseja realmente sair?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                    }
                },
                {
                    text: 'Sim',
                    handler: function () {
                        _this.showLoading();
                        _this.auth.logout().subscribe(function () {
                            setTimeout(function () {
                                _this.loading.dismiss();
                                _this.nav.setRoot(LoginPage);
                            }, 2000);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    /**
     * Exibe o popup loading
     */
    MyApp.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Saindo...'
        });
        this.loading.present();
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [AuthProvider]
    }),
    __metadata("design:paramtypes", [Platform,
        AlertController,
        LoadingController,
        AuthProvider])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map