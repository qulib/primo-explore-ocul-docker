(function () {    
    "use strict";

    var app = angular.module('viewCustom', ['angularLoad']);    

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/
        
    /****************************************************************************************************/     

    // add in our search term eg
    app.component('prmSearchBarAfter', {
        template: '<span md-theme="primary" class="prm-primary-bg"><div class="ug-search-eg">e.g., king AND shakespeare NOT lear</div></span>'        
    });        

})();


   
