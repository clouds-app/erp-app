<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">辅料扫码出库</block>
		</cu-custom>
		<view class="flex-sub">
			<view class="cu-form-group">
				<view class="title">领料日期:</view>
				<input :disabled="true" v-model="currentDate" />
			</view>
		</view>
		<view class="flex-sub">
			<selectDropdown :defaultValue='paperInFormItems.department' :otherHeight='CustomBarHeight' ref="department" url="appFindDept" title="部ㅤ门ㅤ"
				placeholdertext="ㅤ请选择部门" v-model='paperInFormItems.department' :params='{modelCode:"prod_dept"}'>
			</selectDropdown>
		</view>
		<view class="flex-sub">
			<selectDropdown :otherHeight='CustomBarHeight' ref="groupCode" url="appFindClassBan" title="班ㅤ别ㅤ"
				placeholdertext="ㅤ请选择班别" v-model='paperInFormItems.groupCode' :params='{modelCode:""}'>
			</selectDropdown>
		</view>
		<view class="flex-sub">
			<selectDropdown :otherHeight='CustomBarHeight' ref="sendOutPerson" url="appFindUser" title="发料人ㅤ"
				placeholdertext="ㅤ请选择发料人" v-model='paperInFormItems.sendOutPerson'
				:params='{modelCode:"prod_userF",fieldDesc:"发料人"}'></selectDropdown>
		</view>
		<view class="flex-sub">
			<selectDropdown :otherHeight='CustomBarHeight' ref="getPerson" url="appFindUser" title="领料人ㅤ"
				placeholdertext="ㅤ请选择领料人" v-model='paperInFormItems.getPerson' :params='{modelCode:"prod_userL",fieldDesc:"领用人"}'>
			</selectDropdown>
		</view>
		<view class="flex-sub">
			<selectDropdown :setonlyOne="true" @closeMain='closeMain' :otherHeight='CustomBarHeight' ref="Positions"
				url="appFindSearchStation" title="仓ㅤ位ㅤ" placeholdertext="请选择仓位" v-model='paperInFormItems.Positions'
				:params='{modelCode:"prod_in"}'>
			</selectDropdown>
		</view>
		<view class="cu-form-group border-top">
			<view class="title">辅ㅤ料ㅤ:</view>
			<input v-model="paperInFormItems.prodNo" @blur="barCodeBlur" placeholder="请扫描辅料号" />
			<button @click="turnOnScanCode" type="primary" size="mini">扫描</button>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group">
				<view class="title">辅料名称:</view>
				<input :disabled="true" v-model="ProdName" />
			</view>
			<view class="cu-form-group">
				<view class="title">辅料类型:</view>
				<input :disabled="true" v-model="paperInFormItems.prodScanOut" />
			</view>
		</view>
		<view class="flex-sub">
			<view class="cu-form-group">
				<view class="title">规ㅤ格ㅤ:</view>
				<input :disabled="true" v-model="paperInFormItems.specification" />
			</view>
		</view>
		<view class="flex-sub">
			<selectDropdown :setonlyOne="true" :Reload="true" :otherHeight='CustomBarHeight' ref="groupDrawer1"
				url="appGetProdBatchInfoOut" title="批次号ㅤ" placeholdertext="请选择批次号" v-model='paperInFormItems.batchNo'>
			</selectDropdown>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group">
				<view class="title">库存数ㅤ:</view>
				<input disabled="true" v-model="paperInFormItems.inventoryData" />
			</view>
			<view class="cu-form-group">
				<view class="title">单位:</view>
				<input disabled="true" v-model="paperInFormItems.UnitName" />
			</view>
		</view>
		<view class="flex-sub">
			<view class="cu-form-group">
				<view style="color: red;" class="title">领料数ㅤ:</view>
				<input @input="getQuantityEvent" v-model="paperInFormItems.getQuantity" />
			</view>
		</view>
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button @click="resetFrom" type="primary" size="mini" class="bg-grey radius">清除</button>
			<button @click="paprtIn" type="primary" size="mini" class="bg-grey radius">保存</button>
		</view>
	</view>
</template>

<script>
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	import request from '@/utils/request.js';
	import warehouse from '@/mixins';
	import cuCustom from '@/ui/colorui/components/cu-custom.vue';
	export default {
		components: {
			cuCustom
		},
		mixins: [warehouse],
		data() {
			return {
				prodNoCode: '', // 储存辅料编号，以便用来获取库存数和单位
				ProdName: '', // 编号名称
				currentDate: new Date().toISOString().slice(0, 10), // 当前时间
				paperInFormItems: {
					department: '', // 部门
					groupCode: '', // 班别
					sendOutPerson: '', // 发料人
					getPerson: '', //领料人
					prodScanOut: '', // 辅料类型
					prodNo: '', // 辅料
					specification: '', // 规格
					batchNo: '', // 批次号
					Positions: '', // 仓位
					inventoryData: "0", // 库存数
					UnitName: '', //计价单位
					getQuantity: '', // 领料数
				}
			}
		},
		watch: {
			// 批次号发生改变，获取库存数和单位
			'paperInFormItems.batchNo'(newValue, oldValue) {
				setTimeout(() => {
					let data = {
						Station: this.paperInFormItems.Positions,
						Code: this.prodNoCode
					}
					request.post(`/warehouse/warehouse/execute/appGetProdBatchInfoOut`, data).then(res => {
						if (res.list.length === 0) {
							this.paperInFormItems.inQuantity = ''
							this.paperInFormItems.poi_TaxPrice = ''
							this.paperInFormItems.poi_TaxMoney = ''
						} else {
							// 取批和次号对应的值
							res.list.forEach((item, index) => {
								if (item.text === newValue) {
									this.paperInFormItems.UnitName = res.list[index].Unit
									this.paperInFormItems.inventoryData = res.list[index].StoreQty
								}
							})
						}
					})
				}, 600)

			},
			'paperInFormItems.department'(newValue, oldValue) {
				this.$refs.groupCode.getdataArray({
					modelCode: '',
					dept: newValue
				})
				this.$refs.getPerson.getdataArray({
					modelCode: 'prod_userL',
					dept: newValue,
					fieldDesc:'领用人'
				})
				if(newValue !== ''){
					this.paperInFormItems.groupCode = ''
					this.$refs.groupCode.formItem.customers = ''
				}
				console.log(newValue);
			},
		},
		mounted() {
			let groupCode = this.$store.state.paperScanOut.groupCode
			this.$refs.groupCode.formItem.customers = groupCode
			if (groupCode !== undefined) {
				this.paperInFormItems.groupCode = groupCode.split("_")[0]
			}
			let getPerson = this.$store.state.paperScanOut.getPerson
			this.$refs.getPerson.formItem.customers = getPerson
			if (getPerson !== undefined) {
				this.paperInFormItems.getPerson = getPerson.split("_")[0]
			}
			let sendOutPerson = this.$store.state.paperScanOut.sendOutPerson
			this.$refs.sendOutPerson.formItem.customers = sendOutPerson
			if (sendOutPerson !== undefined) {
				this.paperInFormItems.sendOutPerson = sendOutPerson.split("_")[0]
			}
			let department = this.$store.state.paperScanOut.department
			this.$refs.department.formItem.customers = department
			if (department !== undefined) {
				this.paperInFormItems.department = department.split("_")[0]
			}
			if (department === undefined || department === ''){
				this.$refs.groupCode.formItem.customers = 'FY_公司'
				this.paperInFormItems.groupCode = 'FY'
			}
		},
		methods: {
			closeMain() {
				if (this.paperInFormItems.prodNo !== '') {
					this.getParamsFromScanCode();
					this.$refs.groupDrawer1.getdataArray({
						Station: this.paperInFormItems.Positions,
						Code: this.paperInFormItems.prodNo
					})
				}
			},
			// 辅料类型扫码校验
			ValidateData() {
				let flag = flag
				if (this.paperInFormItems.prodNo === '') {
					this.toast.message('请输入辅料编号');
					flag = true
				}
				if (this.paperInFormItems.Positions === '') {
					this.toast.message('请输入仓位');
					flag = true
				}
				return flag
			},
			// 辅料扫码失败的清除方法
			clearBrodNo() {
				this.paperInFormItems.batchNo = ''
				this.paperInFormItems.prodScanOut = ''
				this.paperInFormItems.specification = ''
				this.$refs.groupDrawer1.clearFromData()
				this.paperInFormItems.inventoryData = ''
				this.paperInFormItems.UnitName = ''
				this.paperInFormItems.getQuantity = ''
				this.ProdName = ''
			},
			// 辅料类型扫码失焦事件
			barCodeBlur() {
				if (!!this.ValidateData()) {
					// 校验失败，清空相应数据
					this.clearBrodNo()
					return
				}
				this.getParamsFromScanCode();
				this.$refs.groupDrawer1.getdataArray({
					Station: this.paperInFormItems.Positions,
					Code: this.paperInFormItems.prodNo
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
					this.barCodeBlur();
				} else {
					this.toast.message('扫码失败请重试')
				}
			},
			//====入库====获取所需参数 从扫描中...
			getParamsFromScanCode() {
				let params = {
					Station: this.paperInFormItems.Positions, // 仓位
					Code: this.paperInFormItems.prodNo // 辅料
				}
				let data = []
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appGetProdOutInfoForOut', params)
					.then(res => {
						if (res.list.length === 0) {
							this.toast.hide();
							this.toast.message('无此辅料，请重新扫描!');
							this.clearBrodNo()
							return;
						}
						this.prodNoCode = res.list[0].Code // 储存辅料编号，以便用来获取库存数和单位
						this.paperInFormItems.prodNo = res.list[0].Code
						this.paperInFormItems.prodScanOut = res.list[0].Type
						this.paperInFormItems.specification = res.list[0].Model
						this.ProdName = res.list[0].ProdName
						this.toast.hide();
					}).catch(err => {
						this.toast.hide()
						this.toast.message('执行失败')
					})

				Object.assign(this.paperInFormItems, data);
			},
			// 清除事件
			resetFrom() {
				this.paperInFormItems.department = ''
				this.$refs.department.formItem.customers = ''
				this.paperInFormItems.groupCode = ''
				this.$refs.groupCode.formItem.customers = ''
				this.paperInFormItems.sendOutPerson = ''
				this.$refs.sendOutPerson.formItem.customers = ''
				this.paperInFormItems.getPerson = ''
				this.$refs.getPerson.formItem.customers = ''
				this.paperInFormItems.Positions = ''
				this.$refs.Positions.formItem.customers = ''
				this.paperInFormItems.prodNo = ''
				this.ProdName = ''
				this.clearBrodNo()
			},
			// 领料数input事件
			getQuantityEvent() {
				let data = parseFloat(this.paperInFormItems.inventoryData)
				console.log(data);
				if (this.paperInFormItems.inventoryData === '') {
					this.toast.message('库存数不能为空');
					setTimeout(() => {
						this.paperInFormItems.getQuantity = ''
					}, 100)
				} else {
					if (isNaN(this.paperInFormItems.getQuantity)) {
						this.toast.message('请输入数字');
						setTimeout(() => {
							this.paperInFormItems.getQuantity = ''
						}, 100)
					}
					if (this.paperInFormItems.getQuantity > data) {
						this.toast.message('领料数不能大于库存数');
						setTimeout(() => {
							this.paperInFormItems.getQuantity = ''
						}, 100)
					}
				}
			},
			// 出仓校验
			ValidateOut() {
				let falg = false
				if (this.paperInFormItems.getQuantity === '') {
					this.toast.message('领料数不能为空');
					falg = true
				}
				if (this.paperInFormItems.batchNo === '') {
					this.toast.message('批次号不能为空');
					falg = true
				}
				if (this.paperInFormItems.prodScanOut === '') {
					this.toast.message('辅料不能为空');
					falg = true
				}
				if (this.paperInFormItems.Positions === '') {
					this.toast.message('仓位不能为空');
					falg = true
				}
				if (this.paperInFormItems.getPerson === '') {
					this.toast.message('领料人不能为空');
					falg = true
				}
				if (this.paperInFormItems.sendOutPerson === '') {
					this.toast.message('发料人不能为空');
					falg = true
				}
				if (this.paperInFormItems.groupCode === '') {
					this.toast.message('班别不能为空');
					falg = true
				}
				if (this.paperInFormItems.department === '') {
					this.toast.message('部门不能为空');
					falg = true
				}
				return falg
			},
			//确认提交===出仓===
			paprtIn() {
				console.log(this.paperInFormItems.batchNo);
				if (!!this.ValidateOut()) {
					return
				}
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let data = {
					UserID: user.erpUserCode,
					Dept: this.paperInFormItems.department,
					Team: this.paperInFormItems.groupCode,
					WorkNoF: this.paperInFormItems.sendOutPerson,
					WorkNoL: this.paperInFormItems.getPerson,
					Station: this.paperInFormItems.Positions,
					Prod: this.prodNoCode,
					poseriNo: this.paperInFormItems.batchNo,
					OutQty: this.paperInFormItems.getQuantity,
				};
				this.toast.loading();
				request.post(`/warehouse/warehouse/execute/appAspSaveProdOut`, data).then(res => {
						this.toast.hide();
						if (res.list && res.list[0].res == 1) {
							this.toast.message('出库成功');
							// 清除数据
							this.paperInFormItems.prodNo = ''
							this.clearBrodNo()
						} else {
							this.toast.message('出库失败');
						}
					})
					.catch(err => {
						this.toast.message('出库失败');
						setTimeout(() => {
							this.toast.hide();
						}, 1000)
					});
			},
			// 销毁页面保存相关信息
			onUnload() {
				this.$store.commit('paperScanOut', {
					groupCode: this.$refs.groupCode.formItem.customers,
					getPerson: this.$refs.getPerson.formItem.customers,
					sendOutPerson: this.$refs.sendOutPerson.formItem.customers,
					department: this.$refs.department.formItem.customers,
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
