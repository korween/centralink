var uiModule = require('../_index');

uiModule.filter('category', function() {
    return function(input) {
        switch(input) {
            case 'events':
                return 'Evenements'
            case 'communication':
                return 'Communication'
            case 'special':
                return 'Spécial'
            case 'misc':
                return 'Divers'
            default:
                return 'Inconnu'
        }
    };
});