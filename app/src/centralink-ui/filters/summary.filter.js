var uiModule = require('../_index');

uiModule.filter('summary', function() {
    return function(input) {
        return input.substring(0,100);
    };
});