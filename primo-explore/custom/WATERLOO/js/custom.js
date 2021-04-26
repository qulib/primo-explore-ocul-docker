(function () {    
    "use strict";

    var app = angular.module('viewCustom', ['angularLoad']);    
    // setup our module to all access to UG API
    app.config(function($sceDelegateProvider) {  
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',            
            // Allow loading from our API domain. **.
            'https://app.lib.uoguelph.ca/**'
        ]);        
    });

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/
        
    /****************************************************************************************************/

    // add in our search term eg
    app.component('prmSearchBarAfter', {
        template: '<span md-theme="primary" class="prm-primary-bg"><div class="ug-search-eg">e.g., king AND shakespeare NOT lear</div></span>'        
    });    

    app.component('prmSearchResultAvailabilityLineAfter', {
        bindings: {parentCtrl: `<`},
        controller: 'prmSearchResultAvailabilityLineAfterController',
        template: '<a href="http://testtube.uwaterloo.ca/whereisit/">Where is it?</a>'
    });

    app.controller('prmSearchResultAvailabilityLineAfterController', [function(){
        // useful and interesting code will go here
        // but for now we'll just examine the current object.
        // First author: this.parentCtrl.result.pnx.addata.au[0]
        // Location: this.parentCtrl.result.delivery.bestlocation.mainLocation
        console.log(this);
        console.log("Location: " + this.parentCtrl.result.delivery.bestlocation.subLocation);
        //alert("in prmSearchResultAvailabilityLineAfterController");        
    }]);
    
    // add in our search term eg
    app.component('prmSearchBookmarkFilterAfter',{                  
        //controller: 'prmSearchBookmarkFilterAfterController',
        controller: ['$scope', '$http', '$sce', function ($scope, $http, $sce) {             
            // UW just getting perma link to proxy for now...need to determine what they currently do          
            $scope.off_campus_url = 'https://proxy.lib.uwaterloo.ca/login?url='+window.location.href;
        }],        
        template: `                                                    
                <a class="button-over-dark md-button md-primoExplore-theme md-ink-ripple" id="off-campus-button" aria-label="Get Access From Anywhere" href="{{off_campus_url}}">\
                                        <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="sign-in"><md-icon md-svg-icon="primo-ui:sign-in" alt="" class="md-primoExplore-theme" aria-hidden="true"><svg id="sign-in_cache18" width="100%" height="100%" viewBox="0 0 24 24" y="192" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">\
                                        </svg></md-icon><prm-icon-after parent-ctrl="$ctrl"></prm-icon-after></prm-icon>Get Access From Anywhere</a>                
            `       
    });    

})();


   
