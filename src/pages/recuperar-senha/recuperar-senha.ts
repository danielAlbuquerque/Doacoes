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

    /**
     * Construtor
     * @param {NavController}     public navCtrl    
     * @param {NavParams}         public navParams   
     * @param {FormBuilder}       public formBuilder 
     * @param {LoadingController} public loadingCtrl 
     * @param {AlertController}   public alertCtrl   
     */
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

  	/**
     * ação do botao recuperar senha
     */
  	resetPassword(){
  		this.submitAttempt = true;
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
