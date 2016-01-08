var uiModule = require('./_index');

uiModule.directive('navbar',getNavbar);

function getNavbar() {
    return {
        restrict: 'E',
        templateUrl: 'views/navbar.html'
    }
};

