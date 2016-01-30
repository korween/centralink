var uiModule = require('../_index');

uiModule.directive('confirmationPanel',getConfirmationPanel);

function getConfirmationPanel() {
    return {
        restrict: 'E',
        templateUrl: 'views/confirmation-panel.html'
    }
};

