import { Component, OnInit, Input, Inject } from '@angular/core';
import { Contact } from '../../Classes/Contact';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog,DateAdapter,NativeDateAdapter} from "@angular/material";
import { AddContactServerService } from '../../Services/add-contact-server.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CustomDateAdapter } from '../../Classes/DateAdapter';
@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {

  contact:Contact;
  favourites:Contact[];
  contacts:Contact[];
  askToDelete = false;
  birthDate = new Date();
  constructor(private dialogRef: MatDialogRef<ContactCardComponent>,
    @Inject(MAT_DIALOG_DATA) data, private contactService:AddContactServerService,public dialog: MatDialog, private adapter:CustomDateAdapter) {
       this.contact = data.contact;
       
     }

  ngOnInit() {
    this.birthDate = null;
  if(this.contact.birthDate.toString().length > 10){
    let tempstring = this.contact.birthDate.toString().substring(0,10)
    let tempArray = tempstring.split("-");
    let newBirthday = tempArray[2] + '/' + tempArray[1] +'/' + tempArray[0];
    let newBirthDayFormat = new Date(Number(tempArray[0]),Number(tempArray[1])-1,Number(tempArray[2])+1)
    //this.birthDate = this.adapter.format(newBirthDayFormat);
  }
 else{
   this.birthDate = this.contact.birthDate
 }
}
  
  onNoClick(): void {
    this.dialogRef.close();
    
  }
  editContact(contact){
    this.onNoClick();
    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '950px',
      height: '580px',
      data: {contact:contact}
    });
    dialogRef.afterClosed().subscribe(result => {
      
     // console.log(result);
    });

  }

  deleteContact(deletedId){
    
    
    this.askToDelete = true;
     this.dialogRef.updateSize("350px","250px")
     

    // const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //   width: '300px',
    //   height: '300px',
      
    // });

    

    // dialogRef.afterClosed().subscribe(result => {
      
    //   result = result;
    //   console.log(result);
    //  });
    
    
    
      
     
    }

    turnOff(favouriteId){
      this.contact.isFavourite = false;
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
      if(!this.favourites){
        this.favourites = [];
      }
      var index = this.favourites.findIndex((c)=>{return c.id == favouriteId});
      if(index != -1){
        this.favourites.splice(index, 1); 
        localStorage.setItem("favourites", JSON.stringify(this.favourites));
    }
  }
    
    turnOn(contact){
      contact.isFavourite = true;
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
      if(!this.favourites){
        this.favourites = [];
      }
      this.favourites.push(contact);
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    }

    sureDeleteContact(deletedId){
      let result = false;
      this.contacts = JSON.parse(localStorage.getItem("contacts"));

      var index = this.contacts.findIndex((c)=>{return c.id == deletedId});
      if(index != -1){
        this.contacts.splice(index, 1); 
        localStorage.setItem("contacts", JSON.stringify(this.contacts));
        this.contactService.sendMessage(this.contacts);
        this.onNoClick();
      }
    }
  
}
