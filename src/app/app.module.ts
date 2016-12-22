import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';


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
    HomePage
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
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
