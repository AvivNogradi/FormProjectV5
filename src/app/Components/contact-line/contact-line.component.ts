import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../Classes/Contact';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { ContactCardComponent } from '../contact-card/contact-card.component'
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'contact-line',
  templateUrl: './contact-line.component.html',
  styleUrls: ['./contact-line.component.css']
})
export class ContactLineComponent implements OnInit {
  contacts:Contact[] = []
  myContact:Contact;
  favourites:Contact[]; 

  @Output('favouriteAdded') favouriteAdded:EventEmitter<any> = new EventEmitter();
  
  @Output('contactDeleted') contactDeleted:EventEmitter<any> = new EventEmitter();

  @Input('contact') contact:Contact;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  openDialog(){
    const dialogRef = this.dialog.open(ContactCardComponent, {
      width: '850px',
      height: '650px',
      data: {contact:this.contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      
    // });
  });
  }

  editContact(contact){
    event.stopPropagation();
    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '950px',
      height: '580px',
      data: {contact:contact}
      
    });
    dialogRef.afterClosed().subscribe(result => {
     
  
    });

  }

  deleteContact(deletedId){
    event.stopPropagation();

    let answer;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      height: '250px',
     
    });
    dialogRef.afterClosed().subscribe(result => {
      
 
    
    if(result.data == 'yes'){
     
      this.contacts = JSON.parse(localStorage.getItem("contacts"));

      var index = this.contacts.findIndex((c)=>{return c.id == this.contact.id});
      if(index != -1){
        this.contacts.splice(index, 1); 
        
        localStorage.setItem("contacts", JSON.stringify(this.contacts));
        this.contactDeleted.emit();
        dialogRef.close();
      }
    }
     });
  }

  turnOff(favouriteId){
    event.stopPropagation();

    this.contact.isFavourite = false;
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
      if(!this.favourites){
        this.favourites = [];
      }
      var index = this.favourites.findIndex((c)=>{return c.id == favouriteId});
      if(index != -1){
        this.favourites.splice(index, 1); 
        localStorage.setItem("favourites", JSON.stringify(this.favourites));
        this.favouriteAdded.emit();
    }
  }
  

  turnOn(contact){
    event.stopPropagation();

    contact.isFavourite = true;
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
      if(!this.favourites){
        this.favourites = [];
      }
      this.favourites.push(contact);
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
      this.favouriteAdded.emit();
  }
}
