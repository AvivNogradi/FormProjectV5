import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ContactDetailsComponent } from './Components/contact-details/contact-details.component';
import { Contact } from './Classes/Contact';
import { AddContactServerService } from './Services/add-contact-server.service';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  noContacts = true;
  iconBlack = false;
  filteredContact: string;
  filteredContacts: Contact[];
   input:string
   myControl = new FormControl();
   options= ['aviv', 'yoav', 'ilan'];
   searchIconWhite = true;
  //@ViewChild('input') input: MatInputDirective;

  constructor(public dialog: MatDialog, private contactService:AddContactServerService){}


  ngOnInit(){
    this.contactService.sendMessage(JSON.parse(localStorage.getItem("contacts")));
  }


  openDialog(){
    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '950px',
      height: '680px',
      //data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      
    // });
  });
 }

 filterContactByName(input){
  var filteredContacts:Contact[] = JSON.parse(localStorage.getItem("contacts"));
  var groupContacts: Contact[] = [];
  
   if(this.filteredContact.length > 2){
       for(let i = 0; i < filteredContacts.length; i++){
     

       let myFilteredContact = new RegExp(this.filteredContact);

          if(myFilteredContact.test(filteredContacts[i].firstName.toLowerCase()) ||  myFilteredContact.test(filteredContacts[i].lastName.toLowerCase())
        || myFilteredContact.test(filteredContacts[i].email) || myFilteredContact.test(filteredContacts[i].phone) || myFilteredContact.test(filteredContacts[i].gender.toLowerCase())){
            groupContacts.push(filteredContacts[i]);
           }
       }
    }
    else{
      //localStorage.setItem("contacts", JSON.stringify(filteredContacts));
      //this.contactService.sendMessage(filteredContacts);
    }
   
     this.filteredContacts = groupContacts;
    
    if(this.filteredContact && this.filteredContact.length == 0){
      this.filteredContact = null;
    }
  }

  changeMgColor(event){
    
    this.iconBlack = true;
    if(this.searchIconWhite)
    this.searchIconWhite = false;
  }
  onBlur(){
    console.log("blur")
    this.iconBlack = false;
  }

  deleteSearch(){
 
    this.filteredContact = '';
    this.contactService.sendMessage(JSON.parse(localStorage.getItem("contacts")));
  }

  startFilter(myevent){
    if(myevent){
      if(myevent.key == 'Enter')
           if(!this.filteredContact || this.filteredContact.length == 0){
            this.contactService.sendMessage(JSON.parse(localStorage.getItem("contacts")));
            this.noContacts = true;
           }
          else{
            this.contactService.sendMessage(this.filteredContacts);
            if(this.filteredContacts && this.filteredContacts.length == 0){
              this.noContacts = false;
            }
            else{
              this.noContacts = true;
            }
          }
      
    }
  
     
    }
    
   
 
  
  startFiltering(event){
    
    this.searchIconWhite = true;
    if(!this.filteredContact || this.filteredContact.length == 0){
      this.contactService.sendMessage(JSON.parse(localStorage.getItem("contacts")));
     }
     else{
      this.contactService.sendMessage(this.filteredContacts);
     }
  }
 
 
  // gotFocus(){
   
  //     this.filteredContact = '';
  
  // }
  // // onBlur(){

  // //   if( this.filteredContact.length == 0 ){

  // //     this.filteredContact = null;
  // //   }
  // // }
}