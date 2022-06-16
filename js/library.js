/*!
 * Library.js - JavaScript Plugin
 * 
 * Version  : 4.2 (2017/03/28)
 *
 * CopyRight (c) library.js Naotaka Kawakami.
 * Dual licensed under the MIT licenses.
 */
"use strict";

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozcancelAnimationFrame || window.webkitcancelAnimationFrame || window.mscancelAnimationFrame;

var Library = function () {
	var PARAM = {
		URI: undefined,
		VISITOR: undefined,
		DATE: undefined,
		WINDOW: { width: 0, height: 0, type: '', scroll: 0 },
		GRID: {
			xs: { min: 0, max: 576 },
			sm: { min: 577, max: 768 },
			md: { min: 769, max: 992 },
			lg: { min: 993, max: 1200 },
			xl: { min: 1201, max: 99999 }
		}
	};
	var Window = function Window() {
		var delay = 300;
		var isTouchEvent = 'ontouchend' in document;
		var timer = { scroll: undefined, resize: undefined };
		var EVENT = {
			BreakPoint: document.createEvent('HTMLEvents'),
			ResizeStop: document.createEvent('HTMLEvents'),
			ScrollStop: document.createEvent('HTMLEvents'),
			Resize: function Resize() {
				if (PARAM.VISITOR.device.os == 'ios') document.documentElement.clientWidth;
				PARAM.WINDOW.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				PARAM.WINDOW.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

				for (var key in PARAM.GRID) {
					if (PARAM.GRID[key].max >= PARAM.WINDOW.width && PARAM.WINDOW.width >= PARAM.GRID[key].min && PARAM.WINDOW.type !== key) {
						PARAM.WINDOW.type = key;
						PARAM.WINDOW.mediaQuery = key.indexOf('xs') !== -1 || key.indexOf('sm') !== -1 ? 'sp' : 'pc';
						window.dispatchEvent(EVENT.BreakPoint);
					}
				}
				if (timer.resize) clearTimeout(timer.resize);

				timer.resize = window.setTimeout(function () {
					window.dispatchEvent(EVENT.ResizeStop);
				}, delay);
			},
			Scroll: function Scroll() {
				PARAM.WINDOW.scroll = window.pageYOffset;

				if (timer.scroll) {
					clearTimeout(timer.scroll);
				}

				timer.scroll = window.setTimeout(function () {
					window.dispatchEvent(EVENT.ScrollStop);
				}, delay);
			}
		};
		EVENT.BreakPoint.initEvent("breakPoint", true, false);
		EVENT.ResizeStop.initEvent("resizeStop", true, false);
		EVENT.ScrollStop.initEvent("scrollStop", true, false);

		EVENT.Resize();
		EVENT.Scroll();

		window.addEventListener('resize', function () {
			return EVENT.Resize();
		}, false);
		window.addEventListener('scroll', function () {
			return EVENT.Scroll();
		}, false);
		if ('ontouchstart' in window) window.addEventListener('touchmove', function () {
			return EVENT.Scroll();
		}, false);

		window.touchEvent = {
			start: isTouchEvent ? 'touchstart' : 'mouseenter',
			move: isTouchEvent ? 'touchmove' : 'mousemove',
			end: isTouchEvent ? 'touchend' : 'mouseleave'
		};
	};
	var DateTime = function DateTime() {
		var d = new Date();
		var data = {
			timestamp: parseInt(d / 1000),
			now: {
				year: String(d.getFullYear()),
				month: d.getMonth() + 1 < 10 ? String('0' + (d.getMonth() + 1)) : String(d.getMonth() + 1),
				day: d.getDate() < 10 ? String('0' + d.getDate()) : String(d.getDate()),
				hour: d.getHours() < 10 ? String('0' + d.getHours()) : String(d.getHours()),
				min: d.getMinutes() < 10 ? String('0' + d.getMinutes()) : String(d.getMinutes()),
				sec: d.getSeconds() < 10 ? String('0' + d.getSeconds()) : String(d.getSeconds())
			}
		};
		PARAM.DATE = data;
	};
	var Visitor = function Visitor() {
		var floatFormat = function floatFormat(number, n) {
			return Math.round(parseFloat(number) * Math.pow(10, n)) / Math.pow(10, n);
		};

		var _ua = window.navigator.userAgent.toLowerCase();
		var _av = window.navigator.appVersion.toLowerCase();

		var data = {
			userAgent: _ua,
			type: undefined,
			browser: { app: undefined, version: undefined },
			device: { os: undefined, version: undefined }
		};

		var arr;
		if (_ua.indexOf("windows") !== -1 && _ua.indexOf("touch") !== -1 && _ua.indexOf("tablet pc") === -1) {
			data.type = 'tablet';
			data.device.os = 'windows tablet';
		} else if (_ua.indexOf('windows phone') !== -1) {
			arr = /windows phone\ ([\d\.]+)/.exec(_ua);
			data.type = 'mobile';
			data.device.os = 'windows phone';
			data.device.version = floatFormat(arr[1], 1);
		} else if (_ua.indexOf("ipad") !== -1) {
			arr = /os (\w+){1,3}/g.exec(_ua);
			data.type = 'tablet';
			data.device.os = 'ios';
			data.device.version = floatFormat(arr[1].replace(/_/g, '.'), 1);
		} else if (_ua.indexOf("iphone") !== -1 || _ua.indexOf("ipod") !== -1) {
			if (_ua.indexOf("opera") !== -1) {
				data.device.version = undefined;
			} else {
				arr = /iphone os (\w+){1,3}/g.exec(_ua);
				data.device.version = floatFormat(arr[1].replace(/_/g, '.'), 1);
			}
			data.type = 'mobile';
			data.device.os = 'ios';
		} else if (_ua.indexOf("android") !== -1 && _ua.indexOf("mobile") !== -1) {
			arr = /android\ ([\d\.]+)/.exec(_ua);
			data.type = 'mobile';
			data.device.os = 'android';
			data.device.version = floatFormat(arr[1], 1);
		} else if (_ua.indexOf("android") !== -1) {
			arr = /android\ ([\d\.]+)/.exec(_ua);
			data.type = 'tablet';
			data.device.os = 'android';
			data.device.version = floatFormat(arr[1], 1);
		} else if (_ua.indexOf("bb10") !== -1 || _ua.indexOf("blackberry") !== -1) {
			data.type = 'mobile';
			data.device.os = 'blackberry';
			if (_ua.indexOf("bb10") !== -1) {
				data.device.version = 'bb10';
			} else {
				arr = /blackberry\ ([\d\.]+)/.exec(_ua);
				data.device.version = arr[1];
			}
		} else if (_ua.indexOf("playbook") !== -1) {
			data.type = 'tablet';
			data.device.os = 'blackberry';
			data.device.version = 'playbook';
		} else if (_ua.indexOf("windows") !== -1) {
			arr = /windows nt\ ([\d\.]+)/.exec(_ua);
			data.type = 'pc';
			data.device.os = 'windows';
			if (arr[1] === '10.0') {
				data.device.version = 10;
			} else if (arr[1] === '6.3') {
				data.device.version = 8.1;
			} else if (arr[1] === '6.2') {
				data.device.version = 8;
			} else if (arr[1] === '6.1') {
				data.device.version = 7;
			} else if (arr[1] === '6.0') {
				data.device.version = 'vista';
			} else if (arr[1] === '5.2') {
				data.device.version = 'xp';
			} else if (arr[1] === '5.1') {
				data.device.version = 'xp';
			}
		} else if (_ua.indexOf("macintosh") !== -1) {
			arr = /mac os x\ ([\d\.]+)/.exec(_ua);
			data.type = 'pc';
			data.device.os = 'mac';
			data.device.version = parseFloat(arr[1]);
		}

		if (_ua.indexOf('msie') >= 0 || _ua.indexOf('trident') >= 0) {
			arr = /(msie|rv:?)\s?([\d\.]+)/.exec(_ua);
			data.browser.app = 'ie';
			data.browser.version = arr ? parseFloat(arr[2]) : undefined;
		} else {
			if (_ua.indexOf('edge') !== -1) {
				arr = /edge\/([\d\.]+)/.exec(_ua);
				data.browser.app = 'edge';
			} else if (_ua.indexOf('firefox') !== -1 || _ua.indexOf('fxios') !== -1) {
				arr = _ua.indexOf('firefox') !== -1 ? /firefox\/([\d\.]+)/.exec(_ua) : /fxios\/([\d\.]+)/.exec(_ua);
				data.browser.app = 'firefox';
			} else if (_ua.indexOf('opera') !== -1 && _ua.indexOf("version") !== -1 || _ua.indexOf("opr") !== -1) {
				arr = _ua.indexOf("version") !== -1 ? /version\/([\d\.]+)/.exec(_ua) : /opr\/([\d\.]+)/.exec(_ua);
				data.browser.app = 'opera';
			} else if (_ua.indexOf('chrome') !== -1 || _ua.indexOf('crios') !== -1) {
				arr = _ua.indexOf('chrome') !== -1 ? /chrome\/([\d\.]+)/.exec(_ua) : /crios\/([\d\.]+)/.exec(_ua);
				data.browser.app = 'chrome';
			} else if (_ua.indexOf("bb10") !== -1 || _ua.indexOf("blackberry") !== -1 || _ua.indexOf("playbook") !== -1) {
				arr = _ua.indexOf("blackberry") !== -1 ? /blackberry\ ([\d\.]+)/.exec(_ua) : undefined;
				data.browser.app = 'blackberry';
			} else if (_ua.indexOf('android') !== -1 && _ua.indexOf("mobile") !== -1) {
				arr = /android\ ([\d\.]+)/.exec(_ua);
				data.browser.app = 'android';
			} else if (_ua.indexOf('safari') !== -1 && _ua.indexOf("version") !== -1) {
				arr = /version\/([\d\.]+)/.exec(_ua);
				data.browser.app = 'safari';
			}
			data.browser.version = arr ? parseFloat(arr[1]) : undefined;
		}
		PARAM.VISITOR = data;
	};
	var Scroller = function Scroller(OPTIONS) {
		var option = {
			merge: OPTIONS && OPTIONS.merge ? OPTIONS.merge : 0,
			easing: OPTIONS && OPTIONS.easing ? OPTIONS.easing : 100,
			step: OPTIONS && OPTIONS.step ? OPTIONS.step : 45,
			fps: OPTIONS && OPTIONS.fps ? OPTIONS.fps : 60
		};
		var _this = {
			timerId: undefined,
			stepCount: 0,
			startY: 0,
			endY: 0,
			lastY: 0,
			interval: Math.floor(1000 / option.fps)
		};

		var move = function move() {
			if (_this.stepCount === option.step) {
				window.scrollTo(getCurrentX(), _this.endY);

				if (getCurrentY() + getViewportHeight() === getDocumentHeight()) {
					//setFragment(param.hrefdata.absolutePath);
				}
				return;
			} else {
				_this.stepCount++;
				window.scrollTo(getCurrentX(), getEasingY());
				_this.lastY = getEasingY();
				return _this.timerId = setTimeout(move, _this.interval);
			}
		};
		var setFragment = function setFragment(path) {
			return location.href = path;
		};
		var getCurrentY = function getCurrentY() {
			return document.body.scrollTop || document.documentElement.scrollTop;
		};
		var getCurrentX = function getCurrentX() {
			return document.body.scrollLeft || document.documentElement.scrollLeft;
		};
		var getDocumentHeight = function getDocumentHeight() {
			return document.documentElement.scrollHeight || document.body.scrollHeight;
		};
		var getViewportHeight = function getViewportHeight() {
			return PARAM.WINDOW.height;
		};
		var getEasingY = function getEasingY() {
			return Math.floor(getEasing(_this.startY, _this.endY, _this.stepCount, option.step, option.easing));
		};
		var getEasing = function getEasing(start, end, stepCount, step, easing) {
			var s = stepCount / step;
			return (end - start) * (s + easing / (100 * Math.PI) * Math.sin(Math.PI * s)) + start;
		};
		return {
			set: function set(param) {
				this.stop();
				if (param.startY === undefined) _this.startY = getCurrentY();
				_this.endY = param.endY + option.merge;
				_this.hrefdata = param.hrefdata;
				_this.lastY = _this.startY;
				_this.timerId = setTimeout(move, _this.interval);
			},
			stop: function stop() {
				clearTimeout(_this.timerId);
				_this.stepCount = 0;
			}
		};
	};
	var Scroll = function Scroll() {
		var NodeList = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([class*="not-scroll"])');

		for (var i = 0; i < NodeList.length; i++) {
			var value;
			value = NodeList[i];
			value.hrefdata = LIB.Analysis(value.getAttribute('href'));
			value.addEventListener('click', function (e) {
				var element = this;
				var target = document.querySelector('#' + element.hrefdata.hash) ? document.querySelector('#' + element.hrefdata.hash) : document.querySelector('a[name=' + element.hrefdata.hash + ']');
				if (target) {
					var offset = target.getBoundingClientRect();

					Scroller().set({
						endY: offset.top + PARAM.WINDOW.scroll,
						hrefdata: element.hrefdata
					});

					return e.preventDefault();
				}
			}, false);
		};
	};
	Library.prototype.Scroll = function (POSITION, OPTIONS) {
		if (POSITION < 0) return false;

		Scroller(OPTIONS).set({ endY: POSITION });
	};
	Library.prototype.Analysis = function (PATH) {
		var a, j, k, len, len1, query, value;

		var fields = { schema: 2, username: 5, password: 6, host: 7, path: 9, query: 10, hash: 11 };
		var uri = { querys: {}, paths: [], originalPath: PATH, absolutePath: function () {
				var e = document.createElement('a');e.href = PATH;return e.href;
			}() };
		var r = /^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(uri.absolutePath);

		for (var i in fields) {
			uri[i] = r[fields[i]];
		}
		uri.dir = uri.path.substring(0, uri.path.lastIndexOf('/')) + '/';
		uri.file = uri.path.substring(uri.path.lastIndexOf('/') + 1);

		if (uri.path) {
			var path = uri.path.split('/');
			for (var i = 0; i < path.length; i++) {
				if (path[i]) uri.paths.push(path[i]);
			}
		}

		if (uri.query) {
			var query = uri.query.split('&');
			for (var i = 0; i < query.length; i++) {
				var value = query[i].split('=');
				if (value.length === 2) {
					uri.querys[value[0]] = value[1];
				}
			}
		}
		return uri;
	};
	Library.prototype.ImagesLoader = function (IMAGES, CALL) {
		var type = Object.prototype.toString.call(IMAGES) === '[object Object]' ? 'object' : 'array';
		var timer = { limit: 10000, flag: undefined };
		var num = { count: 0, total: 0, percent: 0 };
		var data = undefined;
		var fn_callback = {};

		if (Object.prototype.toString.call(CALL) === '[object Object]') {
			fn_callback.step = Object.prototype.toString.call(CALL.step === '[object Function]') ? CALL.step : function () {};
			fn_callback.success = Object.prototype.toString.call(CALL.success === '[object Function]') ? CALL.success : function () {};
			fn_callback.error = Object.prototype.toString.call(CALL.error === '[object Function]') ? CALL.error : function () {};
			fn_callback.complete = Object.prototype.toString.call(CALL.complete === '[object Function]') ? CALL.complete : function () {};
		}

		var init = function init() {
			data = type === 'object' ? new Object() : new Array();
			num.total = type === 'object' ? Object.keys(IMAGES).length : IMAGES.length;

			if (num.total > 0 && type === 'object') {
				loadTimeOut();
				if (fn_callback.step) loadStep();
				for (var key in IMAGES) {
					var value = IMAGES[key];
					value.id = key;
					loader(handleLoad(value));
				}
			} else if (num.total > 0 && type === 'array') {
				loadTimeOut();
				if (fn_callback.step) loadStep();

				for (var i = 0; i < IMAGES.length; i++) {
					loader(handleLoad(IMAGES[i]));
				}
			}
		};
		var loadTimeOut = function loadTimeOut() {
			timer.flag = window.setTimeout(function () {
				if (num.total > num.count) {
					if (fn_callback.step) fn_callback.step = function () {};
					if (fn_callback.success) fn_callback.success = function () {};
					if (fn_callback.complete) fn_callback.complete = function () {};
					if (fn_callback.error) fn_callback.error({ mse: 'error : timeout' });
				}
			}, timer.limit);
		};
		var loadStep = function loadStep() {
			var i = 0;
			var interval = window.setInterval(function () {
				if (i >= 100) {
					window.clearInterval(interval);
					if (fn_callback.complete) {
						return fn_callback.complete(data);
					}
				} else {
					num.percent = Math.ceil(100 * num.count / num.total);
					if (i < num.percent) {
						i++;
						return fn_callback.step(i);
					}
				}
			}, 3);
		};
		var handleLoad = function handleLoad(image) {
			return {
				src: type === 'object' ? image.src : image,
				success: function success() {
					num.count++;

					if (type === 'object') {
						image.status = true;
						image.width = this.width;
						image.height = this.height;
					}
					dataSet(image);

					if (fn_callback.success) fn_callback.success(image);
					if (num.count >= num.total && !fn_callback.step) {
						window.clearTimeout(timer);
						if (fn_callback.complete) {
							return fn_callback.complete(data);
						}
					}
				},
				error: function error() {
					num.count++;

					if (type === 'object') {
						image.status = false;
						dataSet(image);
					}

					if (fn_callback.error) fn_callback.error(image);
					if (num.count >= num.total && !fn_callback.step) {
						window.clearTimeout(timer);
						if (fn_callback.complete) {
							return fn_callback.complete(data);
						}
					}
				}
			};
		};
		var loader = function loader(image) {
			var img;
			img = document.createElement('img');
			img.addEventListener('load', function () {
				image.width = img.width;
				image.height = img.height;
				return image.success();
			}, false);
			img.addEventListener('error', function () {
				delete image.src;
				return image.error();
			}, false);
			img.src = image.src;
		};
		var dataSet = function dataSet(image) {
			if (type === 'object') {
				data[image.id] = image;
			} else if (type === 'array') {
				data.push(image);
			}
		};
		init();
	};
	Library.prototype.ScrollControl = {
		on: function on() {
			$(window).off('.noScroll');
			$('body').css({ 'overflow': '' });
		},
		off: function off() {
			$(window).on('touchmove.noScroll', function (e) {
				e.preventDefault();
			});
			$('body').css({ 'overflow': 'hidden' });
		}
	};

	function Library() {
		PARAM.URI = this.Analysis(location.href);
		Visitor();
		DateTime();
		Window();
		document.addEventListener('DOMContentLoaded', function () {
			Scroll();
		});
		window.addEventListener("mousewheel", function () {});

		for (var key in PARAM) {
			this[key] = PARAM[key];
		}document.createElement("picture");
	}
	return Library;
}();

window.LIB = new Library();
//# sourceMappingURL=library.js.map
