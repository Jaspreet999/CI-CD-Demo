@isTest
public class AccountManagerTest {
    
    @isTest static void TestgetCaseById(){
        
        Id recordId = createTestRecord();
        
        RestRequest request = new RestRequest();
        
        request.requestURI = 
            'https://wise-wolf-362dlq-dev-ed.trailblaze.lightning.force.com/lightning/r/Account/'+recordId+'/related/Contacts/view';
        
        request.httpMethod = 'GET';
        RestContext.request = request;
        
        Account acc = AccountManager.getAccount();
        system.Assert(acc != null);
        
    }
    
    public static id createTestRecord(){
        
        Account acc = new Account();
        acc.name = 'Jaspreet Singh';
        insert acc;
        
        Contact con = new Contact();
        con.lastName = 'Shivansh';
        con.AccountId = acc.Id;
        insert con;
        
        return acc.Id;
        
    }

}