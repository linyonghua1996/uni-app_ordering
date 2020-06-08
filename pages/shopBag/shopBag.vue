<!-- 购物袋页 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="nav" :style="'height:' +  nav.height + 'px;' + 'padding-top:' + nav.top + 'px;padding-bottom:10rpx'">
			<view class="goBack" @click="goback()">返回</view>
			<view class="navigator">购物车</view>
		</view>
		
		<view style="margin-top: 15px;">
			<view class="container">
				<view class="detailPanel">
					<view class="detailTitle">点餐详情</view>
					<view v-for="item in bagData" :key="item.id">
						<view class="panel">
							<view class="panelName">{{item.name}}</view>
							<view class="panelPrice">￥{{item.price}}</view>
							<view class="panelNumber">
								<view class="sub">
									<image src="../../static/images/减.png" class="sub_btn" mode="aspectFit" @click="sub(item.id)"></image>
								</view>
								<view class="number">{{item.quality}}</view>
								<view class="add">
									<image src="../../static/images/加.png" class="add_btn" mode="aspectFit" @click="add(item.id)"></image>
								</view>
							</view>
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
			</view>
			<!-- 底部栏 -->
			<view class="bottom">
				<view class="bottomLeft">
					<view class="bottomTotal">合计:</view>
					<view class="bottomNumber">￥{{total}}元&nbsp;&nbsp;|</view>
				</view>
				<view class="bottomRight" @click="toComfireOrder">
					下单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue" //导航栏
	import vanField from '@/wxcomponents/vant/dist/field' //输入框
	export default {
		components: {
			uniNavBar,
			vanField
		},
		data() {
			return {
				nav: {
					top: 0,
					height: 0
				},
				// 购物袋的菜品金额
				total: 0,
				// 购物袋的菜品数量
				amount: 0,
				// 购物袋的数据
				bagData: [],
				// 备注
				remark: ''
			}
		},
		created() {
			// 获取胶囊信息
			const nav = uni.getMenuButtonBoundingClientRect()
			this.nav.top = nav.top
			this.nav.height = nav.height
			console.log(nav)
		},
		mounted() {
			this.Init()
		},
		methods: {
			toComfireOrder(){
				if(this.total===0){
					uni.navigateTo({
						url:"../ordering/ordering"
					})
				}
				uni.navigateTo({
					url:"../comfireOrder/comfireOrder"
				})
			},
			// 减
			sub(id){
				
				this.total=0
				this.amount=0
				var arr = wx.getStorageSync('recommend')
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].id === id) {
							arr[i].quality -= 1
							uni.setStorageSync('recommend', arr)
						}
					}
				}
				for(var i in this.bagData){	
					if(this.bagData[i].id===id){
						this.bagData[i].quality-=1
					}
				}
				this.bagData.forEach((item,index)=>{
					if(item.quality<=0){
						this.bagData.splice(index,1)
					}
				})
				this.bagData.forEach((item,index)=>{
					this.total+=item.quality*item.price
				})
				this.amount=this.bagData.length
			},
			// 加
			add(id) {
				console.log(id)
				this.total=0
				this.amount=0
				var arr = wx.getStorageSync('recommend')
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].id === id) {
							arr[i].quality += 1
							uni.setStorageSync('recommend', arr)
						}
					}
				}
				// console.log(this.bagData)
				for(var i in this.bagData){
					
					if(this.bagData[i].id===id){
						this.bagData[i].quality+=1
					}
				}
				this.bagData.forEach((item,index)=>{
					this.total+=item.quality*item.price
				})
				this.amount=this.bagData.length
			},
			// 后退
			goback() {
				uni.reLaunch({
					url:'../index/index'
				})
			},
			// 初始化
			Init() {
				var arr = uni.getStorageSync('recommend')
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].quality > 0) {
							this.bagData.push(arr[i])
							this.total += arr[i].quality * arr[i].price
						}
					}
				}
				this.amount = this.bagData.length
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
		margin-top: 65rpx;
	}
	.detailPanel {
		margin: 10px;
	}

	.detailTitle {
		margin-top: 35rpx;
		background: url(../../static/images/i.png) no-repeat left center;
		background-size: 70rpx;
		padding-left: 40rpx;
		font-size: 30rpx;
		font-weight: 600;
		margin-bottom: 30rpx;
	}

	.panel {
		display: flex;
		flex-direction: row;
		line-height: 100rpx;
		border-bottom: 1px solid #C0C0C0;
	}

	.panelName {
		flex: 3;
	}

	.panelPrice {
		flex: 1;
	}

	.panelNumber {
		flex: 1;
		display: flex;
		flex-direction: row;
		vertical-align: middle;
	}

	.number {
		text-align: center;
	}

	.add_btn,
	.sub_btn {
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}

	.sub,
	.add {
		width: 20px;
		height: 20px;
	}

	.sub,
	.number,
	.add {
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

	.bottom {
		position: absolute;
		bottom: 0;
		line-height: 70px;
		background: linear-gradient(to right, #ff9500, #FBCA18);
		color: #fff;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 70px;
		color: 20px;
	}

	.bottomLeft {
		width: 80%;
		display: flex;
		flex-direction: row;
		padding-right: 10px;
	}

	.bottomTotal {
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
	}

	.bottomNumber {
		width: 40%;
		font-size: 25px
	}

	.bottomRight {
		flex: 1;
		font-size: 20px;
	}
</style>
