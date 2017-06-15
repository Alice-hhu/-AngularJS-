// 获取app模块
angular.module('app')
// 显示薪资的过滤器
.filter('salary',function(){
	return function(data){
		if (data.indexOf('~') != -1) {
			
			var arr = data.split("~");
			var num1 = (Number(arr[0])/1000).toFixed(0);
			var num2 = (Number(arr[1])/1000).toFixed(0);
			return num1+'k~'+num2+'k';
		}else{
			var arr = data.split("以");
			var num1 = (Number(arr[0])/1000).toFixed(0);
			return num1+'k以'+arr[1];
		}
	}
})
// 显示不同状态投递简历列表的过滤器 —— 企业查看投递简历
.filter('resumeStatus',function(){
	return function(data,pattern = "all"){

		var newData = [];
		// 遍历投递简历列表，比较投递状态 是否与过滤器参数一致
			// 将一致的数据返回
		for(var index in data){
			if (data[index].applyId == pattern) {
				newData.push(data[index]);
			}
		}
		return newData;

	}
})
// 根据city salary empnum 筛选显示简历列表的过滤器 —— 搜索页面
.filter('positionFilter',function(){
	return function(data,pattern1="全国",pattern2="不限",pattern3="不限"){

		// city
			// 定义新数组
		var newData1 = [];
			// 判断选项
		if (pattern1 == "全国") {
			newData1 = data;
		}else{
			for (var index in data) {
				if (data[index].cityname == pattern1) {
					newData1.push(data[index]);
					// console.log(data[index].cityname);
				}
			};
		}
		
		// salary
		var newData2 = [];
		if (pattern2 == "不限") {
			newData2 = newData1;
		}else{
			for (var index in newData1) {
				if (newData1[index].salary == pattern2) {
					newData2.push(newData1[index]);
				}
			};
		}

		// empnum
		var newData3 = [];
		if (pattern3 == "不限") {
			newData3 = newData2;
		}else{
			for (var index in newData2) {
				if (newData2[index].empnum == pattern3) {
					newData3.push(newData2[index]);
				}
			};
		}

		return newData3;

	}
});