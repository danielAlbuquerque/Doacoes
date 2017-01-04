import {
  NavController,
  NavParams,
  PopoverController,
  ViewController,
  Loading,
  LoadingController,
  AlertController,
  ModalController, App } from 'ionic-angular';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { DoacaoDetalhePage } from '../doacao-detalhe/doacao-detalhe';
import { DoacaoProvider } from '../../providers/doacao';
import { LocalizacaoProvider } from '../../providers/localizacao';
import { DoarAddPage } from '../doar-add/doar-add';

@Component({
  selector: 'page-ver-doacoes',
  templateUrl: 'ver-doacoes.html',
  providers: [DoacaoProvider, LocalizacaoProvider]
})
export class VerDoacoesPage {
  // @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  // @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  loading: Loading;
  ufAtual: string = null;
  doacoes: Array<any> = [];
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    public modalCtrl: ModalController,
    public doacaoProvider: DoacaoProvider,
    public localizacao: LocalizacaoProvider,
    public app: App
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

  detalhesDoacao(id) {
    this.navCtrl.push(DoacaoDetalhePage, {id: id});
  }

  /**
   * Redireciona o usuário para a página de add
   */
  add() {
    this.app.getRootNav().push(DoarAddPage);
  }


  /**
   * Exibe o popover
   */
  showPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
        ev: ev
    });
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
   * Carrega os dados
   * @param {string} uf estado
   */
  private loadData(uf) {
    this.showLoading('Carregando');
    this.doacaoProvider.doacoesLocais(uf).subscribe((doacoes) => {
      this.doacoes = doacoes;
      this.loading.dismiss();
    }, err => {
      this.showError(err);
      this.loading.dismiss();
    })
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

}


@Component({
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Selecione o seu estado
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <button (click)="setUf(uf)" ion-item *ngFor="let uf of getEstados()">
          {{uf.sigla.toUpperCase()}} - {{uf.uf.toUpperCase()}}
        </button>
      </ion-list>
    </ion-content>
`
})
export class ModalUfPage {
  uf: any = '';

  constructor(
    public viewCtrl: ViewController
  ) {

  }

  setUf(uf) {
    this.uf = uf;
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss({uf: this.uf});
  }

  getEstados() {
      return [
        { sigla: 'ac', uf: 'Acre', checked: false },
        { sigla: 'al', uf: 'Alagoas', checked: false },
        { sigla: 'ap', uf: 'Amapá', checked: false },
        { sigla: 'am', uf: 'Amazonas', checked: false },
        { sigla: 'ba', uf: 'Bahia', checked: false },
        { sigla: 'ce', uf: 'Ceará', checked: false },
        { sigla: 'es', uf: 'Espírito Santo', checked: false },
        { sigla: 'go', uf: 'Goiás', checked: false },
        { sigla: 'ma', uf: 'Maranhão', checked: false },
        { sigla: 'mt', uf: 'Mato Grosso', checked: false },
        { sigla: 'ms', uf: 'Mato Grosso do Sul', checked: false },
        { sigla: 'mg', uf: 'Minas Gerais', checked: false },
        { sigla: 'pa', uf: 'Pará', checked: false },
        { sigla: 'pb', uf: 'Paraíba', checked: false },
        { sigla: 'pr', uf: 'Paraná', checked: false },
        { sigla: 'pe', uf: 'Pernambuco', checked: false },
        { sigla: 'pi', uf: 'Piauí', checked: false },
        { sigla: 'rj', uf: 'Rio de Janeiro', checked: false },
        { sigla: 'rn', uf: 'Rio Grande do Norte', checked: false },
        { sigla: 'rs', uf: 'Rio Grande do Sul', checked: false },
        { sigla: 'ro', uf: 'Rondônia', checked: false },
        { sigla: 'rr', uf: 'Roraima', checked: false },
        { sigla: 'sc', uf: 'Santa Catarina', checked: false },
        { sigla: 'sp', uf: 'São Paulo', checked: false },
        { sigla: 'se', uf: 'Sergipe', checked: false },
        { sigla: 'to', uf: 'Tocantins', checked: false }
      ];
    }
}


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Alterar Localização</button>
      <button ion-item (click)="close()">Mais Próximos</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
