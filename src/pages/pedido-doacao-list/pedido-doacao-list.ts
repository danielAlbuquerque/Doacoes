import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';


@Component({
  selector: 'page-pedido-doacao-list',
  templateUrl: 'pedido-doacao-list.html'
})
export class PedidoDoacaoListPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad PedidoDoacaoListPage');
  	}

  	close() {
  		this.app.getRootNav().pop();
  	}

}
