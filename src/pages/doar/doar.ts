import { Component } from '@angular/core';
import { NavController, NavParams, App, Loading, LoadingController, AlertController } from 'ionic-angular';
import { DoacaoProvider } from '../../providers/doacao';
import { DataProvider } from '../../providers/data';
import { DoarAddPage } from '../doar-add/doar-add';
import { FirebaseListObservable } from 'angularfire2';



@Component({
  selector: 'page-doar',
  templateUrl: 'doar.html',
  providers: [DoacaoProvider]
})
export class DoarPage {
    doacoes: FirebaseListObservable<any>;
    loading: Loading;

    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public app: App,
      public doacaoProvider: DoacaoProvider,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      public data: DataProvider
     ) {}

	  ionViewDidLoad() {
        this.showLoading();
    	  this.doacaoProvider.minhasDoacoes().subscribe(doacoes => {
            this.doacoes = doacoes;
            this.loading.dismiss(); 
        }, err => {
            this.loading.dismiss();
            console.log(err);
            this.showError(err);
        });
  	}

  	/**
  	 * Redireciona o usuário para a página de add
  	 */
  	add() {
        this.app.getRootNav().push(DoarAddPage);
  	}

    excluir(id) {
      let alert = this.alertCtrl.create({
        title: 'Excluir',
        message: 'Deseja realmente apagar?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.data.remove('doacoes/' + id).subscribe((data) => {
                  this.ionViewDidLoad();
              });
            }
          }
        ]
      });
      alert.present();
    }

    /**
     * Exibe o popup loading
     */
    private showLoading() {
      this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
      });
      this.loading.present();
    }

    /**
     * Exibe um erro
     * @param {[type]} text Mensagem de erro
     */
    private showError(text) {
      setTimeout(() => {
      this.loading.dismiss();
      });

      let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
      });

      alert.present(prompt);
    }


    

}
