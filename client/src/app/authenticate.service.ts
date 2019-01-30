import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('name')) {
      console.log(sessionStorage.getItem('name'));
        // logged in so return true
        console.log("User Exist");
        return true;
    }
    console.log("User Not Exist");
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    alert("Session has expired.Please login to stay connected.");
    return false;
}
}


