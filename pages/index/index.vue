<template>
	<view>
		<view v-if="showTabName === 'index'">
			<view class="header">
				<view class="banner">
					<image src="../../static/index-banner5.jpg" style="width:100%;height: 400rpx;"></image>
				   <view class="companyInfo">
					   <view class="infoItem infoItemERP text-cut">{{user.customerName}}</view>
				   </view>
				</view>
			</view>
			<erp-menu :menuList="appMenu.index"></erp-menu>
		</view>
		
		<view v-if="showTabName === 'manager'">
			<masterBoard></masterBoard>
		</view>
		
		<view v-if="showTabName === 'function'">
			<cu-custom bgColor="bg-gradual-blue" :isBack="false">
					<block slot="content">功能</block>
			</cu-custom>
			<erp-menu :menuList="appMenu.function"></erp-menu>
		</view>
		
		<view v-if="showTabName === 'report'">
			<cu-custom bgColor="bg-gradual-blue" :isBack="false">
					<block slot="content">报表</block>
			</cu-custom>
			<erp-menu :menuList="appMenu.report"></erp-menu>
		</view>
		
		<view v-if="showTabName === 'uCenter'">
			<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="content">我的</block></cu-custom>
			
			<view class="cu-list menu-avatar">
				<view class="cu-item" style="padding: 40rpx 0;height: 160rpx;">
					<text  class="cuIcon-peoplefill  cu-avatar radius lg margin-top10 color-main-cl"></text>
					<view class="content" style="line-height:none;">
						<view class="text-black text-sm">
							<view class="text-cut">
								{{user.customerName}}
							</view>
							<view class="text-cut" style="padding-left: 10rpx;">
								( {{user.name}} )
							</view>
						</view>
						<view class="text-gray text-sm flex" @tap="copyCustomerCode(user.code)"> 
							<view class="text-cut">注册码: {{user.code}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border margin-top ">
				<view class="cu-item" @tap="changePassword">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">修改密码</text>
					</view>
				</view>
				<view class="cu-item" @tap="switchAccount">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">账户切换</text>
					</view>
				</view>
				<view class="cu-item" @tap="loginOut">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">退出登陆</text>
					</view>
				</view>
			</view>
			<view style="position: fixed;bottom: 100rpx;text-align: center;padding: 40rpx;width: 100%;line-height: 60rpx;">
				<text style="text-align: center;">当前版本号：{{appVersion}}<br/></text>
				<text style="text-align: center;">SZCLSOFT.COM AllRights Reserved 版权所有<br/></text>
				<text style="text-align: center;">联系方式：0755-27091958 QQ：2355353626<br/></text>
			</view> 
		</view>
		
		<tab-bar v-model="showTabName" class="tab-bar" ref="tabBar"></tab-bar>
	</view>
</template>

<script>
import masterBoard from '../masterBoard/masterBoard.vue'
import menuMixin from '../../mixins/menu.js';
import ErpMenu from '../../components/menu/menu';
import cuCustom from '../../ui/colorui/components/cu-custom.vue';
import TabBar from '@/components/tab-bar/tab-bar.vue'

export default {
	components: { ErpMenu, cuCustom, TabBar,masterBoard },
	mixins: [menuMixin],
	data() {
		return {
			showTabName:'index',
			version: '',
			user:{},
			appVersion:'1.0'
		}
	},
	methods: {
		
		changePassword(){
			this.router.navigate('/pages/changePassword/changePassword')
		},
		loginOut(){
			const _self = this
			uni.showModal({
			    title: '提示',
			    content: '确定退出APP吗?',
			    success: function (res) {
			        if (res.confirm) {
						const code = _self.cache.get(_self.appConst.CLIENT_CUSTOMER_CODE)
						_self.cache.clear()
						_self.cache.put(_self.appConst.CLIENT_CUSTOMER_CODE,code)
						_self.router.reLaunch('/pages/login/login2')
			        }
			    }
			})
		},
		getAppVersion(){
			let _self = this
			// #ifdef APP-PLUS
			plus.runtime.getProperty( plus.runtime.appid, function ( wgtinfo ) {
			  _self.appVersion = wgtinfo.version
			} );
			// #endif
		},
		switchAccount(){
			this.router.navigate('/pages/uCenter/switchAccount')
		},
		copyCustomerCode(code){
			// #ifdef APP-PLUS
			uni.setClipboardData({
			    data: code,
			    success: function () {
			       this.toast.message('复制成功')
			    }
			});
			// #endif
		}
	},
	onLaunch(e) {
		
	},
	created(){
		this.getAppVersion()
	},
	onReady(){
		this.user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME) 
		setTimeout(()=>{
			if(this.user === undefined || this.user === null){
				this.user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME) 
			}
		},1000)
	}
};
</script>

<style></style>

<style>
.header {
	position: relative;
}
.header .companyInfo {
	font-family: '微软雅黑';
	position: absolute;
	top: 100rpx;
	left: 50rpx;
	display: -webkit-flex; /* Safari */
	display: flex;
	flex-direction: column
}
.companyInfo .infoItem{
	font-weight: bold;
}
 .infoItemERP{
	 width: 500rpx;
    color: white;
	font-size: 25px;
}

.notice {
	width: 80%;
	margin-left: 10%;
	position: absolute;
	bottom: -30rpx;
	color: #333333;
	padding: 15rpx;
	font-size: 32rpx;
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
}

.notice-content {
	animation: 10s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
	0% {
		transform: translateX(200px);
		-webkit-transform: translateX(200px);
	}
	100% {
		transform: translateX(-100%);
		-webkit-transform: translateX(-100%);
	}
}

@-webkit-keyframes wordsLoop {
	0% {
		transform: translateX(200px);
		-webkit-transform: translateX(200px);
	}
	100% {
		transform: translateX(-100%);
		-webkit-transform: translateX(-100%);
	}
}

.example-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 32upx;
	color: #464e52;
	padding: 30upx;
	margin-top: 20upx;
	position: relative;
	background-color: #fdfdfd;
}

.example-title:after {
	content: '';
	position: absolute;
	left: 0;
	margin: auto;
	top: 0;
	bottom: 0;
	width: 20upx;
	height: 40upx;
	border-top-right-radius: 20upx;
	border-bottom-right-radius: 20upx;
	background-color: #0081ff;
}

.example .example-title {
	margin: 40upx 0;
}

.example-body {
	border-top: 1px #f5f5f5 solid;
	background: #fff;
}

.example-info {
	padding: 30upx;
	color: #3b4144;
	background: #fff;
}

.image {
	width: 50upx;
	height: 50upx;
}

.text {
	font-size: 26upx;
	margin-top: 10upx;
	color: #000000 !important;
}
.cu-item {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
}
.no-border {
	padding: 0;
}
.tab-bar{
	position: fixed;
	width: 100%;
	bottom: 0;
}
</style>
