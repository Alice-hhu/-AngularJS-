'use strict';
angular.module('app').controller('registerPCtrl', ['$scope','httpService','$state', function($scope,httpService,$state){
    
    // 获取验证码
    $scope.getCode = function(){
    	if ($scope.username && $scope.password) {
	    	httpService.getCode($scope.username,$scope.password,function(data){

			    if (data.success) {

			        $scope.validCode = data.data.code;
			       	$scope.codeID = data.data.id;

			       	console.log($scope.validCode);
				}
				alert(data.message);
			});
		}else{
			alert('用户名和密码不能为空');
		}
    }

    // 个人注册
    $scope.registerPersonal = function(){
    	console.log(111)
    	if ($scope.validCode) {
    		if ($scope.codeInput == $scope.validCode) {
	    		
		    	httpService.registerPersonal($scope.validCode,$scope.codeID,function(data){
		    		
		    		alert(data.message);

		    		if (data.success) {
		    			
				    	$state.go('login');
		    		}
				});
	    	}else{
	    		alert("验证码输入有误");
	    	}
    	}else{
    		alert('请发送短信获取验证码');
    	}
    	
    }

}]) 