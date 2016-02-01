var routerModule = require('./_index');

routerModule.config(setupRouter);

function setupRouter($stateProvider, $urlRouterProvider) {
    console.log('Router loaded')


    $stateProvider
        .state('default', {
            url:'/'
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { access: 'all' }
        })
        .state('notifications', {
            url: "/notifications",
            templateUrl: "views/notifications.html",
            data: { access: 'user' }
        })
        .state('centralinks', {
            url: "/centralinks",
            templateUrl: "views/centralinks.html",
            data: { access: 'user' }
        });

    $urlRouterProvider.otherwise("/notifications");

}