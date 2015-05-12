/*global Backbone, jQuery, _, ENTER_KEY, CLICK_KEY, elementName, elementBirth */
var app = app || {};
var currentPage = 1;
var count = 1;
var start = 3 * (currentPage - 1) + 1;
var end = start + 2;
var flag = true;
(function ($) {
    'use strict';

    app.AppView = Backbone.View.extend({
        el: '#todoapp',
        events: {
            'keypress #idBirthday': 'createOnEnter',
            'click #insert': 'createOnClick',
            'click .abcd': 'clickPagination',
            'click .sort': 'SortData'
        },
        initialize: function () {
            elementName = this.$('#idname');
            elementBirth = $('#idBirthday');
            this.disable();
            this.$list = $('#todo-list');
            this.listenTo(app.todos, 'add', this.clickPagination);
            this.listenTo(app.todos, 'reset', this.clickPagination);
            this.listenTo(app.todos, 'remove', this.pagination);
            app.todos.fetch({reset: true});
        },
        SortData: function (ev) {
            var value = $(ev.target).attr('id');
            app.todos.SortData(value);
            this.clickPagination(this);
        },
        clickPagination: function (ev) {
            $("#todo-list tr").remove();
            if ($(ev.target).attr('id') === undefined) {
                currentPage = 1;
            }
            else {
                currentPage = $(ev.target).attr('id');
            }
            start = 3 * (currentPage - 1);
            end = start + 2;
            for (var i = 0; i < app.todos.length; i++) {
                if (i >= start && i <= end) {
                    this.addOne(app.todos.at(i),currentPage);
                }
            }
        },
        addOne: function (todo,currentPage) {
            var view = new app.TodoView({model: todo});
            this.$list.append(view.render().el);
            this.pagination(currentPage);
        },
        pagination: function (currentPage) {
            var numpage = parseInt(app.todos.length / 3);
            if (numpage * 3 < app.todos.length) {
                numpage++;
            }
            $("#pager").empty();
            for (var i = 1; i <= numpage; i++) {
                this.addPagelink(i,currentPage);
            }
        },
        addPagelink: function (id,currentPage) {
            var div = $("#pager");
            if (id === parseInt(currentPage)) {
                div.append('<a style="text-decoration: none;" class="abcd" Id="' + id + '" href="#">page ' + id + '</a>&nbsp&nbsp');
                $("#"+currentPage+"").attr("class", "style");
            }
            else {
                div.append('<a style="text-decoration: none;" class="abcd" Id="' + id + '" href="#">page ' + id + '</a>&nbsp&nbsp');
                $("#"+id+"").attr("class", "abcd");
            }
        },
        newAttributes: function () {
            return {
                Id: app.todos.nextOrder(),
                Name: elementName.val().trim(),
                Birthday: elementBirth.val().trim(),
                order: app.todos.nextOrder(),
                completed: false
            };
        },
        createOnEnter: function (e) {
            if (e.which === ENTER_KEY && elementName.val().trim() && elementBirth.val().trim()) {
                app.todos.create(this.newAttributes());
                elementName.val('');
                elementBirth.val('');
                this.disable();
            }
        },
        disable: function () {
            elementName.attr("disabled", "disabled");
            elementBirth.attr('disabled', "disabled");
            $('#insert').attr("value", "Add");
        },
        enable: function () {
            elementName.removeAttr("disabled", "disabled");
            elementBirth.removeAttr('disabled', "disabled");
        },
        createOnClick: function (e) {
            if ($("#insert").val() === "Add") {
                this.enable();
                $('#insert').attr("value", "Save");
            }
            else if (e.which === CLICK_KEY && elementName.val().trim() && elementBirth.val().trim()) {
                app.todos.create(this.newAttributes());
                elementName.val('');
                elementBirth.val('');
                this.disable();
            }
        }
    });
})(jQuery);
