(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/conponents/swiper/swiper"],{1499:function(t,n,e){"use strict";e.r(n);var r=e("9341"),a=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=a.a},"62bc":function(t,n,e){},"822b":function(t,n,e){"use strict";e.r(n);var r=e("bcdd"),a=e("1499");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("90fa");var i,c=e("f0c5"),o=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);n["default"]=o.exports},"90fa":function(t,n,e){"use strict";var r=e("62bc"),a=e.n(r);a.a},9341:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{indicatorDots:!0,autoplay:!0,interval:3e3,duration:500,swiperArray:[]}},created:function(){this.getSwiperData()},methods:{getSwiperData:function(){var n=this;t.request({url:"http://129.211.13.120:3000/ordering/wx/swiper",method:"GET",success:function(t){n.swiperArray=t.data.swiper}})}}};n.default=e}).call(this,e("543d")["default"])},bcdd:function(t,n,e){"use strict";var r,a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/conponents/swiper/swiper-create-component',
    {
        'pages/index/conponents/swiper/swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("822b"))
        })
    },
    [['pages/index/conponents/swiper/swiper-create-component']]
]);
