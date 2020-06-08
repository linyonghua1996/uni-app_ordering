<!-- 评价 -->
<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="nav" :style="'height:' +  nav.height + 'px;' + 'padding-top:' + nav.top + 'px;padding-bottom:10rpx'">
			<view class="goBack" @click="goback()">返回</view>
			<view class="navigator">点餐</view>
		</view>
		<view class="container">
			<!-- 用户信息 -->
			<view class="userInfo">
				<view class="avator">
					<view class="pic">
						<image :src="avator" class="img"></image>
					</view>
				</view>
				<view class="userName">
					<view class="name">{{nickName}}</view>
					<view class="time">{{time}}</view>
				</view>
			</view>
			<!-- 菜品评价 -->
			<view class="foodEvaluate">
				<view class="evaluateName">菜品味感</view>
				<view class="star">
					<uni-rate :value="2" @change="taste"></uni-rate>
				</view>
			</view>
			<view class="foodEvaluate">
				<view class="evaluateName">菜品色泽</view>
				<view class="star">
					<uni-rate :value="2" @change="colour"></uni-rate>
				</view>
			</view>
			<view class="foodEvaluate">
				<view class="evaluateName">菜品香气</view>
				<view class="star">
					<uni-rate :value="2" @change="fragrance"></uni-rate>
				</view>
			</view>
			<view class="foodEvaluate">
				<view class="evaluateName">满意度</view>
				<view class="star">
					<uni-rate :value="2" @change="satisfaction"></uni-rate>
				</view>
			</view>
			<view class="textArea">
				<textarea placeholder="菜品的味道怎么样?说说您对它的评价" v-model="textValue"></textarea>
			</view>
			<view class="btn">
				<button class="btnStyle" @click="submitComment()">提交评价</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue" //导航栏
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import vanButton from "@/wxcomponents/vant/dist/button"
	export default {
		components: {
			uniNavBar,
			uniRate,
			vanButton
		},
		data() {
			return {
				nav: {
					top: 0,
					height: 0
				},
				id:0,
				// 用户名
				nickName:'',
				// 头像
				avator:'',
				// 系统时间
				time:'',
				// 输入区域的内容
				textValue: '',
				// 满意度
				satisfactionStar: 2,
				// 香气评分
				fragranceStar: 2,
				// 色泽评分
				colourStar: 2,
				// 味感评分
				tasteStar: 2
			}
		},
		onLoad(option){//opthin为object类型，会序列化上页面传递的参数
			console.log(option.id);//打印出上页面传递的参数
			this.id=option.id
		},
		created() {
			// 获取胶囊信息
			const nav = uni.getMenuButtonBoundingClientRect()
			this.nav.top = nav.top
			this.nav.height = nav.height
		},
		mounted() {
			this.getTime()
			this.Init()
		},
		methods: {
			// 初始化我的页面
			Init(){
				var arr=uni.getStorageSync('token')
				this.avator=arr.avatarUrl
				this.nickName=arr.nickName
			},
			// 获取系统时间
			getTime() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				this.time=timer
			},
			// 提交评价
			submitComment() {
				console.log(this.id)
				uni.request({
					url:"https://www.linhua.club/ordering/wx/personComment",
					data:{
						orderId:this.id,
						name:this.nickName,
						avatorUrl:this.avator,
						textarea:this.textValue,
						satisfactionStar:this.satisfactionStar,
						fragranceStar:this.fragranceStar,
						colourStar:this.colourStar,
						tasteStar:this.tasteStar
					},
					method:"post",
					success: (res) => {
						console.log(res.data)
						uni.navigateTo({
							url:'../evaluate/evaluate'
						})
					}
				})
			},
			satisfaction(e) {
				this.satisfactionStar = e.value
				console.log(this.satisfactionStar)
			},
			fragrance(e) {
				this.fragranceStar = e.value
				console.log(this.fragranceStar)
			},
			colour(e) {
				this.colourStar = e.value
				console.log(this.colourStar)
			},
			taste(e) {
				this.tasteStar = e.value
				console.log(this.tasteStar)
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
		margin-top: 25px;
		padding: 10px 25px;
	}

	.userInfo {
		display: flex;
		flex-direction: row;
		background: linear-gradient(to right, #4bb0ff, #6149f6);
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		overflow: hidden;
	}

	.avator {
		width: 15%;
		padding: 10px;
	}

	.pic {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.userName {
		flex: 1;
		font-size: 18px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.time {
		font-size: 15px;
		margin-top: 5px;
	}

	.foodEvaluate {
		padding: 10px;
		font-size: 18px;
		display: flex;
		flex-direction: row;
	}

	.evaluateName {
		width: 30%;
	}

	.star {
		padding-top: 10px;
		flex: 1;
	}

	.textArea {
		border: 1px dashed #ccc;
		border-radius: 5px;
		padding: 15px;
	}

	.btn {
		margin-top: 10px;
		padding: 10px;
	}

	.btnStyle {
		width: 100%;
		font-size: 18px;
		color: #fff;
		background: linear-gradient(to right, #ff9500, #FBCA18);
	}
</style>
