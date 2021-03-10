<template>
	<view>
		<approval listLoadUrl="/approval/prodpo/approvalList" ref="approval">
			<view slot="page-title">
				辅料采购审批
			</view>
			<template  slot="content" slot-scope="{data, index}">
				<view class="grid-warp" @tap="openDetail(data,index)">
					<view class="grid-title">
						{{data.PoerName==null? ' - ':data.PoerName+'-'+data.VendName}}
						<view  class="cu-tag bg-red radius">未审核</view>
					</view>
					<view class="grid-body">
						<view class="grid-flex padding-10">
							<view>
								<text>单号:{{data.po_No}}</text>
							</view>
							<view>
								<text>日期:{{data.po_PODate}}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>货币:{{data.CoinName}}</text>
							</view>
							<view>
								<text>含税金额:{{data.po_SumTax}}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>&nbsp;</text>
							</view>
							<view>
								<text></text>
								<!-- <text class="text-price">{{data.coSPecPrice}}</text> -->
							</view>
						</view>
					</view>
				</view>
			</template>
		</approval>
	</view>
</template>

<script>
import approval from '@/components/approval/approval.vue'
export default {
	components: { approval },
	data() {
		return {
			approvalClickIndex: -1
		};
	},
	methods: {
		openDetail(data,index){
			this.cache.put(String(data.ID1),data)
			this.approvalClickIndex = index
			this.router.navigate(`/pages/approval/materialsProcurement/detail?id=${data.ID1}`)
		}
	},
	onReachBottom(res) {
		this.$refs.approval.approvalListProvider()
	},
	onLoad(){
		uni.$off('boxSpecPriceApprovalSuccess')
		uni.$on('boxSpecPriceApprovalSuccess',(data) => {
		    if(this.approvalClickIndex === -1){
				return
			}
			this.$refs.approval.deleteApproval(this.approvalClickIndex)
		})
	}
};
</script>

<style>

.card {
	width: 90%;
	margin-left: 5%;
	border-radius: 10rpx;
	padding: 30rpx;
}
.status {
}
.grid-title {
	display: flex;
	justify-content: space-between;
}
.text-price {
	color: #4aecdb;
	font-size: 50rpx;
}
</style>