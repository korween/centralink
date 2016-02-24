var uiModule = require('../_index');

uiModule.directive('formValidator', function() {

    return {
        require: '^form',
        scope: {
            fire: '&'
        },
        link: function(scope, element, attrs, form) {
            element.on('click', function(e) {
                scope.$apply(function() {
                    form.$submitted = true;
                    if (form.$valid) {
                        scope.fire()
                    }
                });
            });
        }
    };
});