var uiModule = require('../_index');

uiModule.filter('statusIcon', function() {
    return function(input) {
        switch(input) {
            case 'waiting':
                return 'fui-time'
            case 'sent':
                return 'fui-check-circle'
            case 'success':
                return 'fui-check-circle'
            case 'failure':
                return 'fui-cross-circle'
            case 'new':
                return 'fui-plus-circle'
            default:
                return 'Inconnu'
        }
    };
});