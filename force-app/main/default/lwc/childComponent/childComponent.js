import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api message;

    handleNameChnage(event){
        console.log('7 -- ');
        const event1 = new CustomEvent('namechange',{
            detail:{message: event.detail.value},
            bubbles: true,
            composed:false
        });
        this.dispatchEvent(event1);
    }
}