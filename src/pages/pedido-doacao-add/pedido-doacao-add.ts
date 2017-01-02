import { Component } from '@angular/core';
import { 
  NavController, 
  NavParams, 
  PopoverController, 
  Loading, 
  LoadingController, 
  AlertController,
  ToastController,
  ModalController, Platform } from 'ionic-angular';

import { Http } from '@angular/http';
import { DataProvider } from '../../providers/data';
import { ModalUfPage } from '../ver-doacoes/ver-doacoes';
import "leaflet";
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth';
import { LocalizacaoProvider } from '../../providers/localizacao';

@Component({
  selector: 'page-pedido-doacao-add',
  templateUrl: 'pedido-doacao-add.html',
  providers: [DataProvider, AuthProvider]
})
export class PedidoDoacaoAddPage {
	loading: Loading;
  	ufAtual: string = null;
  	pedido = {uf: '', titulo: '', descricao: '', mostrarLocalizacao: true, lat: 0, lng: 0, created_at: '', usuario: {}, atendido: false};
  	map: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public popoverCtrl: PopoverController,
    	public loadingCtrl: LoadingController,
    	public alertCtrl: AlertController,
    	public http: Http,
    	public modalCtrl: ModalController,
    	public data: DataProvider,
    	public platform: Platform,
    	public auth: AuthProvider,
    	public localizacao: LocalizacaoProvider,
    	public toastCtrl: ToastController
	) {}

	ionViewDidLoad() {
		this.showLoading('Aguarde...');
	  	this.localizacao.getUf().subscribe(uf => {
	  		this.ufAtual = uf;
	  		this.pedido.uf = uf;

	  		this.localizacao.getGeoLocation().subscribe(coords => {
	  			this.pedido.lat = coords.latitude;
	  			this.pedido.lng = coords.longitude;
	  			this.loading.dismiss();
	  		}, err => {
	  			console.log(err);
	  			console.log('PROVAVELMENTE GPS ESTÁ DESLIGADO');
	  			this.loading.dismiss();
	  		});
	  	}, err => {
	  		console.log(err);
	  		this.modalUf();
	  		this.loading.dismiss();
	  	});
  	}

  	/**
  	 * Salva o pedido
  	 */
  	salvar() {
  		this.showLoading('Aguarde');
  		this.auth.getUserData().subscribe((usuario) => { 
	  		this.pedido.created_at = firebase.database['ServerValue']['TIMESTAMP'];
	  		this.pedido.usuario = {
	  			id: usuario.$key,
	  			nome: usuario.nome,
				email: usuario.email,
				foto: usuario.image,
				telefone: usuario.telefone
	  		};

	  		this.data.push('pedidos', this.pedido).subscribe((response) => {
	  			this.loading.dismiss();
	  			this.navCtrl.pop();
	  			let toast = this.toastCtrl.create({
					message: 'Pedido enviado com sucesso',
					duration: 3000,
					position: 'bottom'
				});
				toast.present();
	  		}, err => {
	  			this.loading.dismiss();
	  			this.showError(err);
	  		});
	  	});
  	}

  

  	/**
   	* Modal para seleciona o estado manualmente
   	*/
	private modalUf() {
	    let modal = this.modalCtrl.create(ModalUfPage);
	    
	    modal.onDidDismiss(data => {
	      if(data.uf) {
	        this.ufAtual = data.uf.sigla;
	      }
	    });

	    modal.present();
	}

  	/**
   	 * Exibe o popup loading
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