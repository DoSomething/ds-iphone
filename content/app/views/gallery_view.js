var View = require('./view');
var template = require('./templates/gallery');
var store = {};

module.exports = View.extend({
	id: 'gallery-view',
	template: template,
	events: {
		"dataLoaded":"append",
		"tap .gallery_thumbnail":"openImage"
	},

	render: function() {

		$.ajax({
			url: this.item.gallery.feed,
			type: "GET",
			success: function(data) {
				store = data;
				Application.galleryView.$el.trigger("dataLoaded");

			},
			error: function(textStatus, errorThrown) {
				console.log(JSON.stringify(errorThrown));
				// Application.router.navigate("#home", {trigger: true});
			}
		});
		return this;
	},

	append: function() {
		this.$el.html(this.template(store));			
		this.enableScroll();
	},

	enableScroll:function(){
		var wrapperGallery = new iScroll('wrapperGallery',{useTransition:true,hScroll:false});
	},

	openImage:function(e) {	
		Application.imageView.imageURL = $(e.currentTarget).data('url');
		Application.router.navigate("#image", {trigger: true});
	}

});
