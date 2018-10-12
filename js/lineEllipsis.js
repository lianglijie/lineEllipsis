/**
 * (c) Copyright 2018 lianglijie. All Rights Reserved. 
 */
(function() {
	window.$lineEllipsis = function(options) {
		var opt = {
			id:options.id ,
			rows:options.rows || 2
		}
		var getId = document.querySelector("#" + opt.id); //获取id
		if(opt.rows == 1){ //当行高为1行时直接添加style样式，
			setOneLine(getId);
			return false
		}
		//判断浏览器内核是否为webkit，如果是webkit就直接使用css3设置多行显示省略号
		if(browserType()){
			 browserWebkit(getId,opt.rows);
			return false;
		}
		var lineHeight = getCss(getId, "line-height"); //获取行高
		if(lineHeight == "normal") { //当没有设置行高属性，行高默认为font-size * 1.2
			console.log(parseInt(getCss(getId, "font-size")))
			lineHeight = Math.ceil(parseInt(getCss(getId, "font-size")) * 1.3); //
		}else{
			lineHeight = parseInt(lineHeight)
		}
		
		//根据行高*行数量设置最大的高度
		var maxHeight = getMaxHeight(lineHeight,opt.rows,getId);
		//获取文本的高度
		 
		var contHeight = getContHeight(getId);
		
		var maxLienHeight = maxLine(contHeight,lineHeight);//获取文本实际行数
	
		//当文本高度小于要设置的行高时不进行内容超出后显示省略号处理
		if(contHeight <= maxHeight) {
			return false;
		}
		
		//获取文本内容
		var getText = str = getId.innerText;
		var len = getId.innerHTML.length; //获取文本的长度
		var harfLen = parseInt(len / (maxLienHeight-1) * opt.rows); //获取
		
		getId.innerHTML = str.substring(0, harfLen); //设置文本内容
		var harfHei = getContHeight(getId); //获取赋值后的高度
		len = getId.innerHTML.length; //获取文本的长度
		while(harfHei > maxHeight){
			harfLen -= 1; 
			getId.innerHTML = str.substring(0, harfLen) + "..."; //设置文本内容
			harfHei = getContHeight(getId); //获取实际文本的高度
		}
		
		
		//获取style的样式
		function getCss(curEle, attr) { //curele:对象; attr：要获取的的属性
			if(window.getComputedStyle){ //ie9以上浏览器支持
				return window.getComputedStyle(curEle,null).getPropertyValue(attr)
			}else{
				return curEle.currentStyle[attr]
			}
		}
		
		//判断浏览器内核 返回true表示内核为webkit
		function browserType(){ 
			var nav = navigator.userAgent.toLowerCase(); //获取浏览器
			if(nav.indexOf('applewebkit/') > -1){
				return true;
			}
			return false;
		}
		//如果浏览器的内核为webkit，可以直接使用webkit提供的样式直接设置显示的多行显示省略号
		function browserWebkit(obj,rows){
			obj.style.overflow = 'hidden';
		    obj.style.textOverflow = 'ellipsis';
		    obj.style.webkitBoxOrient = 'vertical';
		    obj.style.display = '-webkit-box';
		    obj.style.webkitLineClamp = rows;
		
		}
		//获取文本内容的高度
		function getContHeight(obj){
			return obj.clientHeight;
		}
		
		//获取多行文本的高度
		function getMaxHeight(lineHeight,rows,getId){
			var rowHei = lineHeight * rows + parseInt(getCss(getId, "padding-top"))+  parseInt(getCss(getId,"padding-bottom"))
			return rowHei
		}
		//设置当行为1时设置高度
		function setOneLine(obj){
			obj.style.overflow="hidden";
			obj.style.textOverflow="ellipsis";
			obj.style.whiteSpace = "nowrap"
		}
		//判断有几行数据
		function maxLine(contHei,lineHei){
			var num = contHei / lineHei;
			return Math.ceil(num);//返回当前行数
		}
	}
	
})();
