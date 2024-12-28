import { LightningElement, track } from "lwc";

const option = [
    {
        label:'Accounts',
        value:'Account'
    },
    {
        label:'Contacts',
        value:'Contact'
    },
    {
        label:'Cases',
        value:'Cases'
    }
];

export default class GlobalRecordPicker extends LightningElement {
  options = option;
  @track targetObject = 'Account';

  handleObjectChange(event){
    this.targetObject = event.target.value;
  }
}