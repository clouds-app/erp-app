<template>
	<view>
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
					<block slot="content">报价/对账查询</block>+
					<block slot="right">
						<button :disabled="isLoaddingData"  class="cu-btn bg-blue shadow"  @click="removeFrom">清空</button>
					</block>
			</cu-custom>
			
			<view class="flex border-top xunhoutop">
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="typeDrawer"
						url="appGetFaxFormSelect"
						title="类型"
						placeholdertext="请选择类型"
						v-model='parms.Form'
						@closeMain='removeFromData'
						:params="{UserCode:userInfo.erpUserCode,modelCode:'fax_form_list',pageSize:100,pageNum:1}"
					></selectDropdown>
				</view>
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="customerDrawer"
						url="appGetCustomerList"
						title="客户"
						placeholdertext="请选择客户"
						@closeMain='removeFromData'
						v-model='parms.CustID'
						:params="{UserCode:userInfo.erpUserCode,modelCode:'fax_form_list',pageSize:100,pageNum:1}"
					></selectDropdown>
				</view>
			</view>
			
			<view style="height: 70rpx;"></view>
			
			<view class="grid-warp" @click="geturls(index)" v-for="(item,index) in formData" :key="item.ID1">
					<view class="grid-title">
						{{item.fax_NO}}
						<view style="color: blue;"> 查看</view>
					</view>
				<view class="grid-body">
					<view class="grid-flex padding-10">
						<view>
							<text>单号:{{ item.fax_NO }}</text>
						</view>
						<view>
							<text>日期:{{ item.fax_Date }}</text>
						</view>
					</view>
					
					<view class="grid-flex padding-10">
						<view>
							<text>客户:{{item.fax_CustID+'-'+item.ct_Desc}}</text>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js';
	import cuCustom from '../../ui/colorui/components/cu-custom.vue' ;
	import baseMixin from '@/mixins';
	const default_parms = {Form:'',CustID:'',pageSize:20,pageNum:1}
	export default {
		name:'loadingList',//装车单
		components:{
			cuCustom
		},
		mixins: [baseMixin],
		data() {
			return {
				formData:[],
				parms:JSON.parse(JSON.stringify(default_parms)),
				checkPage:true,
			};
		},
		created() {
			this.getFormData()
		},
		onReachBottom() {
			if(this.checkPage){
				this.parms.pageNum++
				this.getFormData()
			}
		},
		methods:{
			// 清空数据
			removeFrom(){
				this.$refs.typeDrawer.$data.formItem.customers = ''
				this.$refs.typeDrawer.$data.formItem.customersId = ''
				this.$refs.customerDrawer.$data.formItem.customers = ''
				this.$refs.customerDrawer.$data.formItem.customersId = ''
				this.parms = JSON.parse(JSON.stringify(default_parms))
				this.checkPage = true
				this.formData = []
			},
			// 弹框改变回调
			removeFromData(){
				this.parms = {
					...this.parms,
					pageSize:20,
					pageNum:1
				}
				this.formData = []
				this.checkPage=true,
				this.getFormData()
			},
			// 获取列表信息
			getFormData(e){
				if(!this.checkPage)return
				this.toast.loading()
				let parms = {
					UserID:this.userInfo.erpUserCode,
					...this.parms
				}
				request.post('/warehouse/warehouse/execute/appGetFaxListPush',parms).then(res=>{
					if(res.list.length < this.parms.pageSize){
						this.checkPage = false
					}
					this.formData = [...res.list,...this.formData]
					this.toast.hide()
				}).catch(err=>{
					this.toast.message('加载失败!')
				})
			},
			// 获取显示图片url
			geturls(e){
				let {ID1}= this.formData[e]
				request.post('/warehouse/warehouse/execute/appGetFaxListPushByID',{ID1}).then(res=>{
					let [{fax_JPGImage}] = res.list
					console.log(fax_JPGImage)
					this.toDetails(e,fax_JPGImage)
				}).catch(err=>{
					this.toast.message('图片加载失败！')
				})
			},
			// 查看图片详情
			async toDetails(e,imgUrl){
				let _self = this
				uni.previewImage({   
					urls: [  
						`data:image/png;base64,${imgUrl}`
					],  
					// urls: [  
					// ], 
				    current: 0, 
					indicator:"default",
					success:function(res){
						console.log(res)
						_self.chengeState(e)
					},
					fail:function(err){
						this.toast.message('图片加载失败！')
					}
				})
				// uni.navigateTo({
				//     url: 'details'
				// });
			},
			// 图片查询成功修改状态
			chengeState(index){
				let {ID1,fstatus} = this.formData[index]
				if(!!!fstatus){
					this.toast.hide()
					request.post('/warehouse/warehouse/execute/appUpdateFaxListStatus',{ID1}).then(res=>{
						this.toast.hide()
					})
				}
			},
		}
	}
</script>

<style scoped>
.topview{
	position: fixed;
	top: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 2;
}
.xunhoutop{
	position: fixed;
	width: 100%;
	z-index: 10;
}
</style>
