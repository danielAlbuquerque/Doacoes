import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { DoacaoProvider } from '../../providers/doacao';
import { DoarAddPage } from '../doar-add/doar-add';



@Component({
  selector: 'page-doar',
  templateUrl: 'doar.html',
  providers: [DoacaoProvider]
})
export class DoarPage {
    doacoes: Array<any> = [];

    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public app: App,
      public doacaoProvider: DoacaoProvider
     ) {}

	  ionViewDidLoad() {
    	  this.doacaoProvider.minhasDoacoes().subscribe(doacoes => {
            this.doacoes = doacoes;
            console.log(doacoes); 
        });
  	}

  	/**
  	 * Redireciona o usuário para a página de add
  	 */
  	add() {
        this.app.getRootNav().push(DoarAddPage);
  	}


    

}
