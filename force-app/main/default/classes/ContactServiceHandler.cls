public with sharing class ContactServiceHandler {
    
    public static string getContactName(String id){
       
        String name = [
            Select Id, Name
            From Contact
            Where id=:id limit 1
        ].Name;
        return name;
    }

}