import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, ActionSheetController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
import { DoacaoProvider } from '../../providers/doacao';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth';
import { LocalizacaoProvider } from '../../providers/localizacao';

@Component({
  selector: 'page-doar-add',
  templateUrl: 'doar-add.html',
  providers: [DoacaoProvider, AuthProvider, LocalizacaoProvider]
})
export class DoarAddPage {
	loading: Loading;
	doacao = { uf: '', titulo: '', descricao: '', images: [], lat: 0, lng: 0, user: '', foto: '', usuario: {} };


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
	  	public doacaoProvider: DoacaoProvider,
	  	public auth: AuthProvider,
	  	public localizacao: LocalizacaoProvider
	) {
		
	}

	ionViewDidLoad() {
		this.localizacao.getUf().subscribe((uf) => {
			this.doacao.uf = uf;
		});

    	this.auth.getUserData().subscribe(user => {
    		this.doacao.user = user.$key;
    	});
  	}

  	salvar() {
  		this.showLoading('Aguarde...');
  		this.doacaoProvider.salvaDoacao(this.doacao).subscribe(data => {
  			this.loading.dismiss();
  			this.navCtrl.pop();
  			this.navCtrl.setRoot(HomePage);
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
	        targetWidth: 600,
	        targetHeight: 390,
	        saveToPhotoAlbum: true,
	        quality: 95,
	        allowEdit : true,
	        encodingType: Camera.EncodingType.JPEG,
	        mediaType: Camera.MediaType.PICTURE
	    }).then((imageData) => {
       		this.doacao.images.push("data:image/jpeg;base64," + imageData);
	    }, (err) => {
	        console.log(err);
	    });
    }

    /**
     * Usa a galeria
     */
    private useGaleria() {
    	Camera.getPicture({
	        destinationType: Camera.DestinationType.DATA_URL,
	        targetWidth: 600,
	        targetHeight: 390,
	        saveToPhotoAlbum: true,
	        quality: 95,
	        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
	        allowEdit : true,
	        encodingType: Camera.EncodingType.JPEG,
	        mediaType: Camera.MediaType.PICTURE
	    }).then((imageData) => {
       		this.doacao.images.push("data:image/jpeg;base64," + imageData);
	    }, (err) => {
	        console.log(err);
	    });
    }
}
