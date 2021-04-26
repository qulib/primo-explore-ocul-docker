(function () {
    "use strict";

    //Define global variables used for the where is it?
    var initLoad = true;
    var staticLink = {};
    staticLink['Alfred Campus'] = 'http://www.alfredc.uoguelph.ca/bibliotheque/';
    staticLink['Alfred Cataloguing'] = 'http://www.alfredc.uoguelph.ca/bibliotheque/';

    // remapped Alma locations
    staticLink['Archives and Special Collections'] = 'https://www.lib.uoguelph.ca/find/find-type-resource/archival-special-collections-materials/archival-reference-service';
    staticLink['Archives Special Collections'] = 'https://www.lib.uoguelph.ca/find/find-type-resource/archival-special-collections-materials/archival-reference-service';
    staticLink['Archives Reference'] = 'https://www.lib.uoguelph.ca/find/find-type-resource/archival-special-collections-materials/archival-reference-service';
    staticLink['Archives'] = 'https://www.lib.uoguelph.ca/find/find-type-resource/archival-special-collections-materials/archival-reference-service';
    
    staticLink['Gryph Reads'] = 'https://www.lib.uoguelph.ca/where/areas/area/greads';
    staticLink['Atlas Stacks'] = 'https://www.lib.uoguelph.ca/where/areas/area/maps';
    staticLink['AV '] = 'https://www.lib.uoguelph.ca/where/areas/area/audiovisual';
    staticLink['Data Resource Centre - 2nd Floor'] = 'https://www.lib.uoguelph.ca/where/areas/area/drc';
    staticLink['Government Docs. Stacks'] = 'https://www.lib.uoguelph.ca/where/areas/area/govdoc';
    staticLink['Government Reference'] = 'https://www.lib.uoguelph.ca/where/areas/area/reference-gov-doc'; //this is a guess, don't see any reference for it existing anymore        
    staticLink['UG Humber Reserve'] = 'http://www.guelphhumber.ca/library';
    staticLink['Map Collection - 2nd Floor'] = 'https://www.lib.uoguelph.ca/where/areas/area/maps';
    staticLink['Map Reference - 2nd Floor'] = 'https://www.lib.uoguelph.ca/where/areas/area/maps';
    staticLink['Media Collection'] = 'https://www.lib.uoguelph.ca/where/areas/area/audiovisual';
    staticLink['Microform'] = 'https://www.lib.uoguelph.ca/where/areas/area/microfilm';
    staticLink['Newspaper Collection'] = 'https://www.lib.uoguelph.ca/where/areas/area/news';
    staticLink['Guelph OPIRG'] = 'https://www.uoguelph.ca/campus/map/housekeeping/';
    staticLink['Rare Books'] = 'https://www.lib.uoguelph.ca/find/find-type-resource/archival-special-collections-materials/archival-reference-service';
    staticLink['Reserve Collection'] = 'https://www.lib.uoguelph.ca/where/areas/area/rsv';
    staticLink['Restricted'] = 'https://www.lib.uoguelph.ca/find/find-type-resource/archival-special-collections-materials/archival-reference-service';
    staticLink['Atlas Oversize'] = 'https://www.lib.uoguelph.ca/where/areas/area/atlasoversized';
    staticLink['Periodical Oversize'] = 'https://www.lib.uoguelph.ca/where/areas/area/perover';
    staticLink['4th Floor Oversize '] = 'https://www.lib.uoguelph.ca/where/areas/area/os-l-pz';
    staticLink['Cookery Collection - 2nd Floor'] = 'https://www.lib.uoguelph.ca/where/areas/area/cookery';
    staticLink['Scottish Collection - 2nd Floor'] = 'https://www.lib.uoguelph.ca/where/areas/area/scot';
    staticLink['Ridgetown Campus'] = 'http://www.ridgetownc.uoguelph.ca/library/';

    //these specific gov maps located on second floors
    //marked as zztoreview - Alma consolidation?
    //staticLink['Guelph McLaughlin Government Documents Map 2nd Floor'] = 'https://www.lib.uoguelph.ca/where/areas/area/colsoil';
        
    staticLink['Guelph/Humber'] = 'build it';
    staticLink['UG Humber'] = 'build it';

    var noteText = {};
    //noteText['Annex'] = 'Use Locations & Requests Tab to HOLD the item';
    noteText['Annex'] = 'Use full item view to HOLD the item';

    var matType = {};
    matType['Book Stacks'] = 'mono';
    matType['Government Docs. Stacks'] = 'doc';
    matType['Government Reference'] = 'docref';
    //matType['Guelph McLaughlin Reference A&I'] = 'refai';
    //matType['Guelph McLaughlin Reference'] = 'refmono';
    matType['Periodical Stacks'] = 'per';

    //run at two different directives to hide the div of the expanded results
    function hideExpandedResultsNode() {
        try {
            var expand_node = document.querySelector('md-checkbox[aria-label="Add results beyond U of G\'s collection"]').parentNode;
            expand_node.style.display = "none";
        }
        catch (error) {
        }
        try {
            var expand_node = document.querySelector('md-checkbox[aria-label="Expand beyond library collections"]').parentNode;
            expand_node.style.display = "none";
        }
        catch (error) {
        }
    }

    //******************** END OF WHERE IS IT CONFIG ********************/

    // start of ANGULAR CODE
    var app = angular.module('viewCustom', ['angularLoad']);        

    app.component('prmFacetExactAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'prmFacetExactAfterController',
        template: ''
    });

    //use prmFacetExactAfter directive to trigger, one time per  initial page load the removal of expanded results div, it won't be in dom 
    // of the prmSearchResultSortByAfter on initial load
    app.controller('prmFacetExactAfterController', [function () {             
        //only perform on first facet                
        if (initLoad == true) {            
            hideExpandedResultsNode();
            initLoad = false;    
        }          
    }]);       

    // use prmSearchResultSortByAfter directive to trigger, one time per load removal of expanded results div
    app.component('prmSearchResultSortByAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'prmSearchResultSortByAfterController',
        template: ''
    });

    // use prmSearchResultSortByAfter directive to trigger, one time per search the removal of expanded results div
    app.controller('prmSearchResultSortByAfterController', ['$scope', '$http', '$sce', function($scope, $http, $sce){   
        hideExpandedResultsNode();                  
    }]);   

    //<p class="TUGCallNumberNote">{{displayNoteText}}</p>\
    //<span class="TUGCallNumberNote">{{displayNoteText}}</span>\
    //<p class="TUGCallNumberLink"> <a class="arrow-link md-primoExplore-theme" title="{{linkTitle}}" href="{{appLink}}" > {{linkTitle}}</a></p>\
    app.component('prmSearchResultAvailabilityLineAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'prmSearchResultAvailabilityLineAfterController',
        template: '\
            <div ng-if="use_where">\
            <span class="button-content TUGCallNumberLink"><a class="arrow-link md-primoExplore-theme" title="{{linkTitle}}" href="{{appLink}}" > {{linkTitle}}</a></span>\
            </div>\
            <div ng-if="use_text">\
                <p class="TUGCallNumberNote"><span style="position: relative;" class="md-primoExplore-theme">{{displayNoteText}}</span></p>\
            </div>\
        '
    });

    // Logic for where is it app
    app.controller('prmSearchResultAvailabilityLineAfterController', ['$scope', '$http', '$sce', function($scope, $http, $sce){        
        // First author: this.parentCtrl.result.pnx.addata.au[0]
        // Location: this.parentCtrl.result.delivery.bestlocation.mainLocation           
                            
        $scope.use_where = false;
        $scope.use_text = false;        

        // Only look at physical items...something in the building
        if ((this.parentCtrl.result.delivery.deliveryCategory[0].toUpperCase() === "PHYSICAL ITEM") || 
        (this.parentCtrl.result.delivery.deliveryCategory[0].toUpperCase() === "ALMA-P") ){
            try {     
            
                var inst = "";
                try {
                    inst = this.parentCtrl.result.delivery.bestlocation.libraryCode.toUpperCase();
                } catch (error) {
                    inst = "";                    
                }                

                // only look at GUELPH Items...OCUL -> mclaughlin                
                if ((inst.search("GUELPH") > -1) || (inst.search("mclaughlin".toUpperCase()) > -1) || (inst.search("UGHUMBER") > -1)) {
                    $scope.use_where = true;                

                    //look at the location text, this is how we'll map/determine the link
                    var linkText = this.parentCtrl.result.delivery.bestlocation.subLocation;                        

                    //clean up the call number
                    var callNumber = this.parentCtrl.result.delivery.bestlocation.callNumber;
                    callNumber = callNumber.replace('(', '');
                    callNumber = callNumber.replace(')', '');                                                
                    
                    // default material type
                    var mt = 'mono'; 

                    var appLink = '';
                    var notStaticLink = true;
                    var linkTitle = 'Where is it?';

                    // scan through the static links and find a match based on location text
                    for (var i in staticLink) {
                        if (linkText.search(i) > -1) {
                            notStaticLink = false;

                            if ((i === 'Guelph/Humber') || (i === 'UG Humber')) {
                                var re4 = /^([A-N])/;
                                var re5 = /^([P-Z])/;
                                if (callNumber.search(re4) > -1) {
                                    appLink = 'https://humber.ocls.ca/WebCat_Images/English/Other/MiscD/humbermap.jpg';
                                } else if (callNumber.search(re5) > -1) {
                                    appLink = 'https://humber.ocls.ca/WebCat_Images/English/Other/MiscD/humbermap.jpg';
                                } else {
                                    appLink = 'https://library.humber.ca/overview-policies';
                                }
                            } 
                        else {
                            appLink = staticLink[i];
                        }

                        // build the static link html
                        $scope.linkTitle = $sce.trustAsHtml(linkTitle);
                        $scope.appLink = $sce.trustAsHtml(appLink);                        
                    
                        }
                    }
                    
                    var haveNoteText = false;
                    var displayNoteText = '';
                    // Scan through the note/text locations and find a match based on location text
                    for (i in noteText) {
                      if (linkText.search(i) > -1) {                        
                        displayNoteText = noteText[i];
                        haveNoteText = true;                        
                      }
                    }

                    // Is the link using the dynamic material type - where is it app? if yes build the link, otherwise
                    // find the static link
                    if (notStaticLink && (!haveNoteText)) {
                        // Iterate through the material types and determine which it is
                        for (i in matType) {
                            if (linkText.search(i) > -1) {
                                mt = matType[i];
                            }
                        }

                        appLink = 'https://www.lib.uoguelph.ca/where/lookup?mt=' + mt + '&cno=' + String(callNumber);

                        // build the static link html
                        $scope.linkTitle = $sce.trustAsHtml(linkTitle);
                        $scope.appLink = $sce.trustAsHtml(appLink);                        
                        
                    } else if (haveNoteText) {
                        // Insert the display text
                        $scope.displayNoteText = $sce.trustAsHtml(displayNoteText);
                        $scope.use_where = false;
                        $scope.use_text = true;                        
                    }

                }                
            } catch (error) {                
            }                        
        }                
    }]);          
    
    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

})();
