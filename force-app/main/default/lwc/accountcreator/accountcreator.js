import { LightningElement} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Account_Object from '@salesforce/schema/Account'
import Account_Name from '@salesforce/schema/Account.Name'
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class Accountcreator extends LightningElement {

    objectApiName = Account_Object
    fields = [Account_Name, REVENUE_FIELD, INDUSTRY_FIELD];

    handleSuccess(event){
        const toast = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toast)
    }

}