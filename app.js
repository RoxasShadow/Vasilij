/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
var express = require('express'         );
var path    = require('path'            );
var config  = require('./config'        );
var routes  = require('./routes'        );
var folders = require('./routes/folders');

var app    = express();
app.set('views',       path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/',          routes.index);
app.get('/folders',   folders.list);
app.get('/folders/*', folders.list);

if(config.serve) {
  var folder = config.path.split('/').pop();
  app.get('/' + folder + '/*', folders.img);

  if(config.thumbs.enabled) {
    var thumb = config.thumbs.path.split('/').pop();
    app.get('/' + thumb + '/*', folders.thumb);
  }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.use(function(req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.configure('development', function() {
  app.use(function(err, req, res, next) {
    response = {
      message: err.message,
      error  : err
    };

    res.json(response);
  });
});

app.configure('production', function() {
  app.use(function(err, req, res, next) {
    response = {
      message: err.message,
      error  : {}
    };

    res.json(response);
  });
});

module.exports = app;