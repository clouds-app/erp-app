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
							<view class="title">客户类型</view>
							<input disabled v-model="productTypeText" placeholder="请选择类型(纸板,纸箱...)" name="input"></input>
							<button @click="isShowProList=true" class='cu-btn bg-green shadow'>选择</button>
						</view> -->
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
							<view class="title">纸　　质</view>
							<input  v-model="paperQuality" placeholder="请输入纸质" name="input"></input>
							<button @click="paperQuality=''" class='cu-btn round line-green'>清空</button>
						</view>
						<view class="cu-form-group">
							<view class="title">纸　　宽</view>
							<input  v-model="paperWide" placeholder="请输入纸宽" name="input"></input>
							<button @click="paperWide=''" class='cu-btn round line-green'>清空</button>
						</view>
						<view class="cu-form-group">
							<view class="title">纸　　长</view>
							<input  v-model="paperLong" placeholder="请输入纸长" name="input"></input>
							<button @click="paperLong=''" class='cu-btn round line-green'>清空</button>
						</view>
						<view class="cu-form-group">
							<view class="title">数 量(片)</view>
							<input  v-model="paperNum" placeholder="请输入数量(片)" name="input"></input>
							<button @click="paperNum=''" class='cu-btn round line-green'>清空</button>
						</view>
						<view class="cu-form-group">
							<view class="title">PO　　号</view>
							<input  v-model="paperPO" placeholder="请输入PO号" name="input"></input>
							<button @click="paperPO=''" class='cu-btn round line-green'>清空</button>
						</view>
						<view class="cu-form-group">
							<view class="title">订单类型</view>
							<input disabled v-model="orderTypeText" placeholder="请选择订单类型" name="input"></input>
							<!-- <button @click="orderTypeText=''" class='margin-right cu-btn round line-green'>清空</button> -->
							<button @click="isShowOrderTypeList=true" class='cu-btn bg-green shadow'>选择</button>
							
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


		<!-- 客户类型列表 -->
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
		
		<!-- 订单类型列表 -->
		<view @tap="isShowOrderTypeList=false" class="cu-modal drawer-modal justify-start" :class="isShowOrderTypeList ?'show':''">
			
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				
					<view :style="[{overflow:'scroll',  height:'calc(100vh - ' + CustomBar + 'px)'}]" class="cu-list menu text-left">
						
							<view @click="getSelectOrderType(item)"  class="cu-item arrow" v-for="(item,index) in orderType" :key="index">
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
		
		watch:{
			//时刻监控字段
			searchKeyword(newVal,oldVal){
				//debugger
				if(newVal.length==0){
				//	debugger
				  return	this.customerList = this.customerList_filter
				}
			}
		},
		data() {
			return {
				paperNum:'',//数量(片)
				paperPO:'',//PO号
				paperLong:'',//纸长
				paperWide:'',//纸宽
				paperQuality:'',//纸质
				paperType:'0', //全部
				isShowProList:false,
				productTypeText:'纸板',
				productTypeItem:{},
				productType:[
					{type:'0',ct_Desc:'全部'},
					{type:'1',ct_Desc:'纸箱'},
					{type:'2',ct_Desc:'纸板'},
					{type:'3',ct_Desc:'蜂窝'},
					],//(客户类型)0:全部,1:纸箱,2:纸板,3:蜂窝 多个逗号分开)
				isShowOrderTypeList:false,
			    orderTypeText:'全部',
			    orderTypeItem:{},
				orderType:[
					{type:'0',ct_Desc:'全部'},
					{type:'1',ct_Desc:'已完成'},
					{type:'2',ct_Desc:'未完成'},
					],//(客户类型)0:全部,1:纸箱,2:纸板,3:蜂窝 多个逗号分开)
				endYear:dayjs(Date.now()).format('YYYY'),//当前年份
				CustomBar: this.CustomBar, //uni-app :内置属性，bar :高度
				isShowCustomerList:false,//是否显示客户信息列表
				isShowSearchForm:false,//当前是否打开状态
				customerList:[],//客户列表
				searchKeyword:'',//过滤关键字
				customerList_filter:[],//客户列表
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
			//获取选择的产品类型信息
			getSelectProtypeInfo(val){
				this.isShowProList =false
				this.productTypeText = val.ct_Desc
				this.productType =val
			},
			//获取选择的订单类型
			getSelectOrderType(val){
				this.isShowOrderTypeList =false
				this.orderTypeText = val.ct_Desc
				this.paperType = val.type
				this.orderTypeItem =val
			},
			...mapActions(['getCustomerInfo_action']),
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
			loadCustomerList(){
				if(this.customerList.length>0){
					return
				}
				//搜索条件：
				//ct_Type(客户类型)0:全部,1:纸箱,2:纸板,3:蜂窝 多个逗号分开
				let params ={
					ct_Type:'0'
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
			//获取选择的客户信息
			getSelectCustomerInfo(val){
				this.isShowCustomerList =false
				this.customerInfo = val.ct_Desc
				this.customerItem =val
			},
			
			//打开客户信息
			openCustomerList(){
				this.isShowCustomerList =true
				this.loadCustomerList()
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
				  DateFr:this.startDate,
				  DateTo:this.endDate,
				  Qty:this.paperNum,//数量(片)
				  PO:this.paperPO,//PO号
				  SizeL:this.paperLong,//纸长
				  SizeW:this.paperWide,//纸宽
				  ArtID:this.paperQuality,//纸质
				  NoDeli:this.paperType, //全部
				  Spec:this.paperWide+'*'+this.paperLong// (规格，未填写的时候，传入空字符串， 格式为 宽*长)
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
