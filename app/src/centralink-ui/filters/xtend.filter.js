var uiModule = require('../_index');

uiModule.filter('xtend', function() {
    return function(input) {
        if(!input) return input;
        var spacedInput = input.split(/\r\n|\r|\n/);
        if(spacedInput.length > 3) {
            spacedInput.shift();
            spacedInput.shift();
            spacedInput.shift();
            spacedInput=spacedInput.join('\n');

            return '\n'+spacedInput;
        }
        else
            return input;
    };
});