import { LightningElement, wire } from 'lwc';
import Contact_object from '@salesforce/schema/Contact';
import {reduceErrors} from 'c/ldsUtils';
import First_Name from '@salesforce/schema/Contact.FirstName'
import Last_Name from '@salesforce/schema/Contact.LastName'
import Email from '@salesforce/schema/Contact.Email'
import getContacts from '@salesforce/apex/ContactController.getContacts'


const Column = [
    {label:'First Name', fieldName:First_Name.fieldApiName, type:'text'},
    {label:'Last Name', fieldName:Last_Name.fieldApiName, type:'text'},
    {label:'Email', fieldName:Email.fieldApiName, type:'email'},

]

export default class ContactList extends LightningElement {
   column = Column
   
   @wire(getContacts)
   contacts;
   get errors() {
    return (this.contacts.error) ?
        reduceErrors(this.contacts.error) : [];
}
}