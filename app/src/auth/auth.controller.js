var authModule = require('./../ui-router/_index');

authModule.controller('AuthController',['$scope','$rootScope','authService',authController]);

function authController($scope,$rootScope,authService) {
    $scope.login = "";
    $scope.password = "";

    $rootScope.loginError = null;

    $scope.signin = signin;
    $scope.signout = signout;
    $scope.remember = true;


    function signin() {
        authService.login($scope.login,$scope.password,$scope.remember);
    }

    function signout() {
        authService.logout();
    }


}
