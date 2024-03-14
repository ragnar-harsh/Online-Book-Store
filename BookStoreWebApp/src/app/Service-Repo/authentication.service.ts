import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


// const headerOptions = {
//   headers : new HttpHeaders
// }

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = "http://localhost:5100/api/account/";
  userPayload : any;

  constructor(private http : HttpClient, private router : Router) {
    this.userPayload = this.decodeToken();
   }


  //Register User
  registerUser(SignupForm: any) : Observable<any[]>{
    var URL = `${this.apiUrl}signup`;
    URL = "http://localhost:5100/api/account/signup";
    let URLBodyParams = new URLSearchParams();
    URLBodyParams.append('FirstName', SignupForm.fname);
    URLBodyParams.append('LastName', SignupForm.lname);
    URLBodyParams.append('Email', SignupForm.email);
    URLBodyParams.append('Gender', SignupForm.gender);
    URLBodyParams.append('Password', SignupForm.password);
    URLBodyParams.append('ConfirmPassword', SignupForm.confirmPassword);
    URLBodyParams.append('UserType', SignupForm.userType);

    return this.http.post<any>(URL, URLBodyParams, httpOptions);
  }

  //Login 
  login(LoginForm: any) : Observable<any[]>{
    var Url =  `${this.apiUrl}login/`;
    let URLBodyParams = new URLSearchParams();
    URLBodyParams.append('Email', LoginForm.email);
    URLBodyParams.append('Password', LoginForm.password);
    return this.http.post<any>(Url, URLBodyParams, httpOptions);
  }



  //Token Handling
  storeToken(token : string){
    localStorage.setItem('BookStore', token);
  }

  getToken(){
    return localStorage.getItem('BookStore');
  }

  isLoggedIn() : boolean{
    return !!this.getToken();
    // return false;
  }

  logOut(){
    localStorage.removeItem('BookStore');
    // localStorage.clear();
    this.router.navigate(['/login']);
  }

  //Token Decoding
  decodeToken(){
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token)!;
  }

  getFirstNameFromToken(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }
}
