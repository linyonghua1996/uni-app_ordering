<!-- 首页 -->
<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="navigator" :style="'height:' +  nav.height + 'px;' + 'padding-top:' + nav.top + 'px;padding-bottom:10rpx'">
			首页
		</view>
		<view class="scroll_container">
			<scroll-view scroll-y class="scroll">
				<view>
					<van-notice-bar mode="closeable" text="走过路过,不要错过!今日小店新开张,特推出各种优惠!欢迎光临小店,祝您用餐愉快!" />
					<!-- 轮播图 -->
					<Swiper></Swiper>
					<!-- 商家推荐 -->
					<Recommend></Recommend>
					<!-- 商家介绍 -->
					<Introduce></Introduce>
					<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
					 @trigger="trigger"></uni-fab>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 引入组件
	import Swiper from './conponents/swiper/swiper.vue' //轮播图
	import Recommend from './conponents/recommend/recommend.vue' //商家推荐
	import Introduce from './conponents/introduce/introduce.vue' //商家介绍
	import uniFab from '@/components/uni-fab/uni-fab.vue' //悬浮按钮
	export default {
		data() {
			return {
				nav: {
					top: 0,
					height: 0
				},
				// 配置项
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#FBCA18',
					buttonColor: '#FBCA18'
				},
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				content: [{
						iconPath: '/static/images/扫一扫-未选中.png',
						selectedIconPath: '/static/images/扫一扫.png',
						text: '扫一扫',
						active: true
					},
					{
						iconPath: '/static/images/购物袋-未选中.png',
						selectedIconPath: '/static/images/购物袋.png',
						text: '购物袋',
						active: true
					},
					{
						iconPath: '/static/images/点餐.png',
						selectedIconPath: '/static/images/点餐.png',
						text: '点餐',
						active: true
					},
					{
						iconPath: '/static/images/订单.png',
						selectedIconPath: '/static/images/订单.png',
						text: '订单',
						active: true
					}
				]

			}
		},
		created() {
			// 获取胶囊信息
			const nav = uni.getMenuButtonBoundingClientRect()
			this.nav.top = nav.top
			this.nav.height = nav.height
		},
		methods: {
			// 订单
			order(){
				uni.navigateTo({
					url: "../evaluate/evaluate"
				})
			},
			// 点餐
			ordering(){
				uni.navigateTo({
					url: "../ordering/ordering"
				})
			},
			//去点餐页
			goToBuy(tableNum) {
				// 把桌号存到本地存储中
				wx.setStorageSync("tableNum", tableNum)
				wx.navigateTo({
					url: '../buy/buy'
				})
			},
			// 购物袋
			toShopBag() {
				uni.navigateTo({
					url: "../shopBag/shopBag"
				})
			},
			// 扫一扫
			toScan() {
				console.log('扫一扫')
				let that=this
				//true 扫码点餐； false 本地点餐
				let saoMa = false;
				// 本地点餐
				if (!saoMa) {
					this.goToBuy("1号桌")
					return
				}
				// 允许从相机和相册扫码点餐
				uni.scanCode({
					success: function(res) {
						// console.log('条码类型：' + res.scanType);
						// console.log('条码内容：' + res.result);
						if (res.result) {
							let str = res.result;
							if (str.search("1号桌") != -1) {
								console.log("1号桌")
								that.goToBuy("1号桌")
							} else if (str.search("2号桌") != -1) {
								console.log("2号桌")
								that.goToBuy("2号桌")
							} else if (str.search("3号桌") != -1) {
								console.log("3号桌")
								that.goToBuy("3号桌")
							}
						}
					}
				});

			},
			// 点击悬浮按钮，触发里面对应的事件函数
			trigger(e) {
				console.log(e.index)
				// this.content[e.index].active = !e.item.active;
				if (e.index === 1) {
					this.toShopBag()
				} else if (e.index === 0) {
					this.toScan()
				}else if(e.index === 2){
					this.ordering()
				}else if(e.index === 3){
					this.order()
				}
			}
		},

		// 注册组件
		components: {
			Swiper,
			Recommend,
			Introduce,
			uniFab
		}
	}
</script>

<style>
	page{
		height: 100%;
		display: flex;
	}
	.container{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.navigator {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		font-size: 30rpx;
		font-weight: 700;
	}
	.scroll_container{
		flex: 1;
		overflow: hidden;
	}
	.scroll{
		height: 100%;
	}
</style>
