'use strict';

angular.module('app').directive('appUserInfo',[function(){
	return {
		restrict: 'A',
		replace:true,
		templateUrl:'view/template/userInfo.html'
	}
}]);