import { LightningElement, api } from 'lwc';

export default class Person extends LightningElement {

    @api user    

    handleChange(){
        console.log('Button clicked in child');
        let ev = new CustomEvent('childcomponent', 
                                    {detail : {
                                        firstName: 'Temp',
                                        lastName: 'Singh'
                                
                                    }}
                                );
        this.dispatchEvent(ev);                    
        console.log('Button clicked in child --1');                 
    }

    constructor(){
        super()
        console.log('child constructor callback');
    }

    connectedCallback(){
        console.log('child connected callback');
    }

    renderedCallback(){
        console.log('child rendered callback');
    }

    disconnectedCallback(){
        console.log('child Disconnected Callback')
    }

    errorCallback(){
        console.log('child In Error Callback function');
    }
}