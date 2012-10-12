define(['jquery', 'underscore', 'backbone', 'hbs!templates/app', 'i18n!nls/messages', 'views/todosView', 'views/statsView', 'collections/todos'],
    function($, _, Backbone, appTmpl, messages, TodosView, StatsView, Todos){
        var AppView = Backbone.ResthubView.extend({

            events: {
                'keypress #new-todo':  'createOnEnter',
                'keyup #new-todo':     'showTooltip'
            },
            collection: new Todos(),
            template: appTmpl,

            initialize: function() {
                this.render({messages: messages});
                // this.$() is a shortcut for this.$el.find().
                this.input = this.$('#new-todo');
                new TodosView({root: this.$('#todos'), collection: this.collection});
                new StatsView({root: this.$('#todo-stats'), collection: this.collection});
            },

            // Generate the attributes for a new Todo item.
            newAttributes: function() {
                return {
                    content: this.input.val(),
                    order:   this.collection.nextOrder(),
                    done:    false
                };
            },

            // If you hit return in the main input field, create new **Todo** model,
            // persisting it to *localStorage*.
            createOnEnter: function(e) {
                if (e.keyCode != 13) return;
                this.collection.create(this.newAttributes());
                this.input.val('');
            },

            // Lazily show the tooltip that tells you to press `enter` to save
            // a new todo item, after one second.
            showTooltip: function(e) {
                var tooltip = this.$('.ui-tooltip-top');
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