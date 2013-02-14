define(['backbone'], function(Backbone){
    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            Backbone.history.start();
        },
        routes: {
            'fr': 'fr',
            'en': 'en'
        },
        fr: function( ){
            var locale = localStorage.getItem('locale');
            if(locale != 'fr-fr') {
                localStorage.setItem('locale', 'fr-fr'); 
                // i18n plugin require page reload !
                location.reload();
            }
        },
        en: function( ){
            var locale = localStorage.getItem('locale');
            if(locale != 'en-us') {
                localStorage.setItem('locale', 'en-us');
                // i18n plugin require page reload !
                location.reload();
            }
        }
    });
    
    return AppRouter;
});