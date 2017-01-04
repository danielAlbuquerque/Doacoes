import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, App, Loading, LoadingController, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import "leaflet";
import { PedidoProvider } from '../../providers/pedido';
import { ModalUfPage } from '../ver-doacoes/ver-doacoes';
import { ChatPage } from '../chat/chat';
import { LocalizacaoProvider } from '../../providers/localizacao';
import { PedidoDoacaoAddPage } from '../pedido-doacao-add/pedido-doacao-add';

@Component({
  selector: 'page-pedido-doacao-list',
  templateUrl: 'pedido-doacao-list.html',
  providers: [PedidoProvider, LocalizacaoProvider]
})
export class PedidoDoacaoListPage {
	pedidos: any = [];
	loading: Loading;
	ufAtual: string;
  segOption: string = "lista";
  map: any;
  showMap: boolean = false;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public app: App,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController,
		public pedidoProvider: PedidoProvider,
    public localizacao: LocalizacaoProvider,
    public elementRef: ElementRef,
    public actionSheetCtrl: ActionSheetController
  ) {}

	  ionViewDidLoad() {
       this.localizacao.getUf().subscribe(uf => {
           this.ufAtual = uf;
           this.loadData(this.ufAtual);
       }, err => {
         console.log(err);
         this.modalUf();
       });
    }

    loadMapa() {
      this.showLoading('Carregando');

      setTimeout(() => {
        this.map = L.map('map',{ zoomControl:false, attributionControl:false }).setView([-0.057643799999999995, -51.169112], 8);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);
        this.pedidoProvider.porEstado(this.ufAtual).subscribe((pedidos) => {
          this.pedidos = pedidos;
          pedidos.forEach((pedido) => {
              if(pedido.mostrarLocalizacao){
                L.marker([pedido.lat, pedido.lng])
                .bindPopup("<b>"+ pedido.usuario.nome +"</b><br />"
                                + pedido.usuario.telefone + "<br />"
                                + pedido.descricao)
                .addTo(this.map);
              }
          });

          console.log(this.map);
          this.loading.dismiss();
        }, err => {
          console.log(err);
          this.loading.dismiss();
        });
      });
    }

    add() {
      this.app.getRootNav().push(PedidoDoacaoAddPage);
    }

    mensagem(to) {
    	this.app.getRootNav().push(ChatPage, {to: to});
    }

    presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Filtrar',
        buttons: [
          {
            text: 'Mais recentes',
            icon: 'calendar',
            handler: () => {
              
            }
          },
          {
            text: 'Mais próximos',
            icon: 'navigate',
            handler: () => {
              
            }
          },
          {
            text: 'Minhas publicações',
            icon: 'contact',
            handler: () => {
              
            }
          }
        ]
      });
      actionSheet.present();
    }


  	/**
   	* Modal para seleciona o estado manualmente
   	*/
  	private modalUf() {
	    let modal = this.modalCtrl.create(ModalUfPage);

	    modal.onDidDismiss(data => {
	      if(data.uf) {
	        this.ufAtual = data.uf.sigla;
          window.localStorage.setItem('UF', this.ufAtual);
	        this.loadData(this.ufAtual);
	      }
	    });

    	modal.present();
  	}

  	/**
     * Exibe o popup loading
     */
    private showLoading(text) {
	    this.loading = this.loadingCtrl.create({
	        content: text
	    });
	    this.loading.present();
    }

    /**
     * Exibe um erro
     * @param {[type]} text Mensagem de erro
     */
    private showError(text) {
    	setTimeout(() => {
        	this.loading.dismiss();
      	});

      	let alert = this.alertCtrl.create({
        	title: 'Fail',
        	subTitle: text,
        	buttons: ['OK']
      	});

      	alert.present(prompt);
    }

    /**
     * carrega os pedidos
     * @param {string} uf uf de origem
     */
  	private loadData(uf) {
  		this.showLoading('Carregando');
  		this.pedidoProvider.porEstado(uf).subscribe((pedidos) => {
  			console.log(pedidos);
  			this.pedidos = pedidos;
  			this.loading.dismiss();
  		}, err => {
  			console.log(err);
  			this.loading.dismiss();
  		});
  	}

  	close() {
  		this.app.getRootNav().pop();
  	}

    mapPopupOptions() {
      console.log("Teste");
      let actionSheet = this.actionSheetCtrl.create({
      title: 'Entrar em contato',
      buttons: [
        {
          text: 'Ver telefone',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Enviar mensagem',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
      });
      actionSheet.present();
    }

}
