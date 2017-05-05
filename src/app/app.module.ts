import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';


import { HttpModule } from '@angular/http';

//COMPONENT
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReadEmpComponent } from './read-emp/read-emp.component';
import { CreateEmpComponent } from './create-emp/create-emp.component';
import { EditEmpComponent } from './edit-emp/edit-emp.component';

import { MyServices } from "./EmpServices/my-service.service";
import { AuthenticationService } from './EmpServices/authentication.service';
//import { EMpProfileFilterPipe } from "./pipes/vc-profile-filter.pipe";
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './EmpServices/user.service';



import { empModule } from './emp.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    empModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ReadEmpComponent,
    CreateEmpComponent,
    EditEmpComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    MyServices,
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

