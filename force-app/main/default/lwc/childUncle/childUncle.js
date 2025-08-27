import { LightningElement, track } from 'lwc';

export default class ChildUncle extends LightningElement {

    @track loadPrompt = false

    handleOnClick(){
        this.loadPrompt = true
    }
    handelOnClose(){
        this.loadPrompt = false
    }

}