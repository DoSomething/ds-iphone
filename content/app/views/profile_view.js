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
  	//disable taps on tab again
  	//$('#gallery_tab').unbind();
		this.$el.html(this.template(this.getRenderData()));
		this.afterRender();
  	return this;
  },

  enableScroll:function(){
  	var scroll = new iScroll('wrapper2');
  },

  afterRender: function() {
	
	
	}

});
