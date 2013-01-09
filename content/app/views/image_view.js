var View = require('./view');
var template = require('./templates/image');

module.exports = View.extend({
	id: 'image-view',
	template: template,
	events: {
	},

	afterRender: function() {
		$('#theimage').attr('src',Application.imageView.imageURL);
	},

});
