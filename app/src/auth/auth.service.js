var authModule = require('./_index');

authModule.factory('authService',['$rootScope','$http','$state','$cookies',getAuthService]);

function getAuthService($rootScope,$http,$state,$cookies) {

    var service = {
        'login':login,
        'logout':logout,
        'check':checkLogin,
        'authorize':authorize,
        'isLoggedIn': isLoggedIn
    }

    return service;

    //////////////////////////////////////////////
    /* Route declaration                        */


    function resolver() {
        var resolve = {
            'login': '/api/login/',
            'account':'/api/my_account'
        }
        return resolve;

    }

    //////////////////////////////////////////////
    /* Login functions                          */

    function isLoggedIn() {

    }


    function checkLogin(cb) {
        var r = new resolver();
        $http.get(r.account).then(function(data) {
            cb(false);
        },function(err) {
            cb(true);
        });
    }


    function authorize(accessLevel,callback) {
        checkLogin(function(err) {
            if(err) {
                $cookies.remove('centralink-remember');
                rootScopeDisconnect();
                callback(false);
            }

            var cookie = $cookies.get('centralink-remember');
            if (cookie) {
                var data = cookie.split('#');
                rootScopeConnect(data[0], data[1]);
            }

            /* --- Admin auth level --- */
            if (accessLevel == 'MODERATOR') {
                // TODO
                if(accessLevel==$rootScope.permissions)
                    callback(true);
                else
                    callback(false);
            }
            /* --- Used auth level  --- */
            else if (accessLevel == 'user' && $rootScope.connected) {
                callback(true);
            }
            /* --- No auth required --- */
            else if (accessLevel == 'all') {
                console.log('all access level')
                callback(true);
            }
            /* --- Not authorized   --- */
            else {
                callback(false);
            }
        });
    }


    function rootScopeConnect(login,roles) {
        $rootScope.connected = true;
        $rootScope.login = login;
        $rootScope.permissions = roles;
        console.log(roles);
    }

    function rootScopeDisconnect() {
        $rootScope.connected = false;
        $rootScope.login = null;
        $rootScope.permissions = null;
    }


    function login(username, password, remember) {
        if(remember)
            $rootScope.remember = true;

        var r = new resolver();
        var data = {'password':password};
        $http.post(r.login + username,data).then(loginSuccess,handleLoginError);
    }


    function loginSuccess(res) {
        console.log('login success')
        if($rootScope.remember) {
            $cookies.put('centralink-remember', res.data.login + '#' + res.data.roles);
        }

        rootScopeConnect(res.data.login,res.data.roles);

        var prevState = $rootScope.toState;
        $rootScope.toState = null;
        if(prevState && prevState!='login') {
            $state.go(prevState);
        }
        else {
            $state.go('notifications');
        }
        return true;
    }


    function logout() {
        var r = new resolver();
        $http.delete(r.login).then(logoutSuccess,handleLoginError);
    }


    function logoutSuccess() {
        $state.go('login');
        $rootScope.connected = false;
        $rootScope.login = '';
    }

    ///////////////////////////////////////////////
    /* Error collection point                    */


    function handleLoginError(err) {
        $rootScope.loginError = err.data.message;
        setTimeout(function() {
            $rootScope.$apply(function() {
                $rootScope.loginError = null;
            });
        },2000);
    }


}
