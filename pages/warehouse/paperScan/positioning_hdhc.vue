<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">纸板仓位调整</block>
		</cu-custom>
		<view class="cu-form-group border-top">
			<view class="title">工单板号:</view>
			<input v-model="paperInFormItems.prodNo" @blur="barCodeBlur" placeholder="请扫描工单板号" />
			<button @click="turnOnScanCode('prodNo')" type="primary" size="mini">扫描</button>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">原仓位号:</view>
					<input :disabled="true" v-model="paperInFormItems.originalShipping" />
				</view>
			</view>
		</view>
		<view class="cu-form-group border-top">
			<view class="title">新仓位号:</view>
			<input v-model="paperInFormItems.shippingNo" @blur="shippingNoBlur" placeholder="请扫描仓位号" />
			<button @click="turnOnScanCode('shippingNo')" type="primary" size="mini">扫描</button>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">仓位名称:</view>
					<input :disabled="true" v-model="paperInFormItems.ss_Name" />
				</view>
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
	import cuCustom from '@/ui/colorui/components/cu-custom.vue'
	export default {
		components: {
			cuCustom,
			selectDropdown
		},
		mixins: [warehouse],
		data() {
			return {
				false:"",
				paperInFormItems: {
					prodNo: '',// 工单板号
					shippingNo:'',//仓位号
					originalShipping: '',//原仓位号
					ss_Name:'',//仓位名称
				}
			}
		},
		watch: {
			'paperInFormItems.prodNo'(newValue, oldValue) {
				this.paperInFormItems.originalShipping = ''
			},
			'paperInFormItems.shippingNo'(newValue, oldValue) {
				this.paperInFormItems.ss_Name = ''
			}
		},
		methods:{
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
			//====工单板号====获取所需参数 从扫描中...
			getParamsFromScanCode(scanData) {
				let data = {}
				if (scanData === 'prodNo') {
					data = {
						WorkBanNo: this.paperInFormItems.prodNo
					}
				} else {
					data = {
						Station: this.paperInFormItems.shippingNo
					}
				}
				let _url = scanData === 'prodNo' ? '/warehouse/warehouse/execute/appAdjScanPaper_HDHC' : '/warehouse/warehouse/execute/appScanPaperStation'
				request.post(_url, data)
					.then(res => {
						console.log(res);
						if (res.list.length === 0) {
							if (scanData === 'prodNo') {
								this.toast.message('无此工单板号，请重新扫描!');
								this.paperInFormItems.originalShipping = ''
							} else {
								this.toast.message('无此新仓位号，请重新扫描!');
								this.paperInFormItems.ss_Name = ''
							}
							return;
						}
						if (scanData === 'prodNo') {
							this.paperInFormItems.originalShipping = `${res.list[0].ss_Code}_${res.list[0].ss_Name}`
			
						} else {
							this.paperInFormItems.ss_Name = res.list[0].ss_Name
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
			// 效验
			Validate(){
				let flag = false
				if(this.paperInFormItems.originalShipping === ''){
					this.toast.message('无此工单板号，请重新扫描!')
					return flag = true
				}
				if(this.paperInFormItems.ss_Name === ''){
					this.toast.message('无此新仓位号，请重新扫描!')
					return flag = true
				}
				return flag
			},
			//确认提交===纸板扫码入库===
			paprtIn() {
				setTimeout(()=>{
					if (!!this.Validate()) {
						return
					}
					let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
					let data = {
						WorkBanNo: this.paperInFormItems.prodNo,
						Station: this.paperInFormItems.shippingNo
					};
					this.toast.loading();
					request.post('/warehouse/warehouse/execute/appSaveAdjScanPaper_HDHC', data).then(res => {
							console.log(res);
							this.toast.message(res.list[0].ErrorStr);
							this.resetFrom()
						})
						.catch(err => {
							this.toast.message('保存失败');
							setTimeout(() => {
								this.toast.hide();
							}, 1000)
						});
				},300)
			},
			//清除
			resetFrom(){
				this.paperInFormItems.prodNo = ''
				this.paperInFormItems.shippingNo = ''
				this.paperInFormItems.originalShipping = ''
				this.paperInFormItems.ss_Name = ''
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
