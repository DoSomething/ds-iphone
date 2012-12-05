// Base class for all collections.
var Pet = require('./pet');

module.exports = Backbone.Collection.extend({
	
	model: Pet,
	url: 'http://www.dosomething.org/services/pets/dosomething_views/pics_for_pets_gallery.json',
	handle: function(){

		return {"pets": this.toJSON()};

	},
	parse: function(response){
		response.thumbnail = response.UserId;



		response.forEach(function(a){
			var len = a.image.length ; 
			var baseUrl="http://files.dosomething.org/files/styles/";

			//http://picsforpets.dosomething.org/files/styles/thumbnail_retina/public/fb_campaign/e19f001231380fbca8_7.jpeg


			//"http://files.dosomething.org/files/cdv_photo_004.jpg"
			//http://files.dosomething.org/files/styles/thumbnail_retina/public/cdv_photo_004.jpg

			if (a.image.substring(0,35) == "http://files.dosomething.org/files/"){
				a.thumb_retina = baseUrl+ "thumbnail_retina/public/" + a.image.substring(35,len);
				a.thumb_reg = baseUrl+ "thumbnail_regular/public/" + a.image.substring(35,len);
				a.petdetail_reg = baseUrl+ "petdetail_regular/public/" + a.image.substring(35,len);
				a.petdetail_retina = baseUrl+ "petdetail_retina/public/" + a.image.substring(35,len);

			}else{
				a.thumb_retina = baseUrl+ "thumbnail_retina/public/fb_campaign/" + a.image.substring(47,len);
				a.thumb_reg = baseUrl+ "thumbnail_regular/public/fb_campaign/" + a.image.substring(47,len);
				a.petdetail_reg = baseUrl+ "petdetail_regular/public/fb_campaign/" + a.image.substring(47,len);
				a.petdetail_retina = baseUrl+ "petdetail_retina/public/fb_campaign/" + a.image.substring(47,len);

			}
			if(a["existing shelter"]==""){
				a.sheltername = a["shelter name"];
				a.address1 = a.street
				a.address2 = a.city + ', ' + a.state + ' ' + a.zip;
			
			}else{

				var lines = a["existing shelter address"].split(/\n/);
				a.sheltername = a["existing shelter"];
				a.address1 = lines[0];
				a.address2 = lines[1];
			}
			if ( a["facebook share count"] < 1){

				a["facebook share count"] = "1";

			}



			
		});

		return response;
	}








});
