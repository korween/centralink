var uiModule= require('../_index');

uiModule.filter('formatText',['$sce',formatText]);

function formatText($sce) {
    var tag = '<br />';
    return function(msg) {
        if(!msg) return "";
        // ngSanitize's linky filter changes \r and \n to &#10; and &#13; respectively
        msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
        return $sce.trustAsHtml(msg);
    };

}