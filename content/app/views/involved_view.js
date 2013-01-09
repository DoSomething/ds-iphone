var View = require('./view');
var template = require('./templates/involved');
var campaignView = require('./campaign_view');
var Campaigns = require('../models/campaigns');

module.exports = View.extend({
  id: 'involved-view',
  template: template,
  events: {
		"dataLoaded":"append",
		"tap .campaign_thumb":"openCampaign"
	},

  render: function() {	  
		this.campaignList = new Campaigns();
		this.campaignList.campaignJSON = {};
		
		this.campaignList.fetch({
			processData:true,
			add:true,
			success:function(){
		   	Application.involvedView.$el.trigger("dataLoaded");
			}
            
		});
		
		this.$el.html(this.template(this.campaignList.campaignJSON));
  	return this;
  },

  enableScroll:function(){
  	var wrapperInvolved = new iScroll('wrapperInvolved',{useTransition:true,hScroll:false});
  },

  append: function(){
  	this.campaignList.campaignJSON = this.campaignList.handle();
  	this.$el.html(this.template(this.campaignList.campaignJSON));
  	this.enableScroll();
	},
	
  openCampaign: function(e){
		e.preventDefault();
  	var x = $(e.currentTarget).data('id');
    var cell = 0;
    
    for(i=0; i<this.campaignList.campaignJSON.campaigns.length; i++)
    {
  
        if(this.campaignList.campaignJSON.campaigns[i].campaign.gid == x)
            {
                cell = i;
                break;
            }
     
    }

    Application.campaignView.item = this.campaignList.campaignJSON.campaigns[cell]; 
    Application.router.navigate("#campaign", {trigger: true});
  },

});
