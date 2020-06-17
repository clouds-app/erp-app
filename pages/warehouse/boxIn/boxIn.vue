<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">纸箱出入库</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="0 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="0">成品入库</view>
				<view class="cu-item flex-sub" :class="1 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="1">成品出库</view>
				<view class="cu-item flex-sub" :class="2 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="2">半成品入库</view>
			</view>
		</scroll-view>
		<!-- ===成品入库=== -->
		<form v-show="0 == TabCur">
			</form>
		<!-- ===成品==出库=== -->
		<form v-show="1 == TabCur">
			</form>
		<!--=== 半成品入库 ===-->
		<form v-show="2 == TabCur">
			<view class="cu-form-group border-top">
				<view class="title">工单号:</view>
				<input v-model="boxInc.formItem.hp_bi_WorkNo" @blur="boxIncGetOrderInfo" placeholder="请输入工单号" />
				<button @click="turnOnScanCode('workNo')" type="primary" size="mini">扫描</button>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">工ㅤ序:</view>
						<input v-model="boxInc.formItem.hp_wpl_Id" placeholder="请输入工序" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">机ㅤ台:</view>
						<input v-model="boxInc.formItem.hp_mo_ID" placeholder="请输入机台" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">班ㅤ别:</view>
						<input v-model="boxInc.formItem.hp_tt_Code" placeholder="请输入班别" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">数ㅤ量:</view>
						<input ref="boxInc_qty" v-model="boxInc.formItem.Qty" placeholder="请输入数量" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">客户名:</view>
						<input v-model="boxInc.formItem.ct_Desc" :disabled="true" placeholder="请输客户名" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">产品名:</view>
						<input v-model="boxInc.formItem.bi_ProdName" :disabled="true" placeholder="请输产品名" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">规ㅤ格:</view>
						<input v-model="boxInc.formItem.Specs" :disabled="true" placeholder="请输入规格" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">工单数:</view>
						<input v-model="boxInc.formItem.bp_ProQty" :disabled="true" placeholder="请输工单数" />
					</view>
				</view>
			</view>
			<view class="cu-form-group border-top"><textarea maxlength="-1" v-model="boxInc.formItem.Remark" placeholder="请输入备注"></textarea></view>
			<!-- 半成品入库 -->
			<view v-if="boxInc.dataIsLoadding" class="margin-text-center"><button @click="aspSaveBoxHalfProdIn" type="primary" class="primary-btn">入库</button></view>
		</form>
	</view>
</template>

<script>
//纸箱出入库
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import zTable from '@/components/z-table/z-table.vue';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import dateFormat from '@/utils/dateFormat.js';
import warehouse from '@/mixins/warehouse.js'
export default {
	name: 'boxIn', //纸箱出入库
	components: { zTable, uniPopup, cuCustom },
	mixins:[warehouse],
	data() {
		return {
			currentSelected: '-1',
			TabCur: 0,
			scanType: '', //当前扫描类型
			scrollLeft: 0,
			dataTableList: [],
			errorContent: '暂无数据', //'数据加载中...',
			tableHeight: 400, //表格高度
			boxIn: {
				formItem: {
					//成品入库
					bi_WorkNo: '', //工单号
					bi_Group: '', //班ㅤ别
					bi_InQty: '', //数 量
					ct_Desc: '', //客户名
					bi_ProdName: '', //产品名
					Specs: '', //规ㅤ格
					bp_CBoxID: '', //箱ㅤ型
					bp_PArtID: '', //纸ㅤ质
					bp_ArtLB: '', //楞ㅤ别
					bp_ProQty: '' //工单数
				},
				formItemInit: {
					bi_WorkNo: '', //工单号
					bi_Group: '', //班ㅤ别
					bi_InQty: '', //数 量
					ct_Desc: '', //客户名
					bi_ProdName: '', //产品名
					Specs: '', //规ㅤ格
					bp_CBoxID: '', //箱ㅤ型
					bp_PArtID: '', //纸ㅤ质
					bp_ArtLB: '', //楞ㅤ别
					bp_ProQty: '' //工单数
				},
				dataIsLoadding: false
			},
			boxOut: {
				formItem: {
					//成品出库
					bd_CarNo: '', //车ㅤ牌
					bd_Follower: '', //跟车员
					bd_Loador: '', //发货员
					bd_SenderID: '', //发货员
					bi_OrderNo: '', //订单号
					bi_OrderQty: '' //数量
				},
				formItemText: {
					bd_CarNo: '', //车ㅤ牌
					bd_Follower: '', //跟车员
					bd_Loador: '', //发货员
					bd_SenderID: '' //发货员
				},
				formItemInit: {
					bd_CarNo: '', //车ㅤ牌
					bd_Follower: '', //跟车员
					bd_Loador: '', //发货员
					bd_SenderID: '', //发货员
					bi_OrderNo: '', //订单号
					bi_OrderQty: '' //数量
				},
				car: {
					//车牌列表
					items: [],
					show: false
				},
				follower: {
					//跟车员
					items: [],
					show: false
				},
				loader: {
					//装车员
					items: [],
					show: false
				},
				sender: {
					//发货员
					items: [],
					show: false
				},
				tableData: []
			},
			boxInc: {
				//半成品入库 对象
				formItem: {
					hp_wpl_Id: '', //工ㅤ序
					hp_mo_ID: '', //机ㅤ台
					hp_tt_Code: '', //班ㅤ别
					hp_bi_WorkNo: '', //工单号
					Qty: '', //数量
					Remark: '', //备注
					ct_Desc: '', //客户名
					bi_ProdName: '', //产品名
					Specs: '', //规ㅤ格
					bp_ProQty: '' //工单数
				},
				formItemInit: {
					hp_wpl_Id: '', //工ㅤ序
					hp_mo_ID: '', //机ㅤ台
					hp_tt_Code: '', // 班ㅤ别
					hp_bi_WorkNo: '', //工单号
					Qty: '', //数量
					Remark: '', //备注
					ct_Desc: '', //客户名
					bi_ProdName: '', //产品名
					Specs: '', //规ㅤ格
					bp_ProQty: '' //工单数
				},
				dataIsLoadding: false
			},
			tableColumns: [
				{
					key: 'bc_No',
					title: '订单号',
					width: 180,
					isResize: true
				},
				{
					key: 'ct_Desc',
					title: '客户名称',
					width: 200,
					isResize: true
				},
				{
					key: 'bi_ProdName',
					title: '产品名称',
					width: 200,
					isResize: true
				},
				{
					key: 'bi_OrderQty',
					title: '数量',
					width: 180,
					isResize: true
				},
				{
					key: 'Specs',
					title: '规格',
					width: 180,
					isResize: true
				}
			]
		};
	},
	// #ifdef H5
	mounted() {
		this.messageRegister();
	},

	// #endif
	// #ifndef H5
	onReady() {
		this.messageRegister();
	},
	// #endif
	methods: {
		//映射方法
		//页面通讯,事件注册
		messageRegister() {
			let _self = this;
			//选中 回调 事件
			uni.$on('getSelectData', function(data) {
				switch (_self.currentSelected) {
					case '车牌号':
						_self.carConfirm(data.msg);
						break;
					case '跟车员':
						_self.followerConfirm(data.msg);
						break;
					case '装车员':
						_self.loaderConfirm(data.msg);
						break;
					case '发货员':
						_self.senderConfirm(data.msg);
						break;
					default:
						break;
				}
			});
		},
		//标签切换 事件
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		//跳转到数据选择页面
		turnToPageDataSelect(dataSouce, title) {
			this.currentSelected = title;
			this.cache.put('setDataSelectedPageTitle', title);
			this.cache.put('setDataSelectedList', dataSouce);
			uni.navigateTo({
				url: '/components/list-select/list-select'
			});
		},
		//成品入库===工单号===验证是否存在
		boxInGetOrderInfo() {
			if (this.boxIn.formItem.bi_WorkNo == '') {
				this.toast.message('请输入或扫描工单号')
				return;
			}
			let data = {
				bi_WorkNo: this.boxIn.formItem.bi_WorkNo,
				Flag: 0
			};
			this.boxIn.dataIsLoadding = false;
			this.getWarehouseDataProvider('boxScanOrder',data)
				.then(res => {
					if (res.list && res.list.length > 0) {
						Object.assign(this.boxIn.formItem, res.list[0]);
						this.boxIn.dataIsLoadding = true;
						return;
					} else {
						this.toast.message('没有该工单对应的数据')
					}
				})
				.catch(err => {
					this.errorContent = '暂无数据';
					this.toast.message('获取数据失败:' + err)
				});
		},
		//成品===确认===入库
		boxInAspSaveBoxIn() {
			if (this.boxIn.formItem.bi_WorkNo == '') {
				this.toast.message('请输入或扫描工单号');
				return;
			}
			if (this.boxIn.formItem.bi_Group == '') {
				this.toast.message('请输入班别');
				return;
			}
			if (this.boxIn.formItem.bi_InQty == '') {
				this.toast.message('请输入数量');
				return;
			}
			let data = {
				bi_WorkNo: this.boxIn.formItem.bi_WorkNo,
				bi_Group: this.boxIn.formItem.bi_Group,
				bi_InQty: this.boxIn.formItem.bi_InQty
			};
			this.toast.loading();
			this.getWarehouseDataProvider('aspSaveBoxIn',data).then(res => {
				this.toast.hide();
				if (res.list.length > 0) {
					if (res.list[0].ErrorStr && res.list[0].ErrorStr != '') {
						this.toast.message(res.list[0].ErrorStr);
						return;
					} else {
						this.toast.message('入库成功');
					}
					//重置数据
					this.boxIn.formItem = JSON.parse(JSON.stringify(this.boxIn.formItemInit));
					return;
				} else {
					this.toast.message('入库失败');
				}
			})
			.catch(err => {
				//this.errorContent = '暂无数据';
				this.toast.hide();
				this.toast.message('入库失败' + err);
			});
		},
		//纸箱出入库--数据请求
		boxOutGetBaseInfo(params) {
			return this.getWarehouseDataProvider('findUser',params)
		},
		//获取===车ㅤ牌===列表
		getCarInfo() {
			//如果当前页面有缓存,就无需重新加载
			if (this.currentSelected === '车牌号' && this.boxOut.car.items.length > 0) {
				uni.navigateTo({
					url: '/components/list-select/list-select'
				});
				return;
			}
			this.getWarehouseDataProvider('findCar').then(res => {
				this.boxOut.car.items = res.list
				this.boxOut.car.show = true
				this.turnToPageDataSelect(res.list, '车牌号')
			})
		},
		//选择车牌 回调事件
		carConfirm(item) {
			this.boxOut.formItem.bd_CarNo = item.value;
			this.boxOut.formItemText.bd_CarNo = item.text;
			this.boxOut.car.show = false;
		},
		//获取跟车员列表数据
		getFollowerInfo() {
			if (this.currentSelected === '跟车员' && this.boxOut.follower.items.length > 0) {
				uni.navigateTo({
					url: '/components/list-select/list-select'
				});
				this.boxOut.follower.show = true;
				return;
			}
			this.boxOutGetBaseInfo({
				workType: '5,18'
			}).then(res => {
				this.boxOut.follower.items = res.list;
				this.boxOut.follower.show = true;
				this.turnToPageDataSelect(res.list, '跟车员');
			});
		},
		//选中跟车员 回调事件
		followerConfirm(item) {
			this.boxOut.formItem.bd_Follower = item.value;
			this.boxOut.formItemText.bd_Follower = item.text;
			this.boxOut.follower.show = false;
		},
		//获取装车员列表
		getLoaderInfo() {
			if (this.currentSelected === '装车员' && this.boxOut.loader.items.length > 0) {
				uni.navigateTo({
					url: '/components/list-select/list-select'
				});
				this.boxOut.loader.show = true;
				return;
			}
			this.boxOutGetBaseInfo({
				workType: '6,18'
			}).then(res => {
				this.boxOut.loader.items = res.list;
				this.boxOut.loader.show = true;
				this.turnToPageDataSelect(res.list, '装车员');
			});
		},
		//选中 装车员 回调事件
		loaderConfirm(item) {
			this.boxOut.formItem.bd_Loador = item.value;
			this.boxOut.formItemText.bd_Loador = item.text;
			this.boxOut.loader.show = false;
		},
		//获取发货员列表
		getSenderInfo() {
			if (this.currentSelected === '发货员' && this.boxOut.sender.items.length > 0) {
				uni.navigateTo({
					url: '/components/list-select/list-select'
				});
				this.boxOut.sender.show = true;
				return;
			}
			this.boxOutGetBaseInfo({
				workType: '2,18'
			}).then(res => {
				this.boxOut.sender.items = res.list;
				this.boxOut.sender.show = true;
				this.turnToPageDataSelect(res.list, '发货员');
			});
		},
		//选中发车员 回调事件
		senderConfirm(item) {
			this.boxOut.formItem.bd_SenderID = item.value;
			this.boxOut.formItemText.bd_SenderID = item.text;
			this.boxOut.sender.show = false;
		},
		//成品出库=== 查ㅤ找===对应订单号
		boxOutGetOrderInfo() {
			if (this.boxOut.formItem.bi_OrderNo == '') {
				this.toast.message('请输入订单号')
				return;
			}
			if (this.boxOut.formItem.bi_OrderQty == '') {
				this.toast.message('请输入数量')
				return;
			}
			for (let i = 0; i < this.boxOut.tableData.length; i++) {
				let item = this.boxOut.tableData[i];
				if (item.bc_No == this.boxOut.formItem.bi_OrderNo) {
					this.boxOut.formItem.bi_OrderNo = '';
					this.toast.message('订单已存在')
					return;
				}
			}
			let data = {
				bc_No: this.boxOut.formItem.bi_OrderNo,
				Flag: 1
			};
			//查询对应订单号 数据列表
			this.errorContent = '数据加载中...';
			this.getWarehouseDataProvider('boxScanOrder',data)
				.then(res => {
					if (res.list && res.list.length > 0) {
						let temp = res.list[0];
						temp.bi_OrderQty = this.boxOut.formItem.bi_OrderQty;
						this.boxOut.tableData = [...this.boxOut.tableData, temp];
						return;
					} else {
						this.errorContent = '暂无数据';
						this.toast.message('没有该订单号对应的数据')
					}
				}).catch(err => {
					this.errorContent = '暂无数据';
				});
		},
		//成品出库==确认出库
		aspSaveBoxOutTemp() {
			let noAry = [];
			let numAry = [];
			this.boxOut.tableData.forEach((item, index) => {
				noAry.push(item.bc_No);
				numAry.push(item.bi_OrderQty);
			});
			if (noAry.length == 0 || numAry == 0 || noAry.length != numAry.length) {
				this.toast.message('数据不能为空,提交数据不完整')
				return;
			}
			let data = {
				bd_CarNo: this.boxOut.formItem.bd_CarNo,
				bd_Follower: this.boxOut.formItem.bd_Follower,
				bd_Loador: this.boxOut.formItem.bd_Loador,
				bd_SenderID: this.boxOut.formItem.bd_SenderID,
				OrderQtyStr: numAry.toString(),
				NoStr: noAry.toString()
			};
			this.getWarehouseDataProvider('aspSaveBoxOutTemp',data)
				.then(res => {
					if (res.list.length > 0) {
						if (res.list[0].ErrorStr && res.list[0].ErrorStr != '') {
							this.toast.message(res.list[0].ErrorStr)
							return;
						}
						this.toast.message('出仓成功')
						this.boxOut.formItem = JSON.parse(JSON.stringify(this.boxOut.formItemInit));
						this.boxOut.tableData = [];
						return;
					}
					this.toast.message('出仓失败')
				})
		},
		//半成品入库===工单号===验证是否存在
		boxIncGetOrderInfo() {
			if (this.boxInc.formItem.hp_bi_WorkNo == '') {
				this.toast.message('请输入或扫描工单号')
				return;
			}
			let data = {
				bi_WorkNo: this.boxInc.formItem.hp_bi_WorkNo,
				Flag: 0
			};
			this.boxInc.dataIsLoadding = false;
			this.getWarehouseDataProvider('boxScanOrder',data)
				.then(res => {
					if (res.list && res.list.length > 0) {
						Object.assign(this.boxInc.formItem, res.list[0]);
						this.boxInc.dataIsLoadding = true;
						return;
					} else {
						this.toast.message('没有该工单对应的数据')
					}
				})
				.catch(err => {
					//this.errorContent = '暂无数据';
				});
		},
		//===半成品==确认===入库====
		aspSaveBoxHalfProdIn() {
			if (this.boxInc.formItem.hp_bi_WorkNo == '') {
				this.toast.message('请输入或扫描工单号')
				return;
			}
			if (this.boxInc.formItem.Qty == '') {
				this.toast.message('请输入数量')
				//this.$refs.boxInc_qty.focus();
				return;
			}
			let data = {
				hp_bi_WorkNo: this.boxInc.formItem.hp_bi_WorkNo,
				hp_wpl_Id: this.boxInc.formItem.hp_wpl_Id,
				hp_mo_ID: this.boxInc.formItem.hp_mo_ID,
				hp_tt_Code: this.boxInc.formItem.hp_tt_Code,
				Qty: this.boxInc.formItem.Qty,
				Remark: this.boxInc.formItem.Remark
			};

			this.getWarehouseDataProvider('aspSaveBoxHalfProdIn',data)
				.then(res => {
					if (res.list.length > 0) {
						if (res.list[0].ErrorStr && res.list[0].ErrorStr != '') {
							this.toast.message(res.list[0].ErrorStr)
							return;
						} else {
							this.toast.message('入仓成功')
							this.boxInc.formItem = JSON.parse(JSON.stringify(this.boxInc.formItemInit));
							return;
						}
					} else {
						this.toast.message('入仓失败')
					}
				})
		},
		//===打开扫描===
		turnOnScanCode(type) {
			this.scanType = type;
			let _self = this;
			// 调起条码扫描
			uni.scanCode({
				scanType: 'barCode',
				success: function(res) {
					// console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					switch (_self.TabCur) {
						case 0: //成品入库
							//工单号
							_self.boxIn.formItem.bi_WorkNo = res.result;
							_self.boxInGetOrderInfo(); //工单号验证查询
							break;
						case 1: //成品出库
							_self.boxOut.formItem.bi_OrderNo = res.result;
							break;
						case 2: //半成品入库
							_self.boxInc.formItem.hp_bi_WorkNo = res.result;
							_self.boxIncGetOrderInfo(); //工单号验证查询
							break;

						default:
							break;
					}
				}
			});
		}
	}
};
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
</style>
