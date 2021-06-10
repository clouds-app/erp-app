<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">商品列表</block>
		</cu-custom>
		<view v-for="(item,i) in formDataList" :key='i'>
			<view class="dataList" @tap="clickDataList(i)">
				<view class="bg-img">
					<!-- <view v-show="i%2==0"> -->
					<view>
						<image src="../../static/zhiban2.png" mode="aspectFit"></image>
					</view>
					<!-- <view v-show="i%2!==0">
						<image src="../../static/zhiban3.png" mode="aspectFit"></image>
					</view> -->
				</view>
				<view class="formt">
					<view class="formrFirst">
						<view>纸质:{{item.pap_ArtId}}</view>
						<view :style="item.pap_IsSpec?{color:'red'}:''">报价:{{item.pap_NewPrice}}</view>
					</view>
					<view>
						备注:{{item.pap_Remark}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import cuCustom from '../../ui/colorui/components/cu-custom.vue'
import warehouse from '@/mixins';
import request from '@/utils/request.js';
import vTable from "@/components/table.vue"
export default{
	components:{cuCustom,vTable},
	mixins:[warehouse],
	data(){
		return{
			formDataList:[],
		}
	},
	created() {
		this.getOrderList()
	},
	methods:{
		clickDataList(index){
			let {pap_ArtId,pap_NewPrice} = this.formDataList[index]
			uni.navigateTo({
			    url: `../placeanOrder/placeanOrder_jjb?pap_ArtId=${pap_ArtId}&pap_NewPrice=${pap_NewPrice}`
			});
		},
		// 获取订单数据列表
		getOrderList(){
			let params = {
				userID:this.userInfo.erpUserCode,
				pageSize:1000000,
				pageNum:1
			}
			request.post('/warehouse/warehouse/execute/appGetPaperArtPriceList',params).then(res=>{
				this.formDataList = res.list
			}).catch(err=>{
				
			})
		},

		
	}
}
</script>

<style>
	.dataList{
		width: 100%;
		height: 110rpx;
		border: 1px solid #dedede;
		background: #fff;
		display: flex;
	}
	.bg-img{
		height: 100%;
		width: 20%;
	}
	.bg-img :first-child{
		height: 100%;
		width: 85%;
		margin: 0 0 0 10rpx;
		/* background-image: url(../../static/zhiban2.png); */
	}
	.bg-img :last-child{
		height: 100%;
		width: 85%;
		margin: 0 0 0 10rpx;
		/* background-image: url(../../static/zhiban2.png); */
	}
	.formt{
		width: 75%;
		display: flex;
		flex-direction:column;
		font-size: 32rpx;
		justify-content:center;
		/* align-items:center; */
	}
	.formrFirst{
		display: grid;
		grid-template-columns: 50% 50%;
	}
</style>
