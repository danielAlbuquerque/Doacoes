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
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
var DataProvider = (function () {
    /**
     * Construtor da classe
     * @param {AngularFire} private af
     */
    function DataProvider(af) {
        this.af = af;
    }
    /**
     * Adiciona um novo item ao documento
     * @param {string} path documento
     * @param {any}    data item
     */
    DataProvider.prototype.push = function (path, data) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.af.database.list(path).push(data).then(function (firebaseNewData) {
                var newData = firebaseNewData;
                observer.next(newData.path.o[newData.path.o.length - 1]);
            }, function (error) {
                observer.error(error);
            });
        });
    };
    /**
     * Atualiza
     * @param {string} path documento
     * @param {any}    data Item para atualizar
     */
    DataProvider.prototype.update = function (path, data) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.af.database.object(path).update(data).then(function (response) {
                console.log(response);
                observer.next(true);
                observer.complete();
            }, function (err) {
                console.log(err);
                observer.error(err);
            });
        });
    };
    /**
     * Retorna uma lista de itens
     * @param  {string}                      path documento
     * @return {FirebaseListObservable<any>}      retorna uma lista de objetos
     */
    DataProvider.prototype.list = function (path) {
        return this.af.database.list(path);
    };
    /**
     * Retorna um objeto específico
     * @param  {string}          path documento
     * @return {Observable<any>}      retorna o objeto solicitado
     */
    DataProvider.prototype.object = function (path) {
        return this.af.database.object(path);
    };
    /**
     * Remove um determinado item
     * @param  {string}          path documento
     */
    DataProvider.prototype.remove = function (path) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.af.database.object(path).remove().then(function (data) {
                observer.next();
            }, function (error) {
                observer.error(error);
            });
        });
    };
    return DataProvider;
}());
DataProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], DataProvider);
export { DataProvider };
//# sourceMappingURL=data.js.map