<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true"><block slot="content">客户详情</block></cu-custom>
		<view  class="grid-warp" v-for="(item,index) in fromdata" :key='index'>
			<view class="grid-title">
				<view>客户详情信息</view>
				<!-- <view @click="viewDetails">查看详情</view> -->
			</view>
			<view class="grid-body">
				<view class="grid-flex padding-10">
					<view>
						<text>客户名称：{{item.ct_Desc}}</text>
					</view>
					<view>
						<text>付款方式：{{item.g_CuryId}}</text>
					</view>
					
				</view>
				<view class="grid-flex padding-10">
					<view>
						<text>收款金额：{{item.g_amt}}</text>
					</view>
					<view>
						<text>入账金额：{{item.g_accAmt}}</text>
					</view>
				</view>
				<view class="grid-flex padding-10">
					<view>
						<text>收款日期：{{item.g_date}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
export default {
name: 'custdetails', ///收款查询客户详情
components: { cuCustom },
		data() {
			return {
				fromdata:[],
				parmas:{},
			}
		},
		onLoad(val) {
			this.parmas = this.cache.get(val.id);
			this.getfromdata()
		},
		methods: {
			getfromdata(){
				this.toast.loading();
				let params = {
					cList:this.parmas.cList, 	//--客户编号
					BDate:this.parmas.BDate, //	--开始日期
					EDate:this.parmas.EDate,	// --结束日期
					Mode:"0", 	//--查询方式（0明细数据、1汇总数据）
					UserID:this.parmas.UserID,
					vMam:this.parmas.vMam,	//--业务员
					vType:this.parmas.vType	//--客户类型（0:全部，1:纸箱，2:纸板）
				}
				request.post('/warehouse/warehouse/execute/appAspSysAcceptMoneyAnalyzerly',params).then(res=>{
					if(res.list.length != 0){
						this.toast.hide();
						this.fromdata = res.list
					}else{
						this.toast.hide();
						this.toast.message('该客户无数据')
					}
				}).catch(err=>{
						this.toast.hide();
						this.toast.message('数据加载失败')
				})
			}
		}
}
</script>

<style>
</style>
