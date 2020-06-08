import Vue from 'vue'
import App from './App'
import GoEasy from 'goeasy'

Vue.config.productionTip = false

/* Vue.prototype.$goEasy = new GoEasy({
	host: "hangzhou.goeasy.io", 
	appkey: "BC-1684034442574825818a03acf466bb83",
	onConnected: function() {
		console.log('连接成功！')
	},
	onDisconnected: function() {
		console.log('连接断开！')
	},
	onConnectFailed: function(error) {
		console.log('连接失败或错误！')
	}
}); */



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

Vue.prototype.$goEasy = new GoEasy({
	host: "hangzhou.goeasy.io", 
	appkey: "BC-1684034442574825818a03acf466bb83",
	onConnected: function() {
		console.log('连接成功！')
	},
	onDisconnected: function() {
		console.log('连接断开！')
	},
	onConnectFailed: function(error) {
		console.log('连接失败或错误！')
	}
});