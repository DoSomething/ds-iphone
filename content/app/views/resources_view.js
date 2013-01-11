var View = require('./view');
var template = require('./templates/resources');

module.exports = View.extend({
	id: 'resources-view',
	template: template,
	events: {
		"tap .faq_item":"openLink"
	},

	render: function() {
		this.$el.html(this.template(this.item));
		this.enableScroll();
		return this;
	},

	enableScroll:function(){
		setTimeout(function(){
			var wrapperAccordian = new iScroll('wrapperAccordian',{useTransition:true,hScroll:false});
		},500);
	},
	
	openLink:function(e) {
		var childURL = $(e.currentTarget).data('url');
		window.plugins.childBrowser.showWebPage(childURL);
	}

});
