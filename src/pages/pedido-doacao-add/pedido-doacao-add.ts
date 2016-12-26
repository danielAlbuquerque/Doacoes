import { Component } from '@angular/core';
import { 
  NavController, 
  NavParams, 
  PopoverController, 
  ViewController, 
  Loading, 
  LoadingController, 
  AlertController,
  ModalController, Platform } from 'ionic-angular';

import { Http } from '@angular/http';
import { DataProvider } from '../../providers/data';
import { Geolocation } from 'ionic-native';
import { ModalUfPage } from '../ver-doacoes/ver-doacoes';
import "leaflet";
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-pedido-doacao-add',
  templateUrl: 'pedido-doacao-add.html',
  providers: [DataProvider, AuthProvider]
})
export class PedidoDoacaoAddPage {
	loading: Loading;
  	ufAtual: string = null;
  	pedido = {uf: '', descricao: '', mostrarLocalizacao: true, lat: 0, lng: 0, created_at: '', usuario: {}, atendido: false};
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
    	public auth: AuthProvider
	) {}

	ionViewDidLoad() {
		this.platform.ready().then(() => {
            this.localizaUsuario();
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
	  			nome: usuario.nome,
				email: usuario.email,
				foto: usuario.image,
				telefone: usuario.telefone
	  		};

	  		this.data.push('pedidos', this.pedido).subscribe((response) => {
	  			this.loading.dismiss();
	  			this.navCtrl.pop();
	  		}, err => {
	  			this.loading.dismiss();
	  			this.showError(err);
	  		});
	  	});
  	}

  	/**
   * Localiza
   */
  	private localizaUsuario() {
      this.showLoading('Buscando sua localização...');

  		Geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 10000}).then((resp) => {
			this.pedido.lat = resp.coords.latitude;
			this.pedido.lng = resp.coords.longitude;

  			let geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+resp.coords.latitude+","+resp.coords.longitude;  	
  			this.http.get(geocodingAPI)
  				.map(res => res.json())
  				.subscribe(localData => {
            		this.loading.dismiss();
	  				if(localData.results[5].address_components[0].short_name) {
	  					this.ufAtual = localData.results[5].address_components[0].short_name;

              			this.map = L.map('map',{ zoomControl:false, attributionControl:false }).setView([this.pedido.lat, this.pedido.lng], 13);
              			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
							maxZoom: 19,
							attribution: ''
						}).addTo(this.map);
              			L.marker([this.pedido.lat, this.pedido.lng]).addTo(this.map);


	  				} else {
	  					this.showError("Não foi possível buscar a sua localização, selecione o estado");
              			this.modalUf();
	  				}
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

  getEstados() {
    	return [
    		{ sigla: 'ac', uf: 'Acre', checked: false },
	    	{ sigla: 'al', uf: 'Alagoas', checked: false },
	    	{ sigla: 'ap', uf: 'Amapá', checked: false },
	    	{ sigla: 'am', uf: 'Amazonas', checked: false },
	    	{ sigla: 'ba', uf: 'Bahia', checked: false },
	    	{ sigla: 'ce', uf: 'Ceará', checked: false },
	    	{ sigla: 'es', uf: 'Espírito Santo', checked: false },
	    	{ sigla: 'go', uf: 'Goiás', checked: false },
	    	{ sigla: 'ma', uf: 'Maranhão', checked: false },
	    	{ sigla: 'mt', uf: 'Mato Grosso', checked: false },
	    	{ sigla: 'ms', uf: 'Mato Grosso do Sul', checked: false },
	    	{ sigla: 'mg', uf: 'Minas Gerais', checked: false },
	    	{ sigla: 'pa', uf: 'Pará', checked: false },
	    	{ sigla: 'pb', uf: 'Paraíba', checked: false },
	    	{ sigla: 'pr', uf: 'Paraná', checked: false },
	    	{ sigla: 'pe', uf: 'Pernambuco', checked: false },
	    	{ sigla: 'pi', uf: 'Piauí', checked: false },
	    	{ sigla: 'rj', uf: 'Rio de Janeiro', checked: false },
	    	{ sigla: 'rn', uf: 'Rio Grande do Norte', checked: false },
	    	{ sigla: 'rs', uf: 'Rio Grande do Sul', checked: false },
	    	{ sigla: 'ro', uf: 'Rondônia', checked: false },
	    	{ sigla: 'rr', uf: 'Roraima', checked: false },
	    	{ sigla: 'sc', uf: 'Santa Catarina', checked: false },
	    	{ sigla: 'sp', uf: 'São Paulo', checked: false },
	    	{ sigla: 'se', uf: 'Sergipe', checked: false },
	    	{ sigla: 'to', uf: 'Tocantins', checked: false }
    	];
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


