<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">纸板送货明细</block>
				<block slot="right">
					<button  type="primary"  @click="condition=!condition"  size="mini">筛选</button>
				</block>
		</cu-custom>
		<view class="bodyContentHeight" v-show="condition">
			<view class="flex border-top">
				
				<view class="flex-sub">
					<view class="cu-form-group">
						<button :disabled="isLoaddingData" :style="{color: formItem.type=='week'?'red':''}" class="cu-btn  line-blue" @click="searchDataBy('week')" >本周</button>
						<button :disabled="isLoaddingData" :style="{color: formItem.type=='month'?'red':''}" class="cu-btn  line-blue" @click="searchDataBy('month')" >本月</button>
						<button :disabled="isLoaddingData" @click="restfrom()"  class="cu-btn  line-blue" size="mini">清空</button>
						<button class="cu-btn bg-blue"  @click="searchDataBy('date')">查询</button>
				  </view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="salerDrawer"
						url="appSalesmenList"
						title="业务员"
						placeholdertext="请选择业务员"
						v-model='formItem.Saler'
						:params="{UserCode:userInfo.erpUserCode,modelCode:'paper_deli_detail'}"
					></selectDropdown>
				</view>
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="customerDrawer"
						url="appGetCustomerList"
						title="客户"
						placeholdertext="请选择客户"
						v-model='formItem.Cust'
						:params="{UserCode:userInfo.erpUserCode,modelCode:'paper_deli_detail'}"
					></selectDropdown>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">日期范围:</view>
						<picker mode="date" :value="formItem.From" start="2015-09-01" :end="defaultEndDate" @change="startDateChange">
							<view class="picker">
								{{formItem.From}}
							</view>
						</picker>
						<text class="margin-left">至</text>
						<picker mode="date" :value="formItem.To" start="2015-09-01" :end="defaultEndDate" @change="endDateChange">
							<view class="picker">
								{{formItem.To}}
							</view>
						</picker>
				   </view>
				</view>
			</view>
		</view>	
		<view class="vtable">
			<v-table
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="151"
				:height="tableHeight-35"
				:fixedMultipleLeft="true"
				>
			</v-table>
		</view>
		<view style="height: 70rpx;">
		</view>
		<view  class="flex border-top chucangbtm">
			<view class="flex-sub">
				<view class="cu-form-group">
				<uni-load-more :contentText="contentText" v-if="!hiddenLoadMore" @clickLoadMore="clickLoadMore" :status="more"></uni-load-more>
				<view class="title"><text class="text-bold">本页金额合计:</text>{{sumMoney}}</view>
				 </view>
			</view>
			
		</view>
	</view>
</template>

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import dayjs from 'dayjs'
import vTable from "@/components/table.vue"
import baseMixin from '@/mixins';
import cuCustom from '../../ui/colorui/components/cu-custom.vue' 
const moreStatus ={
	more:'more',
	loading:'loading',
	noMore:'noMore'
}
const defaultformItem = {
	// type:'',// 本周 week,本月 month
	// searchMode:'0',// -0客户1业务员2地区3材质4层数/楞别
	From: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
	To: dayjs().format('YYYY-MM-DD'),
	Cust:'',//选择的客户
	// guestId:'',//选择的客户id
	// businessName:'',//选择的业务员
	Saler:'',//选择的业务员
	// businessId:'',//选择的业务员id
}
export default {
	components: {cuCustom,vTable,selectDropdown,uniLoadMore},
	mixins: [baseMixin],
	data() {
		return {
			condition:false,
			contentText:{
				contentdown: '点击显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			sumMoney:0,
			isFilterDataByPage:false,// false:条件查询数据,true:翻页查询 
			pageSize:20, //--页大小
			pageNum:1,//y页码
			hiddenLoadMore:true, // 是否显示加载更多
			more:moreStatus.more,// 是否还有更多的数据 more loading noMore）
			formItem:JSON.parse(JSON.stringify(defaultformItem)),
			defaultEndDate:dayjs().format('YYYY-MM-DD'),
			// avgWidth:10, // 表格提示信息宽度,取所有字段的平均值
			tableHeight: 0, //表格高度
			dataTableList:[],
			dataColumns:[
				{ key: 'ct_Desc', title: '客户', $width: 150, titleAlign: 'center', columnAlign: 'left',$fixed:"left"},
				{ key: 'SalerName', title: '业务员', $width: 150, titleAlign: 'center', columnAlign: 'center'},
				{ key: 'pd_Date', title: '送货日期', $width: 160, titleAlign: 'center', columnAlign: 'right' },
				// { key: 'co_CoinName', title: '币种', $width: 100, titleAlign: 'center', columnAlign: 'right' },
				// { key: 'ZoneId', title: '区域编号', $width: 140, titleAlign: 'center', columnAlign: 'center' },
				// { key: 'ZoneNm', title: '区域名称', $width: 150, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'pd_No', title: '送货单号', $width: 180, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'pd_CarNo', title: '车牌号', $width: 140, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'pdi_Co', title: '工单号', $width: 180, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Art', title: '纸质', $width: 140, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'pdi_LB', title: '楞别', $width: 100, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Size', title: '规格', $width: 150, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'pdi_Qty', title: '送货数', $width: 100, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'pdi_BackQty', title: '备品数', $width: 140, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'pdi_LessQty', title: '少数', $width: 100, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'pdi_Price', title: '单价', $width: 100, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'pdi_Money', title: '金额', $width: 140, titleAlign: 'center', columnAlign: 'right' },
				// { key: 'LocalMoney', title: '本币金额', $width: 140, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'Area', title: '面积', $width: 140, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'Cube', title: '体积', $width: 100, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'Weight', title: '重量', $width: 140, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'pdi_Remark', title: '备注', $width: 260, titleAlign: 'center', columnAlign: 'center' },
			],
		};
	},
	computed:{

	},
	// #ifdef H5
	mounted() {
		plus.screen.lockOrientation("landscape-secondary")
		this.avgWidth = this.getTableAvgWidth(this.dataColumns);
		// this.calTableHeight()
	 
	},
	// #endif
	// #ifndef H5
	onReady() {
		setTimeout(()=>{
			plus.screen.lockOrientation("landscape-secondary")
			this.avgWidth = this.getTableAvgWidth(this.dataColumns);
			// this.calTableHeight()
		},1300)
		
	},	
	// 监听页面返回时改成正常显示
	onBackPress(){
		// debugger
		plus.screen.unlockOrientation();
		setTimeout(()=>{
			plus.screen.lockOrientation("portrait-primary")
		},1300)
		// debugger
		// 重启APP
		// plus.runtime.restart()
		// debugger
		// reload();
		// location.reload()
	},
	// #endif
	methods: {
		//清空
		restfrom(){
			this.formItem = JSON.parse(JSON.stringify(defaultformItem))
			this.$refs.customerDrawer.$data.formItem.customers  = ''
			this.$refs.customerDrawer.$data.formItem.customersId  = ''
			this.$refs.salerDrawer.$data.formItem.customers  = ''
			this.$refs.salerDrawer.$data.formItem.customersId  = ''
			this.dataTableList = []
		},
		// 点击加载更多 回调事件
		clickLoadMore(res){
			this.more = moreStatus.loading
			this.isFilterDataByPage = true
			this.pageNum++
			this.loaddingData()
		},
		// 搜索数据 通过条件
		searchDataBy(type){
			// // 重置 搜索模式
			let time = new Date();
			let d = time.getDate()-1;
			let nowDayOfWeek = !!new Date().getDay()?new Date().getDay()-1:0; //今天本周的第几天
			switch (type){
				// 本周dayjs()
				case 'week':
				   this.formItem.From = dayjs().subtract(nowDayOfWeek, 'day').format('YYYY-MM-DD')
				   this.formItem.To = dayjs().format('YYYY-MM-DD')
					break;
				// 本月
				case 'month':
					this.formItem.From = dayjs().subtract(d, 'day').format('YYYY-MM-DD')
					this.formItem.To = dayjs().format('YYYY-MM-DD')
					break;
				default:
				  // 按日期搜索+其它条件
					break;
			}
			this.loaddingData()
		},
		// 查询数据
		loaddingData(){
			if(!this.isFilterDataByPage){
				// 非分页加载数据
				this.dataTableList = []      // 清空数据列表
				this.pageNum = 1 // 重置当前页码
			}
			this.toast.loading()
			let url = '/warehouse/warehouse/execute/appSpPaperDeliQueryNew'
			let params = {
				...this.formItem,
				UserID:this.userInfo.erpUserCode,   //--用户ID
				pageSize:this.pageSize,
				pageNum:this.pageNum,
			}
			this.getOrPostDataBy(url,params).then(res=>{
				if(res&& res.list.length>0){
					this.doSomeLogicWhenDataNotNull(this.handleData(res.list))
					this.condition = false
					this.toast.hide()
				}else{
					this.more = moreStatus.noMore
					this.hiddenLoadMore = true
					if(!this.isFilterDataByPage){
							this.toast.hide()
							this.toast.message('暂无数据...')
					}else{
						this.toast.hide()
						this.toast.message('暂无更多数据...')
					}
				}
			  this.isFilterDataByPage = false // 重置分页查询条件
			})
		},
		handleData(res){
			// for(let i=0;i<res.length;i++){
					// res[i].ct_Desc = res[i].CustId+'-'+res[i].ct_Desc //客户
					// res[i].SalerName = res[i].ct_SalerId+'-'+res[i].SalerName //客户
					// res[i].co_Date = res[i].co_Date.slice(5)//订期
					// res[i].co_DueDate = res[i].co_DueDate.slice(5)//交期
					// res[i].Size = res[i].co_ArtId+'/'+res[i].co_ArtLB+" "+res[i].Size.replace(/\s*/g, '') //规格
			// }
			return res
		},
		// 数据逻辑处理
		doSomeLogicWhenDataNotNull(res){
			this.sumMoney =0
			let preIndex = this.dataTableList.length // 分页查询 目前下标
			this.more = moreStatus.more
			this.hiddenLoadMore = false  // 显示加载更多
			// 千分符数据格式化,保留小数等
			// let formatDataList = this.formatDataListBy(customDataList)
			// 小于最低页面 应该加载更多
			if(res.length<20){
				this.hiddenLoadMore = true
			}
			// 分页数据累加
			let tempDataList = this.dataTableList.concat(res) 
			// 金额汇总
			let totalMoney = tempDataList.reduce((initMoney,nextItem)=>{
				return initMoney= initMoney + Number(nextItem.pdi_Money) 
			},0)
			this.sumMoney = this.addThousandthSign(Number((totalMoney).toFixed(2))) 
			this.dataTableList = tempDataList
		},
		// 格式化指定字段
		formatDataListBy(dataList){
			if(dataList && Array.isArray(dataList) && dataList.length>0)
			{
				dataList = dataList.map(item=>{
					if(!!item.co_Money){
						item.co_Money = this.addThousandthSign(Number((item.co_Money).toFixed(2))) 
					}
					if(!!item.pd_Money){
						item.pd_Money = this.addThousandthSign(Number((item.pd_Money).toFixed(2))) 
					}
					if(!!item.RemainCredit){
						item.RemainCredit = this.addThousandthSign(Number((item.RemainCredit).toFixed(2)))
					}
					return item
				})
			}
			return dataList
		},
		// 开始时间选择 回调
		startDateChange(e) {
			this.formItem.From = e.detail.value
		},
		// 结束时间选择 回调
		endDateChange(e) {
			this.formItem.To = e.detail.value
		},
		// 设置表格使用剩余高度
		calTableHeight(){
			this.$nextTick(()=>{
				this.getOtherContentHeight()
				setTimeout(()=>{
					//延时执行,方便个别小程序兼容
					let tempHeight =  this.setTableHeight(true)
					this.tableHeight =tempHeight//特别处理
				},200)
			})
		}
	}
};
</script>

<style>
	.margin-left-custom{
		margin-left: 10rpx;
	}
	.cu-form-group uni-picker .picker{
		    line-height: 30px !important;
	}
	.cu-form-group uni-picker::after{
		 line-height: 30px !important;
	}
	.border-top{
		  border-top: 1px solid #eee;
	}
	.chucangbtm{
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 101;
	}
</style>
