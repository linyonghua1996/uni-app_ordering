<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="nav" :style="'height:' +  nav.height + 'px;' + 'padding-top:' + nav.top + 'px;padding-bottom:10rpx'">
			<view class="goBack" @click="goback()">返回</view>
			<view class="navigator">点餐</view>
		</view>
		<view class="container">
			<!-- 分段器 -->
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#ff9500" ></uni-segmented-control>
			<view class="content">
				<!-- 待付款 -->
				<view v-show="current === 0">
					<view v-if="obligationOrder.length===0" v-show="true">
						<view class="pic">
							<image src="../../static/images/暂无订单.png" class="img"></image>
							<view class="font">暂无订单</view>
						</view>
					</view>
					<view v-for="(item,index) in obligationOrder" :key="index" v-else>
						<!-- 一张订单 -->
						<view class="orderContainer">
							<view class="orderPanel">
								<view class="orderTop">
									<view class="orderNum">中餐厅</view>
									<view class="orderTime">订单时间:{{item.updatedAt}}</view>
									<view class="stauts">
										<van-count-down :time="item.time+15*60*1000-new Date().getTime()" @finish="finish(item.id)"/>
									</view>
								</view>
								<view style="border:1px solid #FBCA18;overflow: hidden;
							border-radius: 5px;">

									<view class="orderContent">
										<view v-for="(ite,ind) in obligation" :key="ind">
											<view v-for="(i,j) in ite" :key="j">
												<view v-if="i.orderId===item.id" v-show="true">
													<!-- 一张订单里面的菜 -->
													<view class="orderFood">
														<view class="foodName">{{i.foodName}}</view>
														<view class="foodPrice">￥{{i.foodPrice}}</view>
														<view class="foodAmount">x{{i.foodNumber}}</view>
													</view>
												</view>

											</view>
										</view>
									</view>
									<!-- 左右两个小半圆 -->
									<view class="left"></view>
									<view class="right"></view>
									<view class="orderBottom">
										<view class="orderTotal">共{{item.total}}件 合计{{item.money}}元</view>
										<view class="orderOperate">
											<van-button color="linear-gradient(to right, #ff9500, #FBCA18)" @click="toPay(item.id)">去付款</van-button>
											<van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="onCancel(item.id)" style="margin-right: 10px;">取消</van-button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 已付款 -->
				<view v-show="current === 1">
					<view v-if="paidOrder.length===0" v-show="true">
						<view class="pic">
							<image src="../../static/images/暂无订单.png" class="img"></image>
							<view class="font">暂无订单</view>
						</view>
					</view>
					<view v-for="(item,index) in paidOrder" :key="index" v-else>
						<!-- 一张订单 -->
						<view class="orderContainer">
							<view class="orderPanel">
								<view class="orderTop">
									<view class="orderNum">中餐厅</view>
									<view class="orderTime">订单时间:{{item.updatedAt}}</view>
									<view class="stauts">
										已支付
									</view>
								</view>
								<view style="border:1px solid #FBCA18;overflow: hidden;
							border-radius: 5px;">

									<view class="orderContent">
										<view v-for="(ite,ind) in paid" :key="ind">
											<view v-for="(i,j) in ite" :key="j">
												<view v-if="i.orderId===item.id" v-show="true">
													<!-- 一张订单里面的菜 -->
													<view class="orderFood">
														<view class="foodName">{{i.foodName}}</view>
														<view class="foodPrice">￥{{i.foodPrice}}</view>
														<view class="foodAmount">x{{i.foodNumber}}</view>
													</view>
												</view>
											</view>
										</view>
									</view>
									<!-- 左右两个小半圆 -->
									<view class="left"></view>
									<view class="right"></view>
									<view class="orderBottom">
										<view class="orderTotal">共{{item.total}}件 合计{{item.money}}元</view>
										<view class="orderOperate">
											<van-button color="linear-gradient(to right, #ff9500, #FBCA18)" @click="toPushMeal(item.id)">催上餐</van-button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 已取消 -->
				<view v-show="current === 2">

					<view v-if="cancelOrder.length===0" v-show="true">
						<view class="pic">
							<image src="../../static/images/暂无订单.png" class="img"></image>
							<view class="font">暂无订单</view>
						</view>
					</view>
					<view v-for="(item,index) in cancelOrder" :key="index" v-else>
						<!-- 一张订单 -->
						<view class="orderContainer">
							<view class="orderPanel">
								<view class="orderTop">
									<view class="orderNum">中餐厅</view>
									<view class="orderTime">订单时间:{{item.updatedAt}}</view>
									<view class="stauts">
										已取消
									</view>
								</view>
								<view style="border:1px solid #FBCA18;overflow: hidden;
							border-radius: 5px;">

									<view class="orderContent">
										<view v-for="(ite,ind) in cancel" :key="ind">
											<view v-for="(i,j) in ite" :key="j">
												<view v-if="i.orderId===item.id" v-show="true">
													<!-- 一张订单里面的菜 -->
													<view class="orderFood">
														<view class="foodName">{{i.foodName}}</view>
														<view class="foodPrice">￥{{i.foodPrice}}</view>
														<view class="foodAmount">x{{i.foodNumber}}</view>
													</view>
												</view>
											</view>
										</view>
									</view>
									<!-- 左右两个小半圆 -->
									<view class="left"></view>
									<view class="right"></view>
									<view class="orderBottom">
										<view class="orderTotal">共{{item.total}}件 合计{{item.money}}元</view>
										<view class="orderOperate">
											<van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="toDelete(item.id)" style="margin-right: 10px;">删除</van-button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 待评价 -->
				<view v-show="current === 3">
					<view v-if="evaluateBeforeOrder.length===0" v-show="true">
						<view class="pic">
							<image src="../../static/images/暂无订单.png" class="img"></image>
							<view class="font">暂无订单</view>
						</view>
					</view>
					<view v-for="(item,index) in evaluateBeforeOrder" :key="index" v-else>
						<!-- 一张订单 -->
						<view class="orderContainer">
							<view class="orderPanel">
								<view class="orderTop">
									<view class="orderNum">中餐厅</view>
									<view class="orderTime">订单时间:{{item.updatedAt}}</view>
									<view class="stauts">
										已完成
									</view>
								</view>
								<view style="border:1px solid #FBCA18;overflow: hidden;
							border-radius: 5px;">

									<view class="orderContent">
										<view v-for="(ite,ind) in evaluateBefore" :key="ind">
											<view v-for="(i,j) in ite" :key="j">
												<view v-if="i.orderId===item.id" v-show="true">
													<!-- 一张订单里面的菜 -->
													<view class="orderFood">
														<view class="foodName">{{i.foodName}}</view>
														<view class="foodPrice">￥{{i.foodPrice}}</view>
														<view class="foodAmount">x{{i.foodNumber}}</view>
													</view>
												</view>
											</view>
										</view>
									</view>
									<!-- 左右两个小半圆 -->
									<view class="left"></view>
									<view class="right"></view>
									<view class="orderBottom">
										<view class="orderTotal">共{{item.total}}件 合计{{item.money}}元</view>
										<view class="orderOperate">
											<van-button color="linear-gradient(to right, #ff9500, #FBCA18)" @click="toEvaluate(item.id)" style="margin-right: 10px;">去评价</van-button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 已评价 -->
				<view v-show="current === 4">
					<view v-if="evaluateAfterOrder.length===0" v-show="true">
						<view class="pic">
							<image src="../../static/images/暂无订单.png" class="img"></image>
							<view class="font">暂无订单</view>
						</view>
					</view>
					<view v-for="(item,index) in evaluateAfterOrder" :key="index" v-else>
						<!-- 一张订单 -->
						<view class="orderContainer">
							<view class="orderPanel">
								<view class="orderTop">
									<view class="orderNum">中餐厅</view>
									<view class="orderTime">订单时间:{{item.updatedAt}}</view>
									<view class="stauts">
										已评价
									</view>
								</view>
								<view style="border:1px solid #FBCA18;overflow: hidden;
							border-radius: 5px;">
					
									<view class="orderContent">
										<view v-for="(ite,ind) in evaluateAfter" :key="ind">
											<view v-for="(i,j) in ite" :key="j">
												<view v-if="i.orderId===item.id" v-show="true">
													<!-- 一张订单里面的菜 -->
													<view class="orderFood">
														<view class="foodName">{{i.foodName}}</view>
														<view class="foodPrice">￥{{i.foodPrice}}</view>
														<view class="foodAmount">x{{i.foodNumber}}</view>
													</view>
												</view>
											</view>
										</view>
									</view>
									<!-- 左右两个小半圆 -->
									<view class="left"></view>
									<view class="right"></view>
									<view class="orderBottom">
										<view class="orderTotal">共{{item.total}}件 合计{{item.money}}元</view>
										<view class="orderOperate">
											<van-button color="linear-gradient(to right, #ff9500, #FBCA18)" @click="checkEvaluate(item.id)" style="margin-right: 10px;">查看评价</van-button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue" //导航栏
	import vanButton from "@/wxcomponents/vant/dist/button"
	import vanCountDown from "@/wxcomponents/vant/dist/count-down"
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue" //分段器
	export default {
		components: {
			uniNavBar,
			vanButton,
			uniSegmentedControl,
			vanCountDown
		},
		data() {
			return {
				nav: {
					top: 0,
					height: 0
				},
				// 手机号
				phone:'',
				// 用户名
				nickName:'',
				// 已评价订单
				evaluateAfter: [],
				evaluateAfterOrder: [],
				// 待评价订单
				evaluateBefore: [],
				evaluateBeforeOrder: [],
				// 已取消订单
				cancel: [],
				cancelOrder: [],
				// 已支付订单
				paid: [],
				paidOrder: [],
				// 待付款订单
				obligation: [],
				obligationOrder: [],
				// Tab栏
				items: ['待付款', '已支付', '已取消', '待评价', '已评价'],
				// 默认激活第一个Tab栏
				current: 0
			}
		},
		created() {
			// 获取胶囊信息
			const nav = uni.getMenuButtonBoundingClientRect()
			this.nav.top = nav.top
			this.nav.height = nav.height
		},
		mounted() {
			this.getUserAndPhone()
			this.Init()
		},
		methods: {
			// 待付款订单倒计时结束后
			finish(id){
				console.log(id)
				this.onCancel(id)
			},
			// 从小程序缓存中获取用户名和手机号
			getUserAndPhone(){
				var token=uni.getStorageSync('token')
				var phone=uni.getStorageSync('phone')
				this.nickName=token.nickName
				this.phone=phone
			},
			// 查看评价
			checkEvaluate(id){
				uni.navigateTo({
					url:"../allComment/allComment"
				})
			},
			// 已评价Tab栏
			EvaluateAfter() {
				var tableNum = uni.getStorageSync('tableNum')
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/evaluateAfter',
					data: {
						tableNum: tableNum,
						name:this.nickName,
						phone:this.phone
					},
					method: "GET",
					success: (res) => {
						this.evaluateAfter = res.data.arr
						this.evaluateAfterOrder = res.data.order
						for (var k in this.evaluateAfterOrder) {
							const total = 0
							for (var i in this.evaluateAfter) {
								for (var j in this.evaluateAfter[i]) {
									if (this.evaluateAfterOrder[k].id === this.evaluateAfter[i][j].orderId) {
										total += 1
									}
								}
							}
							this.evaluateAfterOrder[k].total = total
						}
			
					}
				})
			},
			// 点击去评价按钮
			toEvaluate(id) {
				uni.navigateTo({
					url:"../comment/comment?id="+id
				})
			},
			// 待评价Tab栏
			EvaluateBefore() {
				var tableNum = uni.getStorageSync('tableNum')
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/evaluateBefore',
					data: {
						tableNum: tableNum,
						name:this.nickName,
						phone:this.phone
					},
					method: "GET",
					success: (res) => {
						this.evaluateBefore = res.data.arr
						this.evaluateBeforeOrder = res.data.order
						for (var k in this.evaluateBeforeOrder) {
							const total = 0
							for (var i in this.evaluateBefore) {
								for (var j in this.evaluateBefore[i]) {
									if (this.evaluateBeforeOrder[k].id === this.evaluateBefore[i][j].orderId) {
										total += 1
									}
								}
							}
							this.evaluateBeforeOrder[k].total = total
						}

					}
				})
			},
			// 点击删除按钮
			toDelete(id) {
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/cancel',
					method: "put",
					data: {
						id: id
					},
					success: (res) => {
						console.log(res.data)
					}
				})
			},
			// 已取消Tab栏
			Cancel() {
				var tableNum = uni.getStorageSync('tableNum')
				uni.request({
					url: 'http://www.linhua.club/ordering/wx/cancelTab',
					data: {
						tableNum: tableNum,
						name:this.nickName,
						phone:this.phone
					},
					method: "GET",
					success: (res) => {

						this.cancel = res.data.arr
						this.cancelOrder = res.data.order
						for (var k in this.cancelOrder) {
							const total = 0
							for (var i in this.cancel) {
								for (var j in this.cancel[i]) {
									if (this.cancelOrder[k].id === this.cancel[i][j].orderId) {
										total += 1
									}
								}
							}
							this.cancelOrder[k].total = total
						}

					}
				})
			},
			// 点击催上餐按钮
			toPushMeal(id) {
				this.$goEasy.publish({
				    channel: 'my_ch',
				    message: `编号${id}的订单催单了~~`
				})
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/pushMeal',
					method: "put",
					data: {
						id: id
					},
					success: (res) => {
						console.log(res.data)
					}
				})
			},
			// 已付款Tab栏
			Paid() {
				var tableNum = uni.getStorageSync('tableNum')
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/paidTab',
					data: {
						tableNum: tableNum,
						name:this.nickName,
						phone:this.phone
					},
					method: "GET",
					success: (res) => {

						this.paid = res.data.arr
						this.paidOrder = res.data.order
						for (var k in this.paidOrder) {
							const total = 0
							for (var i in this.paid) {
								for (var j in this.paid[i]) {
									if (this.paidOrder[k].id === this.paid[i][j].orderId) {
										total += 1
									}
								}
							}
							this.paidOrder[k].total = total
						}

					}
				})
			},
			// 点击去付款按钮
			toPay(id) {
				this.$goEasy.publish({
				    channel: 'my_channel',
				    message: `有新订单到~~编号为${id}`
				})
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/toPay',
					method: "put",
					data: {
						id: id
					},
					success: (res) => {
						console.log(res.data)
						this.Init()
					}
				})
				
			},
			// 点击取消按钮
			onCancel(id) {
				console.log(id)
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/delete',
					method: "DELETE",
					data: {
						id: id
					},
					success: (res) => {
						console.log(res.data)
						this.Init()
					}
				})

			},
			// 切换Tab栏
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				if (e.currentIndex === 0) {
					// 待付款
					this.Init()
				} else if (e.currentIndex === 1) {
					// 已付款
					this.Paid()
				} else if (e.currentIndex === 2) {
					// 已取消
					this.Cancel()
				} else if (e.currentIndex === 3) {
					// 待评价
					this.EvaluateBefore()
				} else if (e.currentIndex === 4) {
					// 已评价
					this.EvaluateAfter()
				}
			},
			// 初始化，相当于向服务器请求待付款的订单
			Init() {
				var tableNum = uni.getStorageSync('tableNum')
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/obligation',
					data: {
						tableNum: tableNum,
						name:this.nickName,
						phone:this.phone
					},
					method: "GET",
					success: (res) => {

						this.obligation = res.data.arr
						this.obligationOrder = res.data.order
						console.log(this.obligation);
						
						for (var k in this.obligationOrder) {
							const total = 0
							for (var i in this.obligation) {
								for (var j in this.obligation[i]) {
									if (this.obligationOrder[k].id === this.obligation[i][j].orderId) {
										total += 1
									}
								}
							}
							this.obligationOrder[k].total = total
							this.obligationOrder[k].time = new Date(this.obligationOrder[k].updatedAt.replace(/-/g, '/')).getTime()
						}
						console.log(this.obligationOrder)

					}
				})
			},
			goback() {
				uni.reLaunch({
					url:'../index/index'
				})
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
	.pic {
		width: 130px;
		height: 150px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.font {
		margin-top: 10px;
		color: #3b3b3b;
		font-size: 18px;
		text-align: center;
	}

	.container {
		margin-top: 25px;
		padding: 10px;
	}
	.van-ellipsis {
		font-weight: 600;
		font-size: 16px;
	}

	.orderPanel {
		margin: 15px 10px 0 10px;
		border-radius: 5px;
		overflow: hidden;
		position: relative;
		/* border: 1px solid #FBCA18; */

	}

	.orderTop {
		width: 100%;
		height: 60px;
		background: linear-gradient(to right, #ff9500, #FBCA18);
		color: #fff;
		font-size: 18px;
		border: 1px solid #FBCA18;
	}

	.orderNum {
		padding-top: 10px;
		margin-left: 20px;
	}

	.orderTime {
		font-weight: normal;
		font-size: 13px;
		margin-left: 20px;
	}

	.stauts {
		position: absolute;
		top: 10px;
		right: 20px;
	}

	.left {
		width: 10px;
		height: 20px;
		background-color: #FFFFFF;
		border: 0;
		border-right: 1px solid #FBCA18;
		border-radius: 0 10px 10px 0;
		position: absolute;
		top: 51px;
		left: 0px;
	}

	.right {
		width: 10px;
		height: 20px;
		background-color: #fff;
		border-left: 1px solid #FBCA18;
		border-radius: 10px 0 0 10px;
		position: absolute;
		top: 51px;
		right: 0px;
	}

	.orderContent {
		padding: 10px 10px 0 10px;
		border-top: 1px solid #FBCA18;
		border-bottom: 2px dotted #FBCA18;

	}

	.orderFood {
		display: flex;
		flex-direction: row;
		padding-bottom: 10px;
	}

	.foodName {
		width: 60%;
		font-size: 18px
	}

	.foodPrice {
		width: 30%;
	}

	.foodAmount {
		flex: 1;
	}

	.orderBottom {
		padding: 10px;
		display: flex;
		flex-direction: row;
	}

	.orderTotal {
		width: 55%;
	}

	.orderOperate {
		flex: 1;
		padding-top: 25px;
		display: flex;
		flex-direction: row-reverse;
	}
</style>
