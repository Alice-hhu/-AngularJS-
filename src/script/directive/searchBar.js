'use strict';

// 获取app模块
var app = angular.module('app');
// 配置自定义指令 —— search页面 头部指令
app.directive('appSearchbar',[function(){
	return {
		restrict: 'A',
		replace:true,
		templateUrl:'view/template/searchBar.html',
		scope:{
			selectItems:'=',
			showSelect:'&showSelect'
		}
	}
}]);