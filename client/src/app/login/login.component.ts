import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {Logins} from '../contact';
import {ProfileService} from '../profile.service';
import * as CryptoJS from 'crypto-js';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;
  user:String;
  

  constructor(private loginService:LoginService,private router:Router,private profileService:ProfileService) { }

  ngOnInit() {
    $('.logout,.home,.userName').hide();
  }

  newUser(){
    this.router.navigate(['registration']);
  }
  
  login(email:String,password:String){
    // var encryption=CryptoJS.AES.encrypt(password,email);
    // console.log("Encryption"+encryption);
    // var decrypted=CryptoJS.AES.decrypt(encryption,email);
    // console.log("Decryption"+decrypted);
    // console.log("Original"+decrypted.toString(CryptoJS.enc.Utf8))
    const login={
      email:email,
      password:password
    }
    this.loginService.login(login)
    .subscribe(res=>{
      if(res.length>0){  
        $('.logout,.home,.userName').show();
        this.user=res[0].name;   
        console.log(res[0])  ;
        sessionStorage.setItem('id',res[0]._id);   
        sessionStorage.setItem('name',res[0].name);  
        this.profileService.setName(res[0]);             
        this.router.navigate(['contact']);      
      }
      else{
      alert('Invalid Username or Password');
      }            
    });
  }

}
