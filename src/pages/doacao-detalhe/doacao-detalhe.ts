import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { NavController, Slides, NavParams, LoadingController, AlertController, Loading, ActionSheetController } from 'ionic-angular';
import { DoacaoProvider } from '../../providers/doacao';

@Component({
  selector: 'page-doacao-detalhe',
  templateUrl: 'doacao-detalhe.html',
  providers: [DoacaoProvider]
})
export class DoacaoDetalhePage {
	@ViewChildren('slide') slides: QueryList<ElementRef>;
  @ViewChild('slider') slider: Slides;

  public _sliderOptions: any;
  public loading: Loading;
  public id: string = null;
  public doacao: any = {usuario: {}};

	constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public doacaoProvider: DoacaoProvider,
    public actionSheetCtrl: ActionSheetController
  ) {

    this._sliderOptions = {
      pager: true
    }

    this.id = this.navParams.get('id');

	}

  share() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Compartilhar',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

	ionViewDidLoad() {
    this.showLoading("Carregando...");
    this.doacaoProvider.getById(this.id).subscribe((doacao) => {
      this.doacao = doacao;
      console.log(this.doacao);
      this.loading.dismiss();
    }, err => {
      this.showError(err);
      this.loading.dismiss();
    });
	}

  denunciar() {
    let prompt = this.alertCtrl.create({
      title: 'Denunciar publicação',
      message: "Descreva a denuncia",
      inputs: [
        {
          name: 'Denuncia',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            
          }
        }
      ]
    });
    prompt.present();
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

	ionViewDidEnter() {
      this.SlideChanged();
  }

	SlideChanged() {
    //let currentSlide = this.slider.getActiveIndex();
    //let slideElements = this.slides.toArray();



    //let targetSlide = slideElements[currentSlide];
    //console.log(targetSlide);
    //let height = targetSlide['ele']['children'][0]['clientHeight'];
    //console.log('target slide height = ' + height);

    //this.slider._elementRef.nativeElement.style.height = height + 'px';
  }

}
