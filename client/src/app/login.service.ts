import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http'
import {Logins} from './contact';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:Http) { }
    
  login(login){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/login',login,{headers:headers})
    .map(res=>res.json());
  }  
}
