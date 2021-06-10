<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">纸板仓位查询</block>
		</cu-custom>
		<view class="cu-form-group border-top">
			<view class="title">工单号:</view>
			<input v-model="paperInFormItems.prodNo" @blur="barCodeBlur" placeholder="请扫描工单号" />
			<button @click="turnOnScanCode('prodNo')" type="primary" size="mini">扫描</button>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">客ㅤ户ㅤ:</view>
					<input style="padding-right: 0;" :disabled="true" v-model="paperInFormItems.ct_Name" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">工单数:</view>
					<input type="number" v-model="paperInFormItems.Qty" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">纸板信息:</view>
					<input :disabled="true" v-model="paperInFormItems.paperInfo" />
				</view>
			</view>
		</view>
		<!-- 查询数据 -->
		<view v-if="kength === 0 ? false : true " class="border-bottom grid-warp">
			<view style="margin-top: 10rpx;" class="grid-body" v-for="(item,index) in list[1]" :key=index>
				<view class="grid-title">
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
				<view class="grid-flex padding-10">
					<view>
						<text>备注:{{item.apRemark}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="info">————暂无列表数据————</view>
		<view style="height: 20rpx;"></view>
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
				kength: 0,
				list:[], //详情列表
				topheight: 40, //头部菜单高度
				paperInFormItems: {
					prodNo: '', // 工单号
					ct_Name: '', // 客户
					Qty: '', // 工单数
					paperInfo: '' // 纸板信息
				}
			}
		},
		methods:{
			// 扫码失焦事件
			barCodeBlur() {
				this.getParamsFromScanCode()
			},
			//打开扫描
			async turnOnScanCode(type) {
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
					this.paperInFormItems.prodNo = scandata.resp_result;
					this.getParamsFromScanCode();
				} else {
					this.toast.message('扫码失败请重试')
				}
			},
			//====工单号====获取所需参数 从扫描中...
			getParamsFromScanCode() {
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let str = this.paperInFormItems.prodNo
				let params = {}
				if(str.indexOf(',') === -1){
					params = {
						WorkNo:this.paperInFormItems.prodNo
					}
				}else{
					params = {
						WorkNo:str.split(',')[0],
					}
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/executeMany/appPaperScanInfo_HDHC', params)
					.then(res => {
						if (res.list[0].length === 0) {
							this.toast.hide();
							this.delData()
							this.toast.message('无此工单号，请重新扫描!');
							return;
						}
						this.paperInFormItems.ct_Name = res.list[0][0].custName
						this.paperInFormItems.Qty = res.list[0][0].coQty
						this.paperInFormItems.paperInfo = res.list[0][0].paperInfo
						this.list = res.list
						this.kength = this.list[1].length
						console.log(this.list[1].length);
						this.toast.hide();
					}).catch(err => {
						this.toast.hide()
						this.toast.message('执行失败')
					})
			},
			delData(){
				this.paperInFormItems.prodNo = '',
				this.paperInFormItems.ct_Name = '',
				this.paperInFormItems.Qty = '',
				this.paperInFormItems.paperInfo = '',
				this.list = []
			}
		}
	}
</script>

<style>
	.border-top {
		border-top: 1px solid #eee;
	}
	.info{
		font-size: 30rpx;
		color: #666666;
		margin-left: 150rpx;
		padding-top: 100rpx;
	}
</style>
