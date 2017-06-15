'use strict';
angular.module('app').controller('mainCtrl', ['$scope','httpService','cache','$state', function($scope,httpService,cache,$state){
        // $http({
        //     method: 'GET',
        //     params: {
        //     },
        //     url: 'http://192.168.1.8:8080/lgw/advis/query',
        // }).then(function successCallback(res) {
        //     console.log(res.data);
        //     	$scope.list2 = res.data.data;
        // }, function errorCallback(response) {
        //     console.log('wrong');

        // });

// 调用自定义服务中的getPositionList() 方法，以获取请求回来的数据
    httpService.getPositionList(function(data){
        // 将获取的数据赋值给作用域
        $scope.positionList = data.data;
        console.log($scope.positionList);
    });

    // 判断是否登录过
    if (cache.get('userNow') || cache.get('userCNow')) {
        $scope.showFlag = false;
    }else{
        $scope.showFlag = true;
    }
    
}]);