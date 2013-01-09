var View = require('./view');
var template = require('./templates/howto');

module.exports = View.extend({
	id: 'howto-view',
	template: template,
	events: {
		"tap .question_wrapper":"openAnswer"
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

	openAnswer:function(e) {	
		$(e.currentTarget).next().toggle();
		$('.item_arrow',e.currentTarget).toggleClass('item_arrow_active');
	}

});
