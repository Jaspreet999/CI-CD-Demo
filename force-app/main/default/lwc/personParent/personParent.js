import { LightningElement, api, track } from 'lwc';

export default class PersonParent extends LightningElement {

    @track
    user = {
        firstName:'Jaspreet',
        lastName:'Singh'
    }

    handleChildMethod(event){
        console.log('hii ');
        this.user.firstName = event.detail.firstName
        this.user.lastName = event.detail.lastName
        
    }

    constructor(){
        super();
        console.log('Parent Constructor');
    }

    connectedCallback(){
        console.log('Connected Callback');
    }

    renderedCallback(){
        console.log('Rendered Callback');
    }

    disconnectedCallback(){
        console.log('Disconnected callback');
    }

    errorCallback(){
        console.log('Error Callback')
    }
    
}