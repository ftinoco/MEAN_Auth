import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	name: String;
	email: String;
	username: String;
	password: String;

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService, 
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
  	const user = {
  		name: this.name,
  		email: this.email,
  		username: this.username,
  		password: this.password
  	};

  	// Required fields
  	if(!this.validateService.validateRegisterUser(user)){
  		this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 
  			3000 });
  		return false;
  	}

  	// Validate Email
  	if(!this.validateService.validateEmail(user.email)){
  		this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 
  			3000 });
  		return false;
  	}

    // Register User
    this.authService.registerUser(user).subscribe(res => {
      if(res.success){
        this._flashMessagesService.show('You now are registered and can log in', { cssClass: 'alert-success', 
          timeout: 3000 });
        this.router.navigate(['/login']);
      }
      else{
        this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger',  timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });

  }

}
