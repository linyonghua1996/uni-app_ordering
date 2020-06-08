<template>
	<view>
		<view class="navigator" :style="'height:' +  nav.height + 'px;' + 'padding-top:' + nav.top + 'px;padding-bottom:10rpx'">
			我的
		</view>
		<view class="container">
			<view class="user" v-if="avator.length===0" v-show="true">
				<view class="authorization" >
					<button class="authBtn" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">授权登录</button>
				</view>
			</view>
			<view class="user" v-else>
				<view class="avator">
					<view class="pic">
						<image :src="avator" class="img"></image>
					</view>
				</view>
				<view class="userName">{{nickName}}</view>
			</view>

			<!-- 查看订单、购物袋 -->
			<view class="btnArea">
				<view class="checkOrder" @click="toOrder">
					<view class="name">
						<view class="nameFont">我的订单</view>
						<view class="arrows"></view>
					</view>
				</view>
				<view class="checkComment" @click="toComment">
					<view class="name">
						<view class="nameFont">店内评价</view>
						<view class="arrows"></view>
					</view>
				</view>
				<view class="shoppingBag" @click="toShopBag">
					<view class="name">
						<view class="nameFont">我的购物袋</view>
						<view class="arrows"></view>
					</view>
				</view>
				<view class="userSettings" @click="toUserSettings">
					<view class="name">
						<view class="nameFont">个人信息</view>
						<view class="arrows"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav: {
					top: 0,
					height: 0
				},
				// 头像
				avator:'',
				// 用户名
				nickName:'',
			}
		},
		created() {
			// 获取胶囊信息
			const nav = uni.getMenuButtonBoundingClientRect()
			this.nav.top = nav.top
			this.nav.height = nav.height
		},
		mounted() {
			this.Init()
		},
		methods: {
			// 初始化我的页面
			Init(){
				var arr=uni.getStorageSync('token')
				this.avator=arr.avatarUrl
				this.nickName=arr.nickName
			},
			// 点击授权登录按钮
			wxGetUserInfo() {
				uni.getUserInfo({
					success: (res) => {
						this.userInfo = res.userInfo;
						console.log(this.userInfo);
						uni.setStorageSync('token',this.userInfo)
						this.Init()
					},
					fail: () => {
						console.log("未授权");
					}
				})
			},
			toUserSettings(){
				// 先要判断是否授权登录和扫码识别桌号
				var token = uni.getStorageSync('token')
				var tableNum = uni.getStorageSync('tableNum')
				if (!token) {
					uni.showToast({
						title: '请先授权登录',
						duration: 2000,
						icon: 'none',
					});
					return;
				}
				if (!tableNum) {
					uni.showToast({
						title: '请到首页扫码识别桌号',
						duration: 2000,
						icon: 'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '../index/index'
						})
					}, 2000)
					return;
				}
				uni.navigateTo({
					url:'../userSettings/userSettings'
				})
			},
			toOrder() {
				uni.navigateTo({
					url: '../evaluate/evaluate'
				})
			},
			toComment() {
				uni.navigateTo({
					url: '../allComment/allComment'
				})
			},
			toShopBag() {
				uni.navigateTo({
					url: '../shopBag/shopBag'
				})
			}
		}
	}
</script>

<style>
	.navigator {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		font-size: 30rpx;
		font-weight: 700;
	}

	.container {
		padding: 10px;
	}

	.user {
		width: 100%;
		height: 150px;
		background: url(../../static/images/背景.png) no-repeat center center;
		background-size: 100% 150px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.authBtn {
		background: linear-gradient(to right, #ff9500, #FBCA18);
		font-size: 18px;
		color: #fff;
	}

	.avator {
		height: 60%;
		display: flex;
		flex-direction: column-reverse;
	}

	.pic {
		width: 65px;
		height: 65px;
		border-radius: 50%;
		overflow: hidden;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.userName {
		margin-top: 10px;
		flex: 1;
		font-size: 18px;
	}

	.btnArea {}

	.checkOrder,
	.checkComment,
	.shoppingBag,
	.userSettings{
		margin-top: 10px;
		background: url(../../static/images/收藏.png) no-repeat left center;
		background-size: 30px 30px;
		line-height: 50px;
		border-bottom: 1px solid #ccc;
	}

	.checkComment {
		background: url(../../static/images/2.png) no-repeat left center;
		background-size: 30px 30px;
	}

	.shoppingBag {
		background: url(../../static/images/网购.png) no-repeat left center;
		background-size: 40px 40px;
	}

	.userSettings{
		background: url(../../static/images/用户设置.png) no-repeat left center;
		background-size: 30px 30px;
	}
	.name {
		font-size: 18px;
		padding-left: 40px;
		display: flex;
		flex-direction: row;
	}

	.nameFont {
		width: 90%;
	}

	.arrows {
		flex: 1;
		background: url(../../static/images/方向-下.png) no-repeat left center;
		background-size: 20px 20px;
	}
</style>
