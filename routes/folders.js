/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
var fs      = require('fs'            );
var path    = require('path'          );
var mime    = require('mime'          );
var thumb   = require('node-thumbnail').thumb;
var mkdirp  = require('mkdirp'        );
var config  = require('../config'     );
var Sorting = require('../lib/sorting');
var Folder  = require('../lib/folder' );

exports.list = function(req, res) {
  var dir     = !!req.params[0] ? req.params[0] : '';
  var folder  = new Folder(config);
  var sorting = new Sorting();

  folder.list(dir, function(folders) {
    folders.dirs.forEach(function(dir) {
      var destination = config.thumbs.path + '/' + dir.name;
      if(!fs.existsSync(destination))
        mkdirp.sync(destination);

      thumb({
        source     : dir.url.replace(config.images.url, config.images.path),
        destination: destination,
        concurrency: config.thumbs.cpu,
        width      : config.thumbs.width,
        suffix     : ''
      }, function(err) {
        if(err === undefined)
          console.dir('All done!');
        else
          console.dir(err);
      });
    });

    switch(config.sort.by) {
    case 'name':
      var contents = {
        dirs : sorting.sortByName(folders.dirs,  config.sort.mode),
        files: sorting.sortByName(folders.files, config.sort.mode)
      }
      res.json(contents);
      break;
    case 'lastModify':
      var contents = {
        dirs : sorting.sortByDateTime(folders.dirs,  config.sort.mode),
        files: sorting.sortByDateTime(folders.files, config.sort.mode)
      }
      res.json(contents);
      break;
    default:
      res.json(folders);
    }
  });
};

exports.search = function(req, res) {
  var keyword = req.params[0];
  var folder  = new Folder(config);

  folder.search(keyword, function(results) {
    res.json(results);
  });
};

exports.img = function(req, res) {
  var file    = config.images.path + '/' + req.params[0];
  var ext     = req.params[0].split('.');
  var img     = fs.readFileSync(file);
  var headers = {
    'Content-Type' :  mime.lookup(file),
    'Cache-Control': 'public, max-age=' + config.maxAge
  }

  res.writeHead(200, headers);
  res.end(img, 'binary');
};

exports.thumb = function(req, res) {
  var file    = config.thumbs.path + '/' + req.params[0];
  var ext     = req.params[0].split('.');
  var img     = fs.readFileSync(file);
  var headers = {
    'Content-Type' :  mime.lookup(file),
    'Cache-Control': 'public, max-age=' + config.maxAge
  }

  res.writeHead(200, headers);
  res.end(img, 'binary');
};