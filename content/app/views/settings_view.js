var View = require('./view');
var template = require('./templates/settings');

module.exports = View.extend({
  id: 'settings-view',
  template: template,
  events: {
	
	
	},
   
  initialize: function() {  

	
  },

  render: function() {	
  	//disable taps on tab again
  	//$('#gallery_tab').unbind();
		this.$el.html(this.template(this.getRenderData()));
		this.afterRender();
  	return this;
  },

  afterRender: function() {
	
	
	}

});
