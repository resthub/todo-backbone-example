define(['router/app-router', 'view/app-view']
        , function(AppRouter, AppView){
    new AppView({root: $('#todoapp')});
    new AppRouter();
});