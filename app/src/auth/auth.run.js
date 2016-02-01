var authModule = require('./../ui-router/_index');

authModule.run(['$rootScope','$state','authService',routeStateMonitor]);

function routeStateMonitor($rootScope,$state,authService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {
            if(!authService.authorize(toState.data.access)) {
                event.preventDefault();
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                $state.go('login');
            }
        });
}




    /*
     event.preventDefault();
     console.log('state change');
     /*
     if (!Auth.authorize(toState.data.access)) {
     $rootScope.error = "Access denied";
     event.preventDefault();

     if (fromState.url === '^') {
     if (Auth.isLoggedIn())
     $state.go('user.home');
     else {
     $rootScope.error = null;
     $state.go('anon.login');
     }
     }
     }
     */
