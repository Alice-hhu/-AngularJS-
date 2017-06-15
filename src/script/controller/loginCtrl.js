'use strict';
angular.module('app').controller('loginCtrl', ['$scope','httpService','cache','$state', function($scope,httpService,cache,$state){
    	
    	// 个人登录
    	$scope.loginPersonal = function(){
    		if ($scope.username && $scope.password) {
    			// 调用自定义服务中的loginPersonal() 方法，以获取请求回来的数据
	    		httpService.loginPersonal($scope.username,$scope.password,function(data){
			        if (data.success) {
			        	console.log(data);
			        	// 存cookie
						cache.put('userNow',data.data.username);
						cache.put('userID',data.data.id);
						// 跳转到myInfo页面 $state服务
						$state.go('myInfo');
					}
					alert(data.message);
			    });

			    // 隐藏gologin // 显示登录信息
			    // 在myCtrl中设置
    		}else{
    			alert('用户名和密码不能为空');
    		}
			
    	}
    	// 企业登录
    	$scope.loginCompany = function(){
    		if ($scope.username && $scope.password) {
	    		httpService.loginCompany($scope.username,$scope.password,function(data){
			        if (data.success) {
			        	console.log(data);
						// 存cookie
						cache.put('userCNow',data.data.username);
						cache.put('userCID',data.data.id);
						// 跳转到myInfo页面 $state服务
						$state.go('myInfo');
					}
					alert(data.message);
			    });
		    }else{
    			alert('用户名和密码不能为空');
    		}
    	} 

}]);