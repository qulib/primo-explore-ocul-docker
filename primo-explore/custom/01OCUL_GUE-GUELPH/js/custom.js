// ***************** START OF REQUEST DATE INJECT FUNCTION **********/            

// On Account entry AND Overview tab click, check for email and
// inject the request date onto the overview tab

function injectRequestDate(data) {
    //dictionary object for request
    try {
        var req_date = data.ug_request_date;          
        
        //search by shortened title
        var ug_title_search = data.ug_title_search;                                                
        
        //inject date on the overall tab
        var headings = document.evaluate("//span[contains(., '"+ug_title_search+"')]", document, null, XPathResult.ANY_TYPE, null );
        var this_heading = headings.iterateNext();        
        var request_div = this_heading.parentNode.parentNode;
        var pick_up_p = this_heading.parentNode.parentNode.querySelector('p:last-child');

        //Create an attribute to place on the p tag
        var att = document.createAttribute("class");       // Create a "class" attribute
        att.value = "weak-text";                           // Set the value of the class attribute

        //insert request date before pickup
        var req_date_span = document.createElement('span');
        req_date_span.innerText = "Request Date: " + req_date;

        var req_date_p = document.createElement('p');
        req_date_p.setAttributeNode(att);
        req_date_p.append(req_date_span);

        request_div.insertBefore(req_date_p, pick_up_p);

    }
    catch (error) {
        console.log("UG Inject request date failed");
    }
}    

// check to see if we can get email from the account details.
// if we have email, request full request data using app.lib and exlibris api
// then for each request...attempt to insert into account info
function ugProcessRequestDate() {
    var email = "";
    try {
        email = document.querySelector('label[for="prm_mypref.label.my_email"]').nextElementSibling.value;            
    }
    catch (error) {            
    }                

    if (email.length > 0) {        
        try {
            var Http = new XMLHttpRequest();
            var url="https://app.lib.uoguelph.ca/omni/api/get-request-data/?email="+email;
            Http.open("GET", url);
            Http.send();
        
            Http.onreadystatechange = function() {

                if (this.readyState == 4 && this.status==200) {
                    var response_data = JSON.parse(this.responseText);                    
                    var rc = response_data.total_record_count;

                    if (rc > 0) {                        
                        var req_list = response_data.user_request;
                        req_list.forEach(injectRequestDate);
                    }                                        
                }                        
            }
        }
        catch(err) {
            console.log('api error getting request data: ' + err);
        };        
    }               
}

// create a function to toggle askus popout
function askus_popout_toggle() {
  var askus = document.getElementById('askus-popout');
  var state = askus.getAttribute('data-askus-popout-state');
  console.log(state)

  if (state == "collapsed") {        
      askus.setAttribute('data-askus-popout-state', 'expanded');
  }
  else {        
      askus.setAttribute('data-askus-popout-state', 'collapsed');
  }
}

// ***************** END OF REQUEST DATE INJECT FUNCTION **********/                

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
    matType['Periodical Collection'] = 'per';

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

    /******************* FUNCTION FOR Report an Issue search results *************/
    function insertReportAnIssueSearchResults() {
      var test_search_button = document.querySelector("md-toolbar #ug-report-issue-search-button-div");
      if (test_search_button == null) {        
        //test to see if the button exists at top
        var rp_btn_div = document.querySelector('#ug-report-issue-search-button-div');

        //remove from component target
        rp_btn_div.parentNode.removeChild(rp_btn_div);
        rp_btn_div.className = rp_btn_div.className.replace(/\ug-display-none\b/g, "");                  

        //find the search container we'll be placing report in                  
        var prm_results = document.querySelector("prm-personalize-results-button");
                                            
        //move msg div to BESIDE the button for search results view, content made a bit smaller
        var rp_msg_div = document.querySelector('#ug-report-msg-id');
        
        //remove from component target
        rp_msg_div.parentNode.removeChild(rp_msg_div);
        
        //moving msg within search container                  
        prm_results.parentNode.parentNode.insertBefore(rp_msg_div,prm_results.parentNode.nextSibling);                  
        
        //moving bar within search container
        prm_results.parentNode.parentNode.insertBefore(rp_btn_div,prm_results.parentNode.nextSibling);  

        setTimeout(function() {        
          insertReportAnIssueSearchResults();
        }, 500);
      } //stop trying to insert
    }
    /******************* END OF Report an Issue search results *************/

    // start of ANGULAR CODE
    var app = angular.module('viewCustom', ['angularLoad']);

// setup our module to all access to UG API
    app.config(function($sceDelegateProvider) {  
        $sceDelegateProvider.resourceUrlWhitelist(['**']);
        // The blacklist overrides the whitelist so the open redirect here is blocked.
        $sceDelegateProvider.resourceUrlBlacklist([  
        ]);
    });

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
    
    // ***************** START OF ACCOUNT MSG INJECT FUNCTION **********/

    // When the account screen is loaded, display a message banner style before the grid
    // initially used for covid-19 - disabled when returned to work
    /*
    // Comment out covid msg 20201015 keep around of we want to repurpose
    app.component('prmLinkedUserSelectorAfter', {                    
        bindings: {parentCtrl: `<`},
        controller: ['$scope', '$http', '$sce', function ($scope, $http, $sce) {  
            
            angular.element(document).ready(function () {                                
                var account_ov = document.querySelector('#accountoverview');
                var account_ov_p = account_ov.parentNode;                                

                var new_md = document.createElement('md-content');        

                //Create various attributes
                var att1 = document.createAttribute("tabindex");       // Create a "class" attribute
                att1.value = "-1";                           // Set the value of the class attribute

                var att2 = document.createAttribute("layout");
                att2.value = "row";                

                var att3 = document.createAttribute("class");
                att3.value = "_md md-primoExplore-theme layout-row flex ug-account-msg";
                            
                new_md.setAttributeNode(att1);
                new_md.setAttributeNode(att2);
                new_md.setAttributeNode(att3);                

                var msg = 'While the library is closed, there are no fines or fees on borrowed items.';
                new_md.append(msg);
                account_ov_p.insertBefore(new_md, account_ov);
                
            });
        }],
        template: ''
    });    
    */
    // ***************** END OF ACCOUNT MSG INJECT FUNCTION **********/

    // ***************** START OF REQUEST DATE INJECT FUNCTION **********/
    app.component('prmLoansOverviewAfter', {    
        bindings: {parentCtrl: `<`},
        controller: ['$scope', '$http', '$sce', function ($scope, $http, $sce) {  
            
            angular.element(document).ready(function () {                            
                
                // get the email of user. The timing of when it's available on initial load is unknown...
                //so we delay a bit                                
                setTimeout(function(){                
                    ugProcessRequestDate();
                }, 1000);

                // Add the onclick to the Overview tab, will override onclick that's there
                // as of Feb 2020 ExLibris not using onclick                
                setTimeout(function(){
                    try {                        
                        // missing parentNode
                        var headings = document.evaluate("//span[@translate='nui.overview.header' and contains(., 'Overview')]", document, null, XPathResult.ANY_TYPE, null );
                        var this_heading = headings.iterateNext();                        
                        var overview_tab = this_heading.parentNode;
                    
                        ///register the 
                        var onclick_att = document.createAttribute("onclick");
                        onclick_att.value = "ugProcessRequestDate();"; 
                        overview_tab.setAttributeNode(onclick_att);                    
                    } catch (error) {
                        
                    }                                        
                }, 1500);                
            });
        }],    
        template: ''
    });    

    // ***************** END OF REQUEST DATE INJECT FUNCTION **********/

    // ***************** START OF OUR LINK ENHANCEMENT ****************/
    app.component('prmSaveToFavoritesButtonAfter', {                            
        
        bindings: {parentCtrl: `<`},
        controller: ['$scope', '$http', '$sce', function ($scope, $http, $sce) {  
            
            angular.element(document).ready(function () {                            
                // look up the OUR links, and pull in the license details                
                // look up links with the public-note id's                
                var nodeList = document.querySelectorAll('#public-note > a');                
                var pNodeList = document.querySelectorAll('#public-note');                
                if (nodeList.length > 0) {
                    for (var i = 0; i < nodeList.length; i++) {
                        var node = nodeList[i];
                        var pnode = pNodeList[i];

                        // add an id or class on link node and parent
                        // so we can target the content on API success
                        var link_id = "ug-our-link-"+i;                                                                     
                        var parent_id = "p-"+link_id;                        
                        node.setAttribute("id",link_id);
                        pnode.setAttribute("class",parent_id);
                        var info_list = [];

                        try {
                            var Http = new XMLHttpRequest();
                            var url="https://app.lib.uoguelph.ca/omni/api/get-our-data/?target="+link_id+"&our_url="+encodeURIComponent(node.getAttribute("href"));
                            //make call to get the license info
                            Http.open("GET", url);
                            Http.send();
                        
                            // process the AJAX call when it's ready...won't stop page from loading
                            Http.onreadystatechange = function() {                                
                                if (this.readyState == 4 && this.status==200) {                                    
                                    var response_data = JSON.parse(this.responseText);                                    
                                    info_list = response_data.our_data;

                                    if (info_list.length > 0) {                                        
                                        var lic_list = document.createElement('ul');
                                        
                                        for (var opt in info_list){
                                            //parse the usage
                                            var full_details = info_list[opt];
                                            var usage = "";
                                            var n = full_details.lastIndexOf(" ");
                                            if (n > 0) {
                                                usage = full_details.slice(n+1);
                                                full_details = full_details.slice(0, n+1);                                                
                                            }
                                                                                        
                                            //create an UL/li
                                            var line_item = document.createElement('li');
                                            line_item.innerText = full_details;                                            

                                            //create the span
                                            var usage_span = document.createElement('span');
                                            usage_span.innerText = usage;

                                            //determine the class based on usage
                                            var usage_class = "";

                                            if (usage.toLowerCase() == "no") {
                                                usage_class = "ug-our-usage ug-our-no";
                                            }
                                            else if (usage.toLowerCase() == "yes") {
                                              usage_class = "ug-our-usage ug-our-yes";
                                            }
                                            else if (usage.toLowerCase() == "ask") {
                                                usage_class = "ug-our-usage ug-our-ask";
                                            }
                                            
                                            usage_span.setAttribute("class",usage_class);
                                            line_item.appendChild(usage_span);

                                            //finalize the li
                                            lic_list.appendChild(line_item);
                                        }
                                                                                
                                        //insert license info before link
                                        var license_area = document.createElement('p');
                                        license_area.innerText = "License Terms of Use:";
                                        license_area.appendChild(lic_list);

                                        //Get the target node and parent node
                                        var target_link = response_data.target;                                        
                                        var p_target_link = "p-"+target_link;                                                                                
                                        var tnode = document.querySelector("#"+target_link);
                                        var ptnode = document.querySelector("."+p_target_link);
                                        ptnode.insertBefore(license_area, tnode);
                                    }                                
                                }                        
                            }
                        }
                        catch(err) {
                            console.log('api error getting Omni OUR data: ' + err);
                        };
                    }
                } // end of nodeList                        
            });
        }],    
        template: ''
    });        
    // ***************** END OF OUR LINK ENHANCEMENT **********/

    /********** START OF UG REPORT AN ISSUE *************/    
    app.component('prmActionListAfter', {                            
        
        bindings: {parentCtrl: `<`},
        controller: ['$location', '$httpParamSerializer', '$scope', '$http', '$sce', function ($location, $httpParamSerializer, $scope, $http, $sce) {  
            var _this = this;

            this.$onInit = function () {                
              //default form as hidden
              this.showRPForm = false;
              //use requireDesc to track required fields / error msg
              this.requireDesc = true;
            };
            
            this.showReportForm = function () {
              //if showing form, set focus to description
              _this.showRPForm = !_this.showRPForm;         
              this.requireDesc = true;

              if (_this.showRPForm) {                
                //must use the timeout to set the focus                
                setTimeout(() => {                  
                  document.getElementById("ugdescription").focus();                  
                }, 0)                
              }
                return _this.showRPForm;
            };            
            
            this.setStatusCode = function (code) {
                return _this.statusCode = code;
            };            
            
            this.submitReport = function () {
              //in submit
              if (_this.validate()) {                
                var params = {                                                          
                  'FROMOMNI': "True",
                  'email': _this.email,
                  'description': _this.description,
                  'full_URL': $location.absUrl(),
                  'URL_params': $location.search()
                };
                
                $http.post("https://app.lib.uoguelph.ca/omni/api/email-issue/", params).then(function (msg) {                                    
                  _this.setStatusCode(200);
                  $scope.successMessage = "Thanks for the feedback. We’re on it!";
                  $scope.successMessagebool = true;                  
                }).catch(function (err) {                                                      
                  $scope.successMessage = "We're sorry, your message didn't send. Please try again.";
                  $scope.successMessagebool = true;
                  console.log("Gone into reportForm catch from email post");
                  _this.setStatusCode(500);                  
                }).finally(function () {                                    
                  console.log("report issue email statusCode: "+String(_this.statusCode));
                  //reset the form, clear vars
                  
                  //clear the notification
                  setTimeout(function() {
                    //reset after a certain amt of time                      
                    $scope.successMessagebool = false;
                    $scope.successMessage = "";
                  }, 3000);

                  //if a success, clear things
                  if (_this.statusCode == 200) {                    
                    _this.description = _this.email = '';
                    _this.reportForm.$setPristine();
                    _this.reportForm.$setUntouched();                    
                  }
                  _this.showReportForm();                  
                });
              }
            };

            //validation for the report form is something must be entered in the description
            this.validate = function () {                              
              var result = false;              
              try {
                if (this.description.length > 0) {
                  result = true;
                  this.requireDesc = true;                                    
                }  
                else {                  
                  this.requireDesc = false;                  
                }
              } catch (error) {
                this.requireDesc = false;
              }                                  
              return result;
            };
        }],    
        template: `
        <div class="bar filter-bar layout-align-center-center layout-row margin-top-medium" layout="row" layout-align="center center">
            <span class="margin-right-small"></span>
            <button class="ug-report-button-full-display button-as-link button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme md-ink-ripple" type="button" aria-label="Report an Issue" ng-click="$ctrl.showReportForm()">
            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>
            <span>Report an Issue</span>
            </button>
        </div>
        <div class="alert-panel ug-report-msg-div" ng-show="successMessagebool">
            <div class="alert-message">
                {{successMessage}}                
                <button class="md-button md-primoExplore-theme md-ink-ripple" type="button" ng-click="$ctrl.ok()"><span>DISMISS</span><div class="md-ripple-container"></div></button>
            </div>
        </div>          
      <div ng-if="$ctrl.showRPForm" class="send-actions-content-item report-problem-form-wrapper ug-report-issue-form-wrapper" layout="row">
            <md-content layout-wrap layout-padding layout-fill>
              <form name="$ctrl.reportForm" novalidate layout="column" layout-align="center center" (submit)="$ctrl.submitReport();">
                <div layout="row" class="layout-full-width" layout-align="center center">
                  <div flex="10" flex-sm="5" hide-xs></div>
                  <div class="form-focus service-form ug-report-issue-in-form-div" layout-padding flex>
                    <div layout-margin>
                      <div layout="column">
                        <h4 class="md-subhead">Report an Issue</h4>                                                             
                        <md-input-container id="ug-desc-container" ng-if="$ctrl.requireDesc" class="ug-report-input-container md-required underlined-input md-input-focused">
                        <label>What is the issue? Please describe in detail:</label>
                        <textarea ng-model="$ctrl.description" name="description" id="ugdescription" rows="3" ng-minlength="3"  /></textarea>                        
                      </md-input-container>
                        <md-input-container id="ug-desc-container" ng-if="!$ctrl.requireDesc" class="ug-report-input-container md-required underlined-input md-input-focused">
                        <label>What is the issue? Please describe in detail:</label>
                        <textarea ng-model="$ctrl.description" name="description" id="ugdescription" rows="3" required/></textarea>
                        <!--
                        ngMessages module doesn't seem to be fully supported within PrimoVE
                        so doing a workaround 
                        <div ng-messages="reportForm.description.$error" role="alert" ng-show="reportForm.description.$invalid && reportForm.description.$dirty">
                        -->
                        <div ng-messages="reportForm.description.$error" role="alert" aria-atomic="true">
                          <div ng-message-default>please enter your issue and describe in detail</div>
                          <br/>
                        </div>
                      </md-input-container>
                      <md-input-container class="ug-report-input-container underlined-input">
                        <label>Do you want us to follow up with you? Please enter your email address:</label>
                        <input ng-model="$ctrl.email" name="email" id="ugemail" type="text">
                      </md-input-container>                      
                    </div>
                  </div>
                </div>
                <div flex="10" flex-sm="5" hide-xs></div>                
              </div>
              <div layout="row">
                <div layout="row" layout-align="center" layout-fill>
                  <md-button type="submit" class="button-with-icon button-large button-confirm" aria-label="Submit Report">
                    <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="send"></prm-icon>
                    <span translate="report"></span>
                  </md-button>
                </div>
              </div>
            </form>
          </md-content>
        </div>  
        `,
    });         
               
      app.component('prmSearchResultListAfter', {          
        bindings: {parentCtrl: `<`},
        controller: ['$location', '$httpParamSerializer', '$scope', '$http', '$sce', function ($location, $httpParamSerializer, $scope, $http, $sce) {  
            var _this = this;

            angular.element(document).ready(function () {                            
              //move the search button div, must wait since we're targeting an area that also
              //has a defined component - prmPersonalizeResultsButtonAfter if we use that component
              //I can't quite get the layout and UI correct
              
              setTimeout(function(){                                    
                insertReportAnIssueSearchResults();
              }, 1500);
            });

            this.$onInit = function () {                
              //default form as hidden
              this.showRPForm = false;
              //use requireDesc to track required fields / error msg
              this.requireDesc = true;
            };
            
            this.showReportForm = function () {
              //if showing form, set focus to description
              _this.showRPForm = !_this.showRPForm;                                          
              this.requireDesc = true;

              setTimeout(function(){                
                if (_this.showRPForm) {                        
                    var rp_div = document.querySelector('#ug-report-issue-div');
                    
                    //remove the form
                    rp_div.parentNode.removeChild(rp_div);                        

                    //place the form below the toolbar
                    var prm_results = document.querySelector("prm-personalize-results-button");
                    prm_results.parentNode.parentNode.parentNode.append(rp_div);    
                    
                    //set the focus
                    document.getElementById("ugdescription").focus();
                }
              }, 0);

              return _this.showRPForm;
            };            
            
            this.setStatusCode = function (code) {
                return _this.statusCode = code;
            };            
            
            this.submitReport = function () {
              //in submit
              if (_this.validate()) {                
                var params = {                                                          
                  'FROMOMNI': "True",
                  'email': _this.email,
                  'description': _this.description,
                  'full_URL': $location.absUrl(),
                  'URL_params': $location.search()
                };
                
                $http.post("https://app.lib.uoguelph.ca/omni/api/email-issue/", params).then(function (msg) {
                  _this.setStatusCode(200);
                  $scope.successMessage = "Thanks for the feedback. We’re on it!";
                  $scope.successMessagebool = true;                  
                }).catch(function (err) {                                                      
                  $scope.successMessage = "We're sorry, your message didn't send. Please try again.";
                  $scope.successMessagebool = true;
                  console.log("Gone into reportForm catch from email post");
                  _this.setStatusCode(500);
                  _this.showReportForm();                  
                }).finally(function () {                                    
                    console.log("report issue email statusCode: "+String(_this.statusCode));
                    
                    //reset notification
                    setTimeout(function() {
                      //reset after a certain amt of time                      
                      $scope.successMessagebool = false;
                      $scope.successMessage = "";
                    }, 3000);

                    //success - reset the form, clear vars
                    if (_this.statusCode == 200) {                    
                      _this.description = _this.email = '';
                      _this.reportForm.$setPristine();
                      _this.reportForm.$setUntouched();                    
                    }
                    _this.showReportForm();
                });
              }
            };

            //validation for the report form is something must be entered in the description
            this.validate = function () {                              
              var result = false;              
              try {
                if (this.description.length > 0) {
                  result = true;
                  this.requireDesc = true;                                    
                }  
                else {                  
                  this.requireDesc = false;                  
                }
              } catch (error) {
                this.requireDesc = false;
              }
              return result;
            };
        }],                                                 
        template: `                  
        <div id="ug-report-issue-search-button-div" class="ug-display-none ug-search-report-bar layout-align-center-center layout-row margin-top-medium" layout="row" layout-align="center center">            
            <button class="ug-report-button-full-display button-as-link button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme md-ink-ripple" type="button" aria-label="Report an Issue" ng-click="$ctrl.showReportForm()">
            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>
            <span>Report an Issue</span>
            </button>
        </div>
            <div id="ug-report-msg-id" class="alert-panel ug-report-msg-div ug-report-msg-div-search" ng-show="successMessagebool">
              <div class="alert-message">
                  {{successMessage}}
                  <button class="md-button md-primoExplore-theme md-ink-ripple" type="button" ng-click="$ctrl.ok()"><span>DISMISS</span><div class="md-ripple-container"></div></button>
              </div>
            </div>                    
            <div id="ug-report-issue-div" ng-if="$ctrl.showRPForm" class="send-actions-content-item report-problem-form-wrapper ug-report-issue-form-wrapper" layout="row">
              <md-content layout-wrap layout-padding layout-fill>
                <form name="$ctrl.reportForm" novalidate layout="column" layout-align="center center" (submit)="$ctrl.submitReport();">
                  <div layout="row" class="layout-full-width" layout-align="center center">
                    <div flex="10" flex-sm="5" hide-xs></div>
                    <div class="form-focus service-form ug-report-issue-in-form-div" layout-padding flex>
                      <div layout-margin>
                        <div layout="column">
                          <h4 class="md-subhead">Report an Issue</h4>
                          <md-input-container id="ug-desc-container" ng-if="$ctrl.requireDesc" class="ug-report-input-container md-required underlined-input md-input-focused">
                          <label>What is the issue? Please describe in detail:</label>
                          <textarea ng-model="$ctrl.description" name="description" id="ugdescription" rows="3" ng-minlength="3"  /></textarea>                        
                        </md-input-container>
                          <md-input-container id="ug-desc-container" ng-if="!$ctrl.requireDesc" class="ug-report-input-container md-required underlined-input md-input-focused">
                          <label>What is the issue? Please describe in detail:</label>
                          <textarea ng-model="$ctrl.description" name="description" id="ugdescription" rows="3" required/></textarea>
                          <!--
                          ngMessages module doesn't seem to be fully supported within PrimoVE
                          so doing a workaround 
                          <div ng-messages="reportForm.description.$error" role="alert" ng-show="reportForm.description.$invalid && reportForm.description.$dirty">
                          -->
                          <div ng-messages="reportForm.description.$error" role="alert" aria-atomic="true">
                            <div ng-message-default>please enter your issue and describe in detail</div>
                            <br/>
                          </div>
                        </md-input-container>
                        <md-input-container class="ug-report-input-container underlined-input">
                          <label>Do you want us to follow up with you? Please enter your email address:</label>
                          <input ng-model="$ctrl.email" name="email" id="ugemail" type="text">
                        </md-input-container>                      
                      </div>
                    </div>
                  </div>
                  <div flex="10" flex-sm="5" hide-xs></div>                  
                </div>
                  <div layout="row">
                    <div layout="row" layout-align="center" layout-fill>
                      <md-button type="submit" class="button-with-icon button-large button-confirm" aria-label="Submit Report">
                        <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="send"></prm-icon>
                        <span translate="report"></span>
                      </md-button>
                    </div>
                  </div>
                </form>
              </md-content>
            </div>  
        `,
    });        

    app.component('prmBackToLibrarySearchButtonAfter', {
      bindings: {parentCtrl: '<'},
      controller: '',
      template: '\
      <div role="alert" aria-live="assertive" layout-align="center center" class="layout-align-center-center">\
        <div layout="row" class="bar alert-bar layout-align-center-center layout-row" layout-align="center center">\
          <span class="bar-text">Curbside pickup and home delivery of books are available. Please note that all items returned to the library are quarantined for 72 hours. The processing of some items may be delayed. <a class="md-primoExplore-theme" title="Learn more about how to request items" href="https://www.lib.uoguelph.ca/using-library/2019-novel-coronavirus-information/phased-reopening-library-services/" >Learn more about how to request items</a>.</span>\
        </div>\
      </div>\
      '
    });

    /**********END OF UG REPORT AN ISSUE ***************/
    
  /************* LibraryH3lp code STARTS here **********/
  
  /* need to import some monitoring code */
  var x = document.createElement("script"); x.type = "text/javascript"; x.async = true;
  x.src = (document.location.protocol === "https:" ? "https://" : "http://") + "ca.libraryh3lp.com/js/libraryh3lp.js?514";
  var y = document.getElementsByTagName("script")[0]; y.parentNode.insertBefore(x, y);

  var askus = document.createElement('div');
  askus.id = 'askus-popout';
  askus.setAttribute('data-askus-popout-state', 'collapsed'); 
  askus.innerHTML = '<a class="tab-head" href="javascript:void()" ><img src="custom/01OCUL_GUE-GUELPH/img/speech-bubble_white-fill-small.png" alt="">Chat with us</a> \
  <div class="askus_tab"> \
  <!--<h2 class="askus_centre">Chat With Us</h2>--><!--Chat Button BEGIN--> \
      <div class="needs-js">chat loading...</div> \
      <!--Guelph --><!--Chat Button END--><!--<p><a href="https://www.lib.uoguelph.ca/ask-us/comments/"><img alt="Chat Offline" class="center" src="custom/01OCUL_GUE-GUELPH/img/guelph_offline.gif" /></a></p>--> \
      <ul> \
          <li>Click the image above to chat with us</li> \
          <li>Ask Chat is a <a href="http://vr.scholarsportal.info/ask/">collaborative service</a></li> \
          <li><a href="https://www.lib.uoguelph.ca/service-hours">Ask Us Online Chat hours</a></li> \
          <li><a href="https://www.lib.uoguelph.ca/contact-us">Contact Us</a></li> \
      </ul> \
  </div>';    
  document.body.appendChild(askus);

  ///register the onclick for chat
  var askus_popout = document.querySelector('#askus-popout');

  var askus_onclick_att = document.createAttribute("onclick");
  askus_onclick_att.value = "askus_popout_toggle();"; 
  askus_popout.setAttributeNode(askus_onclick_att);
  /************* LibraryH3lp code ends here **********/

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

})();
