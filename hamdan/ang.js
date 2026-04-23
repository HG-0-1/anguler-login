var mylogin = angular.module('mylogin',[])

mylogin.controller('logincon', function($scope){
$scope.login = function(){
    if($scope.loginusername === "admin" && $scope.loginpassword === "1234")
    {
        $scope.message ="login success";
    }
    else
    {
        $scope.message ="error";
    }
}

});