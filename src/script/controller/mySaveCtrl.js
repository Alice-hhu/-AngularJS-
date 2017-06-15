'use strict';
angular.module('app').controller('mySaveCtrl', ['$scope','httpService','cache','$state', function($scope,httpService,cache,$state){

    // 获取登录信息
    $scope.userID = cache.get('userID');


    // 获取收藏列表
    httpService.mySaveList($scope.userID,function(data){

        $scope.mySaveList = data;

    });

    // 取消收藏
    /*$scope.removeSave = function(saveID){
    	$scope.saveID = saveID;
        httpService.removeSave($scope.saveID,function(data){
  
            // 显示取消成功，但是实际没有成功
            if (data.success) {
            	$state.reload();
            }
            alert(data.message);
            
        });
    }*/

}]);