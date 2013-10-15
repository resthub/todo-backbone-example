define(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/stats', 'i18n!nls/labels'],
    function($, _, Backbone, Resthub, statsTmpl, labels){
        var StatsView = Resthub.View.extend({

            events: {
                'click .todo-clear a': 'clearCompleted'
            },
            
            template: statsTmpl,
            
            context: function() {
                var done = this.collection.done().length;
                var remaining = this.collection.remaining().length;
                return {
                    total:      this.collection.length,
                    done:       done,
                    remaining:  remaining,
                    labels:   labels
                };
            },

            initialize: function() {
                _.bindAll(this, 'render');
                // Add this context in order to allow automatic removal of the calback with dispose()
                this.listenTo(this.collection, 'all',  this.render);
            },

            // Clear all done todo items, destroying their models.
            clearCompleted: function() {
                _.each(this.collection.done(), function(todo){ todo.clear(); });
                return false;
            },

            render: function() {
                // Call super render function with the same arguments
                StatsView.__super__.render.apply(this, arguments);
                this.$(".todo-count").attr("aria-atomic", "true");
            }

        });
        return StatsView;
    });