require('fs');
require('./centralink-ui/_index');
require('./ui-router/_index');

angular.element(document).ready(activate);

function activate() {
    var requirements = [
        'appCentralink.routerModule',
        'appCentralink.uiModule'
    ];
    window.appCentralink = angular.module('appCentralink',requirements);
    angular.bootstrap(document,['appCentralink']);
}
