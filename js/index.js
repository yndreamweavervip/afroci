"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();/*!
 * index.js - JavaScript Plugin
 * 
 * Version  : 1.0
 *
 * CopyRight (c) library.js Naotaka Kawakami.
 * Dual licensed under the MIT licenses.
 */
!function(){var e=function(){function e(){if(_classCallCheck(this,e),!(this instanceof e))return new e;this.isSp=!1,this.init()}return _createClass(e,[{key:"init",value:function(){this.reset(),this.eventBreakPoint(),this.intro().init(),this.viveo().init(),this.contests()}},{key:"reset",value:function(){this.isSp="sm"==LIB.WINDOW.type||"xs"==LIB.WINDOW.type,this.isSp||void 0===this.Swiper||(this.Swiper.destroy(!0,!0),this.Swiper=void 0,TweenMax.set($("#News .entrys"),{autoAlpha:1})),this.isSp&&void 0===this.Swiper&&this.slider()}},{key:"eventBreakPoint",value:function(){var e=this;window.addEventListener("breakPoint",function(){return e.reset()},!1)}},{key:"textWrap",value:function(e){for(var t=e.split(""),n="",i=0;i<t.length;i++)n+="<em>"+t[i]+"<span></span></em>";return n}},{key:"viveo",value:function(){var e=this,t=$("#Video");return{size:{width:1280,height:720},paleyer:null,isPlay:!1,init:function(){this.paleyer=t.find("video").get(0),this.event(),this.load().done(function(){return e.intro().start()})},event:function(){var e=this,t=window.innerWidth;e.resize(),window.addEventListener("resize",function(){t==window.innerWidth&&this.isSp||(t=window.innerWidth,e.resize())},!1)},resize:function(){var e=this,n={width:t.width()/e.size.width,height:t.height()/e.size.height},i=Math.max(n.width,n.height);TweenMax.set(t.find("video"),{width:i*Math.ceil(e.size.width),height:i*Math.ceil(e.size.height),x:i*Math.ceil(e.size.width)/2*-1,y:i*Math.ceil(e.size.height)/2*-1})},load:function(){var e=this,n=$.Deferred();return e.paleyer.addEventListener("timeupdate",function(){e.isPlay||(e.isPlay=!0,TweenMax.to(t.find("video"),.4,{opacity:1,ease:Power0.easeNone}),n.resolve())}),n.promise()}}}},{key:"intro",value:function(){var e=this,t={lineTop:$("#Header"),lineBottom:$("#Main .line"),logo:$("#Logo"),navi:$("#GlobalNavi"),menu:$("#MenuBtn"),coverBg:$("#Movie .bg"),coverTxt:$("#Cover")},n={i:0};return{init:function(){$("body").hasClass("intro_set")&&this.set()},set:function(){LIB.ScrollControl.off();var e=window.chrome||"WebkitAppearance"in document.documentElement.style?"body":"html";$(e).animate({scrollTop:0},"1",function(){setTimeout(function(){window.scrollTo(0,0)},100)}),t.coverTxt.addClass("color"),TweenMax.set(t.navi,{autoAlpha:0})},start:function(){var e=this;$("body").hasClass("intro_set")&&TweenMax.to(t.coverTxt,2,{autoAlpha:1,delay:.5,ease:Power0.easeNone,onComplete:function(){e.hide()}})},hide:function(){var e=this;TweenMax.to(t.coverTxt,1,{autoAlpha:0,delay:1,ease:Power0.easeNone}),TweenMax.to(n,1.5,{i:10,delay:1,ease:Power0.easeNone,onUpdate:function(){TweenMax.set(t.coverTxt,{webkitFilter:"blur("+n.i+"px)",filter:"blur("+n.i+"px)"})},onComplete:function(){t.coverTxt.removeClass("color"),TweenMax.set(t.coverTxt,{clearProps:"all"}),TweenMax.to(t.coverTxt,1,{autoAlpha:1,delay:.2,ease:Power0.easeNone}),TweenMax.to(t.coverBg,1,{autoAlpha:0,delay:.2,ease:Power0.easeNone,onComplete:function(){t.coverBg.remove(),e.show()}})}})},show:function(){var n=this;TweenMax.to(t.lineTop,.8,{width:LIB.WINDOW.width,delay:.2,ease:Power4.easeOut}),TweenMax.to(t.lineBottom,.8,{width:LIB.WINDOW.width,delay:.2,ease:Power4.easeOut}),TweenMax.to(t.logo,1,{autoAlpha:1,delay:.9,ease:Power0.easeNone}),e.isSp?TweenMax.to(t.menu,1,{autoAlpha:1,delay:.9,ease:Power0.easeNone,onComplete:function(){n.complete()}}):TweenMax.to(t.navi,.8,{autoAlpha:1,delay:.9,ease:Power4.easeOut,onComplete:function(){n.complete()}})},complete:function(){LIB.ScrollControl.on(),$("body").removeClass("intro_set"),TweenMax.set(t.lineTop,{clearProps:"all"}),TweenMax.set(t.lineBottom,{clearProps:"all"}),TweenMax.set(t.logo,{clearProps:"all"}),TweenMax.set(t.menu,{clearProps:"all"}),TweenMax.set(t.navi,{autoAlpha:1}),TweenMax.set(t.navi.find("li"),{clearProps:"all"}),TweenMax.set(t.coverTxt,{clearProps:"all"})}}}},{key:"slider",value:function(){this.isSp&&void 0===this.Swiper&&(this.Swiper=new Swiper("#News .entrys",{wrapperClass:"lists",slideClass:"inside",slidesPerView:"auto",centeredSlides:!0,spaceBetween:20,grabCursor:!0,autoplay:5e3}))}},{key:"contests",value:function(){var e=this,t={service:$("#Service"),news:$("#News"),recruit:$("#Recruit")},n={service:new ScrollPoint(t.service,{show:75,name:"servicePosint"}),news:new ScrollPoint(t.news,{show:75,name:"newsPosint"}),recruit:new ScrollPoint(t.recruit,{show:75,name:"recruitPosint"})},i={set:function(){var n=t.service.find(".inside").eq(0).width();t.service.find(".title h2").html(e.textWrap(t.service.find(".title h2").text())),t.service.find(".title h2 em").each(function(e){TweenMax.set($(this),{y:t.service.find(".title h2").height()*(e%2==0?-1:1)})}),TweenMax.set(t.service.find(".title p"),{autoAlpha:0,y:50}),TweenMax.set(t.service.find(".title"),{autoAlpha:1}),TweenMax.set(t.service.find(".inside").eq(0),{autoAlpha:0,x:-1*n}),TweenMax.set(t.service.find(".inside").eq(1),{autoAlpha:0,x:n}),TweenMax.set(t.service.find(".more_btn a"),{autoAlpha:0,y:100}),i.event()},event:function(){$(window).on(n.service.eventName.start,function(e){i.show()})},show:function(){var e=0,n=setInterval(function(){t.service.find(".title h2 em").length-1<e?(clearInterval(n),TweenMax.to(t.service.find(".title p"),.3,{autoAlpha:1,delay:.2,ease:Power0.easeNone}),TweenMax.to(t.service.find(".title p"),.6,{y:0,delay:.2,ease:Power4.easeInOut})):(TweenMax.to(t.service.find(".title h2 em").eq(e),.4,{y:0,ease:Power4.easeIn}),TweenMax.to(t.service.find(".title h2 em").eq(e).find("span"),.4,{delay:.45,y:t.service.find(".title h2").height()*(e%2==0?1:-1),ease:Power4.easeOut,onCompleteParams:["{self}"],onComplete:function(e){$(e.target).remove()}})),e++},100);TweenMax.to(t.service.find(".inside").eq(0),.6,{autoAlpha:1,x:0,delay:.8,ease:Power4.easeOut}),TweenMax.to(t.service.find(".inside").eq(1),.6,{autoAlpha:1,x:0,delay:.8,ease:Power4.easeOut}),TweenMax.to(t.service.find(".more_btn a"),.6,{autoAlpha:1,y:0,delay:1,ease:Power4.easeOut})}},a={set:function(){t.news.find(".title h2").html(e.textWrap(t.news.find(".title h2").text())),t.news.find(".title h2 em").each(function(e){TweenMax.set($(this),{y:t.news.find(".title h2").height()*(e%2==0?-1:1)})}),TweenMax.set(t.news.find(".title p"),{autoAlpha:0,y:50}),TweenMax.set(t.news.find(".title"),{autoAlpha:1}),t.news.find(".inside").each(function(){TweenMax.set($(this),{autoAlpha:0,y:100})}),TweenMax.set(t.news.find(".entrys"),{autoAlpha:1}),TweenMax.set(t.service.find(".more_btn a"),{autoAlpha:0,y:100}),a.event()},event:function(){$(window).on(n.news.eventName.start,function(e){a.show()})},show:function(){var e=0,n=setInterval(function(){t.news.find(".title h2 em").length-1<e?(clearInterval(n),TweenMax.to(t.news.find(".title p"),.3,{autoAlpha:1,delay:.2,ease:Power0.easeNone}),TweenMax.to(t.news.find(".title p"),.6,{y:0,delay:.2,ease:Power4.easeInOut})):(TweenMax.to(t.news.find(".title h2 em").eq(e),.4,{y:0,ease:Power4.easeIn}),TweenMax.to(t.news.find(".title h2 em").eq(e).find("span"),.4,{delay:.45,y:t.news.find(".title h2").height()*(e%2==0?1:-1),ease:Power4.easeOut,onCompleteParams:["{self}"],onComplete:function(e){$(e.target).remove()}})),e++},100);TweenMax.staggerTo(t.news.find(".inside"),.6,{autoAlpha:1,y:0,delay:.8,ease:Power4.easeOut},.1),TweenMax.to(t.news.find(".more_btn a"),.6,{autoAlpha:1,y:0,delay:1,ease:Power4.easeOut})}},o={set:function(){t.recruit.find(".title h2").html(e.textWrap(t.recruit.find(".title h2").text())),t.recruit.find(".title h2 em").each(function(e){TweenMax.set($(this),{y:t.recruit.find(".title h2").height()*(e%2==0?-1:1)})}),TweenMax.set(t.recruit.find(".title p"),{autoAlpha:0,y:50}),TweenMax.set(t.recruit.find(".title"),{autoAlpha:1}),TweenMax.set(t.recruit,{autoAlpha:0}),o.event()},event:function(){$(window).on(n.recruit.eventName.start,function(e){o.show()})},show:function(){var e=0,n=setInterval(function(){t.recruit.find(".title h2 em").length-1<e?(clearInterval(n),TweenMax.to(t.recruit.find(".title p"),.3,{autoAlpha:1,delay:.2,ease:Power0.easeNone}),TweenMax.to(t.recruit.find(".title p"),.6,{y:0,delay:.2,ease:Power4.easeInOut})):(TweenMax.to(t.recruit.find(".title h2 em").eq(e),.4,{y:0,ease:Power4.easeIn}),TweenMax.to(t.recruit.find(".title h2 em").eq(e).find("span"),.4,{delay:.45,y:t.recruit.find(".title h2").height()*(e%2==0?1:-1),ease:Power4.easeOut,onCompleteParams:["{self}"],onComplete:function(e){$(e.target).remove()}})),e++},100);TweenMax.to(t.recruit,.6,{autoAlpha:1,ease:Power4.easeOut})}};!function(){i.set(),a.set(),o.set()}()}}]),e}();$(function(){new e})}();