'use strict';

// 获取app模块 // 配置自定义指令 —— 职位列表
angular.module('app').directive('appPositionDetail',[function(){
	return {
		restrict: 'A',
		replace:true,
		templateUrl:'view/template/positionDetail.html'
	}
}]);