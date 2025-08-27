import { LightningElement,  } from 'lwc';

const options =[
    {
        label:"Account",
        value:"Account"
    },
    {
        label:"Contact",
        value:"Contact"
    },
    {
        label:"Opportunity",
        value:"Opportunity"
    }
];

export default class GlobalLWCRecordPicker extends LightningElement {

    targetObjectSelectedId = null;

    options = options
    targetObject = 'Account';

    get targetObjectSelected(){
        return this.targetObjectSelectedId === null
    }

    handleObjectChange(event){
        //event.stopPropagation();
        this.targetObject = event.target.value
        //this.refs.recordPicker.clearSelection();
    }

    handleRecordSelection(event){
        this.targetObjectSelectedId = event.detail.recordId
    }
}