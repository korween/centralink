var routerModule = require('./_index');

routerModule.config(setupRouter);

function setupRouter($stateProvider, $urlRouterProvider) {
    console.log('Router loaded')


    $stateProvider
        .state('default', {
            url:'/',
            data: { access: 'all' }
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { access: 'all' }
        })
        .state('notifications', {
            url: "/notifications",
            templateUrl: "views/notifications.html",
            controller: 'uiController',
            data: { access: 'user' }
        })
        .state('administration', {
            url: "/admin",
            templateUrl: "views/administration.html",
            controller: 'adminController',
            data: { access: 'MODERATOR' }
        })
        .state('centralinks', {
            url: "/centralinks",
            templateUrl: "views/centralinks.html",
            controller: 'uiController',
            data: { access: 'user' }
        });

    $urlRouterProvider.otherwise("/centralinks");

}