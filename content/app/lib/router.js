var application = require('application');

module.exports = Backbone.Router.extend({
	routes: {
		'': 'home',
		'settings':'settings',
		'involved':'involved',
		'profile':'profile',
		'campaign':'campaign',
		'session':'session',
    'login':'login',
    'login_register':'login_register',
    'quiz':'quiz',
	},
	initialize:function () {
    // Handle back button throughout the application
    $('.back_button').live('tap', function(e) {
    	e.preventDefault();
    	$.mobile.activePage.back = true;
    	window.history.back();

    });
    this.firstPage = true;

		$('body').append('<div id="footer"><div id="profile_tab" class="tab_wrapper"><div class="tab"></div><div class="tab_title">Profile</div></div><div id="getInvolved_tab" class="tab_wrapper tab_wrapper_active"><div class="tab"></div><div class="tab_title">Get Involved</div></div><div id="settings_tab" class="tab_wrapper"><div class="tab"></div><div class="tab_title">Settings</div></div></div>');
	  $('.tab_wrapper').removeClass('tab_active');
  	$('#getInvolved_tab').addClass('tab_active');

		if ( window.localStorage.getItem("launchCount") == "1"){
			//this.$el.append("");
			$('body').append("<div class='eduModal'><div id='edu-wrapper'></div>   </div>"); 
		}

 	},
  home:function () {
    this.quiz();
    return;
    // On initial load of the app, show intro/quiz screens
    if (window.localStorage.getItem('launchCount') == '1') {
      this.quiz();
      window.localStorage.setItem('launchCount', '2');
    }
    // Otherwise, go to campaigns screen
    else {
      this.involved();
    }
	},
	login:function() {
	  this.changePage(Application.loginView);
    Application.loginView.enableScroll();
	},
  login_register:function() {
    this.changePage(Application.loginRegisterView);
    Application.loginRegisterView.enableScroll();
  },
	involved:function() {
  	this.changePage(Application.involvedView);
  	//Application.involvedView.enableScroll();
  },
	settings:function() {
	  this.changePage(Application.settingsView);
	},
	profile:function() {
    if (window.localStorage.getItem('user_logged_in') == 'false') {
      this.changePage(Application.profileAnonymousView);
    }
    else {
  		this.changePage(Application.profileView);
  	  Application.profileView.enableScroll();
    }
	},
	campaign:function() {
  	this.changePage(Application.campaignView);
  	//Application.campaignView.enableScroll();
  },
	session:function() {
		this.changePage(Application.sessionView);
		//Application.sessionView.authFb("#about");
	},
  quiz: function() {
    this.changePage(Application.quizView);
    Application.deactivateTabs();
  },
	changePage:function (page) {
		window.tapReady = false;
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));

    if (page.afterAppend) {
      page.afterAppend();
    }

		var transition = $.mobile.defaultPageTransition;
		var bPage = $.mobile.activePage.back;
	  // We don't want to slide the first page
	  if (this.firstPage) {
	  	transition = 'fade';
	  	this.firstPage = false;
	  }
	  
	  $.mobile.changePage($(page.el), {changeHash:false, transition: bPage ? 'slide' : transition, reverse: bPage});
	  		  	  
	  $(document).delegate(page.el, 'pageshow', function () {
	  		window.tapReady = true;
		});

    if (window.plugins && window.plugins.FlurryPlugin) {
      window.plugins.FlurryPlugin.pageView();
    }
	}                                                            
});

