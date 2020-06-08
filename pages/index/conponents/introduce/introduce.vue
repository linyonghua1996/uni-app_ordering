<!-- 商家介绍组件 -->
<template>
	<view class="introduce_container">
		<!-- 标题 -->
		<view class="titleContainer">
			<view class="title">商家介绍</view>
			<view class="englishTitle">INTRODUCE</view>
		</view>
		<!-- 详细的介绍 -->
		<view class="detail">
			<view class="promotion">
				<view class="man">工作日午餐推出多款套餐<br>满100减10,满200减30</view>
				<view class="zhe">折扣商品8折起</view>
			</view>
			<view class="notice">
				<view class="notice_title">商家公告</view>
				<view class="notice_context">本店的营业时间为11:00-14:00，16：00-20：00</view>
			</view>
			<view class="saleVolume">
				<view class="saleVolume_desc">月销8888份</view>
			</view>
			<view class="address">
				<view class="address_title">商家地址</view>
				<view class="address_context">广东省肇庆市端州区星湖大道</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vanPanel from '@/wxcomponents/vant/dist/panel'
	export default{
		components:{
			vanPanel
		},
		
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	.address .address_context{
		padding-left: 60rpx;
		color: #C0C0C0;
		font-size: 26rpx;
	}
	.address .address_title{
		padding-left: 60rpx;
	}
	.address{
		background: url(../../../../static/images/地址.png) no-repeat left center;
		background-size: 35rpx;
		font-size: 28rpx;
		font-weight: 600;
		margin-top: 30rpx;
	}
	.notice .notice_context{
		padding-left: 60rpx;
		color: #C0C0C0;
		font-size: 26rpx;
	}
	.notice .notice_title{
		padding-left: 60rpx;
	}
	.notice{
		background: url(../../../../static/images/公告.png) no-repeat left center;
		background-size: 35rpx;
		font-size: 28rpx;
		font-weight: 600;
		margin-top: 30rpx;
	}
	.saleVolume .saleVolume_desc{
		padding-left: 60rpx;
	}
	.saleVolume{
		background: url(../../../../static/images/销量.png) no-repeat left center;
		background-size: 35rpx;
		font-size: 26rpx;
		font-weight: 600;
		border-bottom: 1px dashed #C0C0C0;
	}
	.promotion .zhe{
		background: url(../../../../static/images/折扣.png) no-repeat left center;
		 padding-left: 60rpx;
		 background-size: 40rpx;
	}
	.promotion .man{
		background: url(../../../../static/images/满减.png) no-repeat left center;
		padding-left: 60rpx;
		background-size: 40rpx;
		margin-bottom: 10rpx;
		
	}
	.promotion{
		border-bottom: 1px dashed #C0C0C0;
		font-size: 26rpx;
		font-weight: 600;
	}
	.detail view{
		width: 100%;
		padding: 10rpx 0;
	}
	.detail{
		margin-top: 30rpx;
		margin-right: 30rpx;
	}
	.introduce_container{
		margin-left: 30rpx;
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
</style>
