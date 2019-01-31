import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contacts} from '../contact';
import {Router} from '@angular/router';
//import * as bootbox from 'node_modules/bootbox/bootbox.js';
declare var jquery:any;
declare var bootbox:any;
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
btnName:String;
contactsLists:Contacts[];
editBtn:Boolean;
updateBtn:Boolean;





  constructor(private contactService:ContactService,private router:Router) { }
  validatingForm: FormGroup;
  ngOnInit() {
    // this.validatingForm = new FormGroup({
    //   required: new FormControl(null, Validators.required)
    // });
        
    this.contactService.getAllContact()
    .subscribe(contacts=>{
      this.contactsLists=contacts;
      $('#contactTable').DataTable().destroy();
      setTimeout(function(){
        $('#contactTable').DataTable({
          responsive: true
        });
        //$('#contactTable').wrap('<div class="dataTables_scroll" />');
        }, 50);         
    })
  }
  // get input() { 
  //   return this.validatingForm.get('required'); 
  // }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addContact(){
    this.edit={};
    this.btnName="Add";
  }
 

  editContact(id:any){
    this.btnName="Update";
    //this.editBtn=true;
    this.contactService.getContact(id)
    .subscribe(contacts=>{   
      console.log(contacts[0]);
      this.edit=contacts[0];  
      console.log(this.edit)    ;
    })    
  }
  
  updateContact(type){
    if(type=="Add"){

      const newContact=this.edit;      
      this.contactService.addContact(newContact)
      .subscribe(res=>{
        this.contactsLists.push(res);
        this.ngOnInit();
        bootbox.alert('Added Succesfully');        
      })
    }
    else{
      const updatedContact=this.edit;
    this.contactService.updateContact(updatedContact)
    .subscribe(res=>{
      this.contactsLists.push(res);
      this.ngOnInit();      
      //var element = document.getElementById("modalClose") as any;
      //element.click();     
      bootbox.alert("Updated Succesfully");     
    })   
    }    
    $('#modalClose').click();
    //$('#myModal').modal('open')
    this.edit={};
  }

deleteFunction(contacts,id){
  this.contactService.deleteContact(id)
          .subscribe(res=>{
      if(res.n==1){
        for(var i=0;i<contacts.length;i++){
          if(contacts[i]._id==id){            
            contacts.splice(i,1); 
            $('#contactTable').DataTable().destroy();
            setTimeout(function(){
              $('#contactTable').DataTable({
                responsive: true
              });
              //$('#contactTable').wrap('<div class="dataTables_scroll" />');
              }, 50);               
            bootbox.alert("Deleted Successfully");
          }
        }
      }
    })
}


  deleteContact(id:any){
    var contacts=this.contactsLists;
    bootbox.confirm("<label>Are you sure, you want to delete?</label>",(result)=>{
      if(result==true){          
        this.deleteFunction(contacts,id);
      }   
    });    
  }
}
