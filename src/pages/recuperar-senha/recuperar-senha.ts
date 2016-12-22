import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html'
})
export class RecuperarSenhaPage {

	public resetPasswordForm;
	emailChanged: boolean = false;
  	passwordChanged: boolean = false;
  	submitAttempt: boolean = false;
  	loading: Loading;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public formBuilder: FormBuilder,
  		public loadingCtrl: LoadingController, 
    	public alertCtrl: AlertController
  	) {
  		this.resetPasswordForm = formBuilder.group({
      		email: ['', Validators.compose([Validators.required])],
    	});
  	}

  	/** Envia senha por e-mail */
  	resetPassword(){
  		this.submitAttempt = true;
  	}

  	/** Não sei pra que serve essa porra */
  	elementChanged(input){
	    let field = input.inputControl.name;
	    this[field + "Changed"] = true;
  	}

  	/** Exibe o popup loading */
  	private showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Aguarde...'
		});
		this.loading.present();
	}

	/** Exibe uma mensagem de erro ao usuário */
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
