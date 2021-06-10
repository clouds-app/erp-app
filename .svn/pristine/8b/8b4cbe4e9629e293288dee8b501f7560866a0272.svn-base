<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">备货出仓</block>
		</cu-custom>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown @closeMain='closeMain' :otherHeight='CustomBarHeight' ref="loadNo" url="appFindPaperCar" title="装车单号"
					placeholdertext="请装车单号" v-model='paperInFormItems.loadNo' :params='{modelCode:"paper_bhout"}'>
				</selectDropdown>
			</view>
		</view>
		<view class="flex border-top">
		<view class="flex-sub">
			<selectDropdown :otherHeight='CustomBarHeight' ref="terminal" url="appFindPierInfo" title="码ㅤ头ㅤ"
				placeholdertext="请选择码头" v-model='paperInFormItems.terminal' :params='{modelCode:"paper_bhout"}'>
			</selectDropdown>
		</view>
		</view>
		<view class="cu-form-group border-top">
			<view class="title">工单板号:</view>
			<input v-model="paperInFormItems.prodNo" @blur="barCodeBlur" placeholder="请扫描工单板号" />
			<button @click="turnOnScanCode" type="primary" size="mini">扫描</button>
		</view>
		<view class="vtable" style="padding-top: 20rpx;">
			<v-table :redColor="redColor" :row-class-name="rowClassNameFn" :columns="dataColumns" :list="dataTableList"
				selection="single" :td-width="160" :height="tableHeight-30" @on-selection-change="subClickitem">
			</v-table>
		</view>
		<!-- 详情弹出层 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" v-if="orderData === '' ? false : true ">
			<view class="cu-dialog" v-if="orderData === '' ? false : true ">

				<view class="cu-bar bg-white justify-end">
					<view class="content">备货明细</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid-body">
					<view class="grid-flex padding-10">
						<text>订单号:{{!!this.orderData ? this.orderData[0].OrderNo : '' }}</text>
						<text>需装数:{{!!this.orderData ? this.orderData[0].Qty : ''}}</text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height:600rpx;overflow-y:scroll;">
					<view style="font-size: 13px;" class="tagBox padding-10" v-for="(item,index) in orderData" :key=index>
						<view class="grid-title">
							<!--  -->
							<view>
								<text>板号:{{item.BanNo}}</text>
							</view>
							<view>
								<text>仓位:{{item.StationNo}}</text>
							</view>
							<view v-if="!item.ZCCreate" @click="delInfo(item,index)" class="tag-t bg-red radius cu-tag">删除</view>
						</view>
						<view class="grid-body">
							<view class="grid-flex padding-10">
								<view>
									<text>备数量:{{item.BHNum}}</text>
								</view>
								<view>
									<text>备时间:{{item.BHCreateDate}}</text>
								</view>
								<view>
									<text>备货人:{{item.BHCreate}}</text>
								</view>
							</view>
							<view class="grid-flex padding-10">
								<view>
									<text>装数量:{{item.ZCNum}}</text>
								</view>
								<view>
									<text>装时间:{{item.ZCCreateDate}}</text>
								</view>
								<view>
									<text>装车人:{{item.ZCCreate}}</text>
								</view>
							</view>
						</view>
					</view>
					<text style="color: rgb(163,163,163); text-align: center;">---我是有底线的---</text>
				</scroll-view>
			</view>
		</view>
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button style="width: 300rpx;" @click="tableItemInfo" type="primary" size="mini" class="bg-grey radius">详情</button>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/ui/colorui/components/cu-custom.vue'
	import vTable from "@/components/table.vue"
	import baseMixin from '@/mixins';
	import request from '@/utils/request.js';
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	export default {
		components: {
			cuCustom,
			vTable,
			selectDropdown
		},
		mixins: [baseMixin],
		name: 'stockUpOut',
		data() {
			return {
				redColor: ['备货数',''],
				queryTable: '', // 查询表格所需数据
				prodNoData: '', // 工单板号详情数据
				orderData: '', // 订单详情数据
				modalName: '',
				tableHeight: 100, //表格高度
				rowTable: {}, // 当前点击行的数据
				paperInFormItems: {
					loadNo: '', // 装车单号
					terminal: '', // 码头
					prodNo: '', // 工单板号
				},
				dataColumns: [{
						key: 'OrderNo',
						title: '订单号',
						$width: 180,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 'Qty',
						title: '需装数',
						$width: 100,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 'ScanQty',
						title: '备货数',
						$width: 100,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 'CustName',
						title: '客户',
						$width: 150,
						titleAlign: 'center',
						columnAlign: 'center'
					},
					{
						key: 'ArtID',
						title: '纸质',
						$width: 100,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 'Mode',
						title: '规格',
						$width: 200,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 'ZoneName',
						title: '地区',
						$width: 300,
						titleAlign: 'center',
						columnAlign: 'right'
					},
				],
				dataTableList: [],
			}
		},
		methods: {
			// 装车单下拉框发生改变，更新table数据
			closeMain(e){
				this.queryTable = e
				this.dataTableList = []
				this.paperInFormItems.prodNo = ''
				// 再次进来清空码头数据
				this.$refs.terminal.formItem.customers = ''
				this.paperInFormItems.terminal = ''
				// 装车单号发生改变，改变码头数据
				this.$refs.terminal.formItem.customers = e.zc_pierName
				this.paperInFormItems.terminal = e.zc_pierCode
				console.log(e.pierCode);
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let params = {
					UserID: user.erpUserCode,
					CarListNo: e.ct_Desc,
					IsBhOrZc: 0
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appGetSaveCarList', params).then(res => {
					this.dataTableList = res.list
					this.toast.hide();
				}).catch(err => {
						this.toast.hide()
						this.toast.message('查询失败')
					})
			},
			// 关闭弹框事件
			hideModal(){
				this.modalName = ''
				this.orderData = ''
			},
			// table点击的回调事件
			subClickitem(data) {
				this.rowTable = data.new.item
			},
			// 获取详情数据
			tableItemInfo(){
				this.modalName = 'DialogModal1'
				let infoData = this.rowTable
				if (infoData.OrderNo === undefined){
					this.toast.message('请选择需要获取详情的订单号')
					return
				}
				let params = {
					CardNo: this.paperInFormItems.loadNo,
					OrderNo: infoData.OrderNo,
					ItemId: '',
					Types: 'select'
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appBhDetails', params).then((res)=>{
					if(res.list.length === 0){
							this.toast.message('此订单号暂无详情数据')
							return
					}
					this.orderData = res.list
					this.toast.hide();
				})
			},
			// 根据工单板号更新备货数
			updateScanQty(){
				this.dataTableList.forEach((item,index)=>{
					if(item.OrderNo === this.prodNoData.WorkNo){
						this.dataTableList[index].ScanQty = this.prodNoData.Num
					}
				})
			},
			// 扫码失焦事件
			barCodeBlur() {
				this.getParamsFromScanCode()
			},
			//====工单板号====获取所需参数 从扫描中...
			getParamsFromScanCode() {
				if(this.paperInFormItems.loadNo === ''){
					this.toast.message('请选择装车单号')
					return
				}
				if(this.paperInFormItems.terminal === '' || this.paperInFormItems.terminal === null ){
					this.toast.message('请选择码头')
					return
				}
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let params = {
					UserID: user.erpUserCode,
					CarListNo: this.paperInFormItems.loadNo,
					WorkBanNo: this.paperInFormItems.prodNo,
					alCode: this.paperInFormItems.terminal
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appScanWorkBanNo', params)
					.then(res => {
						if (res.list[0] === null) {
							this.toast.hide();
							this.toast.message('无此工单板号，请重新扫描!');
							return;
						}else if (res.list[0].errno !== null) {
							this.toast.hide();
							this.toast.message(res.list[0].errno);
							return;
						}else if(res.list[0].errno === null){
							this.toast.message('执行成功')
						}
						this.prodNoData = res.list[0]
						this.updateScanQty()
						this.toast.hide();
					}).catch(err => {
						this.toast.hide()
						this.toast.message('执行失败')
					})
			},
			//打开扫描
			async turnOnScanCode(type) {
				if (this.checkScan()) {
					this.toast.message('请在"e包装"公众号中下载APP后扫码!')
					return
				}
				let scandata = await this.ScanModule();
				if (scandata.resp_code == 1000) {
					let a = scandata.resp_result.indexOf(',')
					let b = 0
					if (a < 0) {
						b = scandata.resp_result
					} else {
						b = scandata.resp_result.substring(0, a)
					}
					this.paperInFormItems.prodNo = b;
					this.getParamsFromScanCode();
				} else {
					this.toast.message('扫码失败请重试')
				}
			},
			// 删除某一列的详细信息
			delInfo(item){
				let params = {
					CardNo: this.paperInFormItems.loadNo,
					OrderNo: item.OrderNo,
					ItemId: item.ItemId,
					Types: 'delete'
				}
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appBhDetails', params).then((res)=>{
					this.orderData = res.list
					this.toast.hide()
					this.closeMain(this.queryTable)
					this.toast.message('删除成功')
				}).catch(err => {
						this.toast.hide()
						this.toast.message('删除失败')
					})
			}
		}
	}
</script>

<style>
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

	.chucangbtm {
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 2;
	}
</style>
