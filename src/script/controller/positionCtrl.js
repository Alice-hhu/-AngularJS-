'use strict';
angular.module('app').controller('positionCtrl', ['$scope','httpService','cache','$state', function($scope,httpService,cache,$state){

    // 判断是否登录过
    $scope.userNow = cache.get('userNow');
    $scope.userID = cache.get('userID') || -1;

    // 获取url 中的 position 的id
    $scope.positionID = $state.params.id;


    // 获取职位详情
    httpService.positionDetail($scope.positionID,$scope.userID,function(data){

        $scope.postion = data.data.industry;
        $scope.company = data.data.companyname;
        $scope.empnum = data.data.empnum;
        $scope.city = data.data.cityname;
        $scope.publishtime = data.data.publishtime;
        $scope.salaryNow = data.data.salary;
        $scope.img = data.data.imgurl;

        $scope.btnName = "投递简历";
        console.log(data);

        // 判断是否收藏过
        $scope.saveFlag = data.hasCol? true:false;
        // 获取收藏的id 如果没有收藏过，默认给一个初始值-1
        $scope.saveID = data.hasCol? data.hasCol.id : -1;
    });

    // 收藏
    $scope.saveResume = function(){
        if ($scope.userID != -1) {

            httpService.saveResume($scope.userID,$scope.positionID,function(data){
                if (data.success) {
                    $scope.saveFlag = true;
                }
                alert(data.message);
            }); 
        }else{
            alert("请以个人用户登录，再收藏招聘职位！");
            $state.go('myInfo');
        }
    }

    // 取消收藏
    $scope.removeSave = function(){

        httpService.removeSave($scope.saveID,function(data){
            if (data.success) {
                $scope.saveFlag = false;
            }
            alert(data.message);
        });
    }

    // 投递简历
    $scope.sendResume = function(){

        if ($scope.userID != -1) {

            httpService.sendResume($scope.userID,$scope.positionID,function(data){
                if (data.success) {
                    // 投递成功后当场禁用投递按钮
                    $scope.btnName = "已投递";
                    document.getElementsByClassName('sendResume')[0].disabled = true;
                }
                alert(data.message);
            });

        }else{
            alert("请以个人用户登录，再投递简历！");
            $state.go('myInfo');
        }

    }

}]);