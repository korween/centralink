var authModule = require('./_index');

authModule.factory('authService',getAuthService);

function getAuthService() {

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

    function authorize() {
        console.log('yolo');
        return true;
    }

    function login(username, password) {

    }

    function logout() {

    }

}
