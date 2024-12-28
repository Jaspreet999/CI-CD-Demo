public class CreateThousandsOfContacts implements Database.Batchable<Contact>, Database.Stateful {
    public static integer recordProcessed = 0;
    public Iterable<Contact> start(Database.BatchableContext bc)
    {
        List<Contact> contList = [select Id, FirstName, LastName From Contact limit 200];
        return contList;
    }
    public void execute(Database.BatchableContext bc, List<Contact> conList){
        list<contact> contacts = new list<contact>();
        //system.debug(conList);
        for(contact t: conList){
            if(recordProcessed>10001){
                break;
            }
            Contact con = new Contact(lastName='dummy'+recordProcessed);
            con.FirstName = 'Test';
            con.Email ='test@example.com';
            contacts.add(con);
            recordProcessed+=1;
        }
        insert contacts;
    }
    public void finish(Database.BatchableContext bc){
        if(recordProcessed<10001){
            CreateThousandsOfContacts ctc = new CreateThousandsOfContacts();
        	Id batchId = database.executeBatch(ctc,200); 
        }
        
    }
}