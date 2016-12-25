import { NavController, NavParams, PopoverController, ViewController, Loading, LoadingController, AlertController } from 'ionic-angular';

import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'page-ver-doacoes',
  templateUrl: 'ver-doacoes.html'
})
export class VerDoacoesPage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  public loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerDoacoesPage');
  }

  showPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
        ev: ev
    });
  }

  /**
   * Exibe o popup loading
   */
  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
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
    <ion-list>
      <button ion-item (click)="close()">Mais Recentes</button>
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
