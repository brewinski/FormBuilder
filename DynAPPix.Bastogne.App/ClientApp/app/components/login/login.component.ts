import { Component, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login-form',
    templateUrl: './login.component.html',
    providers: [AuthenticationService]
})

export class LoginComponent {
    public user = new User();
    public errorMsg = '';
    loading = false;
    returnUrl: string;

    constructor(
        private _service: AuthenticationService,
        private _userservice: UserService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this._service.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    login() {
        this.loading = true;
        if (!this._service.login(this.user)) {
            this.errorMsg = 'Failed to login';
            this.loading = false;
        }
        else {
            this.router.navigateByUrl(this.returnUrl);
        }

    }

    logout() {
        this._userservice.logout();
    }
}