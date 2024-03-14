import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Service-Repo/authentication.service';
import { ToastrService } from 'ngx-toastr';

export const authenticationGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  // return false;

  if(authService.isLoggedIn()){
    return true;
  }
  else{
    toastr.warning("You are not Logged In", "Please Login First");
    router.navigate(['/login']);
    return false;
  }
};
