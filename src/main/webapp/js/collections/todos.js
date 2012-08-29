define(['underscore', 'backbone', 'backbone-paginator', 'models/todo'], function(_, Backbone, BackbonePaginator, Todo){
	  
	var TodosCollection = BackbonePaginator.requestPager.extend({

    // Reference to this collection's model.
    model: Todo,

    url: 'api/todo',

    paginator_core: {
        url: 'api/todo?'
    },

    paginator_ui: {
         currentPage: 'all' // Hardcoded for the moment
    },

    server_api:{
        'page':function () {
            return this.currentPage;
        }
    },

    parse:function (response) {
        var todos = response.content;
        this.totalPages = response.totalPages;
        this.totalRecords = response.totalElements;
        this.lastPage = this.totalPages;
        return todos;
    },

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    }

  });
  return new TodosCollection;
});
