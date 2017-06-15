'use strict';

angular.module('app').directive('appGoLogin',[function(){
	return {
		restrict: 'A',
		replace:true,
		templateUrl:'view/template/goLogin.html'
	}
}]);