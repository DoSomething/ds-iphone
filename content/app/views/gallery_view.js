var View = require('./view');
var template = require('./templates/gallery');
var store = {};
var allajax = {};
var page = 1;

module.exports = View.extend({
	id: 'gallery-view',
	template: template,
	events: {
		"dataLoaded":"append",
		"dataLoaded2":"append2",
		"tap .galleryItem":"openImage",
		"tap #loadMore" : "loadMore"
	},

	render: function() {
		$.ajax({
			url: this.item.gallery.feed,
			type: "GET",
			data: {"page": page},
			success: function(data) {
				store = data;
				allajax = data;	
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

	append2: function() {
		this.$el.html(this.template(allajax));			
		this.enableScroll();
	},

	loadMore: function() {
		page = page +1;
		$.ajax({
			url: this.item.gallery.feed,
			type: "GET",
			processData:true,
			add:true,
			data: {"page": page},
			success: function(data) {
				alert('inajax');
				var someajax = (allajax.image_items);
				var someajax2 = (data.image_items);
				allajax = someajax.concat(someajax2);
				allajax = {"image_items":allajax};
				console.log(allajax);
				Application.galleryView.$el.trigger("dataLoaded2");

			},
			error: function(textStatus, errorThrown) {
				console.log(JSON.stringify(errorThrown));
				// Application.router.navigate("#home", {trigger: true});
			}
		});

	},

	enableScroll:function(){
		var wrapperGallery = new iScroll('wrapperGallery',{useTransition:true,hScroll:false});
	},

	openImage:function(e) {	
		Application.imageView.imageURL = $(e.currentTarget).data('url');
		Application.router.navigate("#image", {trigger: true});
	}

});
