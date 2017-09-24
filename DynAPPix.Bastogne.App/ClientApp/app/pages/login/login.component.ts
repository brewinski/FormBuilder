import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  styles: ['./login.css'],
  templateUrl: './login.component.html',
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  private password: string;
  private email: string;
  public user = new User();
  returnUrl: string;

  constructor(
    private userServ: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _auth: AuthenticationService
  ) {
  }

  public ngOnInit() {
      window.dispatchEvent(new Event('resize'));
      this._auth.logout();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login() {

      this._auth.login(this.user)
          .subscribe(
              data => {
                  this.user.connected = true;
                  this.userServ.setCurrentUser(this.user);
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  console.log("Login Error");
              });
    // test les champs en js

    // envoyer les champs a php

    // si retour positif, log le user
    //if ( 1 === 1 ) {

      //let user1 = new User( {
      //    avatarUrl: 'public/assets/img/user2-160x160.jpg',
      //    email: 'admin@admin.com',
      //    firstname: 'System',
      //    lastname: 'Admin',
      //    password: 'adm9'
      //} );

      //user1.connected = true;

      //this.userServ.setCurrentUser( user1 );

      //if (!this._auth.login(this.user)) {
      //    //this.errorMsg = 'Failed to login';
      //    //this.loading = false;
      //    this.user.connected = true;
      //    this.userServ.setCurrentUser(this.user);
      //}
      //else {
      //    this.router.navigateByUrl(this.returnUrl);
      //}


    //  this.router.navigate( ['home'] );
    //} else {
    //  // je recupere l'erreur du php
    //  // et on le place dans un label, ou un toaster
    //}

  }

}
