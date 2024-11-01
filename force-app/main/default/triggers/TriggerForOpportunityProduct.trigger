trigger TriggerForOpportunityProduct on OpportunityLineItem (before insert) {
	
    if(Trigger.isInsert && Trigger.isBefore){
        ControlProductOnOpportunity.ProductUserRegionChecking(Trigger.new[0]);
    }
}