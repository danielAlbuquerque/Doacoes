import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, ActionSheetController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-doar-add',
  templateUrl: 'doar-add.html'
})
export class DoarAddPage {
	loading: Loading;
	images: Array<any> = [];
	doacao = { uf: '' };
	slideOptions = {
    	pager:true,
    	autoplay: 5000
  	};


	/**
	 * Construtor
	 * @param {NavController}         public navCtrl         [description]
	 * @param {NavParams}             public navParams       [description]
	 * @param {Http}                  public http            [description]
	 * @param {AlertController}       public alertCtrl       [description]
	 * @param {LoadingController}     public loadingCtrl     [description]
	 * @param {ActionSheetController} public actionSheetCtrl [description]
	 */
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public http: Http,
		public alertCtrl: AlertController,
	  	public loadingCtrl: LoadingController,
	  	public actionSheetCtrl: ActionSheetController
	) {}

	ionViewDidLoad() {
    	this.localizacao();

  	}

  	/**
  	 * Actionsheet com opção de origem da foto
  	 */
  	enviarOptions() {
  		if(this.images.length < 4){
	  		let actionSheet = this.actionSheetCtrl.create({
	      		title: 'Obter foto da:',
	      		buttons: [
			        {
			          text: 'Câmera',
			          icon: 'camera',
			          handler: () => {
			            this.useCamera();
			          }
			        },
			        {
			          text: 'Galeria',
			          icon: 'albums',
			          handler: () => {
			            this.useGaleria();
			          }
			        }
	      		]
	    	});
	    	actionSheet.present();
	    } else {
	    	this.showError('O limite de fotos é 4');
	    }


  	}


  	/**
  	 * Localização Via gps
  	 */
  	localizacao() {
  		this.showLoading('Buscando sua localização...');

  		Geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 10000}).then((resp) => {
  			let geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+resp.coords.latitude+","+resp.coords.longitude;  	
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

    /**
     * Usa a camera
     */
    private useCamera() {
		Camera.getPicture({
	        destinationType: Camera.DestinationType.DATA_URL,
	        targetWidth: 500,
	        targetHeight: 500,
	        saveToPhotoAlbum: false,
	        quality: 95,
	        allowEdit : true,
	        encodingType: Camera.EncodingType.PNG,
	    }).then((imageData) => {
	    	let data = "data:image/jpeg;base64," + imageData;
       		this.images.push(data);
	    }, (err) => {
	    	this.showError(err);
	        console.log(err);
	    });
    }

    /**
     * Usa a galeria
     */
    private useGaleria() {

    }
}
