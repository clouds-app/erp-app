<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">纸板价格计算器</block>
				<!-- <block slot="right">
					<view class="rightBtnBox">
						<view @click="clearFromData" class="cu-btn bg-red shadow" style="margin-right: 10px;">
							清除
						</view>
					</view>
				</block> -->
		</cu-custom>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:otherHeight='CustomBarHeight' 
					ref="papeDrawer"
					url="appFindArtSelect"
					title="纸ㅤ质"
					placeholdertext="请选择纸质"
					v-model='formItems.customerArt'
					:params="{modelCode:'paper_price_calculator',pageNum:1,pageSize:100}"
					@closeMain='closeMain'
				></selectDropdown>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:otherHeight='CustomBarHeight' 
					ref="LBDrawer"
					url="appFindLBbyArtSelectNew"
					title="楞ㅤ别"
					placeholdertext="请选择楞别"
					v-model='formItems.artLB'
					@onChange='getpaperCost'
					:params='LBparms'
				></selectDropdown>
			</view>
		</view>
		<matching-paper
			@changeMpaper='changeMpaper'
			ref="matchingPaper"
			:url="'appGetNewPaper'"
			:modelCode="'paper_price_calculator'"
		>	
		</matching-paper>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">原纸成本:</view>
					<input type="number" v-model="formItems.paperCost" disabled/>
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
				<view class="title">加工费:</view>
				<input type="number" v-model="formItems.processCost" disabled/>
			</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
				<view class="title">初始利润率%:</view>
				<input type="number" class="borderBtm" v-model="formItems.InitialProfit"/>
			</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
				<view class="title">加税点%:</view>
				<input type="number" class="borderBtm" v-model="formItems.taxPoint"/>
			</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title masterTitle">建议报价:</view>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">不含税:</view>
					<input type="number" v-model="formItems.nincludedOffer" disabled/>
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">含税:</view>
					<input type="number" v-model="formItems.includedOffer" disabled/>
				</view>
			</view>
		</view>
		<!-- <view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">ㅤㅤㅤㅤㅤ(含税):</view>
					<input type="number" v-model="formItems.includedOffer" disabled/>
				</view>
			</view>
		</view> -->
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title masterTitle">执行价格:</view>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">不含税:</view>
					<input type="number" v-model="formItems.nStrikePrice" class="borderBtm" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">利润率%:</view>
					<input type="number" v-model="formItems.nProfitMargin" disabled/>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">ㅤ含税:</view>
					<input type="number" v-model="formItems.strikePrice" class="borderBtm" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">利润率%:</view>
					<input type="number" v-model="formItems.profitMargin" disabled/>
				</view>
			</view>
		</view>
		<view class="bottomText">
			<view style="color: red;margin-bottom: 120rpx; font-size: 30rpx;">
				说明:原纸成本,取财务管理原纸进价设定中明细执行价
			</view>
			<view  style="display: flex;">
				<button @click="clearFromData" type="primary" class="primary-btn">清ㅤㅤ除</button>
				<button @click="calculation" type="primary" class="primary-btn">开始计算</button>
			</view>
		</view>
	</view>
</template>

<script>
import matchingPaper from '../components/matchingPaper.vue'
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import cuCustom from '@/ui/colorui/components/cu-custom.vue' 
import warehouse from '@/mixins';
import dayjs from 'dayjs'
import request from '@/utils/request.js';
const default_from = {
	customerArt:'',//纸质id
	artLB:'',//楞别ID
	paperCost:0,//原纸成本
	processCost:0,//加工费
	InitialProfit:0,//初始利润率
	taxPoint:0,//税点
	includedOffer:0,//建议报价含税
	nincludedOffer:0,//建议报价不含税
	strikePrice:0,//执行价格(含税)
	profitMargin:0,//利润率
	nStrikePrice:0,//执行价格(不含税)
	nProfitMargin:0,//利润率(不含税)
}
	export default {
		components:{cuCustom,selectDropdown,matchingPaper},
		mixins:[warehouse],
		data() {
			return {
				LBparms:{modelCode:"paper_price_calculator",pageSize:100,pageNum:1,ArtId:''},//楞别过滤字段
				disable:true,
				formItems:Object.assign({},default_from)
			}
		},
		// watch:{
		// 	'formItems.customerArt'(n,o){
		// 		debugger
		// 	}
		// },
		methods: {
			// 清除全部数据
			clearFromData(){
				this.formItems = Object.assign({},default_from)
				this.$refs.papeDrawer.clearFromData()
				this.$refs.LBDrawer.clearFromData()
				this.$refs.matchingPaper.ClearPaper()
			},
			// 重选纸质楞别清空计算
			clearNumber(){
				for (let V in this.formItems) {
					let data = this.formItems[V]
					if(typeof(data)!='string'){
						this.formItems[V] = 0
					}
				}
			},
			calculation(){
				this.toast.loading()
				if(!!!this.formItems.artLB){
					this.toast.message('楞别不能为空')
					return
				}
				// 建议报价(不含税) = (原纸成本+加工费)*初始利润率%
				let paperCost = !!this.formItems.paperCost?Number(this.formItems.paperCost):0//原纸成本
				let processCost = !!this.formItems.processCost?Number(this.formItems.processCost):0//加工费
				let InitialProfit = !!this.formItems.InitialProfit?Number(this.formItems.InitialProfit):0//初始利润率%
				let taxPoint = !!this.formItems.taxPoint?Number(this.formItems.taxPoint):0//税点
				let strikePrice = !!this.formItems.strikePrice?Number(this.formItems.strikePrice):0//执行价格（含税）
				let nStrikePrice = !!this.formItems.nStrikePrice?Number(this.formItems.nStrikePrice):0//执行价格（不含税）
				let nincludedOffer = (paperCost+processCost)*(1+(InitialProfit/100))//不含税
				let includedOffer = (paperCost+processCost)*(1+InitialProfit/100)*(1+taxPoint/100)//含税
				let profitMargin = (strikePrice/(1+taxPoint/100)-(paperCost+processCost))/(paperCost+processCost)*100
				let nProfitMargin = (nStrikePrice-(paperCost+processCost))/(paperCost+processCost)*100
				// 建议报价(不含税) = (原纸成本+加工费)*(1+初始利润率%)*(1+税点%)
				this.formItems.nincludedOffer = !!nincludedOffer?nincludedOffer.toFixed(2):0
				// 建议报价(含税) = (原纸成本+加工费)*(1+初始利润率%)*(1+税点%)
				this.formItems.includedOffer = !!includedOffer?includedOffer.toFixed(2):0
				// 利润率(含税) = [执行价格/(1+税点%)-(原纸成本+加工费)]/(原纸成本+加工费)*100
				this.formItems.profitMargin = !!profitMargin?profitMargin.toFixed(2):0
				// 利润率(不含税) = [执行价格-(原纸成本+加工费)]/(原纸成本+加工费)*100
				this.formItems.nProfitMargin = !!nProfitMargin?nProfitMargin.toFixed(2):0
				this.toast.hide()
			},
			//选择纸质回调事件
			closeMain(data){
				// this.LBparms.ArtCS = ''
				// this.LBparms.ArtId = data.customers
				// this.getLBDrawerData()
				this.getmatchingPaper(data.ct_Desc)
				this.clearNumber()
				this.getpaperCost()
				this.$refs.LBDrawer.modalclicl(0)
			},
			// 选择纸质查询配纸
			getmatchingPaper(data){
				this.toast.loading()
				let _self = this
				request.post('/warehouse/warehouse/execute/appGetArtPzByArtId',{ArtId:data}).then(res=>{
					_self.$refs.matchingPaper.ChangePaper(res.list)
					_self.toast.hide()
				}).catch(err=>{
					_self.toast.message(err)
				})
			},
			// 配纸改变回调方法
			changeMpaper(Obj){
				this.$refs.papeDrawer.$data.formItem.customers = Obj.Strpaper//回填纸质
				this.formItems.customerArt = Obj.Strpaper
				this.getpaperCost()
				// this.LBparms.ArtCS = Obj.paperlayers//层数
				// this.LBparms.ArtId = Obj.Strpaper
				// this.getLBDrawerData()
			},
			// 多次查询楞别数据前清空上次数据
			// getLBDrawerData(){
			// 	this.formItems.artLB = ''
			// 	this.$refs.LBDrawer.clearFromData()
			// 	this.$refs.LBDrawer.getdataArray()
			// 	this.clearNumber()
			// },
			// 获取原纸成本，加工费
			getpaperCost(data){
				this.toast.loading()
				let patams = {
					UserID:this.userInfo.erpUserCode,
					ArtId:this.formItems.customerArt,
					ArtLB:!!data?data.customersId:this.formItems.artLB	
				}
				request.post('/warehouse/warehouse/execute/appGetPriceByArtIdAndLB',patams).then(res=>{
					this.formItems.paperCost = res.list[0].Cost
					this.formItems.processCost = res.list[0].WorkPrice
					this.toast.hide()
				}).catch(err=>{
					this.toast.message(err)
				})
			},
		}
	}
</script>

<style>
.borderBtm{
		border-bottom:1px solid #8799A3;
}
.bottomText{
	text-align: center;
	/* margin-top: 60rpx; */
}
.clearmaring{
	padding: 0 !important;
}
.masterTitle{
	color: #ffaa00;
	font-weight: bold;
}
</style>
