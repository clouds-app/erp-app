<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">辅料出仓汇总</block>
			<template slot="right">
				<button @click="queryConditions" type="primary" size="mini" class="bg-grey radius">筛选</button>
			</template>
		</cu-custom>
		<view v-show="isShow">
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="loadNo"
						url="appFindDept" title="部ㅤ门ㅤ" placeholdertext="请输入部门" v-model='paperInFormItems.Dept'
						:params='{modelCode:"prod_dept"}'>
					</selectDropdown>
				</view>
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="loadNo"
						url="appFindVendor" title="供应商" placeholdertext="请输入供应商" v-model='paperInFormItems.Vend'
						:params='{modelCode:"prod_in_search"}'>
					</selectDropdown>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="loadNo"
						url="appFindProdType" title="辅料类型" placeholdertext="请输入辅料类型" v-model='paperInFormItems.Kind'
						:params='{modelCode:"prod_out_analyzer"}'>
					</selectDropdown>
				</view>
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="loadNo"
						url="appFindProd" title="辅料编号" placeholdertext="请输入辅料编号" v-model='paperInFormItems.Code'
						:params='{modelCode:"prod_out_analyzer"}'>
					</selectDropdown>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown :otherHeight='CustomBarHeight' ref="loadNo"
						url="appFindSearchStation" title="仓位名称" placeholdertext="请输入仓位名称" v-model='paperInFormItems.Station'
						:params='{modelCode:"prod_in"}'>
					</selectDropdown>
				</view>
				<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">助记码ㅤ:</view>
					<input style="padding-right: 0;" v-model="paperInFormItems.ZhuJiMa" />
				</view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">日期范围:</view>
						<picker mode="date" :value="paperInFormItems.SDate" start="2000-09-01" :end="defaultEndDate" @change="startDateChange">
							<view class="picker">
								{{paperInFormItems.SDate}}
							</view>
						</picker>
						<text class="margin-left">至</text>
						<picker mode="date" :value="paperInFormItems.EDate" start="2000-09-01" :end="defaultEndDate" @change="endDateChange">
							<view class="picker">
								{{paperInFormItems.EDate}}
							</view>
						</picker>
			       </view>
				</view>
			</view>
			<view class="flex" style="padding: 20rpx; background-color: #ffffff;">
				<button @click="close" type="primary" size="mini" class="bg-grey radius">取消</button>
				<button @click="search" type="primary" size="mini" class="bg-grey radius">查询</button>
			</view>
		</view>
		<view class="vtable" style="padding-top: 20rpx;">
			<v-table :fixedMultipleLeft="true" :row-class-name="rowClassNameFn" :columns="dataColumns" :list="dataTableList"
				selection="single" >
			</v-table>
		</view>
<!-- 		<view class="flex solid-bottom padding justify-around chucangbtm">
			<view class="title"><text class="text-bold">本页入库合计:</text>{{}}</view>
			 </view>
		</view> -->
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	import dayjs from 'dayjs'
	import vTable from "@/components/table.vue"
	import baseMixin from '@/mixins';
	import cuCustom from '../../ui/colorui/components/cu-custom.vue'
	import request from '@/utils/request.js';
	export default {
		components: {
			cuCustom,
			vTable,
			selectDropdown,
			uniLoadMore
		},
		mixins: [baseMixin],
		data() {
			return {
				defaultEndDate: dayjs().format('YYYY-MM-DD'),
				isShow: false,
				startDate: '',
				endDate: '',
				paperInFormItems:{
					Dept: '', //部门
					Kind: '', //辅料类型
					Code:'', //辅料编号
					Vend:'', //供应商
					SDate:dayjs().subtract(1, 'month').format('YYYY-MM-DD'), //起始日期
					EDate:dayjs().format('YYYY-MM-DD'), //结束日期
					Station:'', //仓位
					ZhuJiMa:'' //助记码
				},
				dataColumns: [{
						key: 'po_Dept',
						title: '部门编号',
						$width: 170,
						titleAlign: 'center',
						columnAlign: 'center'
					},
					{
						key: 'ACC_CD',
						title: '科目',
						$width: 180,
						titleAlign: 'center',
						columnAlign: 'center'
					},
					{
						key: 't1',
						title: '1月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't2',
						title: '2月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't3',
						title: '3月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't4',
						title: '4月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't5',
						title: '5月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't6',
						title: '6月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't7',
						title: '7月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't8',
						title: '8月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't9',
						title: '9月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't10',
						title: '10月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't11',
						title: '11月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
					{
						key: 't12',
						title: '12月',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					}, {
						key: 'average',
						title: '平均金额',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},{
						key: 'sums',
						title: '总金额',
						$width: 140,
						titleAlign: 'center',
						columnAlign: 'right'
					},
				],
				dataTableList: []
			}
		},
		methods: {
			queryConditions() {
				this.isShow = !this.isShow
			},
			// 关闭按钮
			close(){
				this.isShow = false
			},
			// 结束时间回调
			endDateChange(e) {
				this.paperInFormItems.EDate = e.detail.value
			},
			// 起始时间回调
			startDateChange(e) {
				this.paperInFormItems.SDate = e.detail.value
			},
			// 格式化指定字段
			formatDataListBy(dataList){
					dataList.map((item,index)=>{
						if(!!item.average){
							this.dataTableList[index].average =this.addThousandthSign(item.average.toFixed(2))
						}
						if(!!item.sums){
							this.dataTableList[index].sums =this.addThousandthSign(item.sums.toFixed(2))
						}
					})
			},
			// 清除数据
			removeForm(){
				// this.paperInFormItems.Dept = ''
			},
			// 查询
			search(){
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let params = {
					UserID: user.erpUserCode,
					Dept: this.paperInFormItems.Dept,
					Kind: this.paperInFormItems.Kind,
					Dept: this.paperInFormItems.Dept,
					Code: this.paperInFormItems.Code,
					Vend: this.paperInFormItems.Vend,
					SDate: this.paperInFormItems.SDate,
					EDate: this.paperInFormItems.EDate,
					Station: this.paperInFormItems.Station,
					ZhuJiMa: this.paperInFormItems.ZhuJiMa,
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appProdOutTotalAnalyzer', params).then(res => {
					console.log(res);
					this.toast.hide()
					this.dataTableList = res.list
					this.formatDataListBy(this.dataTableList)
					this.isShow = false
					if(res.list.length === 0){
						this.toast.message('暂无数据')
					}
				}).catch(err => {
						this.toast.hide()
						this.toast.message('执行失败')
				})
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
	.margin-left-custom{
		margin-left: 10rpx;
	}
	.cu-form-group uni-picker .picker{
		    line-height: 30px !important;
	}
	.cu-form-group uni-picker::after{
		 line-height: 30px !important;
	}
	.border-top{
		  border-top: 1px solid #eee;
	}
	.bottomMerge text{
		font-size: 20rpx;
	}
</style>
