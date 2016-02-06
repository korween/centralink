var uiModule = require('./_index');

uiModule.controller('uiController',['$rootScope','$scope','rq',uiController]);

function uiController($rootScope,$scope,rq) {

    $scope.editMode=false;
    $scope.categories=['Evenements','Communication','Exceptionnel','Divers'];
    $scope.editData={};
    $scope.confirmationMsg="";
    $scope.centralinks = [];
    $scope.reverse = true;
    /*
    $scope.centralinks = [
        {'id':1,'title':'Message de test','category':'events','status':'waiting','date': new Date(), 'content':'Lorem ipsum dolor sit amet, no facer abhorreant est. Ius vidit ubique prompta id. Modus ludus alterum id nec, hinc duis explicari ad mei. Id laudem offendit sea, magna alterum sadipscing vix in, illud admodum ea sit.','expand':false},
        {'id':2,'title':'Autre message','category':'special','status':'sent','date': new Date(),'content':'Sample Text','expand':false}
    ];
    */

    $scope.getClassFromStatus = getClassFromStatus;
    $scope.expandPost = expandPost;
    $scope.newMessage = newMessage;
    $scope.selectCategory = selectCategory;
    $scope.setEditMode = setEditMode;
    $scope.save = save;
    $scope.trash = trash;
    $scope.trashConfirm = trashConfirm;
    $scope.trashCancel = trashCancel;


    /* :::::::::::::   INIT   ::::::::::::::::: */

    (function() {
        loadPosts($rootScope.login);
    })();


    /* :::::::::::::::::::::::::::::::::::::::: */

    function getNewPostTemplate() {
        return {
            '_id': Math.random().toString(36).substring(3),
            'title':'',
            'category':'',
            'author':$rootScope.login,
            'status':'new',
            'date': ''      ,
            'content':'',
            'expand':false,
            'centrale': true,
            'iteem': true
        };
    }

    function formatDate(date) {
        return ("0"+date.getDay()).split(-2)+"-"+("0"+(date.getMonth()+1).toString()).split(-2)+"-"+date.getFullYear();
    }


    function loadPosts(user) {
        if(!user) return;
        rq.getPosts(function(res) {
            for (var el in res.data) {
                    res.data[el].expand = false;
            }
            $scope.centralinks = res.data;
        });
    }


    function selectCategory($index) {
        $scope.editData.category=$scope.categories[$index];
    }


    function setEditMode(status,id) {
        var selected=null;
        for (var c in $scope.centralinks) {
            if($scope.centralinks[c]._id==id)
                selected=$scope.centralinks[c];
        }
        if(status && selected) {
            angular.copy(selected,$scope.editData);
            var date = new Date($scope.editData.date);
            $scope.editData.date=formatDate(date);
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


    function newMessage() {
        $scope.centralinks.unshift(getNewPostTemplate());
        $scope.reverse = false;
        $scope.editData = $scope.centralinks[0];
        $scope.editMode=true;
    }


    function save() {
        $scope.reverse = true;
        var date = $scope.editData.date.split('-');
        $scope.editData.date = new Date(date[2], date[1], date[0]);

        if ($scope.editData.status == 'new') {
            $scope.editData.status = 'waiting';
            rq.addPost($scope.editData,saveSuccess);
        }
        else {
            console.log($scope.editData);
            rq.savePost($scope.editData._id,$scope.editData,saveSuccess);
        }
    }


    function saveSuccess(res) {
        if(res.status==200) console.log("ok");
        else console.log(res);
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
            if(res.status==200)
                console.log('OK');
            loadPosts($rootScope.login);
        });

    }


    function trashCancel() {
        console.log('Call cancel called')
        $scope.confirmationMsg="";
        $scope.confirmationButtons=[];
    }
    
}
