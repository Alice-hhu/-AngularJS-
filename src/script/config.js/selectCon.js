'use strict';

angular.module('app').run(['$rootScope','$http',function($rootScope,$http){
	
	// 获取城市列表
	$http.get('data/city.json').then(function(res){

		$rootScope.cityList = res.data;

	},function(res){
		alert("获取城市列表失败！");
	});
	
	// 获取薪资列表
	$http.get('data/salary.json').then(function(res){

		$rootScope.salaryList = res.data;

	},function(res){
		alert("获取薪资列表失败！");
	});

	// 获取公司规模列表
	$http.get('data/amount.json').then(function(res){

		$rootScope.empnumList = res.data;

	},function(res){
		alert("获取公司规模列表失败！");
	});

}]);