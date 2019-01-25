import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from '../app/registration/registration.component';
import {LoginComponent} from '../app/login/login.component';
import {ContactsComponent} from '../app/contacts/contacts.component';
import{AuthenticateService} from '../app/authenticate.service'

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'contact',component:ContactsComponent,canActivate: [AuthenticateService]}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
