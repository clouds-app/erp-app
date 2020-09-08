<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true"><block slot="content">纸板入库详情</block></cu-custom>
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="186"
				:height="tableHeight-30"
				>
			</v-table>
		</view>
		<view style="height: 15rpx;" class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
				<uni-load-more :contentText="contentText" v-if="!hiddenLoadMore" @clickLoadMore="clickLoadMore" :status="more"></uni-load-more>
				<view class="title"><text class="text-bold">合计:</text>{{sumMoney}}</view>
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
import dayjs from 'dayjs'
import vTable from "@/components/table.vue"
import baseMixin from '@/mixins';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
const moreStatus ={
	more:'more',
	loading:'loading',
	noMore:'noMore'
}
export default {
	components: {cuCustom,vTable,selectDropdown,uniLoadMore},
	mixins: [baseMixin],
	data() {
		return {
			tableHeight:0,
			sumMoney:0,
			hiddenLoadMore:true, // 是否显示加载更多
			contentText:{
				contentdown: '点击显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			OrderNo:'',
			dataTableList:[],
			dataColumns:[
				{ key: 'Serial', title: '序号',$width: 80, },
				{ key: 'plat_InDate', title: '时间',$width: 300, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'mobName', title: '操作人', $width: 182, titleAlign: 'center', columnAlign: 'right' },
				{ key: 'plat_InQty', title: '入库数', $width: 182, titleAlign: 'center', columnAlign: 'right' },
			]
		}
	},
	onLoad(OrderNo){
		this.OrderNo = OrderNo
		this.loaddingData()
	},
	// #ifdef H5
	mounted() {
	  this.calTableHeight()
	},
	// #endif
	// #ifndef H5
	onReady() {
		this.calTableHeight()
	},
	// #endif
	methods:{
		// 自定义某行样式
		rowClassNameFn(row, index) {
			if (Number(index) % 2 == 0) {
				return 'table-single-row';
			} 
			return '';//'table-double-row';
		},
		// 点击加载更多 回调事件
		clickLoadMore(res){
			this.more = moreStatus.loading
			this.isFilterDataByPage = true
			this.pageSetting.current = this.pageSetting.current+1
			this.loaddingData()
		},
		// 查询数据
		loaddingData(){
			if(!this.isFilterDataByPage){
				// 非分页加载数据
				this.dataTableList = []      // 清空数据列表
				this.pageSetting.current = 1 // 重置当前页码
			}
			this.sumMoney =0
			let url = '/warehouse/warehouse/execute/appPaperInAppTemp'
			let params = {
			   OrderNo:this.OrderNo.id
			}
			this.getOrPostDataBy(url,params).then(res=>{
				if(res&& res.list.length>0){
					this.doSomeLogicWhenDataNotNull(res)
				}else{
					this.more = moreStatus.noMore
					this.hiddenLoadMore = true
					if(!this.isFilterDataByPage){
							this.toast.message('暂无数据...')
					}else{
						this.toast.message('暂无更多数据...')
					}
				}
			  this.isFilterDataByPage = false // 重置分页查询条件
			})
		},
		// 数据逻辑处理
		doSomeLogicWhenDataNotNull(res){
			let preIndex = this.dataTableList.length // 分页查询 目前下标
			this.more = moreStatus.more
			this.hiddenLoadMore = false  // 显示加载更多
			let customDataList = res.list.filter((item,index)=>{
				// 自定义序号
				item.Serial= index +1 + preIndex
				// 复制金额字段,防止格式化后无法计算,计算汇总金额
				item.BMoneyCopy= item.plat_InQty
				return item
			})
			// 千分符数据格式化,保留小数等
			let formatDataList = this.formatDataListBy(customDataList)
			// 小于最低页面 应该加载更多
			if(customDataList.length<20){
				this.hiddenLoadMore = true
			}
			// 分页数据累加
			let tempDataList = this.dataTableList.concat(formatDataList) 
			// 金额汇总
			let totalMoney = tempDataList.reduce((initMoney,nextItem)=>{
				return initMoney= initMoney + Number(nextItem.BMoneyCopy) 
			},0)
			this.sumMoney =this.addThousandthSign(Number((totalMoney))) 
			this.dataTableList = tempDataList
		},
		// 格式化指定字段
		formatDataListBy(dataList){
			if(dataList && Array.isArray(dataList) && dataList.length>0)
			{
				dataList = dataList.map(item=>{
					if(!!item.plat_InQty){
						item.plat_InQty =this.addThousandthSign(Number((item.plat_InQty)))
					}
					// if(!!item.bi_Money){
					// 	item.bi_Money =this.addThousandthSign(Number((item.bi_Money).toFixed(2))) 
					// }
					// if(!!item.co_RateM){
					// 	item.co_RateM =this.addThousandthSign(Number(item.co_RateM).toFixed(1)) 
					// }
					
					// if(!!item.profit_GX){
					// 	item.profit_GX = Number(item.profit_GX).toFixed(1)
					// }
					return item
				})
			}
			return dataList
		},
		// 设置表格使用剩余高度
		calTableHeight(){
			this.$nextTick(()=>{
				setTimeout(()=>{
					//延时执行,方便个别小程序兼容
					let tempHeight =  this.setTableHeight(true)
					this.tableHeight =tempHeight//特别处理
				},200)
			})
		}
	}
	
}
</script>

<style>
</style>
