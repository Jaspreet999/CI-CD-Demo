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
  //accountId = "";
  options = option;
  @track targetObject = 'Account';

  handleObjectChange(event){
    this.targetObject = event.target.value;
    console.log('25 --'+this.targetObject);
  }
  
  handleRecordSelection(event) {
    console.log('29 --'+event.detail.recordid);
  }

}