<!-- 确认订单 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="nav" :style="'height:' +  nav.height + 'px;' + 'padding-top:' + nav.top + 'px;padding-bottom:10rpx'">
			<view class="goBack" @click="goback()">返回</view>
			<view class="navigator">点餐</view>
		</view>
		<view class="container">
			<view class="orderState">待付款</view>
			<view class="orderDeatil">
				<view class="ordertitle">订单详情</view>
				<view v-for="(item,index) in order" :key="index">
					<view class="orderPanel">
						<view class="orderFood">{{item.name}}</view>
						<view class="orderPrice">￥{{item.price}}</view>
						<view class="orderAmount">X{{item.quality}}</view>
					</view>
				</view>
				<view class="totalPanel">
					<view class="total">总计{{amount}}件,小计{{total}}元</view>
				</view>

			</view>
			<view class="remarkPanel">
				<view class="remark">添加备注</view>
			</view>
			<van-cell-group>
				<van-field label="备注" type="textarea" placeholder="请添加备注" autosize border="false" v-model="remark" />
			</van-cell-group>
			<van-goods-action>
				<view @click="later" style="width: 50%;">
					<van-goods-action-button text="稍后支付" type="warning" />
				</view>
				<view @click="atOnce" style="width: 50%;">
					<van-goods-action-button text="马上支付" />
				</view>
			</van-goods-action>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue" //导航栏
	import vanField from '@/wxcomponents/vant/dist/field' //输入框
	import vanGoodsAction from '@/wxcomponents/vant/dist/goods-action'
	import vanGoodsActionButton from '@/wxcomponents/vant/dist/goods-action-button'
	export default {
		components: {
			uniNavBar,
			vanField,
			vanGoodsAction,
			vanGoodsActionButton
		},
		data() {
			return {
				nav: {
					top: 0,
					height: 0
				},
				is_open_socket: false,
				// 手机号
				phone: '',
				// 用户名
				nickName: '',
				// 金额
				total: 0,
				// 数量
				amount: 0,
				// 确认订单的数据
				order: [],
				// 备注
				remark: ''
			}
		},
		created() {
			// 获取胶囊信息
			const nav = uni.getMenuButtonBoundingClientRect()
			this.nav.top = nav.top
			this.nav.height = nav.height
		},
		mounted() {
			this.Init(),
			this.getUserAndPhone()
		},
		methods: {
			// 将小程序缓存中的菜品数量重置为0
			resetQuality() {
				var arr = uni.getStorageSync('recommend')
				if (arr.length > 0) {
					for (var i in arr) {
						arr[i].quality = 0

					}
					uni.setStorageSync('recommend', arr)
				}
			},
			// 从小程序缓存中获取用户名和手机号
			getUserAndPhone() {
				var token = uni.getStorageSync('token')
				var phone = uni.getStorageSync('phone')
				this.nickName = token.nickName
				this.phone = phone
			},
			Init() {
				var arr = uni.getStorageSync('recommend')
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].quality > 0) {
							this.order.push(arr[i])
							this.total += arr[i].price * arr[i].quality
						}
					}
				}
				console.log(this.order)
				this.amount = this.order.length
			},

			// 稍后支付
			later() {
				var token = uni.getStorageSync('token')
				var phone = uni.getStorageSync('phone')
				if (!token) {
					uni.showToast({
						title: '请先授权登录',
						duration: 2000,
						icon: 'none',
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '../me/me'
						})
					}, 2000)
					return;
				}
				if (!phone) {
					uni.showToast({
						title: '请完善个人信息',
						duration: 2000,
						icon: 'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '../me/me'
						})
					}, 2000)
					return;
				}
				var data = this.getCacheData()
				var tableNum = uni.getStorageSync('tableNum')
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/addOrder/later',
					method: "POST",
					data: {
						order: data,
						tableNum: tableNum,
						total: this.total,
						name: this.nickName,
						phone: this.phone
					},
					success: (res) => {
						console.log(res.data)
					}
				})
				this.resetQuality()
				uni.navigateTo({
					url: "../evaluate/evaluate"
				})

			},
			// 马上支付
			atOnce() {
				this.$goEasy.publish({
				    channel: 'my_channel',
				    message: '有新订单到~~'
				})
				var token = uni.getStorageSync('token')
				var phone = uni.getStorageSync('phone')
				if (!token) {
					uni.showToast({
						title: '请先授权登录',
						duration: 2000,
						icon: 'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '../me/me'
						})
					}, 2000)
					return;
				}
				if (!phone) {
					uni.showToast({
						title: '请完善个人信息',
						duration: 2000,
						icon: 'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '../me/me'
						})
					}, 2000)
					return;
				}
				var data = this.getCacheData()
				var tableNum = uni.getStorageSync('tableNum')
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/addOrder/atOnce',
					method: "POST",
					data: {
						order: data,
						tableNum: tableNum,
						total: this.total,
						name: this.nickName,
						phone: this.phone
					},
					success: (res) => {
						console.log(res.data)
					}
				})
				this.resetQuality()
				uni.navigateTo({
					url: "../evaluate/evaluate"
				}) 
			},
			// 获取recommend缓存中的数据
			getCacheData() {
				var data = []
				var arr = uni.getStorageSync('recommend')
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].quality > 0) {
							data.push(arr[i])
						}
					}
				}
				return data
			},
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.nav{
		display: flex;
		flex-direction: row;
	}
	.goBack{
		width: 80px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.goBack::before{
		content: '';
		width: 10px;
		height: 10px;
		border-left: 1px solid #000;
		border-bottom: 1px solid #000;
		transform: rotate(45deg);
	}
	.navigator {
		flex:1;
		display: flex;
		align-items: center;
		background: #fff;
		font-size: 30rpx;
		font-weight: 700;
		padding-left: 23%;
	}
	.container {
		margin-top: 30px;
		padding: 10px;
	}

	.orderState {
		font-size: 20px;
		font-weight: 600;
		margin-left: 10px;
	}

	.orderDeatil {
		margin-top: 20px;
		margin-left: 10px;
	}

	.ordertitle {
		background: url(../../static/images/i.png) no-repeat left center;
		background-size: 70rpx;
		padding-left: 45rpx;
		font-size: 30rpx;
		font-weight: 600;
		vertical-align: middle;

	}

	.orderPanel {
		display: flex;
		flex-direction: row;
		font-size: 15px;
		padding-top: 10px;
		line-height: 40px;
		border-bottom: 1px solid #C8C7CC;
	}

	.orderFood {
		width: 60%;
	}

	.orderPrice {
		flex: 1;
	}

	.orderAmount {
		flex: 1;
	}

	.totalPanel {
		line-height: 100rpx;
		font-size: 35rpx;
		display: flex;
		flex-direction: row-reverse;
		border-bottom: 1px solid #C8C7CC;
	}

	.total {
		margin-right: 20rpx;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: linear-gradient(to right, #ff9500, #FBCA18);
	}

	.remarkPanel {
		background: url(../../static/images/备注.png) no-repeat left center;
		background-size: 38rpx;
		font-size: 30rpx;
		font-weight: 600;
		padding-left: 45rpx;
		margin: 20px 10px 10px 10px;
	}

	.van-button--normal {
		font-size: 18px !important;
	}

	..van-goods-action-button__inner {
		height: 45px !important;
	}
</style>
