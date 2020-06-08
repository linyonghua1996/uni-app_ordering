<!-- 点餐页 -->
<template>
	<view class="ordering">
		<!-- 顶部导航栏 -->
		<view class="nav" :style="'height:' +  nav.height + 'px;' + 'padding-top:' + nav.top + 'px;padding-bottom:10rpx'">
			<view class="goBack" @click="goback()">返回</view>
			<view class="navigator">点餐</view>
		</view>
		<view >
			<view class="container">
				<!-- 分类选择 -->
				<sort-selection></sort-selection>
				
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue" //导航栏
	import sortSelection from "./components/sortSelection.vue" //自定义分类选择组件
	export default {
		components: {
			uniNavBar,
			sortSelection
		},
		data() {
			return {
				nav: {
					top: 0,
					height: 0
				},
				// 金额
				total: 0,
				// 数量
				amount: 0
			}
		},
		created() {
			// 获取胶囊信息
			const nav = uni.getMenuButtonBoundingClientRect()
			this.nav.top = nav.top
			this.nav.height = nav.height
		},
		methods: {
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
	.ordering {
		position: relative;
	}

	.container {
		height: 100%;
	}

	.bottom {
		position: fixed;
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
		width: 70%;
		display: flex;
		flex-direction: row;
		padding-right: 10px;
	}

	.bottomTotal {
		width: 25%;
		position: relative;
	}

	.shopBag {
		background: linear-gradient(to right, #ff9500, #FBCA18);
		width: 95rpx;
		height: 95rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: -15px;
		left: 15px;

	}

	.shopBagImage {
		width: 70rpx;
		height: 70rpx;
	}

	.bottomNumber {
		flex: 1;
		font-size: 25px
	}

	.bottomRight {
		flex: 1;
		font-size: 20px;
		text-align: center;
	}
</style>
