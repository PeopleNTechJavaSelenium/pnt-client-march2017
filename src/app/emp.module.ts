import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReadEmpComponent } from './read-emp/read-emp.component';
import { CreateEmpComponent } from './create-emp/create-emp.component';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { AuthGuard } from './guards/index';

const routes: Routes = [
    { path: '', component: ReadEmpComponent, canActivate: [AuthGuard] },
    { path: 'createprofile', component: CreateEmpComponent, canActivate: [AuthGuard] },
    { path: 'editprofile/:_id', component: EditEmpComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes,{ useHash: true }) ],
    exports: [ RouterModule ]
})
export class empModule {}
