/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
var fs     = require('fs'  );
var path   = require('path');
var mime   = require('mime');

function Folder(config) {
  this.list = function(dir, callback) {
    dir = config.path + '/' + dir;
    if(dir.slice(-1) == '/')
      dir = dir.substring(0, dir.length - 1);

    var contents = {
      dirs : [],
      files: []
    }

    fs.readdir(dir, function(err, folder) {
      if(err)
        throw err;

      folder.map(function(r) {
        return dir + '/' + r;
      }).filter(function(r) {
        return fs.statSync(r).isDirectory() ? r : config.exts.indexOf(path.extname(r)) > -1;
      }).forEach(function(r) {
        var file = fs.statSync(r);
        
        var fileInfo = {
          url  : r,
          name : r.split(config.path)[1],
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
          fileInfo.thumb = r.replace(config.path, config.thumbs.path);
        }
        else {
          tag               = 'dirs';
          fileInfo.contents = fs.readdirSync(r).map(function(s) {
            return r.replace(config.path, config.thumbs.path) + '/' + s;
          });
        }

        contents[tag].push(fileInfo);
      });
      
      callback(contents);
    });
  };
}

module.exports = Folder;