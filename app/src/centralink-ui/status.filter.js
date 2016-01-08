var uiModule = require('./_index');

uiModule.filter('status', function() {
    return function(input) {
        switch(input) {
            case 'waiting':
                return 'Attente'
            case 'sent':
                return 'Envoyé'
            case 'rejected':
                return 'Rejeté'
            default:
                return 'Inconnu'
        }
    };
});