(function(w) {
	if(typeof String.prototype.startWith !== "function") {
		String.prototype.startWith = function(str) {
			return this.slice(0, str.length) == str;
		}
	}

	if(typeof String.prototype.endWith !== "function") {
		String.prototype.endWith = function(str) {
			return this.slice(this.length - str.length, this.length) == str;
		}
	}

	if(typeof Array.prototype.remove !== "function") {
		String.prototype.remove = function(b) {
			
		}
	}
})(window);