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
            var googleAnalytics = window.plugins.googleAnalyticsPlugin;
      googleAnalytics.startTrackerWithAccountID("UA-34876259-1"); 


    }catch(e){

      alert(e.message);  
    }

        
        

        push = window.pushNotification

        // Reset Badge on resume
        document.addEventListener("resume", function() {
            push.resetBadge()
        })
    
        push.getIncoming(function (incoming) {

          if(incoming.message) {
            console.log("In INCOMING function")
            navigator.notification.alert(incoming.message, function () {}, "Incoming Message", "OK")
          } else {
            console.log("No incoming message")
          }
        })

        function on_push(data) {
          navigator.notification.alert(
          data.message,
          function () {}, "Hello from Urban Airship!", "OK")
        }

        function on_reg(error, pushID) {
          if (!error) {
            console.log("Reg Success: " + pushID)
            $('#id').text(pushID)
          }
        }

        push.registerEvent('registration', on_reg)

        push.registerEvent('push', on_push)
});
	
  application.initialize();
  Backbone.history.start();
});
