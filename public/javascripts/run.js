/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
var curl;

(function() {
  curl({
    main    : 'improvisation',
    packages: {
      improvisation: { location: '/javascripts/improvisation'                        },
      curl         : { location: '/javascripts/lib/curl/src/curl'                    },
      jquery       : { location: '/javascripts/lib/jquery/jquery',         main: '.' },
      Backbone     : { location: '/javascripts/lib/backbone-amd/backbone', main: '.' },
      underscore   : { location: '/javascripts/lib/lodash/lodash',         main: '.' },
      humanize     : { location: '/javascripts/lib/humanize/humanize',     main: '.' }
    }
  });
}());
