@RestResource(urlMapping='/Account/*/contacts')
global class AccountManager {
    @HTTPGet
    global static Account getAccount(){
        RestRequest request = RestContext.request;
        
        String AccountId = request.requestURI.substringBetween(
        '/Account/','/related');
        
        Account acc1 = [select id,Name from Account where Id =: AccountId ];
        Account acc = [select id,Name, (select id,Name from Contacts) from Account where Id =: AccountId ];
        return acc;
    }
}