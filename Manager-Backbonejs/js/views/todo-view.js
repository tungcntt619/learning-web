/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY, CLICK_KEY, elementName, elementBirth */
var app = app || {};

(function ($) {
    'use strict';

    app.TodoView = Backbone.View.extend({
        tagName: 'tr',
        events: {
            'click .dlt': 'clear',
            'click .edit': 'updateOnEnter',
            'click .btnedit': 'enable'
        },
        template: _.template($('#item-template').html()),
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            elementName = $('#idname');
            elementBirth = $('#idBirthday');
        },
        updateOnEnter: function (e) {
            if (e.which === CLICK_KEY) {
                this.close();
            }
        },
        close: function () {
            var Name = elementName.val();
            var Namevalue = Name.trim();
            var Birthday = elementBirth.val();
            var Birthdayvalue = Birthday.trim();

            if (Namevalue && Birthdayvalue) {

                this.model.save({Name: Namevalue, Birthday: Birthdayvalue});
                this.render();
                this.disable();
                $('.edit').removeAttr("disabled", "disabled");
            }
        },
        disable: function () {
            elementName.attr("disabled", "disabled");
            elementBirth.attr('disabled', "disabled");
        },
        enable: function (model) {
            elementName.removeAttr("disabled", "disabled");
            elementBirth.removeAttr('disabled', "disabled");
            $('.edit').attr("disabled", "disabled");
            var index = this.model.attributes.Id;
            $("#" + index + "").removeAttr("disabled", "disabled");
            $("#" + index + "").text("Save");
            elementName.val(this.model.attributes.Name);
            elementBirth.val(this.model.attributes.Birthday);
        },
        render: function () {

            if (this.model.changed.id !== undefined) {
                return;
            }
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        clear: function () {
            this.model.destroy();
        }
    });
})(jQuery);
