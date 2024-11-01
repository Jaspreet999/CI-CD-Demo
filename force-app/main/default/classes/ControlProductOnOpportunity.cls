public class ControlProductOnOpportunity {
   
    public static void ProductUserRegionChecking(OpportunityLineItem oppline){
        
        Opportunity opp = [Select id, OwnerId,AccountId from  Opportunity where id =:oppline.OpportunityId];
        Account acc = [Select RecordTypeId from Account where id =: opp.AccountId];
        Product2 prd = [Select regions__c from  Product2 where id =: oppline.Product2Id];
        User use = [select regions__c from User where id =: opp.OwnerId];
        
        system.debug(prd +' '+ use);
        string str = prd.regions__c;
        string[] str1 = str.split(';');
        
        for(String str2:str1){
            if(use.regions__c.split(';').indexOf(str) == -1) {
                 oppline.addError('Opportunity owner does not belongs to products regions');
            }
        }
       
 
    }
}