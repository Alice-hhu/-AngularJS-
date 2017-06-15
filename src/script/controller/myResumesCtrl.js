'use strict';
angular.module('app').controller('myResumesCtrl', ['$scope','httpService','cache','$state', function($scope,httpService,cache,$state){

    // 获取companyid
    $scope.companyID = cache.get('userCID');
    // 默认查询所有状态下的简历  ——>>> 此处需要扩展
    $scope.resumeStatus = 'new';


    // 获取简历列表
    httpService.myResumes($scope.companyID,$scope.resumeStatus,function(data){

        $scope.myResumes = data.data;

    });

    // 通过／拒绝投递
    // ——>>> 后台不完善，前台功能无法实现
    $scope.approve = function(resumeID,option){

    	$scope.resumeID = resumeID;
    	$scope.option = option;

    	httpService.approve($scope.resumeID,$scope.option,function(data){

			alert(data.message);
	    });
    }

}]);