import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {EmpProfile} from '../Profiles/EmpProfile';


@Injectable()
export class MyServices {
  private serverUrl:string = "http://info.venturepulse.org:8080/service-webapp/api";

	private headers: Headers;

	constructor( private _http: Http ){
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		this.headers.append('Accept','application/json');
	}

	//THIS IS FOR GET ALL PROFILES::::
	getProfiles():Observable<EmpProfile[]>{
		let url = this.serverUrl + "/AllEmployeeResources";
		return this._http.get(url, {headers: this.headers}).map(res=> res.json()).catch(err=>{
		return Observable.throw(err);
		});
	}

	//THIS IS FOR POST VC TO THE SERVER
	postRestApi(model): Observable<EmpProfile>{
		let body = JSON.stringify(model.value);
		let params = new URLSearchParams();
		params.set('action', 'opensearch');
		params.set('format', 'json');
		params.set('callback', 'JSONP_CALLBACK');
		let headers = new Headers({
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Origin,Accept,Authorization,Access-Control-Allow-Origin,Content-Type',
		'Accept' : 'application/json',
		'Content-Type': 'application/json',
		});
		let options = new RequestOptions({headers:headers,method:"post"});
		let url = this.serverUrl + "/SingleEmployeeResources";
		return this._http.post(url, body, options).map(this.extractData).catch(this.handleErrorAny);
	}


	//THIS IS FOR GET SINGLE PROFILE:::::
	getProfile(id: string):Observable<EmpProfile>{
		let url = this.serverUrl + "/SingleEmployeeResources/" + id;
		return this._http.get(url, {headers: this.headers}).map(res=> res.json() as EmpProfile).catch(err=>{
		return Observable.throw(err);
		});
	}



	// THIS IS FOR UPDATE VC PROFILE
	saveProduct(profile: EmpProfile): Observable<EmpProfile> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		if (profile._id === 0) {
		return this.createProduct(profile, options);
		}else {
		return this.updateProduct(profile, options);
		}
	}

	private createProduct(profile: EmpProfile, options: RequestOptions): Observable<EmpProfile> {
		profile._id = undefined;
		let url = this.serverUrl + "/SingleEmployeeResources";
		return this._http.post( url, profile, options)
		.map(this.extractData)
		.do(data => console.log('createProfile: ' + JSON.stringify(data)))
		.catch(this.handleError);
	}

	private updateProduct(profile: EmpProfile, options: RequestOptions): Observable<EmpProfile> {
		let url = this.serverUrl + "/SingleEmployeeResources/" + profile._id;
		return this._http.put(url, profile, options)
		.map(() => profile)
		.do(data => console.log('updateProfile: ' + JSON.stringify(data)))
		.catch(this.handleError);
	}

	deleteProduct(_id: number): Observable<Response> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		let url = this.serverUrl + "/SingleEmployeeResources/" + _id;

		return this._http.delete(url, options)
			.do(data => console.log('deleteProfile: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.error(Response + " "+error);
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
		return body || {};
	}




}
