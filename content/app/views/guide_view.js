var View = require('./view');
var template = require('./templates/guide');

module.exports = View.extend({
  id: 'guide-view',
  template: template,

   
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
