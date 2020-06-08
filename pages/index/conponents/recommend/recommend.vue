<!-- 推荐菜品组件 -->
<template>
	<view class="recommend_container">
		<!-- 标题 -->
		<view class="titleContainer">
			<view class="title">商家推荐</view>
			<view class="englishTitle">RECOMMEND</view>
		</view>
		<view v-for="item in recommendFood" :key="item.id">
			<!-- 推荐卡片 -->
			<view class="recommend_card" @click="onOpen(item.id)">
				<van-row>
					<van-col span="6">
						<image :src="item.imageUrl" mode="aspectFit" class="card_pic"></image>
					</van-col>
					<van-col span="18">
						<view>
							<view class="foodTitle">{{item.name}}</view>
							<view class="saleNum">销量: <text style="color: #fb2a05;padding-left: 10rpx;">{{item.saleNum}}</text></view>
							<view class="saleDesc">{{item.desc}}</view>
							<view class="foodTag">
								<van-tag round type="warning">{{item.tag_1}}</van-tag>
								<van-tag round type="warning">{{item.tag_2}}</van-tag>
								<van-tag round type="warning">{{item.tag_3}}</van-tag>
							</view>
						</view>
					</van-col>
				</van-row>
			</view>
		</view>
		<!-- 弹出层 -->
		<van-overlay :show="show" z-index='9999'>
			<view class="wrapper">
				<view class="block">
					<view class="block_pic">
						<image :src="cardData.imageUrl" class="block_img"></image>
					</view>
					<view class="block_desc">
						<view class="block_desc_left">
							<view class="block_name">{{cardData.name}}</view>
							<view class="block_introduce">{{cardData.desc}}</view>
							<view class="block_sale">销量: <text style="color: #ff9500;padding-left: 10rpx;">{{cardData.saleNum}}</text></view>
							<view class="block_price">￥{{cardData.price}}</view>
						</view>
						<view class="block_desc_right">
							<view class="sub" v-if="cardData.quality===0" v-show="false">
								<image src="../../../../static/images/减.png" class="sub_btn" mode="aspectFit" @click="sub(cardData.id)"></image>
							</view>
							<view class="sub" v-else>
								<image src="../../../../static/images/减.png" class="sub_btn" mode="aspectFit" @click="sub(cardData.id)"></image>
							</view>
							<view class="number" v-if="cardData.quality===0" v-show="false">{{cardData.quality}}</view>
							<view class="number" v-else>{{cardData.quality}}</view>
							<view class="add">
								<image src="../../../../static/images/加.png" class="add_btn" mode="aspectFit" @click="add(cardData.id)"></image>
							</view>
						</view>
					</view>
				</view>
				<view>
					<image src="../../../../static/images/乘.png" @click="onClose" class="overlay_btn"></image>
				</view>
			</view>

		</van-overlay>
	</view>
</template>

<script>
	import vanCol from '@/wxcomponents/vant/dist/col'
	import vanRow from '@/wxcomponents/vant/dist/row'
	import vanTag from '@/wxcomponents/vant/dist/tag' //标签
	import vanOverlay from '@/wxcomponents/vant/dist/overlay' //遮罩层
	export default {
		components: {
			vanCol,
			vanRow,
			vanTag,
			vanOverlay
		},
		data() {
			return {
				// 自定义一个数组用来缓存购物袋中的菜品信息
				shoppingBag: [],
				// 用来装卡片的菜品信息
				cardData: [],
				// 用来装服务器返回的推荐菜品数据
				recommendFood: [],
				// 控制弹出层的显示
				show: false
			}
		},
		created() {
			this.getRecommendFood()
		},
		methods: {
			// 加
			add(id) {
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
				console.log(id)
				var arr = wx.getStorageSync('recommend')
				// 通过循环遍历，从服务器返回的推荐菜品中找出点击的这一项
				for (var i in this.recommendFood) {
					if (this.recommendFood[i].id === id) {
						this.recommendFood[i].quality += 1
					}
				}
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].id === id) {
							arr[i].quality += 1
							uni.setStorageSync('recommend', arr)
						}
					}
				}
				this.onOpen(id)
			},
			// 减
			sub(id) {
				var arr = wx.getStorageSync('recommend')
				// 通过循环遍历，从服务器返回的推荐菜品中找出点击的这一项
				for (var i in this.recommendFood) {
					if (this.recommendFood[i].id === id) {
						this.recommendFood[i].quality -= 1
					}
				}
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].id === id) {
							arr[i].quality -= 1
							uni.setStorageSync('recommend', arr)
						}
					}
				}
				this.onOpen(id)
			},
			// 弹出层打开
			onOpen(id) {
				this.show = true
				console.log(id)
				var arr = uni.getStorageSync('recommend') || []

				// 判断缓存中是否有recommend缓存
				if (arr.length > 0) {
					for (var i in arr) {
						if (arr[i].id === id) {
							this.cardData = arr[i]
							return false
						}
					}
				}
				for (var i in this.recommendFood) {
					if (this.recommendFood[i].id === id) {
						this.cardData = this.recommendFood[i]
						arr.push(this.recommendFood[i])
					}
				}
				// 没有，则把这个数组arr插入缓存中
				uni.setStorageSync('recommend', arr)


			},
			// 弹出层关闭
			onClose() {
				this.show = false
			},
			// 请求服务器的推荐菜品数据
			getRecommendFood() {
				uni.request({
					url: 'https://www.linhua.club/ordering/wx/recommend',
					method: "GET",
					success: (res) => {
						this.recommendFood = res.data.recommend
						// 通过循环遍历，为recommendFood的每一项都设置quality=0
						this.recommendFood.forEach((item, index) => {
							item.quality = 0
						})
						console.log(this.recommendFood)
					}
				})

			}
		}
	}
</script>

<style>
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

	.block_price {
		margin-top: 8rpx;
		font-size: 35rpx;
		color: #ff0000;
	}

	.block_sale {
		margin-top: 8rpx;
		font-size: 28rpx;
		color: #000;
	}

	.block_introduce {
		margin-top: 8rpx;
		font-size: 30rpx;
		color: #C0C0C0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.block_desc_right {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		padding-bottom: 30rpx;
		padding-left: 15rpx;
	}

	.block_desc_left {
		font-weight: 600;
		font-size: 35rpx;
		width: 70%;
		/* border-right: 1px solid #CCCCCC; */
	}

	.block_desc {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
	}

	.block_pic {
		width: 100%;
		height: 60%;

	}

	.block_img {
		width: 100%;
		height: 100%;

	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		flex-direction: column;
	}

	.block {
		width: 80%;
		height: 45%;
		background-color: #fff;
		border-radius: 18rpx;
		overflow: hidden;
	}

	.overlay_btn {
		margin-top: 20rpx;
		width: 70rpx;
		height: 70rpx;
	}

	.recommend_container {
		margin: 30rpx;
	}

	.titleContainer {
		border-left: 10rpx solid #FBCA18;
		/* border-image: linear-gradient(to bottom, #ff9500, #FBCA18) 1 10; */
		padding-left: 5rpx;
	}

	.title {
		font-size: 30rpx;
		font-weight: 600;
	}

	.englishTitle {
		font-size: 18rpx;
		position: relative;
		color: #FF9500;
	}

	.recommend_card {
		margin: 40rpx 0;
	}

	.card_pic {
		width: 160rpx;
		height: 175rpx;
	}

	.foodTitle {
		font-size: 30rpx;
		font-weight: 600;
		margin-bottom: 5rpx;
	}

	.saleNum {
		font-size: 28rpx;
		color: #000;
	}

	.saleDesc {
		font-size: 28rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin: 5rpx;
	}

	.foodTag van-tag {
		margin-right: 5rpx;
	}
</style>
