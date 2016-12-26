import { Component } from '@angular/core';
import { NavController, NavParams, App, Loading, LoadingController, AlertController, ModalController } from 'ionic-angular';
import "leaflet";
import { PedidoProvider } from '../../providers/pedido';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import { ModalUfPage } from '../ver-doacoes/ver-doacoes';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-pedido-doacao-list',
  templateUrl: 'pedido-doacao-list.html',
  providers: [PedidoProvider]
})
export class PedidoDoacaoListPage {
	pedidos: any = [];
	loading: Loading;
	ufAtual: string;
  	

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public app: App,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public http: Http,
		public modalCtrl: ModalController,
		public pedidoProvider: PedidoProvider) {}

	ionViewDidLoad() {
    	this.localiza();
    }

    mensagem(to) {
    	this.app.getRootNav().push(ChatPage, {to: to});
    }

    /**
  	 * Localiza o usuário
  	 */
  	private localiza() {
  		this.showLoading('Buscando sua localização...');

  		Geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 10000}).then((resp) => {
  			let geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+resp.coords.latitude+","+resp.coords.longitude;  	
  			this.http.get(geocodingAPI)
  				.map(res => res.json())
  				.subscribe(localData => {
	  				if(localData.results[5].address_components[0].short_name) {
	  					this.ufAtual = localData.results[5].address_components[0].short_name;
	  					this.loadData(this.ufAtual);
	  				} else {
	  					this.showError("Não foi possível buscar a sua localização, selecione o estado");
	  					this.modalUf();
	  				}
	  				this.loading.dismiss();
	  			}, err => {
	  				console.log(err);
	  				this.loading.dismiss();
	  				this.showError("Não foi possível buscar a sua localização, selecione o estado");
	  				this.modalUf();
  			});

  		}).catch(err => {
  			this.showError(err);
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
	        this.loadData(this.ufAtual);
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

    /**
     * carrega os pedidos
     * @param {string} uf uf de origem
     */
  	private loadData(uf) {
  		this.showLoading('Carregando pedidos de doação...');
  		this.pedidoProvider.porEstado(uf).subscribe((pedidos) => {
  			console.log(pedidos);
  			this.pedidos = pedidos;
  			this.loading.dismiss();
  		}, err => {
  			console.log(err);
  			this.loading.dismiss();
  		});
  	}

  	close() {
  		this.app.getRootNav().pop();
  	}

}
