import { LightningElement,track,wire,api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import fetchAccounts from '@salesforce/apex/listViewController.fetchAccounts';
import COUNTRY_FIELD from '@salesforce/schema/Account.BillingCountryCode';
import STATECODE_FIELD from '@salesforce/schema/Account.BillingStateCode';

export default class CustomFilter extends LightningElement {
    @track countryOptions;
    @track stateOptions;
    @track stateData;
    @api availableAccounts;
    error;
    columns;
    @api initialRecords;
    @api labels
    @api apiNames
    @api object
    searchQuery;
    isLoaded=false;
    @wire(getPicklistValues,{fieldApiName:COUNTRY_FIELD,recordTypeId: '012000000000000AAA' })
    picklistValuesget({ data, error }){
        if(data)
        {
           
            this.countryOptions=data.values;
            console.log(data.values);
        }
    }
    @wire(getPicklistValues,{fieldApiName:STATECODE_FIELD,recordTypeId: '012000000000000AAA' })
    picklistValues({ data, error }){
        if(data)
        {
            console.log(data);
            this.stateData=data;
        }
    }
    connectedCallback() {
        console.log(this.labels)
        let colName = [];
        if (!this.labels || !this.apiNames) return;
        let cols = this.labels.split(',');
        let api = this.apiNames.split(',');
        let query = 'Select '
        cols.forEach((data, index) => {
            let tempapi = api[index].split(':')[0];
            let tempType = api[index].split(':')[1];
            colName.push({
                label: data,
                fieldName: tempapi,
                type: tempType
            })
            if (index == (cols.length - 1)) {
                query += tempapi;
            }
            else {
                query += tempapi + ',';
            }

        })
        this.columns = colName;
        query += ' from ' + this.object;
        this.searchQuery = query;

        this.fetchData();

    }
     fetchData() {
        console.log(this.searchQuery)
        fetchAccounts({ query: this.searchQuery }).then(data => {
           
            this.availableAccounts = data;
            this.initialRecords = data;
           this.isLoaded=true;
        }).catch(error => {
            this.error = error
        })
    }
    handleCountryChange(event)
    {
        if(event.target.dataset.id=='country')
        {
            let value=event.target.value;
        }
        // let key = this.stateData.controllerValues[event.target.value];
        //  this.stateOptions = this.stateData.values.filter(opt => opt.validFor.includes(key));
        
        this.filterRecords();

    }
    filterRecords(){
           let recs = [];
        let countrycode=this.template.querySelector('[data-id="country"]').value;
       
            this.availableAccounts=this.initialRecords;
         
        let statecode=this.template.querySelector('[data-id="statecode"]').value;
        if(!statecode) statecode="";
       recs= this.availableAccounts.filter(data=>{
        let billingCountrycode=data.BillingCountryCode+'';
        let bilingstate=data.BillingStateCode+'';
         if( billingCountrycode.includes(countrycode)&& bilingstate.includes(statecode))
         {
            
               return data;
         }
        
        })
        this.availableAccounts=recs;
        

    }
}