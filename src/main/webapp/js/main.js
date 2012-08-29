// Set the require.js configuration for your application.
require.config({

    shim:{
        'underscore':{
            exports:'_'
        },
        'underscore.string':{
            deps:[
                'underscore'
            ],
            exports:'_s'
        },
        'handlebars':{
            exports:'Handlebars'
        },
        'backbone-orig':{
            deps:[
                'underscore',
                'underscore.string',
                'jquery'
            ],
            exports:'Backbone'
        },
        'backbone-paginator':{
            deps:[
                'backbone-orig',
                'underscore',
                'jquery'
            ],
            exports:'Backbone.Paginator'
        }
    },

    // Libraries
    paths:{
        jquery:'libs/jquery',
        underscore:'libs/underscore',
        'underscore.string':'libs/underscore.string',
        'backbone-orig':'libs/backbone',
        'backbone':'resthub/backbone.ext',
        localstorage:'libs/localstorage',
        text:'libs/text',
        i18n:'libs/i18n',
        pubsub:'resthub/pubsub',
        handlebars:'libs/handlebars',
        'resthub-handlebars':'resthub/handlebars-helpers',
        hbs: 'resthub/handlebars-require',
        'backbone-paginator':'libs/backbone.paginator'
    },
    
    locale: localStorage.getItem('locale') || 'en-us'
});

// Load our app module and pass it to our definition function
require(['backbone', 'router', 'i18n!nls/messages', 'views/app', 'collections/todos']
        , function(Backbone, AppRouter, messages, AppView, Todos){
    new AppView({root: $('#todoapp')});
    new AppRouter;
    Backbone.history.start();
});