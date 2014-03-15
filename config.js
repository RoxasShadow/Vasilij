/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
var config = {};

// Your images folder
config.path  = '../images';

// Set the following line to false if you have a webserver that serves you static resources or you have just put your images folder in public/.
// Your images will be available to /dirname/ (where dirname is the name of your images folder).
config.serve = true;

// The image extensions to show
config.exts  = [ '.jpg', '.jpeg', '.bmp', '.png', '.gif' ];

// Sort images and folders
config.sort  = {
  mode: 'DESC',      // ASC   DESC
  by  : 'lastModify' // name  lastModify
};

// Image served by Vasilij will be put in browser cache for 30 days
config.maxAge = '2592000';

// Thumbnails configuration
config.thumbs = {
  path   : '../thumbs',
  width  : 500,
  cpu    : 8
};

module.exports = config;