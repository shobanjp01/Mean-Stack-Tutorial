import { Injectable, ɵConsole } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Http,Headers} from '@angular/http'
//import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
user:String;
  constructor(private http:Http) { }

  // Observable string sources
  private setNameCallSource = new Subject<any>();
  
  // Observable string streams
  setNameMethodCalled = this.setNameCallSource.asObservable();

  // Service message commands 

  setName(name){ 
    this.setNameCallSource.next(name);     
  }

  
  getProfile(id){
    console.log(id);
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/getProfile',{id},{headers:headers})
    .map(res=>res.json());
  }
 
}

export class EditProfile{

  constructor(){}

  private setNameCallSource = new Subject<any>();
  
  // Observable string streams
  setNameMethodCalled = this.setNameCallSource.asObservable();
  
  editProfile(data){
    console.log("edit profile service called");
    this.setNameCallSource.next(data);
  }

}
