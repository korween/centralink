var uiModule = require('../_index');

uiModule.directive('buttonBarAdmin',getButtonBarAdmin);

function getButtonBarAdmin() {
    return {
        restrict: 'E',
        templateUrl: 'views/button-bar-admin.html'
    }
};

