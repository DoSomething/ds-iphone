var ProfileItem = require('./profileItem');

module.exports = Backbone.Collection.extend({

  model: ProfileItem,

  initialize: function() {
    this.reset();

    // Populate with saved data from LocalStorage if any
    var savedSerializedData = window.localStorage.getItem('profile');
    if (savedSerializedData) {
      var deserialized = JSON.parse(savedSerializedData);
      this.add(deserialized);
    }
  },

  comparator: function(item) {
    return item.get('gid');
  },

  saveToLocalStorage: function() {
    var serialized = JSON.stringify(this.toJSON());
    window.localStorage.setItem('profile', serialized);
  },


});