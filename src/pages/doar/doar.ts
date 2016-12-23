import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DoarAddPage } from '../doar-add/doar-add';

@Component({
  selector: 'page-doar',
  templateUrl: 'doar.html'
})
export class DoarPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad DoarPage');
  	}

  	/**
  	 * Redireciona o usuário para a página de add
  	 */
  	add() {
  		this.navCtrl.push(DoarAddPage);
  	}

}
