import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Service-Repo/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../Service-Repo/user-store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  isLoggedIn : boolean = false;
  fname : string;

  constructor(private authService : AuthenticationService, private router : Router,
    private toastr : ToastrService, private userStore : UserStoreService){}

  ngOnInit(): void {
    

    this.userStore.getFirstNameFromStore().subscribe((res : any) => {
      var nameFromToken = this.authService.getFirstNameFromToken();
      this.fname = res || nameFromToken;
      this.isLoggedIn = this.authService.isLoggedIn();
    })
  }


  logOut(){
    this.authService.logOut();
    this.toastr.info("Sign Out Successfully");
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
