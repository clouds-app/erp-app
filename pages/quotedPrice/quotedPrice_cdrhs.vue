<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">纸板面积报价</block>
			<!-- <block slot="right"><icon type="search" size="20" color="#fff" @tap="openSearch" /></block> -->
		</cu-custom>
		<selectDropdown
			:otherHeight='CustomBarHeight' 
			ref="customerDrawer" 
			v-model="customer"
			url="appGetCustomerList"
			title="客ㅤ户"
			placeholdertext="请选择客户"
			@onChange='closeMain'
			:params="{modelCode:'cust_arrears',UserCode:userInfo.erpUserCode,pageSize:100,pageNum:1}"
		></selectDropdown>
		 <!-- <search ref="search" @search="search"></search> -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="clickIndex == index ? 'text-blue cur' : '' " @tap="tabClick(index)" v-for="(item, index) in titleItems" :data-id="index" :key="index">{{ item }}</view>
			</view>
		</scroll-view>

		<view>
			<zTable :stickSide="true" :tableHeight="(screen.height * 2 - (CustomBar + StatusBar+50) * 2 )" :showLoading="false" emptyText="没有报价数据" :tableData="tableDataComputed" :columns="columnsComputed" title-text-alig ="center"></zTable>
		</view>
	</view>
</template>

<script>
import warehouse from '@/mixins';
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import search from '@/components/search/search.vue';
import zTable from '@/components/z-table/z-table.vue';
import request from '@/utils/request.js';
export default {
	components: { cuCustom, search, zTable,selectDropdown },
	mixins:[warehouse],
	data() {
		const screenWidth = this.screen.width + 8;
		return {
			ifbooleam:false,
			customer:'',
			clickIndex : 0 ,
			titleItems: ['纸质报价', '配纸报价', '楞别报价'],
			columns: [
				[{ title: '纸质编号', key: 'pap_ArtId',width:screenWidth}, { title: '报价', key: 'pap_NewPrice',width:screenWidth}],
				[
					{title:'纸质',key:'spaper',width:120},
					{title:'面纸',key:'sam_addFamount',width:120},
					{title:'底纸',key:'sam_addBotamount',width:120},
					{title:'A坑',key:'sam_addAamount',width:120},
					{title:'B坑',key:'sam_addBamount',width:120},
					{title:'C坑',key:'sam_addCamount',width:120},
					{title:'E坑',key:'sam_addqkamount',width:120},
					{title:'F坑',key:'sam_addFamount',width:120}
				],
				[
					{title:'楞别',key:'lb_Code',width:130},
					{title:'层数',key:'lb_CS',width:130},
					{title:'加价',key:'lb_ProcessPrice',width:132},
					{title:'折扣系数',key:'lb_Discount',width:150},
					{title:'优惠方式',key:'pap_LessStyle',width:200}
				]
			],
			tableData:{
				t0:[],
				t1:[],
				t2:[]
			},
			queryParams:{}
		}
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
		closeMain(data){
			this.search(data)
		},
		openSearch() {
			this.$refs.customerDrawer.showModal()
			// this.$refs.search.open();
		},
		search(data){
			this.queryParams = data;
			this.getPriceDataProvider()
		},
		getPriceDataProvider(){
			if(!this.queryParams.customersId || this.queryParams.customersId === ''){
				this.toast.message('请选择客户')
				return
			}
			const requestData = {
				Mode: this.clickIndex,
				UserID: this.queryParams.customersId
			}
			this.toast.loading()
			const _self = this;
			request.post('/proc/execute/appSpPhoneArtPriceQuery',requestData).then(res =>{
				this.toast.hide()
				//debugger
				this.tableData['t'+this.clickIndex] = JSON.parse(JSON.stringify(res.list))
				if(res.list.length = 0){
					this.toast.message('没有报价数据')
				}
			}).catch(err=>{
				console.error(err)
				this.toast.hide()
			})
		},
		tabClick(index){
			this.clickIndex = index
			if(this.tableData['t'+this.clickIndex].length === 0){
				this.getPriceDataProvider()
			}
		}
	}
};
</script>

<style></style>
