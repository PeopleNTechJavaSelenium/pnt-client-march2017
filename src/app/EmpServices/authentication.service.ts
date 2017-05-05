import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
    public token: string;
    public registrationServerUrl:string = 'http://api.venturepulse.org:8080/vpservices/SignUp';
    public loginServerUrl:string = 'http://api.venturepulse.org:8080/vpservices/LogInAuth';

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    register(email, password): Observable<boolean> {
        let params = new URLSearchParams();
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        let headers = new Headers({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Origin,Accept,Authorization,' +
          'Access-Control-Allow-Origin,Content-Type',
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
        });
        let body = JSON.stringify({"email":email,"password":password});
        let options = new RequestOptions({headers:headers,method:"post"});
        return this.http.post(this.registrationServerUrl, body, options).map(this.extractData);
    }

    login(email, password): Observable<boolean> {
        let params = new URLSearchParams();
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        let headers = new Headers({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Origin,Accept,Authorization,' +
          'Access-Control-Allow-Origin,Content-Type',
          'Accept' : 'application/json',
          'Content-Type': 'application/json',

        });
        let body = JSON.stringify({"email":email,"password":password});
        let options = new RequestOptions({headers:headers,method:"post"});
        return this.http.post(this.loginServerUrl, body, options).map(this.extractData);
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUserName');
    }

    private handleError (error: Response) {
        console.error(Response + " " + error);
        return Observable.throw(error.json().error || ' error');
    }
    private handleErrorAny (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
        let body;
        if (res.text()) {
          body = res.json();
        }
        console.log(body);
        return body || {};
    }

}
