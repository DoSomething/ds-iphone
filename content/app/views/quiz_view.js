var View = require('./view');
var template = require('./templates/quiz');

module.exports = View.extend({
  id: 'quiz-view',
  template: template,
  cause_name_mapping: {
    'cause-animals': 'Animals',
    'cause-bullying': 'Bullying',
    'cause-disasters': 'Disasters',
    'cause-discrimination': 'Discrimination',
    'cause-education': 'Education',
    'cause-environment': 'Environment',
    'cause-health': 'Physical & Mental Health',
    'cause-human-rights': 'Human Rights',
    'cause-poverty': 'Homelessness & Poverty',
    'cause-relationships': 'Sex & Relationships',
    'cause-troops': 'Our Troops',
  },
  events: {
    'tap .action_button': 'submitQuiz',
    'tap img': 'selectCause',
    'pageshow': 'pageShow',
  },

  pageShow: function(e) {
    alert('page show');
  },

  initialize: function() {
    this.maxSelectedCauses = 3;
    this.selectedCauses = new Array();
  },

  render: function() {
    this.$el.html(this.template(this.getRenderData()));
    return this;
  },

  afterAppend: function() {
    var redrawList = false;

    for (i = 0; i < this.maxSelectedCauses; i++) {
      var sel = window.localStorage.getItem('cause-selection-' + i);
      if (sel) {
        this.selectedCauses[i] = sel;
        var elem = $('#' + sel);
        elem.addClass('selected');
        //$(sel).addClass('selected');

        redrawList = true;
      }
    }

    if (redrawList) {
      this.redrawList();
    }
  },

  selectCause: function(e) {
    var elem = $(e.target);
    var elemId = elem.attr('id');
    var len = this.selectedCauses.length;
    var redrawList = false;

    if (elem.hasClass('selected')) {
      elem.removeClass('selected');

      var removeId = elemId;
      for (i = 0; i < len; i++) {
        if (this.selectedCauses[i] == elemId) {
          this.selectedCauses[i] = '';

          // Remove selection from array
          this.selectedCauses.splice(i, 1);

          redrawList = true;
          break;
        }
      }
    }
    else {
      if (len < this.maxSelectedCauses) {
        this.selectedCauses[len] = elemId;
        elem.addClass('selected');

        redrawList = true;
      }
    }

    if (redrawList) {
      this.redrawList();
    }
  },

  submitQuiz: function() {
    // TODO: submit results to Flurry
    
    for (i = 0; i < this.maxSelectedCauses; i++) {
      if (this.selectedCauses[i]) {
        window.localStorage.setItem('cause-selection-' + i, this.selectedCauses[i]);
      }
    }

    if (window.plugins && window.plugins.FlurryPlugin) {
      window.plugins.FlurryPlugin.logEventWithParameters('causes-selected', {
        'cause-1': window.localStorage.getItem('cause-selection-0'),
        'cause-2': window.localStorage.getItem('cause-selection-1'),
        'cause-3': window.localStorage.getItem('cause-selection-2'),
      });
    }

    Application.router.navigate('#involved', {trigger: true});
  },

  redrawList: function() {
    for (i = 0; i < this.maxSelectedCauses; i++) {
        var listElem = $('#cause-selection-'+i);
        var displayIndex = i + 1;
        var newString = displayIndex + '. ';

        if (this.selectedCauses[i]) {
          newString += this.cause_name_mapping[this.selectedCauses[i]];
        }

        listElem.html(newString);
      }
  },

});
