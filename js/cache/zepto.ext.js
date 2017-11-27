//----------------------String 对象---------------------------------
/**
 * String.startsWidth(str); 	//String对象是否是以str开头的。
 * 给String对象添加startsWith方法。
 */
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
};

/**
 * String.endWith(str); 	//String对象是否是以str结束的。
 * 给String对象添加endWith方法。
 */
if (typeof String.prototype.endWith != 'function') {
	String.prototype.endWith = function(str) {
		return this.slice(this.length - str.length, this.length) == str;
	};
}

//----------------------Array 对象-----------------------------------
/**
 * ArrayObject.remove(Object);
 * ["1","2","3","4"].remove("2");
 * 删除传递的对象并返回值，如果删除成功就返回true，删除失败返回false
 *
 */
Array.prototype.remove = function(b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};

/**
 * ArrayObject.toString();
 * 把数组对象转换成字符串对象，数组对象之间以逗号分隔。
 * @returns {String}
 */
Array.prototype.toString = function() {
    var temp = "";
    if(this.length != 0){
        for(var i = 0; i != this.length; i++){
            temp += this[i];
            if(i != this.length-1){
                temp += ",";
            }
        }
    }
    return temp;
};

//------------------------------Date 对象-------------------------
/**
 * Date.format(format); //格式化日期
 * 把日期格式化成指定的字符串格式。
 */
Date.prototype.format = function(format) { 
    var o = { 
        "M+" : this.getMonth()+1, //month 
        "d+" : this.getDate(),    //day 
        "h+" : this.getHours(),   //hour 
        "m+" : this.getMinutes(), //minute 
        "s+" : this.getSeconds(), //second 
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter 
        "S" : this.getMilliseconds() //millisecond 
    } 
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    } 
	return format; 
};

//------------------------------zepto------------------------------
/**
 * $.exists("selector");
 * 判断当前页面上是否有该选择器对应的dom对象
 */
$.exists = function(selector) {
    return ($(selector).length > 0);
}

//浏览器判断
$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
$.browser.iphone = /iphone/.test(navigator.userAgent.toLowerCase());

/**
 * $.postText(uri, data, cb);
 * @parameter uri  请求的路径地址
 * @parameter data	请求的数据
 * @parameter cb	回调函数data数据是text
 * 
 */
$.extend($, {
	postText: function(uri, data, cb){
		data = data || {};
	    var createComplete = function(cb){
	         return function(data){
	                cb(data);
	         };
	    };
		if(typeof cb != "undefined") {
			$.post(uri, data, 
					function(datas,textStatus) {
						cb(datas);
					},
					"text"
			);
		} else {
			this.commonUpload({
				url: uri,
				data: data
			});
		}
	}
});

/**
 * $.cookie(name);获取key为那么的cookie值
 * $.cookie(name, value [, options]);设置cookie
 * @param {Object} name 	cookie的名字
 * @param {Object} value	cookie的值
 * @param {Object} options	options对象有三个属性：1.expires--是数字就表示多少天，或是一个date对象表示过期时间。
 * 			2.path--路径在此路径获子路径下才可获取cookie值。3.domain--指定的网站发送请求才携带cookie。值网站地址。
 * 			4.secure--是否使用安全套接字层 (SSL)（即仅通过 HTTPS）传输 Cookie，值为true或false。
 */
$.extend($, {
	cookie: function(name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = new Date(0);
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        // CAUTION: Needed to parenthesize options.path and options.domain
	        // in the following expressions, otherwise they evaluate to undefined
	        // in the packed version for some reason...
	        var path = options.path ? '; path=' + (options.path) : '';
	        var domain = options.domain ? '; domain=' + (options.domain) : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	        //alert(document.cookie);
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	}
});

/**
 * $.isNotBlank(str); //非空检查， 检测undefined、null、""、" "。
 * $.getStringLengthByBytes(str); //返回byte的长度。
 * $.html2jsstr(str); // 把html字符转成js字符
 * $.jsstr2html(str); // 把js字符转成html字符
 * $.isInt(str); //判断输入是否是一个整数   
 * $.toFix(value, precision); // 格式化浮点数, value待格式化的浮点数, precision保留小数位  
 */
$.extend($, {
    // 非空检查
    isNotBlank: function(str) {
		if(typeof str == "undefined" || str == null) {
			return false;
		}
		return this.getStringLengthByBytes($.trim(str)) != 0;
	},
    
    //返回byte长度
    getStringLengthByBytes: function(str){
    	if(typeof(str) == 'number') {
    		str += "";
    	}
        return str.replace(/[^\x00-\xFF]/g, '**').length;
    },
	
    // 把html字符转成js字符
	html2jsstr:function(str) {
		return str.replace(/<br\/>/g,"\r\n")
				.replace(/<br>/g,"\r\n")
				.replace(/&nbsp;/g," ")
				.replace(/&amp;/g,"&")
				.replace(/&lt;/g,"<")
				.replace(/&gt;/g,">")
				.replace(/&quot;/g,"\"");
	},
	
	// 把js字符转成html字符
	jsstr2html: function(str) {
		return str.replace(/&/g,"&amp;")
				.replace(/ /g,"&nbsp;")
				.replace(/</g,"&lt;")
				.replace(/>/g,"&gt;")
				.replace(/"/g,"&quot;")
				.replace(/\r\n/g,"<br/>")
				.replace(/\r/g,"<br/>")
				.replace(/\n/g,"<br/>");
	},
    
	//判断输入是否是一个整数   
    isInt: function(str){
        var result = str.match(/^(-|\+)?\d+$/);
        if (result == null) 
            return false;
        return true;
    },
    
    // 格式化浮点数
    // value待格式化的浮点数
    // precision保留小数位    
    toFix: function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    }
});

/**
 * $.parseDate('2015-02-04 09:17:59:099', 'yyyy-MM-dd hh:mm:ss:S'); 
 * $.parseDate('2015年02月04日 09时17分59秒099毫秒', 'yyyy年MM月dd日 hh时mm分ss秒S毫秒');
 * $.parseDate('2015/02/04 09:17:59:099', 'yyyy/MM/dd hh:mm:ss:S');
 * $.parseDate('2015/02/04', 'yyyy/MM/dd');
 * 日期字符串转化日期Date对象，可以是任意格式传递参数，每项的默认值是0;年的默认值是1900；
 */
$.extend($, {
	parseDate: function(str, format) {
		var year = 0,
			month = 0, 
			day = 0,
			hour = 0,
			minute = 0,
			second = 0,
			milliseconds = 0;
		var strArr = str.match(/(\d)+/g);
		var formatArr = format.match(/[yMdhmsS]+/g);
		for(var i = 0; i < formatArr.length; i++) {
			if(/(y+)/.test(formatArr[i])) {
				year = parseInt(strArr[i]);
			} else if(/(M+)/.test(formatArr[i])) {
				month = parseInt(strArr[i]) - 1;
			} else if(/(d+)/.test(formatArr[i])) {
				day = parseInt(strArr[i]);
			} else if(/(h+)/.test(formatArr[i])) {
				hour = parseInt(strArr[i]);
			} else if(/(m+)/.test(formatArr[i])) {
				minute = parseInt(strArr[i]);
			} else if(/(s+)/.test(formatArr[i])) {
				second = parseInt(strArr[i]);
			} else if(/(S+)/.test(formatArr[i])) {
				milliseconds = parseInt(strArr[i]);
			}
		}
		return new Date(year, month, day, hour, minute, second, milliseconds);
	}
});

/**
 * 瀑布流图片加载  流畅地加载瀑布流中的图片	减少兼容性或者图片残缺等问题	
 * 
 * 依赖
 * 	zepto.js 
 *  masonry.pkgd.js 瀑布流
 * 
 * 
 * 版本-NO.1
 * cff
 * 
 * $.initImage({
 * 	id: "",//容器的id
 *  createWaiting：function() {}, //图片加载时单个图片loading的蒙层
 *  layout：function() {}, //重新布局
 *  onload：function() {}, //图片加载完成
 *  onerror: function() {}, //图片加载失败
 * });
 */
(function($){
	var $contentElements = null;
	var params = null;
	
	$.initImage = function(param){
		params = $.extend({
			// default params
		}, param);
		$contentElements = $("[imageloader]");
		
		initDom();
		var img = $contentElements.find("img");
		bindEvents();
		
		after();
		$(img).unveil(100, param.id);
	};
	
	/**
	 * 创建image标签和覆盖层
	 */
	function initDom() {
		$contentElements.each(function() {
			var $content = $(this);
			// 获取基本元素属性
			var imgSrc = $content.attr("img-src");
			var imgWidth = $content.attr("img-width");
			var imgHeight = $content.attr("img-height");
			var imgClass = $content.attr("img-class");
			
			// 计算缩放后的img宽高
			var contentWidth = $content.width();
			var contentHeight = parseInt(imgHeight) * contentWidth / parseInt(imgWidth);
			
			// 创建img元素
			var img_src = "images/error.png";
			if($global) {
				img_src = $global.server + "html/pswx1/images/error.png";
			}
			var img = "<img class='"+ imgClass +"' src='" + img_src + "' data-src='"+ imgSrc +"' style='opacity:0.3; width: "+contentWidth+"px;height:"+contentHeight+"px;'/>";
			$content.html(img);
			
			// 创建蒙层
			var waiting = null;
			if(params.createWaiting && typeof params.createWaiting == "function") {
				waiting = params.createWaiting.call(this, {});
			} else {
				// 默认蒙层
				waiting = $("<div class='spinner'><div class='rect0'></div><div class='rect1'></div><div class='rect2'></div></div>");
				waiting.css({
					"margin-top": ((contentHeight - 50) / 2) + "px",
					"margin-left": ((contentWidth - 50) / 2) + "px"
				});
			}
			$content.prepend(waiting);
		});
	}
	
	function bindEvents() {
		if(typeof params.layout == "function") {
			params.layout.call(this, {ele: $('#' + params.id).get(0)});
		}
		$contentElements.each(function() {
			$img = $(this).find("img");
			
			// 成功加载时
			$img.bind("load", function() {
				if(params.onload && typeof params.onload == "function")	{
					params.onload.call(this,{});
					$(this).siblings().remove();
					$(this).css({opacity: "1"});
				} else {
					$(this).siblings().remove();
					$(this).css({opacity: "1"});
				}
			});
			
			// 加载异常时
			$img.bind("error", function() {
				$(this).siblings().remove();
				if(params.onerror && typeof params.onerror == "function") {
					params.onerror.call(this);
				} else {
					var img = $(this);
					var div = $("<div/>");
					div.height(this.height);
					div.width(this.width);
					img.wrap(div);
					div.css({
						"background-color": "#76c7c0"
					});
					var content = $("<div/>");
					img.wrap(content);
					
					// FIXME add by Keith 2015-01-09 11:14:30  
					// 不要用js写css，而是写成zepto.ext.css类似的框架样式文件，方便管理
					// 特别需要注意，样式表中使用图片的，图片也要保存
					content.css({
						height: "100%",
						width: "100%",
						"background-image": "url(images/error.png)",
						"background-size": "contain",
						"background-position": "center center",
						"background-repeat": "no-repeat"
					});
					img.css("visibility", "hidden");
					content.bind("click", function() {
						img.trigger("click");
					});
				}
			});
		});
	};
	
	/**
	 * 清除root的扩展属性
	 */
	function after() {
		$contentElements.each(function() {
			var $content = $(this);
			$content.removeAttr("img-src");
			$content.removeAttr("img-width");
			$content.removeAttr("img-height");
			$content.removeAttr("img-class");
			$content.removeAttr("imageloader");
		});
	}
})(window.jQuery || window.Zepto);

;(function($) {
  $.fn.unveil = function(threshold, id, callback) {
    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded;
	
	// 绑定unveil事件，加载图片
    this.one("unveil", function() {
      var source = this.getAttribute(attrib);	
      source = source || this.getAttribute("data-src");
      if (source) {
        this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      }
    });

    function unveil() {
		// 获取视域中的image
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });
		
		// 触发unveil事件
      loaded = inview.trigger("unveil");
	  // 将已经加载的image从image对象数组中剔除
      images = images.not(loaded);
    }

	// 当窗口滚动的时候触发unveil方法
    if(id && typeof id != "undefined") {
    	$("#" + id).bind("scroll", function() {
    		unveil();
    	});
    } else {
    	$w.on("scroll.unveil resize.unveil lookup.unveil", unveil);
    }
    unveil();

    return this;
  };
})(window.jQuery || window.Zepto);