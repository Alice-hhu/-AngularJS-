// 获取app模块
var app = angular.module('app');
// 配置服务
	// 配置一个cookie的存取删的公用服务，提供给不同的控制器调用
app.service('cache', ['$cookies', function($cookies){

	// 存cookie
	this.put = function(key,value){
		$cookies.put(key,value);
	}
	// 取cookie
	this.get = function(key){
		return $cookies.get(key);
	}
	// 删cookie
	this.remove = function(key){
		$cookies.remove(key);
	}
	
}]);
	// 配置一个公用的服务，提供下面的httpService调用
app.service('baseService', ['$http', function($http){

	this.getData = function(url,callback){

		$http.get(url,{})
			.then(function(res){
				// $http 请求都是异步的，所以可能在响应数据回来之前，代码就已经执行完毕了，此时无法获取到响应数据
				// 解决方法：由控制器调用方法时传入一个callback回调函数，此函数用于等待直接获取响应数据
				callback(res.data);
			},function(res){
				alert("服务器无响应，请稍后再试！");
		});
	}

	
}]);
	// 配置一个公用的url，提供下面的httpService调用
	var baseUrl = "http://192.168.1.8:8080/lgw/";

	// 配置一个自定义的服务，提供给不同的控制器，进行发送请求获取数据的方法调用
app.service('httpService', ['baseService', function(baseService){

	// 主页获取PositionList的方法
	this.getPositionList = function(callback){

		var url = baseUrl + "advis/query";

		baseService.getData(url,callback);
	
	}

	// 获取Position详情的方法
	this.positionDetail = function(positionID,userID,callback){

		var url = baseUrl + "advis/loadDetail/"+positionID+'/'+userID;

		baseService.getData(url,callback);
	
	}

	// 个人登录的方法
	this.loginPersonal = function(username,password,callback){

		var url = baseUrl + "user/login?username="+username+"&password="+password;

		baseService.getData(url,callback);
	
	}

	// 企业登录的方法
	this.loginCompany = function(username,password,callback){

		var url = baseUrl + "company/login?username="+username+"&password="+password;

		baseService.getData(url,callback);
	
	}

	// 个人获取注册验证码
	this.getCode = function(username,password,callback){

		var url = baseUrl + "user/loadValidCode?username="+username+"&password="+password;

		baseService.getData(url,callback);
	}

	// 个人注册的方法
	this.registerPersonal = function(validCode,codeID,callback){

		var url = baseUrl + "user/regist?validcode="+validCode+"&id="+codeID;

		baseService.getData(url,callback);
	
	}

	// 个人获取注册验证码
	this.getCodeC = function(username,password,company,empnum,callback){

		var url = baseUrl + "company/loadValidCode?username="+username+"&password="+password+"&companyname="+company+"&empnum="+empnum;
		
		baseService.getData(url,callback);
	}
	// 企业注册的方法
	this.registerCompany = function(validCode,codeID,callback){

		var url = baseUrl + "company/regist?validcode="+validCode+"&id="+codeID;

		baseService.getData(url,callback);
	
	}

	// 收藏
	this.saveResume = function(userID,positionID,callback){

		var url = baseUrl + "col/add?userid="+userID+"&advertiesid="+positionID;
		
		baseService.getData(url,callback);
	}

	// 取消收藏
	this.removeSave = function(saveID,callback){

		var url = baseUrl + "col/delCol/"+saveID;
		baseService.getData(url,callback);
	}

	// 投递简历
	this.sendResume = function(userID,positionID,callback){
		// 投简历时多传一个companyid，开发文档中缺失了，其实是需要的
			// 此处后台跟positionid是同一个 ，暂时先不多传形参了
		var url = baseUrl + "apply/add?userid="+userID+"&advertiesid="+positionID+"&companyid="+positionID;
		
		baseService.getData(url,callback);
	}

	// 查看投递记录
	this.mySendList = function(userID,sendStatus,callback){

		// 此处默认status是all，需要修改
		var url = baseUrl + "apply/loadData/"+userID+"/"+sendStatus;
		
		baseService.getData(url,callback);
	}

	// 查看收藏记录
	this.mySaveList = function(userID,callback){

		var url = baseUrl + "col/loadData/"+userID;
		
		baseService.getData(url,callback);
	}

	// 企业发布招聘职位
	// 单独使用post方式发送请求

	// 企业查看投递简历列表
	this.myResumes = function(companyID,resumeStatus,callback){

		// 此处默认status是new，需要修改
		var url = baseUrl + "apply/load/"+companyID+"/"+resumeStatus;
		
		baseService.getData(url,callback);
	}

	// 企业通过/拒绝投递
	this.approve = function(resumeID,option,callback){

		// ——>>> 后台不完善，前台功能无法实现
		var url = baseUrl + "apply/deal/"+resumeID+"/"+option;
		
		baseService.getData(url,callback);
	}









	
}]);