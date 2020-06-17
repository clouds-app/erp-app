<template>
	<view>
		<view>
			<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">账户切换</block></cu-custom>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item" v-for="(item,index) in accountList" :key="index" @tap="switchAccount(item.id)">
				<view class="content">
					<text class="cuIcon-circlefill text-blue"></text>
					<text class="text-blue">{{item.name}}</text>
				</view>
			</view>
			
			<view class="cu-item" @click="openAddAccount">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">添加账户</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/ui/colorui/components/cu-custom.vue';
	import request from '../../utils/request.js';
	export default {
		components:{ cuCustom },
		data() {
			return {
				accountList: [],
				loginParam: {
					customerCode:'',
					phoneNo:'',
					password:'',
					customerName:''
				}
			}
		},
		methods: {
			getUserAccountList(){
				request.get('/user/relation/list').then(res=>{
					this.accountList = res;
				})
			},
			openAddAccount(){
				this.router.navigate('/pages/uCenter/addAccount')
			},
			// 切换账户
			switchAccount(id,code){
				const _self = this;
				uni.showModal({
				    title: '提示',
				    content: '确定要切换账户吗?',
				    success: function (res) {
				        if (res.confirm) {
				         request.get(`/user/relation/switch/${id}`).then(res=>{
							_self.toast.message('账户切换成功')
							_self.cache.clear();
							_self.cache.put(_self.appConst.CLIENT_TOKEN_NAME,res.token)
							_self.cache.put(_self.appConst.CLIENT_USER_CACHE_NAME,res.user)
							_self.cache.put(_self.appConst.CLIENT_CUSTOMER_CODE,code)
							_self.router.reLaunch('/pages/index/index')
							uni.$emit('account-switch-success')
				         })
				        }
				    }
				});
			}
		},
		created() {
			this.getUserAccountList();
		},
		onLoad(){
			uni.$on('account-relation-success',()=>{
				this.getUserAccountList();
			})
		}
	}
</script>

<style>

</style>
