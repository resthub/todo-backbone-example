define(['jquery', 'underscore', 'backbone', 'resthub-handlebars', 'hb!templates/stats.html', 'collections/todos', 'i18n!nls/messages'],
    function($, _, Backbone, Handlebars, statsTmpl, Todos, messages){
        var StatsView = Backbone.View.extend({

            events: {
                'click .todo-clear a': 'clearCompleted'
            },

            collection: Todos,

            initialize: function(options) {
                this.$root = options.root;
                this.$root.html(this.$el);
                _.bindAll(this, 'render');
                // Add this context in order to allow automatic removal of the calback with dispose()
                Todos.on('all',  this.render, this);
            },

            render: function() {
                var done = Todos.done().length;
                var remaining = Todos.remaining().length;

                this.$el.html(statsTmpl({
                    total:      Todos.length,
                    done:       done,
                    remaining:  remaining,
                    messages:   messages
                }));
            },

            // Clear all done todo items, destroying their models.
            clearCompleted: function() {
                _.each(Todos.done(), function(todo){ todo.clear(); });
                return false;
            }

        });
        return StatsView;
    });