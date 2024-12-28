public with sharing class ContactDetails {
    
    public static String getContactName(String id){

        system.debug('ID is ' + id);
        String name = [
            Select Id, Name
            From Contact
            Where id =: id limit 1
        ].Name;

        return name;
    }
}