'use strict';
angular.module('app').controller('registerCCtrl', ['$scope','httpService','$state', function($scope,httpService,$state){
    
    // 获取验证码
    $scope.getCodeC = function(){
    	if ($scope.username && $scope.password && $scope.company && $scope.empnum) {
	    	httpService.getCodeC($scope.username,$scope.password,$scope.company,$scope.empnum,function(data){
			   	console.log(data)
			    if (data.success) {

			        $scope.validCode = data.data.code;
			       	$scope.codeID = data.data.id;

			       	console.log($scope.validCode);
				}
				alert(data.message);
			});
		}else{
			alert('注册信息均不能为空');
		}
    }

    // 企业注册
    $scope.registerCompany = function(){
    	if ($scope.validCode) {
    		if ($scope.codeInput == $scope.validCode) {
	    		
		    	httpService.registerCompany($scope.validCode,$scope.codeID,function(data){
		    		
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