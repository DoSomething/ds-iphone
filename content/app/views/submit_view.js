var View = require('./view');
var template = require('./templates/submitpet');

module.exports = View.extend({
  id: 'submit-view',
  template: template,
  events: {

    "tap #submit-cancel":"cancel",
    "tap #retake-pet":"retake",
    "tap #pet-submit":"submitBtn",
    "photoUploadComplete":"postPet"
  },

  initialize: function() {  








  },
  retake:function(){

    Application.furView.takePic();
  },
  cancel:function(e){
    e.preventDefault();
    $("#footer").show();
     $('.tab').removeClass('tab_active');
      $('#gallery_tab').addClass('tab_active');
    $.mobile.activePage.back = true;
    window.history.back();


  },
  render: function() {
  	$('#footer').hide();
  	var t = {};
   this.$el.html(this.template(t));
   this.afterRender();
  	//return this;

  },

  setPetAttr:function(){
    window.localStorage.setItem("pet_name" , $('[name=pet_name]').val());
    window.localStorage.setItem("pet_type" , $('[name=pet_type]').val());
    window.localStorage.setItem("pet_age" , $('[name=pet_age]').val());

    window.localStorage.setItem("pet_description1" , $('[name=pet_description1]').val());
    window.localStorage.setItem("pet_description2" , $('[name=pet_description2]').val());
    window.localStorage.setItem("pet_description3" , $('[name=pet_description3]').val());
    
    window.localStorage.setItem("shelter_name" , $('[name=shelter_name]').val());
    window.localStorage.setItem("shelter_address" , $('[name=shelter_address]').val());
    window.localStorage.setItem("shelter_city" , $('[name=shelter_city]').val());
    window.localStorage.setItem("shelter_state" , $('[name=shelter_state]').val());
    window.localStorage.setItem("shelter_zip" , $('[name=shelter_zip]').val());




  },
  postPet:function(){


   
    var pet_name = window.localStorage.getItem("pet_name");
    var pet_age = window.localStorage.getItem("pet_age");
    var pet_type = window.localStorage.getItem("pet_type");
    var pet_description1 = window.localStorage.getItem("pet_description1");
    var pet_description2 = window.localStorage.getItem("pet_description2");
    var pet_description3 = window.localStorage.getItem("pet_description3");
    var pet_fid = window.localStorage.getItem("pet_fid");
    var shelter_name = window.localStorage.getItem("shelter_name");
    var shelter_address = window.localStorage.getItem("shelter_address");
    var shelter_city = window.localStorage.getItem("shelter_city");
    var shelter_state = window.localStorage.getItem("shelter_state");
    var shelter_zip = window.localStorage.getItem("shelter_zip");
                        //alert(pet_name);



    var data = {
    "nid": "724609",
    "webform_submission": {
        "nid": "724609"
    },
    "field_fb_app_animal_name": {
        "und": [
            {
                "value": pet_name
            }
        ]
    },
    "field_fb_app_animal_type": {
        "und": pet_type
    },
    
    "field_fb_app_age": {
        "und": [
            {
                "value": pet_age
            }
        ]
    },
    "field_fb_app_three_words": {
        "und": [
            {
                "value": pet_description1
            },
            {
                "value": pet_description2
            },
            {
                "value": pet_description3
            }
        ]
    },
    "field_fb_app_image": {
        "und": [
            {
                "fid": pet_fid

            }
        ]
    },
    "field_fb_app_shelter_name": {
        "und": [
            {
                "value": shelter_name
            }
        ]
    },
    "field_fb_app_address": {
        "und": [
            {
                "value": shelter_address
            }
        ]
    },
    "field_fb_app_city": {
        "und": [
            {
                "value": shelter_city
            }
        ]
    },
    "field_fb_app_state": {
        "und": shelter_state
    },
    "field_fb_app_zip": {
        "und": [
            {
                "value": shelter_zip
            }
        ]
      }
    };

    $.ajax({
      url: "http://www.dosomething.org/services/pets/webform_submission.json",
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',

      error: function(textStatus, errorThrown) {
        //alert('page_submitPet_submit - failed to post');
        //alert(JSON.stringify(textStatus));
        //console.log(JSON.stringify(errorThrown));
      },
      success: function(data) {
        Application.galleryView.reloadList();
       
        }
      });



    //alert("search");
  },
  submitBtn:function(e){
        e.preventDefault();
        var formError;
        $("#pet-form input[type=text]").each(function() {

                if(this.value == "") {
                    formError=true;
                    return
                }

            });

        if(formError){
            alert("All fields required!")

        }else{

          
                   this.setPetAttr();
        window.localStorage.setItem("submit_pet_btn_pressed","true");

        this.submit();
        //alert('submitbtn');
        }
                  
      



  }, 

  submit:function(){


    if (window.localStorage.getItem("pet_photo_upload_complete") == "true"){


        this.postPet();
            $('#footer').show();

        Application.router.navigate("#gallery",{trigger:true} );
        //reset data for next submission
        window.localStorage.setItem("submit_pet_btn_pressed","false");
        window.localStorage.setItem("pet_photo_upload_complete","false");





    }else{
              $('#footer').show();

          Application.router.navigate("#gallery",{trigger:true} );


    }





  },
  enableScroll:function(){
    var scroll = new iScroll('submitWrapper');
  },

  afterRender: function() {


  }




});
