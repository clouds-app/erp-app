<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true"><block slot="content">工序扫描入库通用版</block></cu-custom>
		<view>
			<view>
				<view class="border-bottom">
					<view class="grid-title">工单详情</view>
					<view class="grid-body">
						<selectDropdown
							@onChange="onChangeInToCache"
							:componentConfig="{tokenKey:'wp.classDrawer'}"
							:defaultValue = 'formItem.team'
							:otherHeight='CustomBarHeight' 
							ref="classDrawer"
							url="appFindClassBan"
							title="班ㅤㅤ别"
							placeholdertext="请选择班别"
							v-model='formItem.teamId'
							:params='params'
							@closeMain='getWorkList'
						></selectDropdown>
						<selectDropdown
							@onChange="onChangeInToCache"
							:componentConfig="{tokenKey:'wp.ProdutDrawer'}"
							:defaultValue = 'formItem.ProdutName'
							:otherHeight='CustomBarHeight' 
							ref="ProdutDrawer"
							url="appFindWorkProcListMain"
							title="工序大类"
							placeholdertext="请选择工序大类"
							v-model='formItem.ProdutId'
							@closeMain='closeMain'
							:params="{modelCode:'workProc_in',pageSize:100,pageNum:1}"
						></selectDropdown>
						<selectDropdown
							@onChange="onChangeInToCache"
							:componentConfig="{tokenKey:'wp.wplDrawer'}"
							:defaultValue = 'formItem.wpl'
							:otherHeight='CustomBarHeight' 
							ref="wplDrawer"
							url="appFindWorkProcList"
							title="计价工序"
							placeholdertext="请选择计价工序"
							v-model='formItem.wplId'
							:Reload='true'
							:params='machineparams'
							@judge="judge"
							@closeMain='changewpl'
						></selectDropdown>
						<selectDropdown
							@onChange="onChangeInToCache"
							:componentConfig="{tokenKey:'wp.machineDrawer'}"
							:defaultValue = 'formItem.machine'
							:otherHeight='CustomBarHeight' 
							ref="machineDrawer"
							url="appFindMachineOrder"
							title="机ㅤㅤ台"
							placeholdertext="请选择机台"
							v-model='formItem.machineId'
							:Reload='true'
						></selectDropdown>
						<view class="flex border-top">
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">工ㅤ价:</view>
									<input :disabled="true" :value="boxHalfProdIn.wpl_WorkPrice">{{boxHalfProdIn.wpl_WorkPriceUnitName}}</input>
								</view>
							</view>
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">计件系数:</view>
									<input @blur="YxStrChange" v-model="boxHalfProdIn.wplAssNum"/>
								</view>
							</view>
						</view>
						<view class="flex border-top">
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">工单号:</view>
									<input v-model="boxHalfProdIn.hp_bi_WorkNo" @blur="findGoods" placeholder="请输入工单号" />
									<button @click="turnOnScanCode('in')" type="primary" size="mini">扫描</button>
								</view>
							</view>
						</view>
						<view class="flex border-top">
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">入库数:</view>
									<input type="number" v-model="boxHalfProdIn.YxStr" placeholder="请输入入库数"/>
								</view>
							</view>
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">面ㅤ积:</view>
									<input :disabled="true" v-model="boxHalfProdIn.area"/>
								</view>
							</view>
						</view>
						<view class="flex border-top">
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">不良数:</view>
									<input type="number" v-model="boxHalfProdIn.defectsNum" placeholder="请输入不良数"/>
								</view>
							</view>
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">工ㅤ资:</view>
									<input :disabled="true" v-model="boxHalfProdIn.monny"/>{{mainmonny}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<br />
		<!-- 扫描工单信息 -->
		<!-- <view class="grid-body"> -->
		<!-- <view class="border-bottom"> -->
			<view  class="grid-body" v-for="(item,index) in fromdata" :key='index'>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">客ㅤ户：{{item.ct_Desc}}</view>
						</view>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">产品编号：{{item.bi_ProdNo}}</view>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">盒ㅤ式：{{item.bp_CBoxID}}</view>
						</view>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<text class="title">名ㅤ称：{{item.bi_ProdName}}</text>
						</view>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">工单数：{{item.bp_ProQty}}</view>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<text class="title">本工序已入数：{{item.bw_certifiedQty}}</text>
						</view>
					</view>
				</view>
			</view>
			<br />

			<view class="border-bottom">
				<view class="grid-title">
					<view>人员列表</view>
					<view>
						<button @click="adjustment" class="bank-rest" type="primary" size="mini">调整</button>
					</view>
				</view>
				<view>
					<v-table
						:row-class-name="rowClassNameFn"
						:columns="findGoodsColumns" 
						:list="paperOutTableDataItems" 
						selection="single"
						:td-width="150"
						>
						<!--单选 :height="200"	@on-selection-change='onClick' -->
					</v-table>
				</view>
			</view>
		</view>
		<view style="height: 50px;"></view>
		<!-- <view class="margin-text-center" style="padding: 40rpx;"><button @tap="prodInProvider" type="primary" class="primary-btn">入仓</button></view> -->
		<!-- 底部操作框 -->
		<view class="xunhoubtm elBtn">
			<view style="margin-left: 10px;">
				<button class="bank-rest" @tap="restFrom" type="primary" size="mini">清除</button>
			</view>
			<view style="margin-right: 10px;">
				<button :disabled="disable" @click="SubmitData" class="bank-rest" type="primary" size="mini">确认</button>
			</view>
		</view>
		<!--  侧边搜索列表 -->
		<!-- <searchForm @getSelectDataInfo="getSelectDataInfo" :dataSource="dataSource" ref='searchForm'></searchForm> -->
	</view>
</template>

<script>
import baseMixin from '@/mixins';
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
// import searchForm from '@/components/searchForm/searchDataList.vue.vue'
import vTable from "@/components/table.vue"
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import {emptyValidator} from '@/utils/validator.js'
const defaultformItem={
							wpl:'',//工序
							wplId:'',//工序id
							machine:'',//机台
							machineId:'',//机台id
							team:'',//班别
							teamId:'',//班别id
							ProdutName:'',//生产工序
							ProdutId:'',//生产工序
						}
export default {
	components: {  cuCustom, uniDrawer, uniList, uniListItem, uniSearchBar,vTable,selectDropdown },
	mixins: [baseMixin],
	data() {
		return {
			machineparams:{},//机台过滤参数
			params:{
				type:"1",
				procType:'',
				modelCode:'workProc_in'
			},//班别下拉接口参数
			otherHeight:0,//title高度
			disable:true,
			dataSource:[],//数据源
			paperOutTableDataItems:[],//人员数据列表
			findGoodsColumns: [
				{
					key: 'Serial',
					title: '序号',
					$width: 80,
					titleAlign: 'center',
					columnAlign: 'center'
					// $fixed:'left'	
				},
				{
					key: 'w_ID',
					title: '编号',
					$width: 180,
					titleAlign: 'center',
					columnAlign: 'center'
				},
				{
					key: 'w_Name',
					title: '姓名',
					$width: 180,
					titleAlign: 'center',
					columnAlign: 'center'
				},
				{
					key: 'tt_quotient',
					title: '工分',
					$width: 158,
					titleAlign: 'center',
					columnAlign: 'right'
				},
				{
					key: 'money',
					title: '人员工资',
					$width: 158,
					titleAlign: 'center',
					columnAlign: 'right'
				},
			],
			formItem:Object.assign({},defaultformItem),
			fromdata:[],//工单扫描信息
			boxHalfProdIn: {
				wpl_WorkPriceUnitName:'',//工价单位
				wplAssNum:1,//计件系数
				defectsNum:0,//不良数
				monny:'',//工资
				area:'',//面积
				wpl_WorkPriceUnit:'',//工价单位
				YxStr:'',//入库数
				wpl_WorkPrice:'',//工价
				hp_bi_WorkNo: '', //工单号
				hp_wpl_Id: '', //工序编
				hp_mo_ID: '', //机台编
				hp_tt_Code: '', //班别编
				Qty: '', //工单数
				Remark: '' //备注
			},
		};
	},
	computed: {
		mainmonny() {
			let data = this.boxHalfProdIn.YxStr
			return this.getmonny(data)
		}
	},
	watch:{
		// 'boxHalfProdIn.YxStr'(n,o){
		// 	this.getmonny()
		// },
		// 计件系数 设置缓存
		'boxHalfProdIn.wplAssNum'(n,o){
			this.cache.put('wp.wplAssNum',n)
		},
		// 工价 设置缓存
		'boxHalfProdIn.wpl_WorkPrice'(n,o){
			this.cache.put('wp.wpl_WorkPrice',n)
		},
		// 工价单位
		'boxHalfProdIn.wpl_WorkPriceUnit'(n,o){
			this.cache.put('wp.wpl_WorkPriceUnit',n)
		},
		// 工价单位显示 设置缓存
		'boxHalfProdIn.wpl_WorkPriceUnitName'(n,o){
			this.cache.put('wp.wpl_WorkPriceUnitName',n)
		},
		'formItem.ProdutId'(n,o){
			if(n != o && !!o){
				this.closerest()
				this.cache.put('wp.machineDrawer','')
				this.cache.put('wp.wplDrawer','')
				return;
			}
			return;
		},
		'formItem.wplId'(n,o){
			if(n != o){
				this.closewplrest()
				return;
			}
			return;
		}
	},
	mounted() {
		// debugger
		// this.getTableHeight();
	    this.$nextTick(()=>{
			this.setDefaultValue()
	    })
		
	},
	onShow(){
		// debugger
		this.getmonny();
		// this.getTableHeight();
	},
	
	onReady() {
		// debugger
	},
	methods: {
		// 自定义某行样式
		rowClassNameFn(row, index) {
			if (Number(index) % 2 == 0) {
				return 'table-single-row';
			} 
			return '';//'table-double-row';
		},
		// 从缓存中读取上次填充的初始值
		setDefaultValue(){
		   // 班别
		   let classDrawerItem = this.cache.get('wp.classDrawer')
		   if(classDrawerItem){
			   let itemKey = Object.keys(classDrawerItem)
			   this.formItem.team = classDrawerItem[itemKey[0]]
			   this.formItem.teamId = classDrawerItem[itemKey[1]]
			   if(!!this.formItem.teamId){
				   this.getWorkList()
			   }
		   }
		   // 工序大类
		   let ProdutDrawer = this.cache.get('wp.ProdutDrawer')
		   if(ProdutDrawer){
			   let itemKey = Object.keys(ProdutDrawer)
			   this.formItem.ProdutName = ProdutDrawer[itemKey[0]]
			   this.formItem.ProdutId = ProdutDrawer[itemKey[1]]
		   }
		   // 计件系数
		   let wplAssNum = this.cache.get('wp.wplAssNum')
		   if(!!wplAssNum){
		   		this.boxHalfProdIn.wplAssNum = wplAssNum
		   }
		   // 计价工序
		   let wplDrawer = this.cache.get('wp.wplDrawer')
		   if(wplDrawer){
			   let itemKey = Object.keys(wplDrawer)
			   this.formItem.wpl = wplDrawer[itemKey[0]]
			   this.formItem.wplId = wplDrawer[itemKey[1]]
			   let dataParams = {
			   	   type:this.formItem.wplId,
				   wplAssNum:this.boxHalfProdIn.wplAssNum
			   }
			   if(!!dataParams.type){
				  this.closeMain(dataParams)
			   }
		   }
		   // 机台
		   let machineDrawer = this.cache.get('wp.machineDrawer')
		   if(machineDrawer){
			   let itemKey = Object.keys(machineDrawer)
			   this.formItem.machine = machineDrawer[itemKey[0]]
			   this.formItem.machineId = machineDrawer[itemKey[1]]
		   }
		 
		   //工价
		   let wpl_WorkPrice = this.cache.get('wp.wpl_WorkPrice')
		   if(!!wpl_WorkPrice){
		   		this.boxHalfProdIn.wpl_WorkPrice = wpl_WorkPrice
		   }
		   //工价单位
		   let wpl_WorkPriceUnit = this.cache.get('wp.wpl_WorkPriceUnit')
		   if(!!wpl_WorkPriceUnit){
		   		this.boxHalfProdIn.wpl_WorkPriceUnit = wpl_WorkPriceUnit
		   }
		   //工价单位显示
		   let wpl_WorkPriceUnitName = this.cache.get('wp.wpl_WorkPriceUnitName')
		   if(!!wpl_WorkPriceUnitName){
		   		this.boxHalfProdIn.wpl_WorkPriceUnitName = wpl_WorkPriceUnitName
		   }
		  
		},
		//计价工序回调事件
		changewpl(data){
			this.boxHalfProdIn.wpl_WorkPrice = data.wpl_WorkPrice//工价
			this.boxHalfProdIn.wpl_WorkPriceUnit = data.wpl_WorkPriceUnit//工价单位
			this.boxHalfProdIn.wpl_WorkPriceUnitName = data.wpl_WorkPriceUnitName//工价单位显示
			this.boxHalfProdIn.wplAssNum = data.wplAssNum//计件系数
			this.$refs.machineDrawer.getdataArray({wplID:data.type})
		},
		//选择计价工序校验
		judge(){
			if(this.formItem.ProdutId){
				return true
			}
			this.$refs.machineDrawer.$data.modalName = null
			this.$refs.wplDrawer.$data.modalName = null
			this.toast.message('请选择工序大类')
			return false
		},	
		//工序大类回调事件
		closeMain(data){
			this.machineparams = {
				wplID:data.type,
				modelCode:'workProc_in',
				pageSize:100,
				pageNum:1
			}
			// this.boxHalfProdIn.wplAssNum = data.wplAssNum//计件系数
		   // this.$refs.machineDrawer.getdataArray(this.machineparams)
			this.closerest()
		   this.$refs.wplDrawer.getdataArray(this.machineparams)
			// this.getwplArray()
		},
		// 重选计价工序清除事件
		closewplrest(){
			this.boxHalfProdIn.hp_bi_WorkNo = ''
			this.getmonny()
		},
		// 重选工序大类清除事件
		closerest(){
			this.boxHalfProdIn.wpl_WorkPriceUnitName = '';//工价
			this.$refs.machineDrawer.clearFromData()//清空机台
			this.$refs.wplDrawer.clearFromData()//清空计价工序
			this.formItem.machineId = ''
			// this.formItem.wplId = ''
			this.boxHalfProdIn.wpl_WorkPrice = ''
			this.boxHalfProdIn.monny = 0
			this.fromdata = [],//工单扫描信息
			this.getSubMonny()
		},
		//获取计价工序
		getwplArray(){
			this.toast.loading();
			request.post(`/warehouse/warehouse/execute/appFindWorkProcPriceItem`,this.machineparams).then(res=>{
				if(res.list.length != 0){
					if(res.list.length == 1){
						this.toast.hide();
						this.$refs.wplDrawer.$data.modalArry = res.list
						this.formItem.wplId = res.list[0].value
						this.boxHalfProdIn.wpl_WorkPrice = res.list[0].wpl_WorkPrice//工价
						this.boxHalfProdIn.wpl_WorkPriceUnit = res.list[0].wpl_WorkPriceUnit//计价单位方式
						this.boxHalfProdIn.wpl_WorkPriceUnitName = res.list[0].wpl_WorkPriceUnitName//工价单位显示
						return;
					}else{
						this.toast.hide();
						this.$refs.wplDrawer.$data.modalArry = res.list
						return;
					}
				}else{
					this.toast.hide();
					this.toast.message('没有对应的计价工序，请重新选择！')
					return;
				}
			}).catch(err=>{
				this.toast.hide();
				this.toast.message('数据加载失败')
				return;
			})
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
		  let otherHeight= await _self.getOtherContentHeight("titlefrom")
		  console.log(otherHeight)
		},
		// 提交检验 
		checkSubmitData(){
			if(this.formItem.teamId == ''){
				this.toast.message('请选择班别')
				return false
			}
			if(this.formItem.machineId== ''){
				this.toast.message('请选择机台')
				return false
			}
			if(this.formItem.ProdutId == ''){
				this.toast.message('请选择生产工序')
				return false
			}
			if(this.formItem.wplId == ''){
				this.toast.message('请选择计价工序')
				return false
			}
			if(this.boxHalfProdIn.YxStr == ''){
				this.toast.message('请输入库数')
				return false
			}
			if(this.boxHalfProdIn.defectsNum === ''){
				this.toast.message('请输入不良数')
				return false
			}
			if(this.boxHalfProdIn.hp_bi_WorkNo == ''){
				this.toast.message('请扫描工单号')
				return false
			}
			return true
		},
		// 提交数据
		SubmitData(){
			let check = this.checkSubmitData()
			if(!check){
				return
			}
			this.toast.loading();
			let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
			let data = {
				hp_bi_WorkNo:this.boxHalfProdIn.hp_bi_WorkNo,
				hp_wpl_Id:this.formItem.wplId,//计价工序
				hp_mo_ID:this.formItem.machineId,//机台编号
				hp_tt_Code:this.formItem.teamId,//班别编号
				Qty:this.boxHalfProdIn.YxStr,//入库输
				userName:user.erpUserCode,//用户
				jpWorkPrcNo:'',
				workPay:this.boxHalfProdIn.monny,//工资
				uncertifiedQty:this.boxHalfProdIn.defectsNum,//不良数
				// prodQty:this.fromdata[0].workproc,//本工序数
				priorcertifiedQty:this.fromdata[0].bp_ProQty ,//上工序数量
				wplAssNum:this.boxHalfProdIn.wplAssNum,//计件系数
			}
			let list = this.paperOutTableDataItems
			request.post('/hpws/saveWorkHpws',{data,list}).then(res=>{
				// console.log(res)
				if(res.list[0].ErrorStr == "1"){
					this.restFrom()
					this.disable = true
					this.toast.hide();
					this.toast.message('入库成功')
					// console.log(111)
				}else{
					this.restFrom()
					this.disable = true
					this.toast.hide();
					this.toast.message('入库失败');
					// console.log(222)
				}
			}).catch(err => {
					this.restFrom()
					this.disable = true
					this.toast.hide();
					this.toast.message('入库失败');
					// console.log(333)
			});
		},
		//保存人员数据
		getpaperOutTableDataItems(){
			let data = this.paperOutTableDataItems
			// 'updataItems',
			this.$store.commit('updataItems', data)
		},
		// 调整
		adjustment(){
			if(this.formItem.teamId == ''){
				this.toast.message('请选择班别');	
				return;
			}
			this.getpaperOutTableDataItems()
			uni.navigateTo({
				url: `adjustPersonnel?team=${this.formItem.team}&teamId=`+this. formItem.teamId
			})
		},
		//清除
		restFrom(){
			// this.formItem = defaultformItem;
			// this.boxHalfProdIn.wpl_WorkPrice = '';
			this.fromdata = [];
			this.boxHalfProdIn.hp_bi_WorkNo = '';
			this.formItem.YxStr = '';
			this.formItem.Remark = '';
			this.formItem. Qty = '';	
			this.boxHalfProdIn.YxStr = '';//入库数
			this.boxHalfProdIn.area = '';//面积
			this.boxHalfProdIn.monny = '';//工资
			this.boxHalfProdIn.defectsNum = 0;//不良数
			// this.boxHalfProdIn.wpl_WorkPriceUnitName = '';//计价工序显示单位
			for(let i = 0 ; i < this.paperOutTableDataItems.length; i++){
				this.paperOutTableDataItems[i].money = 0
			}
			
			// this.paperOutTableDataItems = [];
		},
		// 获取人员列表
		getWorkList(){
			let data = {
				workProcId:this.formItem.teamId
			}
			request.post(`/scan/getWorkList?workProcId=${this.formItem.teamId}`).then(res=>{
				// console.log(res)
				this.paperOutTableDataItems = res
				for(let i = 0; i<this.paperOutTableDataItems.length; i++){
					this.paperOutTableDataItems[i].Serial = i+1
					// console.log(this.findGoodsColumns)
				}
				this.getSubMonny();
			})
		},
		//打开扫描
		turnOnScanCode(type) {
			if(window !== undefined){
				this.toast.message('请在"e包装"公众号中下载APP后扫码!')
				return
			}
			let _self = this;
			// 调起条码扫描
			uni.scanCode({
				scanType: 'barCode',
				success: function(res) {
					let a = res.result.indexOf(',')
					let b = 0
					// console.log(a)
					if(a<0){
						b = res.result
					}else{
						b = res.result.substring(0,a)
					}
					console.log(b)
					// console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					switch (type) {
						case 'in': //入库
							_self.boxHalfProdIn.hp_bi_WorkNo = b;
							_self.findGoods();
							break;
						default:
							break;
					}
				}
			});
		},
		//工单号失去焦点
		findGoods(){
			if(this.formItem.wplId == ''){
				this.toast.message('请选择计价工序')
				return
			}
			let data = {
				bi_WorkNo:this.boxHalfProdIn.hp_bi_WorkNo,//工单号
				Flag:0,
				ProcID:'',//计价工序
				bc_No:'',//订单号
				workProcNo:this.formItem.wplId,//计价工序
			}
			this.getWorkorderdata(data)
		},
		//工单号查询
		getWorkorderdata(data){
			this.toast.loading();
			request.post('/warehouse/warehouse/execute/appBoxScanOrderWorkProc',data).then(res=>{
				if(res.list[0]){
					if(res.list[0].res === 1 ){
						this.fromdata = res.list
						let bp_ProQty = Number(res.list[0].bp_ProQty)
						let bw_certifiedQty = Number(res.list[0].bw_certifiedQty)
						if(bp_ProQty-bw_certifiedQty > 0){
							this.boxHalfProdIn.YxStr = bp_ProQty-bw_certifiedQty
						}else{
							this.boxHalfProdIn.YxStr = 0
						}
						this.getarea()
						this.getmonny()
						this.toast.hide();
						this.disable  = false
					}else{
						this.restFrom()
						this.toast.hide();
						this.boxHalfProdIn.hp_bi_WorkNo = '';
						this.toast.message('此工序无此工单')
					}
				}else{
					this.boxHalfProdIn.hp_bi_WorkNo = '';
					this.restFrom()
					this.toast.hide();
					this.toast.message('该工单号无数据')
				}
			}).catch(err=>{
				this.restFrom()
				this.toast.hide();
				this.toast.message('数据加载失败')
			})
		},
		// 获取工资 工价*数量
		getmonny(){
			if(this.boxHalfProdIn.wpl_WorkPrice==''){
				return
			}
			if(this.fromdata.length==0){
				return
			}
			if(this.boxHalfProdIn.YxStr==''){
				return
			}
			let data = {
				wpl_Id:this.formItem.wplId,//计价工序
				WorkNo:this.boxHalfProdIn.hp_bi_WorkNo, //--工单号 
				WorkQty:this.boxHalfProdIn.YxStr, //--生产数量 
				WorkPrice:this.boxHalfProdIn.wpl_WorkPrice,// --工价 
				SArea:this.fromdata[0].bp_SArea, //--单面积 
				AssNum:this.boxHalfProdIn.wplAssNum,//--计价系数 
				ParamNum:"0", //--工序参量（没有的话，默认0） 
				AProID:''
			}
			this.toast.loading();
			request.post('/warehouse/warehouse/execute/appSfGetWorkPay',data).then(res=>{
				if(res){
					this.boxHalfProdIn.monny = res.list[0].WorkPay
					this.toast.hide();
					this.getSubMonny()
				}else{
					this.boxHalfProdIn.monny  = 0
					this.toast.hide();
					this.toast.message('工资计算失败')
				}
			}).catch(err=>{
				this.toast.hide();
				this.toast.message('工资计算失败')
				this.boxHalfProdIn.monny  = 0
			})
		},
		//计算面积 单面积*数量
		getarea(){
			if(this.fromdata[0].bp_SArea==''){
				return
			}
			let YxStr =Number(this.boxHalfProdIn.YxStr)
			let bp_SArea =Number(this.fromdata[0].bp_SArea) //单面积
			this.boxHalfProdIn.area =JSON.parse((YxStr*bp_SArea).toFixed(2)) 
		},
		// 入库数变化
		YxStrChange(){
			if(this.fromdata.length == 0){
				this.toast.message('请先扫描工单')
				this.boxHalfProdIn.YxStr = ''
				return
			}
			let bp_ProQty = Number(this.fromdata[0].bp_ProQty)
			let bw_certifiedQty = this.fromdata[0].bw_certifiedQty
			if(this.boxHalfProdIn.YxStr == ''){
				this.boxHalfProdIn.YxStr = 0
			}
			this.getarea()
			this.getmonny()
		},
		// 人员列表工资
		getSubMonny(){
			if(this.boxHalfProdIn.monny===''){
				return;
			}
			let totalquotient = 0
			for(let i = 0; i<this.paperOutTableDataItems.length; i++){
				 totalquotient +=Number(this.paperOutTableDataItems[i].tt_quotient) //总工分
			}
			for(let q = 0; q<this.paperOutTableDataItems.length; q++){
				this.paperOutTableDataItems[q].money = ((this.paperOutTableDataItems[q].tt_quotient/totalquotient)*
				this.boxHalfProdIn.monny).toFixed(2)
			}
		},
	}
};
</script>

<style scoped>
.grid-title {
	margin-top: 0px !important;
}
.xunhoubtm {
	display: flex;
	justify-content:space-around;
	position: fixed;
	background-color: #FFFFFF;
	bottom: 0px;
	width: 100%;
	z-index: 2;
	
}
</style>
