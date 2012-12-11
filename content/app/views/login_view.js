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
  fbAppId: '525191857506466',
  fbPermissions: ['email', 'user_about_me'],

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
        Application.loginView.finishLogin();
      },
    });
  },

  authFacebook: function(e) {
    window.plugins.facebookConnect.login(
      {
        permissions: this.fbPermissions,
        appId: this.fbAppId,
      },

      function(result) {
        if (result.cancelled || result.error) {
          alert("FacebookConnect.login:failedWithError:" + result.message);
        }
        else {
          Application.loginView.onAuthFacebookSuccess(result);
        }
      }
    );
  },

  onAuthFacebookSuccess: function(result) {
    var data = {
      "access_token": result.accessToken,
    };

    // Use the auth token to then create / login to our Drupal backend
    $.ajax({
      url: Application.baseURL + 'rest/user/fblogin.json',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',

      error: function(textStatus, errorThrown) {
        alert(JSON.stringify(textStatus));
      },

      success: function(data) {
        Application.loginView.finishLogin();
      },
    });
  },

  // Save logged_in var and navigate to profile screen
  finishLogin: function() {
    window.localStorage.setItem("user_logged_in","true");

    Application.router.navigate("#profile", {trigger: true});
    $('#profile_tab').addClass('tab_wrapper_active');

    alert('Login successful.');
  },

  goRegister: function(e) {
    Application.router.navigate('#login_register', {trigger: true});
  }

});
