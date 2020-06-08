<!-- 用户个人信息设置 -->
<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar left-icon="back" left-text="返回" title="个人信息" @clickLeft='goback' fixed="true"></uni-nav-bar>
		<view class="container">
			<!-- 用户信息 -->
			<view class="userInfo">
				<view class="avator">
					<view class="pic">
						<image :src="avator" class="img"></image>
					</view>
				</view>
				<view class="userName">
					<view class="name">{{nickName}}</view>
					<view class="time">{{time}}</view>
				</view>
			</view>
			<!-- 手机号、桌号 -->
			<view style="margin-top: 20px;">
				<view class="inputArea">
					<label class="labelName">桌号</label>
					<view class="input">
						<input v-model="tableNum" disabled  class="inp"/>
					</view>
				</view>
				<view class="inputArea">
					<label class="labelName">手机号</label>
					<view class="input">
						<input v-model="phone" class="inp"/>
					</view>
				</view>
			</view>

			<view class="btn">
				<button class="btnStyle" @click="submitUserInfo()">提交个人信息</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue" //导航栏
	import vanField from "@/wxcomponents/vant/dist/field" //输入框
	export default {
		components: {
			uniNavBar,
			vanField
		},
		data() {
			return {
				// 桌号
				tableNum: '',
				// 手机号
				phone: '',
				// 用户名
				nickName: '',
				// 头像
				avator: '',
				// 系统时间
				time: ''
			}
		},
		mounted() {
			this.getTime()
			this.Init()
		},
		methods: {
			// 初始化我的页面
			Init() {
				var arr = uni.getStorageSync('token')
				var tableNum = uni.getStorageSync('tableNum')
				var phone = uni.getStorageSync('phone')
				this.avator = arr.avatarUrl
				this.nickName = arr.nickName
				this.tableNum = tableNum
				this.phone=phone
			},
			// 获取系统时间
			getTime() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				this.time = timer
			},
			// 校验手机号
			checkMobile(mobile) {
				return RegExp(/^1[34578]\d{9}$/).test(mobile);
			},
			submitUserInfo() {
				if (!this.checkMobile(this.phone)) {
					uni.showToast({
						title: '手机号格式错误',
						icon: 'none'
					});
					return;
				}
				uni.setStorageSync('phone',this.phone)
				uni.navigateBack()
			},
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.container {
		margin-top: 25px;
		padding: 10px 25px;
	}

	.userInfo {
		display: flex;
		flex-direction: row;
		background: linear-gradient(to right, #4bb0ff, #6149f6);
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		overflow: hidden;
	}

	.avator {
		width: 15%;
		padding: 10px;
	}

	.pic {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.userName {
		flex: 1;
		font-size: 18px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.time {
		font-size: 15px;
		margin-top: 5px;
	}

	.btn {
		margin-top: 10px;
		padding: 10px;
	}

	.btnStyle {
		width: 100%;
		font-size: 18px;
		color: #fff;
		background: linear-gradient(to right, #ff9500, #FBCA18);
	}
	.inputArea{
		display: flex;
		flex-direction: row;
		font-size: 18px;
		line-height: 50px;
		border-bottom: 1px solid #ccc;
	}
	.labelName{
		width: 25%;
	}
	.input{
		flex: 1;
		font-size: 18px;
		color: #ccc;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.inp{
		width: 100%;
	}
</style>
