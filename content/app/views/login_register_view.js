var View = require('./view');
var template = require('./templates/loginRegister');

module.exports = View.extend({
  id: 'login-register-view',
  template: template,
  events: {
    'submit #registerForm': 'loginRegisterSubmit',
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

  loginRegisterSubmit: function(e) {
    
  }

});
