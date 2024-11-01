import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Contact_object from '@salesforce/schema/Contact'
import First_Name from '@salesforce/schema/Contact.FirstName'
import Last_Name from '@salesforce/schema/Contact.LastName'
import Email from '@salesforce/schema/Contact.Email'

export default class ContactCreator extends LightningElement {

    objectApiName = Contact_object
    fields = [First_Name, Last_Name, Email]

    handleSuccess(event){
        const Toast = new  ShowToastEvent({
            title: "Contact created",
            message :"Record ID: " + event.detail.id,
            variant: "success"
        })

        this.dispatchEvent(Toast)
    }

}