<template>
	<view>
		<cu-custom  bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				标题标题标题
			</block> 
		</cu-custom>
		<web-view :src="url" :webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script>
	import cuCustom from '@/ui/colorui/components/cu-custom.vue';
	export default {
		components:{cuCustom},
		data() {
			return {
				url:'',
				webviewStyles: {
					progress: {
						color: '#39b54a'
					}
				}
			}
		},
		methods: {
			
		},
		onLoad(option) {
			let clientToken = this.cache.get(this.appConst.CLIENT_TOKEN_NAME)
			this.url = `${option.webUrl}?${this.appConst.SERVER_TOKEN_NAME}=${clientToken}`
			alert(url)
			
		},
		onReady(){
			// #ifndef H5
			/* var currentWebview = this.$scope.$getAppWebview()
			var wv = currentWebview.children()[0]
			let top = this.CustomBar
			let height = this.screen.height - top 
			wv.setStyle({top: top,height: height}) */
			// #endif
		}
	}
</script>

<style>

</style>
