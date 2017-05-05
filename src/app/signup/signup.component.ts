import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../EmpServices/authentication.service';

import {User} from "../models/user";

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	providers: [ AuthenticationService ]
})
export class SignupComponent implements OnInit {

	model: any = {};
    loading = false;
    public attempt: boolean = false;
    user : User;
    errorMessage = "";

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.model = this.authenticationService;
        this.authenticationService.logout();
        console.log( this.model.email+ " " + this.model.password)
    }

    signUp() {
        if(this.attempt==false) {
            this.adminRegister(this.user);
        }
    }

    adminRegister(model: User) {
        this.loading = true;
        this.attempt = true;
        this.authenticationService.register(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    localStorage.setItem('currentUserName', this.model.email);
                    this.router.navigate(['/login']);
                } else {
                    this.errorMessage = 'You Are Not Authorized';
                    this.loading = false;
                }
            });
    }
}



