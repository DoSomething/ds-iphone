FlurryPlugin = function() {
    
};

FlurryPlugin.prototype.pageView = function() {
  cordova.exec(null,null,"FlurryPlugin","logPageView",[]);
};

FlurryPlugin.prototype.logEvent = function(eventName) {
  cordova.exec(null,null,"FlurryPlugin","logEvent",[{event: eventName}]);
};

FlurryPlugin.prototype.logEventWithParameters = function(eventName, params) {
  cordova.exec(null, null, 'FlurryPlugin', 'logEventWithParameters', [{event: eventName, params: params}]);
};

cordova.addConstructor(function() {

  /* shim to work in 1.5 and 1.6  */
  if (!window.Cordova) {
    window.Cordova = cordova;
  };

  if(!window.plugins)
    window.plugins = {};

  window.plugins.FlurryPlugin = new FlurryPlugin();
});