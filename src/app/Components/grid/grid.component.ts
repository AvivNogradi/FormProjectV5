import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Contact } from '../../Classes/Contact';
import { MatDialog } from '@angular/material';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {


  width2X1 = false;
  width1X2 = false;
  width2X2 = false;
   widthid = 0;
   heightid = 0;
   bothid = 0;
  always = true;
  sizes = [
    {value: '1x2', viewValue: '1 x 2'},
    {value: '2x1', viewValue: '2 x 1'},
    {value: '2x2', viewValue: '2 x 2'},
    {value: 'back', viewValue: '1 x 1'}
  ];
  constructor(public dialog: MatDialog) {

   }

@Output('tableShow')tableShow = new EventEmitter()
@Input('contacts')contacts;


  ngOnInit() {
    

  }
  showMyTable(){

   this.tableShow.emit();
  }

  changeTo2X1(id){
   this.widthid = id;

  }
  changeTo1X2(id){
   this.heightid = id;
  
    }
  changeTo2X2(id){
    this.heightid = id;
    this.widthid = id;
  }
  changeBack(){
   this.heightid = 0;
   this.widthid = 0;
  }
  selectionChange(event, id ){
  if(event.value == '1x2'){
    this.changeTo1X2(id);
    this.widthid = 0;
   
  }
  else if(event.value == '2x1'){
    this.changeTo2X1(id);
    this.heightid = 0;
  }
  else if(event.value == '2x2'){
    this.changeTo2X2(id);
  }
  else {
    this.changeBack();
    
  }
  }
  editContact(contact){
    
    event.stopPropagation();
    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '950px',
      height: '680px',
      data: {contact:contact}
      
    });
    dialogRef.afterClosed().subscribe(result => {
     
    
    });

  }
  deleteContact(contact){
    event.stopPropagation();

    let answer;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      height: '250px',
     
    });
    dialogRef.afterClosed().subscribe(result => {
      
 
    
    if(result.data == 'yes'){

      this.contacts = JSON.parse(localStorage.getItem("contacts"));
   

      var contactsIndex = this.contacts.findIndex((c)=>{return c.id == contact.id});
      if(contactsIndex != -1){
        this.contacts.splice(contactsIndex, 1);

        localStorage.setItem("contacts", JSON.stringify(this.contacts));
       
        
        
      }
     
      }
     
      dialogRef.close();
      })
    }
    turnOff(favourite){
      event.stopPropagation();

      var contactIndex = this.contacts.findIndex((c)=>{return c.id == favourite.id});
      
      if(this.contacts){
        this.contacts[contactIndex].isFavourite = false;
      }
    
    }
    
  
    turnOn(contact){
      event.stopPropagation();
  
      contact.isFavourite = true;
    
       
     
    }
  
     
     
  }




