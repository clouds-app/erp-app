<template>	
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">原纸出退仓汇总</block>
				<block slot="right">
					<button  type="primary"  @click="submitFormData()"  size="mini">查询</button>
				</block>
		</cu-custom>
		<view v-show="showFactor">	
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<button :disabled="isLoaddingData" :style="{color: type=='week'?'red':''}" class="cu-btn  line-blue" @click="searchDataBy('week')" >本周</button>
						<button :disabled="isLoaddingData" :style="{color: type=='month'?'red':''}" class="cu-btn  line-blue" @click="searchDataBy('month')" >本月</button>
						<button :disabled="isLoaddingData" :style="{color: formData.Mode==0?'red':''}" class="cu-btn  line-blue" @click="searchDataBy(0)" >出仓</button>
						<button :disabled="isLoaddingData" :style="{color: formData.Mode==1?'red':''}" class="cu-btn  line-blue" @click="searchDataBy(1)" >退仓</button>
						<button :disabled="isLoaddingData" class="cu-btn  bg-red" @click="resetFormData()" >清除</button>
				   </view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="title">日期范围:</view>
						<picker mode="date" :value="formData.SDate" @change="SDateChange">
							<view class="picker">
								{{formData.SDate}}
							</view>
						</picker>
						<text class="margin-left">至</text>
						<picker mode="date" :value="formData.EDate" @change="EDateChange">
							<view class="picker">
								{{formData.EDate}}
							</view>
						</picker>
				   </view>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="paperType"
						url="appFindSPaperType"
						title="原纸类型"
						placeholdertext="原纸类型"
						v-model='formData.Type'
						:params="{modelCode:'spaper_outback_search'}"
					></selectDropdown>
				</view>
			</view>
			<view class="flex border-top">
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="lineType"
						url="appFindLineSeparation"
						title="线别"
						placeholdertext="线别"
						v-model='formData.Line'
						:params="{modelCode:'spaper_outback_search'}"
					></selectDropdown>
				</view>
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='CustomBarHeight' 
						ref="vendType"
						url="appFindVendor"
						title="供应商"
						placeholdertext="供应商"
						v-model='formData.Vend'
						:params="{modelCode:'spaper_outback_search',Type:''}"
					></selectDropdown>
				</view>
			</view>
			<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">纸宽:</view>
					<input v-model="formData.Width" type="number" placeholder="纸宽" name="input" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">克重:</view>
					<input v-model="formData.Gram" type="number" placeholder="克重" name="input" />
				</view>
			</view>
		</view>
		</view>
		<view class="vtable">
			<v-table
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="136"
				:height="tableHeight"
				>
			</v-table>
		</view>
	</view>
</template>

<script>
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import vTable from "@/components/table.vue";
import dayjs from 'dayjs';
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue';
import baseMixin from '@/mixins';
const defaultFromData = {
	Mode:0,
	SDate: dayjs().date(1).format('YYYY-MM-DD'),
	EDate: dayjs().format('YYYY-MM-DD'),
	Vend:'',  //  --供应商编号
	Line:'',  //  --线别编号
	Group:'', //  --班别编号
	Type:'',  // 	--原纸类型编号
	Kind:'',  //  --原纸品名编号
	Width:'', //  --纸度(纸宽)
	Gram:'',  //  --克重
	Grade:'', //  --级别
	Station:'', //--仓位编号
}
const defaultDataColumns = [
	{ key: 'rownumber', title: '序号',$width: 80,},
	{ key: 'TypeID', title: '纸类编号', $width: 120, titleAlign: 'center', columnAlign: 'center' },
	{ key: 'TypeName', title: '纸类名称', $width: 150, titleAlign: 'center', columnAlign: 'center' },
	{ key: 'VendID', title: '供应商编号', $width: 160, titleAlign: 'center', columnAlign: 'center' },
	{ key: 'VendName', title: '供应商名称', $width: 160, titleAlign: 'center', columnAlign: 'center' },
	{ key: 'KindID', title: '品名编号', $width: 140, titleAlign: 'center', columnAlign: 'center' },
	{ key: 'KindName', title: '品名名称', $width: 140, titleAlign: 'center', columnAlign: 'center' },
	{ key: 'Station', title: '仓位', $width: 90, titleAlign: 'center', columnAlign: 'right' },
	{ key: 'StationName', title: '仓位名称', $width: 140, titleAlign: 'center', columnAlign: 'center' },
	{ key: 'Gram', title: '克重', $width: 100, titleAlign: 'center', columnAlign: 'right' },
	{ key: 'Total', title: '卷/重', $width: 100, titleAlign: 'center', columnAlign: 'right' },
	{ key: 'Coil', title: '卷', $width: 100, titleAlign: 'center', columnAlign: 'right' },
	{ key: 'Ewt', title: '重', $width: 100, titleAlign: 'center', columnAlign: 'right' },
	{ key: 'Money', title: '金额', $width: 100, titleAlign: 'center', columnAlign: 'right' },
]
export default {
	components: {cuCustom,vTable,selectDropdown},
	mixins: [baseMixin],
	data() {
		return {
			showFactor:false,
			formData:JSON.parse(JSON.stringify(defaultFromData)),
			type:'month',//本月本周
			tableHeight:0,
			dataTableList:[],
			dataColumns:JSON.parse(JSON.stringify(defaultDataColumns))
		};
	},
	onShow() {
		this.calTableHeight()
	},
	methods:{
		// 清除回调
		resetFormData(){
			this.formData = JSON.parse(JSON.stringify(defaultFromData)),
			this.$refs.paperType.clearFromData()
			this.$refs.lineType.clearFromData()
			this.$refs.vendType.clearFromData()
		},
		// 查询回调
		searchDataBy(type){
			switch (type){
				case 'week':
					this.type = 'week'
					this.formData.SDate = dayjs().day(0).format('YYYY-MM-DD')
					this.formData.EDate = dayjs().day(6).format('YYYY-MM-DD')
					break;
				case 'month':
					this.type = 'month'
					this.formData.SDate = dayjs().date(1).format('YYYY-MM-DD')
					this.formData.EDate = dayjs().format('YYYY-MM-DD')
					break;
				case 0:
					this.formData.Mode = 0
					break;
				case 1:
					this.formData.Mode = 1
					break;
			}
			// this.submitFormData()
		},
		// 查询回调
		submitFormData(){
			if(!this.showFactor) {
				this.showFactor = true 
				return
			}
			this.dataColumns = JSON.parse(JSON.stringify(defaultDataColumns))
			this.dataTableList = []
			this.formData.UserID=this.userInfo.erpUserCode
			this.getOrPostDataBy('/warehouse/warehouse/executeTitle/appSpSPaperTotalAnalyzer',this.formData).then(async res=>{
				await this.setDataColumns(res.titleList.slice(14))
				this.dataTableList = res.list
				this.showFactor=!this.showFactor
			}).catch(err=>{
				this.toast.message('查询失败!')
			})
		},
		// 添加动态头部
		setDataColumns(data){
			return new Promise((resolve,reject)=>{
				let dataColumns = []
				data.filter(item=>{
					dataColumns.push({
						key: item, title: item, $width: 100, titleAlign: 'center', columnAlign: 'right'
					})
				})
				this.dataColumns = [...this.dataColumns,...dataColumns]
				resolve();
			})
		},
		// 开始时间选择 回调
		SDateChange(e) {
			this.formData.SDate = e.detail.value
		},
		// 结束时间选择 回调
		EDateChange(e) {
			this.formData.EDate = e.detail.value
		},
		// 设置表格使用剩余高度
		calTableHeight(){
			this.$nextTick(()=>{
				// this.getOtherContentHeight()
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
