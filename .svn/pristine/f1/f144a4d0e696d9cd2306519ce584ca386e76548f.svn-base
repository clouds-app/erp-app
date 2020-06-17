<template>
	<view>
		
		<!-- 搜索框弹出  -->
		<view class="cu-modal bottom-modal" :class="isShowSearchForm ? 'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					
					<view class="action text-blue" @tap="cancelEvent">取消</view>
					<view class="action text-green" @tap="comfirmEvent">确定</view>
				</view>
				<view class="text-left padding-sm">
					<form>
						<!-- <view class="cu-form-group">
							<view class="title">类　　型</view>
							<input disabled v-model="productTypeText" placeholder="请选择类型(纸板,纸箱...)" name="input"></input>
							<button @click="isShowProList=true" class='cu-btn bg-green shadow'>选择</button>
						</view> -->
						<view class="cu-form-group">
							<view class="title">快速方式</view>
							<button @click="handleFilterData('week')" :class="currentFilterType==='week'? 'cu-btn bg-orange': 'cu-btn line-orange'" >本周</button>
							<button @click="handleFilterData('month')" :class="currentFilterType==='month'? 'cu-btn bg-orange': 'cu-btn line-orange'">本月</button>
							<button @click="handleFilterData('season')" :class="currentFilterType==='season'? 'cu-btn bg-orange': 'cu-btn line-orange'">本季</button>
						</view>
						<view class="cu-form-group">
							<view class="title">开始日期</view>
							<input disabled="true" placeholder="输入开始日期" v-model="startDate" name="input"></input>
							<button @click="openDateSelect('start')" class='cu-btn bg-green shadow'>日期</button>
						</view>
						<view class="cu-form-group">
							<view class="title">结束日期</view>
							<input disabled="true" v-model="endDate" placeholder="输入框结束日期" name="input"></input>
							<button @click="openDateSelect('end')" class='cu-btn bg-green shadow'>日期</button>
						</view>
						<view class="cu-form-group">
							<view class="title">客　　户</view>
							<input disabled v-model="customerInfo" placeholder="请选择客户" name="input"></input>
							<button @click="customerInfo=''" class='margin-right cu-btn round line-green'>清空</button>
							<button @click="openCustomerList" class='cu-btn bg-green shadow'>选择</button>
							
						</view>
						
						<view v-if="needSalemanList" class="cu-form-group">
							<view class="title"> 业 务 员 </view>
							<input disabled v-model="SalesmanSearch.SalesmanItemText" placeholder=" 请选择客户" name="input"></input>
							<button @click="SalesmanSearch.SalesmanItemText=''" class='margin-right cu-btn round line-green'>清空</button>
							<button @click="openSalesmanList" class='cu-btn bg-green shadow'>选择</button>
							
						</view>
					</form>
					
				</view>
			</view>
		</view>
		<!-- 搜索框弹出 end-->
		
		<!-- 时间选择器 -->
		<w-picker
		    mode="date" 
		    startYear="2016" 
		    :endYear="endYear"
		    :defaultVal="[0,0,0]" 
		    :current="true"
		    @confirm="onConfirmDate" 
		    ref="DatePicker" 
		    themeColor="#f00">
		</w-picker>
		<!-- 业务员信息列表 -->
		<view @tap="SalesmanSearch.isShow=false" class="cu-modal drawer-modal justify-start" :class="SalesmanSearch.isShow ?'show':''">
			
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				
					<view :style="[{overflow:'scroll',  height:'calc(100vh - ' + CustomBar + 'px)'}]" class="cu-list menu text-left">
							<view  class="cu-item">
								<!-- 搜索框 -->
								<view class="cu-bar bg-white search ">
									<view class="search-form round">
										<text class="cuIcon-search"></text>
										<input v-model="searchKeyword_sale" type="text" placeholder="关键词" confirm-type="search"></input>
									</view>
									<view class="action">
										<button @click="filterSaleList()" class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
									</view>
								</view>
								<!-- 搜索框 -->
							</view>
							<view @click="getSalesmanInfo(item)"  class="cu-item arrow" v-for="(item,index) in SalesmanSearch.SalesmanList" :key="index">
								<view  style="overflow: scroll;" class="content">
									<view v-text="item.w_Name"></view>
								</view>
							</view>
						
					</view>
			
			</view>
			
		</view>
		<!-- 客户信息列表 -->
		<view @tap="isShowCustomerList=false" class="cu-modal drawer-modal justify-start" :class="isShowCustomerList ?'show':''">
			
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				
					<view :style="[{overflow:'scroll',  height:'calc(100vh - ' + CustomBar + 'px)'}]" class="cu-list menu text-left">
						    <view  class="cu-item">
						    	<!-- 搜索框 -->
						    	<view class="cu-bar bg-white search ">
						    		<view class="search-form round">
						    			<text class="cuIcon-search"></text>
						    			<input v-model="searchKeyword" type="text" placeholder="关键词" confirm-type="search"></input>
						    		</view>
						    		<view class="action">
						    			<button @click="filterCustomer()" class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
						    		</view>
						    	</view>
						    	<!-- 搜索框 -->
						    </view>
							<view @click="getSelectCustomerInfo(item)"  class="cu-item arrow" v-for="(item,index) in customerList" :key="index">
								<view  style="overflow: scroll;" class="content">
									<view v-text="item.ct_Desc"></view>
								</view>
							</view>
						
					</view>
			
			</view>
			
		</view>
		
		<!-- 产品类型列表 -->
		<view @tap="isShowProList=false" class="cu-modal drawer-modal justify-start" :class="isShowProList ?'show':''">
			
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				
					<view :style="[{overflow:'scroll',  height:'calc(100vh - ' + CustomBar + 'px)'}]" class="cu-list menu text-left">
						
							<view @click="getSelectProtypeInfo(item)"  class="cu-item arrow" v-for="(item,index) in productType" :key="index">
								<view  style="overflow: scroll;" class="content">
									<view v-text="item.ct_Desc"></view>
								</view>
							</view>
						
					</view>
			
			</view>
			
		</view>
			
	</view>
</template>

<script>
	/**
	 * 搜索框
	 * */
	 import { getDate, dataDiff } from "@/libs/tools";
	 import dayjs from 'dayjs'
	 import wPicker from "@/components/w-picker/w-picker.vue";
	 import {mapActions} from 'vuex'
	 export default {
		name:'searchForm',
		components:{wPicker},
		props:{
			//搜索条件：
			//ct_Type(客户类型)0:全部,1:纸箱,2:纸板,3:蜂窝 多个逗号分开
			customerType:{
				type:String,
				default:'0'
			},
			needSalemanList:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			//时刻监控字段 
			searchKeyword(newVal,oldVal){
				if(newVal.length==0){
				  return this.customerList = this.customerList_filter
				}
			},
			//时刻监控字段 
			searchKeyword_sale(newVal,oldVal){
				if(newVal.length==0){
				  return this.SalesmanSearch.SalesmanList = this.saleList_filter
				}
			}
		},
		data() {
			return {
				currentFilterType:'',//当前查询类型：周 week 月 month 季 season 是否选择，选中为 primary
				SalesmanSearch:{
					SalesmanItemText:'',
					SalesmanItem:{},
					SalesmanItemId:'',
					isShow:false,//是否显示业务员列表
					SalesmanList:[],//业务员列表
				},
				isShowProList:false,
				productTypeText:'纸板',
				productTypeItem:{},
				productType:[{type:'1',ct_Desc:'纸板'},{type:'2',ct_Desc:'纸箱'}],//产品类型(1纸板,2纸箱...)
				endYear:dayjs(Date.now()).format('YYYY'),//当前年份
				CustomBar: this.CustomBar, //uni-app :内置属性，bar :高度
				isShowCustomerList:false,//是否显示客户信息列表
				isShowSearchForm:false,//当前是否打开状态
				customerList:[],//客户列表
				searchKeyword:'',//过滤关键字
				searchKeyword_sale:'',//过滤关键字
				customerList_filter:[],//客户列表
				saleList_filter:[],//业务员列表COPY
				startDate:dayjs(Date.now()).subtract(1, 'month').format('YYYY-MM-DD'),//开始时间
				endDate:dayjs(Date.now()).format('YYYY-MM-DD'),//结束时间
				customerInfo:'',//客户信息
				customerItem:{},//客户信息 对象
				dataType:'start',//开始时间:start,结束时间:end
				
			}
		},
		// #ifdef H5
		mounted() {
		
		},
		// #endif
		// #ifndef H5
		onReady() {
		
		},
		// #endif
		methods: {
			//过滤用户
			filterCustomer(){
				if(this.searchKeyword.length>0){
					this.customerList = this.customerList.filter(item=>{
						return item.ct_Desc.includes(this.searchKeyword)
					})
				}else{
					this.customerList = this.customerList_filter
				}
			},
			//业务员过滤
			filterSaleList(){
				if(this.searchKeyword_sale.length>0){
					this.SalesmanSearch.SalesmanList = this.SalesmanSearch.SalesmanList.filter(item=>{
						return item.w_Name.includes(this.searchKeyword_sale)
					})
				}else{
					this.SalesmanSearch.SalesmanList = this.saleList_filter
				}
			},
			//切換按鈕事件 周 月 季
			handleFilterData(type){
				//debugger
			    this.currentFilterType =type
			    switch(type){
			      case 'week':
			        this.startDate =dayjs(Date.now()).startOf('week').format('YYYY-MM-DD')
			        this.endDate =dayjs(Date.now()).format('YYYY-MM-DD')
			         break
			      case 'month':
			        this.startDate =dayjs(Date.now()).startOf('month').format('YYYY-MM-DD')
			        this.endDate =dayjs(Date.now()).format('YYYY-MM-DD')
			        break 
			      case 'season':
			        this.startDate =dayjs(Date.now()).subtract(3, 'month').format('YYYY-MM-DD')
			        this.endDate =dayjs(Date.now()).format('YYYY-MM-DD')
			        break
			    }
			},
			...mapActions(['getSalesmanList_action','getCustomerInfo_action','getQutationCustomerList_action']),
			//验证两个输入的日期 是否有效
			checkInputData() {
			  let flag = true;
			  let msg = "";
			  if (this.startDate == "" || this.endDate == "") {
			    msg = "起始/结束日期必填";
			    flag = false;
			  } else if (this.startDate != "" || this.endDate != "") {
			    let date1 = this.stringToDate(this.startDate);
			    let date2 = this.stringToDate(this.endDate);
			    let diff = dataDiff("d", date1, date2);
			    if (diff > 730) {
			      msg = "时间间隔不能超过2年";
			      flag = false;
			    }
			    if (diff < 0) {
			      msg = "结束日期必须大于起始日期";
			      flag = false;
			    }
			  }
			
			  if (msg != "") {
			    uni.showToast({
			    	title:msg,
					icon:'none',
					duration:2000
			    })
			  }
			  return flag;
			},
			//字符串转日期
			stringToDate(dateStr, separator) {
			  if (!separator) {
			    separator = "-";
			  }
			  let dateArr = dateStr.split(separator);
			  let year = parseInt(dateArr[0]);
			  let month;
			  //处理月份为04这样的情况
			  if (dateArr[1].indexOf("0") == 0) {
			    month = parseInt(dateArr[1].substring(1));
			  } else {
			    month = parseInt(dateArr[1]);
			  }
			  let day = parseInt(dateArr[2]);
			  let date = new Date(year, month - 1, day);
			  return date;
			},
			getSalesmanList(){
				if(this.SalesmanSearch.SalesmanList.length>0){
					return
				}
				//搜索条件：
				//w_OptType(类型)0:业务员,其它 暂时 没有
				let params ={
					w_OptType: 0
				}
				
				this.getSalesmanList_action(params).then(res=>{
					//debugger
					this.SalesmanSearch.SalesmanList =res.records
					this.saleList_filter = [...this.SalesmanSearch.SalesmanList]
				}).catch(err=>{
					uni.showToast({
						title:'获取业务员列表失败 err:'+err,
						icon:'none',
						duration:2000
					})
				})
			},
			// loadCustomerList(){
			// 	//debugger
			// 	if(this.customerList.length>0){
			// 		//debugger
			// 		return
			// 	}
			// 	let params ={}
			// 	this.getCustomerInfo_action(params).then(res=>{
			// 		this.customerList =res
			// 	}).catch(err=>{
			// 		uni.showToast({
			// 			title:'获取客户列表失败 err:'+err,
			// 			icon:'none',
			// 			duration:2000
			// 		})
			// 	})
			// },
			loadCustomerList(){
				if(this.customerList.length>0){
					return
				}
				//搜索条件：
				//ct_Type(客户类型)0:全部,1:纸箱,2:纸板,3:蜂窝 多个逗号分开
				let params ={
					ct_Type:0// this.customerType
				}
				
				this.getQutationCustomerList_action(params).then(res=>{
					//debugger
					this.customerList =res.records
					this.customerList_filter = [...this.customerList] 
				}).catch(err=>{
					uni.showToast({
						title:'获取客户列表失败 err:'+err,
						icon:'none',
						duration:2000
					})
				})
			},
			//获取选择的业务员信息
			getSalesmanInfo(val){
				this.SalesmanSearch.isShow =false
				this.SalesmanSearch.SalesmanItemText =val.w_Name
				this.SalesmanSearch.SalesmanItemId =val.w_ID
				this.SalesmanSearch.SalesmanItem =val
			},
			//获取选择的客户信息
			getSelectCustomerInfo(val){
				this.isShowCustomerList =false
				this.customerInfo = val.ct_Desc
				this.customerItem =val
				//console.warn('currentItem:'+val.ct_ID)
			},
			//获取选择的产品类型信息
			getSelectProtypeInfo(val){
				this.isShowProList =false
				this.productTypeText = val.ct_Desc
				this.customerItem =val
				//console.warn('currentItem:'+val.ct_ID)
			},
			//打开客户信息
			openCustomerList(){
				this.isShowCustomerList =true
				this.loadCustomerList()
			},
			//打开业务员列表
			openSalesmanList(){
				this.SalesmanSearch.isShow = true
				 this.getSalesmanList()
			},
			//弹出时间选择器
			openDateSelect(type){
				this.dataType =type
				this.$refs.DatePicker.show();
			},
			//时间确认-回调事件
			onConfirmDate(val){
				//console.log('date now:'+ JSON.stringify(val))
				if(this.dataType==='start'){
					this.startDate =val.result
				}else{
					this.endDate = val.result
				}
			},
			//确认搜索-回调事件
			comfirmEvent(){
				//debugger
				if(!this.checkInputData()){
					return
				}
				this.isShowSearchForm = false
				let params = {
				  ct_SalerId:this.SalesmanSearch.SalesmanItemId,
				  startDate:this.startDate,
				  endDate:this.endDate,
				  ctCode:this.customerItem.ct_ID === null ?'':this.customerItem.ct_ID
				}
				if(this.customerInfo==''){
					params.ctCode=''
				}
				this.$emit('comfirmEvent',params)
			},
			cancelEvent(){
				this.isShowSearchForm=false
				this.$emit('cancelEvent','cancel')
			},
			//显示搜索框
			open(){
				this.isShowSearchForm = true
			},
			//关闭搜索框
			close(){
				this.isShowSearchForm = false
			}
		}
	}
</script>

<style>

</style>
