import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth';


@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider]
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
    private auth: AuthProvider
  ) {
    this.initializeApp();
  }

  /**
   * Platform is ready
   */
  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
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
