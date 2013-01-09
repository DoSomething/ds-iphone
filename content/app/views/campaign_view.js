var View = require('./view');
var template = require('./templates/campaign');

module.exports = View.extend({
	id: 'campaign-view',
	template: template,
	events: {
		"tap #challenges_banner":"campaignChallenges",
		"tap #faq_banner":"campaignFaqBrowser",
		"tap #gallery_banner":"campaignGallery",
		"tap #howto_banner":"campaignHowto",
		"tap #prizes_banner":"campaignPrizesBrowser",
		"tap #resources_banner":"campaignResources"
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
		Application.actionsView.item = this.item;  
    Application.router.navigate("#actions", {trigger: true});
	},
	
	campaignHowto:function() {	
		Application.howToView.item = this.item;  
    Application.router.navigate("#howto", {trigger: true}); 
	},

	campaignFaqBrowser:function(){	
		cordova.exec("ChildBrowserCommand.showWebPage", this.item['faq-ios'].url);
	},
	campaignGallery:function(){	
    Application.router.navigate("#gallery", {trigger: true});
	},
	campaignPrizesBrowser:function(){	
		//cordova.exec("ChildBrowserCommand.showWebPage", this.item['faq-ios'].url);	
	},
	campaignResources:function(){	
		Application.resourcesView.item = this.item;
    Application.router.navigate("#resources", {trigger: true}); 
	}

});
