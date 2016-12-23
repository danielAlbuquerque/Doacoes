import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth';
import { DataProvider } from '../../providers/data';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers: [DataProvider, AuthProvider]
})
export class PerfilPage {
	loading: Loading;
	userData = { email: '', nome: '', image: '', telefone: '', mostrarTelefone: true, $key: '' };

	/**
	 * Construtor
	 * @param {NavController}     public navCtrl       [description]
	 * @param {NavParams}         public navParams     [description]
	 * @param {AuthProvider}      public auth          [description]
	 * @param {DataProvider}      public data          [description]
	 * @param {AlertController}   public alertCtrl     [description]
	 * @param {LoadingController} public loadingCtrl   [description]
	 */
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthProvider,
		public data: DataProvider,
		public alertCtrl: AlertController,
	  	public loadingCtrl: LoadingController,
	) {}

	/**
	 * Executado quando a view foi carregada
	 */
	ionViewDidLoad() {
		console.log("Carrendo");
	    this.carregaPerfil();
  	}

  	/**
  	 * Atualiza as informações
  	 */
  	atualizaInformacoes() {
  		if(this.userData.$key) {
  			this.showLoading('Atualizando informações');
  			let data = {
  				email: this.userData.email,
  				nome: this.userData.nome,
  				telefone: this.userData.telefone,
  				mostrarTelefone: this.userData.mostrarTelefone
  			}
  			this.data.update('usuarios/'+this.userData.$key, data).subscribe(() => {
  				this.loading.dismiss();
  			});
  		}
  	}

  	/**
  	 * Apagar Conta
  	 */
  	apagarConta() {
  		this.showLoading('Apagando conta...');
  		this.auth.apagarConta().subscribe(()=>{
  			this.loading.dismiss();
  			this.navCtrl.setRoot(LoginPage);
  		}, err => {
  			this.loading.dismiss();
  			this.showError(err);
  		});
  	}

  	/**
  	 * Carrega o perfil
  	 */
  	private carregaPerfil() {
  		this.showLoading("Carregando perfil...");

    	this.auth.getUserData().subscribe((userData) => {
    		this.userData = userData;
    		this.loading.dismiss();
    	}, err => {
    		this.showError(err);
    		this.loading.dismiss();
    	});
  	}

  	/**
  	 * Exibe o popup de loading
  	 * @param {[type]} text Mensagem
  	 */
  	private showLoading(text) {
		this.loading = this.loadingCtrl.create({
			content: text
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
