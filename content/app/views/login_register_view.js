var View = require('./view');
var template = require('./templates/loginRegister');

module.exports = View.extend({
  id: 'login-register-view',
  template: template,
  events: {
    'submit #registerForm': 'loginRegisterSubmit',
  },
   
  initialize: function() {  

  },

  render: function() {  
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  },

  enableScroll:function(){
    var scroll = new iScroll('wrapper2');
  },

  afterRender: function() {
  
  },

  loginRegisterSubmit: function(e) {
    e.preventDefault();

    var email = $('input[name=email]').val();
    var cell = $('input[name=cell]').val();
    var f_name = $('input[name=first_name]').val();
    var l_name = $('input[name=last_name]').val();
    var bday = $('input[name=birthday]').val();
    var password = $('input[name=password]').val();

    var data = {
      "name": email,
      "pass": password,
      "mail": email,
      "profile_main": {
        "field_user_birthday": {
          "und": [
            {
              "value": {
                "date": bday,
              },
            },
          ],
        },
        "field_user_first_name": {
          "und": [
            {
              "value": f_name,
            },
          ],
        },
        "field_user_last_name": {
          "und": [
            {
              "value": l_name,
            },
          ],
        },
        "field_user_mobile": {
          "und": [
            {
              "value": cell,
            },
          ],
        },
      },
    };

    $.ajax({
      url: 'http://www.dosomething.org/rest/user/register.json',
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
