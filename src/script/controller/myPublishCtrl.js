'use strict';
angular.module('app').controller('myPublishCtrl', ['$scope','$http','httpService','cache','$state','$rootScope', function($scope,$http,httpService,cache,$state,$rootScope){

    // 获取城市列表
    $scope.cityList = $rootScope.cityList;
    // 获取公司规模列表
    $scope.empnumList = $rootScope.empnumList;
    // 获取薪资列表
    $scope.salaryList = $rootScope.salaryList;

    // 获取当前企业账号的id
    $scope.userCID = cache.get('userCID');

    // 发布招聘职位
    $scope.publish = function(){
        // $scope.salary = $scope.salaryMin + "~" +$scope.salaryMax;
        $http({
            method: 'post',
            data: 'companyname='+$scope.company+'&cityname='+$scope.city+'&industry='+$scope.position+'&salary='+$scope.salary+'&empnum='+$scope.empnum+'&companyId='+$scope.userCID,
            url: 'http://192.168.1.8:8080/lgw/advis/add',
            headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        }).then(function successCallback(res) {
            console.log(res);
            alert(res.data.message);
            if (res.data.success) {
                $state.go('myInfo');
            }

        }, function errorCallback(response) {
            console.log('服务器无响应，请稍后再试！');
        });
        
    }

}]);