var Campaign = require('./campaign');

module.exports = Backbone.Collection.extend({
	
	model: Campaign,
	url: 'http://apps.dosomething.org/m_ios_app_api/?q=campaigns',
	handle: function(){

		return { "campaigns": this.toJSON() };
		
	},
	parse: function(response){
		response.forEach(function(a){
			
			
		})
		
	}

	});
