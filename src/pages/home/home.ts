import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// pages
import { DoacoesPage } from '../doacoes/doacoes';
import { DoarPage } from '../doar/doar';
import { ConversasPage } from '../conversas/conversas';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	tabDoacoes:   any = DoacoesPage;
	tabDoar:      any = DoarPage;
	tabConversas: any = ConversasPage;
	tabPerfil:    any = PerfilPage;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
    	
  	}

}
