import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { RegistrarPage } from '../registrar/registrar';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	loginForm: any;
	emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
	loading: Loading;	

  /**
   * [constructor description]
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
  		this.loginForm = formBuilder.group({
        	email: ['', Validators.compose([Validators.required])],
        	password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      	});
  	}

  	/**
     * Realiza o login
     */
  	loginEmail() {
  		this.submitAttempt = true;
  		if(!this.loginForm.valid) {
  			console.log(this.loginForm.value);
  		} else {
  			this.showLoading();
  			// Todo: Implementar o registro
  		}
  	}

  	/**
     * Envia o usuário para a págin de criar conta
     */
  	criarConta() {
  		this.navCtrl.push(RegistrarPage);	
  	}

  	/**
     * Envia o usuário para a página de recuperar senha
     */
  	recuperarSenha() {
  		this.navCtrl.push(RecuperarSenhaPage);
  	}


  	/**
     * Realiza o login através do facebook]
     */
  	loginFacebook() {
  		// Todo: Implementar essa function
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
