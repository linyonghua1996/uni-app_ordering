(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopBag/shopBag"],{"65a7":function(t,a,n){},"7ecf":function(t,a,n){"use strict";var e,i=function(){var t=this,a=t.$createElement;t._self._c},o=[];n.d(a,"b",(function(){return i})),n.d(a,"c",(function(){return o})),n.d(a,"a",(function(){return e}))},ad0a:function(t,a,n){"use strict";n.r(a);var e=n("7ecf"),i=n("effd");for(var o in i)"default"!==o&&function(t){n.d(a,t,(function(){return i[t]}))}(o);n("b59b");var r,u=n("f0c5"),c=Object(u["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],r);a["default"]=c.exports},b59b:function(t,a,n){"use strict";var e=n("65a7"),i=n.n(e);i.a},c4ac:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=function(){n.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(n("2ead"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("common/vendor").then(function(){return resolve(n("9c72"))}.bind(null,n)).catch(n.oe)},o={components:{uniNavBar:e,vanField:i},data:function(){return{nav:{top:0,height:0},total:0,amount:0,bagData:[],remark:""}},created:function(){var a=t.getMenuButtonBoundingClientRect();this.nav.top=a.top,this.nav.height=a.height,console.log(a)},mounted:function(){this.Init()},methods:{toComfireOrder:function(){0===this.total&&t.navigateTo({url:"../ordering/ordering"}),t.navigateTo({url:"../comfireOrder/comfireOrder"})},sub:function(a){var n=this;this.total=0,this.amount=0;var e=wx.getStorageSync("recommend");if(e.length>0)for(var i in e)e[i].id===a&&(e[i].quality-=1,t.setStorageSync("recommend",e));for(var i in this.bagData)this.bagData[i].id===a&&(this.bagData[i].quality-=1);this.bagData.forEach((function(t,a){t.quality<=0&&n.bagData.splice(a,1)})),this.bagData.forEach((function(t,a){n.total+=t.quality*t.price})),this.amount=this.bagData.length},add:function(a){var n=this;console.log(a),this.total=0,this.amount=0;var e=wx.getStorageSync("recommend");if(e.length>0)for(var i in e)e[i].id===a&&(e[i].quality+=1,t.setStorageSync("recommend",e));for(var i in this.bagData)this.bagData[i].id===a&&(this.bagData[i].quality+=1);this.bagData.forEach((function(t,a){n.total+=t.quality*t.price})),this.amount=this.bagData.length},goback:function(){t.reLaunch({url:"../index/index"})},Init:function(){var a=t.getStorageSync("recommend");if(a.length>0)for(var n in a)a[n].quality>0&&(this.bagData.push(a[n]),this.total+=a[n].quality*a[n].price);this.amount=this.bagData.length}}};a.default=o}).call(this,n("543d")["default"])},cb12:function(t,a,n){"use strict";(function(t){n("b6b9"),n("921b");e(n("66fd"));var a=e(n("ad0a"));function e(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,n("543d")["createPage"])},effd:function(t,a,n){"use strict";n.r(a);var e=n("c4ac"),i=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(a,t,(function(){return e[t]}))}(o);a["default"]=i.a}},[["cb12","common/runtime","common/vendor"]]]);