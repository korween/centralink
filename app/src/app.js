require('fs');
require('./centralink-ui/_index');
require('./ui-router/_index');
require('./auth/_index');


angular.element(document).ready(activate);

function activate() {
    var requirements = [
        'appCentralink.uiModule',
        'appCentralink.routerModule',
        'appCentralink.authModule'
    ];
    window.appCentralink = angular.module('appCentralink',requirements);
    angular.bootstrap(document,['appCentralink']);
}
