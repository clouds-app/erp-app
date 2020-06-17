<template>
	<view>
		<uni-popup ref="searchPopup" type="top">
			<view :style="{ 'padding-top': CustomBar + StatusBar + 'px','background-color': '#fff' }">
				<customerSelect v-model="searchModel.customer"></customerSelect>
				<view class="margin-text-center" style="padding: 30rpx 50rpx;">
					<button type="primary" class="primary-btn" @tap="search">搜 索</button>
				</view>
			</view>
			<view :style="{height:screen.height - 147+'px','background-color':'rgba(0,0,0,0)'}" @tap="close"></view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue" 
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import customerSelect from '@/components/customer/customer.vue'
	export default {
		components:{ uniPopup, uniDrawer, customerSelect },
		data() {
			return {
				searchModel:{
					customer:''
				}
			}
		},
		methods:{
			open(){
				this.$refs.searchPopup.open()
			},
			close(){
				this.$refs.searchPopup.close()
			},
			search(){
				this.$emit('search',this.searchModel)
				this.close()
			}
		}
	}
</script>

<style>

</style>
