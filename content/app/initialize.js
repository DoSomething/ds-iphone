var application = require('application');
window.tapReady = true; 
                               
$(function() {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
     // Remove page from DOM when it's being replaced
    $('div[data-role="page"]').live('pagehide', function (event, ui) {
        $(event.currentTarget).remove();
    });                                            
  
	 document.addEventListener("deviceready",  function() {
    try{


    }catch(e){

      alert(e.message);  
    }

        
});
	
  application.initialize();
  Backbone.history.start();
});
