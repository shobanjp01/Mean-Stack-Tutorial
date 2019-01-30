import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Http,Headers} from '@angular/http'
import {ProfileService,EditProfile} from '../app/profile.service';
import {LoginService} from '../app/login.service';


import { Idle } from 'idlejs/dist';
import { longStackSupport } from 'q';
import { store } from '@angular/core/src/render3';

declare var jquery:any;
declare var $ :any;
const idle = new Idle()
  .whenNotInteractive()
  .within(10)
  .do(() => {
     console.log('IDLE');
     sessionStorage.clear();
     console.log(sessionStorage.getItem('name')); 
     $('.logout').hide();     
     window.location.href = "/login";
     //this.logout();
  })
  .start();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProfileService,EditProfile,LoginService],
})
export class AppComponent {

  constructor(private router:Router,private profileService:ProfileService,private editProfile:EditProfile,private loginService:LoginService) { 
    this.profileService.setNameMethodCalled.subscribe((res)=>{
      this.user=res.name;
      this.id=res._id;
    })
  }
  title = 'client';
  user=sessionStorage.getItem('name');
  id=sessionStorage.getItem('id');
  
  logout(){
    this.loginService.logout({"id":sessionStorage.getItem('id')})
    .subscribe(res=>{
      if(res.status==true){
      console.log('logged out');    
      console.log(sessionStorage.getItem('name'));            
      this.user="";
      sessionStorage.clear();   
      console.log(sessionStorage.getItem('name')); 
      $('.logout').hide();
      this.router.navigate(['login']);        
      }
      else{
       alert(res.message);
      }
    });    
  }   

    profile(data){
      console.log(data);
      this.router.navigate(['registration']);
      this.profileService.getProfile(data).subscribe((res)=>{
        this.editProfile.editProfile(res);
      });      
    }
}
