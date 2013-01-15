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
		"tap #resources_banner":"campaignResources",
		"tap #signup":"signup",
		"tap #reportback":"reportback"
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

  signup:function() {	
//passwhatever variable the server needs
    Application.router.navigate("#campaign_register", {trigger: true}); 
  },

  reportback:function() {	
		filepicker.pickAndStore({
			mimetype: ['image/*'],
			location: ['S3'],
			container: 'window',
			services:['COMPUTER', 'INSTAGRAM', 'FACEBOOK', 'GOOGLE_DRIVE', 'GMAIL']
		},
		function(FPFile){
			console.log(JSON.stringify(FPFile));
			var photo_filename = FPFile.filename;
			var photo_url = FPFile.url;
		},
		function(FPError){
			console.log(FPError.toString());
		}
	);
  },

  campaignHowto:function() {	
    Application.howToView.item = this.item;  
    Application.router.navigate("#howto", {trigger: true}); 
  },

  campaignFaqBrowser:function(e) {
    window.plugins.childBrowser.showWebPage(this.item['faq-ios'].url);
  },

  campaignGallery:function() {
    Application.galleryView.item = this.item;
    Application.router.navigate("#gallery", {trigger: true});
  },

  campaignPrizesBrowser:function(e) {
    window.plugins.childBrowser.showWebPage(this.item['prizes'].url);
  },
  
  campaignResources:function(e) {	
    Application.resourcesView.item = this.item;
    Application.router.navigate("#resources", {trigger: true});
  }

});
