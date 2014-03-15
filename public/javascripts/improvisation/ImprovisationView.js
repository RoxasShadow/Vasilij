/*
 * Copyright (c) 2014 Giovanni Capuano <webmaster@giovannicapuano.net>
 * Released under the MIT License
 * http://opensource.org/licenses/MIT
 */
 
define(function(require) {
	var Backbone = require('Backbone'  );
	var $        = require('jquery'    );
	var _        = require('underscore');
	var humanize = require('humanize'  );

	return Backbone.View.extend({
		initialize: function() {
			var template  = $('#improvisation-template').html();
			this.template = _.template(template);

			var grid      = $('#improvisation-grid-template').html();
			this.grid     = _.template(grid);

			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			var template = this.template(this.model.attributes);
			this.$el.html(template);

			var title = this.model.id.split('/');
					title = title[0] == '' ? 'Vasilij' : title.join('/');

			$('title' ).text(title + (title == 'Vasilij' ? '' : ' | Vasilij'));
			$('#title').html(title);

			var grid     = this.grid(this.model.attributes);
			var elements = grid.split('</li>');
			var gridElem = $('#og-grid');

			for(var i = 0, len = elements.length; i < len; ++i) {
				var items = $(elements[i] + '</li>').appendTo(gridElem);
				Grid.addItems(items);
			}
      
      new Blazy({
      	selector: '.lazy'
      });
		}
	});
})