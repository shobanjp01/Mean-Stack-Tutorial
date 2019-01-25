import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService,EditProfile} from '../app/profile.service';
import { identifierModuleUrl } from '@angular/compiler';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProfileService,EditProfile],
})
export class AppComponent {

  constructor(private router:Router,private profileService:ProfileService,private editProfile:EditProfile) { 
    this.profileService.setNameMethodCalled.subscribe((res)=>{
      this.user=res.name;
      this.id=res._id;
    })

  }
  title = 'client';
  user=sessionStorage.getItem('email');
  id=sessionStorage.getItem('id');
  
  

  logout(){
    console.log('logged out');    
    console.log(sessionStorage.getItem('email'));
     //sessionStorage.setItem('email',"");
         
     this.user="";
     sessionStorage.clear();
     console.log(sessionStorage.getItem('email')); 
     $('.logout').hide();
     this.router.navigate(['login']);    
     
    }   

    profile(data){
      console.log(data);
      this.router.navigate(['registration']);
      this.profileService.getProfile(data).subscribe((res)=>{
        this.editProfile.editProfile(res);
      })
      
    }


}
