(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  // Application bootstrapper.
  Application = {

  	initialize: function() {

  		if ( window.localStorage.getItem('launchCount') == null){
  			window.localStorage.setItem('launchCount','1');
  		}
  		
  		if ( window.localStorage.getItem('user_logged_in') == null){
  			window.localStorage.setItem('user_logged_in','false');
  		}

  		var LoginView = require('views/login_view');
  		var LoginRegisterView = require('views/login_register_view');
  		var InvolvedView = require('views/involved_view');
  		var SettingsView = require('views/settings_view');
  		var ProfileView = require('views/profile_view');
  		var ProfileAnonymousView = require('views/profile_anonymous_view');
  		var CampaignView = require('views/campaign_view');
  		var SessionView = require('views/session_view');
  		var QuizView = require('views/quiz_view');
  		var Router = require('lib/router');  

      this.baseURL = 'https://www.dosomething.org/';
      this.loginView = new LoginView();
      this.loginRegisterView = new LoginRegisterView();
      this.involvedView = new InvolvedView();
      this.settingsView = new SettingsView();
      this.profileView = new ProfileView();
      this.profileAnonymousView = new ProfileAnonymousView();
      this.campaignView = new CampaignView();
      this.sessionView = new SessionView();
      this.quizView = new QuizView();
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




  
}});

window.require.define({"initialize": function(exports, require, module) {
  var application = require('application');
  window.tapReady = true; 
                                 
  $(function() {
      $.mobile.ajaxEnabled = false;
      $.mobile.linkBindingEnabled = false;
      $.mobile.hashListeningEnabled = false;
      $.mobile.pushStateEnabled = false;
       // Remove page from DOM when it's being replaced
      $('div[data-role="page"]').live('pagehide', function (event, ui) {
          $(event.currentTarget).remove();
      });                                            
    
  	 document.addEventListener("deviceready",  function() {
      try{


      }catch(e){

        alert(e.message);  
      }

          
  });
  	
    application.initialize();
    Backbone.history.start();
  });
  
}});

window.require.define({"lib/router": function(exports, require, module) {
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
  	}                                                            
  });

  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  // Put your handlebars.js helpers here.
  
}});

window.require.define({"models/campaign": function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
     idAttribute:"campaign.gid"

    

  });
  
}});

window.require.define({"models/campaigns": function(exports, require, module) {
  var Campaign = require('./campaign');

  module.exports = Backbone.Collection.extend({
  	
  	model: Campaign,
  	url: 'http://apps.dosomething.org/m_app_api/?q=campaigns',
  	handle: function(){

  		return { "campaigns": this.toJSON() };

  	}

  });
  
}});

window.require.define({"models/collection": function(exports, require, module) {
  // Base class for all collections.
  module.exports = Backbone.Collection.extend({
    
  });
  
}});

window.require.define({"models/model": function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
    
  });
  
}});

window.require.define({"views/about_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/about');

  module.exports = View.extend({
    id: 'about-view',
    template: template,
    events: 		{"tap #faq_about":"faqChildBrowser"},

     
    initialize: function() {  
  	
  	 
  	
  	
  	
  	
  	
  	
    },

    render: function() {
    	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  	this.$el.html(this.template(this.getRenderData()));
  	this.afterRender();
    	return this;

    },
    faqChildBrowser:function(){
  		//alert('babyb');
  		

  	},
    enableScroll:function(){
    		var scroll = new iScroll('aboutScroll');
    },

    afterRender: function() {
  	
  	//this.enableScroll();
  	
  	}




  });
  
}});

window.require.define({"views/campaign_view": function(exports, require, module) {
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
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
    	return this;
    },

    enableScroll:function(){
    	var scroll = new iScroll('wrapperCampaign');
    },

    afterRender: function() {
  	
  	
  	},
  	
    campaignChildBrowser:function(){
  		cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
  	},

  });
  
}});

window.require.define({"views/guide_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/guide');

  module.exports = View.extend({
    id: 'guide-view',
    template: template,

     
    initialize: function() {  
  	
    },

    render: function() {
    	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
    	return this;

    },
    afterRender: function() {
  	
  	}

  });
  
}});

window.require.define({"views/involved_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/involved');
  var campaignView = require("views/campaign_view");
  var Campaigns = require('../models/campaigns');

  module.exports = View.extend({
    id: 'involved-view',
    template: template,
    events: {
  		"dataLoaded":"append",
  		"tap #campaign1":"openCampaign"
  	
  	},
     
    initialize: function() {  
  		this.campaignList = new Campaigns();
  		this.campaignList.campaignJSON = {};
  		
  		this.campaignList.fetch({
  			//processData:true,
  			add:true,
  			success:function(){
  		   Application.involvedView.$el.trigger("dataLoaded");
  			}
  		});
    },

    render: function() {	
  		this.$el.html(this.template(this.campaignList.campaignJSON));
  		this.afterRender();
    	return this;
    },

    enableScroll:function(){
    	var scroll = new iScroll('wrapper');
    },

    afterRender: function() {
  	
  	
  	},

    append: function(){
    	this.campaignList.campaignJSON = this.campaignList.handle();
    	this.$el.html(this.template(this.campaignList.campaignJSON));
    	this.enableScroll();
  	},
  	
    openCampaign: function(e){
  		//e.preventDefault();
    	//var id = $(e.currentTarget).data("id");
  		//SEE GALLERY VIEW
      Application.router.navigate("#campaign", {trigger: true});
    },

  });
  
}});

window.require.define({"views/login_register_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/loginRegister');

  module.exports = View.extend({
    id: 'login-register-view',
    template: template,
    events: {
      'submit #registerForm': 'loginRegisterSubmit',
    },
     
    initialize: function() {  

    },

    render: function() {  
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },

    enableScroll:function(){
      var scroll = new iScroll('wrapper2');
    },

    afterRender: function() {
    
    },

    loginRegisterSubmit: function(e) {
      e.preventDefault();

      var email = $('input[name=email]').val();
      var cell = $('input[name=cell]').val();
      var f_name = $('input[name=first_name]').val();
      var l_name = $('input[name=last_name]').val();
      var bday = $('input[name=birthday]').val();
      var password = $('input[name=password]').val();

      var data = {
        "name": email,
        "pass": password,
        "mail": email,
        "profile_main": {
          "field_user_birthday": {
            "und": [
              {
                "value": {
                  "date": bday,
                },
              },
            ],
          },
          "field_user_first_name": {
            "und": [
              {
                "value": f_name,
              },
            ],
          },
          "field_user_last_name": {
            "und": [
              {
                "value": l_name,
              },
            ],
          },
          "field_user_mobile": {
            "und": [
              {
                "value": cell,
              },
            ],
          },
        },
      };

      $.ajax({
        url: Application.baseURL + 'rest/user/register.json',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function(textStatus, errorThrown) {
          alert(JSON.stringify(textStatus));
        },

        success: function(data) {
          window.localStorage.setItem("user_logged_in","true");
          Application.router.navigate("#profile", {trigger: true});

          alert('Registration successful.');
        }
      });
    }

  });
  
}});

window.require.define({"views/login_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/login');

  module.exports = View.extend({
    id: 'login-view',
    template: template,
    events: {
      "submit form": "login",
      "tap #register_button": "goRegister",
      "tap #facebook_login": "authFacebook",
    },
    fbAppId: '525191857506466',
    fbPermissions: ['email', 'user_about_me'],

    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      return this;
    },

    login: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var email = $('input[name=email]').val();
      var password = $('input[name=password]').val();

      var data = {
        "email": email,
        "password": password,
      };

      $.ajax({
        url: Application.baseURL + 'rest/user/login.json',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function(textStatus, errorThrown) {
          alert(JSON.stringify(textStatus));
        },

        success: function(data) {
          Application.loginView.finishLogin();
        },
      });
    },

    authFacebook: function(e) {
      window.plugins.facebookConnect.login(
        {
          permissions: this.fbPermissions,
          appId: this.fbAppId,
        },

        function(result) {
          if (result.cancelled || result.error) {
            alert("FacebookConnect.login:failedWithError:" + result.message);
          }
          else {
            Application.loginView.onAuthFacebookSuccess(result);
          }
        }
      );
    },

    onAuthFacebookSuccess: function(result) {
      var data = {
        "access_token": result.accessToken,
      };

      // Use the auth token to then create / login to our Drupal backend
      $.ajax({
        url: Application.baseURL + 'rest/user/fblogin.json',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function(textStatus, errorThrown) {
          alert(JSON.stringify(textStatus));
        },

        success: function(data) {
          Application.loginView.finishLogin();
        },
      });
    },

    // Save logged_in var and navigate to profile screen
    finishLogin: function() {
      window.localStorage.setItem("user_logged_in","true");

      Application.router.navigate("#profile", {trigger: true});
      $('#profile_tab').addClass('tab_wrapper_active');

      alert('Login successful.');
    },

    goRegister: function(e) {
      Application.router.navigate('#login_register', {trigger: true});
    }

  });
  
}});

window.require.define({"views/profile_anonymous_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/profile_anonymous');

  module.exports = View.extend({
    id: 'profile-anonymous-view',
    template: template,
    events: {
      "tap #btnProfileLogin":"goLogin",
      "tap #btnProfileGetInvolved":"goInvolved"
    },
     
    initialize: function() {  
    
    },

    render: function() {  
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },

    enableScroll:function(){
      var scroll = new iScroll('wrapper2');
    },

    afterRender: function() {
    
    },

    goInvolved: function(e) {
      $('.tab_wrapper').removeClass('tab_wrapper_active');
      $('#getInvolved_tab').addClass('tab_wrapper_active');
      Application.router.navigate("#involved", {trigger: true});
    },

    goLogin: function(e) {
      $('.tab_wrapper').removeClass('tab_wrapper_active');
      Application.router.navigate("#login" , {trigger: true});
    }

  });
  
}});

window.require.define({"views/profile_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/profile');

  module.exports = View.extend({
    id: 'profile-view',
    template: template,
    events: {
  	
  	
  	},
     
    initialize: function() {  

  	
    },

    render: function() {	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
    	return this;
    },

    enableScroll:function(){
    	var scroll = new iScroll('wrapper2');
    },

    afterRender: function() {
  	
  	
  	}

  });
  
}});

window.require.define({"views/quiz_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/quiz');

  module.exports = View.extend({
    id: 'quiz-view',
    template: template,
    cause_name_mapping: {
      'cause-animals': 'Animals',
      'cause-bullying': 'Bullying',
      'cause-disasters': 'Disasters',
      'cause-discrimination': 'Discrimination',
      'cause-education': 'Education',
      'cause-environment': 'Environment',
      'cause-health': 'Physical & Mental Health',
      'cause-human-rights': 'Human Rights',
      'cause-poverty': 'Homelessness & Poverty',
      'cause-relationships': 'Sex & Relationships',
      'cause-troops': 'Our Troops',
    },
    events: {
      'tap .action_button': 'submitQuiz',
      'tap img': 'selectCause',
      'pageshow': 'pageShow',
    },

    pageShow: function(e) {
      alert('page show');
    },

    initialize: function() {
      this.maxSelectedCauses = 3;
      this.selectedCauses = new Array();
    },

    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      return this;
    },

    afterAppend: function() {
      var redrawList = false;

      for (i = 0; i < this.maxSelectedCauses; i++) {
        var sel = window.localStorage.getItem('cause-selection-' + i);
        if (sel) {
          this.selectedCauses[i] = sel;
          var elem = $('#' + sel);
          elem.addClass('selected');
          //$(sel).addClass('selected');

          redrawList = true;
        }
      }

      if (redrawList) {
        this.redrawList();
      }
    },

    selectCause: function(e) {
      var elem = $(e.target);
      var elemId = elem.attr('id');
      var len = this.selectedCauses.length;
      var redrawList = false;

      if (elem.hasClass('selected')) {
        elem.removeClass('selected');

        var removeId = elemId;
        for (i = 0; i < len; i++) {
          if (this.selectedCauses[i] == elemId) {
            this.selectedCauses[i] = '';

            // Remove selection from array
            this.selectedCauses.splice(i, 1);

            redrawList = true;
            break;
          }
        }
      }
      else {
        if (len < this.maxSelectedCauses) {
          this.selectedCauses[len] = elemId;
          elem.addClass('selected');

          redrawList = true;
        }
      }

      if (redrawList) {
        this.redrawList();
      }
    },

    submitQuiz: function() {
      // TODO: submit results to Flurry
      
      for (i = 0; i < this.maxSelectedCauses; i++) {
        if (this.selectedCauses[i]) {
          window.localStorage.setItem('cause-selection-' + i, this.selectedCauses[i]);
        }
      }

  console.log(window.localStorage.getItem('cause-selection-0'));
  console.log(window.localStorage.getItem('cause-selection-1'));
  console.log(window.localStorage.getItem('cause-selection-2'));

      Application.router.navigate('#involved', {trigger: true});
    },

    redrawList: function() {
      for (i = 0; i < this.maxSelectedCauses; i++) {
          var listElem = $('#cause-selection-'+i);
          var displayIndex = i + 1;
          var newString = displayIndex + '. ';

          if (this.selectedCauses[i]) {
            newString += this.cause_name_mapping[this.selectedCauses[i]];
          }

          listElem.html(newString);
        }
    },

  });
  
}});

window.require.define({"views/session_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/loginSplash');

  module.exports = View.extend({
    id: 'session-view',
    template: template,
    events: 		{

    		"tap #facebook_login":"authFb",
    	
    	},

     
    initialize: function() {  
  	
  	 
  	
  	
  	
  	
  	
  	
    },

    render: function() {
    	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  	this.$el.html(this.template(this.getRenderData()));
  	this.afterRender();
    	return this;

    },


    afterRender: function() {
  	
  	
  	
    },
    authFb: function(){

    	window.plugins.facebookConnect.login({permissions: ["email", "user_about_me","publish_stream"], appId: "105775762330"}, 
    		function(result) {
    			
    			Application.sessionView.successFb(result);
    			//console.log("FacebookConnect.login:" + JSON.stringify(result));
    			if(result.cancelled || result.error) {
    				console.log("FacebookConnect.login:failedWithError:" + result.message);
    				return;}});
  		//	window.plugins.facebookConnect.requestWithGraphPath("me/feed", "options", "POST", "callback")
  	


  },
  successFb: function(result){

  	//alert("success");
  	// store login state
  	window.localStorage.setItem("user_fb_auth", true);
    window.localStorage.setItem("fb_auth_token", result.accessToken )
    //console.log(result);
    //this.authDos(fbtoken);

     data = {access_token: result.accessToken,group_name:"PicsforPetsSharers2012"};
      $.ajax({
        url: "https://www.dosomething.org/?q=rest/user/fblogin.json",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function(textStatus, errorThrown) {
          alert(JSON.stringify(textStatus));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function(data) {
              //alert('page_login_submit - SUCCESS!');
              //$('#result').html(JSON.stringify(data));
              //alert('dos success');
              //Application.sessionView.sucessDoS();
              
                window.localStorage.setItem("user_dos_auth", true);
                try{
                  var len = data["session_name"].length;
                  window.localStorage.setItem("user_dos_sessname", data["session_name"].substring(1,len) + '='+ data["sessid"]);
                  //alert(data["session_name"]);


                } catch (e) {

                  //alert("Error using mycommand: " + e.message);

                }
                var redirectLoc = window.localStorage.getItem("session_redirect");
                if (redirectLoc == "false"){

                  return;
                }else{
                                Application.router.navigate(redirectLoc , {trigger: true});


                }
                // handle cancel button on camera to send user back to gallery instead of back to session


            }
          });





  },
  authDoS:function(token){

     


  },
  sucessDoS:function(){
    alert("before redirect");
      window.localStorage.setItem("user_dos_auth", true);
       

      //this.redirect();


  },
  redirect:function(){
     


  }




  });
  
}});

window.require.define({"views/settings_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/settings');

  module.exports = View.extend({
    id: 'settings-view',
    template: template,
    events: {
      'tap .logout': 'logout',
    },
     
    initialize: function() {  

  	
    },

    render: function() {	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
    	return this;
    },

    afterRender: function() {

  	},

    logout: function(e) {
      $.ajax({
        url: Application.baseURL + 'rest/user/logout.json',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function(textStatus, errorThrown) {
          // TODO handle scenario where user is not logged in
          alert(JSON.stringify(textStatus));
        },

        success: function(data) {
          window.localStorage.setItem("user_logged_in","false");

          alert('Logged out');
        },
      });
    }

  });
  
}});

window.require.define({"views/templates/about": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">About</div>\n</div>\n\n<div id=\"about_page\" class=\"content_wrapper\">\n	<div id=\"aboutScroll\" class=\"scroll_wrapper scroller_down\">\n		<div id=\"scroller\">\n			<div class=\"palette\" style=\"margin-bottom:25px\">\n				<div class=\"text_block\">\n					<div class=\"h2\" style=\"text-transform:uppercase;margin-bottom:5px\">About Pics For Pets</div>\n	\n					<p class=\"h4\">Every year, approximately 3 to 4 million animals in shelters are euthanized simply because they don’t get adopted.</p>\n\n					<div class=\"h3 align_center\">One reason they don’t get adopted? <span style=\"text-decoration:underline\">Bad pictures</span>.</div>\n\n					<p class=\"h4\">Just by taking and sharing a great picture of a shelter animal, you can increase its chance of being adopted. Pics for Pets is a campaign that gives you the tools to take and share great photos of shelter animals to improve their chances of finding a happy home.</p>\n					\n					<p class=\"h4\">Got questions about the campaign? Check out the FAQs or email <a style=\"text-transform:underline;color:#000;\" href=\"mailto:animals@dosomething.org\">animals@dosomething.org</a> (tap and hold to email). </p>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>  ";});
}});

window.require.define({"views/templates/campaign": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">Campaign Name</div>\n</div>\n\n<div id=\"campaign_page\" class=\"content_wrapper\">\n	<div id=\"wrapperCampaign\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			<div class=\"banner\" style=\"height:135px;background-image:url(http://placekitten.com/640/270)\"></div>\n			<div class=\"description\">\n				<div class=\"h2\">July 1st - September 15th</div>\n				<p>Donate school supplies at your local Staples store to support kids in need.</p>\n			</div>\n			<div class=\"signUp_wrapper\">\n				<div class=\"button yellow_button active_yellow\">Sign Up</div> <!-- toggles to Already Signed Up -->\n			</div>\n			<div id=\"campaignBanner\" class=\"banner\" style=\"height:130px;background-image:url(http://placekitten.com/640/260)\"></div> <!-- needs link to child browser -->\n			<div class=\"campaign_link\">Actions</div>\n			<div class=\"campaign_link\">How To</div>\n			<div class=\"campaign_link\">Gallery</div>\n			<div class=\"campaign_link\">Prizes</div>\n			<div class=\"campaign_link\">Resources</div>\n			<div class=\"campaign_link\">FAQ</div>\n		</div>\n	</div>\n</div>";});
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"content\">\n  <h1>brunch</h1>\n  <h2>Welcome!</h2>\n  <ul>\n    <li><a href=\"http://brunch.readthedocs.org/\">Documentation</a></li>\n    <li><a href=\"https://github.com/brunch/brunch/issues\">Github Issues</a></li>\n    <li><a href=\"https://github.com/brunch/twitter\">Twitter Example App</a></li>\n    <li><a href=\"https://github.com/brunch/todos\">Todos Example App</a></li>\n  </ul>\n</div>\n";});
}});

window.require.define({"views/templates/involved": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n			\n			<div data-id=\"bullytext\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.bullytext;
    stack1 = foundHelper || depth0.bullytext;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "bullytext.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.bullytext;
    stack1 = foundHelper || depth0.bullytext;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "bullytext.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.bullytext;
    stack1 = foundHelper || depth0.bullytext;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "bullytext.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.bullytext;
    stack1 = foundHelper || depth0.bullytext;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "bullytext.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"spit\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.spit;
    stack1 = foundHelper || depth0.spit;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "spit.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.spit;
    stack1 = foundHelper || depth0.spit;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "spit.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.spit;
    stack1 = foundHelper || depth0.spit;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "spit.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.spit;
    stack1 = foundHelper || depth0.spit;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "spit.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"picsforpets\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.picsforpets;
    stack1 = foundHelper || depth0.picsforpets;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "picsforpets.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.picsforpets;
    stack1 = foundHelper || depth0.picsforpets;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "picsforpets.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.picsforpets;
    stack1 = foundHelper || depth0.picsforpets;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "picsforpets.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.picsforpets;
    stack1 = foundHelper || depth0.picsforpets;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "picsforpets.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"footlocker\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.footlocker;
    stack1 = foundHelper || depth0.footlocker;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "footlocker.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.footlocker;
    stack1 = foundHelper || depth0.footlocker;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "footlocker.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.footlocker;
    stack1 = foundHelper || depth0.footlocker;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "footlocker.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.footlocker;
    stack1 = foundHelper || depth0.footlocker;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "footlocker.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"vote\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.vote;
    stack1 = foundHelper || depth0.vote;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "vote.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.vote;
    stack1 = foundHelper || depth0.vote;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "vote.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.vote;
    stack1 = foundHelper || depth0.vote;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "vote.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.vote;
    stack1 = foundHelper || depth0.vote;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "vote.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"staples\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.staples;
    stack1 = foundHelper || depth0.staples;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "staples.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.staples;
    stack1 = foundHelper || depth0.staples;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "staples.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.staples;
    stack1 = foundHelper || depth0.staples;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "staples.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.staples;
    stack1 = foundHelper || depth0.staples;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "staples.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"thumbwars\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.thumbwars;
    stack1 = foundHelper || depth0.thumbwars;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "thumbwars.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.thumbwars;
    stack1 = foundHelper || depth0.thumbwars;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "thumbwars.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.thumbwars;
    stack1 = foundHelper || depth0.thumbwars;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "thumbwars.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.thumbwars;
    stack1 = foundHelper || depth0.thumbwars;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "thumbwars.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"hunt\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.hunt;
    stack1 = foundHelper || depth0.hunt;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "hunt.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.hunt;
    stack1 = foundHelper || depth0.hunt;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "hunt.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.hunt;
    stack1 = foundHelper || depth0.hunt;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "hunt.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.hunt;
    stack1 = foundHelper || depth0.hunt;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "hunt.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"iheartdad\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.iheartdad;
    stack1 = foundHelper || depth0.iheartdad;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "iheartdad.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.iheartdad;
    stack1 = foundHelper || depth0.iheartdad;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "iheartdad.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.iheartdad;
    stack1 = foundHelper || depth0.iheartdad;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "iheartdad.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.iheartdad;
    stack1 = foundHelper || depth0.iheartdad;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "iheartdad.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			<div data-id=\"prom\" class=\"banner\" style=\"background-color:";
    foundHelper = helpers.prom;
    stack1 = foundHelper || depth0.prom;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-color']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "prom.campaign.logo-bg-color", { hash: {} }); }
    buffer += escapeExpression(stack1) + ";background-image:url(";
    foundHelper = helpers.prom;
    stack1 = foundHelper || depth0.prom;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['logo-bg-image']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "prom.campaign.logo-bg-image", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\">\n				<div class=\"banner_logo\" style=\"background-image:url(";
    foundHelper = helpers.prom;
    stack1 = foundHelper || depth0.prom;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.logo);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "prom.campaign.logo", { hash: {} }); }
    buffer += escapeExpression(stack1) + ")\"></div>\n				<div class=\"call_to_action\">";
    foundHelper = helpers.prom;
    stack1 = foundHelper || depth0.prom;
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.campaign);
    stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1['call-to-action']);
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "prom.campaign.call-to-action", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n			</div>\n			\n			";
    return buffer;}

    buffer += "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">Get Involved</div>\n</div>\n\n<div id=\"involved_page\" class=\"content_wrapper\">\n	<div id=\"wrapper\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			\n			";
    foundHelper = helpers.campaigns;
    stack1 = foundHelper || depth0.campaigns;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n			\n		</div>\n	</div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/login": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"login_page\" class=\"content_wrapper\">\n	<div class=\"bglogo\"></div>\n	<form>\n		<input type=\"email\" name=\"email\" placeholder=\"Email / Username\" />\n		<input type=\"password\" name=\"password\" placeholder=\"Password\" />\n		<input id=\"login_button\" type=\"submit\" name=\"ds_login\" class=\"button yellow_button active_yellow\" value=\"Log In\" />\n		<div id=\"register_button\" class=\"button yellow_button active_yellow\">\n      Become a member\n    </div>\n		<div id=\"facebook_login\" class=\"button facebook_button\"></div>\n	</form>\n</div>";});
}});

window.require.define({"views/templates/loginRegister": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div class=\"back_button\"></div>\n	<div id=\"header_title\" class=\"title\">\n		Register\n	</div>\n</div>\n\n<div id=\"register_page\" class=\"content_wrapper\">\n	<div id=\"wrapper2\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			<div class=\"little_info\">\n				Before you get started we need a little info\n			</div>\n			<form id=\"registerForm\">\n				<div class=\"label\">Email</div>\n				<input type=\"email\" name=\"email\" />\n				<div class=\"label\">Cell #</div>\n				<input type=\"tel\" name=\"cell\" />\n				<div class=\"label\">First Name</div>\n				<input type=\"text\" name=\"first_name\" />\n				<div class=\"label\">Last Name</div>\n				<input type=\"text\" name=\"last_name\" />\n				<div class=\"label\">Birthday</div>\n				<input type=\"date\" name=\"birthday\" />\n				<div class=\"label\">Confirm your password</div>\n				<input type=\"password\" name=\"password\" class=\"password\" /> \n\n				<input type=\"submit\" name=\"ds_register\" class=\"button login_button yellow_button active_button\" value=\"Let's Do This\" />\n			</form>\n		</div>\n	</div>\n</div>";});
}});

window.require.define({"views/templates/loginSplash": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div class=\"logo\"><img src=\"images/p4plogo.png\" /></div>\n</div>\n\n<div id=\"loginStart_page\" class=\"content_wrapper palette\">\n<p>To access the camera, first you need to login. Why? So that we can add your amazing photo to the pawtrait gallery.</p>\n	<div id=\"facebook_login\" class=\"wide_button facebook_button active_opacity\">Login with Facebook</div>\n	\n</div>";});
}});

window.require.define({"views/templates/profile": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">Profile</div>\n</div>\n\n<div id=\"profile_page\" class=\"content_wrapper\">\n	<div id=\"wrapper2\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			<div class=\"campaign_item\">\n				<div class=\"campaign_name\">Campaign Name 1</div>\n				<div class=\"campaign_details_left\">Completed: 2 of 7</div>\n				<div class=\"campaign_details_right\">Ends: 09/15/12</div>\n			</div>\n			<div class=\"campaign_item\">\n				<div class=\"campaign_name\">Campaign Name 1</div>\n				<div class=\"campaign_details_left\">Completed: 2 of 7</div>\n				<div class=\"campaign_details_right\">Ends: 09/15/12</div>\n			</div>\n			<div class=\"campaign_item\">\n				<div class=\"campaign_name\">Campaign Name 1</div>\n				<div class=\"campaign_details_left\">Completed: 2 of 7</div>\n				<div class=\"campaign_details_right\">Ends: 09/15/12</div>\n			</div>\n		</div>\n	</div>\n</div>";});
}});

window.require.define({"views/templates/profile_anonymous": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n  <div id=\"header_title\" class=\"title\">Profile</div>\n</div>\n\n<div id=\"profile_anonymous_page\" class=\"content_wrapper\">\n  <div id=\"wrapper2\" class=\"scroll_wrapper\">\n    <div id=\"scroller\">\n      <div class=\"profile-anon-section\">\n        <div class=\"description\">\n          Login or Register to participate in our national campaigns and track your progress.\n        </div>\n        <div id=\"btnProfileLogin\" class=\"button yellow_button active_yellow\">\n          GET STARTED NOW\n        </div>\n      </div>\n      <div class=\"profile-anon-section\">\n        <div class=\"description\">\n          Or browse our campaigns to see what you can get involved in!\n        </div>\n        <div id=\"btnProfileGetInvolved\" class=\"button yellow_button active_yellow\">\n          FIND WAYS TO GET INVOLVED\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";});
}});

window.require.define({"views/templates/quiz": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n  <div id=\"header_title\" class=\"title\">\n    Select Your Causes\n  </div>\n</div>\n\n<div id=\"quiz_page\" class=\"content_wrapper\">\n  <div class=\"description\">\n    Help us to know more about you! Select the top 3 causes YOU care about below.\n  </div>\n\n  <!-- Note: This horizontal scroller does not work if the outer page div is a iScroll wrapper -->\n  <div class=\"cause-options-outer\">\n    <div class=\"cause-options-inner\">\n      <img id=\"cause-animals\" src=\"images/cause_animals.png\"/>\n      <img id=\"cause-bullying\" src=\"images/cause_bullying.png\"/>\n      <img id=\"cause-disasters\" src=\"images/cause_disasters.png\"/>\n      <img id=\"cause-discrimination\" src=\"images/cause_discrimination.png\"/>\n      <img id=\"cause-education\" src=\"images/cause_education.png\"/>\n      <img id=\"cause-environment\" src=\"images/cause_environment.png\"/>\n      <img id=\"cause-health\" src=\"images/cause_health.png\"/>\n      <img id=\"cause-human-rights\" src=\"images/cause_human_rights.png\"/>\n      <img id=\"cause-poverty\" src=\"images/cause_poverty.png\"/>\n      <img id=\"cause-relationships\" src=\"images/cause_relationships.png\"/>\n      <img id=\"cause-troops\" src=\"images/cause_troops.png\"/>\n    </div>\n  </div>\n  <div class=\"clear\"></div>\n  <div class=\"cause-selections\">\n    <div id=\"cause-selection-0\" class=\"cause-selection\">\n      1.\n    </div>\n    <div id=\"cause-selection-1\" class=\"cause-selection\">\n      2. \n    </div>\n    <div id=\"cause-selection-2\" class=\"cause-selection\">\n      3.\n    </div>\n  </div>\n  <div class=\"button yellow_button action_button\">\n    CONTINUE\n  </div>\n</div>";});
}});

window.require.define({"views/templates/settings": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">Settings</div>\n</div>\n\n<div id=\"settings_page\" class=\"content_wrapper\">\n	<div class=\"button gray_button active_gray\">Your Causes</div>\n	<div class=\"button gray_button active_gray\">Terms of Use</div>\n	<div class=\"button gray_button active_gray\">Privacy Policy</div>\n	<div class=\"button gray_button active_gray logout\">Log Out</div>\n</div>";});
}});

window.require.define({"views/templates/spinner": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class=\"spinnerModal\">\n  <div class=\"spinnerContainer\">\n		<div class=\"description\">Meow</div>\n		<div class=\"spinnerWrapper\">	\n			<div class=\"spinner\">\n		    <div class=\"bar1\"></div>\n		    <div class=\"bar2\"></div>\n		    <div class=\"bar3\"></div>\n		    <div class=\"bar4\"></div>\n		    <div class=\"bar5\"></div>\n		    <div class=\"bar6\"></div>\n		    <div class=\"bar7\"></div>\n		    <div class=\"bar8\"></div>\n		    <div class=\"bar9\"></div>\n		    <div class=\"bar10\"></div>\n		    <div class=\"bar11\"></div>\n		    <div class=\"bar12\"></div>\n		  </div>\n		</div>	\n  </div>\n</div>";});
}});

window.require.define({"views/view": function(exports, require, module) {
  require('lib/view_helper');

  // Base class for all views.
  module.exports = Backbone.View.extend({
    initialize: function() {
      this.render = _.bind(this.render, this);
    },

    template: function() {},
    getRenderData: function() {},

    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },

    afterRender: function() {}
  });
  
}});

