/****************type*******************/
var type = function(obj) {
	if (null === obj) {
		return 'null';
	}

	if (undefined === obj) {
		return 'undefined';
	}

	var class2type = [];
	var type = "Boolean Number String Date Array RegExp Function Object".split(" ");

	(function(arr, callback) {
		for (var i = 0; i < arr.length; i++) {
			callback.call(arr[i], i, arr[i]);
		}
	})(type, function(i, value) {
		class2type['[object ' + value + ']'] = value.toLowerCase();
	});

	return class2type[Object.prototype.toString.call(obj)];
};

var isFunction = function(fn) {
	return type(fn) === 'function';
};

var isDate = function(d) {
	return type(d) === "date";
};

var isNumber = function(n) {
	return type(n) === "number";
};

var isString = function(s) {
	return type(s) === "string";
};

var isObject = function(o) {
	return type(o) === "object";
};

var isBoolean = function(b) {
	return type(b) === 'boolean';
};

var isRegExp = function(r) {
	return type(r) === 'regexp';
};

var isArray = function(a) {
	return type(a) === "array";
}
