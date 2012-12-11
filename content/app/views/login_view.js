var View = require('./view');
var template = require('./templates/login');

module.exports = View.extend({
  id: 'login-view',
  template: template,
  events: {
    "submit form": "login",
    "tap #register_button": "goRegister",
    "tap #facebook_login": "authFacebook",
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
      url: Application.baseURL + 'rest/user/login.json',
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

  authFacebook: function(e) {
    window.plugins.facebookConnect.login(
      {
        permissions: ['email', 'user_about_me', 'publish_stream'],
        appId: '525191857506466',
      },

      function(result) {
        if (result.cancelled || result.error) {
          alert("FacebookConnect.login:failedWithError:" + result.message);
        }
        else {
          Application.LoginView.onAuthFacebookSuccess(result);
        }
      }
    );
  },

  onAuthFacebookSuccess: function(result) {
    alert("fb auth success - fb_id:"+result.id+" / user_fb_auth:true / fb_auth_token:"+result.accessToken);
  },

  goRegister: function(e) {
    Application.router.navigate('#login_register', {trigger: true});
  }

});
