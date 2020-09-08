<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">配纸报价</block>
		</cu-custom>
		
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="134"
				:fixedMultipleLeft='true'
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
				hiddenLoadMore:true,
				tableHeight: 0, //表格高度
				contentText:{
					contentdown: '点击显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				dataColumns:[
					{$fixed:"left", key: 'Serial', title: '序号',$width: 80, },
					{ key: 'spaper', title: '纸质', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'sam_addFaceamount', title: '面纸', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'sam_addBotamount', title: '底纸', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'sam_addAamount', title: 'A坑', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'sam_addBamount', title: 'B坑', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'sam_addCamount', title: 'C坑', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'sam_addqkamount', title: 'E坑', $width: 140, titleAlign: 'center', columnAlign: 'right' },
					{ key: 'sam_addFamount', title: 'F坑', $width: 140, titleAlign: 'center', columnAlign: 'right' },
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
					Mode: 1,
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
