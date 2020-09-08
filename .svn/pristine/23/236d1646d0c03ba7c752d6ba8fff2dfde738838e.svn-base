<template>
	<view>
		<!-- <cu-custom bgColor="bg-gradual-blue" v-if="showcustom">
				<block slot="content" style="height: 30px;">纸板自动报价</block>
				<block slot="right">
					type="primary"
					<button style="margin-left: 20px;" class="cu-btn bg-mauve shadow"  @click="condition=!condition">设定</button>
				</block>
		</cu-custom> -->
		
		<!-- <view class="bodyContentHeight" v-show="condition"> -->
			<view class="bodyContentHeight">
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
						<button :disabled="isLoaddingData" class="cu-btn lines-orange shadow"  @click="goSubpage('Basepaper')">原纸报价设定</button>
						<button :disabled="isLoaddingData" class="cu-btn  lines-cyan shadow" @click="goSubpage('Monny')" size="mini">加工费设定</button>
						<button :disabled="isLoaddingData" class="cu-btn  lines-olive shadow" @click="goSubpage('paper')" size="mini">报价纸质</button>
						<button :disabled="isLoaddingData" @click="modalName = 'DialogModal1'"  class="cu-btn  lines-red shadow" size="mini">清空客户</button>
						<button :disabled="isLoaddingData" class="cu-btn lines-pink shadow"  @click="goSubpage('date')">生成报价</button>
					   </view>
					</view>
				</view>
			</view>	
			
			<view class="flex border-top" style="font-size: 16px;">
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='0' 
						ref="lineDrawer"
						url="appCustomerGroupSelect"
						title="客户分组"
						placeholdertext=""
						v-model='FormItems.lineCode'
						:params="{modelCode:'paper_auto_offer',pageSize:100,pageNum:1,type:''}"
						@closeMain="getlineCode"	
					></selectDropdown>
				</view>
				<view class="flex-sub">
					<selectDropdown
						:otherHeight='0' 
						ref="groupDrawer"
						url="appGetCustomerSelect"
						title="客户"
						placeholdertext=""
						v-model='FormItems.groupCode'
						:params="{modelCode:'paper_auto_offer',fieldDesc:'纸板',pageSize:100,pageNum:1,type:''}"
						:multipleChoice='true'
						@getcheckboxval="getcheckboxval"
					></selectDropdown>
						<!-- :params='groupparams' @getcheckboxval-->
				</view>
				<view style="width: 15%">
					<view class="cu-form-group">
						<view class="title">净利%:</view>
						<!-- 净利%: -->
						<input v-model="FormItems.BaseRate" type="number" @change="BaseRatechange"/>
					</view>
				</view>
				<view  style="width: 30%">
					<view class="cu-form-group" >
						<!-- <view class="title">计算单位</view> -->
						计算单位
						<picker @change="PickerChange" :value="pickerindex" :range="picker">
							<view class="picker" >
								{{picker[pickerindex]}}
							</view>
						</picker>
					</view>
				</view>
			</view>
		<!-- </view> -->
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="mulit"
				:td-width="108"
				:height="tableHeight+20"
				@edi="ediFn"
				@checkboxChange="checkboxChange"
				@checkboxChangeAll="checkboxChangeAll"
				>
			</v-table>
		</view>

		<!-- 编辑弹出层 -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog" style="width: 70%;">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改</view>
					<view class="action" @tap="modalName=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">税率%:</view>
							<input v-model="tableclickdata.ct_TaxRate" Name="input" type="number"/>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">分级%:</view>
							<input v-model="tableclickdata.ct_FJJRate" Name="input" type="number"/>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">运费%:</view>
							<input v-model="tableclickdata.ct_YFRate" Name="input" type="number"/>
						</view>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">付款%:</view>
							<input v-model="tableclickdata.ct_FKJRate" Name="input" type="number"/>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">业务%:</view>
							<input v-model="tableclickdata.ct_YWRate" Name="input" type="number"/>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">回扣%:</view>
							<input v-model="tableclickdata.ct_HKRate" Name="input" type="number"/>
						</view>
					</view>
				</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="modalName=''">取消</view>
						<view class="action margin-0 flex-sub text-green solid-left" @tap="updatarequest">确定</view>
					</view>
				</view>
		</view>
			
		<!-- 清空弹框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog" style="width: 40%;">
				<view class="cu-bar bg-white justify-end">
					<view class="content">清空</view>
					<view class="action" @tap="modalName = ''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<text>是否清空全部数据</text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="modalName = ''">取消</view>
						<view class="action margin-0 flex-sub text-green solid-left" @tap="emptyFromData">确定</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import selectDropdown from '@/components/selectDropdown/selectDropdown.vue';
import dayjs from 'dayjs';
import vTable from "@/components/table.vue";
import zTable from "@/components/z-table/z-table.vue";
import baseMixin from '@/mixins';
import cuCustom from '../../ui/colorui/components/cu-custom.vue';
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';
import request from '@/utils/request.js';
const operateCol = {
	operate: {
			edi: {
				label: "编辑",
				fn(row, index) {
					//this.alertFnCallback(row,index);
				}
			}
	}
}
export default {
	components: {cuCustom,vTable,selectDropdown,uniLoadMore,tTable,tTh,tTr,tTd},
	mixins: [baseMixin],
	data() {
		return {
			showcustom:false,//删选条件隐藏字段
			FormItems:{
				lineCode:'',//客户分组
				groupCode:'',//客户
				BaseRate:'',//净利润
				ID1:'',//净利润ID
				company:'',//计算单位
			},
			tableCilckindex:0,//table编辑索引
			pickerindex:1,
			picker: ['元/m2', '元/千平方英寸'],
			modalName:'',//编辑框隐藏字段
			tableclickdata:{},//table修改行
			avgWidth:10, // 表格提示信息宽度,取所有字段的平均值
			tableHeight: 0, //表格高度
			dataTableList:[],
			dataColumns:[
				{ key: 'rownumber', title: '序号',$width: 80, $checked:true},
				{ key: 'ct_ID', title: '编号', $width: 130, titleAlign: 'center', columnAlign: 'center', $checked:true},
				{ key: 'ct_Desc', title: '客户名', $width: 120, titleAlign: 'center', columnAlign: 'center', $checked:true},
				{ key: 'ct_Kind', title: '级别', $width: 110, titleAlign: 'center', columnAlign: 'center',$checked:true},
				{ key: 'ai_Name', title: '地区', $width: 110, titleAlign: 'center', columnAlign: 'center', $checked:true},
				{ key: 'ct_DeliSpace', title: '公里数', $width: 110, titleAlign: 'center', columnAlign: 'right', $checked:true},
				{ key: 'w_Name', title: '业务员', $width: 110, titleAlign: 'center', columnAlign: 'center', $checked:true},
				{ key: 'ct_TaxRate', title: '税率%', $width: 110, titleAlign: 'center', columnAlign: 'right', $checked:true},
				{ key: 'ct_FJJRate', title: '分级%', $width: 110, titleAlign: 'center', columnAlign: 'right', $checked:true},
				{ key: 'ct_YFRate', title: '运费%', $width: 110, titleAlign: 'center', columnAlign: 'right', $checked:true},
				{ key: 'ct_FKJRate', title: '付款%', $width: 110, titleAlign: 'center', columnAlign: 'right', $checked:true},
				{ key: 'ct_YWRate', title: '业务%', $width: 110, titleAlign: 'center', columnAlign: 'right', $checked:true},
				{ key: 'ct_HKRate', title: '回扣%', $width: 110, titleAlign: 'center', columnAlign: 'right', $checked:true},
				{
					title: "操作",
					$width: 110,
					key: "$operate",
					$operateList: [
						{
							label: "编辑",
							event: "edi",
							id: "edi"
						}
					]
				},
			],
		}
	},
	computed:{

	},
	// #ifdef H5
	mounted() {
		// plus.screen.lockOrientation("landscape-secondary")
		this.avgWidth = this.getTableAvgWidth(this.dataColumns);
		this.calTableHeight()
		this.getrequst()//请求无用接口
		this.getBaseRate()
	},
	// #endif
	// #ifndef H5
	onShow() {
		this.showcustom = false
		plus.navigator.setFullscreen(true);
		setTimeout(()=>{
			plus.screen.lockOrientation("landscape-secondary")
			this.avgWidth = this.getTableAvgWidth(this.dataColumns);
			this.calTableHeight()
			this.getBaseRate()
		},1300)
		this.getrequst()//请求无用接口
	},
	// 监听页面返回时改成正常显示
	onBackPress(){
		plus.screen.unlockOrientation();
		setTimeout(()=>{
			plus.screen.lockOrientation("portrait-primary")
		},1300)
	},
	// #endif
	methods: {
		// 清空事件回调
		emptyFromData(){
			this.dataTableList = []
			this.modalName = ''
		},
		// 全选回调事件
		checkboxChangeAll(data){
			let valData = data
			this.dataTableList.filter(item=>{
				item.checked = !valData
			})
		},
		// 多选回调事件
		checkboxChange(e,index){
			this.dataTableList[index.data].checked = !this.dataTableList[index.data].checked
		},
		// 遍历拿到界面上所有的编号
		getCustIDStr(){
			let getCustIDStr = '';
			if(!!this.dataTableList.length){
				this.dataTableList.filter((item,index)=>{
					getCustIDStr += item.ct_ID+';'
				})
				return getCustIDStr
			}
			return getCustIDStr
		},
		// 客户多选回调事件
		getcheckboxval(data){
			if(!data){return}
			this.toast.loading()
			let getCustIDStr = this.getCustIDStr()+data
			let params = {UserID:this.userInfo.erpUserCode,CustIDStr:getCustIDStr}
			let _self = this
			request.post('/warehouse/warehouse/execute/appCustomerOfferList',params).then(res=>{
				_self.tableDatahandle(res.list,'groupCode')
				// this.toast.hide()
			}).catch(err=>{
				this.toast.hide()
				this.toast.message(err)
			})
		},
		// 选择客户分组回调事件
		getlineCode(data){
			let _self = this
			this.dataTableList = []
			this.toast.loading()
			request.post('/warehouse/warehouse/execute/appCustomerByGroup',{GroupID:data.type}).then(res=>{
				_self.tableDatahandle(res.list,'lineCode')
			}).catch(err=>{
				_self.toast.hide()
				_self.toast.message(err)
			})
		},
		// table数据处理
		tableDatahandle(data,type){
			data.filter(item=>{
				// item = {item,...operateCol}
				item.operateCol = operateCol
			})
			this.dataTableList = []
			this.dataTableList = data
			// 延迟取消加载，加强渲染效果
			setTimeout(()=>{
				this.toast.hide()
			},1000)
		},
		// 编辑确认回调事件
		updatarequest(){
			let params = {
				ID1:this.tableclickdata.ID1,
				UserID:this.userInfo.erpUserCode,
				ct_TaxRate:this.tableclickdata.ct_TaxRate,
				ct_FJJRate:this.tableclickdata.ct_FJJRate,
				ct_YFRate:this.tableclickdata.ct_YFRate,
				ct_FKJRate:this.tableclickdata.ct_FKJRate,
				ct_YWRate:this.tableclickdata.ct_YWRate,
				ct_HKRate:this.tableclickdata.ct_HKRate,
			}
			this.toast.loading()
			request.post('/warehouse/warehouse/execute/appCustomerOfferUp',params).then(res=>{
				if(!res.list[0].res){
					this.toast.hide()
					this.toast.message('修改失败')
				}
				this.setdataTableList()
			}).catch(err=>{
				this.toast.hide()
				this.toast.message(err)
			})
		},
		// 修改数据成功回调事件
		setdataTableList(){
			this.dataTableList[this.tableCilckindex].ct_TaxRate = JSON.parse(JSON.stringify(this.tableclickdata.ct_TaxRate))			
			this.dataTableList[this.tableCilckindex].ct_FJJRate = JSON.parse(JSON.stringify(this.tableclickdata.ct_FJJRate))			
			this.dataTableList[this.tableCilckindex].ct_YFRate = JSON.parse(JSON.stringify(this.tableclickdata.ct_YFRate))			
			this.dataTableList[this.tableCilckindex].ct_FKJRate = JSON.parse(JSON.stringify(this.tableclickdata.ct_FKJRate))			
			this.dataTableList[this.tableCilckindex].ct_YWRate = JSON.parse(JSON.stringify(this.tableclickdata.ct_YWRate))			
			this.dataTableList[this.tableCilckindex].ct_HKRate = JSON.parse(JSON.stringify(this.tableclickdata.ct_HKRate))	
			this.modalName = ''
			this.toast.hide()
		},
		//净利润改变回调事件
		BaseRatechange(e){
			this.toast.loading()
			let _self = this
			let params = {BaseRate:this.FormItems.BaseRate,ID1:this.FormItems.ID1,UseID:this.userInfo.erpUserCode}
			request.post('/warehouse/warehouse/execute/appGetSPaperBaseRateSetUp',params).then(res=>{
				_self.toast.hide()
				if(!res.list[0].res){
					_self.toast.message('修改失败')
					_self.FormItems.BaseRate = 0
				}
			}).catch(err=>{
				_self.toast.hide()
				_self.toast.message(err)
			})
		},
		// 初始化净利润
		getBaseRate(){
			this.toast.loading()
			let _self = this
			request.post('/warehouse/warehouse/execute/spGetSPaperBaseRateSet',{UseID:this.userInfo.erpUserCode}).then(res=>{
				_self.FormItems.ID1 = res.list[0].ID1
				_self.FormItems.BaseRate = res.list[0].BaseRate
				_self.toast.hide()
			}).catch(err=>{
				this.toast.hide()
				this.toast.message(err)
			})
		},
		// 计算单位回调事件
		PickerChange(e) {
			this.pickerindex = e.detail.value
		},
		// 过来已选择的数据
		getcheckedData(){
			let getCustIDStr = '';
			if(!!this.dataTableList.length){
				this.dataTableList.filter((item,index)=>{
					if(item.checked){
						getCustIDStr += item.ct_ID+';'
					}
				})
				return getCustIDStr
			}
			return getCustIDStr
		},
		// 页面跳转
		goSubpage(type) {
			this.toast.loading()
			let _self = this
			let CustList = this.getcheckedData()
			switch(type) {
				case 'Basepaper'://原纸报价设定
				setTimeout(()=>{
				 	plus.screen.lockOrientation("portrait-primary")
			        uni.navigateTo({
			            url: 'BasepaperPriceSee'
			        });
				 },1000)
			        break;
				case 'Monny'://加工费设定
				setTimeout(()=>{
					plus.screen.lockOrientation("portrait-primary")
					uni.navigateTo({
					    url: 'processCostSee'
					});
				},1000)
			        break;
				case 'paper'://报价纸质
				setTimeout(()=>{
				   plus.screen.lockOrientation("portrait-primary")
				   uni.navigateTo({
				       url: 'setpaperQuotation'
				   });
				},1000)
				   break;
			     default://生成报价	CreateOffer
				 if(!CustList){
					 this.toast.message('请选择生成数据') 
					 return
				 }
				setTimeout(()=>{
					_self.cache.put('CreateOffer',{CustList:CustList.substr(0, CustList.length - 1),BaseML:_self.FormItems.BaseRate,JLUnit:_self.pickerindex})
					plus.screen.lockOrientation("portrait-primary")
					uni.navigateTo({
						url: 'CreateOffer?type=CreateOffer'
					});
				},1000)
			} 					
		},
		// 编辑按钮回调事件
		ediFn(data) {
			this.tableCilckindex = data.index
			this.tableclickdata =JSON.parse(JSON.stringify(data.row)) 
			this.modalName = 'DialogModal2'
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
		},
		// 请求原纸CS接口
		getrequst(){
			let params = {
				UseID:this.userInfo.erpUserCode,
			}
			request.post('/warehouse/warehouse/execute/spGetSPaperPirceSet',params)
		},
	}
};
</script>

<style>
	
	.cu-form-group uni-picker .picker{
		    line-height: 30px !important;
	}
	.cu-form-group uni-picker::after{
		 line-height: 30px !important;
	}
	.border-top{
		  border-top: 1px solid #eee;
	}
</style>
