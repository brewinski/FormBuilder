import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  /* tslint:disable */
    selector: '.userBox',
    //selector: 'user-box',
  /* tslint:enable */
  styleUrls: ['./user-box.component.css'],
  templateUrl: './user-box.component.html'
})
export class UserBoxComponent implements OnInit {
  private currentUser: User = new User();

  constructor(private userServ: UserService, private router: Router) {
    // se connecter au modif du user courant
  }

  public ngOnInit() {
      this.userServ.currentUser.subscribe((user: User) => this.currentUser = user);
    // TODO
  }

  private logout = (): void => {
    this.userServ.logout();
  }
}
