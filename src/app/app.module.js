var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { DoacoesPage } from '../pages/doacoes/doacoes';
import { DoarPage } from '../pages/doar/doar';
import { ConversasPage } from '../pages/conversas/conversas';
import { PerfilPage } from '../pages/perfil/perfil';
import { DoarAddPage } from '../pages/doar-add/doar-add';
// Providers
import { DataProvider } from '../providers/data';
// Config Firebase
import { AngularFireModule } from 'angularfire2';
export var firebaseConfig = {
    apiKey: "AIzaSyBtfeUNoIA4WoM54c_Wx3huOh9T4N7xVHA",
    authDomain: "todo-17b62.firebaseapp.com",
    databaseURL: "https://todo-17b62.firebaseio.com",
    storageBucket: "todo-17b62.appspot.com",
    messagingSenderId: "112904404965"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            LoginPage,
            RegistrarPage,
            RecuperarSenhaPage,
            HomePage,
            DoacoesPage,
            DoarPage,
            ConversasPage,
            PerfilPage,
            DoarAddPage
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            AngularFireModule.initializeApp(firebaseConfig)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            LoginPage,
            RegistrarPage,
            RecuperarSenhaPage,
            HomePage,
            DoacoesPage,
            DoarPage,
            ConversasPage,
            PerfilPage,
            DoarAddPage
        ],
        providers: [
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            DataProvider
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map