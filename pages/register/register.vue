<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">用户注册</block></cu-custom>
		<view v-if="enabledRegister">
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">单位识别码:</view>
						<input v-model="formModel.customerCode" @blur="getCustomerName" type="text" placeholder="请输入单位识别码"  name="input" maxlength="7" />
						{{customerName}}
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">姓名:</view>
						<input v-model="formModel.name" type="text" placeholder="请输入姓名" ref="newPassword" name="input" maxlength="20" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">手机:</view>
						<input v-model="formModel.phoneNo" type="number" placeholder="请输入手机号码" ref="newPassword" name="input" maxlength="11" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">密码:</view>
						<input v-model="formModel.password" type="password" placeholder="请输入密码" ref="newPassword2" name="input" maxlength="20" />
					</view>
				</view>
			</view>
			<view class="margin-text-center margin-top" style="padding: 0 50rpx;">
				<button type="primary" @tap="userRegisterProvider" class="primary-btn">确  定</button>
			</view>
			<view style="padding: 60rpx 0;text-align: center;color: #DD514C;">
				<text>提示：注册成功审核后方可登陆</text>
			</view>
		</view>
		<view v-else>
			<view style="padding: 30rpx;">
				<image src="../../static/guanzhu.jpg" style="width: 100%;" mode="widthFix"></image>
			</view>
			<view style="text-align: center;padding: 30rpx; color: red;">
				请长按此二维码关注“e包装”,接收ERP推送的消息!
			</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/ui/colorui/components/cu-custom.vue'
	import request from '@/utils/request.js';
	import {emptyValidator} from '@/utils/validator.js'
	import config from '@/config/config.js'
	export default {
		components:{ cuCustom },
		data() {
			return {
				formModel:{
					customerCode:'',
					name:'',
					password:'',
					phoneNo:''
				},
				customerName:'',
				enabledRegister:false
			}
		},
		methods: {
			userRegisterProvider(){
				/* if(emptyValidator(this.formModel.oldPassword)){
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
				} */
				this.toast.loading()
				request.post('/cls-api/user/register',this.formModel).then(res => {
					this.toast.hide()
					this.toast.message('注册成功，审核后方可登陆')
					// 注册成功后，把识别码缓存
					this.cache.put(this.appConst.CLIENT_CUSTOMER_CODE,this.formModel.customerCode)
				}).catch(err =>{
					this.toast.hide()
					if(typeof err === 'string'){
						this.toast.message(err)
					}else{
						this.toast.message('注册失败')
					}
				})
			},
			getCustomerName(){
				if(emptyValidator(this.formModel.customerCode)){
					this.customerName  = ''
					return;
				}
				request.get(`/cls-api/user/customerName?customerCode=${this.formModel.customerCode}`).then(res =>{
					this.customerName = res
				});
			}
		},
		created() {
			this.enabledRegister = config.enabledRegister
		}
	}
</script>

<style>

</style>
