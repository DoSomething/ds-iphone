var View = require('./view');
var template = require('./templates/fur');
//var templateAction = require('./templates/guide');
var templateAction2 = require('./templates/shelterForm');
var petDetailView = require("views/guide_view");


module.exports = View.extend({
  id: 'fur-view',
  template: template,
  events: {
    "tap #fur_action" : "actionGuide",
    "tap #fur_pic" : "takePic",
		"tap #fur_shelter" : "shelterForm"
  

    

  },

  initialize: function() {  








  },
  
  takePic:function(){


    if (window.localStorage.getItem("user_dos_auth")){
              Application.furView.launchCamera();

      }else{
                window.localStorage.setItem("session_redirect", "#camera");

                Application.router.navigate("#session" , {trigger: true});

      }


    
  },
  launchCamera:function(){
    var destinationType; 
      navigator.camera.getPicture(onSuccess, onFail, { quality: 50, allowEdit : true, correctOrientation:true  });








      function onSuccess(imageURI) {

        // Get image handle
        //
        Application.router.navigate("#submitpet", {trigger: true});

        //$("#pet-preview").append('<img src="'  + imageURI + '" width=300>' );
        $('#pet-preview').css('background-image', 'url("' + imageURI + '")');

        Application.furView.uploadImage(imageURI);

        // Unhide image elements
        //


    }

    function onFail(message) {
      if (message == "no image selected" && window.localStorage.getItem("session_redirect") == "#camera"){

              //Application.router.navigate("#gallery", {trigger: true});

      }
    }


  },

  render: function() {
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  },
  actionGuide: function(){
    //this.$el.html(templateAction(this.getRenderData()));
    //Application.router.navigate("#actionguide");
    Application.router.navigate("#actionguide", {trigger: true});
  },
  shelterForm: function(){
    //this.$el.html(templateAction2(this.getRenderData()));
    //Application.router.navigate("#shelterform");
    Application.router.navigate("#shelterform", {trigger: true});
  },
  uploadImage:function(imageURI){

    //alert(imageURI);



 
    //Application.submitView.$el.trigger("photoUploadComplete");


    try {
    
    var options = new window.FileUploadOptions();
    options.fileKey="files[pet_0]";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);

    var params = new Object();
    var sessname = window.localStorage.getItem("user_dos_sessname");
    params.headers = {"Cookie" : sessname };

    options.params = params;
    

    var ft = new window.FileTransfer();
    ft.upload(imageURI, "http://www.dosomething.org/?q=rest/file/create_raw.json", this.uploadImageSuccess, this.uploadImageFailure, options);

  } catch (e) {

    alert("Error using mycommand: " + e.message);

  } finally {

    // do something smart here :^)

    }
 


  },
  uploadImageSuccess:function(r){
    //alert("Code = " + r.responseCode + " | Response = " + r.response +" | Sent = " + r.bytesSent);
    //r.response.message
    window.localStorage.setItem("pet_photo_upload_complete","true");
    if (window.localStorage.getItem("submit_pet_btn_pressed") =="true"){

        Application.submitView.submit();

    }

      window.robj = r;
      var res =  JSON.parse(decodeURI(r.response));
      window.localStorage.setItem("pet_fid",res[0].fid);


  
      
  },
  uploadImageFailure:function(){
      alert("An error has occurred: Code = " = error.code);


  },

  afterRender: function() {

    //$('.tab').removeClass('tab_active');
    //$('#furtograph_tab').addClass('tab_active');

  }




});
