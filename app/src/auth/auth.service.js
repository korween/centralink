var authModule = require('./_index');

authModule.factory('authService',['$http',getAuthService]);

function getAuthService($http) {

    var service = {
        'login':login,
        'logout':logout,
        'check':checkLogin,
        'authorize':authorize,
        'isLoggedIn': isLoggedIn
    }

    return service;

    //////////////////////////////////////////////

    function isLoggedIn() {

    }

    function checkLogin() {

    }

    function authorize(accessLevel) {
        if(accessLevel=='admin') {
            console.log('admin access');
            return false;
        }
        else if(accessLevel=='user') {
            console.log('user access');
            return false;
        }
        else {
            return true;
        }
    }

    function login(username, password) {
        var tmpBaseUrl='http://localhost:9103/api/login';
        var data = {'login':'test','password':'password'}
        $http.post(tmpBaseUrl,data,function(err,data) {
            console.log(err,data);
        })
    }

    function logout() {

    }

}
