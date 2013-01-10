module.exports = Backbone.Model.extend({

  idAttribute: 'gid',

  defaults: {
    'challengesCompleted': 0,
    'numChallenges': 0,
  },

});