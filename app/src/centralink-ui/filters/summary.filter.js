var uiModule = require('../_index');

uiModule.filter('summary', function() {
    return function(input) {
        if(!input) return input;
        var spacedInput = input.split(/\r\n|\r|\n/);
        if(spacedInput.length > 3)
            return spacedInput[0]+'\n'+spacedInput[1]+'\n'+spacedInput[2];
        else
            return input;
    };
});