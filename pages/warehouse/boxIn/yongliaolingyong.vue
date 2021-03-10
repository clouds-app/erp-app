<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" class="titlefrom">
			<block slot="content">纸箱用料领用</block>
		</cu-custom>
		<form class="xunhoutop">
			<view class="cu-form-group border-top">
				<view class="title">领用工单:</view>
				<input v-model="Collect.MateWorkNo" @blur="findGoods" placeholder="请输入领用工单" />
				<button @click="turnOnScanCode('workNo')" type="primary" size="mini">扫描</button>
			</view>
			<productSelect
				:otherHeight='CustomBarHeight' 
				ref="customerDrawer" 
				v-model="Collect.BoxUseBatchOn"
				url="appFindBoxUseBatchOn"
				title="批次号"
				placeholdertext="请选择批次号"
				@closeMain='changeBoxUseBatchOn'
				:Reload='true'
			></productSelect>
			<view class="cu-form-group border-top">
				<view class="title">领用单号:</view>
				<input @blur="getCollectFromData()" v-model="Collect.bi_WorkNo" placeholder="请输入领用单号" />
			</view>
			<!-- 产品控件 -->
			<productSelect 
				ref="peopleDrawer" 
				:otherHeight='CustomBarHeight' 
				v-model="Collect.CustomPeople" 
				url="appFindUser"
				title="领用人"
				placeholdertext="请选择领用人"
				:params="{modelCode:'boxUse_out',fieldDesc:'领用人',pageSize:100,pageNum:0,workType:''}"
			></productSelect>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">批次库存:</view>
						<input :disabled="true" v-model="Collect.bm_StockQty"/>
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title" >领用数量:</view>
						<input :disabled="!(Collect.bm_StockQty>0)" type="number" @input="debounceTime(ckecknumber,$event,800)" v-model="Collect.biQty" placeholder="请输入数量" />
					</view>
				</view>
			</view>
			
			
		</form>
		<!-- 数据列表 -->
		<view style="height: 400rpx;"></view>
			<view  class="grid-warp" v-show="Collecshow">
				<view class="grid-title">
					领用工单信息:
				</view>
				<view class="grid-body">
					<view class="grid-flex padding-10">
						<view style="width: 60%;">
							<text class="hideName">订单号:{{CollectFromData.bc_No}}</text>
						</view>
						<view>
							<text class="hideName">客 户:{{CollectFromData.bc_CustID}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view >
							<text class="hideName" >产品编号:{{CollectFromData.bi_ProdNo}}</text>
						</view>
						<view >
							<text class="hideName" >PO号:{{CollectFromData.bc_CustPO}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view style="width: 100%;">
							<text>产品名称:{{CollectFromData.bi_ProdName}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view style="width: 100%;">
							<text>料号:{{CollectFromData.bi_BatchNo}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view style="width: 100%;">
							<text>产品规格:{{CollectFromData.lineStr}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view  class="grid-warp" v-show="outshow">
				<view class="grid-title">
					出仓纸板信息:
				</view>
				<view class="grid-body">
					<view class="grid-flex padding-10">
						<view style="width: 60%;">
							<text class="hideName">{{outpaper.lineStrOne}}</text>
						</view>
					</view>
				</view>
				<view class="grid-body">
					<view class="grid-flex padding-10">
						<view>
							<text class="hideName">{{outpaper.lineStrTwo}}</text>
						</view>
					</view>
				</view>
			</view>
		<view style="height: 80rpx;"></view>
		<!-- 底部操作框 -->
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button @click="resetFrom"  type="primary" size="mini" class="bg-grey radius">清除</button>
			<button @click="submit"  type="primary" size="mini" class="bg-grey radius">确认</button>
		</view>
	</view>
</template>

<script>
//纸箱出入库
import productSelect from '@/components/selectDropdown/selectDropdown.vue'
import customerSelect from '../paperIn/customers.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import zTable from '@/components/z-table/z-table.vue';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import dateFormat from '@/utils/dateFormat.js';
import warehouse from '@/mixins';

export default {
	name: 'boxIn', //纸箱出入库
	components: { zTable, uniPopup, cuCustom,  customerSelect, productSelect },
	mixins: [warehouse],
	data() {
		return {
			paper:{
				pageOver:false,
				pageSize:50,
				pageNum:1,
			},//分页查询条件
			recordsNum:0,//底部记录数
			outshow:false,
			outpaper:{lineStrOne:'',lineStrTwo:''},//出仓纸板信息
			Collecshow:false,
			CollectFromData:{
				bc_CustID: "",
				bc_CustPO: "",
				bc_No: "",
				bi_BatchNo: "",
				bi_ProdName: "",
				bi_ProdNo: "",
				lineStr: "",
			},//领用工单信息
			Collect:{
				MateWorkNo:'',//领用工单
				bm_StockQty:'',//批次库存
				bi_WorkNo:'',//领用单号
				BoxUseBatchOn:'',//批次号
				biQty:'',//领用数量
				CustomPeople:'',//领用人id
			}
		};
	},
	// #ifdef H5
	mounted() {
		// this.getTableHeight()
	},

	// #endif
	// #ifndef H5
	onReady() {
		// this.getTableHeight()
	},
	// #endif
	methods: {
		// 选择批次号回调
		changeBoxUseBatchOn(data){
			request.post('/warehouse/warehouse/execute/appFindBoxUseStore',{BoxUseBatchOn:data.type}).then(res=>{
				if(!res.list.length){
					this.toast.message('查询库存失败')
					this.Collect.bm_StockQty = 0
				}
				this.Collect.bm_StockQty = res.list[0].bm_StockQty
			}).catch(err=>{
				this.tosat.message(err)
			})
			this.ckecknumber()
		},
		// 领用数量校验
		ckecknumber(){
			if(Number(this.Collect.biQty)>Number(this.Collect.bm_StockQty)){
				this.toast.message('领用数量不能大于库存数')
				this.Collect.biQty = this.Collect.bm_StockQty
			}
		},
		// 出库单号失去焦点
		findGoods(){
			this.toast.loading()
			request.post('/warehouse/warehouse/execute/appFindBoxCOItem',{MateWorkNo:this.Collect.MateWorkNo}).then(res=>{
				if(!res.list.length){
					this.toast.message('暂无数据')
					this.resetFrom()
					return
				}
				this.Collect = Object.assign(this.Collect,res.list[0])
				this.getBoxUseBatchOnList()//获取批次号数据
				this.getoutpaper()//获取出仓纸板信息
				this.getCollectFromData()//获取领用工单信息
				this.changeBoxUseBatchOn()//查询批次库存
			}).catch(err=>{
				this.toast.message(err)
			})
		},
		//获取领用工单信息
		getCollectFromData(){
			this.toast.loading()
			request.post('/warehouse/warehouse/execute/appFindBoxBatchCOI',{WorkNo:this.Collect.bi_WorkNo}).then(res=>{
				if(!res.list.length){
					this.Collecshow = false 
				}else{
					this.CollectFromData = res.list[0]
					this.Collecshow = true
				}
				this.toast.hide()
			}).catch(err=>{
				this.toast.message(err)
			})
		},
		//获取出仓纸板信息
		getoutpaper(){
			this.toast.loading()
			request.post('/warehouse/warehouse/execute/appFindBoxCOMData',{MateWorkNo:this.Collect.MateWorkNo}).then(res=>{
				if(!res.list.length){
					this.Collecshow = false 
				}else{
					this.outpaper = res.list[0]
					this.outshow = true
				}
				this.toast.hide()
			}).catch(err=>{
				this.toast.message(err)
			})
		},
		// 获取批次号数据
		getBoxUseBatchOnList(){
			this.$refs.customerDrawer.$data.formItem.customers = this.Collect.BoxUseBatchOn
			let parms = {
				modelCode:"",  //-- 模块标识，默认传空串值
				MateWorkNo:this.Collect.MateWorkNo, // -- 领料工单，必须
				pageSize:0, // -- 分页页面大小，默认传0
				pageNum:0,  //-- 分页页码，默认传0
			}
			this.$refs.customerDrawer.getdataArray(parms)
		},
		// 提交数据
		submit(){
			if(this.checkSubmitData()){
				return
			}
			let params = {
				biNo:this.Collect.MateWorkNo,        // -- 主表，领料单号，必须
				biOutor:this.Collect.CustomPeople,	//-- 主表，领料人编号，必须
				creater:this.userInfo.erpUserCode,				//-- 主表，建档者代号，必须
				biCoNo:this.Collect.bi_WorkNo,					//	-- 明细表，工单号，必须
				biQty:Number(this.Collect.biQty),					//-- 明细表，领用数，必须且不为0
				boxUseBatchOn:this.Collect.BoxUseBatchOn,			//-- 第三层表，用料批次号，必须
				UserID:this.userInfo.erpUserCode			//-- 用户ID，必须
			}
			this.toast.loading()
			request.post('/warehouse/warehouse/execute/appSaveBoxUseOutInfo',params).then(res=>{
				if(!res.list[0].res){
					this.toast.message("领用失败")
					return
				}
				this.resetFrom()
				this.toast.message("领用成功")
			}).catch(err=>{
				this.toast.message(err)
			})
		},
		// 校验提交表单数据
		checkSubmitData(){
			if(!this.Collect.CustomPeople){
				this.toast.message('请选择领用人')
				return true
			}
			if(!this.Collect.biQty){
				this.toast.message('请输入领用数')
				return true
			}
			return false
		},
		// 清除按钮
		resetFrom(){
			this.Collect.MateWorkNo='',//领用工单
			this.Collect.bm_StockQty='',//批次库存
			this.Collect.bi_WorkNo='',//领用单号
			this.Collect.BoxUseBatchOn='',//批次号
			this.$refs.customerDrawer.clearFromData()//清空批次号数据
			this.Collect.biQty='',//领用数量
			this.Collecshow = false,
			this.outshow=false
		},
		//===打开扫描===
		async turnOnScanCode(type) {
			if(this.checkScan()){
				this.toast.message('请在"e包装"公众号中下载APP后扫码!')
				return
			}
			let scandata = await this.ScanModule(); 
			if(scandata.resp_code==1000){
				this.resetFrom()
				this.Collect.MateWorkNo = scandata.resp_result;
				this.findGoods();
			}else{
				this.toast.message('扫码失败请重试')
			}
		},
	},
};
</script>

<style scoped>
.hideName{
	/* overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis */
	display:block;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis
}
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
.xunhoutop{
	position: fixed;
	width: 100%;
	z-index: 10;
}
.chucangbtm{
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 2;
}
</style>
