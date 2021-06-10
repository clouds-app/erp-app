<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">纸板扫码入库</block>
		</cu-custom>
		<view class="cu-form-group border-top">
			<view class="title">仓位号ㅤ:</view>
			<input v-model="paperInFormItems.shippingNo" @blur="shippingNoBlur" placeholder="请扫描仓位号" />
			<button @click="turnOnScanCode('shippingNo')" type="primary" size="mini">扫描</button>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">仓位名称:</view>
					<input :disabled="true" v-model="ss_Name" />
				</view>
			</view>
		</view>
		<view class="cu-form-group border-top">
			<view class="title">工单板号:</view>
			<input v-model="paperInFormItems.prodNo" @blur="barCodeBlur" placeholder="请扫描工单板号" />
			<button @click="turnOnScanCode('prodNo')" type="primary" size="mini">扫描</button>
		</view>
		<view class="cu-form-group border-top">
			<view class="title">备ㅤ注ㅤ:</view>
			<input v-model="paperInFormItems.remark" placeholder="请输入备注" />
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view style="font-size:18px; font-weight: 700;" class="title">纸板信息</view>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">板ㅤ号ㅤ:</view>
					<input style="padding-right: 0;" :disabled="true" v-model="paperInFormItems.bNumber" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">本板数:</view>
					<input @input="qtyEevent" type="number" v-model="paperInFormItems.Qty" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">客ㅤ户ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.ct_Name" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">工单数:</view>
					<input :disabled="true" type="number" v-model="paperInFormItems.co_Qty" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">纸ㅤ质ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.co_ArtId" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">楞ㅤ别:</view>
					<input :disabled="true" v-model="paperInFormItems.co_ArtLB" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">规ㅤ格ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.Mode" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">压ㅤ线ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.co_YxStr" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">备ㅤ注ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.pii_Remark" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view style="font-size:18px; font-weight: 700;" class="title">已入仓信息</view>
				</view>
			</view>
		</view>
		<!-- 查询数据 -->
		<view class="border-bottom grid-warp" style="margin-top: 10px;" v-for="(item,index) in historInfoList" :key="index">
			<view class="grid-body">
				<view class="grid-title" style="margin-top: 0px;">
					<view>
						<text>仓位:{{item.Station}}</text>
					</view>
					<view>
						<text>板号:{{item.apCardNo}}</text>
					</view>
					<view>
						<text>本板数:{{item.apQty}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="info" v-if="historInfoList.length === 0 ? true : false ">————暂无入仓信息————</view>
		<view style="height: 130rpx;"></view>
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
	import cuCustom from '@/ui/colorui/components/cu-custom.vue'
	export default {
		components: {
			cuCustom,
			selectDropdown
		},
		mixins: [warehouse],
		data() {
			return {
				historInfoList: [], //已入仓历史信息
				ss_Name: '', // 仓位名称
				currentShippingNo: '', //未处理过的仓位号
				currentProdNo: '', // 未处理过的工单板号
				paperInFormItems: {
					prodNo: '', // 工单板号
					shippingNo: '', // 仓位
					bNumber: '', // 板号
					Qty: '', // 数量
					ct_Name: '', // 客户
					co_Qty: '', // 订单数
					co_ArtId: '', // 纸质
					co_ArtLB: '', // 楞别
					Mode: '', // 规格
					co_YxStr: '', // 压线
					pii_Remark: '', // 备注
					remark: ''
				}
			}
		},
		methods: {
			// 工单板号扫码失焦事件
			barCodeBlur() {
				if (this.paperInFormItems.prodNo === '') return
				this.getParamsFromScanCode('prodNo')
			},
			// 仓位号扫码失焦事件
			shippingNoBlur() {
				if (this.paperInFormItems.shippingNo === '') return
				this.getParamsFromScanCode('shipping')
			},
			// 查询历史信息
			queryHistorInfo(data){
				let params = {
					WorkNo: data,
				}
				request.post('/warehouse/warehouse/executeMany/appPaperScanInfo_HDHC', params).then((res)=>{
					this.historInfoList = res.list[1]
					console.log(this.historInfoList);
				}).catch(err => {
						this.toast.message('执行失败')
					})
			},
			//====工单板号====获取所需参数 从扫描中...
			getParamsFromScanCode(scanData) {
				this.historInfoList = []
				// debugger
				let data = {}
				let str = this.paperInFormItems.prodNo
				// debugger
				console.log(str.indexOf(','),str.length );
				if (scanData === 'prodNo') {
					if(str.indexOf(',') === -1){
						
						this.toast.message('工单板号格式不正确,无法查询纸板信息!');
						this.delData()
						this.queryHistorInfo(str.split(',')[0])
						return
					}else if(str.indexOf(',') >= str.length - 1){
							this.toast.message('工单板号格式不正确,无法查询纸板信息!');
							this.delData()
							this.queryHistorInfo(str.split(',')[0])
							return
					}else{
						data = {
							WorkNo: str.split(',')[0],
							BanNo: str.split(',')[1]
						}
						// 查询历史信息
						this.queryHistorInfo(str.split(',')[0])
					}
				} else {
					data = {
						Station: this.paperInFormItems.shippingNo
					}
					this.queryHistorInfo(str.split(',')[0])
				}
				let _url = scanData === 'prodNo' ? '/warehouse/warehouse/execute/appScanCoNo_HDHC' :
					'/warehouse/warehouse/execute/appScanPaperStation'
				request.post(_url, data)
					.then(res => {
						if (res.list.length === 0) {
							if (scanData === 'prodNo') {
								this.toast.message('无此工单板号，请重新扫描!');
								this.delData()
								this.paperInFormItems.prodNo = ''
							} else {
								this.toast.message('无此仓位号，请重新扫描!');
								this.paperInFormItems.shippingNo = ''
								this.ss_Name = ''
							}
							return;
						}
						if (scanData === 'prodNo') {
							// 扫描成功先清空再赋值
							// this.delData()
							if (res.list[0].mes === 1 ){
								this.delData()
								this.toast.message('该工单板号已存在入库记录，请重新扫描!');
							}else{ 
								this.currentProdNo = res.list[0].bNumber
								this.paperInFormItems.bNumber = this.paperInFormItems.prodNo.split(',')[1]
								this.paperInFormItems.Qty = res.list[0].Qty
								this.paperInFormItems.ct_Name = res.list[0].ct_Name
								this.paperInFormItems.co_Qty = res.list[0].co_Qty
								this.paperInFormItems.co_ArtId = res.list[0].co_ArtId
								this.paperInFormItems.co_ArtLB = res.list[0].co_ArtLB
								this.paperInFormItems.Mode = res.list[0].Mode
								this.paperInFormItems.co_YxStr = res.list[0].co_YxStr
								this.paperInFormItems.pii_Remark = res.list[0].co_Remark
							}

						} else {
							this.currentShippingNo = res.list[0].ss_Code
							this.paperInFormItems.shippingNo = res.list[0].ss_Code
							this.ss_Name = res.list[0].ss_Name
						}
					})
			},
			//打开扫描
			async turnOnScanCode(data) {
				if (this.checkScan()) {
					this.toast.message('请在"e包装"公众号中下载APP后扫码!')
					return
				}
				let scandata = await this.ScanModule();
				if (scandata.resp_code == 1000) {
					// let a = scandata.resp_result.indexOf(',')
					// let b = 0
					// if (a < 0) {
					// 	b = scandata.resp_result
					// } else {
					// 	b = scandata.resp_result.substring(0, a)
					// }
					if (data === 'prodNo') {
						this.paperInFormItems.prodNo = scandata.resp_result;
						this.getParamsFromScanCode('prodNo');
					} else {
						this.paperInFormItems.shippingNo = scandata.resp_result;
						this.getParamsFromScanCode('shippingNo');
					}
				} else {
					this.toast.message('扫码失败请重试')
				}
			},
			// 清除数据
			delData() {
				this.paperInFormItems.bNumber = ''
				this.paperInFormItems.Qty = ''
				this.paperInFormItems.ct_Name = ''
				this.paperInFormItems.co_Qty = ''
				this.paperInFormItems.co_ArtId = ''
				this.paperInFormItems.co_ArtLB = ''
				this.paperInFormItems.Mode = ''
				this.paperInFormItems.co_YxStr = ''
				this.paperInFormItems.pii_Remark = ''
				this.paperInFormItems.remark = ''
			},
			// 入库效验
			ValidateOut(){
				let flag = false
				if(this.paperInFormItems.shippingNo === ''){
					this.toast.message('请输入正确仓位号')
					return flag = true
				}
				if(this.paperInFormItems.prodNo === ''){
					this.toast.message('工单板号不能为空')
					return flag = true
				}
				if(!this.paperInFormItems.bNumber){
					this.toast.message('板号不能为空')
					return flag = true
				}
				return flag
			},
			// 清除按钮
			resetFrom(){
				this.delData()
				this.paperInFormItems.prodNo = ''
				this.paperInFormItems.shippingNo = ''
				this.ss_Name = ''
			},
			// 本板数不能大于工单数
			qtyEevent(){
				if(this.paperInFormItems.prodNo === '') {
					this.toast.message('请先扫描工单号');
					setTimeout(()=>{
						this.paperInFormItems.Qty = ''
					},100)
					return
				}
				if(this.paperInFormItems.Qty > this.paperInFormItems.co_Qty){
					setTimeout(()=>{
						this.paperInFormItems.Qty = ''
					},100)
					this.toast.message('本板数不能大于工单数');
				}
			},
			//确认提交===纸板扫码入库===
			paprtIn() {
				this.shippingNoBlur()
				setTimeout(()=>{
					if (!!this.ValidateOut()) {
						return
					}
					let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
					let data = {
						UserID: user.erpUserCode,
						CreatePhone:user.phoneNo,
						WorkNo:this.paperInFormItems.prodNo.split(',')[0],
						StationNo:this.currentShippingNo,
						Qty:this.paperInFormItems.Qty == undefined ? 0 : this.paperInFormItems.Qty ,
						Remark:this.paperInFormItems.remark,
						BanNo: this.paperInFormItems.bNumber
					};
					this.toast.loading();
					request.post('/warehouse/warehouse/execute/appSaveScanPaper_HDHC', data).then(res => {
							this.toast.hide();
							if (res.list && res.list[0].res == 1) {
								this.toast.message('保存成功');
								this.historInfoList = []
								// 清除数据
								this.delData()
								this.paperInFormItems.prodNo = ''
							} else {
								this.toast.message(res.list[0].ErrorStr);
							}
						})
						.catch(err => {
							this.toast.message('保存失败');
							setTimeout(() => {
								this.toast.hide();
							}, 1000)
						});
				},100)
			},
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
	.info{
		font-size: 30rpx;
		color: #666666;
		margin-left: 150rpx;
		padding-top: 100rpx;
	}
</style>
