import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [DataProvider]
})
export class ChatPage {
	messages:    FirebaseListObservable<any>;
	chatBox:     string = '';
	currentUser: any;
	destUser:    any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,public af: AngularFire, public dataProvider: DataProvider) {
		this.auth.getUserData().subscribe(currentUser => {
			this.currentUser = currentUser;

			firebase.database().ref('usuarios').child(this.navParams.get('idUsuarioDest')).once('value', snapDest => {
				this.destUser = snapDest.val();
				this.destUser.$key = snapDest.key;

				// Verifica se a conversa ja existe
				let conversasRef = firebase.database().ref('usuarios').child(this.currentUser.$key).child('chats');
				conversasRef.orderByChild('destinatario').equalTo(this.destUser.$key);
				
				conversasRef.once('value', snap => {
					let chatId: any = null;

					if(snap.val() !== null) {
						var keys = Object.keys(snap.val()); 
						chatId = keys[0];
						console.log("Chat já existe, carregando");
					} else {
						console.log("Chat não existe, criando conversa");
						let members = { [currentUser.$key]: true,[this.destUser.$key]: true }
						chatId = firebase.database().ref('chats').push({
							title: 'Chat',
							timestamp: firebase.database['ServerValue']['TIMESTAMP'],
							members: members
						}).key;

						//conversa usuario atual
						firebase.database().ref('usuarios').child(this.currentUser.$key).child('chats').child(chatId).set({
							name: this.destUser.nome,
							destinatario: this.currentUser.$key,
							lastMessage: '',
							photo: this.destUser.image,
							created_at: firebase.database['ServerValue']['TIMESTAMP']
						});

						//conversa usuario destinatario
						firebase.database().ref('usuarios').child(this.destUser.$key).child('chats').child(chatId).set({
							name: this.currentUser.nome,
							destinatario: this.destUser.$key,
							lastMessage: '',
							photo: this.currentUser.image,
							created_at: firebase.database['ServerValue']['TIMESTAMP']
						});	
					}
					this.messages = this.dataProvider.list(`chats/${chatId}/messages`);
				});
			});
		});		
	}

  	enviar(msg) {
		console.log(this.currentUser.$key);
  		this.messages.push({
			from: { name: this.currentUser.nome, key: this.currentUser.$key },
  			created_at: firebase.database['ServerValue']['TIMESTAMP'],
  			message: msg
  		});
      	this.chatBox = '';
	}



}
