import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '../../Classes/Contact';

@Component({
  selector: 'import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.css']
})
export class ImportDialogComponent implements OnInit {
   
  headerFirstName;
  headerLastName;
  dialogContact:Contact;
  excelContact:Contact;
  returnContactsArray = [];
  similars = [];
  index:number = 0;
  input = false;
  dialogContactFirstNameChecked = false;
  dialogContactLastNameChecked = false;
  dialogContactEmailChecked = false;
  dialogContactPhoneChecked = false;

  excelContactFirstNameChecked = false;
  excelContactLastNameChecked = false;
  excelContactEmailChecked = false;
  excelContactPhoneChecked = false;






  constructor(public dialogRef: MatDialogRef<ImportDialogComponent>,@Inject(MAT_DIALOG_DATA) public data) { 
   
  }

  ngOnInit() {
    this.index = 0;
    if(this.data){
     // this.similars = this.data.contacts.slice();
      this.similars = [...this.data.contacts];
    }
    this.dialogContact = this.similars[this.index].contact;
    this.excelContact = this.similars[this.index].excelContact;
    this.headerFirstName = this.dialogContact.firstName;
    this.headerLastName = this.dialogContact.lastName;
  }

  keepCurrent(){
    this.returnContactsArray.push( this.similars[this.index].contact)
    this.index++
    if(this.similars.length > this.index){
     
      this.dialogContact = this.similars[this.index].contact
      this.excelContact = this.similars[this.index].excelContact
      
    }
     if( this.similars.length == this.index)
    this.dialogRef.close({ data: this.returnContactsArray });
  }
  replaceWithNew(){
    this.returnContactsArray.push( this.similars[this.index].excelContact)
    this.index++
    if(this.similars.length > this.index){
    
      this.dialogContact = this.similars[this.index].contact
      this.excelContact = this.similars[this.index].excelContact
     
    }
    if( this.similars.length == this.index)
    this.dialogRef.close({ data: this.returnContactsArray });
  }
  changeNew(){
    this.input = true;

  }
      submit(){
        this.input = false;
        if(this.excelContactFirstNameChecked == true){
          this.similars[this.index].contact.firstName = this.excelContact.firstName
        }
        else{
          this.similars[this.index].contact.firstName = this.dialogContact.firstName;
        }
        if(this.excelContactLastNameChecked == true){
          this.similars[this.index].contact.lastName = this.excelContact.lastName
        }
        else{
          this.similars[this.index].contact.firstName = this.dialogContact.lastName;
        }
        if(this.excelContactEmailChecked == true){
          this.similars[this.index].contact.email = this.excelContact.email
        }
        else{
          this.similars[this.index].contact.firstName = this.dialogContact.email;
        }
        if(this.excelContactPhoneChecked == true){
          this.similars[this.index].contact.phone = this.excelContact.phone
        }
        else{
          this.similars[this.index].contact.firstName = this.dialogContact.phone;
        }
     
        this.returnContactsArray.push(this.similars[this.index].contact)
        this.index++
        if(this.similars.length > this.index){
        
          this.dialogContact = this.similars[this.index].contact
          this.excelContact = this.similars[this.index].excelContact   
        }
        if( this.similars.length == this.index){
          this.dialogRef.close({ data: this.returnContactsArray });
        }
     
        this.dialogContactFirstNameChecked = false;
        this.dialogContactLastNameChecked = false;
        this.dialogContactEmailChecked = false;
        this.dialogContactPhoneChecked = false;
      
        this.excelContactFirstNameChecked = false;
        this.excelContactLastNameChecked = false;
        this.excelContactEmailChecked = false;
        this.excelContactPhoneChecked = false;
      }


}
