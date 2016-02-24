var uiModule = require('../_index');

uiModule.directive('scroll', function($window) {
    return {
        restrict: 'A',
        link: function (scope, elm, attr) {
            var raw = elm[0];

            angular.element(window).on('scroll', function(e){
                if($window.pageYOffset+window.innerHeight>raw.scrollHeight && scope.moreToLoad) {
                    scope.$apply(attr.scroll);

                }
            });
        }
    }
});