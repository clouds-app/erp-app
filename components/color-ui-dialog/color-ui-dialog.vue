<template>
	<view class="color-ui-dialog-box">
		<view class="cu-modal" :class="idShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{title}}</view>
					<view class="action" @tap="cancelModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				{{msgContent}}
				<slot></slot>
				<view style="margin-top: 20px;" class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="cancelModal">取消</button>
						<button :disabled="disabledSubmitBtn" :loading="isloading" class="cu-btn bg-green margin-left" @tap="comfirmModal">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'colorUiDialog',
		props:{
			// 是否禁用提交按钮
			disabledSubmitBtn:{
				type:Boolean,
				default:false
			},
			// 当前模块名称
			moduleName:{
				type:String,
				default:''
			},
			// 是否提交中
			isloading:{
				type:Boolean,
				default:false
			},
			// 当前显示提示内容
			msgContent:{
				type:String,
				default:''
			},
			// 是否显示弹出框
			toShowModal:{
				type:Boolean,
				default:false
			},
			// 弹框标题
			title:{
				type:String,
				default:'提示'
			}
		},
		watch:{
			toShowModal(newVal,oldVal){
				this.idShowModal = newVal
				
			}
		},
		data() {
			return {
				comfirmYesOrNot:false,// 当前确认微真 或 假
				idShowModal:false,
			}
		},
		methods:{
			comfirmModal() {
				let params = {
					moduleName:this.moduleName
				}
				this.$emit('comfirmModal',params)
			},
			cancelModal() {
				let params = {
					moduleName:this.moduleName
				}
				this.$emit('cancelModal',params)
				this.idShowModal = false
				this.comfirmYesOrNot =false
			},
	}
}
</script>

<style>
.color-ui-dialog-box{
	font-size: 28rpx;
}
 .textArea100{
	 height: 100%;
	 width: 100%;
 }
</style>
