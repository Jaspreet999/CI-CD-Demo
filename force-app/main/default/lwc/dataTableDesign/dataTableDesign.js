import { LightningElement, track } from 'lwc';
import getRelatedOpportunity from '@salesforce/apex/AccountRelatedOpportunity.getRelatedOpportunity';
import updateOpportunity from '@salesforce/apex/AccountRelatedOpportunity.updateOpportunity';
import getOppCount from '@salesforce/apex/AccountRelatedOpportunity.getCount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import AccountId from '@salesforce/schema/AccountHistory.AccountId';

export default class DataTableDesign extends LightningElement {

    @track accountId;
    @track relatedOpportunity;
    @track totalAmount =0;
    @track isText = true;
    currentRecord;
    currentAmount;
    @track totalRecord;
    pageSize = 5;
    @track totalPages = 1;
    @track currenPageSize = 1;
    goingRecord = 5;
    
    get isNextRecord(){
        return this.currenPageSize === this.totalPages;
    }

    get isPrevousRecord(){
        return this.currenPageSize === 1;
    }


    handleDoubleClick(event){
        this.currentRecord = event.target.value;

        for(let record of this.relatedOpportunity){
            if(JSON.stringify(record.Id) === JSON.stringify(this.currentRecord.Id)){
                record.editable = false;
            }
        }
    }

    handleValueChange(event){
        console.log('yesy')
        this.currentAmount = event.detail.value;
    }

    handOnMouseOut(event){
        if(event.target.value !=this.currentAmount.Amount){
            this.totalAmount = 0;
            for(let record of this.relatedOpportunity){
                if(record.Id == this.currentRecord.Id){
                    record.editable = true;
                    record.Amount = event.target.value
                }
                if(record.Amount !== ''){
                    this.totalAmount += parseFloat(record.Amount);
                }
                
               console.log(this.totalAmount);
            }

            updateOpportunity({opportunityId: this.currentRecord.Id, amount: this.currentAmount.Amount,acountId})
            .then(result => {
                this.showToast('Success', 'Amount Updated', 'success');
                   
            }).catch(error => {
                this.showToast('Error', 'Error in updating opportunity amount', 'error');
                    
            })
    
        
        }
    }

    getPrevRecord(){
        this.currenPageSize -= 1;
        this.goingRecord -= this.pageSize;
        this.getrelatedOpportunityHelper(this.goingRecord )
    }

    getNextRecord(){
        this.currenPageSize += 1;
        this.goingRecord += this.pageSize;
        this.getrelatedOpportunityHelper(this.goingRecord )
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }


    connectedCallback(){

    }

    handleAccountChange(event){
        this.accountId = event.detail.recordId;

        this.getrelatedOpportunityHelper(0);

        getOppCount({accountId:this.accountId})
        .then(results=>{
            this.totalRecord = results;
            this.totalPages = Math.ceil(this.totalRecord/this.pageSize)            
        })
        .catch(error=>{
            console.log('Error --'+JSON.stringify(error))
        });
        
    }


    getrelatedOpportunityHelper(offsets){
        getRelatedOpportunity({accountId:this.accountId,offset:offsets})
        .then(results=>{
            //this.relatedOpportunity = results;
            
            for(let result of results){
                this.totalAmount += result.Amount;
                 result.color = 'slds-box slds-theme_default white'
                 result.editable = true;
                if(result.StageName === 'Closed Won'){                  
                    result.color = 'slds-box slds-theme_default green'
                }
                if(result.StageName === 'Closed Lost'){
                    result.color = 'slds-box slds-theme_default red'
                }
                this.totalRecord +=1;
            }
            
            
            this.relatedOpportunity = results;
            //console.log('Related Opportunity --'+relatedOpportunity);
            

        })
        .catch(error=>{
            console.log('Error --'+JSON.stringify(error))
        });
    }
}