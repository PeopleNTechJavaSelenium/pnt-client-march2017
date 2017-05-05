import { Component, Input, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../EmpServices/authentication.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
	providers: [ AuthenticationService ]
})
export class LoginComponent implements OnInit {
	model: any = {};
	loading = false;
	errorMessage = "";
  returnUrl: string;

  	constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) { }

	@Input() user:any;

	ngOnInit() {
		// this.model = this.authenticationService;
		this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['/login'] || '/';
		// console.log(this.model.email+ " " + this.model.password);
	}

	adminLogin() {
		this.authenticationService.login(this.model.email, this.model.password)
			.subscribe(result => {
			if (result === true) {
				localStorage.setItem('currentUserName', this.model.email);
				// this.router.navigate(['/readprofile']);
        this.router.navigate([this.returnUrl]);
			} else {
				this.errorMessage = 'Username Or Password Is Incorrect';
				this.loading = false;
			}
			});
		}
}
