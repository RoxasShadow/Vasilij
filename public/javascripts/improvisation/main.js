/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
define(function(require) {
  var Backbone            = require('Backbone'             );
  var ImprovisationModel  = require('./ImprovisationModel' );
  var ImprovisationView   = require('./ImprovisationView'  );
  var ImprovisationRouter = require('./ImprovisationRouter');
  var $                   = require('jquery'               );

  var router = new ImprovisationRouter;
  var prevId = '';

  router.on('route:getWall', function(id) {
    console.log(id);
    if(id == '../') {
      var params = prevId.split('/');
          id     = params[params.length - 2];

      if(id === undefined)
        id = '';
        
      new Backbone.Router().navigate('#/wall/' + id, { trigger: true });
    }
    else if(id == null)
      id = '';

    var model = new ImprovisationModel({ id: id });
    model.fetch();

    var improvisation = new ImprovisationView({
      el   : $('.improvisation').first(),
      model: model
    });

    prevId = id;
  });

  router.on('route:default', function(actions) {
    new Backbone.Router().navigate('#/wall/', { trigger: true });
  });

  Backbone.history.start();
});