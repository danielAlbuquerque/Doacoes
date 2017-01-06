import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Sim } from 'ionic-native';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth';
import { LocalizacaoProvider } from '../providers/localizacao';
import * as moment from 'moment';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider, LocalizacaoProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  loading: Loading;

  /**
   * Construtor
   * @param {Platform}          public  platform    [description]
   * @param {AlertController}   private alertCtrl   [description]
   * @param {LoadingController} public  loadingCtrl [description]
   * @param {AuthProvider}      private auth        [description]
   */
  constructor(
    public platform: Platform,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private auth: AuthProvider,
    private local: LocalizacaoProvider,
    public push: Push
  ) {
    this.initializeApp();

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

    this.push.rx.notification()
    .subscribe((msg) => {
      alert(msg.title + ': ' + msg.text);
    });
  }

  /**
   * Platform is ready
   */
  initializeApp() {
    moment.locale('pt-br');
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#01579B');
      Splashscreen.hide();
      if(this.platform.is('cordova')) {
        Sim.getSimInfo().then((info) => {
            this.local.setUfByDDD(info.phoneNumber.substr(3, 2))
              .subscribe((response) => {
                if(!response) { // nao conseguiu salvar o estado
                    console.log("Não conseguiui pegar o estado");
                }
              }, err => {
                console.log(err);
            });
        });
      }

    });
  }

  /**
   * Logout
   */
  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Doações',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.showLoading();
            this.auth.logout().subscribe(() => {
              setTimeout(() => {
                this.loading.dismiss();
                this.nav.setRoot(LoginPage);
              }, 2000);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Exibe o popup loading
   */
  private showLoading() {
    this.loading = this.loadingCtrl.create({
        content: 'Saindo...'
    });
    this.loading.present();
  }
}
