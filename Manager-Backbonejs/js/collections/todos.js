/*global Backbone */
var app = app || {};
var flag = true;
(function () {
    'use strict';
    var Todos = Backbone.Collection.extend({
        model: app.Todo,
        localStorage: new Backbone.LocalStorage('todos-backbone'),
        nextOrder: function () {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        comparator: 'order',
        SortData: function (ev) {
            var value = ev;
            app.todos.comparator = function (a, b) {
                var a = a.get('' + value + ''),
                        b = b.get('' + value + '');
                if (a === b)
                    return 0;
                return flag ? a > b ? -1 : 1 : a > b ? 1 : -1;
            };
            app.todos.sort();
            flag = !flag;
        }
    });
    app.todos = new Todos();
})();
