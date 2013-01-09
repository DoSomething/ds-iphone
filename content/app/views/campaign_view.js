var View = require('./view');
var template = require('./templates/campaign');

module.exports = View.extend({
	id: 'campaign-view',
	template: template,
	events: {
		"tap #challenges_banner":"campaignChallengesBanner",
		"tap #faq_banner":"campaignFaqBrowser",
		"tap #gallery_banner":"campaignGalleryBrowser",
		"tap #howto_banner":"campaignHowtoBrowser",
		"tap #prizes_banner":"campaignPrizesBrowser",
		"tap #resources_banner":"campaignResourceBrowser"
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

	campaignChallengesBanner:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
	},

	campaignFaqBrowser:function(){	
//		alert(this.item.faq_ios.url);
		cordova.exec("ChildBrowserCommand.showWebPage", this.item.faq_ios.url);

	},
	campaignGalleryBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
	},
	campaignHowtoBrowser:function(){	
			$('.question_wrapper').click(function(){
				$(this).next().toggle();
				$('.item_arrow',this).toggleClass('item_arrow_active');
			});
	},
	campaignPrizesBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", this.item.faq_ios.url);	
	},
	campaignResourceBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
	}

});
