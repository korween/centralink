var uiModule = require('./_index');

uiModule.controller('adminController',['$scope','rq',adminController]);

function adminController($scope,rq) {

    $scope.confirmationMsg="";
    $scope.centralinks = [];
    $scope.reverse = true;


    $scope.getClassFromStatus = getClassFromStatus;
    $scope.expandPost = expandPost;




    /* :::::::::::::   INIT   ::::::::::::::::: */

    (function() {
        loadPosts();
    })();

    /* :::::::::::::::::::::::::::::::::::::::: */

    function loadPosts() {
        rq.getPosts(function(res) {
            for (var el in res.data) {
                res.data[el].expand=false;
            }
            $scope.centralinks = res.data;
        });
    }

    function getClassFromStatus(status) {
        switch (status) {
            case 'waiting':
                return 'palette palette-sun-flower'
            case 'sent':
                return 'palette palette-emerald'
            case 'new':
                return 'palette palette-belize-hole'
            case 'rejected':
                return 'palette palette-pomegranate'
        }
    }

    function expandPost(id) {
        for (var c in $scope.centralinks) {
            if($scope.centralinks[c]._id==id)
                $scope.centralinks[c].expand^=true;
        }
        return true;
    }

    function validate(id) {
        for (var c in $scope.centralinks) {
            if($scope.centralinks[c]._id==id)
                $scope.centralinks[c].expand^=true;
        }
    }

    function reject(id) {

    }

}