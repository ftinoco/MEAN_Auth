import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    constructor(
  		private router: Router,
  		private authService: AuthService,
  		private flashMessagesService: FlashMessagesService
  	) { }


    logOut(){
    	this.authService.logOut();

  		this.flashMessagesService.show('You are now logged out', {
  			cssClass: "alert-success",
  			timeout: 5000
  		});
		  this.router.navigate(['login']);
    }

}
