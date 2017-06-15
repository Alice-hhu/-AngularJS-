'use strict';

// 获取app模块 // 配置自定义指令 —— footer底部指令
angular.module('app').directive('appFooter',[function(){
	return {
		restrict: 'A',
		replace:true,
		templateUrl:'view/template/footer.html'
	}
}]);