import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CanActivateGuard implements CanActivate {
  private connected = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.userService.currentUser.subscribe((user) => {
      this.connected = user.connected;
    });
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // test here if you user is logged
      //console.log('Checking auth...');
      return this.authService.checkCredentials();

      //if (localStorage.getItem("user") === null) {
      //    console.log('Not logged in. Redirecting...');
      //    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      //    return false;
      //}
      //else {
      //    this.userService.setCurrentUser(new User(JSON.parse(localStorage.getItem('user'))));
      //    if (this.userService.currentUser.expiryDate < Date.now()) {
      //        console.log('Login token expired.  Redirecting...');
      //        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      //        this.connected = false;
      //    }
      //    else {
      //        this.connected = true;
      //    }
      //    return this.connected;
      //}

      //if (localStorage.getItem('user')) {
      //    // logged in so return true
      //    //var user = new User(JSON.parse(localStorage.getItem('user')));
      //    this.userService.setCurrentUser(new User(JSON.parse(localStorage.getItem('user'))));
      //    this.connected = true;
      //    return this.connected;
      //}

      // not logged in so redirect to login page with the return url
      //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      //return this.connected;
  }
}
