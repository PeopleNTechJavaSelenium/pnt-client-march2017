import {Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Location }               from '@angular/common';
import { EmpProfile } from '../Profiles/EmpProfile';
import { MyServices } from '../EmpServices/my-service.service';
import { AuthenticationService } from '../EmpServices/authentication.service';

@Component({
    selector: 'app-edit-vc',
    templateUrl: './edit-emp.component.html',
    styleUrls: ['./edit-emp.component.scss'],
    providers: [ MyServices, AuthenticationService ]
})

export class EditEmpComponent implements OnInit, OnDestroy {
    empForm: FormGroup;
    public pageTitle: string;
    public id: string;
    profile: EmpProfile;
    private sub: Subscription;
    errorMessage = "";

    constructor(
        private fb: FormBuilder,
        private _httpService: MyServices,
        private router:Router,
        private route: ActivatedRoute,
        private location: Location
    ){}

  	ngOnInit(): void {
        this.empForm = this.fb.group({
            vcInfo: this.fb.group({
                empEmail:[''],
                empName: [''],
                salary: [''],
                department: [''],
            }),

        });

        this.sub = this.route.params.subscribe(params => {
            this.id = params["_id"];
            this.getProfile(this.id);
        });
   	}






	  ngOnDestroy(): void {
      	this.sub.unsubscribe();
  	}

    // THIS IS GRABE ID FROM
    getProfile(id: string): void {
        console.log(id);
        this._httpService.getProfile(id)
            .subscribe(
                (profile: EmpProfile) => this.onProductRetrieved(profile),
                (error: any) => this.errorMessage = <any>error,
            );
    }

    onProductRetrieved(profile: EmpProfile): void {
        if (this.empForm) {
            this.empForm.reset();
        }
        this.profile = profile;

        if (this.profile._id == 0) {
            this.pageTitle = 'ADD VC PROFILE';
        } else {
            this.pageTitle = 'EDIT VC PROFILE';
        }
        let empProfile = profile[0];

        this.empForm.patchValue({
            _id: empProfile._id,
            empInfo: {
                empEmail: empProfile.vcInfo.empEmail,
                empName: empProfile.vcInfo.empName,
                salary: empProfile.vcInfo.salary,
                department: empProfile.vcInfo.department,
            },

        });
    }


    // THIS IS FOR SAVE EDIT PROFILE
    saveProduct(): void {
        if (this.empForm.dirty && this.empForm.valid) {
        let p = Object.assign({}, this.profile[0], this.empForm.value);
        this._httpService.saveProduct(p)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
        } else if (!this.empForm.dirty) {
            this.onSaveComplete();
        }
    }

    // THIS IS FOR DELETE PROFILE
    deleteProfile(): void {
        if (this.profile[0]._id === 0) {
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.profile[0].vcInfo.vcName}?`)) {
                this._httpService.deleteProduct(this.profile[0]._id)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
            }
        }
    }

    onSaveComplete(): void {
        this.empForm.reset();
        this.router.navigate(['/']);
    }

    cancel(): void {
        this.location.back();
    }
}
