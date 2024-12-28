import { LightningElement, track } from "lwc";

export default class Lookupfilter extends LightningElement {
  
  @track accountId = "";
  
  @track filters = {
    criteria: [
      {
        fieldPath: "AccountId",
        operator: "eq",
        value: this.accountId
      }
    ]
  };

  handleRecordSelection(event) {
    //this.accountId = ;
    console.log('19 --');
    this.filters = {
        criteria: [
          {
            fieldPath: "AccountId",
            operator: "eq",
            value: event.detail.recordId
          }
        ]
      };
  }

  handleContactRecordSelection(event){
    console.log(event.detail.recordId);
  }
}