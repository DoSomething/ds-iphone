var View = require('./view');
var template = require('./templates/shelterDetail');

module.exports = View.extend({
  	id: 'shelter-view',
    template: template,
    events: {

    
    },
    initialize: function(){



    },
   
    render: function(){
      var x ={};
      $(this.el).html(this.template(this.item));
      //test="steve";
      //alert(test);
      return this; // for chainable calls, like .render().el

    }
    

		
		
  });