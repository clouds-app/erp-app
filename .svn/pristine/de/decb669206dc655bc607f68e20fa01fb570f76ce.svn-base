<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true"><block slot="content">计工时</block></cu-custom>

		<view>
			<view>
				<view class="border-bottom">
					<view class="grid-title">工单详情</view>
					<view class="grid-body">
						<selectDropdown
							:otherHeight='otherHeight' 
							ref="classDrawer"
							url="appFindClassBan"
							title="班ㅤ别"
							placeholdertext="请选择班别"
							v-model='formItem.teamId'
							:params='params'
							@closeMain='getWorkList'
						></selectDropdown>
						<selectDropdown
							:otherHeight='otherHeight' 
							ref="wplDrawer"
							url="appFindWorkProcList"
							title="生产工序"
							placeholdertext="请选择生产工序"
							v-model='formItem.wplId'
							@closeMain='closeMain'
						></selectDropdown>
						<selectDropdown
							:otherHeight='otherHeight' 
							ref="machineDrawer"
							url="appFindMachineOrder"
							title="机台"
							placeholdertext="请选择机台"
							v-model='formItem.machineId'
							:params='machineparams'
							:Reload='true'
							@judge="judge"
						></selectDropdown>
						<!-- <view class="flex border-top">
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">生产工序:</view>
									<input @click="setSearchDataListSource('wpl')" :disabled="true" v-model="formItem.wpl" placeholder="请输入工序" />
									<text @click="setSearchDataListSource('wpl')" class="cuIcon-rounddown text-green"></text>
								</view>
							</view>
						</view> -->
						<!-- <view class="flex border-top">
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">机ㅤ台:</view>
									<input @click="setSearchDataListSource('machine')" :disabled="true" v-model="formItem.machine" placeholder="请输入机台" />
									<text @click="setSearchDataListSource('machine')" class="cuIcon-rounddown text-green"></text>
								</view>
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<br/>
			<view class="border-bottom">
				<view class="grid-title">
					<view>人员列表</view>
				</view>
				<view>
					<v-table
						:row-class-name="rowClassNameFn"
						:columns="findGoodsColumns" 
						:list="paperOutTableDataItems" 
						selection="single"
						:td-width="124"
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
			<view style="margin-left: 10px;">
				<button @click="adjustment" class="bank-rest" type="primary" size="mini">调整</button>
			</view>
			<view style="margin-right: 10px;">
				<button  @click="SubmitData" class="bank-rest" type="primary" size="mini">确认</button>
			</view>
		</view>
		<!--  侧边搜索列表 -->
		<searchForm @getSelectDataInfo="getSelectDataInfo" :dataSource="dataSource" ref='searchForm'></searchForm>
	</view>
</template>

<script>
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import searchForm from '@/components/searchForm/searchDataList.vue.vue'
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
						}
export default {
	components: { searchForm, cuCustom, uniDrawer, uniList, uniListItem, uniSearchBar,vTable,selectDropdown },
	data() {
		return {
			machineparams:{
				
			},//机台过滤参数
			params:{
				type:"1",
				procType:'',
				modelCode:'workTime_in'
			},//班别下拉接口参数
			otherHeight:0,//title高度
			dataSource:[],//数据源
			paperOutTableDataItems:[],//人员数据列表
			findGoodsColumns: [
				{
					key: 'Serial',
					title: '序号',
					$width: 80,
					// $fixed:'left'	
					titleAlign: 'center',
					columnAlign: 'center'
				},
				{
					key: 'w_ID',
					title: '编号',
					$width: 160,
					titleAlign: 'center',
					columnAlign: 'center'
				},
				{
					key: 'w_Name',
					title: '姓名',
					$width: 150,
					titleAlign: 'center',
					columnAlign: 'center'
				},
				{
					key: 'tt_quotient',
					title: '工分',
					$width: 110,
					titleAlign: 'center',
					columnAlign: 'right'
				},
				{
					key: 'hp_WorkTime',
					title: '工时',
					$width: 110,
					titleAlign: 'center',
					columnAlign: 'right'
				},
				{
					key: 'money',
					title: '人员工资',
					$width: 140,
					titleAlign: 'center',
					columnAlign: 'right'
				},
			],
			formItem:Object.assign({},defaultformItem),
			fromdata:[],//工单扫描信息
			// monnyList:[],//存储 wpl_WorkPrice:"工价"和 wpl_WorkPriceUnit:"工价单位"
			boxHalfProdIn: {
				wpl_WorkPriceUnit:'',//工价单位
				wpl_WorkPrice:'',//工价
				hp_bi_WorkNo: '', //工单号
				hp_wpl_Id: '', //工序编
				hp_mo_ID: '', //机台编
				hp_tt_Code: '', //班别编
			},
			baseData: {
				wplList: [], //工序列表
				machineList: [], //机台列表
			},
		};
	},
	mounted() {
		// debugger
		this.getTableHeight();
	},
	onLoad(option){
	},
	
	onShow(){
		// debugger
		this.getTableHeight();
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
		// 机台校验，是否选择工序
		// judge(){
		// 	if(this.formItem.wplId){
		// 		return true
		// 	}
		// 	this.$refs.machineDrawer.$data.modalName = null
		// 	this.toast.message('请选择工序')
		// 	return false
		// },	
		//选择工序下拉回调事件
		closeMain(data){
			// debugger
			this.machineparams = {
				wplID:data.type,
				modelCode:'workTime_in'
			}
			this.$refs.machineDrawer.getdataArray(this.machineparams)
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
			if(this.formItem.machineId == ''){
				this.toast.message('请选择机台')
				return false
			}
			if(this.formItem.wplId == ''){
				this.toast.message('请选择工序')
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
				hp_tt_Code:this.formItem.teamId, //--班别编号
				hp_wpl_Id:this.formItem.wplId, //--生产工序编号
			    hp_mo_ID:this.formItem.machineId, //--机台编号
			    userName:user.erpUserCode //--操作用户

			}
			let list = this.paperOutTableDataItems
			request.post('/hpws/saveWorkTime',{data,list}).then(res=>{
				// console.log(res)
				if(res.list[0].ErrorStr == "1"){
					this.restFrom()
					this.toast.hide();
					this.toast.message('保存成功')
					// console.log(111)
				}else{
					this.restFrom()
					this.toast.hide();
					this.toast.message('保存失败');
					// console.log(222)
				}
			}).catch(err => {
					this.restFrom()
					this.toast.hide();
					this.toast.message('保存失败');
					// console.log(333)
			});
		},
		getpaperOutTableDataItems(){
			let data = this.paperOutTableDataItems
			// 'updataItems',
			this.$store.commit('updataworlktime', data)
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
				// url: `adjustPersonnel?team=${this.paperOutTableDataItems}`
				// url: `./loadGoodsDownDetail?cardNo=${this.formItem.licensePlate}&carListNo=` + this.formItem.carGoodsNo
			})
		},
		//清除
		restFrom(){
			this.paperOutTableDataItems = []
			this.formItem.teamId = ''
			this.formItem.wplId = ''
			this.formItem.machineId = ''
			this.$refs.classDrawer.$data.formItem.customers = ''
			this.$refs.classDrawer.$data.formItem.customersId = ''
			this.$refs.wplDrawer.$data.formItem.customers = ''
			this.$refs.wplDrawer.$data.formItem.customersId = ''
			this.$refs.machineDrawer.$data.formItem.customers = ''
			this.$refs.machineDrawer.$data.formItem.customersId = ''
		},
		// 获取人员列表
		getWorkList(){
			let data = {
				workProcId:this.formItem.teamId
			}
			this.toast.loading();
			request.post(`/scan/getWorkList?workProcId=${this.formItem.teamId}`).then(res=>{
				// console.log(res)
				this.toast.hide();
				this.paperOutTableDataItems = res
				for(let i = 0; i<this.paperOutTableDataItems.length; i++){
					this.paperOutTableDataItems[i].Serial = i+1
					// console.log(this.findGoodsColumns)
				}
			}).catch(err=>{
				this.toast.hide();
				this.toast.message('数据加载失败')
			})
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
