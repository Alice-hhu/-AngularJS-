//引入模块
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();//需要实例化 加括号 调用这个函数              
var open = require('open');
var browserSync = require('browser-sync').create();

//创建一个全局变量，用来定义目录路径
var app = {
	srcPath : 'src/',
	devPath : 'build/',
	prdPath : 'dist/'
};

//bower下载的第三方依赖，copy过来
gulp.task('lib',function(){
	gulp.src('bower_components/**/*.js')
		.pipe(gulp.dest(app.devPath + 'vendor'))
		.pipe(gulp.dest(app.prdPath + 'vendor'))
		.pipe(browserSync.stream());//浏览器同步更新
});
//copy html
gulp.task('html',function(){ 
	gulp.src(app.srcPath + '**/*.html')
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.prdPath))
		.pipe(browserSync.stream());//浏览器同步更新
});

//copy json 假数据 进行测试 
gulp.task('json',function(){
	gulp.src(app.srcPath + 'data/**/*.json')
		.pipe(gulp.dest(app.devPath + 'data'))
		.pipe(gulp.dest(app.prdPath + 'data'))
		.pipe(browserSync.stream());//浏览器同步更新
});

//编译less
gulp.task('less',function(){
	gulp.src(app.srcPath + 'style/**/*.less')
		.pipe($.less())
		.pipe(gulp.dest(app.devPath + 'css'))
		// .pipe($.concat('index.css'))
		.pipe($.cssmin())
		.pipe(gulp.dest(app.prdPath + 'css'))
		.pipe($.plumber())
		.pipe(browserSync.stream());//浏览器同步更新
});

//编译js
gulp.task('js',function(){
	gulp.src(app.srcPath + 'script/**/*.js')
		.pipe($.plumber())
		.pipe($.concat('index.js'))
		.pipe(gulp.dest(app.devPath + 'js'))
		.pipe($.uglify())
		.pipe(gulp.dest(app.prdPath + 'js'))
		.pipe(browserSync.stream());//浏览器同步更新
});

//压缩img
gulp.task('image',function(){
	gulp.src(app.srcPath + 'image/**/*')
		.pipe($.imagemin())
		.pipe(gulp.dest(app.devPath + 'image'))
		.pipe(gulp.dest(app.prdPath + 'image'))
		.pipe(browserSync.stream());//浏览器同步更新
});

//合并之前的任务
gulp.task('build',['image','js','less','lib','html','json']);

//清空clean之前的
gulp.task('clean',function(){
	gulp.src([app.devPath,app.prdPath])
		.pipe($.clean())
		.pipe(browserSync.stream());//浏览器同步更新
});

//静态服务器
gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:'./build'
		},
		port:'2017'
	});
	//监视
	gulp.watch('bower_components/**/*.js',['lib']);
	gulp.watch(app.srcPath + '**/*.html',['html']);
	gulp.watch(app.srcPath + 'data/**/*.json',['json']);
	gulp.watch(app.srcPath + 'style/**/*.less',['less']);
	gulp.watch(app.srcPath + 'script/**/*.js',['js']);
	gulp.watch(app.srcPath + 'image/**/*',['image']);

});