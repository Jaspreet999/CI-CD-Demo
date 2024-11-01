import { LightningElement,wire,track } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFIELD from '@salesforce/schema/User.Name'

export default class Selector extends LightningElement {

    @track userId = Id;
    @track name;

    @wire(getRecord, { recordId: Id, fields: [UserNameFIELD]}) 
    currentUserInfo({error, data}) {
        if (data) {
            this.name = data.fields.Name.value;
            
        } else if (error) {
            this.error = error ;
        }
}}