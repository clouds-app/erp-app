<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" v-show="showcustom">
				<block slot="content" style="height: 30px;">生成报价</block>
		</cu-custom>
		<!-- <view style="height: 30px;"></view> -->
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group" style="font-size: 16px;">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-form-group" >
							<!-- <view class="title">客户原报价纸质</view> -->
							客户原报价纸质
							<radio :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"></radio>
						</view>
						<view class="cu-form-group" style="border: none;">
							<!-- <view class="title">本次设定纸质</view> -->
							本次设定纸质
							<radio :class="radio=='0'?'checked':''" :checked="radio=='0'?true:false" value="0"></radio>
						</view>
					</radio-group>
					<!-- <view class="title" style="margin-left: 20rpx;">生效日期:</view> -->
					生效日期:
					<picker mode="date" :value="startDate" start="2000-09-01"  @change="startDateChange" style="margin-right: 80rpx;">
						<view class="picker">
							{{startDate}}
						</view>
					</picker>
					<button style="margin-right: 10rpx;" :disabled="isLoaddingData" class="cu-btn  lines-blue shadow" @click="updataNewPrice" size="mini">修改新价</button>
					<button :disabled="isLoaddingData" class="cu-btn  lines-pink shadow" @click="createBill" size="mini">生成报价</button>
				</view>
			</view>
		</view>
			
		<view class="flex border-top">
			<view class="vtable" :style="{width: 25+'%'}" >
				<v-table
					:screen='true'
					:row-class-name="rowClassNameFn"
					:columns="dataColumns" 
					:list="dataTableList" 
					selection="mulit"
					:td-width="113"
					:height="tableHeight+20"
					@edi="ediFn"
					@checkboxChange="checkboxChange"
					@checkboxChangeAll="checkboxChangeAll"
					>
				</v-table>
			</view>
			<view class="vtable" style="width: 75%;">
				<v-table
					:row-class-name="rowClassNameFn"
					:columns="subdataColumns" 
					:list="subdataTableList" 
					selection="single"
					:td-width="94"	
					:height="tableHeight+20"
					@on-selection-change='subClickitem'
					>
				</v-table>
			</view>
		</view>
		
		<!-- 编辑弹出层 -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog" style="width: 40%;">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改</view>
					<view class="action" @tap="modalName=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">新价:</view>
							<input v-model="request" Name="input" type="number"/>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="modalName=''">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="updatarequest">确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import cuCustom from '../../ui/colorui/components/cu-custom.vue';
	import baseMixin from '@/mixins';
	import vTable from "@/components/table.vue";
	import dayjs from 'dayjs'
	import request from '@/utils/request.js';
	const operateCol = {
		operate: {
				edi: {
					label: "查看",
					fn(row, index) {
						//this.alertFnCallback(row,index);
					}
				}
		}
	}
	export default {
		components:{cuCustom,vTable},
		mixins:[baseMixin],
		data() {
			return {
				tablewidth:25,
				showcustom:true,
				request:0,//修改新价字段
				modalName:'',//修改弹框显示字段
				queryFrom:{},//存储上级页面传过来的参数
				radio:1,
				startDate:dayjs().format('YYYY-MM-DD'),
				activeRadio:'', //存的是选中的value值
				tableHeight:500,//table高度
				dataTableList:[],//主表显示数据
				clickTableList:{},//主表点击数据
				subclickTableList:{},//从表点击数据
				subclickindex:0,//从表点击索引
				subdataTableList:[],//从表显示数据
				dataColumns:[
					{ key: 'CustID', title: '编号', $width: 5, titleAlign: 'center', columnAlign: 'center', $checked:true},
					{ key: 'ct_Desc', title: '客户名', $width: 10, titleAlign: 'center', columnAlign: 'center', $checked:true},
					{
						title: "操作",
						$width: 6,
						key: "$operate",
						$operateList: [
							{
								label: "查看",
								event: "edi",
								id: "edi"
							}
						]
					},
				],
				subdataColumns:[
					{ key: 'rownumber', title: '序号',$width: 75, $checked:true},
					{ key: 'ArtID', title: '材质', $width: 100, titleAlign: 'center', columnAlign: 'center', $checked:true},
					{ key: 'LB', title: '楞别', $width: 80, titleAlign: 'center', columnAlign: 'center', $checked:true},
					{ key: 'NewPrice', title: '新价', $width: 75, titleAlign: 'center', columnAlign: 'right', $checked:true},
					{ key: 'OldPrice', title: '旧价', $width: 75, titleAlign: 'center', columnAlign: 'right', $checked:true},
					{ key: 'UpRate', title: '涨幅%', $width: 88, titleAlign: 'left', columnAlign: 'right', $checked:true},
					{ key: 'Area', title: '销售面积', $width: 120, titleAlign: 'left', columnAlign: 'right', $checked:true},
					{ key: 'AreaRate', title: '面积%', $width: 88, titleAlign: 'left', columnAlign: 'right', $checked:true},
					{ key: 'Cost', title: '原纸成本', $width: 120, titleAlign: 'left', columnAlign: 'right', $checked:true},
					{ key: 'Work', title: '加工成本', $width: 120, titleAlign: 'left', columnAlign: 'right', $checked:true},
					{ key: 'CustMoney', title: '客户费用', $width: 120, titleAlign: 'left', columnAlign: 'right', $checked:true},
					{ key: 'Profit', title: '利润', $width: 80, titleAlign: 'left', columnAlign: 'right', $checked:true},
					{ key: 'ProfitRate', title: '利润%', $width: 88, titleAlign: 'left', columnAlign: 'right', $checked:true},
				]
				
			}
		},
		// #ifdef H5
		mounted() {
			// plus.screen.lockOrientation("landscape-secondary")
			this.avgWidth = this.getTableAvgWidth(this.dataColumns);
			this.calTableHeight()
		},
		// #endif
		// #ifndef H5
		onShow() {
			// debugger
			// setTimeout(()=>{
			// 		plus.screen.lockOrientation("landscape-secondary")
			// 		this.avgWidth = this.getTableAvgWidth(this.dataColumns);
			// 		this.calTableHeight()
			// 		this.toast.hide()
			// },1300)
		}, 
		onLoad(option) {
			// debugger
			this.showcustom = false
			this.queryFrom = this.cache.get(option.type)
			plus.navigator.setFullscreen(true);
			this.getdataTableList()
			setTimeout(()=>{
					plus.screen.lockOrientation("landscape-secondary")
					this.avgWidth = this.getTableAvgWidth(this.dataColumns);
					this.calTableHeight()
					// this.toast.hide()
			},1300)
		},
		// #endif
		methods: {
			// 全选回调事件
			checkboxChangeAll(data){
				let valData = data
				this.dataTableList.filter(item=>{
					item.checked = !valData
				})
			},
			// 多选回调事件
			checkboxChange(e,index){
				this.dataTableList[index.data].checked = !this.dataTableList[index.data].checked
			},
			// 获取生成新报价选中编号
			getCustList(){
				let getCustIDStr = '';
					this.dataTableList.filter((item,index)=>{
						if(item.checked){
							getCustIDStr += item.CustID+';'
						}
					})
				return getCustIDStr
			},
			// 生成报价回调事件
			createBill(){
				let CustList = this.getCustList()
				if(!CustList){
					this.toast.message('请选择生成数据')
					return
				}
				// let StarDate = this.startDate+' '+dayjs().format('hh:mm:ss')
				this.toast.loading()
				let _self = this
				let parms = {
					UserID:this.userInfo.erpUserCode,
					CustList:CustList.substr(0, CustList.length - 1),
					StarDate:this.startDate+' '+dayjs().format('hh:mm:ss'),
					// StarDate:dateFormat('yyyy-MM-dd hh:mm:ss'),
					SType:this.radio,
					JLUnit:this.queryFrom.JLUnit
				}
				request.post('/warehouse/warehouse/execute/appCreatePaperArtPriceForAutoCalc',parms).then(res=>{
					if(!!res.list[0].res){
						_self.toast.message('生成成功')
						return
					}
					if(!!res.list[0].CustError){
						_self.toast.hide()
						_self.toast.message(res.list[0].CustError)
						return
					}
					_self.toast.message('生成失败，请重试')
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			// 从表点击回调事件
			subClickitem(data){
				this.subclickTableList = data.new.item
				this.subclickindex = data.new.index
			},
			// 修改新价回调事件
			updataNewPrice(){
				if(this.subclickTableList.NewPrice !== undefined){
					this.request = this.subclickTableList.NewPrice
					this.modalName = 'DialogModal2'
					return
				}
				this.toast.message('请选择操作行')
			},
			// 修改弹框确认事件
			updatarequest(){
				let parms = {ID1:this.subclickTableList.ID1,ID2:this.subclickTableList.ID2,NewPrice:this.request}
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appPricePreviewRightUp',parms).then(res=>{
					if(!res.list[0].res){
						this.toast.hide()
						this.toast.message('修改失败')
						return
					}
					this.setsubdataTableList()
				}).catch(err=>{
					this.toast.hide()
					this.toast.message('修改失败')
				})
			},
			// 修改成功更新从表数据
			setsubdataTableList(){
				this.subdataTableList[this.subclickindex].NewPrice = this.request
				this.toast.hide()
				this.modalName = ''
				this.toast.message('修改成功')
			},
			// 初始化主表数据
			getdataTableList(){
				let _self = this
				let parms = {UserID:this.userInfo.erpUserCode,CustList:this.queryFrom.CustList,BaseML:this.queryFrom.BaseML,JLUnit:this.queryFrom.JLUnit}
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appSpCreatePricePreview',parms).then(res=>{
					_self.tableDatahandle(res.list)
					setTimeout(()=>{
						_self.toast.hide()
					},1000)
				}).catch(err=>{
					this.toast.hide()
					this.toast.message(err)
				})
			},
			// 主表数据处理
			tableDatahandle(data){
				data.filter(item=>{
					item.operateCol = operateCol
				})
				this.dataTableList = data
			},
			// 主表查看回调事件
			ediFn(data) {
				this.subclickTableList = {}
				this.clickTableList =JSON.parse(JSON.stringify(this.dataTableList[data.index])) 
				this.getsubdataTableList()
			},
			// 获取从表数据
			getsubdataTableList(){
				let parms = {ID1:this.clickTableList.ID1,UserID:this.userInfo.erpUserCode,SType:this.radio}
				this.toast.loading()
				let _self = this
				request.post('/warehouse/warehouse/execute/appPricePreviewRight',parms).then(res=>{
					_self.subdataTableList = res.list
					setTimeout(()=>{
						_self.toast.hide()
					},1000)
					if(res.list.length===0){
						this.toast.message('暂无数据')
					}
				}).catch(err=>{
					_self.toast.hide()
					_self.toast.message(err)
				})
			},
			//时间选择回调事件	
			startDateChange(e){
				this.startDate = e.detail.value
			},
			// 单选按钮回调事件
			RadioChange(e) {
				this.radio = e.detail.value
				this.subclickTableList = {}
				this.getsubdataTableList()
			},
			// 设置表格使用剩余高度
			calTableHeight(){
				this.$nextTick(()=>{
					// this.getOtherContentHeight()
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
.block{
	display: flex;
	flex-direction:row;
	justify-content:space-around;;
	background:#FFFFFF;
}
</style>
