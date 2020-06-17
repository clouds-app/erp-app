<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true"><block slot="content">原纸缺纸</block></cu-custom>
		<!-- <view class="flex border-top">
			<view class="cu-form-group">
				<button size='mini' type='primary'>客户</button>
			</view>
		</view> -->
		<view class="cu-form-group">
			<view class="cu-form-group">
				<view class="cu-form-group">
					<button class='cu-btn bg-green shadow'>本周</button>
				</view>
				<view class="cu-form-group">
					<button class='cu-btn bg-green shadow'>本月</button>
				</view>
			</view>
			<button class='cu-btn bg-blue shadow'>查询</button>
		</view>
		<view class="flex border-top">
			<view class="cu-form-group">
				<view class="title">开始日期</view>
				<input  @click="openDateSelect('start')" disabled="true" placeholder="输入开始日期" v-model="startDate" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">结束日期</view>
				<input @click="openDateSelect('end')" disabled="true" v-model="endDate" placeholder="输入框结束日期" name="input"></input>
			</view>
		</view>
		<v-table
			:columns="findGoodsColumns" 
			:list="paperOutTableDataItems" 
			selection="single"
			:td-width="55"
			:row-class-name="rowClassNameFn"
			>
		</v-table>
	</view>
</template>

<script>
import dayjs from 'dayjs'	
import vTable from "@/components/table.vue"
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
	export default {
	name: 'baseshortpaper', //原纸缺纸
	components: { cuCustom,vTable},
		data() {
			return {
				endYear:dayjs(Date.now()).format('YYYY'),//当前年份
				startDate:dayjs(Date.now()).subtract(1, 'month').format('YYYY-MM-DD'),//开始时间
				endDate:dayjs(Date.now()).format('YYYY-MM-DD'),//结束时间
				paperOutTableDataItems:[],//数据源
				findGoodsColumns: [
					{
						key: 'Serial',
						title: '序号',
						$width: 34,
						// $fixed:'left'
					},
					{
						key: 'sp_Type',
						title: '原纸类型',
						$width: 70,
					},
					{
						key: 'st_Desc',
						title: '类型名称',
						$width: 70
					},
					{
						key: 'sp_Width',
						title: '纸宽',
						$width: 50
					},
					{
						key: 'StoreQty',
						title: '库存数',
						$width: 50
					},
					{
						key: 'pss_Min',
						title: '最低安全库存',
						$width: 50
					},
					{
						key: 'missQty',
						title: '缺纸数',
						$width: 50
					},
				]
			}
		},
		
		mounted () {
		},
		 onShow(){
			 this.getpaperOutTableDataItems()
		 },
		
		methods: {
			//弹出时间选择器
			openDateSelect(type){
				this.dataType =type
				this.$refs.DatePicker.show();
			},
			//时间确认-回调事件
			onConfirmDate(val){
				//console.log('date now:'+ JSON.stringify(val))
				if(this.dataType==='start'){
					this.startDate =val.result
				}else{
					this.endDate = val.result
				}
			},
			getpaperOutTableDataItems(){
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let parmas = {UserID:user.erpUserCode} 
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appSpSPaperStoreMissingPaper',parmas).then(res=>{
					if(res.list.length != 0){
						this.toast.hide();
					}else{
						this.toast.hide();
						this.toast.message('暂无数据')
					}
				}).catch(err=>{
					this.toast.hide();
					this.toast.message('数据加载失败')
				})
			},
			rowClassNameFn(row, index) {
				if (index === 1) {
					return 'demo-table-info-row';
				} else if (index === 3) {
					return 'demo-table-error-row';
				}
				return '';
			},
			onClick(){
				
			}
		}
	}
</script>

<style scoped>
</style>
