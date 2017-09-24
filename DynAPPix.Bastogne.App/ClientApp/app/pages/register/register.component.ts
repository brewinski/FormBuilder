import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;
    public user = new User();

    constructor(
        private router: Router,
        private userService: UserService)
    { }

  public ngOnInit() {
    // TODO
  }

  registerUser({ value, valid }: { value: User, valid: boolean }) {
      this.submitted = true;
      this.isRequesting = true;
      this.errors = '';
      if (valid) {
          this.userService.register(value.email, value.password, value.firstname, value.lastname)
              .finally(() => this.isRequesting = false)
              .subscribe(
              result => {
                  if (result) {
                      this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
                  }
              },
              errors => this.errors = errors);
      }
  }  
}
