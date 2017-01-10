import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { RegistrarPage } from '../registrar/registrar';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';

import { AuthProvider } from '../../providers/auth';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthProvider]
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
   * @param {AuthProvider}      private auth 
   */
	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	public formBuilder: FormBuilder,
	  	public alertCtrl: AlertController,
	  	public loadingCtrl: LoadingController,
      private auth: AuthProvider
  	) {
  		  this.loginForm = formBuilder.group({
        	email: ['', Validators.compose([Validators.required])],
        	password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      	});

  	}


    ionViewDidLoad() {
        this.verificaLogado();
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
  			
        this.auth.loginEmail(this.loginForm.value).subscribe(result => {
            setTimeout(() => {
              this.loading.dismiss();
              this.navCtrl.setRoot(HomePage);
            });
        }, error => {
            switch(error.code) {
                case 'auth/invalid-email':
                    this.showError("E-Mail inválido");
                    break;
                case 'auth/timeout':
                    this.showError("Verifique sua conexão com a internet");
                    break;
                case 'auth/user-not-found':
                    this.showError("E-Mail não encontrado");
                    break;
                case 'auth/wrong-password':
                    this.showError("Senha inválida");
                    break;
                default:
                    this.showError(error.message);
                    break;
            }

            console.log(error);
        });
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
  		this.auth.loginFacebook().subscribe(() => {
        setTimeout(() => {
           this.navCtrl.setRoot(HomePage); 
        });
         
      }, (err) => {
          if(err.errorMessage == "Facebook error: CONNECTION_FAILURE: CONNECTION_FAILURE") {
              this.showError("Verifique sua conexão com a internet");
          }
            
          console.log(err);
      });
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
  			title: 'Erro',
  			subTitle: text,
  			buttons: ['OK']
  		});

  		alert.present(prompt);
  	}

    /**
     * Verifica se o usuário já está logado
     */
    private verificaLogado() {
        this.showLoading();
        this.auth.getUserData().subscribe((user) => {
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, err => {
            this.loading.dismiss();
        });
    }


}
