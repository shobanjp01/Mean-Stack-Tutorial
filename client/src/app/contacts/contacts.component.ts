import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contacts} from '../contact';
import {Router} from '@angular/router';
import * as bootbox from 'node_modules/bootbox/bootbox.js';
declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[ContactService]
})



export class ContactsComponent implements OnInit {
edit={};
new={};
contactsLists:Contacts[];

editBtn:Boolean;
updateBtn:Boolean;





  constructor(private contactService:ContactService,private router:Router) { }

  ngOnInit() {
    //console.log(sessionStorage.getItem('email') +","+sessionStorage.getItem('id'));    
    this.contactService.getAllContact()
    .subscribe(contacts=>{
      this.contactsLists=contacts;
      setTimeout(function(){
        $('#contactTable').DataTable({
          responsive: true
        });
        $('#contactTable').wrap('<div class="dataTables_scroll" />');
        }, 50);
      
      // this.editBtn=false;
      // this.updateBtn=true;      
    })
  }

  addContact(){
    const newContact=this.new;
    this.contactService.addContact(newContact)
    .subscribe(res=>{
      this.contactsLists.push(res);
      this.ngOnInit();
      alert('Added Succesfully');
      this.new={};
    })
  }

  editContact(id:any){
    //this.editBtn=true;
    this.contactService.getContact(id)
    .subscribe(contacts=>{      
      this.edit=contacts[0];      
    })    
  }
  
  updateContact(){
    const updatedContact=this.edit;
    this.contactService.updateContact(updatedContact)
    .subscribe(res=>{
      this.contactsLists.push(res);
      this.ngOnInit();      
      //var element = document.getElementById("modalClose") as any;
      //element.click();
      $('#modalClose').click();
      alert('Updated Succesfully');
    })   
  }

  deleteContact(id:any){
    var r = confirm("Are you sure, you want to delete?");
    if(r==true){
    var contacts=this.contactsLists;
    this.contactService.deleteContact(id)
    .subscribe(res=>{
      if(res.n==1){
        for(var i=0;i<contacts.length;i++){
          if(contacts[i]._id==id){
            contacts.splice(i,1);
            alert("Deleted Successfully");
          }
        }
      }
    })
  }    
  }
}
