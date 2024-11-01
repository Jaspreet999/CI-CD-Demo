@isTest
private class CreateThousandsOfContactsTest {
    @isTest static void test(){
        integer count = [select count() from contact];
        list<contact> contacts = new list<contact>();
        for(integer i=0;i<200;i+=1){
            Contact con = new Contact(lastName='dummy'+i);
            con.FirstName = 'Test';
            con.Email ='test@example.com';
            contacts.add(con);
        }
        insert contacts;
        Test.startTest();
        CreateThousandsOfContacts ctc = new CreateThousandsOfContacts();
        Id batchId = database.executeBatch(ctc,200);
        Test.stopTest();
        system.assertEquals(10002, [select count() from contact]-count);
    }
}