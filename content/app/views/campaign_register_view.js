var View = require('./view');
var template = require('./templates/campaignRegister');

module.exports = View.extend({
	id: 'campaign-register-view',
	template: template,
	events: {
		'submit #registerForm': 'loginRegisterSubmit',
	},

	enableScroll:function(){
		setTimeout(function(){
			var scroll = new iScroll('wrapper2');
			},500);
		},

		loginRegisterSubmit: function(e) {
			e.preventDefault();

			var email = $('input[name=email]').val();
			var cell = $('input[name=cell]').val();


			var data = {
				"name": email,
				"cell": cell
			};

			$.ajax({
				url: Application.baseURL + 'rest/user/register.json',
				type: 'POST',
				data: JSON.stringify(data),
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',

				error: function(textStatus, errorThrown) {
					alert(JSON.stringify(textStatus));
				},

				success: function(data) {
					window.localStorage.setItem("user_logged_in","true");
					Application.router.navigate("#profile", {trigger: true});

					alert('Registration successful.');
				}
			});
		}

	});
