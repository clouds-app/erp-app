<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">原纸报价</block>
		</cu-custom>
		<selectDropdown
			:otherHeight='CustomBarHeight' 
			ref="customerDrawer" 
			v-model="customer"
			url="appGetCustomerList"
			title="客ㅤ户"
			placeholdertext="请选择客户"
			@closeMain='closeMain'
			:params="{modelCode:'spaper_lb_price_item',UserCode:userInfo.erpUserCode}"
		></selectDropdown>
		 <!-- <search ref="search" @search="search"></search> -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="clickIndex == index ? 'text-blue cur' : '' " @tap="tabClick(index)" v-for="(item, index) in titleItems" :data-id="index" :key="index">{{ item }}</view>
			</view>
		</scroll-view>

		<!-- <view>
			<zTable :stickSide="true" 
			:tableHeight="(screen.height * 2 - (CustomBar + StatusBar+50) * 2 )" 
			:showLoading="false" 
			emptyText="没有报价数据" 
			:tableData="tableDataComputed" 
			:columns="columnsComputed" 
			title-text-alig ="center"></zTable>
		</view> -->
		<!-- <view style="height: 80rpx;"></view> -->
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="columns[clickIndex]" 
				:list="tableDataComputed" 
				selection="single"
				:td-width="clickIndex===0?125:173"
				:height="tableHeight-70"
				@on-selection-change="onSelectionChange"
				>
			</v-table>
		</view>
		<view style="height: 15rpx;" class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
				<uni-load-more :contentText="contentText" v-if="page[clickIndex].showpage" @clickLoadMore="clickLoadMore" :status="more"></uni-load-more>
				 </view>
			</view>
		</view>
		
	</view>
</template>

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
import warehouse from '@/mixins';
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import search from '@/components/search/search.vue';
import zTable from '@/components/z-table/z-table.vue';
import vTable from "@/components/table.vue"
import request from '@/utils/request.js';
export default {
	components: { cuCustom, search, zTable,selectDropdown,vTable,uniLoadMore },
	mixins:[warehouse],
	data() {
		const screenWidth = this.screen.width + 8;
		return {
			more:'',// 是否还有更多的数据 more loading noMore）
			contentText:{
				contentdown: '点击显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '点击显示更多'
			},
			ifbooleam:false,
			customer:'',
			clickIndex : 0 ,
			tableHeight: 500, //表格高度
			titleItems: ['原纸面积报价明细', '楞别加工费明细'],
			columns: [
				[
					{ key: 'psp_SpaperId', title: '原纸编号',$width: 140, },
					{ key: 'psp_NewPrice', title: '面积报价', $width: 155, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'psp_TileTypeD', title: 'B瓦', $width: 100, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'psp_TileTypeC', title: 'C瓦', $width: 100, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'psp_TileTypeE', title: 'E瓦', $width: 100, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'psp_OldPrice', title: '上次报价', $width: 155, titleAlign: 'center', columnAlign: 'right' },
				],
				[	{ key: 'lb_Code', title: '楞别',$width: 80, },
					{ key: 'lb_CS', title: '层数', $width: 80, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'lb_ProcessPrice', title: '加价', $width: 100, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'Profit', title: '利润点%', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'WasteRate', title: '原纸耗损', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'pap_LessStyle', title: '优惠方式', $width: 500, titleAlign: 'center', columnAlign: 'center' },
				],
			],
			// columns: [
			// 	[
			// 		{ title: '原纸编号', key:'psp_SpaperId',width:100},
			// 		{ title: '面积报价', key:'psp_NewPrice',width:130},
			// 		{ title: 'B瓦', 	key:'psp_TileTypeD',width:120},
			// 		{ title: 'C瓦', 	key:'psp_TileTypeC',width:120},
			// 		{ title: 'E瓦', 	key:'psp_TileTypeE',width:120},
			// 		{ title: '上次报价', key: 'psp_OldPrice',width:130},
					
			// 	],
			// 	[
			// 		{title:'楞别',key:'lb_Code',width:90},
			// 		{title:'层数',key:'lb_CS',width:80},
			// 		{title:'加价',key:'lb_ProcessPrice',width:100},
			// 		{title:'优惠方式',key:'pap_LessStyle',width:400},
			// 		{title:'利润点%',key:'Profit',width:120},
			// 		{title:'原纸耗损',key:'WasteRate',width:120},
			// 	],
			// ],
			tableData:{
				t0:[],
				t1:[],
				t2:[]
			},
			queryParams:{},
			page:[
				{pageSize:50,
				pageNum:1,
				showpage:false},
				{pageSize:50,
				pageNum:1,
				showpage:false}
			]//分页参数
				
		}
	},
	// onReachBottom(){
	// 	// debugger
	// 	if(this.page[this.clickIndex].showpage){
	// 		this.getPriceDataProvider()
	// 	}
	// },
	mounted() {
	  this.calTableHeight()
	 
	},
	onReady() {
	  this.calTableHeight()
	},
	computed:{
		columnsComputed(){
			return this.columns[this.clickIndex]
		},
		tableDataComputed(){
			return this.tableData['t'+this.clickIndex]
		}
	},
	methods: {
		clickLoadMore(){
			if(this.page[this.clickIndex].showpage){
					this.getPriceDataProvider()
			}
		},
		closeMain(data){
			// debugger
			this.tableData['t'+this.clickIndex] = []
			// this.search(data)
			this.getPriceDataProvider()
		},
		openSearch() {
			this.$refs.customerDrawer.showModal()
			// this.$refs.search.open();
		},
		// search(data){
		// 	debugger
		// 	this.queryParams = data;
		// 	this.getPriceDataProvider()
		// },
		getPriceDataProvider(){
			// debugger
			if(!this.customer || this.customer === ''){
				this.toast.message('请选择客户')
				return
			}
			const requestData = {
				Flag: this.clickIndex,
				CustID: this.queryParams.customersId,
				UserID: this.userInfo.erpUserCode,
				pageSize:this.page[this.clickIndex].pageSize,
				pageNum:this.page[this.clickIndex].pageNum
			}
			this.toast.loading()
			const _self = this;
			request.post('/warehouse/warehouse/execute/appSPaperLBPriceItem',requestData).then(res =>{
				// debugger
				_self.tableData['t'+_self.clickIndex]= _self.tableData['t'+_self.clickIndex].concat(res.list)
				_self.toast.hide()
				_self.checkDataPage(res.list)
				if(res.list.length == 0){
					_self.toast.message('没有明细数据')
				}
			}).catch(err=>{
				_self.toast.hide()
				_self.toast.message(err)
			})
		},
		tabClick(index){
			// debugger
			this.clickIndex = index
			if(this.tableData['t'+this.clickIndex].length === 0){
				this.getPriceDataProvider()
			}
		},
		// 判断数据是否分页
		checkDataPage(data){
			if(data.length<this.page[this.clickIndex].pageSize){
				this.page[this.clickIndex].pageNum = 1
				this.page[this.clickIndex].showpage = false
				return
			}
			this.page[this.clickIndex].pageNum++
			this.page[this.clickIndex].showpage = true
		},
		// 设置表格使用剩余高度
		calTableHeight(){
			// debugger
			this.$nextTick(()=>{
				this.getOtherContentHeight('nav')
				setTimeout(()=>{
					// debugger
					//延时执行,方便个别小程序兼容
					let tempHeight =  this.setTableHeight(true)
					this.tableHeight =tempHeight//特别处理
				},200)
			})
		}
	}
};
</script>

<style scoped>
	/* .border-top{
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 2;
	} */
</style>
