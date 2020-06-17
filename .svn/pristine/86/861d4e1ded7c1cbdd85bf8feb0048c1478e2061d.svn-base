<template>
	<view>
		<cu-custom @BackPageEvent="backPageEvent" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{ formModel.state == '1' ? '同意申请':'驳回申请' }}
			</block> 
		</cu-custom>
		
				
		<view class="form-container">
			<view class="uni-textarea" style="background-color: #FFFFFF;">
				<textarea v-model="formModel.remark" maxlength="100" placeholder="可输入我的审批意见,非必填" style="padding: 20rpx;"/>
			</view>
						
			<view class="uni-btn-v" style="margin-top: 40rpx;">
				<button type="primary" class="primary-btn" @tap="approvalConfirmProvider" v-show="!disabled">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
export default {
	name: 'approvalConfirm',
	components: { cuCustom },
	data() {
		return {
			formModel:{
				state: '0',
				approvalId: '',
				remark:'',
				spNo:''
			},
			modelName:'',
			disabled:false
		};
	},
	onLoad(option) {
		this.formModel.state = option.type
		this.formModel.approvalId = option.approvalId
		this.formModel.spNo = option.spNo
		this.modelName = option.modelName
	},
	methods: {
		backPageEvent(){},
		approvalConfirmProvider(){
			this.toast.loading()
			request.post(`/approval/${this.modelName}/approval`,this.formModel).then(res =>{
				this.disabled = true
				this.toast.hide()
				this.toast.success('审批成功')
				setTimeout(()=>{
					this.router.back(2)
				},500)
				uni.$emit(this.modelName+'ApprovalSuccess',{approvalId:this.formModel.approvalId})
			}).catch(err => {
				if(typeof err  === 'string'){
					this.toast.message(err)
				}else{
					this.toast.message('系统繁忙，审批失败')
				}
			})
		}
	}
};
</script>

<style>
	.form-container{
		padding: 40rpx;
	}
	
	uni-textarea{
		width: auto !important;
	}
</style>
