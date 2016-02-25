var uiModule = require('./_index');

uiModule.controller('uiController',['$rootScope','$scope','rq',uiController]);

function uiController($rootScope,$scope,rq) {

    $scope.editMode=false;
    $scope.categories=['Evenements','Communication','Exceptionnel','Divers'];
    $scope.editData={};
    $scope.confirmationMsg="";
    $scope.centralinks = [];
    $scope.moreToLoad = true;
    $scope.reverse = true;
    $scope.selectedDay=Date.today();
    $scope.getClassFromStatus = getClassFromStatus;
    $scope.expandPost = expandPost;
    $scope.keepNewOnTop = keepNewOnTop;
    $scope.loadMore = loadMorePosts;
    $scope.newMessage = newMessage;
    $scope.selectCategory = selectCategory;
    $scope.setEditMode = setEditMode;
    $scope.save = save;
    $scope.trash = trash;
    $scope.trashConfirm = trashConfirm;
    $scope.trashCancel = trashCancel;

    /* :::::::::::::   INIT   ::::::::::::::::: */

    (function() {
        loadPosts();
    })();

    /* :::::::::::::::::::::::::::::::::::::::: */

    function getNewPostTemplate() {
        return {
            '_id': Math.random().toString(36).substring(3),
            'title':'',
            'category':'Communication',
            'author':$rootScope.login,
            'status':'new',
            'date': '',
            'content':'',
            'expand':false,
            'centrale': true,
            'iteem': true
        };
    }

    function loadPosts() {
        rq.getPosts(function(res) {
            for (var el in res.data) {
                    res.data[el].expand = false;
            }
            $scope.centralinks = res.data;
        });
    }



    function loadMorePosts() {
        $scope.moreToLoad=false;
        /*$scope.$apply(function() {
            $scope.moreToLoad=true;
        })*/
     }

    function selectCategory($index) {
        $scope.editData.category=$scope.categories[$index];
    }

    function keepNewOnTop(post) {
        if(post.status=="new") {
            return 0;
        }
        else {
            return post.date;
        }
    }
    
    function setEditMode(status,id) {
        var selected=null;
        for (var c in $scope.centralinks) {
            if($scope.centralinks[c]._id==id)
                selected=$scope.centralinks[c];
        }
        if(status && selected) {
            angular.copy(selected,$scope.editData);
            $scope.selectedDay = new Date($scope.editData.date);
            $scope.editMode=true;
        }
        else {
            if($scope.editData.status == 'new')
                $scope.centralinks.shift();
            $scope.editData={};
            $scope.editMode=false;
        }
    }

    function getClassFromStatus(status) {
        switch (status) {
            case 'waiting':
                return 'palette palette-sun-flower'
            case 'success':
                return 'palette palette-emerald'
            case 'new':
                return 'palette palette-belize-hole'
            case 'sent':
                return 'palette palette-peter-river'
            case 'failure':
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

    function newMessage() {
        $scope.centralinks.unshift(getNewPostTemplate());
        $scope.reverse = false;
        $scope.editData.date=Date.today();
        $scope.selectedDay = $scope.editData.date;
        $scope.editData = $scope.centralinks[0];
        $scope.editMode=true;
    }

    function save() {
        $scope.reverse = true;
        $scope.editData.date = $scope.selectedDay;

        if ($scope.editData.status == 'new') {
            $scope.editData.status = 'waiting';
            rq.addPost($scope.editData,saveSuccess);
        }
        else {
            rq.savePost($scope.editData._id,$scope.editData,saveSuccess);
        }
    }

    function saveSuccess(res) {
        $scope.editData={};
        $scope.editMode=false;
        loadPosts($rootScope.login);
    }

    function trash() {
        $scope.confirmationMsg="Voulez-vous vraiment supprimer le message "+$scope.editData.title+"?";
        $scope.confirmationButtons=[
            {"text":"Supprimer","action":"trashConfirm"},
            {"text":"Annuler","action":"trashCancel"}
        ]
    }

    function trashConfirm() {
        $scope.confirmationMsg='';
        $scope.editMode=false;
        rq.deletePost($scope.editData._id,function(res) {
            loadPosts();
        });

    }

    function trashCancel() {
        $scope.confirmationMsg="";
        $scope.confirmationButtons=[];
    }
}
