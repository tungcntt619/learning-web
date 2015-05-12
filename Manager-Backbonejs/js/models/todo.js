/*global Backbone */
var app = app || {};

(function () {
	'use strict';
	app.Todo = Backbone.Model.extend({
		defaults: {
                        Id:'',
			Name: '',
                        Birthday:'',
			completed: false
		}
	});
})();
