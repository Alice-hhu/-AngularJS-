'use strict';
angular.module('app').controller('mySendCtrl', ['$scope','httpService','cache','$state', function($scope,httpService,cache,$state){

    // 获取登录信息
    $scope.userID = cache.get('userID');

    // 默认查询所有状态下的投递记录   ——>>> 此处需要扩展
    $scope.sendStatus = 'all';

    // 获取投递列表
    httpService.mySendList($scope.userID,$scope.sendStatus,function(data){

        $scope.mySendList = data.data;

    });

}]);