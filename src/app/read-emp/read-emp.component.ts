import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {EmpProfile} from "../Profiles/EmpProfile";
import { AuthenticationService } from '../EmpServices/authentication.service';

import {MyServices} from "../EmpServices/my-service.service";

@Component({
  selector: 'app-read-vc',
  templateUrl: './read-emp.component.html',
  styleUrls: ['./read-emp.component.scss'],
  providers: [ MyServices, AuthenticationService ],
})

export class ReadEmpComponent implements OnInit {
  constructor(
    private http: Http,
    private _httpService:MyServices,
  ) { }

  pageTitle: string = "ALL EMPLOYEE";
  private allItems: any[];

  pager: any = {};
  EmpProfile: any[];
  listFilter: string;

  ngOnInit() {
    this._httpService.getProfiles()
      .subscribe(data => {
          this.allItems = data;
        }
      );
  }
}
