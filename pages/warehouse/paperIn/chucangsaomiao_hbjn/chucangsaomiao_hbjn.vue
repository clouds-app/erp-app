<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">纸板出仓扫描</block></cu-custom>
			<form class="xunhoutop">
				<view ref="elForm" class="bodyContentHeight2 elForm">
					<view class="cu-form-group">
						<view class="title">订单号:</view>
						<input @blur="paperOut()" v-model="paperOutItem.fOrderNo" placeholder="请输入订单号" />
						<button @click="turnOnScanCode('out')" type="primary" size="mini">扫描</button>
					</view>
					<view class="cu-form-group">
						<view class="title">本次装车数:</view>
						<input v-model="thisQty" placeholder="请输入本次装车数" type="number"/>
						<button :disabled="Number(thisQty)<=0?true:false" @click="checkQty" class="cu-btn bg-green shadow" size="mini">确认</button>
					</view>
			</view>
			</form>
			<view style="height: 80px;"></view>
			<view class="example">
				<v-table 
					:row-class-name="rowClassNameFn"
					:columns="findGoodsColumns" 
					:list="paperOutTableDataItems" 
					:td-width="150"
					selection="mulit"
					@checkboxChange="checkboxChange($event,'paperOutTableDataItems')"
					@checkboxChangeAll="checkboxChangeAll($event,'paperOutTableDataItems')"
					@edi="ediFn"
					>
				</v-table>
			</view>
			<view style="height: 50px;"></view>
			<view class="chucangbtm">
				<view class="flex solid-bottom padding justify-around elBtn" ref="elBtn">
					<button @click="resetFrom"  type="primary" size="mini" class="bg-grey radius">清除</button>
					<button @click="deletelist" data-target="DialogModal1" type="primary" size="mini" class="bg-grey radius">删除</button>
					<button @click="paprtIn"  type="primary" size="mini" class="bg-grey radius">保存</button>
				</view>
			</view>	
			
			<!-- 修改窗口 -->
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">{{edittitle}}</view>
						<view class="action" @tap="modalName=''">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="grid-body">
						<view class="grid-flex padding-10">
							<view style="color: red;">
								<text>工单号:{{findGoodsTableDataItems.OrderNo}}</text>
							</view>
							
						</view>
						<view class="grid-flex padding-10">
								<view>
									<text>工单信息:{{findGoodsTableDataItems.w_Name}},{{findGoodsTableDataItems.PaperInfo}}</text>
								</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>库存:{{findGoodsTableDataItems.Store}} </text>
							</view>
							<view>
								<text>未送数:{{findGoodsTableDataItems.NoDueQty}}</text>
							</view>
							<view>
								<text>装车数:{{findGoodsTableDataItems.CLQty}}</text>
							</view>
						</view>
					</view>
					<view class="updete" style="font-size: 20px;" v-if=" edittitle == '修改' ">
							<view class="title">装车数:</view>
							<input type="number" style=" border: 1px solid red; width: 30%;" v-model="CLQty"/>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="modalName=''">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="hideModal('ok')">确定</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 删除窗口 -->
			<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">删除</view>
						<view class="action" @tap="modalName=''">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="cu-form-group" style="font-size: 32rpx">
						是否删除已选中的数据?
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="modalName=''">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="deletehideModal">确定</button>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-modal" :class="modalName=='DialogModal3'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">警告</view>
						<view class="action" @tap="cancel">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="cu-form-group" style="font-size: 32rpx">
						累计装车数已大于最大装车数,是否继续??
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="cancel">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="submitthisQty">确定</button>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>


<script>
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';
import zTable from '@/components/z-table/z-table.vue';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import warehouse from '@/mixins';
import vTable from "@/components/table.vue"
export default {
	name: 'paperIn',//河北江诺
	components: {vTable, zTable, cuCustom,tTable,tTh, tTr,tTd},
	mixins: [warehouse],
	data() {
		return {
			thisQty:0,//本次装车数
			CLQty:'',//修改装车数
			edittitle:'',
			otherHeight:0,
			leftContentHeight:0,
			modalName:'',//弹框显示
			MaxQty: 0,//最大装车数
			scrollLeft: 0,
			dataTableList: [],
			errorContent: '暂无数据', //数据加载中...
			tableHeight: 0, //表格高度
			findGoodsTableDataItems: [],//存储需要操作的数据
			paperOutTableDataItems: [],
			paperOutItem: {
				fOrderNo: '', //工单号
				batch: ''
			},
			findGoodsColumns: [
				{
					key: 'Row',
					title: '序号',
					$width: 80,
					// $fixed:'left'
				},
				{
					title: "操作",
					$width: 90,
					key: "$operate",
					titleAlign: 'center',
					columnAlign: 'center',
					$operateList: [
						{
							label: "编辑",
							event: "edi",
							id: "edi"
						}
					]
				},
				{
					key: 'CustName',
					title: '客户',
					$width: 180,
					titleAlign: 'center',
					columnAlign: 'center'
				},
				{
					key: 'OrderNo',
					title: '订单号',
					titleAlign: 'center',
					columnAlign: 'center',
					$width: 200
				},
				{
					key: 'Store',
					title: '库存数',
					$width: 120,
					titleAlign: 'center',
					columnAlign: 'right'
				},
				{
					key: 'NoDueQty',
					title: '未送数',
					$width: 120,
					titleAlign: 'center',
					columnAlign: 'right'
				},
				{
					key: 'CLQty',
					title: '装车数',
					$width: 120,
					titleAlign: 'center',
					columnAlign: 'right'
				},
				{
					key: 'PaperInfo',
					title: '纸板信息',
					$width: 220,
					titleAlign: 'center',
					columnAlign: 'center'
				},
				{
					key: 'MinSize',
					title: '小尺寸',
					$width: 200,
					titleAlign: 'center',
					columnAlign: 'center'
				},
				{
					key: 'AreaName',
					title: '地区',
					$width: 130,
					titleAlign: 'center',
					columnAlign: 'center'
				},
			]
		};
	},
	// #ifdef H5
	mounted () {
		this.getTableHeight();
		this.getTemporaryData();
	},
	 onShow(){
		 this.getTemporaryData();
	 },
	// #endif
	// #ifndef H5
	onReady () {
		this.getTableHeight();
		this.getTemporaryData();
	},
	// #endif
	methods: {
		// 本次装车数确认
		async submitthisQty(){
			if(this.paperOutItem.fOrderNo == ''){
				this.toast.message('请扫描工单')
				return
			}
			let data = {
				UserID:this.userInfo.erpUserCode,
				OrderNo:this.paperOutItem.fOrderNo,
				Flag:7,
				CLQty:this.thisQty
			}
			await this.operationFromrequst(data).then(res=>{
				this.thisQty = 0
				this.getTemporaryData();
			})
			this.modalName = ''
			this.paperOutItem.fOrderNo = ''
		},
		// 警告框取消回调
		cancel(){
			this.modalName = ''
			this.thisQty = 0
		},
		// 本次装车数校验
		checkQty(){
			if(this.thisQty> this.MaxQty){
				this.modalName = 'DialogModal3'
			}else{
				this.submitthisQty()
			}
		},
		// 编辑按钮回调
		ediFn(data){
			this.edittitle = '修改'
			this.findGoodsTableDataItems =JSON.parse(JSON.stringify(data.row))
			this.index = data.index
			this.modalName = "DialogModal1"
		},
		//全选事件处理后回调，重写，做多余的处理
		checkboxChangeAll(){
			this.callbackChange()
		},
		//多选事件处理后回调，重写，做多余的处理
		callbackChange(){
			let [OrderNo,OrderNoCheck] = [[],[]]
			this.paperOutTableDataItems.filter(item=>{
				if(item.checked){
					OrderNo.push(item.OrderNo)
				}else{
					OrderNoCheck.push(item.OrderNo)
				}
			})
			this.setTableList(OrderNo,OrderNoCheck)
		},
		setTableList(OrderNo,OrderNoCheck){
			let parmes = {
				UserID:this.userInfo.erpUserCode,
				OrderNo:OrderNo.toString(),
				OrderNoCheck:OrderNoCheck.toString(),
				Flag:6
			}
			request.post('/warehouse/warehouse/execute/appPaperCarListAppTemp',parmes).then(res=>{
				this.getTemporaryData();
			}).catch(err=>{
				this.getTemporaryData();
			})
		},
		// 自定义某行样式
		rowClassNameFn(row, index) {
			if (Number(index) % 2 == 0) {
				return 'table-single-row';
			} 
			return '';//'table-double-row';
		},
		getTemporaryData(){
			let data = {
				UserID:this.userInfo.erpUserCode,
				Flag: 2
			}
			request.post('/warehouse/warehouse/execute/appPaperCarListAppTemp',data)
			.then(res=>{
				this.paperOutTableDataItems = res.list
				
			})
		},
		//获取指定内容占用高度,计算剩余高度 单位:PX
		getOtherContentHeight(className='bodyContentHeight'){
		  return new Promise((resolve, reject) => {
			   let eleHeight=0
			   let _self =this
			   let info = uni.createSelectorQuery().in(_self).select("."+className);
			  info.boundingClientRect(function(data) { //data - 各种参数
				 // console.log('other Height:'+data.height)  // 获取元素宽度
			 　　   _self.otherHeight = data.height
					eleHeight = data.height
					resolve(data.height)
			   }).exec(function (res) {
			   })
		  })
		},
		//计算设置表格高度
		setTableHeight(needOtherHeight=false){
				  if(!needOtherHeight){
					  this.otherHeight = 0
				  }
				try {
				    const res = uni.getSystemInfoSync();
					this.leftContentHeight =res.windowHeight -this.CustomBar - this.otherHeight -10
					return this.leftContentHeight
				} catch (e) {
				}
		},
		// 动态获取设置滚动条高度,适配整屏
		async getTableHeight(){
		  let _self=this
		  let tempHeight =  _self.setTableHeight()
		  let otherHeight= await _self.getOtherContentHeight("elForm")
		  let otherHeight2 = await _self.getOtherContentHeight("elBtn")
		  if(otherHeight!=null && otherHeight2!=null){
			_self.tableHeight =tempHeight-otherHeight-otherHeight2-20
			// console.log('111'+_self.tableHeight)
		  }
		},
		//操作数据调用接口
		operationFromrequst(param){
			return new Promise((resolve, reject)=>{
				resolve(request.post(`/warehouse/warehouse/execute/appPaperCarListAppTemp`,param))
			})
		},
		//清空按钮
		resetFrom(){
			let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
			if (this.paperOutTableDataItems.length == 0) {
				this.toast.message('请输入工单号');
				return;
			}
			this.paperOutTableDataItems = [];
			this.paperOutItem.fOrderNo = "";
			let data={
				UserID:user.erpUserCode,
				Flag: 5
			}
			this.operationFromrequst(data)
		},
		//修改按钮
		updetelist(e){
			if (this.paperOutTableDataItems.length == 0) {
				this.toast.message('请输入工单号');
				return;
			}
			if(this.index == null){
				this.toast.message('请选择操作数据');
				return;
			}
			this.edittitle = '修改'
			this.modalName = e.currentTarget.dataset.target
		},
		// 修改框确认回调
		async hideModal(e) {
			let data = {
				Flag:3,
				UserID:this.userInfo.erpUserCode,
				OrderNo:this.paperOutTableDataItems[this.index].OrderNo,
				CLQty:Number(this.CLQty),
			}
				await this.operationFromrequst(data)
				this.getTemporaryData();
				this.modalName = null
				this.CLQty = ''
		},
		async deletehideModal(){
			let data = {
				Flag:4,
				UserID:this.userInfo.erpUserCode,
				OrderNo:this.getDeleteList()
			}
			await this.operationFromrequst(data)
			this.getTemporaryData();
			this.modalName = null
			
		},
		// 获取删除的数据
		getDeleteList(){
			let checkList = []
			this.paperOutTableDataItems.filter(item=>{
				if(item.checked){
					checkList.push(item.OrderNo)
				}
			})
			return checkList.toString()
		},
		//删除按钮
		deletelist(e){
			if (this.paperOutTableDataItems.length == 0) {
				this.toast.message('请输入工单号');
				return;
			}
			if (this.getDeleteList()=='') {
				this.toast.message('请选择操作数据');
				return;
			}
			this.edittitle = '删除'
			this.modalName = 'DialogModal2'
		},
		//打开扫描
		async turnOnScanCode(type) {
				if(this.checkScan()){
					this.toast.message('请在"e包装"公众号中下载APP后扫码!')
					return
				}
				let scandata = await this.ScanModule(); 
				if(scandata.resp_code==1000){
					let a = scandata.resp_result.indexOf(',')
					let b = 0
					if(a<0){
						b = scandata.resp_result
					}else{
						b = scandata.resp_result.substring(0,a)
					}
					this.paperOutItem.fOrderNo = b;
					this.paperOut();
				}else{
					this.toast.message('扫码失败请重试')
				}
			},
		//查询数据
		paperInRequest(data) {
			return request.post('/warehouse/warehouse/execute/appSpScanOrder', data);
		},
		//确认提交===入仓===
		paprtIn() {
			let _self = this
			if (this.paperOutTableDataItems.length == 0) {
				this.toast.message('请输入工单号');
				return;
			}
			let fOrderNo = this.paperOutItem.fOrderNo
		  uni.navigateTo({
				  url:'../outStorageEdit?fOrderNo='+encodeURIComponent(fOrderNo),
				  success: function(e) {
					  // _self.resetFrom()
					  _self.paperOutTableDataItems = []
				  }
			})
		},
		//====出仓====
		paperOut() {
			if(!this.checkpaperOut()) return
			this.toast.loading();
			let data = {
				BarCodeStr: this.paperOutItem.fOrderNo,
				Station:'',
				Flag: 2,
				UserID:this.userInfo.erpUserCode,
			};
			this.paperInRequest(data).then(res => {
				if (res.list && res.list.length > 0) {
					this.getthisQty(res.list[0])
					// this.paperOutTableDataItems.push(res.list[0])
				}else{
					this.toast.message('该订单号暂无数据');
				}
			}).catch(err => {
				this.toast.hide();
				this.toast.message('暂无数据');
				this.paperOutItem.fOrderNo = '';
			});
		},
		// 获取本次装车数	P2001020343
		getthisQty(data){
			this.thisQty = data.CLQty
			this.MaxQty = data.CLQty
			this.toast.hide();
		},
		// 订单号校验
		checkpaperOut(){
			if (this.paperOutItem.fOrderNo == '') {
				this.toast.message('请输入或扫描订单号');
				return false
			}
			return true
		}
	}
};
</script>

<style scoped>
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
.updete {
	/* width: 50%; */
	display: flex;
	margin: auto 20px 10px;
	justify-content:flex-end
	
}
.padding-xl {
	display: flex;
	justify-content:flex-start;
	flex-direction:column;
}
.chucangbtm{
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 100;
}
.xunhoutop{
	position: fixed;
	width: 100%;
	z-index: 500;
}
</style>

