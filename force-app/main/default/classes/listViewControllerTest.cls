@istest
public with sharing class listViewControllerTest {
   @IsTest
   static void method1(){
    Account ac= new Account();
    ac.Name='data';
    insert ac;
    Test.startTest();
   List< Account > acc=listViewController.fetchAccounts('select id,name from account');
   system.assertEquals(1, acc.size());
    Test.stopTest();
    
   }
}