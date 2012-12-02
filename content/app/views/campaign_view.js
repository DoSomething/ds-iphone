var View = require('./view');
var template = require('./templates/campaign');

module.exports = View.extend({
  id: 'campaign-view',
  template: template,
  events: {
		"tap #campaignBanner":"campaignChildBrowser"
	
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
  	var scroll = new iScroll('wrapperCampaign');
  },

  afterRender: function() {
	
	
	},
	
  campaignChildBrowser:function(){
		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
	},

});
