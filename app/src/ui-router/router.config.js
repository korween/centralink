var routerModule = require('./_index');

routerModule.config(setupRouter);

function setupRouter($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/notifications");
    //
    // Now set up the states
    $stateProvider
        .state('notifications', {
            url: "/notifications",
            templateUrl: "views/notifications.html"
        })
        .state('centralinks', {
            url: "/centralinks",
            templateUrl: "views/centralinks.html"
        });
}