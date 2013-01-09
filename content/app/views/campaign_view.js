var View = require('./view');
var template = require('./templates/campaign');

module.exports = View.extend({
	id: 'campaign-view',
	template: template,
	events: {
		"tap #challenges_banner":"campaignChallenges",
		"tap #faq_banner":"campaignFaqBrowser",
		"tap #gallery_banner":"campaignGalleryBrowser",
		"tap #howto_banner":"campaignHowto",
		"tap #prizes_banner":"campaignPrizesBrowser",
		"tap #resources_banner":"campaignResourceBrowser"
	},

	render: function() {
		this.$el.html(this.template(this.item));
		this.enableScroll();
		return this;
	},

	enableScroll:function(){
		setTimeout(function(){
			var wrapperCampaign = new iScroll('wrapperCampaign',{useTransition:true,hScroll:false});
		},500);
	},

	campaignChallenges:function() {		
		Application.accordianView.item = this.item['challenges'];  
		Application.accordianView.header = "Actions";
    Application.router.navigate("#accordian", {trigger: true});
	},
	
	campaignHowto:function() {	
		Application.accordianView.item = this.item['how-to'];  
		Application.accordianView.header = "How To";
    Application.router.navigate("#accordian", {trigger: true}); 
	},

	campaignFaqBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", this.item['faq-ios'].url);
	},
	campaignGalleryBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", this.item.gallery.feed);
	},
	campaignPrizesBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", this.item['faq-ios'].url);	
	},
	campaignResourceBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
	}

});
