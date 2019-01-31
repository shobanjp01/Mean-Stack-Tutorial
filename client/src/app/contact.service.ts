import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Contacts} from './contact';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:Http) { }

  getAllContact(){
    return this.http.get('http://localhost:3000/api/contacts')
    .map(res=>res.json());
  }

  getContact(id){
    console.log(id);
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/getContacts',{id},{headers:headers})
    .map(res=>res.json());
  }

  addContact(newContact){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/addContacts',newContact,{headers:headers})
    .map(res=>res.json());
  }

  updateContact(newContact){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/updateContact',newContact,{headers:headers})
    .map(res=>res.json());
  }

  deleteContact(id){
    return this.http.delete('http://localhost:3000/api/deleteContacts/'+id)
    .map(res=>res.json());
  }

}
