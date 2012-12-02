var View = require('./view');
var template = require('./templates/shelterList');

module.exports = View.extend({
  	id: 'shelter-list',
    template: template,
    events: {
        "tap #cancel-search":"cancel",
        "tap .pet_item": "renderShelter"

    
    },
    initialize: function(){



    },
      cancel:function(e){
        e.preventDefault();
          $.mobile.activePage.back = true;
          window.history.back();

    },
   
    render: function(){
      var x ={};
      $(this.el).html(this.template(Application.shelterFormView.shelterList.shelterJSON));
     
    
      return this; // for chainable calls, like .render().el

    },
    renderShelter: function(e){
    //alert("test");
    e.preventDefault();
    var id = $(e.currentTarget).data("id");
    //alert(id);
    var item = Application.shelterFormView.shelterList.get(id);
    var address = item.attributes.address1 + ' ' + item.attributes.city + "," + item.attributes.state;
    address = encodeURIComponent(address);
    item.attributes.map_url = "http://maps.googleapis.com/maps/api/staticmap?center="  +address +"&zoom=14&size=282x150&markers=color:blue%7Clabel:S%7C "+ address+ " &sensor=false";
    item.attributes.hours = $(item.attributes.hours).text();
    //encodeURIComponent(link)
    //var name = item.get("name");
    Application.shelterDetail.item = item.toJSON();    
    //stackNavigator.pushView(petDetail);
    Application.router.navigate("#shelter" , {trigger: true});

    //petDetail.render();

  },
  enableScroll:function(){
      var scroll = new iScroll('shelterScroll');
  }
    

		
		
  });