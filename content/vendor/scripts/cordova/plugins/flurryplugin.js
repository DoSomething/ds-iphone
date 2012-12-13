FlurryPlugin = function() {
    
};

FlurryPlugin.prototype.pageView = function() {
  cordova.exec(null, null, 'FlurryPlugin', 'logPageView',[]);
};

FlurryPlugin.prototype.logEvent = function(eventName) {
  cordova.exec(null, null, 'FlurryPlugin', 'logEvent', [{event: eventName}]);
};

FlurryPlugin.prototype.logEventTimed = function(eventName) {
  cordova.exec(null, null, 'FlurryPlugin', 'logEventTimed', [{event: eventName}]);
}

FlurryPlugin.prototype.logEventWithParameters = function(eventName, params) {
  cordova.exec(null, null, 'FlurryPlugin', 'logEventWithParameters', [{event: eventName, params: params}]);
};

FlurryPlugin.prototype.logEventWithParametersTimed = function(eventName, params) {
  cordova.exec(null, null, 'FlurryPlugin', 'logEventWithParameters', [{event: eventName, params: params}]);
};

FlurryPlugin.prototype.endTimedEventWithParameters = function(eventName, params) {
  cordova.exec(null, null, 'FlurryPlugin', 'endTimedEventWithParameters', [{event: eventName, params: params}]);
};

FlurryPlugin.prototype.logError = function(error, message) {
  cordova.exec(null, null, 'FlurryPlugin', 'logError', [{error: error, message: message}]);
}

FlurryPlugin.prototype.setAge = function(age) {
  cordova.exec(null, null, 'FlurryPlugin', 'setAge', [{age: age}]);
}

FlurryPlugin.prototype.setGender = function(gender) {
  cordova.exec(null, null, 'FlurryPlugin', 'setGender', [{gender: gender}]);
}

FlurryPlugin.prototype.setUserID = function(user_id) {
  cordova.exec(null, null, 'FlurryPlugin', 'setUserID', [{userid: user_id}]);
}

FlurryPlugin.prototype.setLocation = function(lat, lon, h_acc, v_acc) {
  cordova.exec(null, null, 'FlurryPlugin', 'setLocation', [{latitude: lat, longitude: lon, horizontal_acc: h_acc, vertical_acc: v_acc}]);
}

cordova.addConstructor(function() {

  /* shim to work in 1.5 and 1.6  */
  if (!window.Cordova) {
    window.Cordova = cordova;
  };

  if(!window.plugins)
    window.plugins = {};

  window.plugins.FlurryPlugin = new FlurryPlugin();
});