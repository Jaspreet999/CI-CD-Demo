public class ContactController {
    
    @AuraEnabled(cacheable = True)
    public static list<Contact> getContacts(){
        //return [Select FirstName, LastName,Email 
         //       from contact 
        //        WITH SECURITY_ENFORCED];
        throw new AuraHandledException('Forced error');
    }

}