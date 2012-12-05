var View = require('./view');
var template = require('./templates/petdetail');

module.exports = View.extend({
  	id: 'pet-view',
    template: template,
    events: {
    "tap #pet_share" : "fbShare",
		"tap .flip_action" : "flipCard"

    
    },
    initialize: function(){



    },
    fbShare:function(){

      var dialogOptions = {
            link: 'https://apps.facebook.com/dosomethingapp/submit-pet-picture/submission/' + this.item.sid ,
            picture: this.item.image,
            name: 'DoSomething.org\'s Pics For Pets',
            caption: 'Hi. I\'m ' + this.item.name + '.  I\'m '+ this.item["three words"],
            description: 'Do Something about homeless animals, share photos of shelter pets and help them find homes. The more shares a pet gets the better chance it\'ll be adopted, their shelter will also be rewarded for every share!'
        };
    //alert('hello');
       
       if (window.localStorage.getItem("user_dos_auth")){
        window.plugins.facebookConnect.login({permissions: ["email", "user_about_me","publish_stream"], appId: "105775762330"}, 
      function(result) {
        
          window.plugins.facebookConnect.dialog('feed', dialogOptions, function(response) {
            console.log("FacebookConnect.dialog:" + JSON.stringify(response));
        });
        //console.log("FacebookConnect.login:" + JSON.stringify(result));
        if(result.cancelled || result.error) {
          console.log("FacebookConnect.login:failedWithError:" + result.message);
          return;}});

        

      }else{

                window.localStorage.setItem("session_redirect", "#pet");

                Application.sessionView.authFb();
           

      }



   
       
     
    },
    routerSharePet:function(){


    },
    shareGoals:function(){
      cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/prizes.html" );
  
  
    },
    render: function(){
      var x ={};
      $(this.el).html(this.template(this.item));
      //test="steve";
      //alert(test);
      return this; // for chainable calls, like .render().el

    },
    flipCard: function(){
        var action = $('.flip_action'); 
            var card = action.parent().prev();
            var shareWidth = $('.card_back .temperature',card).attr('data-width');
            if (action.hasClass('return')) {
                action.removeClass('return');
                action.html('MORE INFO');
                card.removeClass('card_flip');
                //$('.back .temperature',card).css('width','0%');
            } else {    
                action.addClass('return'); 
                action.html('BACK TO PIC');
                card.addClass('card_flip');
                setTimeout(function(){ $('.card_back .temperature',card).css('width',shareWidth); },400);
            }
        }
       
    

		
		
  });