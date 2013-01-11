var View = require('./view');
var template = require('./templates/image');
var imagedata = {};

module.exports = View.extend({
	id: 'image-view',
	template: template,
	cache: false,
	events: {
		"dataLoaded":"append"
	},
	render: function(){
		imagedata = {imageURL:this.imageURL};
		this.append();
	},
	
	append: function() {
		this.$el.html(this.template(imagedata));			
	},
	
	afterRender: function() {
		$('#theimage').attr('src',Application.imageView.imageURL);
	},

});
