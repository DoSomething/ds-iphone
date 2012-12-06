var View = require('./view');
var template = require('./templates/profile_anonymous');

module.exports = View.extend({
  id: 'profile-anonymous-view',
  template: template,
  events: {
    "tap #btnProfileLoginRegister":"goLoginRegister",
    "tap #btnProfileGetInvolved":"goInvolved"
  },
   
  initialize: function() {  
  
  },

  render: function() {  
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  },

  enableScroll:function(){
    var scroll = new iScroll('wrapper2');
  },

  afterRender: function() {
  
  },

  goInvolved: function(e) {
    $('.tab_wrapper').removeClass('tab_wrapper_active');
    $('#getInvolved_tab').addClass('tab_wrapper_active');
    Application.router.navigate("#involved", {trigger: true});
  },

  goLoginRegister: function(e) {
    $('.tab_wrapper').removeClass('tab_wrapper_active');
    Application.router.navigate("#login_register" , {trigger: true});
  }

});
