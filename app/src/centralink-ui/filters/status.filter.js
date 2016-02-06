var uiModule = require('../_index');

uiModule.filter('status', function() {
    return function(input) {
        switch(input) {
            case 'waiting':
                return 'Attente'
            case 'sent':
                return 'Envoyé'
            case 'success':
                return 'Validé'
            case 'failure':
                return 'Rejeté'
            case 'new':
                return 'Nouveau'
            default:
                return 'Inconnu'
        }
    };
});