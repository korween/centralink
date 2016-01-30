var uiModule = require('./_index');

uiModule.controller('uiController',uiController);

function uiController($scope) {
    console.log('UI Controller loaded')


    $scope.editMode=false;
    $scope.categories=['events','communication','special','misc'];
    $scope.editData={};
    $scope.confirmationMsg="";
    $scope.centralinks = [
        {'id':1,'title':'Message de test','category':'events','status':'waiting','date': new Date(), 'body':'Lorem ipsum dolor sit amet, no facer abhorreant est. Ius vidit ubique prompta id. Modus ludus alterum id nec, hinc duis explicari ad mei. Id laudem offendit sea, magna alterum sadipscing vix in, illud admodum ea sit.','expand':false},
        {'id':2,'title':'Autre message','category':'special','status':'sent','date': new Date(),'body':'Sample Text','expand':false}
    ];

    $scope.getClassFromStatus = getClassFromStatus;
    $scope.expandPost = expandPost;
    $scope.selectCategory = selectCategory;
    $scope.setEditMode = setEditMode;
    $scope.save = save;
    $scope.trash = trash;
    $scope.trashConfirm = trashConfirm;
    $scope.trashCancel = trashCancel;

    ////////////////////////////////////////////////////////////////////////////

    function selectCategory($index) {
        $scope.editData.category=$scope.categories[$index];
    }

    function setEditMode(status,index) {
        if(status) {
            $scope.editData=Object.create($scope.centralinks[index]);
            $scope.editMode=true;
        }
        else {
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
            case 'rejected':
                return 'palette palette-pomegranate'
        }
    }

    function expandPost(index) {
        $scope.centralinks[index].expand^=true;
        return true;
    }

    function save() {
        console.log('called some logic to save message');
        console.log('fetch centralinks from server')
        $scope.editData={};
        $scope.editMode=false;
    }

    function trash() {
        $scope.confirmationMsg="Voulez-vous vraiment supprimer le message "+$scope.editData.title+"?";
        $scope.confirmationButtons=[
            {"text":"Supprimer","action":"trashConfirm"},
            {"text":"Annuler","action":"trashCancel"}
        ]
    }

    function trashConfirm() {
            console.log('Call delete route on the post')
    }
    function trashCancel() {
        console.log('Call cancel called')
        $scope.confirmationMsg="";
        $scope.confirmationButtons=[];
    }
    
}
