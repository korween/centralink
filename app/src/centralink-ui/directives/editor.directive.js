var uiModule = require('../_index');

uiModule.directive('editForm',getEditor);

function getEditor() {
    return {
        restrict: 'E',
        templateUrl: 'views/edit-form.html'
    }
};

