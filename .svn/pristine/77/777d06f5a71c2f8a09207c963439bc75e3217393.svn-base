<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">原纸出退仓</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="0 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="0">出ㅤ仓</view>
				<view class="cu-item flex-sub" :class="1 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="1">退ㅤ仓</view>
				<view class="cu-item flex-sub" :class="2 == TabCur ? 'text-blue cur' : ''" @tap="tabSelect" data-id="2">存库查询</view>
			</view>
		</scroll-view>
		<!-- ===出ㅤ仓=== -->
		<form v-show="0 == TabCur">
			<view class="cu-form-group border-top">
				<view class="title">指ㅤ令:</view>
				<input v-model="paperOutFormItems.instruct" @blur="paperOutInstructBlur" placeholder="请输入或扫描指令:0+0+0+0+0" name="input" />
				<button @click="turnOnScanCode('orderNo')" type="primary" size="mini">扫描</button>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">线ㅤ别:</view>
						<input v-model="paperOutFormItems.line" placeholder="请输入线别" name="input" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">班ㅤ别:</view>
						<input v-model="paperOutFormItems.group" placeholder="请输入班别" name="input" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">发ㅤ料:</view>
						<input v-model="paperOutFormItems.outUser" placeholder="请输入发料" name="input" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">领ㅤ料:</view>
						<input v-model="paperOutFormItems.inUser" placeholder="请输入领料" name="input" />
					</view>
				</view>
			</view>
			<view class="cu-form-group border-top">
				<view class="title">卷ㅤ号:</view>
				<input @blur="getOutPaperInfo()" v-model="paperOutFormItems.coil" placeholder="请输入或扫描卷号:0+0+0+0+0" name="input" />
				<button @click="turnOnScanCode('rollNo')" type="primary" size="mini">扫描</button>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">纸ㅤ类:</view>
						<input :disabled="true" v-model="paperOutFormItems.paperType" placeholder="请输入纸类" name="input" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">克ㅤ重:</view>
						<input :disabled="true" v-model="paperOutFormItems.gram" placeholder="请输入克重" name="input" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">纸ㅤ度:</view>
						<input :disabled="true" v-model="paperOutFormItems.paperWidth" placeholder="请输入纸度" name="input" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">重ㅤ重:</view>
						<input ref="ewt_input" :disabled="true" v-model="paperOutFormItems.ewt" placeholder="请输入重重" name="input" />
					</view>
				</view>
			</view>
			<view class="cu-form-group border-top"><textarea maxlength="-1" v-model="paperOutFormItems.desc" placeholder="请输入备注"></textarea></view>
			<!-- v-if="paperOutBtnShow" -->
			<view class="margin-text-center"><button @click="paperOut()"  type="primary" class="primary-btn">出ㅤ仓</button></view>
		</form>

		<!-- ===退ㅤ仓=== -->
		<form v-show="1 == TabCur">
			<view class="cu-form-group border-top">
				<view class="title">指ㅤ令:</view>
				<input v-model="paperBackFormItems.instruct" @blur="paperBackInstructBlur" placeholder="请输入或扫描指令:0+0+0+0+0" name="input" />
				<button @click="turnOnScanCode('orderNo')" type="primary" size="mini">扫描</button>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">线ㅤ别:</view>
						<input v-model="paperBackFormItems.line" placeholder="请输入线别" name="input" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">班ㅤ别:</view>
						<input v-model="paperBackFormItems.group" placeholder="请输入班别" name="input" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">发ㅤ料:</view>
						<input v-model="paperBackFormItems.outUser" placeholder="请输入发料" name="input" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">领ㅤ料:</view>
						<input v-model="paperBackFormItems.inUser" placeholder="请输入领料" name="input" />
					</view>
				</view>
			</view>
			<view class="cu-form-group border-top">
				<view class="title">卷ㅤ号:</view>
				<input @blur="getBackPaperInfo()" v-model="paperBackFormItems.coil" placeholder="请输入或扫描卷号:0+0+0+0+0" name="input" />
				<button @click="turnOnScanCode('rollNo')" type="primary" size="mini">扫描</button>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">纸ㅤ类:</view>
						<input :disabled="true" v-model="paperBackFormItems.paperType" placeholder="请输入纸类" name="input" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">克ㅤ重:</view>
						<input :disabled="true" v-model="paperBackFormItems.gram" placeholder="请输入克重" name="input" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">纸ㅤ度:</view>
						<input :disabled="true" v-model="paperBackFormItems.paperWidth" placeholder="请输入纸度" name="input" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">重ㅤ重:</view>
						<input ref="back_ewt" :disabled="true" v-model="paperBackFormItems.ewt" placeholder="请输入重重" name="input" />
					</view>
				</view>
			</view>
			<view class="cu-form-group border-top"><textarea maxlength="-1" v-model="paperBackFormItems.desc" placeholder="请输入备注"></textarea></view>

			<!-- v-if="paperBackBtnShow" -->
			<view class="margin-text-center"><button @click="paperBack()"  type="primary" class="primary-btn">退ㅤ仓</button></view>
		</form>
		<!--=== 存库查询 ===-->
		<form v-show="2 == TabCur">
			<view class="bodyContentHeight">
				<view class="cu-form-group border-top">
					<view class="title">制造商:</view>
					<input v-model="paperStoreItem.Vend" placeholder="请输入制造商" name="input" />
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">纸ㅤ类:</view>
							<input v-model="paperStoreItem.Type" placeholder="请输入纸类" name="input" />
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">仓ㅤ位:</view>
							<input v-model="paperStoreItem.Station" placeholder="请输入仓位" name="input" />
						</view>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">纸ㅤ度:</view>
							<input v-model="paperStoreItem.Width" placeholder="请输入纸度" name="input" />
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">克ㅤ重:</view>
							<input v-model="paperStoreItem.Gram" placeholder="请输入克重" name="input" />
						</view>
					</view>
				</view>
				<view class="cu-form-group border-top">
					<view class="title">卷号:</view>
					<input v-model="paperStoreItem.Coil" placeholder="请输入卷号" name="input" />
					<!-- <button type="primary" size="mini">扫描</button> -->
				</view>
			</view>
			<view class="margin-text-center"><button @click="paperStoreSearch"  type="primary" class="primary-btn">查ㅤ询</button></view>
			<zTable :tableHeight="storeTableHeight" :showLoading="false" :emptyText="errorContent" :tableData="paperStoreTableData" :columns="paperStoreColumns"></zTable>
		</form>
	</view>
</template>

<script>
import zTable from '@/components/z-table/z-table.vue';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import dateFormat from '@/utils/dateFormat.js';
export default {
	name: 'paperOB', ///原纸出退仓
	components: { zTable, cuCustom },
	data() {
		return {
			scanType: 'orderNo', //scanType:指令 rollNo:卷号
			TabCur: 0,
			scrollLeft: 0,
			dataTableList: [],
			errorContent: '暂无数据', //'数据加载中...',
			tableHeight: 500, //表格高度
			paperStoreTableData: [],
			operStatus: '',
			paperOutBtnShow: false,
			paperBackBtnShow: false,
			paperOutFormItems: {
				//出仓
				instruct: '', //指令
				line: '', //线别
				group: '', //班别
				outUser: '', //发料
				inUser: '', //领料,
				coil: '', //卷号
				paperType: '暂ㅤ无', //纸类
				gram: '0', //克重
				paperWidth: '暂ㅤ无', //纸度
				ewt: '0', //重量
				desc: '' //备注
			},
			paperBackFormItems: {
				//退仓
				instruct: '', //指令
				line: '', //线别
				group: '', //班别
				outUser: '', //发料
				inUser: '', //领料,
				coil: '', //卷号
				paperType: '暂ㅤ无', //纸类
				gram: '0', //克重
				paperWidth: '暂ㅤ无', //纸度
				ewt: '0', //重量
				desc: '' //备注
			},
			paperOutFormInit: {
				instruct: '', //指令
				line: '', //线别
				group: '', //班别
				outUser: '', //发料
				inUser: '', //领料,
				coil: '', //卷号
				paperType: '暂ㅤ无', //纸类
				gram: '0', //克重
				paperWidth: '暂ㅤ无', //纸度
				ewt: '', //重量
				desc: '' //备注
			},
			paperStoreItem: {
				Vend: '', //工单号
				Type: '',
				Station: '',
				Width: '',
				Gram: '',
				Coil: ''
			},
			paperStoreColumns: [
				{
					key: 'ss_Station',
					title: '仓位',
					width: 140
				},
				{
					key: 'v_desc',
					title: '制造商',
					width: 180
				},
				{
					key: 'ss_SPaperType',
					title: '纸类',
					width: 180
				},
				{
					key: 'ss_Width',
					title: '纸宽',
					width: 140
				},
				{
					key: 'ss_Gram',
					title: '克重',
					width: 140
				},
				{
					key: 'ss_Ewt',
					title: '重量',
					width: 140
				},
				{
					key: 'ss_Coil',
					title: '卷号',
					width: 220
				}
			]
		};
	},
	computed: {
		storeTableHeight() {
			return this.screen.height / 2 + 25;
		}
	},
	methods: {
		//===切换标签事件===
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
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
						case 0: //出仓
							if (type == 'orderNo') {
								//指令扫描
								_self.paperOutFormItems.instruct = res.result;
								_self.paperOutInstructBlur();
							}
							if (type == 'rollNo') {
								//卷号扫描
								_self.paperOutFormItems.coil = res.result;
								_self.getOutPaperInfo();
							}
							break;
						case 1: //退仓
							if (type == 'orderNo') {
								//指令扫描
								_self.paperBackFormItems.instruct = res.result;
								_self.paperOutInstructBlur();
							}
							if (type == 'rollNo') {
								//卷号扫描
								_self.paperBackFormItems.coil = res.result;
								_self.getBackPaperInfo();
							}
							break;
						case 2: //查询
							break;

						default:
							break;
					}
				}
			});
		},

		//===卷号扫描回调事件=== 出仓
		getOutPaperInfo() {
			if (this.paperOutFormItems.coil == '') {
				return;
			}
			this.paperOutBtnShow = false;
			this.getPaperInfo(this.paperOutFormItems.coil).then(res => {
				if (res.length > 0) {
					let paperInfo = res[0];
					this.paperOutFormItems.paperType = paperInfo.ss_SPaperType;
					this.paperOutFormItems.gram = paperInfo.ss_Gram;
					this.paperOutFormItems.paperWidth = paperInfo.ss_Width;
					this.paperOutFormItems.ewt = paperInfo.ss_Ewt;
					this.operStatus = paperInfo.LastState;
					this.paperOutBtnShow = true;
					if (paperInfo.LastState == 'O') {
						//当前退仓
						this.$nextTick(() => {
							this.$refs.ewt_input.focus;
						});
					}
					return;
				}
				this.paperOutFormItems.coil = '';
			});
		},
		//===卷号扫描回调事件=== 退仓
		getBackPaperInfo() {
			if (this.paperBackFormItems.coil == '') {
				return;
			}
			this.paperBackBtnShow = false;
			this.getPaperInfo(this.paperBackFormItems.coil).then(res => {
				if (res.length > 0) {
					let paperInfo = res[0];
					this.paperBackFormItems.paperType = paperInfo.ss_SPaperType;
					this.paperBackFormItems.gram = paperInfo.ss_Gram;
					this.paperBackFormItems.paperWidth = paperInfo.ss_Width;
					this.paperBackFormItems.ewt = paperInfo.ss_Ewt;
					this.paperBackBtnShow = true;
					this.$nextTick(() => {
						this.$refs.back_ewt.focus();
					});
					return;
				}
				this.paperBackFormItems.coil = '';
			});
		},
		//===获取原纸出退仓信息===
		getPaperInfo(coil) {
			if (coil == '') {
				return;
			}
			let data = {
				Coil: coil,
				Flag: 0
			};
			let _self = this;
			return new Promise((resolve, reject) => {
				request
					.post('/warehouse/warehouse/execute/spGetSPaperStoreForPDA', data)
					.then(res => {
						if (res.list.length == 0) {
							this.toast.message('当前卷号不存在');
						}
						resolve(res.list);
					})
					.catch(err => {
						this.errorContent = '暂无数据';
						if (typeof err === 'string') {
							this.toast.message('获取数据失败' + err);
						} else {
							this.toast.message('执行失败，请稍后再试');
						}
					});
			});
		},
		//====解构扫描数据获取所需参数=====
		getInstruct(value) {
			if (value == '') {
				if (this.scanType === 'orderNo') {
					uni.showToast({
						title: '请输入或扫描指令',
						icon: 'none',
						duration: 2000
					});
				} else if (this.scanType === 'rollNo') {
					uni.showToast({
						title: '请输入或扫描卷号',
						icon: 'none',
						duration: 2000
					});
				} else {
					uni.showToast({
						title: '请输入必要信息',
						icon: 'none',
						duration: 2000
					});
				}

				return;
			}
			let instruct = value.split('+');
			if (instruct.length < 5) {
				uni.showToast({
					title: '数据解析失败，参数个数不够',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let data = {
				line: instruct[1],
				group: instruct[2],
				inUser: instruct[4],
				outUser: instruct[3]
			};
			return data;
		},
		//===指令INPU焦点离开===回调事件 ===出仓
		paperOutInstructBlur() {
			this.scanType = 'orderNo';
			//解构参数列表,获取所需参数
			let data = this.getInstruct(this.paperOutFormItems.instruct);
			if (data) {
				Object.assign(this.paperOutFormItems, data);
				this.paperOutFormItems.instruct = '';
			}
		},
		//===指令INPU焦点离开===回调事件 ===退仓
		paperBackInstructBlur() {
			//解构参数列表,获取所需参数
			let data = this.getInstruct(this.paperBackFormItems.instruct);
			if (data) {
				Object.assign(this.paperBackFormItems, data);
				this.paperBackFormItems.instruct = '';
			}
		},
		//===原纸出退仓数据请求===
		paperOBRequest(data, text) {
			return new Promise((resolve, reject) => {
				this.toast.loading()
				request
					.post(data)
					.then(res => {
						this.toast.hide()
						if (res.list.length > 0) {
							if (res.list[0].ErrorStr && res.list[0].ErrorStr != '') {
								this.toast.message(res.list[0].ErrorStr);
								return;
							}
							this.toast.message(text + '成功');
							resolve(res);
							return;
						}
						this.toast.message(text + '失败');
					})
					.catch(err => {
						this.toast.hide()
						this.errorContent = '暂无数据';
						this.toast.message('获取数据失败:' + err);
						reject();
					});
			});
		},
		//===出仓===
		paperOut() {
			if (this.paperOutFormItems.coil == '') {
				this.toast.message('请输入或扫描卷号');
				return;
			}
			let data = {
				Line: this.paperOutFormItems.line,
				Group: this.paperOutFormItems.group,
				Oper: 'admin',
				Flag: 'out',
				Coil: this.paperOutFormItems.coil,
				OutUseID: this.paperOutFormItems.outUser,
				InUseID: this.paperOutFormItems.inUser,
				Wt: this.paperOutFormItems.ewt,
				OperDate: dateFormat('yyyy-MM-dd hh:mm:ss')
			};
			this.paperOBRequest(data, '出仓').then(res => {
				this.paperOutFormItems = JSON.parse(JSON.stringify(this.paperOutFormInit));
				this.paperOutBtnShow = false;
			});
		},
		//====退仓====
		paperBack() {
			if (this.paperBackFormItems.coil == '') {
				this.toast.message('请输入或扫描卷号')
				return;
			}
			let data = {
				Line: this.paperBackFormItems.line,
				Group: this.paperBackFormItems.group,
				Oper: 'admin',
				Flag: 'back',
				Coil: this.paperBackFormItems.coil,
				OutUseID: this.paperBackFormItems.outUser,
				InUseID: this.paperBackFormItems.inUser,
				Wt: this.paperBackFormItems.ewt,
				OperDate_IN_date: dateFormat('yyyy-MM-dd hh:mm:ss'),
				ErrorStr_OUT_varchar: ''
			};
			this.paperOBRequest(data, '退仓').then(res => {
				this.paperBackFormItems = JSON.parse(JSON.stringify(this.paperOutFormInit));
				this.paperBackBtnShow = false;
			});
		},
		//====库存查询======
		paperStoreSearch() {
			if (this.paperStoreItem.Type == '') {
				this.toast.message('请输入纸类');
				return;
			}
			this.errorContent = '数据加载中...';
			this.toast.loading()
			request
				.post('/warehouse/warehouse/execute/spSPaperStoreQueryForPDA', this.paperStoreItem)
				.then(res => {
					this.toast.hide()
					res = res.list;
					this.paperStoreTableData = res;
					this.errorContent = '暂无数据';
				})
				.catch(err => {
					this.toast.hide()
					this.errorContent = '暂无数据';
					this.toast.message('获取数据失败:' + err);
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
