<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">辅料库存汇总</block>
			<template slot="right">
				<button @click="queryConditions" type="primary" size="mini" class="bg-grey radius">筛选</button>
			</template>
		</cu-custom>
		<view>
			<view v-show="isShowseach">
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="Kind"
						url="appFindProdType" title="辅料大类" placeholdertext="请输入辅料大类" v-model='paperInFormItems.Kind'
						:params='{modelCode:"prod_out_analyzer"}'>
					</selectDropdown>
				</view>
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="SmallCode"
						url="appFindProdSmallType" title="辅料细类" placeholdertext="请输入辅料细类" v-model='paperInFormItems.SmallCode'
						:params='{modelCode:"prod_store_analyzer"}'>
					</selectDropdown>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="Code"
						url="appFindProd" title="辅料编号" placeholdertext="请输入辅料编号" v-model='paperInFormItems.Code'
						:params='{modelCode:"prod_out_analyzer"}'>
					</selectDropdown>
				</view>
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="VendNo"
						url="appFindVendor" title="供应商ㅤ" placeholdertext="请输入供应商" v-model='paperInFormItems.VendNo'
						:params='{modelCode:"prod_in_search"}'>
					</selectDropdown>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="Station"
						url="appFindSearchStation" title="仓位名称" placeholdertext="请输入仓位名称" v-model='paperInFormItems.Station'
						:params='{modelCode:"prod_in"}'>
					</selectDropdown>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">辅料名称:</view>
					<input style="padding-right: 0;" v-model="paperInFormItems.Name" />
				</view>
				</view>
				<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">助记码ㅤ:</view>
					<input style="padding-right: 0;" v-model="paperInFormItems.ZhuJiMa" />
				</view>
				</view>
			</view>
			</view>
			<view class="flex-sub">
				<view class="topbuttom">
					<button :disabled="isLoaddingData" class="cu-btn lines-brown shadow"  @click="changeMode(4)">按编号汇总</button>
					<button :disabled="isLoaddingData" class="cu-btn lines-purple shadow"  @click="changeMode(5)">按批次汇总</button>
					<button  class="cu-btn lines-blue shadow"  @click="queryData">查询</button>
					<button  class="cu-btn lines-mauve shadow" :disabled="!showPage"  @click="getMoreData">加载更多</button>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
			<view class="vtable">
				<v-table
					:row-class-name="rowClassNameFn"
					:columns="subdataColumns" 
					:list="subdataTableList" 
					selection="single"
					:td-width="150"	
					:height="tableHeight"
					>
				</v-table>
			</view>
		</view>
	</view>
</template>

<script>
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue';
import dayjs from 'dayjs';
import cuCustom from '../../ui/colorui/components/cu-custom.vue' ;
import baseMixin from '@/mixins';
import request from '@/utils/request.js';
import vTable from "@/components/table.vue";
const detailedColumn = [
	{ key: 'rownumber', title: '序号',$width: 80,columnAlign: 'center' ,titleAlign: 'center'},
	{ key: 'st_Code', title: '辅料编号',$width: 200,columnAlign: 'left' ,titleAlign: 'center'},
	{ key: 'ProdName', title: '辅料名称', $width: 300, titleAlign: 'center', columnAlign: 'left'},
	{ key: 'st_Qty', title: '库存数量', $width: 150, titleAlign: 'center', columnAlign: 'right'},
	{ key: 'st_TaxMoney', title: '含税金额', $width: 180, titleAlign: 'center', columnAlign: 'right'},
	{ key: 'st_NoTaxMoney', title: '不含税金额', $width: 180, titleAlign: 'center', columnAlign: 'right'},
];
const gatherColumn = [
	{ key: 'rownumber', title: '序号',$width: 80,columnAlign: 'center' ,titleAlign: 'center'},
	{ key: 'st_Code', title: '辅料编号',$width: 200,columnAlign: 'center',columnAlign: 'left'},
	{ key: 'ProdName', title: '辅料名称', $width: 300, titleAlign: 'left', columnAlign: 'left'},
	{ key: 'st_PonoseriNo', title: '批次号', $width: 200, titleAlign: 'center', columnAlign: 'left'},
	{ key: 'st_Qty', title: '库存数量', $width: 150, titleAlign: 'center', columnAlign: 'right'},
	{ key: 'st_TaxMoney', title: '含税金额', $width: 180, titleAlign: 'center', columnAlign: 'right'},
	{ key: 'st_NoTaxMoney', title: '不含税金额', $width: 180, titleAlign: 'center', columnAlign: 'right'},
];
const default_totalList = {st_Code:'合计',st_Qty:0,st_TaxMoney:0,st_NoTaxMoney:0,copySt_NoTaxMoney:0,copySt_TaxMoney:0}//Table合计数据
export default {
	components:{cuCustom,vTable,selectDropdown},
	mixins:[baseMixin],
	data(){
		return {
			isShowseach:false,//是否显示筛选信息
			showPage:false,//是否继续分页查询
			paperInFormItems:{
				Kind: '', //辅料大类
				SmallCode: '', //辅料细类
				Code:'', //辅料编号
				Name:'', //辅料名称
				VendNo:'', //供应商
				Station:'', //仓位
				ZhuJiMa:'' ,//助记码
				Analyzer:4,// -- 1、供应商2、细类、3、明细
				pageSize:100,
				pageNum:1,
				UserID:'',
			},
			subdataColumns:Object.assign(detailedColumn),
			totalList:JSON.parse(JSON.stringify(default_totalList)),
			subdataTableList:[],
			tableHeight:725,//table高度
		}
	},
	methods:{
		queryConditions(){
			this.isShowseach = !this.isShowseach
		},
		//加载更多
		getMoreData(){
			this.paperInFormItems.pageNum++
			this.getTableList()
		},
		// Mode变化回调
		changeMode(data){
			switch (data){
				case 4:
					this.subdataColumns = Object.assign(detailedColumn)
					break;
				case 5:
					this.subdataColumns = Object.assign(gatherColumn)
					break;
			}
			this.totalList = JSON.parse(JSON.stringify(default_totalList))
			this.subdataTableList = []
			this.paperInFormItems.Analyzer = data
			this.paperInFormItems.pageNum = 1
			this.getTableList()
		},
		// 查询按钮回调
		queryData(){
			this.totalList = JSON.parse(JSON.stringify(default_totalList))
			this.subdataTableList = []
			this.paperInFormItems.pageNum = 1
			this.getTableList()
		},
		// 格式化指定字段
		formatDataListBy(dataList){
				dataList.map((item,index)=>{
					if(item.st_Code !== "合计"){
						if(!!item.st_TaxMoney){
							this.subdataTableList[item.rownumber - 1].st_TaxMoney = this.addThousandthSign(item.st_TaxMoney.toFixed(2))
						}
						if(!!item.st_NoTaxMoney){
							this.subdataTableList[item.rownumber - 1].st_NoTaxMoney = this.addThousandthSign(item.st_NoTaxMoney.toFixed(2))
						}
						if(!!item.st_Qty){
							this.subdataTableList[item.rownumber - 1].st_Qty = this.addThousandthSign(item.st_Qty.toFixed(2))
						}
					}

				})
		},
		// 查询表单数据
		getTableList(){
			this.subdataTableList.splice(this.subdataTableList.length-1,1)
			this.toast.loading()
			 this.paperInFormItems.UserID = this.userInfo.erpUserCode 
			 request.post('/warehouse/warehouse/executeMany/appProdStoreTotalAnalyzerNew',this.paperInFormItems).then(res=>{
				 if(res.list.length > 0){
					 this.subdataTableList = this.subdataTableList.concat(this.transformData(res.list))
					 this.formatDataListBy(res.list)
					 this.toast.hide()
				 }else{
					 this.toast.message('暂无更多数据')
				 }
				 console.log(res);
			 }).catch(err=>{
				 this.toast.message(err)
			 })
		},
		// const default_totalList = {v_id:'合计',st_Qty:0,st_TaxMoney:0,st_NoTaxMoney:0,SmallCode:'合计'}//Table合计数据
		// Table显示数据处理
		transformData(data){
			if(data.length < this.paperInFormItems.pageSize){
				this.showPage = false
			}else{this.showPage = true}
			let _self = this
			data.filter(item=>{
				_self.totalList.st_Qty+=item.st_Qty
				// 复制金额字段,防止格式化后无法计算,计算汇总金额
				_self.totalList.copySt_TaxMoney+=item.st_TaxMoney
				_self.totalList.copySt_NoTaxMoney+=item.st_NoTaxMoney
			})
			this.totalList.st_TaxMoney = this.addThousandthSign(this.totalList.copySt_TaxMoney.toFixed(2))
			this.totalList.st_NoTaxMoney = this.addThousandthSign(this.totalList.copySt_NoTaxMoney.toFixed(2))
			this.totalList.st_Qty=Number(this.totalList.st_Qty.toFixed(2))
			return (data.push(this.totalList),data)
		},
		// 设置表格使用剩余高度
		calTableHeight(){
			this.$nextTick(()=>{
				setTimeout(()=>{
					//延时执行,方便个别小程序兼容
					let tempHeight =  this.setTableHeight(true)
					this.tableHeight =tempHeight//特别处理
				},200)
			})
		}
	}
}
</script>

<style>
	.topbuttom{
		background-color: #fff;
	}
	.topbuttom button{
		margin-left: 10px;
	}
	.borderbottom{
			border-bottom:1px solid #464E52 ;
	}
	.paddingnone{
		padding: 0px;
	}
	.paddingRigntnone{
		padding-right: 0px;
	}
	.dataClass{
		height: 76%;
		width: 25%;
	}
	.userclass{
		height: 76%;
		width: 30%;
	}
</style>
