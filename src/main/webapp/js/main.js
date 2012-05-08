// Set the require.js configuration for your application.
require.config({

  // Libraries
  paths: {
    jquery: "libs/jquery",
    underscore: "libs/underscore",
    'underscore.string': "libs/underscore.string",
    backbone: "libs/backbone",
    localstorage: "libs/localstorage",
    use: "libs/use",
    text: "libs/text",
    i18n: "libs/i18n"
  },
  locale: localStorage.getItem('locale') || 'en-us'
});

// Load our app module and pass it to our definition function
require(['jquery', 'underscore', 'underscore.string', 'router', 'views/app', 'text!templates/main.html', 'i18n!nls/messages']
        , function($, _, _s, AppRouter, AppView, mainTemplate, messages){
    
    // Merge Underscore and Underscore.String
    _.str = _s;
    _.mixin(_.str.exports());
    _.str.include('Underscore.string', 'string');
  
    // Compile template
    var cMainTemplate = _.template(mainTemplate);
    $("body").html(cMainTemplate({messages: messages}));
    new AppView({el: $("#todoapp")});
    new AppRouter;
    Backbone.history.start();
});