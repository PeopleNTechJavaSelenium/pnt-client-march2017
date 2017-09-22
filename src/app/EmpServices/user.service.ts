import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/index';
import { AuthenticationService } from './/authentication.service';

@Injectable()
export class UserService {
    private token: string;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        return this.http.get('http://info.venturepulse.org:8080/service-webapp/api/LogIn')
            .map((response: Response) => response.json());
    }
}
