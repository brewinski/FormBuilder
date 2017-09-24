import { User } from '../models/user';
import { Organisation } from '../models/organisation';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router } from '@angular/router';
//import { AuthenticationService } from './authentication.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {
    public currentUser: ReplaySubject<User> = new ReplaySubject<User>(1);
    config: string = 'http://localhost:55553/api';

    constructor(
        private router: Router,
       // private _auth: AuthenticationService,
        private http: Http
    ) { }

    public setCurrentUser( user: User ) {
      this.currentUser.next( user );
    }

    public logout() {
        const user = new User();
        user.connected = false;
        this.setCurrentUser(user);
        //this._auth.logout();
        this.router.navigate(['login']);
    }

    public register(email: string, password: string, firstName: string, lastName: string): Observable<User> {
        let user = new User();
        user.email = email;
        user.firstname = firstName;
        user.lastname = lastName;
        user.password = password;
        user.provider = 'local';
        let org = new Organisation();
        org.primaryContactEmail = email;
        org.primaryContactName = user.getName();
        user.organisationNavigation = org;
        user.organisation = '';

        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.config + "/users/register", body, options)
            .map(res => true)
            .catch(this.handleError);
    } 

    getAll() {
        return this.http.get(this.config + '/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config + '/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.config + '/users', user, this.jwt());
    }

    update(user: User) {
        return this.http.put(this.config+ '/users/' + user._id, user, this.jwt());
    }

    delete(id: number) {
        return this.http.delete(this.config + '/users/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.log(error);
        return Observable.throw('Internal server error');
    }

}
