import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {

    message = ''
    newMessage = ''

    handleNameChange(event){
        this.message = event.detail.value;
    }
    handleNameChnage(event){
        console.log('this');
        this.newMessage = event.detail.message;
    }
}