var View = require('./view');
var template = require('./templates/settings');

module.exports = View.extend({
	id: 'settings-view',
	template: template,
	events: {
		'tap #logout': 'logout',
		'tap #causes': 'causes',
		'tap #terms': 'terms',
		'tap #privacy': 'privacy'
	},

	initialize: function() {  


	},

	render: function() {	
		//disable taps on tab again
		//$('#gallery_tab').unbind();
		this.$el.html(this.template(this.getRenderData()));
		this.afterRender();
		return this;
	},

	afterRender: function() {

	},
	
	causes: function() {
		
	},
	terms: function() {
		cordova.exec("ChildBrowserCommand.showWebPage", "http://www.google.com");
		
	},
	privacy: function() {
		cordova.exec("ChildBrowserCommand.showWebPage", "http://www.google.com");
		
	},

	logout: function(e) {
		$.ajax({
			url: Application.baseURL + 'rest/user/logout.json',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',

			error: function(textStatus, errorThrown) {
				// TODO handle scenario where user is not logged in
				window.localStorage.setItem("user_logged_in","false");
				alert(JSON.stringify(textStatus));
			},

			success: function(data) {
				window.localStorage.setItem("user_logged_in","false");

				alert('Logged out');
			},
		});
	}

});
