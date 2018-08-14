import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
  	let headers = new Headers({ 'Content-Type': 'application/json' });
  	/*return this.http.post('http://localhost:4100/user/register', user, {
  		headers: headers
  	}).map();*/
  	return this.http.post('users/register', user, {
  		headers: headers
  	}).pipe(map(r => r.json()));
  }

  authenticateUser(user){
    let headers = new Headers();    
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', user, {
      headers: headers
    }).pipe(map(r => r.json())); 
  }

  getProfile(){
    this.loadToken();
    let headers = new Headers({ 
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get('users/profile', {
      headers: headers
    }).pipe(map(r => r.json())); 
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));  
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    this.authToken = localStorage.getItem('id_token');
  }

  loggedIn(){
    this.loadToken(); 
    const jwtHelper = new JwtHelperService();
    //console.log(jwtHelper.isTokenExpired(this.authToken));
    return !jwtHelper.isTokenExpired(this.authToken);
  }

  logOut(){
    this.user = null;
    this.authToken = null;
    localStorage.clear();
  }

}
