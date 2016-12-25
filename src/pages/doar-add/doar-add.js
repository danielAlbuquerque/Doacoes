var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
import { DoacaoProvider } from '../../providers/doacao';
var DoarAddPage = (function () {
    /**
     * Construtor
     * @param {NavController}         public navCtrl         [description]
     * @param {NavParams}             public navParams       [description]
     * @param {Http}                  public http            [description]
     * @param {AlertController}       public alertCtrl       [description]
     * @param {LoadingController}     public loadingCtrl     [description]
     * @param {ActionSheetController} public actionSheetCtrl [description]
     */
    function DoarAddPage(navCtrl, navParams, http, alertCtrl, loadingCtrl, actionSheetCtrl, doacaoProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.doacaoProvider = doacaoProvider;
        this.images = [];
        this.doacao = { uf: '', descricao: '', images: [], lat: 0, lng: 0 };
        this.estados = [];
        this.estados = this.getEstados();
        console.log(this.estados);
    }
    DoarAddPage.prototype.ionViewDidLoad = function () {
        this.localizacao();
        // for(let i = 0; i < 3; i++){
        // 	this.images.push("http://placehold.it/50x50");
        // }
    };
    DoarAddPage.prototype.salvar = function () {
        var _this = this;
        this.doacaoProvider.salvaDoacao(this.doacao).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            _this.showError(err);
        });
    };
    /**
     * Actionsheet com opção de origem da foto
     */
    DoarAddPage.prototype.enviarOptions = function () {
        var _this = this;
        if (this.images.length < 4) {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'Obter foto da:',
                buttons: [
                    {
                        text: 'Câmera',
                        icon: 'camera',
                        handler: function () {
                            _this.useCamera();
                        }
                    },
                    {
                        text: 'Galeria',
                        icon: 'albums',
                        handler: function () {
                            _this.useGaleria();
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
            this.showError('O limite de fotos é 4');
        }
    };
    /**
     * Localização Via gps
     */
    DoarAddPage.prototype.localizacao = function () {
        var _this = this;
        this.showLoading('Buscando sua localização...');
        Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 }).then(function (resp) {
            var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + resp.coords.latitude + "," + resp.coords.longitude;
            _this.http.get(geocodingAPI)
                .map(function (res) { return res.json(); })
                .subscribe(function (localData) {
                if (localData.results[5].address_components[0].short_name) {
                    _this.doacao.lat = resp.coords.latitude;
                    _this.doacao.lng = resp.coords.longitude;
                    _this.doacao.uf = localData.results[5].address_components[0].short_name;
                }
                else {
                    _this.showError("Não foi possível buscar a sua localização, selecione o estado");
                }
                _this.loading.dismiss();
            }, function (err) {
                console.log(err);
                _this.loading.dismiss();
                _this.showError("Não foi possível buscar a sua localização, selecione o estado");
            });
        }).catch(function (err) {
            _this.showError(err);
        });
    };
    /**
     * Exibe o popup loading
     */
    DoarAddPage.prototype.showLoading = function (text) {
        this.loading = this.loadingCtrl.create({
            content: text
        });
        this.loading.present();
    };
    /**
     * Exibe um erro
     * @param {[type]} text Mensagem de erro
     */
    DoarAddPage.prototype.showError = function (text) {
        var _this = this;
        setTimeout(function () {
            _this.loading.dismiss();
        });
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    /**
     * Usa a camera
     */
    DoarAddPage.prototype.useCamera = function () {
        var _this = this;
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false,
            quality: 95,
            allowEdit: true,
            encodingType: Camera.EncodingType.PNG,
        }).then(function (imageData) {
            var data = "data:image/jpeg;base64," + imageData;
            _this.images.push(data);
        }, function (err) {
            //this.showError(err);
            console.log(err);
        });
    };
    /**
     * Usa a galeria
     */
    DoarAddPage.prototype.useGaleria = function () {
    };
    DoarAddPage.prototype.getEstados = function () {
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
    };
    return DoarAddPage;
}());
DoarAddPage = __decorate([
    Component({
        selector: 'page-doar-add',
        templateUrl: 'doar-add.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        AlertController,
        LoadingController,
        ActionSheetController,
        DoacaoProvider])
], DoarAddPage);
export { DoarAddPage };
//# sourceMappingURL=doar-add.js.map