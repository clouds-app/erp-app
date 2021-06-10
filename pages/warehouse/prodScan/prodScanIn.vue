<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">辅料扫码入库</block>
		</cu-custom>
		<view class="flex-sub">
			<view class="cu-form-group">
				<view class="title">入库日期:</view>
				<input :disabled="true" v-model="currentDate" />
			</view>
		</view>
		<view class="flex-sub">
			<selectDropdown @closeMain='closeMain1' :otherHeight='CustomBarHeight' ref="lineDrawer1" url="appFindVendor"
				title="供应商ㅤ" placeholdertext="请选择供应商" v-model='paperInFormItems.supplier'
				:params="{modelCode:'prod_in_search'}">
			</selectDropdown>
		</view>
		<view class="flex-sub">
			<view class="cu-form-group">
				<view class="title">送货单号:</view>
				<input v-model="paperInFormItems.deliveryNumber" />
			</view>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group">
				<view class="title">车牌号ㅤ:</view>
				<input v-model="paperInFormItems.licensePlateNumber" />
			</view>
			<view class="cu-form-group">
				<view class="title">ㅤ司机ㅤ:</view>
				<input v-model="paperInFormItems.driver" />
			</view>
		</view>
		<view class="cu-form-group border-top">
			<view class="title">辅ㅤ料ㅤ:</view>
			<input v-model="paperInFormItems.prodNo" @blur="barCodeBlur" placeholder="请扫描辅料号" />
			<button @click="turnOnScanCode('in')" type="primary" size="mini">扫描</button>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group">
				<view class="title">辅料名称:</view>
				<input disabled="true" v-model="ProdName" />
			</view>
			<view class="cu-form-group">
				<view class="title">规ㅤ格ㅤ:</view>
				<input disabled="true" v-model="paperInFormItems.specification" />
			</view>
		</view>
		<view class="flex-sub">
			<selectDropdown :isShowToast='false' @closeMain='closeMain' :setonlyOne="true" :Reload='true'
				:otherHeight='CustomBarHeight' ref="lineDrawer" url="appGetProdPoNoInfo" title="采购单号"
				placeholdertext="请选择采购单号" v-model='paperInFormItems.poNo'
				:params='{Vend:paperInFormItems.supplier, ni_Code:paperInFormItems.prodNo, po_No:""}'></selectDropdown>
		</view>
		<view class="flex-sub">
			<selectDropdown :isShowToast='false' :Reload='true' :otherHeight='CustomBarHeight' ref="lineDrawer2"
				url="appGetProdPoseriNoInfo" title="批次号ㅤ" placeholdertext="请选择批次号" v-model='paperInFormItems.batchNo'
				:params='{Vend:paperInFormItems.supplier, ni_Code:paperInFormItems.prodNo, po_No:"", value:paperInFormItems.batchNo,text:paperInFormItems.batchNo}'>
			</selectDropdown>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group">
				<view style="color: red;" class="title">入库数量:</view>
				<input type="number" v-model="paperInFormItems.inQuantity" />
			</view>
			<view class="cu-form-group">
				<view class="title">ㅤ单位ㅤ:</view>
				<input disabled="true" v-model="paperInFormItems.UnitName" />
			</view>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group">
				<view class="title">含税单价:</view>
				<input :disabled="yesCode? true:false" type="number" v-model="paperInFormItems.poi_TaxPrice" />
			</view>
			<view class="cu-form-group">
				<view class="title">ㅤ金额ㅤ:</view>
				<input v-model="paperInFormItems.poi_TaxMoney" />
			</view>
		</view>
		<view class="flex-sub">
			<selectDropdown :setonlyOne="true" :otherHeight='CustomBarHeight' ref="lineDrawer3" url="appFindSearchStation" title="仓ㅤ位ㅤ"
				placeholdertext="请选择仓位" v-model='paperInFormItems.Positions' :params="{modelCode:'prod_in'}">
			</selectDropdown>
		</view>
		<view class="test"></view>
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button @click="resetFrom" type="primary" size="mini" class="bg-grey radius">清除</button>
			<button :disabled="disable" @click="paprtIn" type="primary" size="mini" class="bg-grey radius">入库</button>
		</view>
		<!-- 详情弹出层 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" @bindtap="hideModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">入库成功</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">入库单号：{{this.nm_No}}</view>
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<button @click="modalName = ''" type="primary" size="mini" class="bg-grey radius">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	import request from '@/utils/request.js';
	import warehouse from '@/mixins';
	import cuCustom from '@/ui/colorui/components/cu-custom.vue';
	export default {
		name: 'prodScanIn',
		components: {
			cuCustom,
			selectDropdown
		},
		mixins: [warehouse],
		data() {
			return {
				ProdName: '', // 辅料名称
				inQuantityNuma: '', // 入库数量改变前
				inQuantityNumb:'', // 入库数量改变后
				dataNo: '',
				yesCode: false,
				modalName: '', // 入仓成功弹出框
				nm_No: '', // 入库单号
				disable: false,
				currentDate: new Date().toISOString().slice(0, 10), // 当前时间
				paperInFormItems: {
					supplier: '', // 供应商
					deliveryNumber: '', // 送货单号
					licensePlateNumber: '', // 车牌号
					driver: '', // 司机
					prodNo: '', // 辅料
					specification: '', // 规格
					batchNo: '', // 批次号
					inQuantity: '', // 入库数量
					UnitName: '', //计价单位
					poi_TaxPrice: '', // 含税单价
					poi_TaxMoney: '', // 金额
					poNo: '', // 采购单号
					Positions: '' //仓位

				}
			}
		},
		watch: {
			'paperInFormItems.supplier'(newValue, oldValue) {
				// 供应商发生改变，清空采购单号和批次号，
				this.paperInFormItems.poNo = ''
				this.$refs.lineDrawer.clearFromData()
				this.paperInFormItems.batchNo = ''
				this.$refs.lineDrawer2.clearFromData()
				if (this.paperInFormItems.supplier !== '' && this.paperInFormItems.prodNo !== '') {

					this.$refs.lineDrawer.getdataArray({
						Vend: this.paperInFormItems.supplier,
						po_No: "",
						ni_Code: this.paperInFormItems.prodNo,
					})
				}
			},
			// 采购编号发生改变，清空批次号
			'paperInFormItems.poNo'(newValue, oldValue) {
				// 清空数据
				this.paperInFormItems.batchNo = ''
				this.$refs.lineDrawer2.formItem.customers = ''
			},
			// 批次号发生改变，重新数量等数据
			'paperInFormItems.batchNo'(newValue, oldValue) {
				let data = {
					Vend: this.paperInFormItems.supplier,
					ni_Code: this.paperInFormItems.prodNo,
					po_No: this.paperInFormItems.poNo,
					poseriNo: ""
				}
				request.post(`/warehouse/warehouse/execute/appGetProdPoseriNoInfo`, data).then(res => {
					if (res.list.length === 0) {
						this.paperInFormItems.inQuantity = ''
						this.paperInFormItems.poi_TaxPrice = ''
						this.paperInFormItems.poi_TaxMoney = ''
						this.yesCode = false
					} else {
						// 取批和次号对应的值
						res.list.forEach((item, index) => {
							if (item.text === newValue) {
								this.inQuantityNuma = res.list[index].poi_DetailQty
								this.paperInFormItems.inQuantity = res.list[index].poi_DetailQty
								this.paperInFormItems.poi_TaxPrice = res.list[index].poi_TaxPrice
								this.paperInFormItems.poi_TaxMoney = res.list[index].poi_TaxMoney
							}
							this.yesCode = true
						})
					}
				})
			},
			// 计算实时金额(保留两位小数)
			'paperInFormItems.inQuantity'(newValue, oldValue) {
				// 记录辅料入库数量 请改为不可以超 采购单未入库数量。
				this.inQuantityNumb = newValue
				let quantity = newValue * this.paperInFormItems.poi_TaxPrice
				this.paperInFormItems.poi_TaxMoney = quantity.toFixed(2)
			},
			'paperInFormItems.poi_TaxPrice'(newValue, oldValue) {
				let poi_TaxPrice = newValue * this.paperInFormItems.inQuantity
				this.paperInFormItems.poi_TaxMoney = poi_TaxPrice.toFixed(2)
			},
		},
		mounted() {
			let supplier = this.$store.state.paperScanIn.supplier
			this.$refs.lineDrawer1.formItem.customers = supplier
			if(supplier !== undefined){
				this.paperInFormItems.supplier = supplier.split("_")[0]
			}
			this.paperInFormItems.deliveryNumber = this.$store.state.paperScanIn.deliveryNumber
			this.paperInFormItems.driver = this.$store.state.paperScanIn.driver
			this.paperInFormItems.licensePlateNumber = this.$store.state.paperScanIn.licensePlateNumber
		},
		methods: {
			// 供应商change事件，做一些清除数据处理
			closeMain1(e) {
					this.paperInFormItems.prodNo = ''
					this.paperInFormItems.specification = ''
					this.paperInFormItems.UnitName = ''
					this.paperInFormItems.deliveryNumber = ''
					this.paperInFormItems.licensePlateNumber = ''
					this.paperInFormItems.driver = ''
					this.paperInFormItems.poi_TaxPrice = ''
					this.paperInFormItems.inQuantity = ''
					this.paperInFormItems.poi_TaxMoney = ''
					this.ProdName = ''
					this.yesCode = false
			},
			hideModal() {
				this.modalName = ''
				this.nm_No = ''
			},
			closeMain(e) {
				// 采购单号change事件
				// if (this.paperInFormItems.supplier !== '' && this.paperInFormItems.prodNo !== '') {
				// 	this.$refs.lineDrawer.getdataArray({
				// 		Vend: this.paperInFormItems.supplier,
				// 		po_No: "",
				// 		ni_Code: this.paperInFormItems.prodNo
				// 	})
				// }
				// 采购单号change事件
				this.$refs.lineDrawer2.getdataArray({
					Vend: this.paperInFormItems.supplier,
					ni_Code: this.paperInFormItems.prodNo,
					po_No: this.paperInFormItems.poNo,
					poseriNo: "",
				})
			},
			// 扫码框失焦事件
			barCodeBlur() {
				if (this.paperInFormItems.prodNo === '') {
					this.toast.message('请输入辅料');
				} else if (this.paperInFormItems.supplier === '') {
					this.toast.message('请先输入供应商');
				} else {
					this.ProdName = ''
					let data = this.paperInFormItems.supplier
					this.dataNo = this.paperInFormItems.supplier
					this.paperInFormItems.supplier = ''
					setTimeout(() => {
						this.paperInFormItems.supplier = data
					}, 300)
					this.getParamsFromScanCode();
					this.closeMain()
					this.paperInFormItems.specification = ''
					this.paperInFormItems.UnitName = ''
				}
			},
			message(){
				setTimeout(()=>{
					this.toast.message('无此辅料，请重新扫描!');
				},600)
			},
			//====入库====获取所需参数 从扫描中...
			getParamsFromScanCode() { 
				let params = {
					Vend: this.dataNo,
					Code: this.paperInFormItems.prodNo
				}
				let data = []
				this.toast.loading();
				// request.post('/proc/execute/spGetPaperCOInfoForAPP',{OrderNo:fOrderNo})
				request.post('/warehouse/warehouse/execute/appGetProdInCodeInfo', params)
					.then(res => {
						if (res.list.length === 0) {
							this.toast.hide();
							this.message()
							return;
						}
						this.paperInFormItems.specification = res.list[0].Model
						this.paperInFormItems.UnitName = res.list[0].UnitName
						this.ProdName = res.list[0].ProdName
						this.toast.hide();
					}).catch(err => {
						this.toast.hide()
						this.toast.message('执行失败')
					})

				Object.assign(this.paperInFormItems, data);
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
					this.barCodeBlur();
				} else {
					this.toast.message('扫码失败请重试')
				}
			},
			// 清除按钮
			resetFrom() {
				this.$refs.lineDrawer2.clearFromData()
				this.$refs.lineDrawer.clearFromData()

				this.$refs.lineDrawer1.formItem.customers = ''
				this.paperInFormItems.supplier = ''
				this.paperInFormItems.deliveryNumber = ''
				this.paperInFormItems.licensePlateNumber = ''
				this.paperInFormItems.driver = ''
				this.paperInFormItems.prodNo = ''
				this.paperInFormItems.batchNo = ''
				this.paperInFormItems.poNo = ''
				this.paperInFormItems.specification = ''
				this.paperInFormItems.specification = ''
				this.$refs.lineDrawer.formItem.customers = ''
				this.$refs.lineDrawer2.formItem.customers = ''
				this.ProdName = ''
				setTimeout(() => {
					this.paperInFormItems.UnitName = ''
					this.paperInFormItems.poi_TaxPrice = ''
					this.paperInFormItems.poi_TaxMoney = ''
					this.paperInFormItems.inQuantity = ''
				}, 500)
				// paperInFormItems: {
				// 	supplier: 'F462', // 供应商
				// 	deliveryNumber: '', // 送货单号
				// 	licensePlateNumber: '', // 车牌号
				// 	driver: '', // 司机
				// 	prodNo: 'G0070', // 辅料
				// 	specification: '', // 规格
				// 	batchNo: '', // 批次号
				// 	inQuantity: '', // 入库数量
				// 	UnitName: '', //计价单位
				// 	poi_TaxPrice: '', // 含税单价
				// 	poi_TaxMoney: '', // 金额
				// 	poNo: '' // 采购单号

				// }
			},
			//确认提交===入仓===
			paprtIn() {
				console.log(this.paperInFormItems.supplier);
				// 提交前校验
				if (this.paperInFormItems.inQuantity == 0) {
					this.toast.message('入库数量不能为0')
					return
				}
				if (this.paperInFormItems.poi_TaxPrice == 0) {
					this.toast.message('含税单价不能为0')
					return
				}
				if (this.paperInFormItems.Positions === '') {
					this.toast.message('请选择仓位')
					return
				}
				if (this.inQuantityNumb > +this.inQuantityNuma) {
					this.toast.message('入库数量不可以超采购单未入库数量')
					return
				}
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let data = {
					UserID: user.erpUserCode,
					Vend: this.paperInFormItems.supplier,
					DeilNo: this.paperInFormItems.deliveryNumber,
					CarNo: this.paperInFormItems.licensePlateNumber,
					Dervice: this.paperInFormItems.driver,
					Prod: this.paperInFormItems.prodNo,
					po_No: this.paperInFormItems.poNo,
					poseriNo: this.paperInFormItems.batchNo,
					Station: this.paperInFormItems.Positions,
					InQty: this.paperInFormItems.inQuantity,
					UnitPrice: this.paperInFormItems.poi_TaxPrice
				};

				this.toast.loading();
				request.post(`/warehouse/warehouse/execute/appAspSaveProdIn`, data).then(res => {
						console.log(res)
						this.toast.hide();
						if (res.list && res.list[0].res == 1) {
							console.log(res);
							this.modalName = 'DialogModal1'
							this.nm_No = res.list[0].nm_No
							// 清空数据
							this.paperInFormItems.poNo = ''
							this.$refs.lineDrawer.clearFromData()
							this.paperInFormItems.batchNo = ''
							this.$refs.lineDrawer2.clearFromData()
							this.paperInFormItems.prodNo = ''
							this.paperInFormItems.specification = ''
							this.paperInFormItems.specification = ''
							this.$refs.lineDrawer.formItem.customers = ''
							this.$refs.lineDrawer2.formItem.customers = ''
							this.ProdName = ''
							setTimeout(() => {
								this.paperInFormItems.UnitName = ''
								this.paperInFormItems.poi_TaxPrice = ''
								this.paperInFormItems.poi_TaxMoney = ''
								this.paperInFormItems.inQuantity = ''
							}, 500)
						} else {
							this.toast.message('入库失败');
						}
					})
					.catch(err => {
						this.toast.message('入库失败');
						setTimeout(() => {
							this.toast.hide();
						}, 1000)
					});
			},
			// 销毁页面保存相关信息
			onUnload(){
				this.$store.commit('setPaperScanIn',{
					supplier: this.$refs.lineDrawer1.formItem.customers,
					deliveryNumber: this.paperInFormItems.deliveryNumber,
					licensePlateNumber: this.paperInFormItems.licensePlateNumber,
					driver: this.paperInFormItems.driver
					
				})
			}
		}
	}
</script>

<style>
	.test {
		height: 60px;
	}

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
