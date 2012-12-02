var application = require('application');

module.exports = Backbone.Router.extend({
	routes: {
		'': 'involved',
		'settings':'settings',
		'involved':'involved',
		'profile':'profile',
		'campaign':'campaign',
		'session':'session'
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


	},
	login:function() {
	  this.changePage(Application.loginView);
	},
	involved:function(){
  	this.changePage(Application.involvedView);
  	//Application.involvedView.enableScroll();
  },
	settings:function() {
	  this.changePage(Application.settingsView);
	},
	profile:function(){
		this.changePage(Application.profileView);
	  Application.profileView.enableScroll();
	},
	campaign:function(){
  	this.changePage(Application.campaignView);
  	//Application.campaignView.enableScroll();
  },
	session:function(){
		this.changePage(Application.sessionView);
		//Application.sessionView.authFb("#about");
	},
	changePage:function (page) {
		window.tapReady = false;
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
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
	}                                                            
});

