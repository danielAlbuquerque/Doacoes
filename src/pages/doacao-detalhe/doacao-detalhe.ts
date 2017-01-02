import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { NavController, Slides, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { DoacaoProvider } from '../../providers/doacao';

@Component({
  selector: 'page-doacao-detalhe',
  templateUrl: 'doacao-detalhe.html',
  providers: [DoacaoProvider]
})
export class DoacaoDetalhePage {
	@ViewChildren('slide') slides: QueryList<ElementRef>;
  @ViewChild('slider') slider: Slides;

  public _robots: any[];
  public _sliderOptions: any;
  public loading: Loading;
  public id: string = null;
  public doacao: any;

	constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public doacaoProvider: DoacaoProvider
  ) {
		this._robots = [[],[],[]];           
		
    var i;
    
    for(i = 1; i <= 5; i++)             // 1st element will have 5 items
      this._robots[0].push(i);
    for(i = 1; i <= 15; i++)             // 2nd element will have 15 items
      this._robots[1].push(i);
    for(i = 1; i <= 25; i++)             // 1st element will have 25 items
      this._robots[2].push(i);

    this._sliderOptions = {
      pager: true
    }

    this.id = this.navParams.get('id');

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
    let currentSlide = this.slider.getActiveIndex();
    let slideElements = this.slides.toArray();

    let targetSlide = slideElements[currentSlide];
    //console.log(targetSlide);
    let height = targetSlide['ele']['children'][0]['clientHeight'];
    //console.log('target slide height = ' + height);

    this.slider._elementRef.nativeElement.style.height = height + 'px';
  }

}
