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
		$(this.el).html(this.template(this.item));
  	return this;
  },

  enableScroll:function(){
  	var scroll = new iScroll('wrapperCampaign');
  },
	
  campaignChildBrowser:function(){
		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
	}

});
