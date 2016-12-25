var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from './data';
var DoacaoProvider = (function () {
    /**
     * Construtor
     * @param {DataProvider} data provider
     */
    function DoacaoProvider(data) {
        this.data = data;
    }
    /**
     * Registra uma nova doacao
     * @param {[type]} doacaoData
     */
    DoacaoProvider.prototype.salvaDoacao = function (doacaoData) {
        var _this = this;
        return Observable.create(function (observer) {
            var doacao = {
                doado: false,
                descricao: doacaoData.descricao,
                uf: doacaoData.uf,
                lat: doacaoData.lat,
                lng: doacaoData.lng,
                fotos: doacaoData.images
            };
            _this.data.push('doacoes', doacaoData).subscribe(function (data) {
                console.log(data);
                observer.next(data);
                observer.complete();
            }, function (err) {
                observer.error(err);
            });
        });
    };
    return DoacaoProvider;
}());
DoacaoProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DataProvider])
], DoacaoProvider);
export { DoacaoProvider };
//# sourceMappingURL=doacao.js.map