<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">纸板预下单</block>
		</cu-custom>
		
		<view class="topinput">
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group border-top">
						<view class="title">信用额:</view>
						<input v-model="paperInFormItems.creditLines" name="input" disabled/>
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group border-top">
						<view class="title">客户名称:</view>
						<input v-model="userInfo.erpUserName" name="input" disabled/>
					</view>
				</view>
			</view>
			<view class="cu-form-group border-top">
				<view class="title">客户PO:</view>
				<input v-model="paperInFormItems.customerPo"  placeholder="请输入客户PO号" name="input" />
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer"
					url="order/customerPaperArt"
					title="纸ㅤ质"
					placeholdertext="请选择纸质"
					v-model='paperInFormItems.customerArt'
					@onChange='closeMain'
				></selectDropdown>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:otherHeight='CustomBarHeight' 
					ref="LBDrawer"
					url="order/paperArtLB"
					title="楞ㅤ别"
					placeholdertext="请选择楞别"
					v-model='paperInFormItems.artLB'
					:Reload='true'
				></selectDropdown>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">纸ㅤ长:</view>
					<input type="number" v-model="paperInFormItems.paperLength" placeholder="请输入纸长" @blur="getyxStr"/>
					{{paperInFormItems.lengthUnit}}
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">纸ㅤ宽:</view>
					<input type="number" v-model="paperInFormItems.paperWidth" placeholder="请输入纸宽" @blur="getyxStr"/>
					{{paperInFormItems.widthUnit}}
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">箱ㅤ高:</view>
					<input type="number" v-model="paperInFormItems.boxHeight" placeholder="请输入箱高" @blur="getyxStr"/>
					{{paperInFormItems.heightUnit}}
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">数量(片):</view>
					<input type="number" v-model="paperInFormItems.qty" placeholder="请输入数量"/>
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">净料:</view>
						<view style="margin-right: 25%"><switch class='red' @change="paperInFormItems.ssize = !paperInFormItems.ssize" 
							:class="paperInFormItems.ssize?'checked':''" 
							:checked="paperInFormItems.ssize?true:false" color="#e54d42"
							></switch>
						</view>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">压ㅤㅤ线:</view>
					<input v-model="paperInFormItems.yxStr" placeholder="请输入压线,格式0+0+0"/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:otherHeight='CustomBarHeight' 
					ref="lineDrawer"
					url="order/lineType"
					title="压线类型"
					placeholdertext="请选择压线类型"
					v-model='paperInFormItems.lineType'
				></selectDropdown>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">交货日期:</view>
					<picker mode="date" :value="paperInFormItems.dueDate" :start="startData" @change="endDateChange" >
							{{paperInFormItems.dueDate}}
					</picker>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">生产备注:</view>
					<input v-model="paperInFormItems.produceRemark" placeholder="请输入生产备注"/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">送货备注:</view>
					<input v-model="paperInFormItems.remark" placeholder="请输入送货备注"/>
				</view>
			</view>
		</view>
		<view style=" height: 120rpx;"></view>
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button @click="resetFrom"  type="primary" size="mini" class="bg-grey radius">清除</button>
			<button :disabled="(Number(paperInFormItems.creditLines)<=0)" @click="submitData"  type="primary" size="mini" class="bg-grey radius">下单</button>
		</view>
	</view>
</template>

<script>
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import cuCustom from '../../ui/colorui/components/cu-custom.vue' 
import warehouse from '@/mixins';
import dayjs from 'dayjs'
import request from '@/utils/request.js';
	export default {
	components:{cuCustom,selectDropdown},
	mixins:[warehouse],
		data() {
			return {
				disable:false,
				startData:'',
				typename:'',//判断是新增还是修改
				paperInFormItems:{
					artLB:'',//楞别
					customerPo:'',//官方PO
					creditLines:'',//信用额
					lineType:'',//压线类型
					customerArt:'',//纸质
					paperWidth:'',//纸宽
					paperLength:'',//纸长
					boxHeight:'',//箱高
					qty:'',//数量
					produceRemark:'',//生产备注
					yxStr:'',//压线
					remark:'',//送货备注
					userinformation:'',
					dueDate:dayjs().format('YYYY-MM-DD'),//交货日期
					heightUnit:"",// --箱高单位
					widthUnit: "", //--纸宽单位
					lengthUnit: "",// --纸长单位
					ssize:false,//是否净料
				}
			}
		},
		onReady(){
			this.getcreditLines()
			this.getCustomerUnit()
			this.setDropdowndata()
			this.getinitData()
		},
		onLoad(id) {
			if(!id.id){
				return
			}
			this.typename = id.type
			let data = this.cache.get(id.id)
			this.paperInFormItems = data
		},	
		methods: {
			//获取计算单位
			getCustomerUnit(){
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appGetCustomerUnit',{CustID:this.userInfo.erpUserCode}).then(res=>{
					this.paperInFormItems.heightUnit = res.list[0].heightUnit
					this.paperInFormItems.lengthUnit = res.list[0].lengthUnit
					this.paperInFormItems.widthUnit = res.list[0].widthUnit
					this.paperInFormItems.ssize = !!res.list[0].ssize
					this.toast.hide()
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			// 跳转页面数据回填
			setDropdowndata(){
				if(this.paperInFormItems.artLB === ''){
					return
				}
				this.$refs.LBDrawer.$data.formItem.customers = this.paperInFormItems.artLB
				this.$refs.papeDrawer.$data.formItem.customers = this.paperInFormItems.customerArt
				this.$refs.lineDrawer.$data.formItem.customers = this.paperInFormItems.lineType
			},
			// 获取交货日期初始值
			getinitData(){
				this.toast.loading()
				let _self = this
				request.post('/order/initData').then(res=>{
					this.paperInFormItems.dueDate = res.deferMinDate
					this.startData = res.deferMinDate
					this.toast.hide()
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			// 获取压线类型
			getyxStr(){
				if(this.paperInFormItems.paperWidth===''||this.paperInFormItems.paperLength===''||this.paperInFormItems.boxHeight===''){
					return
				}
				this.toast.loading()
				let paperWidth=this.paperInFormItems.paperWidth
				let paperLength=this.paperInFormItems.paperLength
				let boxHeight=this.paperInFormItems.boxHeight
				request.post(`/order/calcLineValue?paperWidth=${paperWidth}&paperLength=${paperLength}&boxHeight=${boxHeight}`).then(res=>{
					this.toast.hide()
					this.paperInFormItems.yxStr = res
				}).catch(err=>{
					this.toast.hide()
					this.toast.message(err)
				})
			},
			//选择纸质回调事件
			closeMain(data){
				let parms = {
					paperArt:data.customers
				}
			   this.$refs.LBDrawer.getdataArray(parms)
			},
			// 获取信用额
			getcreditLines(){
				this.toast.loading()
				let _self = this
				request.get('/user/creditLines').then(res=>{
					this.paperInFormItems.creditLines = res
					if(Number(res)<=0){
						setTimeout(()=>{
							this.toast.message('信用额不足,不能下单')
						},1000)
						return
					}
					this.toast.hide()
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			// 清空表单数据
			resetFrom(){
				this.paperInFormItems.customerPo = ''//官方PO
				this.paperInFormItems.lineType = ''//压线类型
				this.paperInFormItems.customerArt = ''//纸质
				this.$refs.LBDrawer.$data.formItem.customers = ''
				this.$refs.papeDrawer.$data.formItem.customers = ''
				this.$refs.lineDrawer.$data.formItem.customers = ''
				this.$refs.LBDrawer.$data.formItem.customersId = ''
				this.$refs.papeDrawer.$data.formItem.customersId = ''
				this.$refs.lineDrawer.$data.formItem.customersId = ''
				this.paperInFormItems.paperWidth = ''//纸宽
				this.paperInFormItems.artLB = ''//楞别
				this.paperInFormItems.paperLength = ''//纸长
				this.paperInFormItems.boxHeight = ''//箱高
				this.paperInFormItems.qty = ''//数量
				this.paperInFormItems.produceRemark = ''//生产备注
				this.paperInFormItems.yxStr = ''//压线
				this.paperInFormItems.remark = ''//送货备注
				this.paperInFormItems.userinformation = ''//生产备注
				this.typename = ''//修改新增
			},
			// 提交数据
			submitData(){
				let url;
				let vluedata = this.checkValuedata()
				if(vluedata){
					return
				}
				if(this.typename == 1){
					url = '/order/update'
				}else{
					url = '/order/savePaperOrder'
				}
				this.toast.loading()
				request.post(url,this.paperInFormItems).then(res=>{
					this.toast.hide()
					this.toast.message('下单成功')
					this.resetFrom()
				}).catch(err=>{
					this.toast.hide()
					this.toast.message(err)
				})
			},
			// 表单数据校验
			checkValuedata(){
				if(this.paperInFormItems.customerArt === ''){
					this.toast.message('请选择纸质')
					return true
				}
				if(this.paperInFormItems.artLB === ''){
					this.toast.message('请选择楞别')
					return true
				}
				if(this.paperInFormItems.paperLength === ''){
					this.toast.message('请选择纸长')
					return true
				}
				if(this.paperInFormItems.paperWidth === ''){
					this.toast.message('请选择纸宽')
					return true
				}
				if(this.paperInFormItems.qty === ''){
					this.toast.message('请选择数量')
					return true
				}
				if(this.paperInFormItems.lineType === ''){
					this.toast.message('请选择压线类型')
					return true
				}
				if(this.paperInFormItems.yxStr.includes('+')){
					if(this.paperInFormItems.lineType=="0:无"){
						this.toast.message('压线类型错误，请重新选择')
						return true
					}
				}
				return false
			},
			// 结束时间选择 回调
			endDateChange(e) {
				this.paperInFormItems.dueDate = e.detail.value
			},
		}
	}
</script>

<style>
.chucangbtm{
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 2;
}
</style>
