public with sharing class ContactDetails {
    
    public static String getContactName(String id){

        String name = [
            Select Id, Name
            From Contact
            Where id =: id limit 1
        ].Name;

        return name;
    }
}