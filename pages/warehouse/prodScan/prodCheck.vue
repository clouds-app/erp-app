<template>
	<view>
		<view class="xunhoutop">
			<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">辅料盘点</block>
			</cu-custom>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">盘点日期:</view>
						<input :disabled="true" v-model="currentDate" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">盘点人员:</view>
						<input :disabled="true" v-model="checkPersonnelName" />
					</view>
				</view>
			</view>
			<view class="flex-sub border-top">
				<selectDropdown :setonlyOne="true" :otherHeight='CustomBarHeight' ref="shipping"
					url="appFindSearchStation" title="仓ㅤ位ㅤ" placeholdertext="请选择仓位" v-model='paperInFormItems.shipping'
					:params="{modelCode:'prod_adjust'}">
				</selectDropdown>
			</view>
			<view class="cu-form-group border-top">
				<view class="title">辅ㅤ料ㅤ:</view>
				<input v-model="paperInFormItems.prodNo" @blur="barCodeBlur" placeholder="请扫描辅料号" />
				<button @click="turnOnScanCode" type="primary" size="mini">扫描</button>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">辅料名称:</view>
						<input :disabled="true" v-model="ProdName" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">辅料类型:</view>
						<input :disabled="true" v-model="paperInFormItems.prodType" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">规ㅤ格ㅤ:</view>
						<input :disabled="true" v-model="paperInFormItems.prodSize" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">单位ㅤ:</view>
						<input disabled="true" v-model="paperInFormItems.unit" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">库存数ㅤ:</view>
						<input :disabled="true" v-model="paperInFormItems.inventoryData" />
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title" style="color: red;">盘点数:</view>
						<input @blur="checkDataEvent" type="number" v-model="paperInFormItems.checkData"
							placeholder="请输入数量" />
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">上次调整:</view>
						<input :disabled="true" v-model="paperInFormItems.lastAdjust" />
					</view>
				</view>
			</view>
		</view>
		<view :style="{'height':topheight + 'px'}"></view>
		<view class="border-bottom grid-warp">
			<view class="grid-body">
				<view class="grid-flex padding-10">
					<view>
						<view class="paperin">
							<view style="position: absolute; left: 10rpx;">批次号</view>
							<view style="position: absolute; left: 200rpx;">批次数</view>
							<view style="position: absolute; left: 320rpx;">实盘数</view>
							<view style="position: absolute; right: 10rpx;">供应商</view>
						</view>
						<view class="paperin" v-for="(item,index) in infoList" :key='index'>
							<view class="paperin-b paperin-1">{{item.PoseriNo}}</view>
							<view class="paperin-b paperin-2">
								{{item.ni_InQty}}
							</view>
							<view :class="['paperin-b', 'paperin-3', item.ni_InQty == item.adj_Qty ? '' : 'active']">
								{{item.adj_Qty}}
							</view>
							<view class="paperin-b paperin-c paperin-4">{{item.ni_VendName}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 140rpx;"></view>
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button @click="resetFrom" type="primary" size="mini" class="bg-grey radius">清除</button>
			<button @click="paprtIn" type="primary" size="mini" class="bg-grey radius">保存</button>
		</view>
		<!-- 详情弹出层 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" @bindtap="hideModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">保存成功</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="cu-form-group" v-show="isnull">
						<view class="title">入库单号：{{this.paNo}}</view>
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
		components: {
			cuCustom,
			selectDropdown
		},
		mixins: [warehouse],
		data() {
			return {
				ProdName: '', // 辅料名称
				isnull: true, // 保存返回单号是否为null
				paNo: '', // 保存返回单号
				modalName: '', // 保存成功弹出框 
				DataList: [], // 深拷贝详情数据(小)
				DataList2: [], // 深拷贝详情数据(大)
				infoList: [], // 详情数据 
				prodNoCode: '', // 储存辅料编号正常值
				topheight: 400, // 顶部高度
				currentDate: this.formatDate(new Date), // 当前时间
				checkPersonnel: this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME).erpUserCode, // 请求对应的盘点入员
				checkPersonnelName: `${this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME).erpUserCode}_${this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME).erpUserName}`, // 盘点入员
				paperInFormItems: {
					shipping: '', // 仓位
					prodNo: '', // 辅料号
					prodType: '', // 辅料类型
					prodSize: '', // 辅料规格
					unit: '', // 单位
					inventoryData: '', // 库存数
					checkData: '', // 盘点数
					lastAdjust: '', // 上次调整
				}
			}
		},
		watch: {
			'paperInFormItems.shipping'(n, o) {
				this.delData()
			}
		},
		methods: {
			
			formatDate(now) { 
			var year=now.getFullYear();  //取得4位数的年份
			var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
			var date=now.getDate();      //返回日期月份中的天数（1到31）
			var hour=now.getHours();     //返回日期中的小时数（0到23）
			var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
			var second=now.getSeconds(); //返回日期中的秒数（0到59）
			return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
			} ,
			hideModal() {
				this.modalName = ''
			},
			//盘点数事件
			checkDataEvent() {
				this.checkDataChange()
			},
			//解决js加法法运算不准确问题
			accAdd(arg1, arg2) {
				var r1, r2, m, c;
				try {
					r1 = arg1.toString().split(".")[1].length;
				} catch (e) {
					r1 = 0;
				}
				try {
					r2 = arg2.toString().split(".")[1].length;
				} catch (e) {
					r2 = 0;
				}
				c = Math.abs(r1 - r2);
				m = Math.pow(10, Math.max(r1, r2));
				if (c > 0) {
					var cm = Math.pow(10, c);
					if (r1 > r2) {
						arg1 = Number(arg1.toString().replace(".", ""));
						arg2 = Number(arg2.toString().replace(".", "")) * cm;
					} else {
						arg1 = Number(arg1.toString().replace(".", "")) * cm;
						arg2 = Number(arg2.toString().replace(".", ""));
					}
				} else {
					arg1 = Number(arg1.toString().replace(".", ""));
					arg2 = Number(arg2.toString().replace(".", ""));
				}
				return (arg1 + arg2) / m;
			},
			//解决js减法运算不准确问题
			accSub(arg1, arg2) {
				var r1, r2, m, n;
				try {
					r1 = arg1.toString().split(".")[1].length;
				} catch (e) {
					r1 = 0;
				}
				try {
					r2 = arg2.toString().split(".")[1].length;
				} catch (e) {
					r2 = 0;
				}
				m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
				n = (r1 >= r2) ? r1 : r2;
				return ((arg1 * m - arg2 * m) / m).toFixed(n);
			},
			//盘点数改变数据处理
			checkDataChange() {
				if (this.paperInFormItems.prodNo === '') {
					this.toast.message('请先输入辅料')
					return
				}
				if (this.paperInFormItems.checkData === '' || this.paperInFormItems.inventoryData == this.paperInFormItems
					.checkData) {
					this.infoList = JSON.parse(JSON.stringify(this.DataList2))
					return
				}
				let checkData = this.paperInFormItems.checkData
				let inventoryData = this.paperInFormItems.inventoryData
				if (checkData < inventoryData) {
					// 盘点数小于库存数
					this.infoList = JSON.parse(JSON.stringify(this.DataList))

					// let less = checkData - inventoryData
					let less = this.accSub(checkData, inventoryData)
					try {
						this.DataList.forEach((item, index) => {
							// debugger
							// less =  this.infoList[index].adj_Qty + less
							less = this.accAdd(this.infoList[index].adj_Qty, less)
							console.log(this.infoList[index].adj_Qty, less);
							if (less <= 0) {
								this.infoList[index].adj_Qty = 0
							} else {
								// if(this.infoList[index-1].adj_Qty != 1){
								this.infoList[index].adj_Qty = less
								if (this.infoList[index].adj_Qty > 0) {
									throw new Error("ending"); //报错，就跳出循环
								}


								// }
							}
							if (less >= 0 && this.infoList[index - 1].adj_Qty == 0) {
								this.infoList[index].adj_Qty = less
							}
						})
					} catch (e) {
						console.log('222');
						if (e.message == "ending") {

						} else {

						}
					}
				} else if (checkData > inventoryData) {
					// 盘点数大于库存数
					let pron = this.accSub(checkData, inventoryData)
					this.infoList = JSON.parse(JSON.stringify(this.DataList2))
					// this.infoList[0].adj_Qty = this.DataList2[0].adj_Qty + pron
					this.infoList[0].adj_Qty = this.accAdd(this.DataList2[0].adj_Qty, pron)
				}
			},
			//打开扫描
			async turnOnScanCode(type) {
				if (this.checkScan()) {
					this.toast.message('请在"e包装"公众号中下载APP后扫码!')
					return
				}
				let scandata = await this.ScanModule();
				if (scandata.resp_code == 1000) {
					this.resetFrom()
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
			//====辅料====获取所需参数 从扫描中...
			getParamsFromScanCode() {
				let params = {
					Station: this.paperInFormItems.shipping, // 仓位
					Code: this.paperInFormItems.prodNo // 辅料
				}
				let data = []
				this.toast.loading();
				request.post('/warehouse/warehouse/executeMany/appAdjustProcScan', params)
					.then(res => {
						if (res.list[0].length === 0) {
							this.toast.hide();
							this.toast.message('无此辅料，请重新扫描!');
							this.delData()
							return;
						}
						this.prodNoCode = res.list[0][0].st_Code // 储存辅料编号正常值
						this.paperInFormItems.prodType = res.list[0][0].typeName
						this.paperInFormItems.prodNo = res.list[0][0].ProdName.split("_")[0]
						this.ProdName = res.list[0][0].ProdName.split("_")[1]
						this.paperInFormItems.prodSize = res.list[0][0].Model
						this.paperInFormItems.unit = res.list[0][0].UnitName
						this.paperInFormItems.inventoryData = res.list[0][0].st_Qty
						this.paperInFormItems.lastAdjust = res.list[0][0].pa_Date
						this.infoList = res.list[1]
						this.toast.hide();
						this.DataList = JSON.parse(JSON.stringify(this.infoList)); // 保存初始数据
						this.DataList2 = JSON.parse(JSON.stringify(this.infoList));
					}).catch(err => {
						this.toast.hide()
						this.toast.message('执行失败')
					})

				Object.assign(this.paperInFormItems, data);
			},
			barCodeBlur() {
				if (this.paperInFormItems.shipping === '') {
					this.toast.message('请输入仓位')
					return
				}
				if (this.paperInFormItems.prodNo === '') {
					this.toast.message('请输入辅料')
					return
				}
				this.paperInFormItems.checkData = ''
				this.getParamsFromScanCode();
			},
			//清除按钮
			resetFrom() {
				this.delData()
			},
			delData() {

				// shipping: '', // 仓位
				// prodNo: 'F0256', // 辅料号
				// prodType: '', // 辅料类型
				// prodSize: '', // 辅料规格
				// unit: '', // 单位
				// inventoryData: '', // 库存数
				// checkData: '', // 盘点数
				// lastAdjust: '', // 上次调整
				this.paperInFormItems.prodNo = ''
				this.paperInFormItems.prodType = ''
				this.paperInFormItems.prodSize = ''
				this.paperInFormItems.unit = ''
				this.paperInFormItems.inventoryData = ''
				this.paperInFormItems.checkData = ''
				this.paperInFormItems.lastAdjust = ''
				this.infoList = []
			},
			//提交前校验
			ValidateOut() {
				let flag = false
				if (this.paperInFormItems.checkData === '') {
					this.toast.message('盘点数不能为空')
					flag = true
				}
				if (this.paperInFormItems.inventoryData === '') {
					this.toast.message('库存数不能为空')
					flag = true
				}
				if (this.paperInFormItems.prodNo === '') {
					this.toast.message('辅料不能为空')
					flag = true
				}
				if (this.paperInFormItems.shipping === '') {
					this.toast.message('仓位不能为空')
					flag = true
				}
				if (this.checkPersonnel === '') {
					this.toast.message('盘点人员不能为空')
					flag = true
				}
				return flag
			},
			//确认提交===出仓===
			paprtIn() {
				if (!!this.ValidateOut()) {
					return
				}
				let data = {
					UserID: this.checkPersonnel,
					Station: this.paperInFormItems.shipping,
					Code: this.prodNoCode,
					st_Qty: this.paperInFormItems.inventoryData,
					adjQty: this.paperInFormItems.checkData,
				};
				this.toast.loading();
				request.post(`/warehouse/warehouse/execute/appSaveProdAdjust`, data).then(res => {
						this.toast.hide();
						if (res.list && res.list[0].res == 1) {
							this.paNo = res.list[0].paNo
							if (this.paperInFormItems.checkData === '' || this.paperInFormItems.inventoryData == this
								.paperInFormItems.checkData) {
								this.isnull = false
							} else {
								this.isnull = true
							}
							this.modalName = 'DialogModal1'
							this.delData()
							// 清除数据
						} else {
							this.toast.message('保存失败');
						}
					})
					.catch(err => {
						this.toast.message('保存失败');
						setTimeout(() => {
							this.toast.hide();
						}, 1000)
					});
			},
		}
	}
</script>

<style>
	.xunhoutop {
		position: fixed;
		width: 100%;
		z-index: 10;
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

	.paperin {
		position: relative;
		width: 640rpx;
		height: 42rpx;
		display: flex;
		justify-content: space-between;
	}

	.paperin-b {
		font-size: 12px;
		padding-top: 10rpx;
		width: 112rpx;
		text-align: center;
	}

	.paperin-1 {
		position: absolute;
		left: 5rpx;
	}

	.paperin-2 {
		position: absolute;
		text-align: right;
		left: 170rpx;
	}

	.paperin-3 {
		position: absolute;
		text-align: right;
		left: 285rpx;
	}

	.paperin-4 {
		position: absolute;
		text-align: right;
		right: 10rpx;
		top: -5rpx;
	}

	.paperin-c {

		width: 220rpx; // *必须设置
		display: inline-block; //取消span格式，从而可以设置span的宽度和高度
		overflow: hidden; // *必须设置。表示超出宽度的部分隐藏
		text-overflow: ellipsis; // 	*必须设置。表示显示省略符号来代表被修剪的文本
		white-space: nowrap; // *必须设置。规定段落中的文本不进行换行

	}

	.active {
		color: red;
	}
</style>
