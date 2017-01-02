import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// pages
import { ConversasPage } from '../conversas/conversas';
import { PerfilPage } from '../perfil/perfil';
import { VerDoacoesPage } from '../ver-doacoes/ver-doacoes';
import { PedidoDoacaoListPage } from '../pedido-doacao-list/pedido-doacao-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	tabVerDoacoes:	any = VerDoacoesPage;
	tabDoacao:      any = PedidoDoacaoListPage;
	tabConversas:   any = ConversasPage;
	tabPerfil:      any = PerfilPage;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
