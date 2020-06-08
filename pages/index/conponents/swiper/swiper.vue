<!-- 轮播图组件 -->
<template>
	<view>
		<view class="swiper_view">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="#000" indicator-active-color="#FBCA18" circular="true">
				<swiper-item v-for="(item,index) in swiperArray" :key="index" >
					<image :src="item.imageUrl" mode="scaleToFill"
					 class="swiper_img"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				swiperArray:[]
			}
		},
		created() {
			this.getSwiperData()
		},
		methods:{
			// 请求服务器的轮播图数据
			getSwiperData(){
				uni.request({
					url:'https://www.linhua.club/ordering/wx/swiper',
					method:'GET',
					success: (res) => {
						// console.log(res.data.swiper)
						this.swiperArray=res.data.swiper
					}
				})
			}
		}
	}
</script>

<style>
	.swiper_view {
		height: 100%;
		width: 93%;
		margin: 10rpx auto;
	}
	.swiper_img{
		width: 100%;
		height: 100%;
		border:0;
	}
</style>
