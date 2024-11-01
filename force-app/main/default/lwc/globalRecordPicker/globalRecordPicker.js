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
    console.log('this.targetObject -- '+this.targetObject);
  }
  
  handleRecordSelection(event) {
    console.log(event.detail.recordid);
  }

}