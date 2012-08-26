define([
  'underscore',
  'backbone',
  'resthub-handlebars',
  'collections/todos',
  'hb!templates/todos.html',
  'views/todo',
  'i18n!nls/messages'
  ], function(_, Backbone, Handlebars, Todos, todosTmpl, TodoView, messages){
  var TodosView = Backbone.View.extend({

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click .mark-all-done": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function(options) {
      _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');
      
      this.$root = options.root;

      Todos.bind('add',     this.addOne);
      Todos.bind('reset',   this.addAll);
      Todos.bind('all',     this.render);

      this.$el.html(todosTmpl({messages: messages}));
      this.$root.append(this.$el);

    },

    render: function() {
        var remaining = Todos.remaining().length;
        this.allCheckbox = this.$el.find(".mark-all-done")[0];
        this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      new TodoView({root: $('#todo-list'), model: todo});
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Todos.each(this.addOne);
    },

    // Change each todo so that it's `done` state matches the check all
    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      Todos.each(function (todo) { todo.save({'done': done}); });
    }

  });
  return TodosView;
});
