var View = require('./view');
var template = require('./templates/profile');

module.exports = View.extend({
  id: 'profile-view',
  template: template,
  events: {
    'tap .campaign_item': 'openProfileItem',
  },
   
  initialize: function() {  

  },

  render: function() {
    this.$el.html(this.template(Application.profile));
    this.afterRender();
    return this;
  },

  enableScroll: function() {
    var scroll = new iScroll('wrapper2');
  },

  openProfileItem: function(e) {
    e.preventDefault();
    var gid = $(e.currentTarget).data('id');
    var modelIdx = 0;

    for (i = 0; i < Application.profile.models.length; i++) {
      if (Application.profile.models[i].id == gid) {
        modelIdx = i;
        break;
      }
    }

    Application.actionsView.item = Application.profile.models[modelIdx].attributes;
    Application.router.navigate('#actions', {trigger: true});
  },

});
