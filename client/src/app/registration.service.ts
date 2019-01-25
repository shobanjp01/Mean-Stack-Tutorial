import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http'
import {Registers} from './contact';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:Http) { }
    
  registration(newUser){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/register',newUser,{headers:headers})
    .map(res=>res.json());
  }  
}
