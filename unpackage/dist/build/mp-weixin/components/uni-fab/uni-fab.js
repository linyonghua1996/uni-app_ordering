(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-fab/uni-fab"],{"38b0":function(t,i,n){"use strict";var o=n("ab37"),e=n.n(o);e.a},"80aa":function(t,i,n){"use strict";var o,e=function(){var t=this,i=t.$createElement;t._self._c},r=[];n.d(i,"b",(function(){return e})),n.d(i,"c",(function(){return r})),n.d(i,"a",(function(){return o}))},"9bcb":function(t,i,n){"use strict";n.r(i);var o=n("b2a3"),e=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(i,t,(function(){return o[t]}))}(r);i["default"]=e.a},ab37:function(t,i,n){},b2a3:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o="other",e={name:"UniFab",props:{pattern:{type:Object,default:function(){return{}}},horizontal:{type:String,default:"left"},vertical:{type:String,default:"bottom"},direction:{type:String,default:"horizontal"},content:{type:Array,default:function(){return[]}},show:{type:Boolean,default:!1},popMenu:{type:Boolean,default:!0}},data:function(){return{fabShow:!1,isShow:!1,isAndroidNvue:"android"===o,styles:{color:"#3c3e49",selectedColor:"#007AFF",backgroundColor:"#fff",buttonColor:"#3c3e49"}}},computed:{contentWidth:function(t){return 55*(this.content.length+1)+10+"px"},contentWidthMin:function(){return"55px"},boxWidth:function(){return this.getPosition(3,"horizontal")},boxHeight:function(){return this.getPosition(3,"vertical")},leftBottom:function(){return this.getPosition(0,"left","bottom")},rightBottom:function(){return this.getPosition(0,"right","bottom")},leftTop:function(){return this.getPosition(0,"left","top")},rightTop:function(){return this.getPosition(0,"right","top")},flexDirectionStart:function(){return this.getPosition(1,"vertical","top")},flexDirectionEnd:function(){return this.getPosition(1,"vertical","bottom")},horizontalLeft:function(){return this.getPosition(2,"horizontal","left")},horizontalRight:function(){return this.getPosition(2,"horizontal","right")}},watch:{pattern:function(t,i){this.styles=Object.assign({},this.styles,t)}},created:function(){this.isShow=this.show,0===this.top&&(this.fabShow=!0),this.styles=Object.assign({},this.styles,this.pattern)},methods:{_onClick:function(){this.$emit("fabClick"),this.popMenu&&(this.isShow=!this.isShow)},open:function(){this.isShow=!0},close:function(){this.isShow=!1},_onItemClick:function(t,i){this.$emit("trigger",{index:t,item:i})},getPosition:function(t,i,n){return 0===t?this.horizontal===i&&this.vertical===n:1===t?this.direction===i&&this.vertical===n:2===t?this.direction===i&&this.horizontal===n:this.isShow&&this.direction===i?this.contentWidth:this.contentWidthMin}}};i.default=e},e04b:function(t,i,n){"use strict";n.r(i);var o=n("80aa"),e=n("9bcb");for(var r in e)"default"!==r&&function(t){n.d(i,t,(function(){return e[t]}))}(r);n("38b0");var s,u=n("f0c5"),c=Object(u["a"])(e["default"],o["b"],o["c"],!1,null,"374a0c2d",null,!1,o["a"],s);i["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-fab/uni-fab-create-component',
    {
        'components/uni-fab/uni-fab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e04b"))
        })
    },
    [['components/uni-fab/uni-fab-create-component']]
]);