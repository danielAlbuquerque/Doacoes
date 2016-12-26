import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PedidoDoacaoMapPage } from '../pedido-doacao-map/pedido-doacao-map';
import { PedidoDoacaoListPage } from '../pedido-doacao-list/pedido-doacao-list';

@Component({
  selector: 'page-pedido-doacao-tab',
  templateUrl: 'pedido-doacao-tab.html'
})
export class PedidoDoacaoTabPage {
	tabMap:   any = PedidoDoacaoMapPage;
	tabList:  any = PedidoDoacaoListPage;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
    	
  	}



}
