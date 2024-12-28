public with sharing class GetAccountDetails {

    public static String getAccountName(String accID){
        Account accD = [Select Id,Name from Account where id=:accId limit 1];
        return accD.Name;
    }
}