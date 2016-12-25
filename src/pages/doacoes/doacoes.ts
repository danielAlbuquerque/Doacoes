import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { VerDoacoesPage } from '../ver-doacoes/ver-doacoes';

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

	goToPedirAjuda() {

	}

	goToDoacoes() {
		this.app.getRootNav().push(VerDoacoesPage);
	}

	

}
