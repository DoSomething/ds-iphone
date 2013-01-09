var View = require('./view');
var template = require('./templates/actions');

module.exports = View.extend({
	id: 'actions-view',
	template: template,
	events: {
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
	}

});
