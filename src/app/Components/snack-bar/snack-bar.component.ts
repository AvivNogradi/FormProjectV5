import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs';
import { AddContactServerService } from '../../Services/add-contact-server.service';
import { Contact } from '../../Classes/Contact';
import { MatSnackBarRef } from '@angular/material';
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  subscription:Subscription;
   contact:Contact;
  constructor(private contactService:AddContactServerService,private snackBarRef: MatSnackBarRef<SnackBarComponent>) {
    this.subscription = contactService.mycontactCurrentMessage.subscribe(contact => {
      this.contact = contact
    })
   }

  ngOnInit() {
    this.snackBarRef._open();
  }

}
