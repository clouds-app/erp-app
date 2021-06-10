<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">客户欠款详情</block>
			<block slot="right">
				<button :disabled="isLoaddingData" class="cu-btn bg-green shadow"
					@click="searchDataBy('date')">查询</button>
			</block>
		</cu-custom>
		<view class="bodyContentHeight">
			<view class="flex border-top">
				<view class="flex-sub">
					<customerSelect
						:disabled = "isDisabled"
						:otherHeight='CustomBarHeight' 
						ref="salesmanDrawer" 
						v-model="formItem.salesman"
						url="appSalesmenList"
						title="业务员"
						placeholdertext="请选择"
						:params="{modelCode:'cust_arrears',UserCode:userInfo.erpUserCode,pageSize:100,pageNum:1}"
					></customerSelect>
				</view>
				<view class="flex-sub">
					<customerSelect
						:otherHeight='CustomBarHeight' 
						ref="customerDrawer" 
						v-model="formItem.guestId"
						url="appGetCustomerList"
						title="客ㅤ户"
						placeholdertext="请选择"
						:params="{modelCode:'cust_arrears',UserCode:userInfo.erpUserCode,pageSize:100,pageNum:1}"
					></customerSelect>
				</view>
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
		</view>
		<view class="vtable">
			<v-table :row-class-name="rowClassNameFn" :columns="dataColumns" :list="dataTableList" selection="single"
				:td-width="154" :height="tableHeight-30">
			</v-table>
		</view>
		<view style="height: 15rpx;" class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<uni-load-more :contentText="contentText" v-if="!hiddenLoadMore" @clickLoadMore="clickLoadMore"
						:status="more"></uni-load-more>
					<view class="title"><text class="text-bold">本页合计:</text>{{sumMoney}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import customerSelect from '@/components/selectDropdown/selectDropdown.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	import dayjs from 'dayjs'
	import vTable from "@/components/table.vue"
	import baseMixin from '@/mixins';
	import cuCustom from '../../ui/colorui/components/cu-custom.vue'
	const moreStatus = {
		more: 'more',
		loading: 'loading',
		noMore: 'noMore'
	}
	const defaultformItem = {
		startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
		endDate: dayjs().format('YYYY-MM-DD'),
		guestName: '', //选择的客户
		guestId: '', //选择的客户id
		salesman: '', //业务员
		orderBy: 0, //排序
	}
	export default {
		components: {
			cuCustom,
			vTable,
			selectDropdown,
			uniLoadMore,
			customerSelect
		},
		mixins: [baseMixin],
		data() {
			return {
				userName: '',// 客户员名称
				userPermissions: '', //用户权限
				isDisabled: false, // 是否禁用下拉控件
				contentText: {
					contentdown: '点击加载',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				// customerparams:{modelCode:'cust_arrears',UserCode:userInfo.erpUserCode},
				sumMoney: 0,
				outsumMoney: 0, //出仓合并
				isFilterDataByPage: false, // false:条件查询数据,true:翻页查询 
				hiddenLoadMore: true, // 是否显示加载更多
				more: moreStatus.more, // 是否还有更多的数据 more loading noMore）
				formItem: Object.assign({}, defaultformItem),
				defaultEndDate: dayjs().format('YYYY-MM-DD'),
				avgWidth: 10, // 表格提示信息宽度,取所有字段的平均值
				tableHeight: 0, //表格高度
				dataTableList: [],
				dataColumnsCopy: [],
				dataColumns: [{
						key: 'Serial',
						title: '序号',
						$width: 80,
					},
					{
						key: 'vnct_id',
						title: '客户编号',
						$width: 170,
						titleAlign: 'center',
						columnAlign: 'center'
					},
					{
						key: 'vnct_name',
						title: '客户简称',
						$width: 250,
						titleAlign: 'center',
						columnAlign: 'left'
					},
					{
						key: 'init_amt',
						title: '期初金额',
						$width: 160,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 'by_amt',
						title: '本期金额',
						$width: 160,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 'amt',
						title: '期末额',
						$width: 160,
						titleAlign: 'center',
						columnAlign: 'right'
					},
				]
			};
		},
		computed: {

		},
		// #ifdef H5
		mounted() {
			this.avgWidth = this.getTableAvgWidth(this.dataColumns);
			// this.searchModeClick('0',false)
			this.calTableHeight()
			// 获取用户权限判断是否可以选择客户
			// debugger
			this.userPermissions = this.userInfo.erpUserCode
			let userName = this.userInfo.erpUserName
			// if(this.userPermissions !== 'admin'){
			// 	this.isDisabled = true
			// 	this.userName = userName
			// 	this.$refs.salesmanDrawer.formItem.customers  = userName
			// 	this.formItem.salesman = this.userPermissions	
			// }else{

			// }
			// console.log(this.userPermissions);

		},
		// #endif
		// #ifndef H5
		onReady() {
			this.avgWidth = this.getTableAvgWidth(this.dataColumns);
			// this.searchModeClick('0',false)
			this.calTableHeight()
		},
		// #endif
		methods: {
			setOrderBy() {
				this.formItem.orderBy = Number(!this.formItem.orderBy)
				this.searchDataBy('date')
			},
			// 清空事件
			restfrom() {
				this.$refs.salesmanDrawer.$data.formItem.customers = ''
				this.$refs.salesmanDrawer.$data.formItem.customersId = ''
				this.$refs.customerDrawer.$data.formItem.customers = ''
				this.$refs.customerDrawer.$data.formItem.customersId = ''
				this.dataTableList = []
				this.formItem.guestId = ''
				this.formItem.salesman = ''
			},
			// 自定义某行样式
			rowClassNameFn(row, index) {
				if (Number(index) % 2 == 0) {
					return 'table-single-row';
				}
				return ''; //'table-double-row';
			},
			// 点击加载更多 回调事件
			clickLoadMore(res) {
				this.more = moreStatus.loading
				this.isFilterDataByPage = true
				this.pageSetting.current = this.pageSetting.current + 1
				this.loaddingData()
			},
			// 验证数据
			ValidateData() {
				let flag = false
				if (!!!this.formItem.guestId) {
					this.toast.message('请选择搜索客户')
					flag = true
				}
				return flag
			},
			// 搜索数据 通过条件
			searchDataBy(type) {
				// if(!!this.ValidateData()){
				// 	return
				// }
				this.loaddingData()
			},
			// 查询数据
			loaddingData() {
				if (!this.isFilterDataByPage) {
					// 非分页加载数据
					this.dataTableList = [] // 清空数据列表
					this.pageSetting.current = 1 // 重置当前页码
				}
				this.sumMoney = 0
				this.outsumMoney = 0
				let url = '/warehouse/warehouse/execute/appAspAccRAnalyzer'
				let params = {
					cList: this.formItem.guestId, //--客户编号
					AList: '', //地区
					Follower: "", //跟单员	
					Saler: this.formItem.salesman, //--业务员
					sFrom: this.formItem.startDate, //开始日期
					sTo: this.formItem.endDate, //结束日期
					UserID: this.userInfo.erpUserCode, // -当前用户
					vType: 0, //查询类型--这里给0查全部
					mode: 1, //--这里给1按汇总查询	
					pageSize: this.pageSetting.pageSize, // --页大小【不清楚就，默认传0】
					pageNum: this.pageSetting.current, // --页码【不清楚就，默认传0】
				}
				this.getOrPostDataBy(url, params).then(res => {
					if (res && res.list.length > 0) {
						this.doSomeLogicWhenDataNotNull(res)
					} else {
						this.more = moreStatus.noMore
						this.hiddenLoadMore = true
						if (!this.isFilterDataByPage) {
							this.toast.message('暂无数据...')
						} else {
							this.toast.message('暂无更多数据...')
						}
					}
					this.isFilterDataByPage = false // 重置分页查询条件
				})
			},
			// 数据逻辑处理
			doSomeLogicWhenDataNotNull(res) {
				let preIndex = this.dataTableList.length // 分页查询 目前下标
				this.more = moreStatus.more
				this.hiddenLoadMore = false // 显示加载更多
				let customDataList = res.list.filter((item, index) => {
					// 自定义序号
					item.Serial = index + 1 + preIndex
					// 复制金额字段,防止格式化后无法计算,计算汇总金额
					item.BMoneyCopy = item.amt
					return item
				})
				// 千分符数据格式化,保留小数等
				let formatDataList = this.formatDataListBy(customDataList)
				// 小于最低页面 应该加载更多
				if (customDataList.length < 20) {
					this.hiddenLoadMore = true
				}
				// 分页数据累加
				let tempDataList = this.dataTableList.concat(formatDataList)
				// 金额汇总
				let totalMoney = tempDataList.reduce((initMoney, nextItem) => {
					return initMoney = initMoney + Number(nextItem.BMoneyCopy)
				}, 0)
				this.sumMoney = this.addThousandthSign((totalMoney.toFixed(2)))
				this.dataTableList = tempDataList
			},
			// 格式化指定字段
			formatDataListBy(dataList) {
				if (dataList && Array.isArray(dataList) && dataList.length > 0) {
					dataList = dataList.map(item => {
						if (!!item.init_amt) {
							item.init_amt = this.addThousandthSign((item.init_amt.toFixed(2)))
						}
						if (!!item.by_amt) {
							item.by_amt = this.addThousandthSign((item.by_amt.toFixed(2)))
						}
						if (!!item.amt) {
							item.amt = this.addThousandthSign((item.amt.toFixed(2)))
						}
						return item
					})
				}
				return dataList
			},
			// 开始时间选择 回调
			startDateChange(e) {
				this.formItem.startDate = e.detail.value
			},
			// 结束时间选择 回调
			endDateChange(e) {
				this.formItem.endDate = e.detail.value
			},
			// 设置表格使用剩余高度
			calTableHeight() {
				this.$nextTick(() => {
					this.getOtherContentHeight()
					setTimeout(() => {
						//延时执行,方便个别小程序兼容
						let tempHeight = this.setTableHeight(true)
						this.tableHeight = tempHeight //特别处理
					}, 200)
				})
			}
		}
	};
</script>

<style>
	.margin-left-custom {
		margin-left: 10rpx;
	}

	.cu-form-group uni-picker .picker {
		line-height: 30px !important;
	}

	.cu-form-group uni-picker::after {
		line-height: 30px !important;
	}

	.border-top {
		border-top: 1px solid #eee;
	}

	.bottomMerge text {
		font-size: 20rpx;
	}

	.columnAlignright {
		text-align: right;
		padding-left: 5px;
	}
</style>
