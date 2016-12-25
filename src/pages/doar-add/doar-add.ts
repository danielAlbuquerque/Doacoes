import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, ActionSheetController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
import { DoacaoProvider } from '../../providers/doacao';


@Component({
  selector: 'page-doar-add',
  templateUrl: 'doar-add.html',
  providers: [DoacaoProvider]
})
export class DoarAddPage {
	loading: Loading;
	doacao = { uf: '', descricao: '', images: [], lat: 0, lng: 0 };
	images: Array<any> = [];
	estados: Array<any> = [];


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
	  	public actionSheetCtrl: ActionSheetController,
	  	public doacaoProvider: DoacaoProvider
	) {
		this.estados = this.getEstados();
		console.log(this.estados);
	}

	ionViewDidLoad() {
    	this.localizacao();
    	// for(let i = 0; i < 3; i++){
    	// 	this.images.push("http://placehold.it/50x50");
    	// }
  	}

  	salvar() {
  		this.showLoading('Salvando...');
  		this.doacaoProvider.salvaDoacao(this.doacao).subscribe(data => {
  			console.log(data);
  			this.loading.dismiss();
  			this.navCtrl.setRoot();
  		}, err => {
  			this.loading.dismiss();
  			this.showError(err);
  		});
  	}

  	/**
  	 * Actionsheet com opção de origem da foto
  	 */
  	enviarOptions() {
  		if(this.doacao.images.length < 4){
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
	  					this.doacao.lat = resp.coords.latitude;
	  					this.doacao.lng = resp.coords.longitude;
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
	        saveToPhotoAlbum: true,
	        quality: 95,
	        allowEdit : false,
	        encodingType: Camera.EncodingType.JPEG,
	        mediaType: Camera.MediaType.PICTURE
	    }).then((imageData) => {
	    	this.images.push("data:image/jpeg;base64," + imageData);

	    	let blob: any = new Blob( [imageData], { type: "image/jpeg" } );
            blob.name = 'image.jpg';

       		this.doacao.images.push(blob);

	    }, (err) => {
	    	//this.showError(err);
	        console.log(err);
	    });
    }

    /**
     * Usa a galeria
     */
    private useGaleria() {

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
}
