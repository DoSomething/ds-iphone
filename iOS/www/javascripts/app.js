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
  		var CampaignView = require("views/campaign_view");
  		var SessionView = require("views/session_view");
  		var Router = require('lib/router');  


      this.loginView = new LoginView();
      this.involvedView = new InvolvedView();
      this.settingsView = new SettingsView();
      this.profileView = new ProfileView();
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

window.require.define({"views/gallery_view": function(exports, require, module) {
  var View = require('./view');
  var petDetailView = require("views/pet_view");

  var template = require('./templates/gallery');
  var itemTemplate = require('./templates/galleryItem')
  var Pets = require('../models/pets');
  var _PETSPERPAGE = 12;
  module.exports = View.extend({
  	id: 'gallery-view',
  	template: template,

  	
  	events: {
  		"tap #loadMore" : "loadMore",
  		"dataLoaded":"append",
  		"tap .pet_thumb": "renderPet",
  		"tap #filters_action":"filterRender",
  		"tap #location" : "toggleFilterActive1",
  		"tap #favs" : "toggleFilterActive2",
  		"tap #time" : "toggleFilterActive3",
  		"tap #type" : "showDropdown",
  		"tap #dog_type" : "chooseType1",
  		"tap #cat_type" : "chooseType2",
  		"tap #bird_type" : "chooseType3",
  		"tap #rabbit_type" : "chooseType4",
  		"tap #other_type" : "chooseType5",
  		"tap #edu-button" : "hideEdu",
  		"tap #refresh-gal":"reloadList"

  	},

  	initialize: function() {  
  		//alert('pets ini');
  		this.petList = new Pets();
  		this.petList.petJSON ={};
  		

  		if ( window.localStorage.getItem("launchCount") != "1"){

  			this.petList.fetch({

  				data: { limit: _PETSPERPAGE},
  				processData:true,
  				add:true,
  				success:function(){
  			   // alert("fire");
  			   Application.galleryView.$el.trigger("dataLoaded");
  				//Application.router.navigate("#page2",{trigger: true});
  			}
  		});
  		}

  		//this.petList.bind('refresh', this.refresh());
  		//this.model.on('change', this.render, this);

  	},
  	

  	render: function() {
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();

    	//var t={};
    	// testing jq 
    	this.$el.html(this.template(this.petList.petJSON));

    	//this.$el.html(this.template(t));

    	this.afterRender();

    	return this;

    },

    afterRender: function() {
    	     // Application.router.navigate("#gallery",{trigger:true});
    	     if ( window.localStorage.getItem("launchCount") == "1"){
    	     	$(this.el).hide();
    	     	//this.$el.append("");
    	     	this.$el.append("<div class='eduModal'><div id='edu-wrapper'></div>   </div>");


    	     	var	carousel,
    	     	el,
    	     	i,
    	     	page,
    	     	slides = [
    	     	"<div class='edu-image' id='edu1'></div>",
    	     	"<div class='edu-image' id='edu2'></div>",
    	     	"<div class='edu-image' id='edu3'></div>",
    	     	"<div class='edu-image' id='edu4'><div id='edu-button' class='wide_button aqua_button active_yellow'>Let's Get Started</div></div></div>"
    	     	];

    	     	carousel = new SwipeView('#edu-wrapper', {
    	     		numberOfPages: slides.length,
    	     		hastyPageFlip: true,
    	     		loop:false
    	     	});

  			// Load initial data
  			for (i=0; i<3; i++) {
  				page = i==0 ? slides.length-1 : i-1;

  				el = document.createElement('span');
  				el.innerHTML = slides[page];
  				carousel.masterPages[i].appendChild(el)
  			}

  			carousel.onFlip(function () {
  				var el,
  				upcoming,
  				i;

  				for (i=0; i<3; i++) {
  					upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;

  					if (upcoming != carousel.masterPages[i].dataset.pageIndex) {
  						el = carousel.masterPages[i].querySelector('span');
  						el.innerHTML = slides[upcoming];
  					}
  				}
  			});


  			$('#edu-button').live( 'tap', function () {
  	  		  	     	$(Application.galleryView.el).show();

  	  		Application.galleryView.hideEdu();


  		});




  }


  },  
  hideEdu:function(){
    	//alert("hello");
    	$(".eduModal").fadeOut();
    	window.localStorage.setItem("launchCount","2");

    	this.initPets();
    },
    refreshScroll:function(){
    	//myScroll.refresh();
    },
    enableScroll: function(){



    	myScroll = new iScroll('wrapper', {
    		useTransition: true


    	});
    },
    reloadList:function(){
    	this.petList.fetch({

    		data: { limit: _PETSPERPAGE},
    		processData:true,
    		add:false,
    		success:function(){
  			   // alert("fire");
  			   Application.galleryView.$el.trigger("dataLoaded");
  				//Application.router.navigate("#page2",{trigger: true});
  			}
  		});


    },

    append: function(){
    	//alert("refresh fired")
    	this.petList.petJSON = this.petList.handle();
    	//this.petList.each(function(pet){console.log(pet.get("name"))});
    	//console.log(js);

    	//http://picsforpets.dev.zivtech.com/sites/default/files/styles/thumbnail_retina/public/fb_campaign/

    	this.$el.html(this.template(this.petList.petJSON));

    	this.enableScroll();

  		//this.petList.each(function(pet){console.log(pet.get("name"))});

  	},
  	appendMore: function(){
    	//alert("refresh fired")
    	this.petList.petJSON = this.petList.handle();
    	//this.petList.each(function(pet){console.log(pet.get("name"))});
    	//console.log(js);

    	//http://picsforpets.dev.zivtech.com/sites/default/files/styles/thumbnail_retina/public/fb_campaign/

    	//this.$el.html(this.template(this.petList.petJSON));
    	//for$('#thelist li').length

    	//'<li data-id="' + {{sid}} + '" class="pet_thumb" style="background-color:#333;background-image:url("' + {{thumb_retina}} + '")"></li>'




    	//$("#thelist").append(items);

    	//this.enableScroll();

  		//this.petList.each(function(pet){console.log(pet.get("name"))});

  	},

  	renderPet: function(e){
    	//alert("test");
    	e.preventDefault();
    	var id = $(e.currentTarget).data("id");
      //alert(id);
      var item = this.petList.get(id);
      //var name = item.get("name");
      Application.petDetail.item = item.toJSON();    
      //stackNavigator.pushView(petDetail);
      Application.router.navigate("#pet" , {trigger: true});

      //petDetail.render();

  },
  initPets:function(){

  	this.petList.fetch({

  		data: { limit: _PETSPERPAGE},
  		processData:true,
  		add:true,
  		success:function(){
  			   // alert("fire");
  			   Application.galleryView.$el.trigger("dataLoaded");
  				//Application.router.navigate("#page2",{trigger: true});
  			}
  		});},
  	loadMore: function() {
  		var pOffset = $('#thelist li').length;
  		this.petList.fetch({

  			data: { limit: _PETSPERPAGE, offset: pOffset},
  			processData:true,
  			add:true,
  			success:function(){
  				Application.galleryView.$el.trigger("dataLoaded");
  			}
  		});

  	},
  	chooseType1: function(){ 
  		changeType('dog'); 
  		if ($('#type').hasClass('filter_active')==false) { 
  			$('#type').addClass('filter_active'); 
  		}
  	},
  	chooseType2: function(){ 
  		changeType('cat'); 
  		if ($('#type').hasClass('filter_active')==false) { 
  			$('#type').addClass('filter_active'); 
  		}
  	},
  	chooseType3: function(){ 
  		changeType('bird'); 
  		if ($('#type').hasClass('filter_active')==false) { 
  			$('#type').addClass('filter_active'); 
  		}
  	},
  	chooseType4: function(){ 
  		changeType('rabbit'); 
  		if ($('#type').hasClass('filter_active')==false) { 
  			$('#type').addClass('filter_active'); 
  		}
  	},
  	chooseType5: function(){ 
  		changeType('other'); 
  		if ($('#type').hasClass('filter_active')==false) { 
  			$('#type').addClass('filter_active'); 
  		}
  	},
  	showDropdown: function(){
  		var hasDoneFirstClick = false;
  		$('.type_dropdown').show(); 
  		if ( !hasDoneFirstClick ) { 
  			hasDoneFirstClick = true;
  			return false;
  		}
  	},
  	filterRender:function(){
  		$('.type_dropdown').hide();
  		$('#filters_action').toggleClass('filter_button');
  		$('#filters_action').toggleClass('cancel_button');
  		$('.filters_wrapper').toggleClass('filters_up').toggleClass('filters_down');
  		$('.scroll_wrapper').toggleClass('scroller_down');
  		setTimeout(function(){ 
  			changeType('dog');
  			$('.single').removeClass('filter_active');
  			$('#type').removeClass('filter_active');
  		},300);
  	},
  	toggleFilterActive1: function(){
  		$('#location').toggleClass('filter_active');
  	},
  	toggleFilterActive2: function(){
  		$('#favs').toggleClass('filter_active');
  	},
  	toggleFilterActive3: function(){
  		$('#time').toggleClass('filter_active');
  	}




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

window.require.define({"views/login_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/login');

  module.exports = View.extend({
    id: 'login-view',
    template: template  
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
  	
  	
  	}

  });
  
}});

window.require.define({"views/submit_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/submitpet');

  module.exports = View.extend({
    id: 'submit-view',
    template: template,
    events: {

      "tap #submit-cancel":"cancel",
      "tap #retake-pet":"retake",
      "tap #pet-submit":"submitBtn",
      "photoUploadComplete":"postPet"
    },

    initialize: function() {  








    },
    retake:function(){

      Application.furView.takePic();
    },
    cancel:function(e){
      e.preventDefault();
      $("#footer").show();
       $('.tab').removeClass('tab_active');
        $('#gallery_tab').addClass('tab_active');
      $.mobile.activePage.back = true;
      window.history.back();


    },
    render: function() {
    	$('#footer').hide();
    	var t = {};
     this.$el.html(this.template(t));
     this.afterRender();
    	//return this;

    },

    setPetAttr:function(){
      window.localStorage.setItem("pet_name" , $('[name=pet_name]').val());
      window.localStorage.setItem("pet_type" , $('[name=pet_type]').val());
      window.localStorage.setItem("pet_age" , $('[name=pet_age]').val());

      window.localStorage.setItem("pet_description1" , $('[name=pet_description1]').val());
      window.localStorage.setItem("pet_description2" , $('[name=pet_description2]').val());
      window.localStorage.setItem("pet_description3" , $('[name=pet_description3]').val());
      
      window.localStorage.setItem("shelter_name" , $('[name=shelter_name]').val());
      window.localStorage.setItem("shelter_address" , $('[name=shelter_address]').val());
      window.localStorage.setItem("shelter_city" , $('[name=shelter_city]').val());
      window.localStorage.setItem("shelter_state" , $('[name=shelter_state]').val());
      window.localStorage.setItem("shelter_zip" , $('[name=shelter_zip]').val());




    },
    postPet:function(){


     
      var pet_name = window.localStorage.getItem("pet_name");
      var pet_age = window.localStorage.getItem("pet_age");
      var pet_type = window.localStorage.getItem("pet_type");
      var pet_description1 = window.localStorage.getItem("pet_description1");
      var pet_description2 = window.localStorage.getItem("pet_description2");
      var pet_description3 = window.localStorage.getItem("pet_description3");
      var pet_fid = window.localStorage.getItem("pet_fid");
      var shelter_name = window.localStorage.getItem("shelter_name");
      var shelter_address = window.localStorage.getItem("shelter_address");
      var shelter_city = window.localStorage.getItem("shelter_city");
      var shelter_state = window.localStorage.getItem("shelter_state");
      var shelter_zip = window.localStorage.getItem("shelter_zip");
                          //alert(pet_name);



      var data = {
      "nid": "724609",
      "webform_submission": {
          "nid": "724609"
      },
      "field_fb_app_animal_name": {
          "und": [
              {
                  "value": pet_name
              }
          ]
      },
      "field_fb_app_animal_type": {
          "und": pet_type
      },
      
      "field_fb_app_age": {
          "und": [
              {
                  "value": pet_age
              }
          ]
      },
      "field_fb_app_three_words": {
          "und": [
              {
                  "value": pet_description1
              },
              {
                  "value": pet_description2
              },
              {
                  "value": pet_description3
              }
          ]
      },
      "field_fb_app_image": {
          "und": [
              {
                  "fid": pet_fid

              }
          ]
      },
      "field_fb_app_shelter_name": {
          "und": [
              {
                  "value": shelter_name
              }
          ]
      },
      "field_fb_app_address": {
          "und": [
              {
                  "value": shelter_address
              }
          ]
      },
      "field_fb_app_city": {
          "und": [
              {
                  "value": shelter_city
              }
          ]
      },
      "field_fb_app_state": {
          "und": shelter_state
      },
      "field_fb_app_zip": {
          "und": [
              {
                  "value": shelter_zip
              }
          ]
        }
      };

      $.ajax({
        url: "http://www.dosomething.org/services/pets/webform_submission.json",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function(textStatus, errorThrown) {
          //alert('page_submitPet_submit - failed to post');
          //alert(JSON.stringify(textStatus));
          //console.log(JSON.stringify(errorThrown));
        },
        success: function(data) {
          Application.galleryView.reloadList();
         
          }
        });



      //alert("search");
    },
    submitBtn:function(e){
          e.preventDefault();
          var formError;
          $("#pet-form input[type=text]").each(function() {

                  if(this.value == "") {
                      formError=true;
                      return
                  }

              });

          if(formError){
              alert("All fields required!")

          }else{

            
                     this.setPetAttr();
          window.localStorage.setItem("submit_pet_btn_pressed","true");

          this.submit();
          //alert('submitbtn');
          }
                    
        



    }, 

    submit:function(){


      if (window.localStorage.getItem("pet_photo_upload_complete") == "true"){


          this.postPet();
              $('#footer').show();

          Application.router.navigate("#gallery",{trigger:true} );
          //reset data for next submission
          window.localStorage.setItem("submit_pet_btn_pressed","false");
          window.localStorage.setItem("pet_photo_upload_complete","false");





      }else{
                $('#footer').show();

            Application.router.navigate("#gallery",{trigger:true} );


      }





    },
    enableScroll:function(){
      var scroll = new iScroll('submitWrapper');
    },

    afterRender: function() {


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

window.require.define({"views/templates/edu": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class='eduModal'>\n	<div class='eduLogo'></div>\n	<div class='eduText'>\n		<div class='h3' style='padding-top:0'>GALLERY</div>\n		<div class='h4 edu_column' style='margin-right:3.9%'>General: Browse through shelter animal photos. Once you find your favorite, tap on it!</div>\n		<div class='h4 edu_column'>Filters: You can also sort the animals by Most Shared, Least Shared, and Zip Location</div>\n		<div class='clear'></div>\n		<div class='edu_column' style='margin-right:3.9%'>\n			<div class='h3'>MY ANIMALS</div>\n			<div class='h4'>Check in on animals you've uploaded or shared to see how they're doing.</div>\n		</div>\n		<div class='edu_column'>\n			<div class='h3'>CAMERA/PHOTOGRAPH</div>\n			<div class='h4'>Take a picture of your shelter animal. If you want helpful pic tips, check out 'Photograph' first.</div>\n		</div>\n		<div class='clear'></div>\n		<div class='h3'>PET PAGE</div>\n		<div class='edu_column' style='margin-right:3.9%'>\n			<div class='h4'>Click 'More Info' for shelter details on this particular animal.</div>\n		</div>\n		<div class='edu_column'>\n			<div class='h4'>Heart/Share: Here's a quick pulse on the animal's share count!</div>\n		</div>\n		<div class='clear'></div>\n		<div class='edu_column' style='margin-right:3.9%'>\n			<div class='h4' style='padding-top:7px'>Click 'Share Me' to give this animal some love.</div>\n		</div>\n		<div class='edu_column'>\n			<div class='h4' style='padding-top:7px'>Swipe your finger left or right to get to the next animal.</div>\n		</div>		\n		<div class='clear'></div>\n	</div>\n	<div id='edu-button' class='wide_button blue_button active_yellow'>Let's Get Started</div>\n</div>";});
}});

window.require.define({"views/templates/fur": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">Photograph</div>\n</div>\n\n<div id=\"furtograph_page\" class=\"content_wrapper palette\">\n	<div class=\"text_block\">\n		<div class=\"h2\" style=\"text-transform:uppercase;margin-bottom:10px\">Be a photographer</div>\n		<div class=\"h4\">Were you inspired by all the pics of shelter pets? Well you can take pics, too! Not only do we provide a camera, but you’ll also find a shelter locator as well as great photography tips to get you started.</div>\n	</div>\n	<div id=\"fur_action\" class=\"wide_button active_opacity green_button\" >Action Guide</div>\n	<div id=\"fur_shelter\" class=\"wide_button blue_button active_opacity\">Find a shelter</div>\n	<div id=\"fur_pic\" class=\"wide_button red_button active_opacity\" style=\"margin-bottom:0\">Take a pic</div>\n</div>";});
}});

window.require.define({"views/templates/gallery": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n					 <li data-id=\"";
    foundHelper = helpers.sid;
    stack1 = foundHelper || depth0.sid;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sid", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\" class=\"pet_thumb\" style=\"background-color:#333;background-image:url('";
    foundHelper = helpers.thumb_retina;
    stack1 = foundHelper || depth0.thumb_retina;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "thumb_retina", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></li>\n\n  					 ";
    return buffer;}

    buffer += "<div id=\"header\">\n	<div class=\"logo\">\n		<img src=\"images/p4plogo.png\" />\n	</div> \n        <div id=\"refresh-gal\" class=\"box_button_header box_button refresh_button\"></div>\n     \n</div>\n\n<div id=\"gallery_page\" class=\"content_wrapper\">\n	<div class=\"filters_wrapper\">\n		<div id=\"location\" class=\"filter single\"></div>\n		<div id=\"favs\" class=\"filter single\"></div>\n		<div id=\"type\" class=\"filter dog\"></div>\n		<div class=\"type_dropdown\" style=\"display:none\">\n			<div id=\"dog_type\"></div>\n			<div id=\"cat_type\"></div>\n			<div id=\"bird_type\"></div>\n			<div id=\"rabbit_type\"></div>\n			<div id=\"other_type\"></div>\n		</div>\n		<div id=\"time\" class=\"filter single\"></div>\n	</div>\n\n	<div id=\"wrapper\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			\n\n			<ul id=\"thelist\">\n					 ";
    foundHelper = helpers.pets;
    stack1 = foundHelper || depth0.pets;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n\n			</ul>\n			<div id=\"loadMore\">\n				<div class=\"wide_button green_button active_yellow centered\">Load More...</div>\n			</div>\n			<!-- <div id=\"pullUp\">\n				<span class=\"pullUpIcon\"></span><span class=\"pullUpLabel\">Pull up to refresh...</span>\n			</div> -->\n		</div>\n	</div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/galleryItem": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<li style=\"background-image:url('";
    foundHelper = helpers.pet_thumbnail;
    stack1 = foundHelper || depth0.pet_thumbnail;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "pet_thumbnail", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></li>\n";
    return buffer;});
}});

window.require.define({"views/templates/guide": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div class=\"back_button\"></div>\n	<div id=\"header_title\" class=\"title\">Action Guide</div>\n</div>\n\n<div id=\"guide_page\" class=\"content_wrapper palette\">\n	<div class=\"action_number\">1</div>\n	<div class=\"h2\">Find your nearest animal shelter with the handy shelter locator.</div>\n	<div class=\"clear\"></div>\n	\n	<div class=\"action_number\">2</div>\n	<div class=\"h2\">Visit your shelter to take an awesome animal picture.</div>\n	<div class=\"clear\"></div>\n	\n	<div class=\"action_number\">3</div>\n	<div class=\"h2\">Submit your picture to the gallery as well as important animal details.</div>\n	<div class=\"clear\"></div>\n	\n	<div class=\"action_number\">4</div>\n	<div class=\"h2\">Share your animal with your Facebook friends to help it get adopted.</div>\n	<div class=\"clear\"></div>\n	\n	<div class=\"action_number\">5</div>\n	<div class=\"h2\">Don’t stop there! You can help other animals get adopted, too, by sharing them as well.</div>\n	<div class=\"clear\"></div>\n</div>";});
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


    return "<div id=\"login_page\" class=\"content_wrapper\">\n	<div class=\"bglogo\"></div>\n	<form>\n		<input type=\"email\" name=\"email\" placeholder=\"Email / Username\" />\n		<input type=\"text\" name=\"password\" placeholder=\"Password\" />\n		<input type=\"submit\" name=\"loginDS\" class=\"button yellow_button active_yellow\" value=\"Log In\" />\n		<div id=\"register_button\" class=\"button yellow_button active_yellow\">Become a member</div>\n		<div id=\"facebook_login\" class=\"button facebook_button\"></div>\n	</form>\n</div>";});
}});

window.require.define({"views/templates/loginRegister": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div class=\"back_button\"></div>\n	<div class=\"logo\">\n		<img src=\"images/p4plogo.png\" />\n	</div>\n</div>\n\n<div id=\"register_page\" class=\"content_wrapper palette\">\n	<div class=\"little_info\">Before you get started we need a little info</div>\n	<form>\n		<div class=\"label\">First Name</div>\n		<input type=\"text\" name=\"first_name\" />\n		<div class=\"label\">Last Name</div>\n		<input type=\"text\" name=\"last_name\" />\n		<div class=\"label\">Email or Cell #</div>\n		<input type=\"text\" name=\"email\" />\n		<input type=\"submit\" name=\"loginDS\" class=\"login_button\" value=\"Let's Do This\" />\n	</form>\n</div>";});
}});

window.require.define({"views/templates/loginSplash": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div class=\"logo\"><img src=\"images/p4plogo.png\" /></div>\n</div>\n\n<div id=\"loginStart_page\" class=\"content_wrapper palette\">\n<p>To access the camera, first you need to login. Why? So that we can add your amazing photo to the pawtrait gallery.</p>\n	<div id=\"facebook_login\" class=\"wide_button facebook_button active_opacity\">Login with Facebook</div>\n	\n</div>";});
}});

window.require.define({"views/templates/myanimalItem": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<li class=\"pet_item\">\n	<div class=\"pet_image\" style=\"background-image:url('";
    foundHelper = helpers.myanimal_thumbnail;
    stack1 = foundHelper || depth0.myanimal_thumbnail;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "myanimal_thumbnail", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></div>\n	<div class=\"pet_name\">";
    foundHelper = helpers.myanimal_name;
    stack1 = foundHelper || depth0.myanimal_name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "myanimal_name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	<div class=\"item_arrow\"></div>\n</li>";
    return buffer;});
}});

window.require.define({"views/templates/myanimals": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n					<li class=\"mypetitem\" data-id=\"";
    foundHelper = helpers.sid;
    stack1 = foundHelper || depth0.sid;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sid", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\"> \n	<div data-id=\"";
    foundHelper = helpers.sid;
    stack1 = foundHelper || depth0.sid;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sid", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\" class=\"pet_image\" style=\"background-image:url('";
    foundHelper = helpers.thumb_retina;
    stack1 = foundHelper || depth0.thumb_retina;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "thumb_retina", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></div>\n	<div class=\"pet_name\">";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	<div class=\"item_arrow\"></div>\n	</li>\n  					 ";
    return buffer;}

    buffer += "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">My Animals</div>\n</div>\n\n<div id=\"myAnimals_page\" class=\"content_wrapper\">\n<h1>test</h1>\n	<div id=\"myPetScroll\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			<ul id=\"myanimals\" class=\"border_list\">\n				\n				\n\n\n				";
    foundHelper = helpers.pets;
    stack1 = foundHelper || depth0.pets;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n				 \n			</ul>\n		</div>\n	</div>\n</div>                  ";
    return buffer;});
}});

window.require.define({"views/templates/myanimalsEmpty": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">My Animals</div>\n</div>\n\n<div id=\"emptyMyAnimals_page\" class=\"content_wrapper\">\n	<div class=\"empty_page_line1\">Empty page instructions 1</div>\n	<div class=\"empty_page_line2\">Empty page instructions 2</div>\n</div>";});
}});

window.require.define({"views/templates/petdetail": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<div id=\"header\">\n	<div class=\"back_button\"></div>\n	<div id=\"header_title\" class=\"title\">";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n</div>\n\n<div id=\"petDetail_page\" class=\"content_wrapper\">\n	<div id=\"slider\" class=\"swipe\">\n	  <div class=\"swipe_container\">\n			\n			<div class=\"pet_detail\" style=\"display:block\">\n				<div class=\"block panel\">\n					<div class=\"front\">\n						<div class=\"card_content\">\n							<div class=\"image\" style=\"background-image:url('";
    foundHelper = helpers.petdetail_retina;
    stack1 = foundHelper || depth0.petdetail_retina;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "petdetail_retina", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></div>\n							<div class=\"detail1\">";
    foundHelper = helpers['three words'];
    stack1 = foundHelper || depth0['three words'];
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "three words", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n							<div class=\"detail2\">";
    foundHelper = helpers.city;
    stack1 = foundHelper || depth0.city;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "city", { hash: {} }); }
    buffer += escapeExpression(stack1) + ", ";
    foundHelper = helpers.state;
    stack1 = foundHelper || depth0.state;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "state", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n						</div>\n					</div>\n					<div class=\"card_back\">\n						<div class=\"card_content\">\n							<div class=\"pet_description align_center\" style=\"padding:7px 0 15px 0\">\n							\n\n								";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + " is a ";
    foundHelper = helpers.age;
    stack1 = foundHelper || depth0.age;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "age", { hash: {} }); }
    buffer += escapeExpression(stack1) + " year old ";
    foundHelper = helpers['animal type'];
    stack1 = foundHelper || depth0['animal type'];
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "animal type", { hash: {} }); }
    buffer += escapeExpression(stack1) + ". ";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + " is ";
    foundHelper = helpers['three words'];
    stack1 = foundHelper || depth0['three words'];
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "three words", { hash: {} }); }
    buffer += escapeExpression(stack1) + ". Below is ";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "'s shelter information.\n							</div>\n							<div class=\"card_bottom\">\n								<div class=\"shelter_name\">";
    foundHelper = helpers.sheltername;
    stack1 = foundHelper || depth0.sheltername;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sheltername", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n								<div class=\"shelter_address\">";
    foundHelper = helpers.address1;
    stack1 = foundHelper || depth0.address1;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "address1", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n								<div class=\"shelter_address\">";
    foundHelper = helpers.address2;
    stack1 = foundHelper || depth0.address2;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "address2", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n							</div>\n						</div>\n					</div>\n				</div>\n				<div class=\"detail_buttons\">\n					<div class=\"pet_sharegoals wide_button gray_button heart\">";
    foundHelper = helpers['facebook share count'];
    stack1 = foundHelper || depth0['facebook share count'];
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "facebook share count", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n					<div id=\"pet_moreinfo\" class=\"wide_button green_button active_yellow flip_action\">MORE INFO</div>\n				</div>\n				<div id=\"pet_share\" class=\"wide_button blue_button active_yellow\">SHARE ME</div>\n			</div>\n			\n	  </div>\n	</div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/profile": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">Profile</div>\n</div>\n\n<div id=\"profile_page\" class=\"content_wrapper\">\n	<div id=\"wrapper2\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			<div class=\"campaign_item\">\n				<div class=\"campaign_name\">Campaign Name 1</div>\n				<div class=\"campaign_details_left\">Completed: 2 of 7</div>\n				<div class=\"campaign_details_right\">Ends: 09/15/12</div>\n			</div>\n			<div class=\"campaign_item\">\n				<div class=\"campaign_name\">Campaign Name 1</div>\n				<div class=\"campaign_details_left\">Completed: 2 of 7</div>\n				<div class=\"campaign_details_right\">Ends: 09/15/12</div>\n			</div>\n			<div class=\"campaign_item\">\n				<div class=\"campaign_name\">Campaign Name 1</div>\n				<div class=\"campaign_details_left\">Completed: 2 of 7</div>\n				<div class=\"campaign_details_right\">Ends: 09/15/12</div>\n			</div>\n		</div>\n	</div>\n</div>";});
}});

window.require.define({"views/templates/settings": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div id=\"header_title\" class=\"title\">Settings</div>\n</div>\n\n<div id=\"settings_page\" class=\"content_wrapper\">\n	<div class=\"button gray_button active_gray\">Your Causes</div>\n	<div class=\"button gray_button active_gray\">Terms of Use</div>\n	<div class=\"button gray_button active_gray\">Privacy Policy</div>\n	<div class=\"button gray_button active_gray\">Log Out</div>\n</div>";});
}});

window.require.define({"views/templates/shelterDetail": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<div id=\"header\">\n	<div class=\"back_button\"></div>\n	<div id=\"header_title\" class=\"title\">Find a Shelter</div>\n</div>\n\n<div id=\"shelterDetails_page\" class=\"content_wrapper palette\">\n	<div class=\"shelter_spinner\">\n		<div class=\"spinnerWrapper\">	\n			<div class=\"spinner\">\n		    <div class=\"bar1\"></div>\n		    <div class=\"bar2\"></div>\n		    <div class=\"bar3\"></div>\n		    <div class=\"bar4\"></div>\n		    <div class=\"bar5\"></div>\n		    <div class=\"bar6\"></div>\n		    <div class=\"bar7\"></div>\n		    <div class=\"bar8\"></div>\n		    <div class=\"bar9\"></div>\n		    <div class=\"bar10\"></div>\n		    <div class=\"bar11\"></div>\n		    <div class=\"bar12\"></div>\n		  </div>\n		</div>\n	</div>\n	<div class=\"shelter_map\" style=\"background-image:url('";
    foundHelper = helpers.map_url;
    stack1 = foundHelper || depth0.map_url;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "map_url", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></div>\n	<div class=\"shelter_deets\">\n		<div class=\"shelter_name\">";
    foundHelper = helpers.title;
    stack1 = foundHelper || depth0.title;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n		<div class=\"shelter_address\">";
    foundHelper = helpers.address1;
    stack1 = foundHelper || depth0.address1;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "address1", { hash: {} }); }
    buffer += escapeExpression(stack1) + ", ";
    foundHelper = helpers.city;
    stack1 = foundHelper || depth0.city;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "city", { hash: {} }); }
    buffer += escapeExpression(stack1) + ", ";
    foundHelper = helpers.state;
    stack1 = foundHelper || depth0.state;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "state", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n		<div class=\"shelter_hours\">";
    foundHelper = helpers.hours;
    stack1 = foundHelper || depth0.hours;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "hours", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	</div>\n	<div class=\"clear\"></div>\n	<div class=\"wide_button red_button active_opacity centered\"><a href=\"tel:";
    foundHelper = helpers.phone;
    stack1 = foundHelper || depth0.phone;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "phone", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.phone;
    stack1 = foundHelper || depth0.phone;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "phone", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</a></div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/shelterForm": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n	<div class=\"back_button\"></div>\n	<div id=\"header_title\" class=\"title\">Find a Shelter</div>\n</div>\n\n<div id=\"shelterForm_page\" class=\"content_wrapper palette\" style=\"padding-bottom:1px\">\n	<form>\n		<div  class=\"label\">Zipcode</div>\n		<input id=\"shelter-z\" type=\"tel\" name=\"zip\" style=\"width:100%\" />\n		<input id=\"shelter-submit\" class=\"active_opacity\" type=\"submit\" name=\"findShelter_button\" value=\"Search!\" />\n	</form>\n</div>";});
}});

window.require.define({"views/templates/shelterList": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n				<li data-id=\"";
    foundHelper = helpers.nid;
    stack1 = foundHelper || depth0.nid;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "nid", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\" class=\"pet_item\">\n	<div class=\"pet_name\">";
    foundHelper = helpers.title;
    stack1 = foundHelper || depth0.title;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	<div class=\"item_arrow\"></div>\n</li>\n  					 ";
    return buffer;}

    buffer += "<div id=\"header\">\n	<div class=\"back_button\"></div>\n	<div id=\"header_title\" class=\"title\">Find a Shelter</div>\n</div>\n\n<div id=\"shelterList_page\" class=\"content_wrapper\">\n	<div class=\"shelters_header\">\n		<div class=\"shelters_near\">Animal Shelters near: ";
    foundHelper = helpers.zip;
    stack1 = foundHelper || depth0.zip;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "zip", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n		<div id=\"cancel-search\" class=\"box_button cancel_small\"></div>\n	</div>\n\n	<div id=\"shelterScroll\" class=\"scroll_wrapper scroller_down\">\n		<div id=\"scroller\">\n\n\n			<ul id=\"shelters\" class=\"border_list\">\n				";
    foundHelper = helpers.shelters;
    stack1 = foundHelper || depth0.shelters;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n				\n				\n			</ul>\n		</div>\n	</div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/shelterListItem": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<li class=\"pet_item\">\n	<div class=\"pet_name\">";
    foundHelper = helpers.shelter_name;
    stack1 = foundHelper || depth0.shelter_name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "shelter_name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	<div class=\"item_arrow\"></div>\n</li>";
    return buffer;});
}});

window.require.define({"views/templates/spinner": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class=\"spinnerModal\">\n  <div class=\"spinnerContainer\">\n		<div class=\"description\">Meow</div>\n		<div class=\"spinnerWrapper\">	\n			<div class=\"spinner\">\n		    <div class=\"bar1\"></div>\n		    <div class=\"bar2\"></div>\n		    <div class=\"bar3\"></div>\n		    <div class=\"bar4\"></div>\n		    <div class=\"bar5\"></div>\n		    <div class=\"bar6\"></div>\n		    <div class=\"bar7\"></div>\n		    <div class=\"bar8\"></div>\n		    <div class=\"bar9\"></div>\n		    <div class=\"bar10\"></div>\n		    <div class=\"bar11\"></div>\n		    <div class=\"bar12\"></div>\n		  </div>\n		</div>	\n  </div>\n</div>";});
}});

window.require.define({"views/templates/submitpet": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"header\">\n\n	<div id=\"header_title\" class=\"title\">Submit a Pet</div>\n	<div id=\"submit-cancel\" class=\"box_button_header box_button cancel_button\"></div>\n\n</div>\n\n<div id=\"submitPet_page\" class=\"content_wrapper\">\n	<div id=\"submitWrapper\" class=\"pet_scroll_wrapper scroll_wrapper scroller_down\">\n		<div id=\"scroller\">\n			<div id=\"submit_pet\" class=\"palette\" style=\"margin-bottom:25px\">\n				<div id=\"pet-preview\" class=\"pet_preview\" ></div>\n				<div id=\"retake-pet\" class=\"wide_button red_button active_opacity\">Retake Pic</div>\n				<form id=\"pet-form\">\n					<div class=\"label\">Animal Name</div>\n					<input id=\"pet_name\" type=\"text\" name=\"pet_name\" />\n					<div class=\"form_friends form_friends1\">\n						<div class=\"label\">Type</div>\n						<select name=\"pet_type\">\n							 <option value=\"Dog\">Dog</option>\n				  		<option value=\"Cat\">Cat</option>\n				  		<option value=\"Bird\">Bird</option>\n				  		<option value=\"Rabbit\">Rabbit</option>\n						</select>\n					</div>\n					<div class=\"form_friends form_friends1\">\n						<div class=\"label\">Age</div>\n						<input type=\"tel\" name=\"pet_age\" min=\"0\" max=\"100\" placeholder=\"In years\" />\n					</div>\n					\n					<div class=\"clear\"></div>\n					<div class=\"label\">Three words that describe this pet</div>\n					<div class=\"form_friends form_friends1\" style=\"height:35px\">\n						<input type=\"text\" name=\"pet_description1\" placeholder=\"Word 1\" />\n					</div>\n					<div class=\"form_friends form_friends1\" style=\"height:35px\">\n						<input type=\"text\" name=\"pet_description2\" placeholder=\"Word 2\" />\n					</div>\n					<div class=\"form_friends form_friends1\" style=\"height:35px\">\n						<input type=\"text\" name=\"pet_description3\" placeholder=\"Word 3\" />\n					</div>\n					<div class=\"clear\"></div>\n					<div class=\"label\">Shelter Name</div>\n					<input type=\"text\" name=\"shelter_name\" />\n					<div class=\"label\">Street Address</div>\n					<input type=\"text\" name=\"shelter_address\" />\n					<div class=\"label\">City</div>\n					<input type=\"text\" name=\"shelter_city\" />\n					<div class=\"form_friends form_friends2\">\n						<div class=\"label\">State</div>\n						<select name=\"shelter_state\" size=\"1\">\n							 	<option value=\"DNS\" selected>-</option>\n							 	<option value=\"AK\">AK</option>\n							 	<option value=\"AL\">AL</option>\n						  	<option value=\"AR\">AR</option>\n							  <option value=\"AZ\">AZ</option>\n							  <option value=\"CA\">CA</option>\n							  <option value=\"CO\">CO</option>\n							  <option value=\"CT\">CT</option>\n							  <option value=\"DE\">DE</option>\n							  <option value=\"FL\">FL</option>\n							  <option value=\"GA\">GA</option>\n							  <option value=\"HI\">HI</option>\n							  <option value=\"IA\">IA</option>\n							  <option value=\"ID\">ID</option>\n							  <option value=\"IL\">IL</option>\n							  <option value=\"IN\">IN</option>\n							  <option value=\"KS\">KS</option>\n							  <option value=\"KY\">KY</option>\n							  <option value=\"LA\">LA</option>\n							  <option value=\"MA\">MA</option>\n							  <option value=\"MD\">MD</option>\n							  <option value=\"ME\">ME</option>\n							  <option value=\"MI\">MI</option>\n							  <option value=\"MN\">MN</option>\n							  <option value=\"MO\">MO</option>\n							  <option value=\"MS\">MS</option>\n							  <option value=\"MT\">MT</option>\n							  <option value=\"NC\">NC</option>\n							  <option value=\"ND\">ND</option>\n							  <option value=\"NE\">NE</option>\n							  <option value=\"NH\">NH</option>\n							  <option value=\"NJ\">NJ</option>\n							  <option value=\"NM\">NM</option>\n							  <option value=\"NV\">NV</option>\n							  <option value=\"NY\">NY</option>\n							  <option value=\"OH\">OH</option>\n							  <option value=\"OK\">OK</option>\n							  <option value=\"OR\">OR</option>\n							  <option value=\"PA\">PA</option>\n							  <option value=\"RI\">RI</option>\n							  <option value=\"SC\">SC</option>\n							  <option value=\"SD\">SD</option>\n							  <option value=\"TN\">TN</option>\n							  <option value=\"TX\">TX</option>\n							  <option value=\"UT\">UT</option>\n							  <option value=\"VA\">VA</option>\n							  <option value=\"VT\">VT</option>\n							  <option value=\"WA\">WA</option>\n							  <option value=\"WI\">WI</option>\n							  <option value=\"WV\">WV</option>\n							  <option value=\"WY\">WY</option>\n						</select>\n					</div>\n					<div class=\"form_friends form_friends3\">\n						<div class=\"label\">Zip Code</div>\n						<input type=\"tel\" name=\"shelter_zip\" />\n					</div>\n					<div class=\"clear\"></div>\n					\n					<input id=\"pet-submit\" type=\"submit\" name=\"submit_pet\" class=\"login_button active_opacity\" value=\"Submit\" />\n				</form>\n			</div>\n		</div>\n	</div>\n</div>";});
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

