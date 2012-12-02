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
