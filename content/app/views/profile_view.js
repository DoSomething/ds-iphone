var View = require('./view');
var template = require('./templates/profile');

module.exports = View.extend({
  id: 'profile-view',
  template: template,
  events: {
  },
   
  initialize: function() {  

  },

  render: function() {
    this.$el.html(this.template(Application.profile));
    this.afterRender();
    return this;
  },

  enableScroll:function(){
    var scroll = new iScroll('wrapper2');
  },

  afterRender: function() {
  }

});
