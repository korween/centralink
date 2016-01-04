var routerModule = require('./_index');

routerModule.config(setupRouter);

function setupRouter($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/ui");
    //
    // Now set up the states
    $stateProvider
        .state('ui', {
            url: "/ui",
            templateUrl: "views/ui.html"
        });
}