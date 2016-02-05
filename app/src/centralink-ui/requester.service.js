var uiModule = require('./_index');

uiModule.factory('rq',['$http',getRequester]);

function getRequester($http) {
    var service = {
        'getPosts': getPosts,
        'deletePost': deletePost,
        'savePost': savePost,
        'addPost': addPost
    }

    return service;

    /* :::::::::::::::::::::::::::::::::::::::: */

    function get_request(url, cb) {
        $http.get(url).then(cb, handleError);
    }

    function post_request(url, data, cb) {
        $http.post(url, data).then(cb, handleError);
    }

    function put_request(url, data, cb) {
        $http.put(url, data).then(cb, handleError);
    }

    function del_request(url, cb) {
        $http.delete(url).then(cb, handleError);
    }

    /* :::::::::::::::::::::::::::::::::::::::: */

    function Resolver() {
        return {
            'posts': '/api/post/'
        }
    }

    /* :::::::::::::::::::::::::::::::::::::::: */


    function getPosts(cb) {
        var r = new Resolver();
        get_request(r.posts, cb);
    }


    function addPost(data, cb) {
        var r = new Resolver();
        post_request(r.posts, data, cb);
    }


    function savePost(id, data, cb) {
        var r = new Resolver();
        put_request(r.posts + id, data, cb);
    }


    function deletePost(id, cb) {
        var r = new Resolver();
        del_request(r.posts + id, cb);
    }

    /* :::::::::::::::::::::::::::::::::::::::: */


    function handleError(err) {
        console.log(err);
    }
}