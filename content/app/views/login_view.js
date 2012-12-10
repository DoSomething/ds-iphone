var View = require('./view');
var template = require('./templates/login');

module.exports = View.extend({
  id: 'login-view',
  template: template,
  events: {
    "submit form": "login",
    "tap #register_button": "goRegister",
  },

  render: function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  },

  login: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();

    var data = {
      "email": email,
      "password": password,
    };

    $.ajax({
      url: 'http://www.dosomething.org/rest/user/login.json',
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

        alert('Login successful.');
      },
    });
  },

  goRegister: function(e) {
    Application.router.navigate('#login_register', {trigger: true});
  }

});
