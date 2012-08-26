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
        'backbone':{
            deps:[
                'underscore',
                'underscore.string',
                'jquery'
            ],
            exports:'Backbone'
        },
        'backbone-paginator':{
            deps:[
                'backbone',
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
        backbone:'libs/backbone',
        localstorage:'libs/localstorage',
        text:'libs/text',
        i18n:'libs/i18n',
        pubsub:'resthub/pubsub',
        handlebars:'libs/handlebars',
        'resthub-handlebars':'resthub/handlebars-helpers',
        hb: 'resthub/handlebars-require',
        'backbone-paginator':'libs/backbone.paginator'
    },
    
    locale: localStorage.getItem('locale') || 'en-us'
});

// Load our app module and pass it to our definition function
require(['backbone', 'router', 'hb!templates/todos.html', 'i18n!nls/messages', 'views/app']
        , function(Backbone, AppRouter, mainTmpl, messages, AppView){
    new AppView({root: $('#todoapp')});
    new AppRouter;
    Backbone.history.start();
});