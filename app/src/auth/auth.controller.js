var authModule = require('./../ui-router/_index');

authModule.controller('AuthController',['$scope','$rootScope','authService',authController]);

function authController($scope,$rootScope,authService) {
    $scope.login = "";
    $scope.password = "";

    $scope.signin = signin;


    function signin() {
        authService.login($scope.login,$scope.password);
        console.log('test',$scope.login,$scope.password)
    }
}
