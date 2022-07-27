import { api, LightningElement, wire } from 'lwc';
const DELAY = 500;

export default class ListView extends LightningElement {

    @api availableAccounts;
    error;
    @api columns;
    searchString;
    @api initialRecords;
    @api labels
    @api apiNames
    @api object
    searchQuery;
    delayTimeout=DELAY;

   
    handleSearchChange(event) {
  window.clearTimeout(this.delayTimeout);
        this.searchString = event.detail.value;
        this.delayTimeout = setTimeout(() => {
            this.handleSearch(this.searchString.toLowerCase());
        })

    }

    handleSearch(searchKey) {


        if (searchKey) {

            this.availableAccounts = this.initialRecords;
            if (this.availableAccounts) {

                let recs = [];

                for (let rec of this.availableAccounts) {
                    let valuesArray = Object.values(rec);
                    for (let val of valuesArray) {
                       let strVal = String(val);
                        if (strVal) {
                                
                            if ( (strVal.toLowerCase().includes(searchKey))) {

                                recs.push(rec);
                                break;

                            }

                        }

                    }

                }
               this.availableAccounts = recs;

            }

        } else {

            this.availableAccounts = this.initialRecords;

        }

    }

    
}