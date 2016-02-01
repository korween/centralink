var authModule = require('./../ui-router/_index');

authModule.run(['$rootScope','$state','authService',routeStateMonitor]);

function routeStateMonitor($rootScope,$state,authService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {
            if(toState.data.access!='all') {
                authService.authorize(toState.data.access,function(success) {
                    if(!success) {
                        event.preventDefault();
                        $rootScope.toState = toState;
                        $state.go('login');
                    }
                });
            }
        });
}