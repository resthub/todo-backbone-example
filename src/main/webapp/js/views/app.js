define(['jquery', 'underscore', 'backbone', 'resthub-handlebars', 'hb!templates/app.html', 'i18n!nls/messages', 'views/todos', 'views/stats', 'collections/todos'],
    function($, _, Backbone, Handlebars, appTmpl, messages, TodosView, StatsView, Todos){
        var AppView = Backbone.View.extend({

            events: {
                "keypress #new-todo":  "createOnEnter",
                "keyup #new-todo":     "showTooltip"
            },

            initialize: function(options) {
                this.$root = options.root;
                this.render();
                Todos.fetch();
            },

            render: function() {
                this.$el.html(appTmpl({messages: messages}));
                this.$root.append(this.$el);
                this.input = this.$el.find("#new-todo");

                new TodosView({root: $('#todos')});
                new StatsView({root: $('#todo-stats')});
            },

            // Generate the attributes for a new Todo item.
            newAttributes: function() {
                return {
                    content: this.input.val(),
                    order:   Todos.nextOrder(),
                    done:    false
                };
            },

            // If you hit return in the main input field, create new **Todo** model,
            // persisting it to *localStorage*.
            createOnEnter: function(e) {
                if (e.keyCode != 13) return;
                Todos.create(this.newAttributes());
                this.input.val('');
            },

            // Lazily show the tooltip that tells you to press `enter` to save
            // a new todo item, after one second.
            showTooltip: function(e) {
                var tooltip = this.$(".ui-tooltip-top");
                var val = this.input.val();
                tooltip.fadeOut();
                if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
                if (val == '' || val == this.input.attr('placeholder')) return;
                var show = function(){ tooltip.show().fadeIn(); };
                this.tooltipTimeout = _.delay(show, 1000);
            }

        });
        return AppView;
    });