<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" class="titlefrom">
			<block slot="content">纸箱成品寻货</block>
		</cu-custom>
		<form class="xunhoutop">
			<view  class="cu-form-group border-top">
				<view style="margin-left: -15px;">
					<!-- <customerSelect ref="customerDrawer" v-model="formItem.customer"></customerSelect> -->
					<productSelect
						:otherHeight='CustomBarHeight' 
						ref="customerDrawer" 
						v-model="formItem.customerId"
						url="appGetCustomer"
						title="客ㅤ户"
						placeholdertext="ㅤ请选择客户"
					></productSelect>
				</view>
				<view>
					<button  @click="findGoods()" type="primary" size="mini">查询</button>
				</view>
			</view>
			<!-- 产品控件 -->
			<productSelect 
				ref="productDrawer" 
				:otherHeight='CustomBarHeight' 
				v-model="formItem.productId" 
				url="appGetBoxProductinfoSelect"
				title="产ㅤ品"
				placeholdertext="ㅤ请选择产品"
			></productSelect>
			<!-- <view  class="cu-form-group border-top">
				<view class="title">产ㅤ品:</view>
				<input @click="showModal" disabled v-model="formItem.productId"  placeholder="请选择产品" name="input"></input>
				<text @click="showModal" class='cuIcon-rounddown text-green'></text>
			</view> -->
			<view class="cu-form-group border-top">
				<view class="title">工单号:</view>
				<input v-model="boxSeek.hp_bi_WorkNo" @blur="findGoods" placeholder="请输入工单号" />
				<button @click="turnOnScanCode('workNo')" type="primary" size="mini">扫描</button>
			</view>
		</form>
		<!-- 数据列表 -->
		<view style="height: 120px;"></view>
			<view  class="grid-warp" v-for="(item,index) in fromdata" :key='index'>
				<view class="grid-title">
					单号:{{item.WorkNo}}
				</view>
				<view class="grid-body">
					<view class="grid-flex padding-10">
						<view>
							<text>客户:{{item.CustName}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>仓位:{{item.Station}}</text>
						</view>
						<view>
							<text>入库:{{item.InStoreQty}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>库存:{{item.StoreQty}}</text>
						</view>
						<view>
							<text>未送:{{item.NoDelQty}}</text>
						</view>
					</view>
				</view>
			</view>
		<view style="height: 50px;"></view>
		<!-- 底部操作框 -->
		<view class="xunhoubtm elBtn">
			<view>
				<text>记录数：{{recordsNum}}</text>
			</view>
			<view>
				<button class="bank-rest" @tap="restFrom" type="primary" size="mini">清除</button>
			</view>
		</view>
		</view>
		<!-- <searchForm @getSelectDataInfo="getSelectDataInfo" :dataSource="dataSource" ref='searchForm'></searchForm> -->
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
import searchForm from '@/components/searchForm/searchDataList.vue.vue'
const defaultformItem={
						customer:'',//客户
						customerId:'',//客户id
						product:'',//产品
						productId:'',//产品id
					}
export default {
	name: 'boxIn', //纸箱出入库
	components: { zTable, uniPopup, cuCustom, searchForm, customerSelect, productSelect },
	mixins: [warehouse],
	data() {
		return {
			// serchHeight:0,//serch高度
			isMultipel:false,// 是否多选
			searchKeyword:'',//抽屉搜索关键词
			modalName:'',//抽屉是否显示
			modalArry:[],//抽屉弹框数据
			recordsNum:0,//底部记录数
			fromdata:[],
			licensePlateList:[],// 客户 列表
			productList:[],//产品列表
			formItem:Object.assign({},defaultformItem),
			currentSelected: '-1',
			TabCur: 2,
			scanType: '', //当前扫描类型
			scrollLeft: 0,
			dataTableList: [],
			currentSelect:'',//记录点击的列表
			errorContent: '暂无数据', //'数据加载中...',
			tableHeight: 400, //表格高度
			boxSeek:{
				hp_bi_WorkNo:'',//工单号
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
		//计算设置表格高度
		setTableHeight(needOtherHeight=false){
				  if(!needOtherHeight){
					  this.otherHeight = 0
				  }
				try {
					//debugger
				    const res = uni.getSystemInfoSync();
				    // console.log('windowHeight:'+res.windowHeight);
				     // console.log('CustomBar:'+this.CustomBar);
				    // console.log('bodyContentHeight:'+this.otherHeight);
					this.leftContentHeight =res.windowHeight -this.CustomBar - this.otherHeight -10
					//console.log('tableHeight:'+this.leftContentHeight);
					return this.leftContentHeight
				} catch (e) {
				    // error
				}
		},
		//获取指定内容占用高度,计算剩余高度 单位:PX
		getOtherContentHeight(className='bodyContentHeight'){
		  return new Promise((resolve, reject) => {
			   let eleHeight=0
			   let _self =this
			   let info = uni.createSelectorQuery().in(_self).select("."+className);
			  info.boundingClientRect(function(data) { //data - 各种参数
				 // console.log('other Height:'+data.height)  // 获取元素宽度
			 　　   _self.otherHeight = data.height
					eleHeight = data.height
					resolve(data.height)
			   }).exec(function (res) {
			   })
		  })
		},
		async getTableHeight(){
		  let _self=this
		  let tempHeight =  _self.setTableHeight()
		  // console.log(tempHeight)
		  let otherHeight= await _self.getOtherContentHeight("titlefrom") 
		  // console.log(otherHeight)
		  // let serchHeight= await _self.getOtherContentHeight("searchfrom")
		  // console.log(serchHeight)
		},
		// 清除按钮
		restFrom(){
			this.formItem = defaultformItem;
			this.boxSeek.hp_bi_WorkNo = '';
			this.recordsNum = 0;
			this.fromdata = [];
			this.$refs.customerDrawer.$data.formItem.customers = '';
			this.$refs.customerDrawer.$data.formItem.customersId = '';
			this.$refs.productDrawer.$data.formItem.customers = '';
			this.$refs.productDrawer.$data.formItem.customersId = '';
			
		},
		//===打开扫描===
		turnOnScanCode(type) {
			this.scanType = type;
			let _self = this;
			// 调起条码扫描
			uni.scanCode({
				scanType: 'barCode',
				success: function(res) {
					let a = res.result.indexOf(',')
					let b = 0
					if(a<0){
						b = res.result
					}else{
						b = res.result.substring(0,a)
					}
					console.log(b)
					// console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					switch (_self.TabCur) {
						case 0: //成品入库
							//工单号
							_self.boxIn.formItem.bi_WorkNo = b;
							_self.boxInGetOrderInfo(); //工单号验证查询
							break;
						case 1: //成品出库
							_self.boxOut.formItem.bi_OrderNo = b;
							break;
						case 2: //成品寻货
							_self.boxSeek.hp_bi_WorkNo = b;
							_self.findGoods(); //工单号验证查询
							break;

						default:
							break;
					}
				}
			});
		},
		findGoods() {
			//寻货
			this.fromdata = []
			this.recordsNum = 0
			this.toast.loading()
			let data = {
				CustID: this.formItem.customerId, //this.instruct,//????
				ProdNo: this.formItem.productId,
				WorkNo: this.boxSeek.hp_bi_WorkNo,
			};
			request.post(`/warehouse/warehouse/execute/appSpGetBoxProductStore`,data)
				.then(res => {
					// debugger
					if (res.list && res.list.length > 0) {
						// this.fromdata = res.list;
						// this.fromdata.push(res.list) 
						this.fromdata = (res.list)
						this.recordsNum = this.fromdata.length
						// console.log(this.fromdata)
						this.toast.hide();
					}else{
						this.toast.message('暂无数据');
					}
				})
				.catch(err => {
					this.toast.message('暂无数据');
				});
		},
	}
};
</script>

<style scoped>
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
.xunhoubtm {
	display: flex;
	justify-content:space-between;
	position: fixed;
	background-color: #FFFFFF;
	bottom: 0px;
	width: 100%;
	
}
.xunhoubtm >view:first-child{
	display: flex;
	/* color: red; */
	align-items:center;
	margin: 5px;
	
}
.xunhoubtm >view:last-child{
	margin: 5px;
}
.xunhoutop{
	position: fixed;
	width: 100%;
	z-index: 10;
}
.search{
	/* display: flex; */
	position: fixed;
	width: 65%;
	z-index: 2000000;
}
</style>
