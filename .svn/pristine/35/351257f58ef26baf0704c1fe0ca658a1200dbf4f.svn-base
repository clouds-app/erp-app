<template>
	<view>
		<!-- 申请留言 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" style="z-index: 4;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{ formModel.state == '1' ? '同意申请':'驳回申请' }}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view v-if="formModel.state == '1' ? false: true" style="text-align: right;font-size: 40rpx;" @tap="showModal" data-target="DrawerModalL"><text>驳回固定回复</text>
					<text :class="'cuIcon-' + icon" style="font-size:17px"></text>
				</view>
				
				<view class="uni-textarea" style="text-align: left; background-color: #e3e3e3;">
					<textarea v-model="formModel.remark" maxlength="100" placeholder="可输入我的审批意见,非必填" style="padding: 20rpx;"/>
				</view>
				<view style="height: 50rpx;"></view>					
		
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="addfromList">确定</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal drawer-modal justify-start" :class="leftmodalName=='DrawerModalL'?'show':''" @tap="lefthideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in remarList" :key="index">
						<view class="content" @tap='getremark(item.remar)'>
							<view>{{item.remar}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import request from '@/utils/request.js';
export default {
	components: {  },
	data() {
		return {
			remarList:[{remar:'价格太低,没利润不同意'},{remar:'用纸太好,看能否改用其他纸'},{remar:'本身纸质报价就低,订单不能在特价'}],
			index: -1,
			type:'',
			leftmodalName:'',
			initData: {},
			icon: 'fold',
			Auditdeicon: 'fold',
			shrink: '', //判断是否隐藏
			Auditdetailst: [], //审核详情数据
			Auditdeta: [],
		};
	},
	props:{
		modalName:{
			type:String,
		},
		formModel:{
			type:Object,
		},
		modelName:{
			type:String,
		}
	},
	methods: {
		getremark(data){
			this.formModel.remark = data
			this.leftmodalName = ''
		},
		lefthideModal(){
			this.leftmodalName = ''
		},
		showModal(e) {
			// debugger
			this.leftmodalName = e.currentTarget.dataset.target
		},
		
		addfromList(){
			this.toast.loading()
			request.post(`/approval/${this.modelName}/approval`,this.formModel).then(res =>{
				this.toast.hide()
				this.toast.success('审批成功')
				this.modalName = ''
				setTimeout(()=>{
					this.router.back(1)
				},500)
				// uni.$emit(this.modelName+'ApprovalSuccess',{approvalId:this.formModel.approvalId})
			}).catch(err => {
				if(typeof err  === 'string'){
					this.toast.message(err)
					this.modalName = ''
				}else{
					this.toast.message('系统繁忙，审批失败')
					this.modalName = ''
				}
			})
		},
		hideModal(){
			this.$emit('hideModal')
		},
		
	},
};
</script>

<style>
</style>
