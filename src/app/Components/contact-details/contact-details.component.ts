import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Contact } from '../../Classes/Contact';
import { AddContactServerService } from '../../Services/add-contact-server.service';
import {MatSnackBar} from '@angular/material';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Output('contactAdded') contactAdded: EventEmitter<any>;

  contacts:Contact[];

  class:string = 'color:green';

  contact:Contact;

  myContact:Contact; 

 birthDate:Date = new Date();

 maxDate:Date;

 contactFirstName:string = '';

 contactLastName:string = '';

 title:string = 'Add Contact'

 //contactFullName:string = this.myContact.firstName + ' ' + this.myContact.lastName ;

  constructor(public dialogRef: MatDialogRef<ContactDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private contactService:AddContactServerService,public snackBar: MatSnackBar) {
      this.contactAdded = new EventEmitter();
      this.myContact = new Contact('','','','','','','',new Date(1900,1,1),'',0, false,true)
     }

  ngOnInit() {
    this.birthDate = null;
    this.contacts = JSON.parse(localStorage.getItem("contacts"));
    if(this.data){
      this.myContact = this.data.contact;
      if(typeof this.data.contact.birthDate === 'string' && this.data.contact.birthDate.length == 9){
        let birthdateArray = this.myContact.birthDate.toString().split("/");
        this.birthDate = new Date(Number(birthdateArray[2]),(Number(birthdateArray[1])-1),Number(birthdateArray[0]));
      }
      else{
        this.birthDate = this.myContact.birthDate;
      }
      this.contactFirstName = this.myContact.firstName;
      this.contactLastName = this.myContact.lastName;
      // this.contactFullName = this.myContact.firstName + ' ' + this.myContact.lastName ;
       this.title = 'Edit Contact' + ' ' + '-' + ' ';
     
    }
   
    //this.getBirthdate();
    
    this.maxDate = new Date();
  }
  onNoClick(): void {
    this.dialogRef.close();
    localStorage.setItem("contacts", JSON.stringify(this.contacts))
  }

  onSubmit(form: NgForm){ 
    let oldContact = false;
    this.contacts = JSON.parse(localStorage.getItem("contacts"));
    if(!this.contacts){
      this.contacts = [];
    }
    if(this.myContact.id != 0){
      var index = this.contacts.findIndex((c)=>{return c.id == this.myContact.id});
      if(index != -1){
        this.contacts.splice(index, 1); 
        oldContact = true;
    }
  }
    this.contact = new Contact('','','','','','','',new Date(),'',0, false,true)
    this.contact.firstName = form.value.firstName;
    this.contact.lastName = form.value.lastName;
    this.contact.email = form.value.email;
    this.contact.birthDate = form.value.birthDate;
    this.contact.phone = form.value.phone;
    this.contact.gender = form.value.gender;
    this.contact.company = form.value.company;
    this.contact.jobTitle = form.value.jobTitle;
    this.contact.id = new Date().getTime();
    
   // this.contact.image = form.value.image;
  
   this.contacts.push(this.contact);
   localStorage.setItem("contacts", JSON.stringify(this.contacts))
   this.contactService.sendMessage(JSON.parse(localStorage.getItem("contacts")));
   this.dialogRef.close();
   this.contactService.addContact(this.contact);
   if(!oldContact)
   this.snackBar.open(this.contact.firstName + ' ' + this.contact.lastName + '' + ' Has been added to your list','',{duration: 3000, panelClass:['snackBar']});
   // let snackBarRef =  this.snackBar.openFromComponent(SnackBarComponent )
    
  }

//getBirthdate(){

 
  //   let fullDate = new Date(this.myContact.birthDate)
  
  
  //   let day = fullDate.getDate()-1;
  //   let month = fullDate.getMonth()+1;
  //  let birthdate = fullDate.getFullYear();
  //  let fullBirthday = day + '/' + month + '/' + birthdate;
  //  let returnedBday = new Date(birthdate,day,month)
 
  
  //  if( typeof this.myContact.birthDate === 'object'){
  //   return null
  //  }
  // else{
    
  //   return this.myContact.birthDate
  // }
  
//   let day = fullDate.getDate().toString()
//   let month = fullDate.getMonth()+1;
  
//   let dateMonth = month.toString()+1; 
//   if((String(day)).length==1)
//   day='0'+day;
//   if((String(month)).length==1)
//   month='0'+ month;

//   let finalDate = day + '/' + month + '/' + birthdate;
//  console.log("finalDate",finalDate)

  // let stamday = fullDate.getDate();
  // fullDate.setDate(stamday -1)
  // return fullDate

  /*
  getErrorMessage() {
    //console.log(this.email.hasError.name);
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
            
  }
  */
//   getErrorMessage() {
//     let errorMessage = this.email.hasError('email') ? 'You must enter a value' :
//     this.email.hasError('required') ? 'Not a valid email' :  '';
//     return errorMessage;
// }
//}

}

