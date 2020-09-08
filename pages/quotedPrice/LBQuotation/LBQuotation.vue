<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">楞别报价</block>
		</cu-custom>
		
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="125"
				:height="tableHeight-30"
				>
			</v-table>
		</view>
		<view style="height: 15rpx;" class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
				<uni-load-more :contentText="contentText" v-if="!hiddenLoadMore" @clickLoadMore="clickLoadMore" :status="more"></uni-load-more>
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
import cuCustom from '@/ui/colorui/components/cu-custom.vue' 
import vTable from "@/components/table.vue"
import baseMixin from '@/mixins';
import request from '@/utils/request.js';
	export default {
		components:{cuCustom,vTable},
		mixins:[baseMixin],
		data() {
			return {
				hiddenLoadMore:true, // 是否显示加载更多
				tableHeight: 0, //表格高度
				contentText:{
					contentdown: '点击显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				dataColumns:[
					{ key: 'Serial', title: '序号',$width: 70, },
					{ key: 'lb_Code', title: '楞别', $width: 70, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'lb_CS', title: '层数', $width: 70, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'lb_ProcessPrice', title: '加价', $width: 70, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'lb_Discount', title: '折扣系数', $width: 152, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'pap_LessStyle', title: '优惠方式', $width: 320, titleAlign: 'center', columnAlign: 'right' },
				],
				dataTableList:[],
			}
		},
		onReady(){
			this.calTableHeight()
			this.getdataTableList()
		},
		methods: {
			getdataTableList(){
				let parms = {
					Mode: 2,
					UserID: this.userInfo.erpUserCode
				}
				this.toast.loading()
				// /proc/execute/appSpPhoneArtPriceQuery
				request.post('/proc/execute/appSpPhoneArtPriceQuery',parms).then(res=>{
					this.toast.hide()
					this.dataTableList = this.handleList(res.list)
				}).catch(err=>{
					this.toast.hide()
					this.toast.message(err)
				})
			},
			handleList(data){
				for(let i = 0; i< data.length ;i++){
					data[i].Serial = i+1
				}
				return data
			},
			// 设置表格使用剩余高度
			calTableHeight(){
				this.$nextTick(()=>{
					this.getOtherContentHeight()
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
