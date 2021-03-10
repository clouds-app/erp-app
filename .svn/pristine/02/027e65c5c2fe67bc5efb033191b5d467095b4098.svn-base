<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true"><block slot="content">临时信用额授权</block></cu-custom>
		<view class="flex border-top" style="background-color: #FFFFFF;">
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="lineDrawer"
						url="appGetCustomerList"
						title="客ㅤ户"
						placeholdertext="ㅤ请选择客户"
						v-model='paperInFormItems.CustID'
						:params='{modelCode:"temporary_credit_auth",UserCode:this.userInfo.erpUserCode,pageSize:100,pageNum:1}'
						@closeMain="getcustFromData"
					></selectDropdown>
				</view>
			<view  v-show="showIsStop" style="width: 200rpx;">
				<view class="cu-form-group" style="color: red;" >
					<input  disabled>{{CustFromData.ct_IsStop===1?'已停单':'未停单'}}<input/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">信用额类型:</view>
					<input  v-model="CustFromData.ct_CrieditType" disabled/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">最大信用额:</view>
					<input  v-model="CustFromData.ct_MaxAmount" disabled/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">可用信用额:</view>
					<input  v-model="CustFromData.ct_RemainCredit" disabled/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title" style="color: red;">新临时额度:</view>
					<input  v-model="paperInFormItems.TemAmount" type="number"/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title" style="color: red;">新截至日期:</view>
					<picker mode="date" :value="paperInFormItems.EndDate"  @change="startDateChange">
						<view class="picker">
							{{paperInFormItems.EndDate}}
						</view>
					</picker>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button @click="resetFrom"  type="primary" size="mini" class="bg-grey radius">清除</button>
			<button  @click="submitData"  type="primary" size="mini" class="bg-grey radius">保存</button>
		</view>
	</view>
</template>

<script>
import dayjs from 'dayjs'
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import zTable from '@/components/z-table/z-table.vue';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import warehouse from '@/mixins';
import searchForm from '@/components/searchForm/searchDataList.vue.vue'
export default {
	name: 'paperIn',
	components: { zTable, cuCustom, searchForm, selectDropdown },
	mixins: [warehouse],
	data() {
		return {
			showIsStop:false,
			paperInFormItems:{
				CustID:'',//客户
				TemAmount:0,//临时额度
				EndDate:dayjs().format('YYYY-MM-DD'),//截至日期
			},
			CustFromData:{},
		};
	},
	mounted() {
		// this.getlineList()//线别列表
	},

	onReady() {
		// this.getlineList()//线别列表
	},
	methods: {
		// 获取客户信息
		getcustFromData(){
			this.toast.loading()
			request.post('/warehouse/warehouse/execute/appGetCheckCustomer',
			{CustID:this.paperInFormItems.CustID}).then(res=>{
				if(!res.list.length){
					this.toast.message('查询失败，请重试')
					return
				}
					this.showIsStop = true
					this.CustFromData = res.list[0]
					this.toast.hide()
			}).catch(err=>{
				this.toast.message(err)
			})
		},
		// 日期选中回调
		startDateChange(e){
			this.paperInFormItems.EndDate = e.detail.value
		},
		// 清除
		resetFrom(){
			this.CustFromData = {},
			this.paperInFormItems.CustID = '',
			this.paperInFormItems.TemAmount = 0,
			this.paperInFormItems.EndDate=dayjs().format('YYYY-MM-DD'),
			this.$refs.lineDrawer.$data.formItem.customers = '',
			this.$refs.lineDrawer.$data.formItem.customersId = '',
			this.showIsStop = false
		},
		// 保存
		submitData(){
			if(this.checkVal()){
				this.toast.loading()
				let params = {...this.paperInFormItems,
				CrieditType:this.CustFromData.CrieditType,
				CInitAmount:this.CustFromData.CInitAmount,
				ct_MaxAmount:this.CustFromData.ct_MaxAmount,
				UserID:this.userInfo.erpUserCode}
				request.post('/warehouse/warehouse/execute/appUpdateTemporaryCredit',params)
				.then(res=>{
					this.resetFrom()
					if(!res.list[0].res){
						this.toast.message("授权失败")
						return
					}
					this.toast.message("授权成功")
				}).catch(err=>{
					this.toast.message(err)
				})
			}
		},
		// 提交数据校验
		checkVal(){
			if(!this.paperInFormItems.CustID){
				this.toast.message("请选择客户")
				return false
			}
			if(!this.paperInFormItems.TemAmount){
				this.toast.message("请输入临时额度")
				return false
			}
			return true
		},
	}
};
</script>

<style>
.margin-text-center {
	text-align: center;
	margin: 20rpx;
}
.border-top {
	border-top: 1px solid #eee;
}
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
.chucangbtm{
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 2;
}
</style>
