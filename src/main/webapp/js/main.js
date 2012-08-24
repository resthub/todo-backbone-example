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
        }
    },

    // Libraries
    paths:{
        jquery:"libs/jquery",
        underscore:"libs/underscore",
        'underscore.string':"libs/underscore.string",
        backbone:"libs/backbone",
        localstorage:"libs/localstorage",
        text:"libs/text",
        i18n:"libs/i18n",
        pubsub:"resthub/pubsub",
        handlebars:"libs/handlebars",
        'resthub-handlebars':"resthub/handlebars-helpers"
    },
    
    locale: localStorage.getItem('locale') || 'en-us'
});

// Load our app module and pass it to our definition function
require(['jquery', 'router', 'text!templates/main.html', 'i18n!nls/messages', 'views/app', ]
        , function($, AppRouter, main, messages, AppView){
    var mainTmpl = Handlebars.compile(main);
    $("body").html(mainTmpl({messages: messages}));
    new AppView({el: $("#todoapp")});
    new AppRouter;
    Backbone.history.start();
});