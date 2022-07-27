public with sharing class listViewController {
    @AuraEnabled( cacheable = true )
    public static List< Account > fetchAccounts(string query) {
     
     return database.query(query);
         
    }
}