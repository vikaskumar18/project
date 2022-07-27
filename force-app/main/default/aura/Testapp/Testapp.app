<aura:application extends="force:slds">
    <!-- <c:testLightning/> -->
    <!--c:parentBulkUpload/-->
    <!--c:bulkUpload/-->
    <!--c:news></c:news-->
    <!-- <c:bulkFields/> -->
    <!-- <c:cometD/> -->
    <c:customFilter labels="Name,Phone,Type,BillingState,BillingCountry,BillingCountryCode,BillingStateCode,Industry"
        object="Account"
        apiNames="Name:text,Phone:Phone,Type:text,BillingState:text,BillingCountry:text,BillingCountryCode:text,BillingStateCode:text, Industry:text">
    </c:customFilter>
    <!-- <c:customFilter></c:customFilter> -->
</aura:application>