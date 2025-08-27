import { LightningElement } from 'lwc';

export default class ParentUncle extends LightningElement {

    textData = 'Please enter some text in the input box ... '

    handleTextChange(event){
        this.textData = event.detail.value
    }


}