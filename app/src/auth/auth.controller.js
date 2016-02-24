var authModule = require('./../ui-router/_index');

authModule.controller('AuthController',['$scope','$rootScope','authService','rq',authController]);

function authController($scope,$rootScope,authService,rq) {
    $scope.login = "";
    $scope.password = "";

    $rootScope.loginError = null;

    $scope.signin = signin;
    $scope.signout = signout;
    $scope.remember = true;
    $scope.links=[];
    $rootScope.version="";

    /*=================        INIT         ========================*/

    (function() {
        authService.customLinks(addLinks);
        loadVersion();
    })();

    /*==============================================================*/

    function signin() {
        authService.login($scope.login,$scope.password,$scope.remember);
    }

    function signout() {
        authService.logout();
    }

    function addLinks(links) {
        if(links.data) {
            links=links.data;
            for (var l in links) {
               $scope.links[l]=links[l];
            }
        }
    }

    function loadVersion() {
        rq.getVersion(function(v) {
            if(v.data && v.data.version)
                $rootScope.version= v.data.version;
        });
    }


}
