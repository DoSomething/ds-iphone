var View = require('./view');
var template = require('./templates/gallery');

module.exports = View.extend({
	id: 'gallery-view',
	template: template,
	events: {
		"dataLoaded":"append",
		"tap .gallery_thumbnail":"openImage"
	},

	render: function() {
		
		// call json, set up append and dataloaded
		
		this.$el.html(this.template(this.item));
		return this;
	},
	
	append: function() {
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
