<template>
	<view>
		<form class="xunhoutop">
			<view class="cu-form-group topbuttom">
				<button :disabled="isLoaddingData" :style="{color: formItem.type=='week'?'red':''}"
					class="cu-btn  line-blue" @click="searchDataBy1('week')">本周</button>
				<button :disabled="isLoaddingData" :style="{color: formItem.type=='month'?'red':''}"
					class="cu-btn  line-blue" @click="searchDataBy1('month')">本月</button>
				<button :disabled="isLoaddingData" @click="restfrom()" class="cu-btn  line-blue" size="mini">清空</button>
				<button :disabled="isLoaddingData" class="cu-btn bg-blue" @click="searchDataBy1('date')">查询</button>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">日期范围:</view>
						<picker mode="date" :value="formItem.startDate" start="2000-09-01" :end="defaultEndDate"
							@change="startDateChange">
							<view class="picker">
								{{formItem.startDate}}
							</view>
						</picker>
						<text class="margin-left">至</text>
						<picker mode="date" :value="formItem.endDate" start="2000-09-01" :end="defaultEndDate"
							@change="endDateChange">
							<view class="picker">
								{{formItem.endDate}}
							</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">部门:</view>
						<input v-model="formItem.dept" placeholder="请输入部门" />
					</view>
				</view>
			</view>
		</form>
		<view style="height: 260rpx;"></view>
		<approval :data="formItem" listLoadUrl="/approval/paymentRequest/level1/approvalList_sjfy" ref="approval">
			<view slot="page-title">
				付款申请
			</view>
			<template slot="content" slot-scope="{data, index}">
				<view class="grid-warp" @tap="openDetail(data,index)">
					<view class="grid-title">
						{{data.pr_Depart==null? ' - ':data.pr_Depart+'-'+data.pr_Man}}
						<view class="cu-tag bg-red radius">未审核</view>
					</view>
					<view class="grid-body">
						<view class="grid-flex padding-10">
							<view>
								<text>单号:{{data.pr_Code}}</text>
							</view>
							<view>
								<text>日期:{{data.pr_Date}}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>收款单位:{{data.pr_PayeeName}}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>货币:{{data.pr_CuryId}}</text>
							</view>
							<view>
								<text>金额:{{data.pr_Amt}}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>&nbsp;</text>
							</view>
							<view>
								<text></text>
								<!-- <text class="text-price">{{data.coSPecPrice}}</text> -->
							</view>
						</view>
					</view>
				</view>
			</template>
		</approval>
	</view>
</template>

<script>
	import baseMixin from '@/mixins';
	import approval from './approval_sjfy.vue'
	import dayjs from 'dayjs'
	export default {
		components: {
			approval
		},
		mixins: [baseMixin],
		data() {
			return {
				approvalClickIndex: -1,
				defaultEndDate: dayjs().format('YYYY-MM-DD'),
				formItem: {
					startDate: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
					endDate: dayjs().format('YYYY-MM-DD'),
					dept: '',
					pageNumber: 1
				}
			};
		},
		methods: {
			openDetail(data, index) {
				this.cache.put(String(data.ID1), data)
				this.approvalClickIndex = index
				this.router.navigate(`/pages/approval/paymentApply/detail?id=${data.ID1}`)
			},
			// 结束时间回调
			endDateChange(e) {
				this.formItem.endDate = e.detail.value
			},
			// 起始时间回调
			startDateChange(e) {
				this.formItem.startDate = e.detail.value
			},
			searchDataBy() {
				this.$refs.approval.approvalListProvider()
				this.$refs.approval.approvalList = []
				this.formItem.pageNumber = 1
			},
			// 搜索数据 通过条件
			searchDataBy1(type) {
				// // 重置 搜索模式
				let time = new Date();
				let d = time.getDate() - 1;
				let nowDayOfWeek = !!new Date().getDay() ? new Date().getDay() - 1 : 0; //今天本周的第几天
				switch (type) {
					// 本周dayjs()
					case 'week':
						this.formItem.type = 'week'
						this.formItem.startDate = dayjs().subtract(nowDayOfWeek, 'day').format('YYYY-MM-DD')
						this.formItem.endDate = dayjs().format('YYYY-MM-DD')
						break;
						// 本月
					case 'month':
						this.formItem.type = 'month'
						this.formItem.startDate = dayjs().subtract(d, 'day').format('YYYY-MM-DD')
						this.formItem.endDate = dayjs().format('YYYY-MM-DD')
						break;
					default:
						// 按日期搜索+其它条件
						this.formItem.type = ''
						break;
				}
				this.orderList = []
				this.searchDataBy()
			},
			restfrom() {
				this.formItem.dept = ''
			}
		},
		onReachBottom(res) {
			this.formItem.pageNumber++
			this.$refs.approval.approvalListProvider()
		},
		onLoad() {
			uni.$off('boxSpecPriceApprovalSuccess')
			uni.$on('boxSpecPriceApprovalSuccess', (data) => {
				if (this.approvalClickIndex === -1) {
					return
				}
				this.$refs.approval.deleteApproval(this.approvalClickIndex)
			})
		},
	};
</script>

<style>
	.card {
		width: 90%;
		margin-left: 5%;
		border-radius: 10rpx;
		padding: 30rpx;
	}

	.status {}

	.grid-title {
		display: flex;
		justify-content: space-between;
	}

	.text-price {
		color: #4aecdb;
		font-size: 50rpx;
	}

	/* .flex{
	position: fixed;
	top: 100rpx;
} */
	.xunhoutop {
		position: fixed;
		top: 90rpx;
		width: 100%;
		z-index: 10;
	}
</style>
