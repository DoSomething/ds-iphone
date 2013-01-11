
module.exports = Backbone.Model.extend({
	
	url: 'http://apps.dosomething.org/m_ios_app_api/?q=campaigns',
	handle: function(){

		return { "campaigns": this.toJSON() };
		
	}
		
	});
