<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">纸板特价申请</block>
		</cu-custom>
		<view class="bodyContentHeight">
			<view class="flex border-top" style="background-color: #FFFFFF;">
					<view style="width: 74.5%;">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="lineDrawer"
						url="appGetCustomerList"
						title="客ㅤ户"
						placeholdertext="ㅤ请选择客户"
						v-model='CustID'
						:params='{modelCode:"paper_special_apply",UserCode:this.userInfo.erpUserCode,pageSize:100,pageNum:1}'
						@closeMain="getcustFromData"
					></selectDropdown>
					</view>
					<view style="text-align: right; margin-top: 10rpx;">
						<button class="cu-btn lines-red shadow"  @click.stop="JumpOutBillNoList">上次特价</button>
					</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">原申请单号:</view>
						<input v-model="CustFromData.BillNo" disabled/>
						<button :disabled="!CustFromData.BillNo" class="cu-btn lines-red shadow"  @click.stop="showExamine='DialogModal2'">删除单号</button>
					</view>
				</view>
			</view>
		</view>
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="249"
				:height="tableHeight-35"
				@on-selection-change='subClickitem'
				>
			</v-table>
		</view>
		
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<button :disabled="!showIsStop" class="cu-btn lines-orange shadow"  @click="restfrom()">清空</button>
					<button :disabled="!showIsStop" class="cu-btn  lines-blue shadow" @click="addtableData()" >新增</button>
					<button :disabled="!showIsStop" class="cu-btn  lines-green shadow" @click="uptableData()" >修改</button>
					<button :disabled="!showIsStop" class="cu-btn  lines-red shadow" @click="deltableData()" size="mini">删除</button>
					<button :disabled="!dataTableList.length" class="cu-btn lines-purple shadow"  @click="subtableData()">提交</button>
			   </view>
			</view>
		</view>
		
		<!-- 清空，删除-->
		<view class="cu-modal" :class="showExamine=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{examineName}}</view>
					<view class="action" @tap="showExamine=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="showExamineSty" v-show="showExamineText">
							是否{{examineName}}该数据
				</view>
				<view v-show="!showExamineText">
					<view class="flex border-top">
						<view class="flex-sub">
							<selectDropdown
								:defaultValue='formItem.ps_ArtId'
								:otherHeight='CustomBarHeight' 
								ref="customerDrawer"
								url="appFindArtSelect"
								title="纸质"
								placeholdertext="请选择"
								v-model='formItem.ps_ArtId'
								:params="{modelCode:'paper_special_apply',pageSize:100,pageNum:1}"
								@closeMain="getLBList"
							></selectDropdown>
						</view>
						<view class="flex-sub">
							<selectDropdown
								:defaultValue='formItem.ps_lb'
								:otherHeight='CustomBarHeight'
								ref="LBDrawer"
								url="appFindLBbyArtSelect"
								title="楞别"
								placeholdertext="请选择"
								v-model='formItem.ps_lb'
								:Reload='true'
							></selectDropdown>
						</view>
					</view>
					<view class="flex border-top">
						<view class="flex-sub">
							<view class="cu-form-group" >
								<view class="title">申请价格:</view>
								<input type="number"  v-model="formItem.ps_ApplyforPrice" style="border-bottom: 1px solid #000000;"/>
							</view>
						</view>
						<view class="flex-sub">
							<view class="cu-form-group" >

							</view>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="showExamine=''">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="submitExamine">确定</view>
				</view>
			</view>
		</view>
		
		
		<!-- 删除申请单号弹框 -->
		<view class="cu-modal" :class="showExamine=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">删除申请单</view>
						<view class="action" @tap="showExamine=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="showExamineSty">
							 是否删除原申请单
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="showExamine=''">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="endDelete">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	import dayjs from 'dayjs'
	import vTable from "@/components/table.vue"
	import cuCustom from '@/ui/colorui/components/cu-custom.vue' ;
	import baseMixin from '@/mixins';
	import request from '@/utils/request.js';
	const modelfrom = {
		ps_ArtId:'',
		ps_lb:'',
		ps_ApplyforPrice:'',
		ID2:0,
		ID1:0
	}
	export default {
		components:{cuCustom,selectDropdown,vTable},
		mixins:[baseMixin],
		data() {
			return {
				CustID:'',//客户
				showExamine:'',//弹出层显示字段
				examineName:'',//清空删除弹框标题
				clickTableData:{},//Table选中行
				tableHeight: 0, //表格高度
				CustFromData:{},
				showIsStop:false,
				formItem:Object.assign({},modelfrom),
				dataTableList:[
					// {ps_ArtId:'3E'},
				],
				dataColumns:[
					{ key: 'ps_ArtId', title: '纸质',$width: 247, titleAlign: 'center', columnAlign: 'left' },
					{ key: 'ps_lb', title: '楞别', $width: 250, titleAlign: 'center', columnAlign: 'left' },
					{ key: 'ps_ApplyforPrice', title: '申请价格', $width: 250, titleAlign: 'center', columnAlign: 'right' },
				]
			}
		},
		// #ifdef H5
		mounted() {
			this.calTableHeight()
		},
		// #endif
		// #ifndef H5
		onShow() {
			this.calTableHeight()
		},
		// #endif
		methods: {
			// 跳转最初客户特价申请列表
			JumpOutBillNoList(data){
				if(!!this.CustID){
					uni.navigateTo({
						url: `OutBillNoList?id=${this.CustID}`
					})
				}
				this.toast.message('请选择客户')
			},
			//弹出层确认回调
			submitExamine(){
				let index = this.clickTableData.index
				let fromData = JSON.parse(JSON.stringify(this.formItem))
				switch(this.examineName){
					case '删除':
						this.dataTableList.splice(index,1)
						this.showExamine = ''
					break;
					case '修改':
						this.dataTableList.splice(index,1)
						this.dataTableList.splice(index,0,fromData,)
						this.dataTableList[index] = fromData
						this.showExamine = ''
					break;
					case '新增':
						if(this.checkOnlyData(fromData)){
							this.toast.message('该数据已存在')
							return
						}
						this.showExamine = ''
						this.dataTableList.push(fromData)
					break;
					default: 
						this.dataTableList = []
						this.showExamine = ''
						// this.CustFromData.BillNo = ''
						// this.showIsStop = true
				}
				this.clearFormitem()
			},
			//新增数据唯一校验
			checkOnlyData(val){
				let check = false
				let data = val.ps_ArtId+val.ps_lb
				this.dataTableList.filter(item=>{
					if(item.ps_ArtId+item.ps_lb==data){
						check = true
					}
				})
				return check
			},
			//编辑弹框清空
			clearFormitem(){
				this.formItem = Object.assign({},modelfrom)
				this.$refs.LBDrawer.clearFromData()
				this.$refs.customerDrawer.$data.formItem.customers = ''
				this.clickTableData = {}
				this.examineName = ''
			},
			// 提交申请
			subtableData(){
				this.examineName = ''
				this.toast.loading()
				let parms = {
					data:this.CustFromData,
					list:this.dataTableList
				}
				if(this.CustFromData.ct_IsStop == 1){
					this.toast.message('该客户已停单,不可申请')
					return
				}
				request.post('/approval/paperSpecialApproval/approvalSubmit',parms).then(res=>{
					if(!!res.list.length){
						this.toast.message(res.list[0].resDesc)
						this.CustFromData.BillNo = ''
						this.showIsStop = false
						this.$refs.lineDrawer.$data.formItem.customers = ''
						this.submitExamine()
					}
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			
			// 删除原申请单号
			endDelete(){
				request.post('/warehouse/warehouse/execute/appDelPaperSpecialApply',
				{UserID:this.userInfo.erpUserCode,ID1:this.CustFromData.ID1}).then(res=>{
					if(!!res.list[0].res){
						this.submitExamine()
						this.CustFromData.BillNo = ''
					}
					this.toast.message(res.list[0].resDesc)
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			// 删除方法
			deltableData(){
				if(this.checkclickTableData()){
					this.examineName='删除'
					this.showExamine = 'DialogModal1'
				}
			},
			// 点击修改事件
			uptableData(){
				if(this.checkclickTableData()){
					let index = this.clickTableData.index
					this.examineName='修改'
					this.showExamine = 'DialogModal1'
					this.formItem =JSON.parse(JSON.stringify(this.dataTableList[index])) 
					this.getLBList({type:this.formItem.ps_ArtId})
				}
			},
			// 新增点击事件
			addtableData(){
				this.examineName='新增'
				this.showExamine = 'DialogModal1'
			},
			// 清空方法
			restfrom(){
				this.examineName='清空' 
				this.showExamine = 'DialogModal1'
			},
			//校验是否选中行
			checkclickTableData(){
				if(!Object.keys(this.clickTableData).length){
					this.toast.message('请选择操作行')
					return false
				}
					return true
			},
			// 客户选择回调
			getcustFromData(data){
				let params = {UserID:this.userInfo.erpUserCode,CustID:data.type}
				this.toast.loading()
				request.post('/warehouse/warehouse/executeMany/appGetLastPaperSpecialApply',params).then(res=>{
					// if(this.checkFromData(res.list[0])){
						let data = res.list[0]
						this.CustFromData = data[0]
						this.showIsStop = true
						this.dataTableList = res.list[1]
						this.toast.hide()
					// }
					// this.toast.message('查询失败请重试')
				}).catch(err=>{
					this.toast.message(err)
				})
			},
			// 处理非table表单数据
			// checkFromData(data){
			// 	this.CustFromData = data[0]
			// 	if(!!data[0].res){
			// 		return true
			// 	}
			// 	return false
			// },
			//选择纸质查询楞别数据列表
			getLBList(data){
				let parms = {modelCode:'paper_special_apply',pageSize:100,pageNum:1,ArtId:data.type}
				this.$refs.LBDrawer.getdataArray(parms)
			},
			// Table 表单单击事件
			subClickitem(data){
				this.clickTableData = data.new
			},
			// 设置表格使用剩余高度
			calTableHeight(){
				this.$nextTick(()=>{
					this.getOtherContentHeight()
					setTimeout(()=>{
						//延时执行,方便个别小程序兼容
						let tempHeight =  this.setTableHeight(true)
						this.tableHeight =tempHeight//特别处理
					},200)
				})
			},
		},
		computed:{
			showExamineText(){
				if(this.examineName=='删除'||this.examineName=='清空'){
					return true
				}
				return false
			}
		}
	}
</script>

<style>
.showExamineSty{
	padding: 5rpx 5rpx 5rpx 5rpx;
	background-color: #FFFFFF;
	text-align: center;
}
</style>
