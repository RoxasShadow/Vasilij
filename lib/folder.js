/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
var fs   = require('fs'  );
var path = require('path');
var mime = require('mime');
var walk = require('walk');

function Folder(config) {
  this.list = function(dir, callback) {
    dir = config.images.path + '/' + dir;
    if(dir.slice(-1) == '/')
      dir = dir.substring(0, dir.length - 1);

    var contents = {
      dirs : [],
      files: []
    };

    fs.readdir(dir, function(err, folder) {
      if(folder === undefined)
        return;
      
      folder.map(function(r) {
        return dir + '/' + r;
      }).filter(function(r) {
        return fs.statSync(r).isDirectory() ? r : config.exts.indexOf(path.extname(r)) > -1;
      }).forEach(function(r) {
        var file = fs.statSync(r);
        
        var fileInfo = {
          url  : r.replace(config.images.path, config.images.url),
          name : r.split(config.images.url)[1],
          atime: file.atime,
          mtime: file.mtime,
          ctime: file.ctime
        };

        if(fileInfo.name.charAt(0) == '/')
          fileInfo.name = fileInfo.name.slice(1);

        var tag;
        if(file.isFile()) {
          tag            = 'files';
          fileInfo.size  = file.size;
          fileInfo.mime  = mime.lookup(r);
          fileInfo.thumb = r.replace(config.images.path, config.thumbs.url);
        }
        else {
          tag               = 'dirs';
          fileInfo.contents = fs.readdirSync(r).map(function(s) {
            return r.replace(config.images.path, config.thumbs.url) + '/' + s;
          });
        }

        contents[tag].push(fileInfo);
      });
      
      callback(contents);
    });
  };

  this.search = function(keyword, callback) {
    var dir      = config.images.path;
    var files    = [];
    var dirs     = [];
    var walker   = walk.walk(dir);
        keyword  = keyword.toUpperCase();

    walker.on('file', function(root, stat, next) {
      if(~stat.name.toUpperCase().indexOf(keyword) && ~config.exts.indexOf(path.extname(stat.name)))
        files.push(root.replace(config.images.path, config.images.url) + '/' + stat.name);
      next();
    });

    walker.on('directories', function(root, stats, next) {
      stats.forEach(function(stat) {
        if(~stat.name.toUpperCase().indexOf(keyword))
          dirs.push(stat.name);
      });
      next();
    });
    
    walker.on('end', function() {
      callback({
        dirs : dirs,
        files: files
      });
    });
  };
}

module.exports = Folder;