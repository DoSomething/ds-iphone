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
			processData:true,
			add:true,
			success:function(){
				alert("wizza");
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
