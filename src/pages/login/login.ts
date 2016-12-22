import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	loginForm: any;

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

  

}
