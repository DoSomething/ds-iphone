// Application bootstrapper.
Application = {

	initialize: function() {
		
		if ( window.localStorage.getItem("launchCount") == null){
			window.localStorage.setItem("launchCount","1");
		}
		
		if ( window.localStorage.getItem("user_logged_in") == null){
			window.localStorage.setItem("user_logged_in","false");
		}

		var LoginView = require('views/login_view');
		var InvolvedView = require('views/involved_view');
		var SettingsView = require('views/settings_view');
		var ProfileView = require("views/profile_view");
		var ProfileAnonymousView = require("views/profile_anonymous_view");
		var CampaignView = require("views/campaign_view");
		var SessionView = require("views/session_view");
		var Router = require('lib/router');  


    this.loginView = new LoginView();
    this.involvedView = new InvolvedView();
    this.settingsView = new SettingsView();
    this.profileView = new ProfileView();
    this.profileAnonymousView = new ProfileAnonymousView();
    this.campaignView = new CampaignView();
    this.sessionView = new SessionView();
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

	}
}

module.exports = Application;




