/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */

function Sorting() {
  this.sortByDateTime = function(folders, mode) {
    var o = mode == 'ASC' ? 1 : -1;

    return folders.sort(function(a, b) {
      aTime = Date.parse(a.mtime);
      bTime = Date.parse(b.mtime);
      return (aTime > bTime) ? o : ((bTime > aTime) ? -o : 0);
    });
  }

  this.sortByName = function(folders, mode) {
    var o = mode == 'ASC' ? 1 : -1;

    return folders.sort(function(a, b) {
      return (a.name > b.name) ? o : ((b.name > a.name) ? -o : 0);
    });
  }
}

module.exports = Sorting;