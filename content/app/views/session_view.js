var View = require('./view');
var template = require('./templates/loginSplash');

module.exports = View.extend({
  id: 'session-view',
  template: template,
  events: 		{

  		"tap #facebook_login":"authFb",
  	
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
  authFb: function(){

  	window.plugins.facebookConnect.login({permissions: ["email", "user_about_me","publish_stream"], appId: "105775762330"}, 
  		function(result) {
  			
  			Application.sessionView.successFb(result);
  			//console.log("FacebookConnect.login:" + JSON.stringify(result));
  			if(result.cancelled || result.error) {
  				console.log("FacebookConnect.login:failedWithError:" + result.message);
  				return;}});
		//	window.plugins.facebookConnect.requestWithGraphPath("me/feed", "options", "POST", "callback")
	


},
successFb: function(result){

	//alert("success");
	// store login state
	window.localStorage.setItem("user_fb_auth", true);
  window.localStorage.setItem("fb_auth_token", result.accessToken )
  //console.log(result);
  //this.authDos(fbtoken);

   data = {access_token: result.accessToken,group_name:"PicsforPetsSharers2012"};
    $.ajax({
      url: "https://www.dosomething.org/?q=rest/user/fblogin.json",
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',

      error: function(textStatus, errorThrown) {
        alert(JSON.stringify(textStatus));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function(data) {
            //alert('page_login_submit - SUCCESS!');
            //$('#result').html(JSON.stringify(data));
            //alert('dos success');
            //Application.sessionView.sucessDoS();
            
              window.localStorage.setItem("user_dos_auth", true);
              try{
                var len = data["session_name"].length;
                window.localStorage.setItem("user_dos_sessname", data["session_name"].substring(1,len) + '='+ data["sessid"]);
                //alert(data["session_name"]);


              } catch (e) {

                //alert("Error using mycommand: " + e.message);

              }
              var redirectLoc = window.localStorage.getItem("session_redirect");
              if (redirectLoc == "false"){

                return;
              }else{
                              Application.router.navigate(redirectLoc , {trigger: true});


              }
              // handle cancel button on camera to send user back to gallery instead of back to session


          }
        });





},
authDoS:function(token){

   


},
sucessDoS:function(){
  alert("before redirect");
    window.localStorage.setItem("user_dos_auth", true);
     

    //this.redirect();


},
redirect:function(){
   


}




});
