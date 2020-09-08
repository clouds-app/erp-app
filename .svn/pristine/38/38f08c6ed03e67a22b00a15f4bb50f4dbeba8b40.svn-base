<template>
	<view>
		<view class="flex border-top">
			<view class="cu-form-group" style="padding-right: 0;">
				<view class="title" style="padding-right: 0;">配纸</view>
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer1"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz1'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
				<!-- @blurs='bulrrs' -->
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer2"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz2'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer3"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz3'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
			</view>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group" style="padding-right: 0;">
				<view class="title" style="padding-right: 0;">ㅤㅤ</view>
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer4"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz4'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer5"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz5'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer6"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz6'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
			</view>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group" style="padding-right: 0;">
				<view class="title" style="padding-right: 0;">ㅤㅤ</view>
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer7"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz7'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer8"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz8'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
			</view>
			<view class="flex-sub">
				<sleect
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer9"
					url="appPaperSPPItemSelectCzln"
					title=""
					placeholdertext="请选择"
					v-model='paperInFormItems.co_Pz9'
					@closeMain='closeMain'
					:Reload='true'
				></sleect>
			</view>
		</view>
	</view>
</template>

<script>
	import sleect from './selectDropdown.vue'
	// import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	import request from '@/utils/request.js';
	import warehouse from '@/mixins';
	export default{
		components:{sleect},
		mixins:[warehouse],
		data() {
			return{
				params:{CustID:'',modelCode:'approval_paperSpecialOffer'},
				paperInFormItems:{
					co_Pz1:'',
					co_Pz2:'',
					co_Pz3:'',
					co_Pz4:'',
					co_Pz5:'',
					co_Pz5:'',
					co_Pz6:'',
					co_Pz7:'',
					co_Pz8:'',
					co_Pz9:'',
				}
			}
		},
		props:{
			disable:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			
		},
		mounted() {
			this.getsleteFromData();
		},
		
		onReady() {
			this.getsleteFromData();
		},
		methods:{
			// 查看详情回调配纸
			detailsWriteback(data){
				for (let i =1 ; i<10 ;i++) {
					let field = 'papeDrawer'+String(i)
					let Fromfield = 'co_Pz'+String(i)
					this.$refs[field].$data.formItem.customers  = data[Fromfield]
				}
			},
			// 清空方法回调
			ClearPaper(){
				for (let i =1 ; i<10 ;i++) {
					let field = 'papeDrawer'+String(i)
					let Fromfield = 'co_Pz'+String(i)
					this.$refs[field].$data.formItem.customers  = ''
					this.$refs[field].$data.formItem.customersId  = ''
					this.paperInFormItems[Fromfield] = ''
				}
			},
			// 获取一次弹框数据
			getsleteFromData(){
				if(this.disable){return}
				this.toast.loading()
				let _self = this
				let selectparms = {CustID:this.userInfo.erpUserCode,modelCode:'approval_paperSpecialOffer'}
				request.post('/warehouse/warehouse/execute/appPaperSPPItemSelectCzln',selectparms).then(res=>{
					_self.$refs.papeDrawer1.outsideDataWriteback(res.list)
					_self.$refs.papeDrawer2.outsideDataWriteback(res.list)
					_self.$refs.papeDrawer3.outsideDataWriteback(res.list)
					_self.$refs.papeDrawer4.outsideDataWriteback(res.list)
					_self.$refs.papeDrawer5.outsideDataWriteback(res.list)
					_self.$refs.papeDrawer6.outsideDataWriteback(res.list)
					_self.$refs.papeDrawer7.outsideDataWriteback(res.list)
					_self.$refs.papeDrawer8.outsideDataWriteback(res.list)
					_self.$refs.papeDrawer9.outsideDataWriteback(res.list)
					this.toast.hide()
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			// 选择纸质回调事件
			ChangePaper(data){
				this.ClearPaper()
				let _self = this
				data.filter(item=>{
					let	refdata = 'papeDrawer'+String(item.ArtCS)
					let Fromfield = 'co_Pz'+String(item.ArtCS)
					_self.paperInFormItems[Fromfield] = item.ArtPZ
					_self.$refs[refdata].$data.formItem.customers = item.ArtPZ
				})
			},
			// 选择配纸回调事件
			closeMain(data){
				let Strpaper = ''
				let paperlayers = ''
				for (let var1 in this.paperInFormItems) {
					if(!!this.paperInFormItems[var1]){
						paperlayers = var1.substr(var1.length-1,1)
					}
					Strpaper += this.paperInFormItems[var1]
				}
				this.$emit('changeMpaper',{Strpaper,paperlayers})
			},
			
		}
	}
</script>

<style>
</style>
