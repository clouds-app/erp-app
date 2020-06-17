<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">套件明细</block>
		</cu-custom>
		<form class="xunhoutop">
			<view class="flex border-top ">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">订单号:</view>
						<input disabled="true" v-model="bcNo"/>
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">产品编号:</view>
						<input disabled="true" v-model="ProdNo"/>
					</view>
				</view>
			</view>
		</form>
		<view style="height: 40px;"></view>
		<!-- 数据列表 -->
		<view class="grid-warp" v-for="(item,index) in fromdata" :key='index' >
			<view class="grid-title grid-flex">
				<view>附件:{{item.annex}}</view>
				<view>配套系数:{{item.BoxPS}}</view>
			</view>
			<view class="grid-body">
				<view><!--@click="inKit"-->
					<!-- <view class="grid-flex padding-10">
						<view>
							<text>工单号:{{item.WorkNo}}</text>
						</view>
					</view> -->
					<view class="grid-flex padding-10">
						<view>
							<text>客户:{{item.CustName}}</text>
						</view>
						
						<view>
							<text>客户PO:{{item.CustPO}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>产品编号:{{item.ProdNo}}</text>
						</view>
						<view>
							<text>产品名称:{{item.ProdName}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>产品规格:{{item.BoxInfo}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>料号:{{item.BatchNo}}</text>
						</view>
						<view>
							<text>送货数:{{item.DelQty}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>入库{{item.InStoreQty}}</text>
						</view>
						<view>
							<text>库存:{{item.StoreQty}}</text>
						</view>
						<view>
							<text>未送:{{item.NoDelQty}}</text>
						</view>
						<!-- <view style="color: red;">
							<text>送货:{{item.e}}</text>
						</view> -->
					</view>
				</view>	
			</view>
		</view>
		<view style="height: 40px;"></view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import zTable from '@/components/z-table/z-table.vue';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import dateFormat from '@/utils/dateFormat.js';
import warehouse from '@/mixins/warehouse.js';
	export default {
		components:{zTable, uniPopup, cuCustom },
		mixins: [warehouse],
		data() {
			return {
				bcNo:'',//--订单号
				ProdNo:'',//--产品套件编号
				fromdata:[	//界面显示数据
				
				],
				}
			},
		// #ifdef H5
		mounted() {
		},
		onLoad(option){
			// debugger
			this.bcNo = option.bcNo  
			// console.log(this.bcNo)
			this.ProdNo = option.ProdNo  
			this.getappGetBoxProductinfo()
		},
		// #endif
		// #ifndef H5
		onReady() {
		},
		// #endif
		methods: {
			getappGetBoxProductinfo(){
				// debugger
				let data = {
					bcNo:this.bcNo,
					ProdNo:this.ProdNo,
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appGetBoxProductinfo',data).then(res=>{
					// console.log(res)
					this.toast.hide();
					this.fromdata = res.list
				}).catch( err=>{
					this.toast.hide();
					this.toast.message('数据加载失败')
				})
			}
		}
	}
</script>

<style>
.xunhoutop{
	position: fixed;
	width: 100%;
	z-index: 100;
}
</style>
