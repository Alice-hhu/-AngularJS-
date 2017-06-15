'use strict';
angular.module('app').controller('searchCtrl', ['$scope','$rootScope','httpService','cache', function($scope,$rootScope,httpService,cache){
    
    // 定义3种选项
	$scope.selectItems = [
		{
			id:'city',
			name:'城市'
		},
		{
			id:'salary',
			name:'薪资'
		},
		{
			id:'empnum',
			name:'公司规模'
		}
	];

	$scope.showFlag = false;


	// 点击搜索选项，弹出select框
	$scope.showSelect = function(selectID){
		document.getElementById(selectID+"Select").style.display = 'inline-block';
	}

		// 获取根作用域中定义的列表数据 在search页面遍历
		var arr1,arr2,arr3;
		arr1 = $rootScope.cityList;
		arr2 = $rootScope.salaryList;
		arr3 = $rootScope.empnumList;
		// 下拉选项的初始值
		$scope.selectValue1 = arr1[0].id;
		$scope.selectValue2 = arr2[0].id;
		$scope.selectValue3 = arr3[0].id;
		// 将局部变量赋值给下拉选项
		$scope.select1 = arr1;
		$scope.select2 = arr2;
		$scope.select3 = arr3;

	// 根据下拉选项的value值查找对应的具体数据
	$scope.selectOption1 = function(){
		for (var index in arr1) {
			if(arr1[index].id == $scope.selectValue1){
				$scope.selectCity = arr1[index].name;
			}
		};
	}
	$scope.selectOption2 = function(){
		for (var index in arr2) {
			if(arr2[index].id == $scope.selectValue2){
				$scope.selectSalary = arr2[index].name;
			}
		};
	}
	$scope.selectOption3 = function(){
		for (var index in arr3) {
			if(arr3[index].id == $scope.selectValue3){
				$scope.selectEmpnum = arr3[index].name;
			}
		};
	}

	httpService.getPositionList(function(data){
        // 将获取的数据赋值给作用域
        $scope.positionList = data.data;
        console.log($scope.positionList);
    });
}]); 