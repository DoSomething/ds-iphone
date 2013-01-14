// Application bootstrapper.
Application = {

	initialize: function() {

		if ( window.localStorage.getItem('launchCount') == null){
			window.localStorage.setItem('launchCount','1');
		}
		
		if ( window.localStorage.getItem('user_logged_in') == null){
			window.localStorage.setItem('user_logged_in','false');
		}

		// General configurations to set on app initialization
		// Setting defaultHomeScroll to 0 as a workaround to the 1 px jitter on page transitions
		$.mobile.defaultHomeScroll = 0;

    // Models
    var Profile = require('models/profile');

    this.profile = new Profile();

    // Views
		var LoginView = require('views/login_view');
		var LoginRegisterView = require('views/login_register_view');
		var CampaignRegisterView = require('views/campaign_register_view');
		var InvolvedView = require('views/involved_view');
		var SettingsView = require('views/settings_view');
		var ProfileView = require('views/profile_view');
		var ProfileAnonymousView = require('views/profile_anonymous_view');
		var CampaignView = require('views/campaign_view');
		var SessionView = require('views/session_view');
		var QuizView = require('views/quiz_view');
		var ActionsView = require('views/actions_view');
		var HowToView = require('views/howto_view');
		var ResourcesView = require('views/resources_view');
		var GalleryView = require('views/gallery_view');
		var ImageView = require('views/image_view');
		var Router = require('lib/router');  

    this.baseURL = 'https://www.dosomething.org/';
    this.loginView = new LoginView();
    this.loginRegisterView = new LoginRegisterView();
    this.campaignRegisterView = new CampaignRegisterView();
    this.involvedView = new InvolvedView();
    this.settingsView = new SettingsView();
    this.profileView = new ProfileView();
    this.profileAnonymousView = new ProfileAnonymousView();
    this.campaignView = new CampaignView();
    this.sessionView = new SessionView();
    this.quizView = new QuizView();
    this.actionsView = new ActionsView();
    this.howToView = new HowToView();
    this.resourcesView = new ResourcesView();
    this.galleryView = new GalleryView();
    this.imageView = new ImageView();
    this.router = new Router();

    if (typeof Object.freeze === 'function') Object.freeze(this);  
		// Initializing BackStack.StackNavigator for the #container div
		
		var involvedTab = function() {
			if(window.tapReady){
				// window.tapReady = false;
				$('.tab_wrapper').removeClass('tab_wrapper_active');
				$('#getInvolved_tab').addClass('tab_wrapper_active');
				Application.router.navigate("#involved" , {trigger: true});
			}
			//activateTabs();
		}
		
		var profileTab = function() {
			if(window.tapReady){
				//window.tapReady = false; 
				$('.tab_wrapper').removeClass('tab_wrapper_active');
				$('#profile_tab').addClass('tab_wrapper_active');
				Application.router.navigate("#profile" , {trigger: true});
			}
			//activateTabs();
		}
		
		var settingsTab = function() {
			     //haltTabs();
			if(window.tapReady){
			 //window.tapReady = false;
				$('.tab_wrapper').removeClass('tab_wrapper_active');
				$('#settings_tab').addClass('tab_wrapper_active');
				Application.router.navigate("#settings" , {trigger: true});
			}
		}
    
		$('#getInvolved_tab').bind('tap', involvedTab);
		$('#profile_tab').bind('tap', profileTab);
		$('#settings_tab').bind('tap', settingsTab);

	},

	deactivateTabs: function() {
		$('.tab_wrapper').removeClass('tab_wrapper_active');
	},
}

module.exports = Application;




