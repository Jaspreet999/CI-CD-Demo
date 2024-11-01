public without sharing class AccountRelatedOpportunity {
    @AuraEnabled
    public static List<Opportunity> getRelatedOpportunity(String accountId,integer offset){
        try {
            return [
                Select Id, Name, stageName, Amount,CloseDate
                From Opportunity
                Where accountId =: accountId
                Limit 5
                offSet :offset
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static Integer getCount(String accountId){
        try {
            Integer count = [
                Select Count()
                From Opportunity
                Where accountId =: accountId
            ];
            return count;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static void updateOpportunity(String opportunityId, Double amount){
        try {
            Opportunity opp = new Opportunity();
            opp.id = opportunityId;
            opp.amount = amount;
            update opp;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}