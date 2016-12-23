import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';

@Component({
  selector: 'page-doar-add',
  templateUrl: 'doar-add.html'
})
export class DoarAddPage {
	loading: Loading;

	doacao = { uf: '' }

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public http: Http,
		public alertCtrl: AlertController,
	  	public loadingCtrl: LoadingController,
	) {}

	ionViewDidLoad() {
    	this.localizacao();
  	}


  	/**
  	 * Localização Via gps
  	 */
  	localizacao() {
  		this.showLoading('Buscando sua localização...');

  		Geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 10000}).then((resp) => {
  			let geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+resp.coords.latitude+","+resp.coords.longitude;
  			
  			console.log(resp);
  			console.log(geocodingAPI);


  			this.http.get(geocodingAPI)
  				.map(res => res.json())
  				.subscribe(localData => {
	  				if(localData.results[5].address_components[0].short_name) {
	  					this.doacao.uf = localData.results[5].address_components[0].short_name;	
	  				} else {
	  					this.showError("Não foi possível buscar a sua localização, selecione o estado");
	  				}
	  				this.loading.dismiss();
	  			}, err => {
	  				console.log(err);
	  				this.loading.dismiss();
	  				this.showError("Não foi possível buscar a sua localização, selecione o estado");
  			});

  		}).catch(err => {
  			this.showError(err);
  		});
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
