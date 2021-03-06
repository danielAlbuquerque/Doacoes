import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { VerDoacoesPage } from '../ver-doacoes/ver-doacoes';
import { PedidoDoacaoAddPage } from '../pedido-doacao-add/pedido-doacao-add';
import { PedidoDoacaoTabPage } from '../pedido-doacao-tab/pedido-doacao-tab';

@Component({
  selector: 'page-doacoes',
  templateUrl: 'doacoes.html'
})
export class DoacoesPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public app: App
	) {}

	goToReceber() {
		this.app.getRootNav().push(PedidoDoacaoAddPage);
	}

	goToDoacoes() {
		this.app.getRootNav().push(VerDoacoesPage);
	}

	goToPedidos() {
		this.app.getRootNav().push(PedidoDoacaoTabPage);
	}

	

}
