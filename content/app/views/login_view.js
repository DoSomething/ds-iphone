var View = require('./view');
var template = require('./templates/login');

module.exports = View.extend({
  id: 'login-view',
  template: template,

  render: function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  },

});
