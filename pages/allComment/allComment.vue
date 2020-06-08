<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="nav" :style="'height:' +  nav.height + 'px;' + 'padding-top:' + nav.top + 'px;padding-bottom:10rpx'">
			<view class="goBack" @click="goback()">返回</view>
			<view class="navigator">点餐</view>
		</view>
		<view class="container">
			<view class="top">
				<view class="total">评论({{total}})</view>
			</view>
			<view v-for="(item,index) in listData" :key="index">
				<view class="commentCard">
					<view class="avatar">
						<view class="pic">
							<image :src='item.avatorUrl' class="img"></image>
						</view>
					</view>
					<view class="commentPanel">
						<view class="commentInfo">
							<view class="name">{{item.name}}</view>
							<view class="timer">{{item.createdAt.slice(0,10)}}</view>
						</view>
						<view class="rate">
							<uni-rate :value="item.satisfactionStar" disabled></uni-rate>
						</view>
						<view class="content">{{item.textarea}}</view>
					</view>
				</view>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue" //导航栏
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	
	export default {
	    components: {
			uniNavBar,
			uniRate
		},
		data(){
			return{
				nav: {
					top: 0,
					height: 0
				},
				// 总评价数
				total:0,
				listData:[]
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
		methods:{
			// 初始化
			Init(){
				uni.request({
					url:'https://www.linhua.club/ordering/wx/allComment',
					method:"GET",
					success: (res) => {
						// console.log(res.data)
						this.listData=res.data
						this.total=res.data.length
					}
				})
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
	.top{
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
	}
	.total{
		width: 50%;
		font-size: 16px;
		background: url(../../static/images/评论.png) no-repeat left center;
		background-size: 20px 30px;
		padding-left: 25px;
	}
	.totalRate{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.commentCard{
		display: flex;
		flex-direction: row;
		margin-top: 20px;
		padding-bottom: 15px;
		border-bottom: 1px solid #ccc;
	}
	.avatar{
		width: 20%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.pic{
		width: 45px;
		height: 45px;
		border-radius: 50%;
		overflow: hidden;
		
	}
	.img{
		width: 100%;
		height: 100%;
	}
	.commentPanel{
		flex: 1;
	}
	.commentInfo{
		display: flex;
		flex-direction: row;
		font-size: 16px;
	}
	.name{
		width: 60%;
	}
	.timer{
		flex: 1;
	}
	.rate{
		padding: 15px 0;
	}
	.content{
		font-size: 18px;
	}
</style>
