/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
var fs      = require('fs'                );
var path    = require('path'              );
var mime    = require('mime'              );
var config  = require('../config'         );
var Folder  = require('../models/folder'  );
var Sorting = require('../helpers/sorting');

exports.list = function(req, res) {
  var dir     = !!req.params[0] ? req.params[0] : '';
  var folder  = new Folder(config);
  var sorting = new Sorting();

  folder.list(dir, function(folders) {
    var contents;

    switch(config.sort.by) {
    case 'name':
      contents = {
        dirs : sorting.sortByName(folders.dirs,  config.sort.mode),
        files: sorting.sortByName(folders.files, config.sort.mode)
      }
      break;
    case 'lastModify':
      contents = {
        dirs : sorting.sortByDateTime(folders.dirs,  config.sort.mode),
        files: sorting.sortByDateTime(folders.files, config.sort.mode)
      }
      break;
    default:
      contents = folders;
    }

    res.json(contents);
  });
};

exports.img = function(req, res) {
  var file = config.path + '/' + req.params[0];
  var ext  = req.params[0].split('.');
  fs.readFile(file, function(err, img) {
    res.writeHead(200, { 'Content-Type': mime.lookup(file) });
    res.end(img, 'binary');
  });
};