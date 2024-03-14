import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Service-Repo/authentication.service';
import { UserStoreService } from '../Service-Repo/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  LoginForm : FormGroup
  email : string;
  password : string;

  constructor(private formBuilder : FormBuilder, private toastr : ToastrService,
    private authService : AuthenticationService, private userStore : UserStoreService,
    private router : Router) {}

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    })
  }



  OnSubmit(){
    if(this.LoginForm.valid){
      
      this.authService.login(this.LoginForm.value).subscribe((res : any) => {

        this.authService.storeToken(res.token);
        
        const tokenPayload = this.authService.decodeToken();
        this.userStore.setFirstNameForStore(tokenPayload.unique_name);
        this.userStore.setRoleForStore(tokenPayload.role);
        
        this.toastr.success(res.message);
        this.LoginForm.reset();
        this.router.navigate(['/books']);
      },
      (error : any) => {
        this.toastr.error("Incorrect Username or Password");
      });
    }else{
      this.toastr.warning("Form is Invalid");
    }
  }

}
