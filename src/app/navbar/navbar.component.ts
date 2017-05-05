import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { User } from '../models/user';
import { UserService } from '../EmpServices/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass'],
    providers: [ UserService ]
})
export class NavbarComponent implements OnInit {

    currentUserName: User;
    users: User[] = [];

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
            this.getUserProfile();
        });
    }

    getUserProfile(){
        return localStorage.getItem('currentUserName');
    }

}
