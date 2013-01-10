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
        Application.loginView.finishLogin(data);
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
        Application.loginView.finishLogin(data);
      },
    });
  },

  // Save logged_in var and navigate to profile screen
  finishLogin: function(data) {
    window.localStorage.setItem('user_logged_in','true');

    // Parse through gids looking for campaigns the user's already signed up for
    var campaigns = Application.involvedView.campaignList.campaignJSON.campaigns;
    for (var i = 0; i < data.user.group_audience.und.length; i++) {
      var gid = data.user.group_audience.und[i].gid;

      // Check if gid is in campaigns list
      for (var j = 0; j < campaigns.length; j++) {
        if (campaigns[j].campaign.gid == gid) {

          // Found matching gid. Add to profile collection.
          var profileItemData = {
            gid: gid,
            campaign: campaigns[j].campaign,
            challenges: campaigns[j].challenges,
            numChallenges: campaigns[j].challenges.length,
          };

          Application.profile.update(profileItemData, {remove: false});

          break;
        }
      }
    }

    // Saves profile data to LocalStorage
    Application.profile.saveToLocalStorage();

    // Change back to the Profile screen
    Application.router.navigate('#profile', {trigger: true});
    $('#profile_tab').addClass('tab_wrapper_active');

    alert('Login successful.');
  },

  goRegister: function(e) {
    Application.router.navigate('#login_register', {trigger: true});
  }

});
