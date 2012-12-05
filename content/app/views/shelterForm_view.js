var View = require('./view');
var Shelters = require('../models/shelters');
var template = require('./templates/shelterForm');


module.exports = View.extend({
  id: 'shelterForm-view',
  template: template,
  events:{
    "tap #shelter-submit":"getShelters",
    "sheltersLoaded":"append",



  },

   
  initialize: function() {  
	 this.shelterList = new Shelters();
    this.shelterList.shelterJSON ={};
    
    
  
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
  append: function(){
    //alert("refresh fired")
    this.shelterList.shelterJSON = this.shelterList.handle();
    //this.petList.each(function(pet){console.log(pet.get("name"))});
    //console.log(js);

    //http://picsforpets.dev.zivtech.com/sites/default/files/styles/thumbnail_retina/public/fb_campaign/

        
    Application.router.navigate("#shelters",{trigger:true} );


    //this.enableScroll();

    //this.petList.each(function(pet){console.log(pet.get("name"))});

  },
  
  getShelters:function(e){
    e.preventDefault();
    var zip = $('#shelter-z').val();

    //alert(zip);
    this.shelterList.zip = zip;
    this.shelterList.url = 'http://www.dosomething.org/fb/pics-for-pets/shelter-search/json/' + zip + '/';
    this.shelterList.fetch({

      
      add:false,
      success:function(){
         //alert("fire");
         //Application.galleryView.$el.trigger("dataLoaded");
        //Application.router.navigate("#page2",{trigger: true});
                 Application.shelterFormView.$el.trigger("sheltersLoaded");



      }
    });



    //alert("search");
  }

});
