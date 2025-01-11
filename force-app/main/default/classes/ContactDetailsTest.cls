@isTest
private class ContactDetailsTest {

    @isTest
    static void myUnitTest() {
        Contact thisContact = new Contact(
            LastName = 'Dannis'
        );       
        insert thisContact;
        String thisContactName = ContactDetails.getContactName(thisContact.Id);
        System.Assert.isTrue(thisContactName == 'Dannis');
    }
    

}