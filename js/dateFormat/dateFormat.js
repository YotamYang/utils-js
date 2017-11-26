(function(global) {
	if (global.Date && typeof global.Date === "function") {
		global.Date.prototype.format = function(format) {
			var o = {
				"M+": this.getMonth() + 1, //month
				"d+": this.getDate(),	//day
				"h+": this.getHours(),	//hour
				"m+": this.getMinutes(),	//minutes
				"s+": this.getSeconds(),	//second
				"q+": global.Math.floor((this.getMonth() + 3) / 3),	//quarter
				"S": this.getMilliseconds()	//milisecond
			};
			if(/(y+)/.test(format)) {
				format =  format.replace(RegExp.$1, (this.getFullYear() + "").substring(4 - RegExp.$1.length));
			}

			for (var k in o) {
				if(new RegExp('(' + k + ')').test(format)) {
					format = format.replace(RegExp.$1, (RegExp.$1.length = 1) ? (o[k]) : ("00" + o[k]).substring(("" + o[k]).length));
				}
			}

			return format;
		};
	}
})(window);