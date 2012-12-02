// Base class for all collections.
var Pet = require('./pet');

module.exports = Backbone.Collection.extend({
	
	model: Pet,
	url: 'http://picsforpets.dev.zivtech.com/services/pets/dosomething_views/pics_for_pets_gallery.json',
	handle: function(){

		return {"pets": this.toJSON()};

	},
	parse: function(response){
		response.thumbnail = response.UserId;
		response.forEach(function(a){
			var len = a.image.length ; 
			var baseUrl="http://picsforpets.dev.zivtech.com/sites/default/files/styles/";
			a.thumb_retina = baseUrl+ "thumbnail_retina/public/fb_campaign/" + a.image.substring(67,len);
			a.thumb_reg = baseUrl+ "thumbnail_regular/public/fb_campaign/" + a.image.substring(67,len);
			a.petdetail_reg = baseUrl+ "petdetail_regular/public/fb_campaign/" + a.image.substring(67,len);
			a.petdetail_retina = baseUrl+ "petdetail_retina/public/fb_campaign/" + a.image.substring(67,len);



			
		});

		return response;
	}








});
