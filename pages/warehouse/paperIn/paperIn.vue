<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">纸板出入库</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="0 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="0">入ㅤ库</view>
				<view class="cu-item flex-sub" :class="1 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="1">寻ㅤ货</view>
				<view class="cu-item flex-sub" :class="2 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="2">出仓扫描</view>
			</view>
		</scroll-view>
		<!-- ===入 库=== -->
		<form v-show="0 == TabCur">
			
		</form>

		<!-- ===寻 货=== -->
		<form v-show="1 == TabCur">
			</form>
		<!--=== 出仓扫描 ===-->
		<form v-show="2 == TabCur">
			<view class="bodyContentHeight2">
				<view class="cu-form-group border-top">
					<view class="title">车ㅤ次:</view>
					<input v-model="paperOutItem.batch" placeholder="请输入车次" />
				</view>
				<view class="cu-form-group">
					<view class="title">工单号:</view>
					<input v-model="paperOutItem.fOrderNo" placeholder="请输入工单号" />
					<button @click="turnOnScanCode('out')" type="primary" size="mini">扫描</button>
				</view>
			</view>
			<view class="margin-text-center">
				<button @click="paperOut()" :loading="false" :disabled="false" type="primary" class="primary-btn">查ㅤ询</button>
			</view>
			<zTable :showLoading="false" :emptyText="errorContent" :tableData="paperOutTableDataItems" :columns="findGoodsColumns"></zTable>
		</form>
	</view>
</template>

<script>
import zTable from '@/components/z-table/z-table.vue';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
export default {
	name: 'paperIn',
	components: { zTable, cuCustom },
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			dataTableList: [],
			errorContent: '暂无数据', //数据加载中...
			tableHeight: 0, //表格高度
			findGoodsTableDataItems: [],
			paperOutTableDataItems: [],
			paperInFormItems: {
				instruct: '', //指令
				station: '', //仓位
				fOrderNo: '', //工单号
				line: '', //线别
				group: '', //班别
				fQty: '', //数量
				fDNum: '', //板号,
				desc: '' //备注
			},
			paperInFormInit: {
				instruct: '', //指令
				station: '', //仓位
				fOrderNo: '', //工单号
				line: '', //线别
				group: '', //班别
				fQty: '', //数量
				fDNum: '', //板号,
				desc: '' //备注
			},
			findGoodsItem: {
				fOrderNo: '' //工单号
			},
			paperOutItem: {
				fOrderNo: '', //工单号
				batch: ''
			},
			findGoodsColumns: [
				{
					key: 'OrderNo',
					title: '工单号',
					width: 200
				},
				{
					key: 'Station',
					title: '仓位',
					width: 200
				},
				{
					key: 'FNum',
					title: '板号',
					width: 200
				},
				{
					key: 'State',
					title: '状态',
					width: 145
				}
			]
		};
	},
	// #ifdef H5
	mounted() {},

	// #endif
	// #ifndef H5
	onReady() {},
	// #endif
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		//打开扫描
		turnOnScanCode(type) {
			let _self = this;
			// 调起条码扫描
			uni.scanCode({
				scanType: 'barCode',
				success: function(res) {
					// console.log('条码类型：' + res.scanType);
					_self.play_dede()
					switch (type) {
						case 'in': //入库
							_self.paperInFormItems.instruct = res.result;
							_self.getParamsFromScanCode();
							break;
						case 'out': //出仓
							this.paperOutItem.fOrderNo = res.result;
							break;
						case 'search': //寻货
							this.findGoodsItem.fOrderNo = res.result;
							break;

						default:
							break;
					}
				}
			});
		},
		barCodeBlur() {
			if (this.paperInFormItems.instruct == '') {
				this.toast.message('请输入或扫描条码')
				return;
			}
			this.getParamsFromScanCode();
		},
		//====入库====获取所需参数 从扫描中...
		getParamsFromScanCode() {
			let instruct = this.paperInFormItems.instruct.split('*');
			if (instruct.length < 5) {
				this.toast.message('数据解析失败，参数个数不够');
				return;
			}
			let data = {
				fOrderNo: instruct[0],
				fDNum: instruct[1],
				fQty: instruct[2],
				line: instruct[3],
				group: instruct[4]
			};
			Object.assign(this.paperInFormItems, data);
		},
		//查询数据
		paperInRequest(data) {
			return request.post('/warehouse/warehouse/execute/spScanOrder', data);
		},
		//确认提交===入仓===
		paprtIn() {
			if (this.paperInFormItems.station == '') {
				this.toast.message('请输入仓位');
				return;
			}
			if (
				this.paperInFormItems.fOrderNo == '' ||
				this.paperInFormItems.fQty == '' ||
				this.paperInFormItems.fDNum == '' ||
				this.paperInFormItems.line == '' ||
				this.paperInFormItems.group == ''
			) {
				this.toast.message('请先扫描完整的指令');
				return;
			}
			let data = {
				BarCodeStr: this.paperInFormItems.instruct,
				Station: this.paperInFormItems.station,
				Flag: 0,
				FOrderNo: this.paperInFormItems.fOrderNo,
				FQty: this.paperInFormItems.fQty,
				FDNum: this.paperInFormItems.fDNum,
				FLine: this.paperInFormItems.line,
				FClass: this.paperInFormItems.group,
				Remark: this.paperInFormItems.desc
			};
			//debugger
			this.toast.loading();
			this.paperInRequest(data)
				.then(res => {
					this.toast.hide();
					if (res.list && res.list[0].res == 1) {
						this.toast.message('入仓成功');
					} else {
						this.toast.message('入仓失败');
					}
				})
				.catch(err => {
					this.toast.message('入仓失败');
					this.toast.hide();
				});
		},
		//====查询====
		findGoods() {
			//寻货
			if (this.findGoodsItem.fOrderNo == '') {
				this.toast.message('请输入或扫描工单号')
				return;
			}
			let data = {
				FOrderNo: this.findGoodsItem.fOrderNo, //this.instruct,//????
				BarCodeStr: this.findGoodsItem.fOrderNo,
				Flag: 2
			};
			this.paperInRequest(data)
				.then(res => {
					if (res.list && res.list.length > 0) {
						this.findGoodsTableDataItems = res.list;
					}
				})
				.catch(err => {
					this.toast.message('暂无数据');
				});
		},
		//====出仓====
		paperOut() {
			if (this.paperOutItem.fOrderNo == '') {
				this.toast.message('请输入或扫描工单号');
				return;
			}
			if (this.paperOutItem.batch == '') {
				this.toast.message('请输入车次');
				return;
			}
			let data = {
				FOrderNo: this.paperOutItem.fOrderNo,
				BarCodeStr: '',
				// Batch: this.paperOutItem.batch,
				Flag: 1
			};
			this.toast.loading();
			this.paperInRequest(data)
				.then(res => {
					this.toast.hide();
					if (res.list && res.list.length > 0) {
						this.paperOutTableDataItems = res.list;
					}
				})
				.catch(err => {
					this.toast.hide();
					this.toast.message('暂无数据');
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
