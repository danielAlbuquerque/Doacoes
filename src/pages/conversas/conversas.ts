import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { DataProvider } from '../../providers/data';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-conversas',
  templateUrl: 'conversas.html',
  providers: [AuthProvider, DataProvider]
})
export class ConversasPage {

  conversas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public dataProvider: DataProvider, public af: AngularFire, public app: App, public alertCtrl: AlertController) {
      this.loadChats();
  }

  loadChats() {
    this.authProvider.getUserData().subscribe(currentUser => { 
      this.conversas = this.af.database.list('usuarios/'+currentUser.$key+'/chats');
    });
  }

  chat(destId) {
    this.app.getRootNav().push(ChatPage, {idUsuarioDest: destId});
  }

  options(e) {
    let confirm = this.alertCtrl.create({
      title: 'Deseja realmente excluir?',
      message: 'Deseja apagar a conversa?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log(e);
          }
        }
      ]
    });
    confirm.present();
  }
}
