import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
	messages: FirebaseListObservable<any>;
	chatBox: string = '';
	refConversa: any;
	currentUser: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthProvider,
		public af: AngularFire
	) {

	}

	ionViewDidLoad() {
    	this.auth.getUserData().subscribe(currentUser => {
    		this.currentUser = currentUser;
    		this.messages = this.af.database.list('conversas/'+this.currentUser.$key+'/'+this.navParams.get('to'));
		});
  	}

  	enviar(msg) {
  		this.af.database.list('conversas/'+this.currentUser.$key+'/'+this.navParams.get('to')).push({
  			message: msg
  		});
  	}



}
