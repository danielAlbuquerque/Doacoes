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
	chatId: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,public af: AngularFire, public dataProvider: DataProvider) {
		this.auth.getUserData().subscribe(currentUser => {
			this.currentUser = currentUser;

			firebase.database().ref('usuarios').child(this.navParams.get('idUsuarioDest')).once('value', snapDest => {
				this.destUser = snapDest.val();
				this.destUser.$key = snapDest.key;

				// LOGGIN
				console.log('usuario_atual', this.currentUser.$key);
				console.log('destinatario', this.destUser.$key);
				// END LOGGIN

				// Verifica se a conversa ja existe
				let conversasQuery = firebase.database().ref('usuarios')
				.child(this.currentUser.$key).child('chats').orderByChild('destinatario')
				.equalTo(this.destUser.$key);
				
				conversasQuery.once('value', snap => {

					if(snap.val() !== null) {
						var keys = Object.keys(snap.val());
						this.chatId = keys[0];
					} else {
						let members = { [currentUser.$key]: true,[this.destUser.$key]: true }
						this.chatId = firebase.database().ref('chats').push({
							title: 'Chat',
							timestamp: firebase.database['ServerValue']['TIMESTAMP'],
							members: members
						}).key;

						let updObj = {};
						
						//conversa usuario atual
						updObj[`usuarios/${this.currentUser.$key}/chats/${this.chatId}/name`] = this.destUser.nome;
						updObj[`usuarios/${this.currentUser.$key}/chats/${this.chatId}/destinatario`] = this.destUser.$key;
						updObj[`usuarios/${this.currentUser.$key}/chats/${this.chatId}/lastMessage`] = '';
						updObj[`usuarios/${this.currentUser.$key}/chats/${this.chatId}/photo`] = this.destUser.image;
						updObj[`usuarios/${this.currentUser.$key}/chats/${this.chatId}/created_at`] = firebase.database['ServerValue']['TIMESTAMP'];

						//conversa usuario destinatario
						updObj[`usuarios/${this.destUser.$key}/chats/${this.chatId}/name`] = this.currentUser.nome;
						updObj[`usuarios/${this.destUser.$key}/chats/${this.chatId}/destinatario`] = this.currentUser.$key;
						updObj[`usuarios/${this.destUser.$key}/chats/${this.chatId}/lastMessage`] = '';
						updObj[`usuarios/${this.destUser.$key}/chats/${this.chatId}/photo`] = this.currentUser.image;
						updObj[`usuarios/${this.destUser.$key}/chats/${this.chatId}/created_at`] = firebase.database['ServerValue']['TIMESTAMP'];

						firebase.database().ref().update(updObj);
					}
					this.messages = this.dataProvider.list(`chats/${this.chatId}/messages`);
				});
			});
		});		
	}

	ionViewDidEnter(){
    	this.autoScroll();
  	}

	autoScroll() {
		setTimeout(function () {
			var itemList = document.getElementById("chat-autoscroll");
			console.log(itemList);
			itemList.scrollTop = itemList.scrollHeight;
		}, 10);
	}

  	enviar(msg) {
  		this.messages.push({
			from: { name: this.currentUser.nome, key: this.currentUser.$key },
  			created_at: firebase.database['ServerValue']['TIMESTAMP'],
  			message: msg
  		});
      	this.chatBox = '';

		// Atualiza a ultima mensagem
		let updObj = {};
		updObj[`usuarios/${this.currentUser.$key}/chats/${this.chatId}/lastMessage`] = msg;
		updObj[`usuarios/${this.destUser.$key}/chats/${this.chatId}/lastMessage`] = msg;
		firebase.database().ref().update(updObj);
	}



}
