'use strict';
angular.module('app').controller('myCtrl', ['$scope','httpService','cache','$state', function($scope,httpService,cache,$state){

	// 个人登录用户
	$scope.userNow = cache.get('userNow');
	// 企业登录用户
	$scope.userCNow = cache.get('userCNow');

	// 判断是否登录过
	if ($scope.userNow || $scope.userCNow) {
    	$scope.showFlag = false;
	}else{
		$scope.showFlag = true;
	}

	// 判断是个人登录还是企业登录
	if ($scope.userNow) {
		$scope.userLogin = true;
	}else if ($scope.userCNow) {
		$scope.userLogin = false;
	}

	// 退出登录
	$scope.exit = function(){
		// 清除cookie
		cache.remove('userNow');
		cache.remove('userID');
		cache.remove('userCNow');
		cache.remove('userCID');
		// 清除作用域参数
		$scope.userNow = null;
		$scope.userCNow = null;
		// 刷新当前页
		$state.reload();

	}
}]) 