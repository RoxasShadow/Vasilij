/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
var config = require('../config');

exports.index = function(req, res) {
  res.render('index', { title: 'Vasilij', config: config });
};