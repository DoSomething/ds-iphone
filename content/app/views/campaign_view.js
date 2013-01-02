var View = require('./view');
var template = require('./templates/campaign');

module.exports = View.extend({
  id: 'campaign-view',
  template: template,
  events: {
	//	"tap #challenges_banner":"campaignChallengesBanner",
		"tap #faq_banner":"campaignFaqBrowser",
	//	"tap #gallery_banner":"campaignGalleryBrowser",
	//	"tap #howto_banner":"campaignHowtoBrowser",
		"tap #prizes_banner":"campaignPrizesBrowser"
	//	"tap #resources_banner":"campaignResourceBrowser"
	},
   
  initialize: function() {
        

	
  },

  render: function() {
		this.$el.html(this.template(this.item));
  	return this;
  },

  enableScroll:function(){
  	var scroll = new iScroll('wrapperCampaign');
  },
	
	campaignFaqBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
	},
	campaignPrizesBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
	}

});
