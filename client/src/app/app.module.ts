import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent} from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
//import * as bootbox from 'node_modules/bootbox/bootbox.js';
import { NavbarHeaderComponent } from './navbar-header/navbar-header.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    LoginComponent,
    RegistrationComponent,    
    NavbarHeaderComponent   
  ],
  entryComponents:[],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
