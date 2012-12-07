var View = require('./view');
var template = require('./templates/login');

module.exports = View.extend({
  id: 'login-view',
  template: template,
  events: {
    "tap #register_button" : "goRegister",
  },

  render: function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  },

  goRegister: function(e) {
    Application.router.navigate('#login_register', {trigger: true});
  }

});
