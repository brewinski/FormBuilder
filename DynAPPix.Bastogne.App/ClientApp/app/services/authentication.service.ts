import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../models/user";
import { UserService } from './user.service';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthenticationService {
    
    constructor(private http: Http,
        private _router: Router,
        private userServ: UserService
    ) { }

    public logout() {
        localStorage.removeItem("user");
        console.log('Logging out...');
//        this._router.navigate(['Login']);
    }

    public login(user) {
        //var users = [
        //    new User({
        //        avatarUrl: 'public/assets/img/user2-160x160.jpg',
        //        email: 'admin@admin.com',
        //        firstname: 'System',
        //        lastname: 'Admin',
        //        password: 'adm9'
        //    }),
        //    new User({
        //        avatarUrl: 'public/assets/img/user2-160x160.jpg',
        //        email: 'user1@gmail.com',
        //        firstname: 'User',
        //        lastname: 'One',
        //        password: 'user123'
        //    })
        //];



        return this.http.post('/api/users/authenticate', { email: user.email, password: user.password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.connected = true;
                    var expiryDate = new Date();
                    expiryDate.setHours(expiryDate.getHours() + 24);
                    user.expiryDate = expiryDate;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userServ.setCurrentUser(user);
                    console.log('Logged in. Redirecting...');
                }
            })
            .do(data => { console.log(data) })
            .catch(this.handleError);

        //var authenticatedUser = users.find(u => u.email === user.email);
        //if (authenticatedUser && authenticatedUser.password === user.password) {
        //    authenticatedUser.connected = true;
        //    localStorage.setItem("user", JSON.stringify(authenticatedUser));
  //          this._router.navigate(['Home']); 
        //    console.log('Logged in. Redirecting...');
        //    return true;
        //}
        //return false;

    }

    public checkCredentials() {
        console.log('Checking auth...');
        if (localStorage.getItem("user") === null) {
            console.log('Not logged in. Redirecting...');
            this._router.navigateByUrl('login');
            return false;
        }
        else {
            let currentUser = JSON.parse(localStorage.getItem('user'));
            var dateNow = new Date();
            var expiryDate = new Date(currentUser.expiryDate);
            if (currentUser != null && (new Date(currentUser.expiryDate) < new Date())) {
                console.log('Login token expired.  Redirecting...');
                this._router.navigateByUrl('login');
                return false;
            }
            this.userServ.setCurrentUser(currentUser);
        }
        return true;
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.log(error);
        return Observable.throw('Internal server error');
    }

}