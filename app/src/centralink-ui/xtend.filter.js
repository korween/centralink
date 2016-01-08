var uiModule = require('./_index');

uiModule.filter('xtend', function() {
    return function(input) {
        return input.substring(100);
    };
});