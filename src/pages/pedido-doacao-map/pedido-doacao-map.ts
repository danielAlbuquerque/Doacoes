import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import "leaflet";
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-pedido-doacao-map',
  templateUrl: 'pedido-doacao-map.html'
})
export class PedidoDoacaoMapPage {

	pedidos: any = [];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public app: App,
		public data: DataProvider) {}

	ionViewDidLoad() {
    	
  	}

  	private loadData() {
  		
  	}

  	close() {
  		this.app.getRootNav().pop();
  	}

}
