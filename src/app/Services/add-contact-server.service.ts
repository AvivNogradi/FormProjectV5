import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../Classes/Contact';

@Injectable({
  providedIn: 'root'
})
export class AddContactServerService {

  contacts:Contact[];
  contact:Contact;

  private contactMessageSource = new BehaviorSubject(this.contacts);
   contactCurrentMessage = this.contactMessageSource.asObservable();

   private mycontactMessageSource = new BehaviorSubject(this.contact);
   mycontactCurrentMessage = this.mycontactMessageSource.asObservable();

  constructor() { }

  sendMessage(contacts:Contact[]){
    this.contactMessageSource.next(contacts)
  }

  addContact(contact:Contact){
    this.mycontactMessageSource.next(contact);
  }
}
