(function () {
    "use strict";

    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

    // add in boolean search and promote banner in template
    app.component('prmSearchBarAfter', {
        template: '<div layout="row"><div flex="0" flex-md="0" flex-lg="15" flex-xl="20"></div><div layout="row" class="wlu-search-eg"><small>e.g., king AND shakespeare NOT lear</small></div></div>\
        <div class="wlu-promote-banner">What do you think about the new search experience?</br><a href="https://wlu.ca1.qualtrics.com/jfe/form/SV_dgm2nJOrDOxDLlr"  target="_blank">Tell us and you could win a $50 gift card! <span class="sr-only">(open in new window)</span>&nbsp;<prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></a></div>'
    });


    // load checkSignOut function
    checkSignOut();

    // If the logout_clicked cookie exists with ture value, then destroy the cookie
    // and redirect the user to the libauth PDS logout page.
    function checkSignOut() {
      var rawCookies = document.cookie;
      if (rawCookies.match(/wlu_logout_clicked=true/)) {
        // delete cookie and redirect
        setCookie('wlu_logout_clicked', '');
        window.location = "https://libauth.wlu.ca/pds/logout.php";
        return false;
      }
     }

     // Find 'sign out' button, when user click sign out
    // Set the logout_clicked cookie;
    function signOut() {
      var el_signOut = document.querySelector('[aria-label="signOut"]');

      if ( el_signOut != null ) {
        if (el_signOut.addEventListener) {
          el_signOut.addEventListener("click", function(event) {
               event.preventDefault();
               setCookie('wlu_logout_clicked', 'true');
            });
        }
        else { //IE8 support
           el_signOut.attachEvent("onclick", function() {
           event.preventDefault();
           setCookie('wlu_logout_clicked', 'true')
          });
        }
      }
    }

    // Set a cookie
    function setCookie(c_name,value,exdays)
    {
    	var exdate=new Date();
    	exdate.setDate(exdate.getDate() + exdays);
    	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    	document.cookie=c_name + "=" + c_value + ';path=/';
    }

    // Timeout set to ensure all elements of page are present before running function
    setTimeout(function(){
       signOut();
    }, 500);
})();
