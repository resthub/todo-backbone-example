require(['jquery', 'text!templates/main.html', 'views/app'], function($, mainTemplate, AppView){
  
  var compiledMainTemplate = _.template(mainTemplate);
  $("body").html(compiledMainTemplate());
  new AppView({el: $("#todoapp")});
});
