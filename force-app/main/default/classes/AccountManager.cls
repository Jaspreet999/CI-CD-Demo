@RestResource(urlMapping='/Account/*/contacts')
global class AccountManager {
    @HTTPGet
    global static Account getAccount(){
        RestRequest request = RestContext.request;
        
        String AccountId = request.requestURI.substringBetween(
        '/Account/','/related');
        system.debug('Error');
        system.debug('Error');
        Account acc1 = [select id,Name from Account where Id =: AccountId ];
        system.debug(acc1);
        Account acc = [select id,Name, (select id,Name from Contacts) from Account where Id =: AccountId ];
        return acc;
    }
}