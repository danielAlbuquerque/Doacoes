import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { NavController, Slides, NavParams } from 'ionic-angular';

/*
  Generated class for the DoacaoDetalhe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-doacao-detalhe',
  templateUrl: 'doacao-detalhe.html'
})
export class DoacaoDetalhePage {
	@ViewChildren('slide') slides: QueryList<ElementRef>;
    @ViewChild('slider') slider: Slides;

    public _robots: any[];
    public _sliderOptions: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this._robots = [[],[],[]];           // 3 inner arrays
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
	}

  	ionViewDidLoad() {
    	
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
