define([
  'underscore', 'backbone', 'resthub', 'hbs!template/todos', 'view/todo-view', 'i18n!nls/labels'],
  function(_, Backbone, Resthub, todosTmpl, TodoView, labels){
  var TodosView = Resthub.View.extend({

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click .mark-all-done': 'toggleAllComplete'
    },
    
    template: todosTmpl,
    labels : labels,

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function(options) {
      _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

      // Add this context in order to allow automatic removal of the callback with dispose()
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.refresh);

      this.render();

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
      new TodoView({root: $('#todo-list'), model: todo});
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
