var uiModule = require('../_index');

uiModule.filter('category', function() {
    return function(input) {
        switch(input) {
            case 'Evenements':
                return 'Evenements'
            case 'Communication':
                return 'Communication'
            case 'Exceptionnel':
                return 'Exceptionnel'
            case 'Divers':
                return 'Divers'
            default:
                return 'Inconnu'
        }
    };
});