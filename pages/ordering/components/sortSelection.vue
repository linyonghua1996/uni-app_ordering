<template>
	<view>
		<view class="sortSelection">
			<view class="leimu">
				<view v-for="(item,index) in leimu" :key="index">
					<view :class="activeIndex===index?'leimuItem active':'leimuItem'" @click="getActive(index,item.leimu)">{{item.leimu}}</view>
				</view>
			</view>
			<view class="food">
				<view class="foodCard" v-for="item in food" :key="item.id">
					<view class="foodImage">
						<image :src="item.imageUrl" class="img"></image>
					</view>
					<view class="foodDeatil">
						<view class="foodName">{{item.name}}</view>
						<view class="sortVolume">销量:<text style="color: #ff9500;padding-left: 10rpx;">{{item.saleNum}}</text></view>
						<view class="foodPrice">￥{{item.price}}</view>
					</view>
					<view class="amountBtn">
						<view class="sub" v-if="item.quality===0" v-show="false">
							<image src="../../../static/images/减.png" class="sub_btn" mode="aspectFit" @click="sub(item,index)"></image>
						</view>
						<view class="sub" v-else>
							<image src="../../../static/images/减.png" class="sub_btn" mode="aspectFit" @click="sub(item,index)"></image>
						</view>
						<view class="number" v-if="item.quality===0" v-show="false">{{item.quality}}</view>
						<view class="number" v-else>{{item.quality}}</view>
						<view class="add">
							<image src="../../../static/images/加.png" class="add_btn" mode="aspectFit" @click="add(item,index)"></image>
						</view>
					</view>
				</view>

			</view>
		</view>
		
		<!-- 底部栏 -->
		<view class="bottom">
			<view class="bottomLeft">
				<view class="bottomTotal">
					<view class="shopBag">
						<image src="../../../static/images/购物.png" class="shopBagImage" mode="aspectFit"></image>
					</view>
					<view class="logo"><view>{{amount}}</view></view>
				</view>
				<view class="bottomNumber">￥{{total}}元</view>
			</view>
			<view class="bottomCenterBase">|</view>
			<view class="bottomRight" @click="toShoppingBag">
				选好了
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 金额
				total: 0,
				// 数量
				amount: 0,
				// 点击了某个类目，把这个类目的所有菜品信息存储到food数组当中，然后显示出来
				food: [],
				// 这个用来存储从服务器返回的所有菜品信息
				allFood: [],
				// 记录点击类目的id,默认第一个激活
				activeIndex: 0,
				// 这个用来存储从服务器返回的第一个类目
				firstLeimu: '',
				// 这个用来存储从服务器返回的类目数据
				leimu: []
			}
		},
		created() {
			this.InitLeimu()
			this.InitFood()
			this.Init()
		},
		methods: {
			// 初始化金额和数量
			Init() {
				this.total=0
				this.amount=0
				var arr = uni.getStorageSync('recommend')
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].quality > 0) {
							this.total += arr[i].quality * arr[i].price
							this.amount += 1
						}
					}
				}
				// console.log(this.amount)
			},
			toShoppingBag() {
				if(this.total===0){
					uni.showToast({
					    title: '请选择菜品',
					    duration: 2000,
						icon:'none'
					});
					return;
				}
				uni.navigateTo({
					url: '../shopBag/shopBag'
				})
			},
			// 减
			sub(item,index){
				var arr = uni.getStorageSync('recommend')
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].id === item.id) {
							arr[i].quality -= 1
							uni.setStorageSync('recommend', arr)
						}
					}
				}
				this.getActive(index,item.type)
				this.Init()
			},
			// 加
			add(item,index) {
				var tableNum=uni.getStorageSync('tableNum')
				//点加号之前必须先扫码桌号
				if (!tableNum) {
					wx.showModal({
						title: '提示',
						content: '请在首页扫码识别桌号后再来点餐',
						showCancel: false, //去掉取消按钮
						success: function(res) {
							if (res.confirm) {
								wx.switchTab({
									url: '../../index',
								})
							}
						}
					})
					return;
				}
				// console.log(item)
				var arr = uni.getStorageSync('recommend')||[]
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].id === item.id) {
							arr[i].quality += 1
							uni.setStorageSync('recommend', arr)
							this.getActive(index,item.type)
							this.Init()
							return false
						}
					}
					
				}
				// console.log(this.food)
				item.quality=0
				arr.push(item)
				uni.setStorageSync('recommend', arr)
				for (var i in arr) {
					if (arr[i].id === item.id) {
						arr[i].quality += 1
						uni.setStorageSync('recommend', arr)
						this.getActive(index,item.type)
					}
				}
				this.Init()
				
			},
			// 激活的类目
			getActive(index, leimu) {
				this.activeIndex = index

				this.food = []
				this.allFood.forEach((item, index) => {

					if (item.type === leimu) {
						this.food.push(item)
					}
				})
				var arr = uni.getStorageSync('recommend')
				for (var i in this.food) {
					for (var j in arr) {
						if (this.food[i].id === arr[j].id) {
							this.food[i].quality = arr[j].quality
						}
					}
				}
				// console.log(this.food)
			},
			// 初始化类目
			InitLeimu() {
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/getAllType',
					method: "GET",
					success: (res) => {
						// console.log(res.data)
						this.leimu = res.data.leimu
						this.leimu.forEach((item, index) => {

							if (index === 0) {
								this.firstLeimu = item.leimu
							}
						})
					}
				})
			},
			// 初始化菜品
			InitFood() {
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/getAllFood',
					method: "GET",
					success: (res) => {
						this.allFood = res.data.allFood
						
						
						this.allFood.forEach((item, index) => {
							item.quality=0
							if (item.type === this.firstLeimu) {
								this.food.push(item)
							}
						})
						console.log(this.food)
						// 将显示的菜品数量和缓存的菜品数量一一对应
						var arr = uni.getStorageSync('recommend')
						for (var i in this.food) {
							for (var j in arr) {
								if (this.food[i].id === arr[j].id) {
									this.food[i].quality = arr[j].quality
								}
							}
						}
					}
				})
			}
		}
	}
</script>

<style>
	.sortSelection {
		display: flex;
		flex-direction: row;
		width: 100%;
		/* height: 100%; */
		height: calc(100vh - 80px);
	}

	.leimu {
		width: 20%;
		background-color: #f3f3f3;
		height: 100%;
	}

	.leimuItem {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		/* font-weight: 600; */
	}

	.active {
		color: #ff9500;
		border-left: 3px solid #ff9500;
		background-color: #fff;

	}

	.food {
		flex: 1;
		height: 100%;
	}

	.foodCard {
		display: flex;
		flex-direction: row;
		margin-top: 5px;
		padding: 5px;
	}

	.foodImage {
		width: 160rpx;
		height: 180rpx;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.foodDeatil {
		flex: 2;
		padding-left: 10rpx;
	}

	.foodName {
		font-weight: 600;
		font-size: 18px;
		line-height: 18px;
	}

	.sortVolume {
		font-size: 16px;
		color: #000;
		margin: 5px 0 5px 0;
	}

	.foodPrice {
		font-size: 20px;
		color: #ff0000;
		font-weight: 600;
	}

	.amountBtn {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		padding-bottom: 20px;
		padding-right: 20px;
	}

	.number {
		text-align: center;
	}

	.add_btn,
	.sub_btn {
		width: 100%;
		height: 100%;
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
	.logo{
		position: absolute;
		top: -22px;
		left: 47px;
		width: 22px;
		height: 22px;
		background: #ff0000;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bottomCenterBase{
		font-size:25px 
	}
</style>
