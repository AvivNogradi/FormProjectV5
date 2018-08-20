import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '../../Classes/Contact';

@Component({
  selector: 'import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.css']
})
export class ImportDialogComponent implements OnInit {

  contact:Contact
  input = false;
  newContactFirstName = '';
  newContactLastName = '';
  constructor(public dialogRef: MatDialogRef<ImportDialogComponent>,@Inject(MAT_DIALOG_DATA) public data) { 
   
  }

  ngOnInit() {
    if(this.data){
      this.contact = this.data.contact;
    }
  }

  keepCurrent(){
    this.dialogRef.close({ data: {contact:this.contact, msg: 'keep'} });
  }
  replaceWithNew(){
    this.dialogRef.close({ data: {contact:this.contact, msg: 'replace'} })
  }
  changeNew(){
    this.input = true;
    
    //

  }
  submit(){
    if(this.newContactFirstName){
      this.contact.firstName = this.newContactFirstName;
    }
    if(this.newContactLastName){
      this.contact.lastName = this.newContactLastName;
    }
    console.log(this.contact)
    this.dialogRef.close({ data: {contact: this.contact, msg: 'change'} });
  }
}
