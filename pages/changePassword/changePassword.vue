<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">修改密码</block></cu-custom>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">旧密码:</view>
					<input v-model="formModel.oldPassword" type="password" placeholder="请输入旧密码" ref="oldPassword" name="input" maxlength="20" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">新密码:</view>
					<input v-model="formModel.newPassword" type="password" placeholder="请输入新密码" ref="newPassword" name="input" maxlength="20" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">新密码:</view>
					<input v-model="formModel.newPassword2" type="password" placeholder="请再次确认新密码" ref="newPassword2" name="input" maxlength="20" />
				</view>
			</view>
		</view>
		<view class="margin-text-center margin-top" style="padding: 0 50rpx;">
			<button type="primary" @tap="changePasswordProvider" class="primary-btn">确  定</button>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/ui/colorui/components/cu-custom.vue'
	import request from '@/utils/request.js';
	import {emptyValidator} from '@/utils/validator.js'
	export default {
		components:{ cuCustom },
		data() {
			return {
				formModel:{
					newPassword:'',
					oldPassword:'',
					newPassword2:''
				}
			}
		},
		methods: {
			changePasswordProvider(){
				if(emptyValidator(this.formModel.oldPassword)){
					this.toast.message('旧密码不能为空')
					return
				}
				if(emptyValidator(this.formModel.newPassword)){
					this.toast.message('新密码不能为空')
					return
				}
				if(this.formModel.newPassword.length < 6){
					this.toast.message('新密码长度不能小于6位')
					return
				}
				
				if(this.formModel.newPassword != this.formModel.newPassword2){
					this.toast.message('两次新密码输入不一致')
					return
				}
				this.toast.loading()
				request.post('/cls-api/user/changePassword',this.formModel).then(res => {
					this.toast.hide()
					this.toast.message('密码修改成功')
				}).catch(err =>{
					this.toast.hide()
					if(typeof err === 'string'){
						this.toast.message(err)
					}else{
						this.toast.message('密码修改修改')
					}
				})
			}
		}
	}
</script>

<style>

</style>
