var authModule = require('./_index');

//authModule.run(['$rootScope','$state','$stateParams',authRunner]);

/*function authRunner($rootScope,$state,$stateParams,authService) {
    //var Auth = new authService();

    console.log('Router init done');
*/
authModule.run(['$rootScope', '$state', '$stateParams', 'authService', routeStateMonitor]);

function routeStateMonitor($rootScope, $state, $stateParams, authService) {
        console.log('Auth service loaded')

        console.log($state,$stateParams);

        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            console.log("test");
            //Authorizer.authorize();
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
