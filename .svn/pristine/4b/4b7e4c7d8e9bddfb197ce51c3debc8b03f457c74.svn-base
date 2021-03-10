<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">上次已审批特价</block>
		</cu-custom>
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="249"
				:height="tableHeight-35"
				>
			</v-table>
		</view>
	</view>
</template>

<script>
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	import dayjs from 'dayjs'
	import vTable from "@/components/table.vue"
	import cuCustom from '@/ui/colorui/components/cu-custom.vue' ;
	import baseMixin from '@/mixins';
	import request from '@/utils/request.js';
	export default {
		components:{cuCustom,selectDropdown,vTable},
		mixins:[baseMixin],
		data() {
			return {
				tableHeight: 0, //表格高度
				CustID:'',//客户
				dataTableList:[],
				dataColumns:[
					{ key: 'ArtId', title: '纸质',$width: 247, titleAlign: 'center', columnAlign: 'center' },
					{ key: 'LB', title: '楞别', $width: 250, titleAlign: 'center', columnAlign: 'center' },
					{ key: 'price', title: '特价', $width: 250, titleAlign: 'center', columnAlign: 'right' },
				]
			}
		},
		onLoad(data) {
			this.CustID = data.id
			this.getcustFromData()
		},
		methods: {
			getcustFromData(){
				let params = {UserID:this.userInfo.erpUserCode,CustID:this.CustID }
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appGetLastPaperSpecialItem',params).then(res=>{
					this.dataTableList = res.list
					this.toast.hide()
				}).catch(err=>{
					this.toast.message(err)
				})
			},
		}
	}
</script>

<style>

</style>
