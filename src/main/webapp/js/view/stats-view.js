define(['jquery', 'underscore', 'backbone', 'hbs!template/stats', 'i18n!nls/labels'],
    function($, _, Backbone, statsTmpl, labels){
        var StatsView = Backbone.ResthubView.extend({

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
                this.collection.on('all',  this.render, this);
            },

            // Clear all done todo items, destroying their models.
            clearCompleted: function() {
                _.each(this.collection.done(), function(todo){ todo.clear(); });
                return false;
            }

        });
        return StatsView;
    });