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
							<view class="title">开始日期</view>
							<input disabled="true" placeholder="输入开始日期" v-model="startDate" name="input"></input>
							<button @click="openDateSelect('start')" class='cu-btn bg-green shadow'>日期</button>
						</view>
						<view class="cu-form-group">
							<view class="title">结束日期</view>
							<input disabled="true" v-model="endDate" placeholder="输入框结束日期" name="input"></input>
							<button @click="openDateSelect('end')" class='cu-btn bg-green shadow'>日期</button>
						</view> -->
						<view class="cu-form-group">
							<view class="title">客　户 <text style="color: red;margin-left: 10rpx;">*</text></view>
							<input disabled v-model="customerInfo" placeholder="请选择客户" name="input"></input>
							<!-- <button @click="customerInfo=''" class='margin-right cu-btn round line-green'>清空</button> -->
							<button @click="openCustomerList" class='cu-btn bg-green shadow'>选择</button>
							
						</view>
						<view v-if="isBoxArea" class="cu-form-group">
							<view class="title">纸　　质</view>
							<input v-model="bi_ArtID" placeholder="请输入纸质" name="input"></input>
							<button @click="bi_ArtID=''" class='cu-btn round line-green'>清空</button>
						</view>
						<view v-if="isBoxProduct" class="cu-form-group">
							<view class="title">产品编号</view>
							<input v-model="ui_UPNo" placeholder="请输入产品编号" name="input"></input>
							<button @click="ui_UPNo=''" class='cu-btn round line-green'>清空</button>
							
						</view>
						<view v-if="isBoxProduct" class="cu-form-group">
							<view class="title">产品名称</view>
							<input v-model="ui_UPName" placeholder="请输入产品名称" name="input"></input>
							<button @click="ui_UPName=''" class='cu-btn round line-green'>清空</button>
							
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
			isBoxArea:{ // 纸质面积报价
				type:Boolean,
				default:false
			},
			isBoxProduct:{ //纸箱产品报价
				type:Boolean,
				default:false
			},
		},
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
				bi_ArtID:'',//纸质
				ui_UPName:'',//产品名称
				ui_UPNo:'',//产品编号
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
			...mapActions(['getQutationCustomerList_action']),
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
					ct_Type:'1'
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
				//console.warn('currentItem:'+val.ct_ID)
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
				  bi_ArtID:this.bi_ArtID,//纸质
				  ui_UPName:this.ui_UPName,//产品名称
				  ui_UPNo:this.ui_UPNo,//产品编号
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
