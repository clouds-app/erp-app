<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">纸板预下单</block>
		</cu-custom>
		
		<view class="topinput">
			<view class="cu-form-group border-top">
				<view class="title">信用额:</view>
				<input v-model="paperInFormItems.creditLines" name="input" disabled/>
			</view>
			<view class="cu-form-group border-top">
				<view class="title">客户名称:</view>
				<input v-model="userInfo.erpUserName" name="input" disabled/>
			</view>
			<view class="flex border-top">
				<view class="cu-form-group border-top">
					<view class="title">客户PO:</view>
					<input v-model="paperInFormItems.customerPo"  placeholder="请输入订单号" name="input" :disabled="disable"/>
				</view>
				<view class="cu-form-group border-top">
					<view class="title">报价审核:</view>
					<input v-model="paperInFormItems.resDesc" name="input" :disabled="disable"/>
				</view>
			</view>
		</view>
		<matching-paper
			@changeMpaper='changeMpaper'
			ref="matchingPaper"
			:disable='disable'
		>	
		</matching-paper>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer"
					url="appFindArtSelectCzln"
					title="纸ㅤ质"
					placeholdertext="请选择纸质"
					v-model='paperInFormItems.customerArt'
					:params="{modelCode:'approval_paperSpecialOffer',pageNum:1,pageSize:100}"
					@onChange='closeMain'
					:Reload='disable'
				></selectDropdown>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="LBDrawer"
					url="appFindArtLBSelectCzln"
					title="楞ㅤ别"
					placeholdertext="请选择楞别"
					v-model='paperInFormItems.artLB'
					:Reload='true'
					:params='LBparms'
				></selectDropdown>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">纸ㅤ长:</view>
					<input type="number" v-model="paperInFormItems.paperLength" placeholder="请输入纸长" @blur="getyxStr" :disabled="disable"/>
					{{paperInFormItems.lengthUnit}}
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">纸ㅤ宽:</view>
					<input type="number" v-model="paperInFormItems.paperWidth" placeholder="请输入纸宽" @blur="getyxStr" :disabled="disable"/>
					{{paperInFormItems.widthUnit}}
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">数ㅤ量:</view>
					<input type="number" v-model="paperInFormItems.qty" placeholder="请输入数量" :disabled="disable"/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">箱ㅤ高:</view>
					<input type="number" v-model="paperInFormItems.boxHeight" placeholder="请输入箱高" @blur="getyxStr" :disabled="disable"/>
					{{paperInFormItems.heightUnit}}
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">压ㅤㅤ线:</view>
					<input v-model="paperInFormItems.yxStr" placeholder="请输入压线,格式0+0+0" :disabled="disable"/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:disabled="disable"
					:otherHeight='CustomBarHeight' 
					ref="lineDrawer"
					url="order/lineType"
					title="压线类型"
					placeholdertext="请选择压线类型"
					v-model='paperInFormItems.lineType'
					:Reload='disable'
				></selectDropdown>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">交货日期:</view>
					<picker mode="date" :value="paperInFormItems.dueDate" :start="startData" @change="endDateChange" :disabled="disable">
							{{paperInFormItems.dueDate}}
					</picker>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">生产备注:</view>
					<input v-model="paperInFormItems.produceRemark" placeholder="请输入生产备注" :disabled="disable"/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">送货备注:</view>
					<input v-model="paperInFormItems.remark" placeholder="请输入送货备注" :disabled="disable"/>
				</view>
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button @click="resetFrom"  type="primary" size="mini" class="bg-grey radius" :disabled="disable">清除</button>
			<button  @click="submitData"  type="primary" size="mini" class="bg-grey radius" :disabled='disable||(Number(paperInFormItems.creditLines)<=0)'>下单</button>
		</view>
	</view>
</template>

<script>
import matchingPaper from './components/matchingPaper.vue'
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import cuCustom from '../../ui/colorui/components/cu-custom.vue' 
import warehouse from '@/mixins';
import dayjs from 'dayjs'
import request from '@/utils/request.js';
	export default {
	name:'纸板下单崇州岭南',
	components:{cuCustom,selectDropdown,matchingPaper},
	mixins:[warehouse],
		data() {
			return {
				LBparms:{modelCode:"approval_paperSpecialOffer",pageSize:100,pageNum:1,ArtCS:'',ArtId:''},//楞别过滤字段
				disable:false,//详情字段禁用
				ID1:'',
				startData:'',
				typename:'',//判断是新增还是修改
				widthUnit:'',//纸宽单位
				lengthUnitm:'',//纸长单位
				heightUnitm:'',//箱高单位
				paperInFormItems:{
					resDesc:'',
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
					co_Pz1:'',//配纸
					co_Pz2:'',
					co_Pz3:'',
					co_Pz4:'',
					co_Pz5:'',
					co_Pz6:'',
					co_Pz7:'',
					co_Pz8:'',
					co_Pz9:'',
				}
			}
		},
		onReady(){
			this.getcreditLines()// 获取信用额
			this.setDropdowndata()
			this.getexamine()// 审核状态查询
			this.getinitData()
		},
		onLoad(id) {
			if(!id.id){
				return
			}
			this.typename = id.type
			let data = this.cache.get(id.id)
			this.paperInFormItems = data
			this.disable = true
		},	
		methods: {
			//选择纸质回调事件
			closeMain(data){
				this.LBparms.ArtCS = ''
				this.LBparms.ArtId = data.customers
				this.getLBDrawerData()
				this.getmatchingPaper(data.customersId)
			},
			// 配纸改变回调方法
			changeMpaper(Obj){
				this.$refs.papeDrawer.$data.formItem.customers = Obj.Strpaper//回填纸质
				this.paperInFormItems.customerArt = Obj.Strpaper
				this.LBparms.ArtCS = Obj.paperlayers//层数
				this.LBparms.ArtId = ''
				this.getLBDrawerData()
			},
			// 选择纸质查询配纸
			getmatchingPaper(data){
				this.toast.loading()
				let _self = this
				request.post('/warehouse/warehouse/execute/appGetArtPzByArtIdCzln',{ArtId:data}).then(res=>{
					_self.$refs.matchingPaper.ChangePaper(res.list)
					_self.toast.hide()
				}).catch(err=>{
					_self.toast.message(err)
				})
			},
			// 多次查询楞别数据前清空上次数据
			getLBDrawerData(){
				this.paperInFormItems.artLB = ''
				this.$refs.LBDrawer.clearFromData()
				this.$refs.LBDrawer.getdataArray()
			},
			// 审核状态查询
			getexamine(){
				let _self = this
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appGetLastPaperSPPAuditCzln',{UserID:this.userInfo.erpUserCode}).then(res=>{
					if(!!res.list[0].res){
						_self.paperInFormItems.resDesc = res.list[0].resDesc
						_self.ID1 = res.list[0].ID1
						_self.paperInFormItems.heightUnit = res.list[0].heightUnit
						_self.paperInFormItems.lengthUnit = res.list[0].lengthUnit
						_self.paperInFormItems.widthUnit = res.list[0].widthUnit
						_self.toast.hide()
						return
					}
					this.toast.message('审核状态加载失败')
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			// 配纸校验
			checkPaper(e){
				if(!e.detail.value){
					return
				}
				let parms = {
					  ID1:this.ID1,// -- 客户的原纸报价ID1
					  coPz:e.detail.value // -- 所填写的配纸
				}
				let _self = this
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appCheckPaperSPPItemCzln',parms).then(res=>{
					if(!res.list[0].res){
						_self.toast.message('配纸输入错误')
						return
					}
					_self.toast.hide()
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
				this.$refs.matchingPaper.detailsWriteback(this.paperInFormItems)
				
			},
			// 获取初始化数据 交货日期
			getinitData(){
				this.toast.loading()
				let _self = this
				request.post('/order/initData').then(res=>{
					this.paperInFormItems.dueDate = res.deferMinDate
					this.startData = res.deferMinDate
					this.toast.hide()
				}).catch(err=>{
					this.toast.hide()
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
			// 获取信用额
			getcreditLines(){
				this.toast.loading()
				request.get('/user/creditLines').then(res=>{
					this.paperInFormItems.creditLines = res
					if(Number(this.paperInFormItems.creditLines)<=0){
						setTimeout(()=>{
							this.toast.message('信用额不足,不能下单')
						},1000)
						return
					}
					this.toast.hide()
				}).catch(err=>{
					this.toast.hide()
					this.toast.message(err)
				})
			},
			// 清空表单数据
			resetFrom(){
				this.paperInFormItems.customerPo = ''//官方PO
				this.paperInFormItems.lineType = ''//压线类型
				this.paperInFormItems.customerArt = ''//纸质
				this.$refs.papeDrawer.$data.formItem.customers = ''
				this.$refs.lineDrawer.$data.formItem.customers = ''
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
				this.$refs.matchingPaper.ClearPaper()//配纸
				this.$refs.LBDrawer.clearFromData()//楞别
			},
			// 提交数据
			submitData(){
				let url;
				if(this.checkValuedata()){
					return
				}
				if(this.typename == 1){
					url = '/order/update'
				}else{
					url = '/warehouse/warehouse/execute/appSavePhoneBillCzln'
				}
				this.toast.loading()
				request.post(url,this.getparms()).then(res=>{
					if(!res.list[0].res){
						this.toast.message(res.list[0].resDesc)
					}else{
						this.toast.message('下单成功')
					}
					this.resetFrom()
				}).catch(err=>{
					this.toast.hide()
					this.toast.message(err)
				})
			},
			// 获取表单提交数据
			getparms(){
				let parms = {
					UserID:this.userInfo.erpUserCode,
					customerPo:this.paperInFormItems.customerPo,
					customerArt:this.paperInFormItems.customerArt,
					artLB:this.paperInFormItems.artLB,
					paperWidth:this.paperInFormItems.paperWidth,
					paperLength:this.paperInFormItems.paperLength,
					qty:this.paperInFormItems.qty,
					boxHeight:this.paperInFormItems.boxHeight,
					yxStr:this.paperInFormItems.yxStr,
					dueDate:this.paperInFormItems.dueDate,
					remark:this.paperInFormItems.remark,
					widthUnit:this.paperInFormItems.widthUnit,
					lengthUnit:this.paperInFormItems.lengthUnit,
					lineType:this.paperInFormItems.lineType,
					produceRemark:this.paperInFormItems.produceRemark,
					heightUnit:this.paperInFormItems.heightUnit,
					waterRepellant:this.paperInFormItems.waterRepellant,
					co_Pz1:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz1,
					co_Pz2:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz2,
					co_Pz3:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz3,
					co_Pz4:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz4,
					co_Pz5:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz5,
					co_Pz6:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz6,
					co_Pz7:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz7,
					co_Pz8:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz8,
					co_Pz9:this.$refs.matchingPaper.$data.paperInFormItems.co_Pz9,
				}
				return parms
			},
			// 表单数据校验
			checkValuedata(){
				if(this.paperInFormItems.artLB === ''){
					this.toast.message('请选择楞别')
					return true
				}
				if(this.paperInFormItems.paperLength === ''){
					this.toast.message('请输入纸长')
					return true
				}
				if(this.paperInFormItems.paperWidth === ''){
					this.toast.message('请输入纸宽')
					return true
				}
				if(this.paperInFormItems.qty === ''){
					this.toast.message('请输入数量')
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
.placeanOrder{
	border: 1px solid #DDDDDD; 
	height: 50rpx;
}
.chucangbtm{
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 2;
	height: 115rpx;
}
</style>
