<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">纸板面积报价</block>
			<!-- <block slot="right"><icon type="search" size="20" color="#fff" @tap="openSearch" /></block> -->
		</cu-custom>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:otherHeight='CustomBarHeight' 
					ref="customerDrawer" 
					v-model="customer"
					url="appGetCustomer"
					title="客ㅤ户"
					placeholdertext="请选择客户"
				></selectDropdown>
					<!-- @onChange='closeMain' -->
			</view>
				<view class="cu-form-group" style="padding: 0;">
					<button  style="margin-right: 10px;" class="cu-btn  line-blue" @click="clearData()" >清空</button>
					<button  class="cu-btn  line-blue" @click="search()" >查询</button>
				</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
				<view class="title">纸ㅤ质:</view>
				<input class="borderBtm" v-model="customerArt"/>
			</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
				<view class="title">楞ㅤ别:</view>
				<input class="borderBtm" v-model="artLB"/>
			</view>
			</view>
		</view>
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
			artLB:'',//楞别
			customerArt:'',//纸质
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
		// 清空数据
		clearData(){
			this.artLB = '',//楞别
			this.customerArt = '',//纸质
			this.$refs.customerDrawer.$data.formItem.customers = ''
			this.$refs.customerDrawer.$data.formItem.customersId = ''
			this.customer = ''
			this.tableData['t'+this.clickIndex] = []
		},
		openSearch() {
			this.$refs.customerDrawer.showModal()
			// this.$refs.search.open();
		},
		search(){
			// this.queryParams = data;
			this.getPriceDataProvider()
		},
		getPriceDataProvider(){
			if(!this.customer|| this.customer === ''){
				this.toast.message('请选择客户')
				return
			}
			const requestData = {
				Mode: this.clickIndex,
				UserID: this.customer
			}
			this.toast.loading()
			const _self = this;
			request.post('/proc/execute/appSpPhoneArtPriceQuery',requestData).then(res =>{
				this.toast.hide()
				this.tableData['t'+this.clickIndex] = this.filterData(res.list)
				if(res.list.length = 0){
					this.toast.message('没有报价数据')
				}
			}).catch(err=>{
				console.error(err)
				this.toast.hide()
			})
		},
		// 数据过滤
		filterData(data){
			let list = []
			let val = ''
			switch(this.clickIndex) {
			     case 0:
				   val = this.customerArt.toUpperCase()
				   list = this.transformData(data,val,'pap_ArtId')
			        break;
			     case 2:
			        val = this.artLB.toUpperCase()
					 list = this.transformData(data,val,'lb_Code')
			        break;
			     default:
					return data
			}
			return list
		},
		transformData(data,val,field){
			let list = []
			data.filter(item=>{
				if(item[field].indexOf(val) != -1){
					list.push(item)
				}
			})
			return list
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

<style>
	.borderBtm{
			border-bottom:1px solid #8799A3;
	}
</style>
