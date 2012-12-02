//http://picsforpets.dosomething.org/pics-for-pets/shelter-search/json/78704
var Shelter = require('./shelter');

module.exports = Backbone.Collection.extend({
	
	model: Shelter,
	url: 'http://www.dosomething.org/fb/pics-for-pets/shelter-search/json/',
	zip: "",
	handle: function(){

		return {"shelters": this.toJSON(),"zip":this.zip};

	}








});
