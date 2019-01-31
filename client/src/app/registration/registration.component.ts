import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '../registration.service';
import {Registers} from '../contact';
import {ProfileService,EditProfile} from '../profile.service';
import * as CryptoJS from 'crypto-js';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[RegistrationService]
})
export class RegistrationComponent implements OnInit {
  
  registerTitle:String;
  profile={};
  btnTitle:String;


  constructor(private registrationService:RegistrationService,private router:Router,private editProfile:EditProfile,private profileService:ProfileService) {
    
    this.editProfile.setNameMethodCalled.subscribe((res)=>{
      console.log(res);    
      $('.registerSubmit').removeAttr('disabled');      
      this.profile=res[0];    
      this.registerTitle="Personal Detail";
      this.btnTitle="Update";
      $('.logout').show();
      $('.loginLink').hide();
      console.log(this.profile); 
    });  
   }

  ngOnInit() {    
    if(sessionStorage.getItem('name')){
      this.profileService.getProfile(sessionStorage.getItem('id')).subscribe((res)=>{
        this.editProfile.editProfile(res);
      })
    }
    else{
    $('.logout,.home,.userName').hide();
    this.registerTitle="Registration";
    this.btnTitle="Register";
    $('.loginLink').show();
    }
  }

  registeredUser(){
    this.router.navigate(['login']);
  }
  
  newUser(){
    console.log(this.profile);
    this.registrationService.registration(this.profile)
    .subscribe(res=>{     
      alert('Registered Succesfully');
      this.router.navigate(['login']);
    });
  }
}
