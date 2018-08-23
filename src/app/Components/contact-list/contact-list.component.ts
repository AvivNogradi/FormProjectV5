import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Contact } from '../../Classes/Contact';
import { AddContactServerService } from '../../Services/add-contact-server.service';
import { Subscription }   from 'rxjs';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { MatDialog } from '@angular/material';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import * as XLSX from 'xlsx';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

  fileToUpload: File;
  arrayBuffer:any;
  file:File;
  excelContacts = [];
  myContact:Contact;
  favourites:Contact[];
  fullList:Contact[];
  contacts:Contact[];
  subscription:Subscription;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone','gender','icons','isFavourite'];
  dataSource:MatTableDataSource<Contact>;
  columns =  ['firstName', 'lastName', 'email'];
  showGrid = false;

  @Input('contact') contact:Contact;
  constructor(private contactService:AddContactServerService, public dialog: MatDialog) { 
    this.subscription = this.contactService.contactCurrentMessage.subscribe( contacts => {
      this.contacts = contacts
      if(contacts){
        this.dataSource = new MatTableDataSource<Contact>(contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      }
    
    })
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('table') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.contactAdded()
    this.favouriteAdded()
    if(this.contacts){
      this.dataSource = new MatTableDataSource<Contact>(this.contacts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
 
  }

  contactAdded(){
    
    this.contacts = JSON.parse(localStorage.getItem("contacts"));
  }

  favouriteAdded(){
    this.favourites = JSON.parse(localStorage.getItem("favourites"));
  }

  onNgDestroy(){
    this.subscription.unsubscribe();
  }

  onClick(contact){
      const dialogRef = this.dialog.open(ContactCardComponent, {
        width: '850px',
        height: '650px',
        data: {contact:contact }
      });
      dialogRef.afterClosed().subscribe(result => {
      
      
        // });
      });
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
      this.favourites = JSON.parse(localStorage.getItem("favourites"));

      var contactsIndex = this.contacts.findIndex((c)=>{return c.id == contact.id});
      if(contactsIndex != -1){
        this.contacts.splice(contactsIndex, 1);

        localStorage.setItem("contacts", JSON.stringify(this.contacts));
        this.dataSource = new MatTableDataSource<Contact>(this.contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
        
      }
      if(this.favourites){
        var favouritesIndex = this.favourites.findIndex((c)=>{return c.id == contact.id});
        if(favouritesIndex != -1){
          this.favourites.splice(favouritesIndex, 1); 
        localStorage.setItem("favourites", JSON.stringify(this.favourites));
        this.favouriteAdded()
      }
     
      dialogRef.close();
      }
    }

  
     });
     
  }

  turnOff(favourite){
    event.stopPropagation();

   // this.contacts = JSON.parse(localStorage.getItem("contacts"));
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
      if(!this.favourites){
        this.favourites = [];
      }
      var favouriteindex = this.favourites.findIndex((c)=>{return c.id == favourite.id});
      
      if(favouriteindex != -1){
        this.favourites.splice(favouriteindex, 1); 
        localStorage.setItem("favourites", JSON.stringify(this.favourites));
        this.favouriteAdded();

    }
    var contactIndex = this.contacts.findIndex((c)=>{return c.id == favourite.id});
    
    if(this.contacts){
      this.contacts[contactIndex].isFavourite = false;
    }
  
  }
  

  turnOn(contact){
    event.stopPropagation();

    contact.isFavourite = true;
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
      this.favourites = JSON.parse(localStorage.getItem("favourites"));
      if(!this.favourites){
        this.favourites = [];
      }
      this.favourites.push(contact);
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
      this.favouriteAdded();
     
   
  }
  
  
  
  incomingfile(event) 
  {
   
  this.file = event.target.files[0]; 
 
  if(this.checkfile(event)){
    
    this.Upload()
  }
  }

  getExcelFileData(fileReader){
            
    this.arrayBuffer = fileReader.result;
    var data = new Uint8Array(this.arrayBuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, {type:"binary"});
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    let excelContactsObject = XLSX.utils.sheet_to_json(worksheet,{raw:true})
    
    return excelContactsObject;
  }

  Upload() {
    var filteredArray = [];
    var similarContactArray = [];
    let fileReader = new FileReader();
    let count = 0;
    let returnedContactArray = [];
      fileReader.onload = (e) => {
        

         let excelContactsObject = this.getExcelFileData(fileReader)

          this.excelContacts = excelContactsObject
          if(!this.contacts || this.contacts.length == 0){
            this.contacts = this.excelContacts;
            localStorage.setItem("contacts", JSON.stringify(this.contacts));
            this.contactService.sendMessage(this.contacts);
            return;
            
          }
        
        
         
          for(let i = 0; i < this.contacts.length; i++){
            for(let j = 0; j < this.excelContacts.length; j++){
              let similar = this.contacts[i].firstName == this.excelContacts[j].firstName && this.contacts[i].lastName == this.excelContacts[j].lastName
                  if(similar){
                    let newcontactcopy = {firstName:this.contacts[i].firstName,lastName:this.contacts[i].lastName,email:this.contacts[i].email
                      , company:this.contacts[i].company,jobTitle:this.contacts[i].jobTitle,phone:this.contacts[i].phone,gender:this.contacts[i].gender
                      ,birthDate:this.contacts[i].birthDate,image:this.contacts[i].image,id:this.contacts[i].id,isFavourite:this.contacts[i].isFavourite
                      ,icons:this.contacts[i].icons};

                  similarContactArray.push({contact: newcontactcopy , excelContact:this.excelContacts[j] })
                  }
            }
          }     
                const dialogRef = this.dialog.open(ImportDialogComponent, {
                  width: '700px',
                  height: '800px',
                  data: {contacts:similarContactArray},
                  disableClose: true 
                });
                    dialogRef.afterClosed().subscribe(result => {
                      returnedContactArray = result.data;
                  
                          this.contacts = this.contacts.filter( contact =>{
                            let similar = returnedContactArray.some(f=> f.firstName == contact.firstName && f.lastName == contact.lastName)
                            return !similar;
                          });
                  
                          this.excelContacts = this.excelContacts.filter( contact => {
                            let similar = returnedContactArray.some(f=> f.firstName == contact.firstName && f.lastName == contact.lastName)
                            return !similar;
                          });
                            
                         this.contacts = this.contacts.concat(this.excelContacts,returnedContactArray)
                         localStorage.setItem("contacts", JSON.stringify(this.contacts));
                       
                         this.dataSource = new MatTableDataSource<Contact>(this.contacts);
                         this.dataSource.sort = this.sort;
                         this.dataSource.paginator = this.paginator;
                        
                    });
                    
                    
                  }     
                   
                 
                    fileReader.readAsArrayBuffer(this.file);
                  
            }
         
       
      
   
    //  console.log( typeof fileReader)
     
    

    ExportToExcel()
    {
      var ws: XLSX.WorkSheet= XLSX.utils.table_to_sheet(this.table.nativeElement);
      var json = XLSX.utils.sheet_to_json(ws)
      json.forEach(cell => {
        delete cell[""];
      })
      ws = XLSX.utils.json_to_sheet(json);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      
      XLSX.writeFile(wb, 'TableExport.xlsx');

    }


   checkfile(sender) {
      var validExts = new Array(".xlsx", ".xls", ".csv");
      var fileExt = sender.path[0].files[0].name;
     
      fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
      if (validExts.indexOf(fileExt) < 0) {
        alert("Invalid file selected, valid files are of " +
                 validExts.toString() + " types.");
        return false;
      }
      else return true;
   }

   showMyGrid(){
     console.log("grid")
     this.showGrid = true;
   }
   tableShow(){
     console.log("table")
     this.showGrid = false;
   }
  // fullListConcat(){
    
  //   let contactsArray = JSON.parse(localStorage.getItem("contacts"));
  //   if(this.favourites){
  //     this.fullList = this.favourites.concat(contactsArray);
  //   }
  //   else{
  //     this.fullList= this.contacts;
  //   }
    

  //   for( let i = 0; i < this.fullList.length; i++){
         
  //     for( let j = i + 1; j < this.fullList.length; j++){
  //         if(this.fullList[i].id == this.fullList[j].id){
            
  //             this.fullList.splice(j, 1)
  //             j--
  //         }
  //     }
  //   }
    
  // }

}
