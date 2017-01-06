import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
	messages: FirebaseListObservable<any>;
	chatBox: string = '';
	refConversa: any;
	currentUser: any;
	idUsuarioDest: any;
  chatUserRef: any;
  chatDestUserRef: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthProvider,
		public af: AngularFire
	) {
		this.idUsuarioDest = this.navParams.get('idUsuarioDest');
	}

	ionViewDidLoad() {
    	this.auth.getUserData().subscribe(currentUser => {
    		this.currentUser = currentUser;
    		let userKey = this.currentUser.$key;
    		let destKey =  this.idUsuarioDest;
    		this.af.database.list('chats').push({
    			title: 'Teste chat',
    			timestamp: firebase.database['ServerValue']['TIMESTAMP'],
    			members: {
    				[userKey]: true,
    				[destKey]: true
    			}
    		}).then((chatData) => {
          let chatId = chatData.path.o[chatData.path.o.length - 1];
    			this.messages = this.af.database.list('chats/'+chatId+'/messages');

    			console.log(this.messages);

          // chat dentro do usuário
          this.chatUserRef = firebase.database().ref('usuarios').child(userKey).child('chats').child(chatId);
          this.chatDestUserRef = firebase.database().ref('usuarios').child(destKey).child('chats').child(chatId);;

          this.chatUserRef.update({
            name: 'Daniel',
            lastMessage: 'adgadgadadg...'
          });

          this.chatDestUserRef.update({
            name: 'Daniel 2',
            lastMessage: 'adgadg adgadgadadg...'
          });
    		});
		});
  	}

  	enviar(msg) {
  		this.messages.push({
  			name: this.currentUser.nome,
  			created_at: firebase.database['ServerValue']['TIMESTAMP'],
  			message: msg
  		});
  	}



}
