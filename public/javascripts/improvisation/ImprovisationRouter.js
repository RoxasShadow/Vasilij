/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
define(function(require) {
  var Backbone = require('Backbone');

  return Backbone.Router.extend({
    routes: {
      'wall/*id': 'getWall',
      '*actions': 'default'
    }
  });
});
