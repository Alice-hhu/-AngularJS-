'use strict';

// 获取app模块
var app = angular.module('app');
// 配置自定义指令 —— head 头部指令
app.directive('appHeader',[function(){
	return {
		restrict: 'A',
		replace:true,
		templateUrl:'view/template/header.html',
		scope:{
			showGoLoginT:'=',
			showBack:'=',
			pageName:'@',
			showSearch:'='
		},
		link:function($scope){
			$scope.back = function(){
				history.back();
			}
		}
	}
}]);