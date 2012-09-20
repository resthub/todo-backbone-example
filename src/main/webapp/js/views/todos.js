define([
  'underscore', 'backbone', 'resthub-handlebars', 'collections/todos', 'hbs!templates/todos', 'views/todo', 'i18n!nls/messages'],
  function(_, Backbone, Handlebars, TodoCollection, todosTmpl, TodoView, messages){
  var TodosView = Backbone.View.extend({

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click .mark-all-done': 'toggleAllComplete'
    },
    template: todosTmpl,

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function(options) {
      _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

      // Add this context in order to allow automatic removal of the calback with dispose()
      this.collection.on('add',     this.addOne, this);
      this.collection.on('reset',   this.addAll, this);
      this.collection.on('all',     this.refresh, this);

      this.render({messages: messages});

      // Fetch unpaginated collection
      this.collection.fetch({ data: { page: 'no'} });
    },

    refresh: function() {
        var remaining = this.collection.remaining().length;
        // this.$() is a shortcut for this.$el.find()
        this.allCheckbox = this.$('.mark-all-done')[0];
        this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var todoView = new TodoView({root: $('#todo-list'), model: todo});
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
        this.collection.each(this.addOne);
    },

    // Change each todo so that it's `done` state matches the check all
    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.collection.each(function (todo) { todo.save({'done': done}); });
    }

  });
  return TodosView;
});
