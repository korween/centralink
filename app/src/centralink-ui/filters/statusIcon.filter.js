var uiModule = require('../_index');

uiModule.filter('statusIcon', function() {
    return function(input) {
        switch(input) {
            case 'waiting':
                return 'fui-time'
            case 'sent':
                return 'fui-check-circle'
            case 'rejected':
                return 'fui-cross-circle'
            default:
                return 'Inconnu'
        }
    };
});