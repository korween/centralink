var uiModule = require('../_index');

uiModule.filter('summary', function() {
    return function(input,expand) {
        var lines = 3;
        var chars = 100;

        if(!input || expand) return input;

        var spacedInputLines = input.split(/\r\n|\r|\n/);
        var spacedInputChars = input.slice(0,input.indexOf(' ',chars));

        if(spacedInputLines.length <= 3 && input.length<100) return input;

        var linesJoined=spacedInputLines.slice(0,lines).join('\n');

        if(linesJoined.length<spacedInputChars.length) {
            return linesJoined + "...";
        } else {
            return spacedInputChars + "...";
        }


    };
});