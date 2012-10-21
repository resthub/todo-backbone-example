define(['jquery', 'underscore', 'backbone', 'hbs!template/stats', 'i18n!nls/messages'],
    function($, _, Backbone, statsTmpl, messages){
        var StatsView = Backbone.ResthubView.extend({

            events: {
                'click .todo-clear a': 'clearCompleted'
            },
            template: statsTmpl,

            initialize: function() {
                _.bindAll(this, 'render');
                // Add this context in order to allow automatic removal of the calback with dispose()
                this.collection.on('all',  this.refresh, this);
            },

            refresh: function() {
                var done = this.collection.done().length;
                var remaining = this.collection.remaining().length;
                this.render({
                    total:      this.collection.length,
                    done:       done,
                    remaining:  remaining,
                    messages:   messages
                })
            },

            // Clear all done todo items, destroying their models.
            clearCompleted: function() {
                _.each(this.collection.done(), function(todo){ todo.clear(); });
                return false;
            }

        });
        return StatsView;
    });