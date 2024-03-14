import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Service-Repo/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SignupForm : FormGroup;

  fname : string;
  lname : string;
  email : string;
  password : string;
  confirmPassword : string;
  userType : string;
  gender : string;


  constructor(private formBuilder : FormBuilder, private toastr : ToastrService,
    private authService : AuthenticationService) {}

  ngOnInit(): void {
    this.SignupForm = this.formBuilder.group( {
      fname : ['', [Validators.required, this.noSpaceAllowed]],
      lname : ['', [Validators.required, this.noSpaceAllowed]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      userType : ['user', Validators.required],
      gender : ['male', Validators.required]
    })
  }


  //Submit
  OnSubmit(){
    if(this.SignupForm.valid){

      this.authService.registerUser(this.SignupForm.value).subscribe((res : any) => {
        this.toastr.success(res.message);
        this.SignupForm.reset();
      },
      (erro : any) => {
        this.toastr.error("Email Already Registerd!");
      });
    }else{
      this.toastr.warning("Form is Invalid");
    }
  }


  noSpaceAllowed(control : FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return { noSpaceAllowed : true}
    }
    return null;
  }

}
