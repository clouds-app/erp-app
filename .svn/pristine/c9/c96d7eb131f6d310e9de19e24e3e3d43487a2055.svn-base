<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content" style="height: 30px;">加工费查看</block>
		</cu-custom>
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="250"
				:height="tableHeight-35"
				>
			</v-table>
		</view>
		<view style="height: 15rpx;" class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<uni-load-more 
						:contentText="contentText" 
						v-if="page.showpage" 
						@clickLoadMore="clickLoadMore" 
						:status="more">
					</uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import vTable from "@/components/table.vue";
import baseMixin from '@/mixins';
import cuCustom from '../../ui/colorui/components/cu-custom.vue';
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import request from '@/utils/request.js';
const moreStatus ={
	more:'more',
	loading:'loading',
	noMore:'noMore'
}
	export default {
		components:{cuCustom,vTable,uniLoadMore},
		mixins:[baseMixin],
		data() {
			return {
				contentText:{
					contentdown: '点击显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				page:{
					showpage:false,
					pageNum:1,
					pageSize:50
				},
				more:moreStatus.more,// 是否还有更多的数据 more loading noMore）
				tableHeight: 0, //表格高度
				dataTableList:[],
				dataColumns:[
					{ key: 'art_Cs', title: '层数', $width: 210, titleAlign: 'center', columnAlign: 'center'},
					{ key: 'art_LB', title: '楞型', $width: 270, titleAlign: 'center', columnAlign: 'center'},
					{ key: 'JGFee', title: '加工费', $width: 270, titleAlign: 'center', columnAlign: 'center'},
				],
			}
		},
		// #ifdef H5
		mounted() {
			this.calTableHeight()
		},
		// #endif
		// #ifndef H5
		onLoad(){
			this.calTableHeight()
		},
		// 监听页面返回时改成正常显示
		// onBackPress(){
		// 	this.toast.loading()
		// },
		// #endif
		methods: {
			// 加载表单数据
			getFromtableData(){
				let parms = {
					UserID:this.userInfo.erpUserCode,
					pageSize:this.page.pageSize,
					pageNum:this.page.pageNum
				}
				let _self = this
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/spGetSPaperJGFeeSet',parms).then(res=>{
					_self.checkData(res.list)
					_self.dataTableList = _self.dataTableList.concat(res.list)
					_self.toast.hide()
				}).catch(err=>{
					_self.toast.hide()
					_self.toast.message(err)
				})
			},
			// 数据校验是否分页
			checkData(data){
				if(data.length<this.page.pageSize){
					this.page.showpage = false
					this.page.pageNum = 1
					return
				}
				this.page.showpage = true
				this.page.pageNum++
			},
			// 加载更多数据
			clickLoadMore(){},
			// 设置表格使用剩余高度
			calTableHeight(){
				this.$nextTick(()=>{
					// this.getOtherContentHeight()
					setTimeout(()=>{
						//延时执行,方便个别小程序兼容
						let tempHeight =  this.setTableHeight(true)
						this.tableHeight =tempHeight//特别处理
						this.getFromtableData()
					},200)
				})
			}
			
		}
	}
</script>

<style>

</style>
