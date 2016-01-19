var uiModule = require('./_index');

uiModule.directive('buttonBar',getButtonBar);

function getButtonBar() {
    return {
        restrict: 'E',
        templateUrl: 'views/button-bar.html'
    }
};

