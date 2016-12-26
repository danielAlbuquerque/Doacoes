import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MomentModule } from 'angular2-moment';


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
import { VerDoacoesPage, PopoverPage, ModalUfPage } from '../pages/ver-doacoes/ver-doacoes';
import { PedidoDoacaoAddPage } from '../pages/pedido-doacao-add/pedido-doacao-add';
import { PedidoDoacaoTabPage } from '../pages/pedido-doacao-tab/pedido-doacao-tab';
import { PedidoDoacaoMapPage } from '../pages/pedido-doacao-map/pedido-doacao-map';
import { PedidoDoacaoListPage } from '../pages/pedido-doacao-list/pedido-doacao-list';
import { ChatPage } from '../pages/chat/chat';

// Providers
import { DataProvider } from '../providers/data';

// Config Firebase
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyBtfeUNoIA4WoM54c_Wx3huOh9T4N7xVHA",
  authDomain: "todo-17b62.firebaseapp.com",
  databaseURL: "https://todo-17b62.firebaseio.com",
  storageBucket: "todo-17b62.appspot.com",
  messagingSenderId: "112904404965"
}

@NgModule({
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
    DoarAddPage,
    VerDoacoesPage,
    PopoverPage,
    ModalUfPage,
    PedidoDoacaoAddPage,
    PedidoDoacaoTabPage,
    PedidoDoacaoMapPage,
    PedidoDoacaoListPage,
    ChatPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    MomentModule
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
    DoarAddPage,
    VerDoacoesPage,
    PopoverPage,
    ModalUfPage,
    PedidoDoacaoAddPage,
    PedidoDoacaoTabPage,
    PedidoDoacaoMapPage,
    PedidoDoacaoListPage,
    ChatPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
