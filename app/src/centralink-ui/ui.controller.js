var uiModule = require('./_index');

uiModule.controller('uiController',uiController);

function uiController($scope) {
    $scope.editMode=false;
    $scope.centralinks = [
        {'title':'Message de test','status':'waiting','date': new Date(), 'body':'Lorem ipsum dolor sit amet, no facer abhorreant est. Ius vidit ubique prompta id. Modus ludus alterum id nec, hinc duis explicari ad mei. Id laudem offendit sea, magna alterum sadipscing vix in, illud admodum ea sit.','expand':false},
        {'title':'Autre message','status':'sent','date': new Date(),'body':'Sample Text','expand':false}
    ];

    $scope.getClassFromStatus = getClassFromStatus;
    $scope.expandPost = expandPost;

    function getClassFromStatus(status) {
        switch (status) {
            case 'waiting':
                return 'palette palette-sun-flower'
            case 'sent':
                return 'palette palette-emerald'
            case 'rejected':
                return 'palette palette-pomegranate'
        }
    }

    function expandPost(index) {
        $scope.centralinks[index].expand^=true;
        return;
    }
}
