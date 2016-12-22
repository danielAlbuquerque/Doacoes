import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html'
})
export class RegistrarPage {
	registrarForm;
	nomeChanged: boolean = false;
	emailChanged: boolean = false;
  	passwordChanged: boolean = false;
  	submitAttempt: boolean = false;
  	loading: Loading;

  	/**
  	 * Construtor
  	 * @param {NavController}     public navCtrl     
  	 * @param {NavParams}         public navParams   
  	 * @param {FormBuilder}       public formBuilder 
  	 * @param {AlertController}   public alertCtrl   
  	 * @param {LoadingController} public loadingCtrl 
  	 */
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public formBuilder: FormBuilder,
	  	public alertCtrl: AlertController,
	  	public loadingCtrl: LoadingController
	) {
		this.registrarForm = formBuilder.group({
			nome: ['', Validators.compose([Validators.required])],
        	email: ['', Validators.compose([Validators.required])],
        	password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      	});
	}


  	/**
  	 * Registrar
  	 */
  	registrar() {
  		this.submitAttempt = true;
  		if(!this.registrarForm.valid) {
  			console.log(this.registrarForm.value);
  		} else {
  			this.showLoading();
  			// Todo: Implementar o registro
  		}
  	}

  	/**
     * Não sei oq essa porra faz mas precisa ta aqui ]
     * @param {[type]} input elemento do form
     */
    elementChanged(input){
      	let field = input.inputControl.name;
      	this[field + "Changed"] = true;
    }

  	/**
     * Exibe o popup loading
     */
    private showLoading() {
	    this.loading = this.loadingCtrl.create({
	        content: 'Aguarde...'
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
