define(['backbone'], function(Backbone){
	var AppRouter = Backbone.Router.extend({
        routes: {
            'fr': 'fr',
            'en': 'en'
        },
        fr: function( ){
        	var locale = localStorage.getItem('locale');
        	if(locale != 'fr-fr') {
	        	localStorage.setItem('locale', 'fr-fr'); 
				location.reload(); 
			}
        },
        en: function( ){
        	var locale = localStorage.getItem('locale');
        	if(locale != 'en-us') {
            	localStorage.setItem('locale', 'en-us'); 
				location.reload();
			}
        }
    });
    
    return AppRouter;
});