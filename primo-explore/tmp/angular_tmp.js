//maybe use this Primo space for push to
app.component('prmActionContainerAfter', {
    bindings: {parentCtrl: `<`},
    controller: ['$scope', '$http', '$sce', function ($scope, $http, $sce) {  
        
        alert("action list...");    
        angular.element(document).ready(function () {
            document.getElementById('msg').innerHTML = 'Hello';
        });
    }],    
    template: '<span md-theme="primary" class="prm-primary-bg"><div class="ug-search-eg">action list after</div></span>'
});    

//just some test code for perhaps the push to testcode
angular.element(window.document.body).ready(function ($document) {
    // 
    //el.style.display = 'none';
    //this doesn't seem to trigger on load, it's after?
    //var el_list = document.querySelectorAll('span[translate$="expandresults"]');
    //el_list[0].parentElement.parentElement.parentElement.style.display = 'none';        

    alert("hello");
});

// add in our search term eg
app.component('prmSearchBookmarkFilterAfter',{                  
    //controller: 'prmSearchBookmarkFilterAfterController',
    controller: ['$scope', '$http', '$sce', function ($scope, $http, $sce) {             
        $scope.off_campus = false;            
        $scope.off_campus_url = "";            
        $scope.off_campus_text = "Off Campus Sign Off";

        $http.jsonp("https://app.lib.uoguelph.ca/api/get-ip/",{jsonpCallbackParam: "callback"}).then(function onSuccess(data) {  
            var ip = data.data.ip;                                                                              
            if (
            ((ip.substr(0, 7) == '131.104') &&
                !( // exclude VPN IPs
                    (ip.substr(8,2) == '4.') ||
                    (ip.substr(8,2) == '5.') ||
                    (ip.substr(8,2) == '6.') ||
                    (ip.substr(8,2) == '7.')
                )
            ) || 
            (ip.substr(0, 12) == '209.87.235.1') || // alfred
            (ip.substr(0, 14) == '206.172.38.252') || // ridgetown
            // GH wireless range 64.201.162.67
            (ip.substr(0, 14) == '64.201.162.67') ||
            (ip.substr(0, 14) == '64.201.162.68') ||
            (ip.substr(0, 14) == '64.201.162.69') ||
            (ip.substr(0, 14) == '64.201.162.70') ||
            (ip.substr(0, 14) == '64.201.162.71') ||
            (ip.substr(0, 3) == '10.') // on campus wireless
                    ) {                                        
                //we are on campus
                $scope.off_campus = false;
            }
 
            if ( (ip.substr(0, 14) == '131.104.62.40') ||
                (ip.substr(0, 14) == '131.104.62.35') ||
                (ip.substr(0, 14) == '131.104.62.36') ||
                (ip.substr(0, 14) == '131.104.60.140') ||
                (ip.substr(0, 14) == '131.104.61.131') ||
                (ip.substr(0, 4) == '10.7') || // wireless exception
                (ip.substr(0, 6) == '10.131') || // new VPN IP exclude as of June 19th 2018                                   
                (ip.substr(0, 14) == '131.104.62.54') ) {
                //handle ITS exceptions                    
                // we're off campus
                $scope.off_campus = true;
            }                

            var loggedin = false;
    
            if (location.host.indexOf('subzero.lib.uoguelph.ca') == -1) {
                loggedin = false;
            }
            else {                    
                loggedin = true;                    
            }
            
            // Now evaluate what we found out, and set the appropriate message to display in the page.
            // If the user is on an authorized network, we'll display nothing.                
            if ((!$scope.off_campus) && (!loggedin)) {
                //proxytag for primo
                $scope.off_campus_url = 'https://subzero.lib.uoguelph.ca/login?url="'+window.location.href+'"';
                $scope.off_campus_text = "Off Campus Sign On";
            }		
            else if (loggedin) {
                //primo signout                                        
                $scope.off_campus_url = 'https://auth.lib.uoguelph.ca/Shibboleth.sso/Logout';
                $scope.off_campus_text = "Off Campus Sign Off";
            }
                          
        }).
        catch(function onError(err) {                
            console.log('api error: ' + err);                
        });        
    }],        
    template: `                    
            <div ng-if="off_campus">
            <a class="button-over-dark md-button md-primoExplore-theme md-ink-ripple" id="off-campus-button" aria-label="{{off_campus_text}}" href="{{off_campus_url}}">\
                                    <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="sign-in"><md-icon md-svg-icon="primo-ui:sign-in" alt="" class="md-primoExplore-theme" aria-hidden="true"><svg id="sign-in_cache18" width="100%" height="100%" viewBox="0 0 24 24" y="192" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">\
                                    </svg></md-icon><prm-icon-after parent-ctrl="$ctrl"></prm-icon-after></prm-icon>{{off_campus_text}}</a>
            </div>                                    
        `
    //some template logic gating
    //<div *ngIf="isValid;then content else other_content"></div>
    //<ng-template #content>content here...</ng-template>
    //<ng-template #other_content>other content here...</ng-template>         

    //'<div ng-bind-html="button"></div>'        
    //'<a class="button-over-dark md-button md-primoExplore-theme md-ink-ripple" id="off-campus-button" aria-label="Off Campus Sign On" href="/primo-explore/favorites?vid=GUELPH&amp;lang=en_US&amp;section=search_history">\
    //<prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="sign-in"><md-icon md-svg-icon="primo-ui:sign-in" alt="" class="md-primoExplore-theme" aria-hidden="true"><svg id="sign-in_cache18" width="100%" height="100%" viewBox="0 0 24 24" y="192" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">\
    //</svg></md-icon><prm-icon-after parent-ctrl="$ctrl"></prm-icon-after></prm-icon>Off Campus Sign On</a>'
});    

app.controller('prmSearchBookmarkFilterAfterController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) { 
    console.log('in ip controller');                
    $http.jsonp("https://app.lib.uoguelph.ca/api/get-ip/",{jsonpCallbackParam: "callback"}).then(function onSuccess(data) {
        $scope.greeting = data.data.ip;
        console.log('api success: ' + data.data.ip);                    

         //create the new src
         var feed_src = 'tmp text';

         $scope.greeting = $sce.trustAsHtml(feed_src);
    }).
    catch(function onError(err) {
        alert('in ip error catch');  
        console.log('api error: ' + err);
      $scope.data = "Request failed";
    });        
}]);

app.component('prmActionListAfter', {
    bindings: {parentCtrl: `<`},
    template: '<span md-theme="primary" class="prm-primary-bg"><div class="ug-search-eg">action list after</div></span>'
});    

// try the feed burner logic
    //template: '<script src="https://feeds.feedburner.com/UofGuelph/Library?format=sigpro" type="text/javascript"></script>'
    // add in our search term eg
    app.component('ugFeedBurner', {
        bindings: {parentCtrl: `<`},
        controller: 'ugFeedBurnerController',
        template: 'matt tests'
    });    

    app.controller('ugFeedBurnerController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) { 
        console.log('in controller');                
        $http.jsonp("https://app.lib.uoguelph.ca/api/get-ip/?callback=?").then(function onSuccess(data) {
            $scope.greeting = data.data.events;
            console.log('api success: ' + data.data.info);                    

             //create the new src
             var feed_src = 'tmp text';

             $scope.greeting = $sce.trustAsHtml(feed_src);
        }).
        catch(function onError(err) {
            console.log('api error: ' + err);
          $scope.data = "Request failed";
        });        
    }]);

    //just some test code for perhaps the push to testcode
    angular.element(window.document.body).ready(function ($document) {
        // create an injector
        var $injector = angular.injector(['ng']);

        //select the div for action list
       // var action_list = $document[0].div;
        console.log('action list: ' + $document);      

        // create a li element for inserting in action_list
        var newEl = document.createElement('li');
        // use the innerHTML property for inserting HTML content
        // or append a textNode to the p element
        newEl.appendChild(document.createTextNode('Hello World!'));

        // append p as a new child to el
        //action_list.appendChild(newEl);

        // Your function that runs after all DOM is loaded
        alert ("helllloooo");
    });

    template: `                                    
                <div ng-if="off_campus">
                <a class="button-over-dark md-button md-primoExplore-theme md-ink-ripple" id="off-campus-button" aria-label="{{off_campus_text}}" href="{{off_campus_url}}">\
                                        <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="sign-in"><md-icon md-svg-icon="primo-ui:sign-in" alt="" class="md-primoExplore-theme" aria-hidden="true"><svg id="sign-in_cache18" width="100%" height="100%" viewBox="0 0 24 24" y="192" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">\
                                        </svg></md-icon><prm-icon-after parent-ctrl="$ctrl"></prm-icon-after></prm-icon>{{off_campus_text}}</a>
                </div>                                    
            `    

// add in our search term eg
app.component('prmSearchBookmarkFilterAfter',{                  
    //controller: 'prmSearchBookmarkFilterAfterController',
    controller: ['$scope', '$http', '$sce', function ($scope, $http, $sce) {             
        $scope.off_campus = false;            
        $scope.off_campus_url = "";            
        $scope.off_campus_text = "Off Campus Sign Off";

        $http.jsonp("https://app.lib.uoguelph.ca/api/get-ip/",{jsonpCallbackParam: "callback"}).then(function onSuccess(data) {  
            var ip = data.data.ip;                                                                              
            if (
            ((ip.substr(0, 7) == '131.104') &&
                !( // exclude VPN IPs
                    (ip.substr(8,2) == '4.') ||
                    (ip.substr(8,2) == '5.') ||
                    (ip.substr(8,2) == '6.') ||
                    (ip.substr(8,2) == '7.')
                )
            ) || 
            (ip.substr(0, 12) == '209.87.235.1') || // alfred
            (ip.substr(0, 14) == '206.172.38.252') || // ridgetown
            // GH wireless range 64.201.162.67
            (ip.substr(0, 14) == '64.201.162.67') ||
            (ip.substr(0, 14) == '64.201.162.68') ||
            (ip.substr(0, 14) == '64.201.162.69') ||
            (ip.substr(0, 14) == '64.201.162.70') ||
            (ip.substr(0, 14) == '64.201.162.71') ||
            (ip.substr(0, 3) == '10.') // on campus wireless
                    ) {                                        
                //we are on campus
                $scope.off_campus = false;
            }
 
            if ( (ip.substr(0, 14) == '131.104.62.40') ||
                (ip.substr(0, 14) == '131.104.62.35') ||
                (ip.substr(0, 14) == '131.104.62.36') ||
                (ip.substr(0, 14) == '131.104.60.140') ||
                (ip.substr(0, 14) == '131.104.61.131') ||
                (ip.substr(0, 4) == '10.7') || // wireless exception
                (ip.substr(0, 6) == '10.131') || // new VPN IP exclude as of June 19th 2018                                                       
                (ip.substr(0, 14) == '131.104.62.54') ) {
                //handle ITS exceptions                    
                // we're off campus
                $scope.off_campus = true;
            }                

            var loggedin = false;
    
            if (location.host.indexOf('subzero.lib.uoguelph.ca') == -1) {
                loggedin = false;
            }
            else {                    
                loggedin = true;                    
            }
            
            // Now evaluate what we found out, and set the appropriate message to display in the page.
            // If the user is on an authorized network, we'll display nothing.                
            if ((!$scope.off_campus) && (!loggedin)) {
                //proxytag for primo
                $scope.off_campus_url = 'https://subzero.lib.uoguelph.ca/login?url='+window.location.href;
                $scope.off_campus_text = "Library Off Campus Access Sign On";
            }		
            else if (loggedin) {
                //primo signout                                        
                $scope.off_campus_url = 'https://auth.lib.uoguelph.ca/Shibboleth.sso/Logout';
                $scope.off_campus_text = "Sign Off for Library Off Campus Access";
            }            
            
            //on campus...show nothing
            if (!$scope.off_campus) {
                $scope.off_campus_text = "";
                
            }
            $scope.off_campus = true;          
        }).
        catch(function onError(err) {                
            console.log('api error: ' + err);                
        });     
        
        /* This is what the template would be for off campus button
            <div ng-if="off_campus">
            <a class="button-over-dark md-button md-primoExplore-theme md-ink-ripple" id="off-campus-button" aria-label="{{off_campus_text}}" href="{{off_campus_url}}">\
                                    <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="sign-in"><md-icon md-svg-icon="primo-ui:sign-in" alt="" class="md-primoExplore-theme" aria-hidden="true"><svg id="sign-in_cache18" width="100%" height="100%" viewBox="0 0 24 24" y="192" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">\
                                    </svg></md-icon><prm-icon-after parent-ctrl="$ctrl"></prm-icon-after></prm-icon>{{off_campus_text}}</a>
            </div>        
        */
    }],        
    template: ``       
});      

///search on is clicked
// aria-label="Show actions options for this item" 

// document selector via for-
document.querySelector('label[for="prm_mypref.label.my_email"]').parentNode;
document.querySelector('label[for="prm_mypref.label.my_email"]').nextElementSibling;
document.querySelector('label[for="prm_mypref.label.my_email"]').nextElementSibling.value;
"mvanast@uoguelph.ca"


('md-checkbox[aria-label="Add results beyond U of G\'s collection"]')

document.querySelector('input[name="prm_mypref.label.my_email"]').val();

document.querySelector('span[translate="request.holds.request_date"]').parentNode.innerText
document.querySelector('h3[ng-if="::request.firstLineLeft"] > span').value

document.querySelector('h3[ng-if="::request.firstLineLeft"] > span[value="Hamlet"]').parentNode
document.querySelector('h3[ng-if="::request.firstLineLeft"] > span[contains(., "Hamlet")]').parentNode
document.querySelector('h3[ng-if="::request.firstLineLeft"] > span[text()="Hamlet"]').parentNode

document.evaluate("//h1[contains(., 'Hello')]", document, null, XPathResult.ANY_TYPE, null );

//testing insert of request date
var headings = document.evaluate("//span[contains(., 'Hamlet')]", document, null, XPathResult.ANY_TYPE, null );
var this_heading = headings.iterateNext();
var request_div = this_heading.parentNode.parentNode;
var pick_up_p = this_heading.parentNode.parentNode.querySelector('p:last-child');

//Create an attribute to place on the p tag
var att = document.createAttribute("class");       // Create a "class" attribute
att.value = "weak-text";                           // Set the value of the class attribute

//insert request date before pickup
var req_date_span = document.createElement('span');
req_date_span.innerText = "Request Date: 02/02/2020";

var req_date_p = document.createElement('p');
req_date_p.setAttributeNode(att);
req_date_p.append(req_date_span);

request_div.insertBefore(req_date_p, pick_up_p);


var content_div = this_heading.parentNode.parentNode;


span[text()="Hamlet"]

div[contains(., 'Hello')]

Hamlet /

translate="request.holds.request_date"

<div role="alert" aria-live="assertive" layout-align="center center" class="layout-align-center-center">
    <div layout="row" class="bar alert-bar layout-align-center-center layout-row" layout-align="center center">
        <span class="bar-text">Curbside pick-up and mail delivery of items in U of G Library's physical collection are now available. <a class="md-primoExplore-theme" title="Learn more about how to request items" href="https://www.lib.uoguelph.ca/using-library/2019-novel-coronavirus-information/phased-reopening-library-services" >Learn more about how to request items</a>.</span>
    </div>
</div>

The TUG libraries have been collaborating for nearly thirty years. This website provides information on TUG' history, principles, policies, and its key resource, the Annex.

https://ocul-gue-psb.alma.exlibrisgroup.com/mng/login