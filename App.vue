<script>
	import Vue from 'vue'
	import toast from 'utils/toast.js'
	import router from 'utils/router.js'
	import cache from 'utils/cache.js'
	import appConst from 'enums/app-const.js'
	import config from 'config/config.js';
	// #ifdef APP-PLUS
	import APPUpdate, { getCurrentNo } from "@/utils/APPUpdate";
	// #endif
	export default {
		onLaunch: function() {
			Vue.prototype.$config = config
			Vue.prototype.toast = toast
			Vue.prototype.router = router
			Vue.prototype.cache = cache
			Vue.prototype.appConst = appConst
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
					
					Vue.prototype.screen =  {width:e.screenWidth,height:e.screenHeight}
				}
			});
			// #ifdef APP-PLUS
			 // true 没有新版本的时候有提示，默认：false
			 APPUpdate(false); 
			 getCurrentNo(res => {
				// 进页面获取当前APP版本号（用于页面显示）
				this.version = res.version;
			})
			// #endif
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/ui/colorui/main.css";
	@import "@/ui/colorui/icon.css";
	@import "@/ui/css/grid.css"; 
	/* //重置样式 */
	.cu-form-group {
		min-height: 39px;
	}
	.cu-form-group uni-input {
		    font-size: 12px;
	}
	.cu-form-group .title{
		font-size: 12px;
		height: 24px;
	    line-height: 24px; 
		    /* text-align: justify;
		    padding-right: 12px;
		    font-size: 12px;
		    position: relative;
		    height: 24px;
		    line-height: 24px; */
	}
	/*界面===主色*/
	.color-main-cl{
		color:#2fb3ff !important;
	}
	.cl-tableDesc{
		color: #007AFF;
	}
	.cl-modifyInput{
		border-bottom: 1px #09BB07 solid;
	}
	
	.primary-btn {
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 44rpx;
		font-size: 32rpx;
		background: linear-gradient(left, #0081ff, #1cbbb4);
	}
	.cu-form-group .title {
		font-size: 16px;
	}
	.uni-picker-container{
		z-index: 99999 !important;
	}
</style>
