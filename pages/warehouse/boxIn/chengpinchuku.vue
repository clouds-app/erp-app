<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">纸箱成品出库</block>
		</cu-custom>
		<form class="xunhoutop">
			<view class="bodyContentHeight">
				<view class="cu-form-group">
					<view class="title">订单号:</view>
					<input @blur="boxInGetOrderInfo" v-model="boxOut.formItem.bi_OrderNo" placeholder="请输入或扫描订单号" />
					<button @click="turnOnScanCode('orderNo')" type="primary" size="mini">扫描</button>
				</view>
			</view>
		</form>
		<view style="height: 40px;"></view>
		<!-- 数据列表 -->
		<view class="grid-warp" v-for="(item,index) in fromdata" :key='index' >
			<view class="grid-title">
			<view>订单号:{{item.bcNo}}&nbsp;&nbsp;工单号:{{item.WorkNo}}</view>
			<view @click="deletebox(index)"><text style="color: red;">删除</text></view>
			</view>
			<view class="grid-body">
				<view>
					<view class="grid-flex padding-10">
						<view>
							<text>客户:{{item.CustName}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>客户PO:{{item.CustPO}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>产品:{{item.ProdNo}},{{item.ProdName}}</text>
						</view>
						<view class="grid-flex">
							<view v-if="item.ProdType==2"><!---->
								<text @click="inKit(index)" style="color: #007AFF;">套件明细</text>
							</view>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>规格:{{item.BoxInfo}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>料号:{{item.BatchNo}}</text>
						</view>
						<view>
							<text>未送:{{item.NoDelQty}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>入库:{{item.InStoreQty}}</text>
						</view>
						<view>
							<text>库存:{{item.StoreQty}}</text>
						</view>
						<view style="color: red;">
							<text style="margin-right: 5px;">送货:{{item.DelQty}}</text>
							<text @click="updatebox(index)">修改</text>
						</view>
					</view>
				</view>	
				<view class="grid-flex padding-10">
					<!-- <view>
						<button @click="deletebox(index)" type="warn" size="mini">删除</button>
					</view> -->
					<!-- <view>
						<button @click="updatebox(index)" type="primary" size="mini">修改</button>
					</view> -->
				</view>
			</view>
		</view>
		<!-- 操作弹窗 -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''" style="z-index: 100;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modalTitle}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid-body">
					<view class="grid-flex padding-10">
						<view style="color: red;">
							<text>订单号:{{deletefrom.bcNo}}</text>
						</view>
						<view>
							<text>工单号:{{deletefrom.WorkNo}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>客户:{{deletefrom.CustName}}</text>
						</view>
						<view>
							<text>产品编号:{{deletefrom.ProdNo}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>规格:{{deletefrom.BoxInfo}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>名称:{{deletefrom.ProdName}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>料号:{{deletefrom.BatchNo}}</text>
						</view>
						<view>
							<text>客户PO:{{deletefrom.CustPO}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>入库{{deletefrom.InStoreQty}}</text>
						</view>
						<view>
							<text>库存:{{deletefrom.StoreQty}}</text>
						</view>
						<view>
							<text>未送:{{deletefrom.NoDelQty}}</text>
						</view>
						<view v-show="modalTitle=='删除'?'show':''">
							<!-- :class="modalTitle=='DialogModal2'?'show':''" -->
							<text>送货:{{deletefrom.DelQty}}</text>
						
						</view>
					</view>
				</view>
				<view  v-show="modalTitle=='修改'?'show':''">
					<view class="grid-body" v-for="(item,index) in modifyfromdata" :key='index'>
						<view class="grid-flex padding-10">
							<view>
								<text>仓位{{item.bssat_StationName}}</text>
							</view>
							<view>
								<text>库存:{{item.bssat_Qty}}</text>
							</view>
							<view class="updete">
								<text>送货数:</text>
								<!-- <view class="title">送货数:</view> -->
								<input @blur="checkDelQty($event,index)" style=" border: 1px solid red; width: 50%;" v-model="item.bssat_DelQty"/>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="confirmFrom">确定</view>
					</view>
				</view>
		</view>
			<view style="height: 70px;"></view>
			<view class="chucangbtm">
				<view class="flex solid-bottom padding justify-around elBtn" ref="elBtn">
					<view>	<button @click="resetFrom"  type="primary" size="mini" class="bg-grey radius">清除全部</button></view>
					<view style="margin-top: 5px;"> <text>总记录数:{{numbertext}}</text>	</view>
					<view>	<button @click="paprtIn"  type="primary" size="mini" class="bg-grey radius">保存出仓</button></view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
//纸箱成品出库
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import zTable from '@/components/z-table/z-table.vue';
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import dateFormat from '@/utils/dateFormat.js';
import warehouse from '@/mixins/warehouse.js';
export default {
	
	name: 'boxIn', //纸箱成品出库
	components: { zTable, uniPopup, cuCustom },
	mixins: [warehouse],
	data() {
		return {
			modifyfromdata:[],//修改存储多仓位数据
			numbertext:0,//总记录数
			shouindex:[0,1,0],
			modalindex:null,//存储操作数据的下标
			modalName:null,//删除弹框隐藏字段
			fromdata:[],//界面显示数据
			currentSelected: '-1',
			TabCur: 0,
			scanType: '', //当前扫描类型
			scrollLeft: 0,
			dataTableList: [],
			errorContent: '暂无数据', //'数据加载中...',
			tableHeight: 400, //表格高度
			boxOut: {
				formItem: {
					//成品出库
					bd_CarNo: '', //车ㅤ牌
					bd_Follower: '', //跟车员
					bd_Loador: '', //发货员
					bd_SenderID: '', //发货员
					bi_OrderNo: '', //订单号
					bi_OrderQty: '' //数量
				},
				formItemText: {
					bd_CarNo: '', //车ㅤ牌
					bd_Follower: '', //跟车员
					bd_Loador: '', //发货员
					bd_SenderID: '' //发货员
				},
				formItemInit: {
					bd_CarNo: '', //车ㅤ牌
					bd_Follower: '', //跟车员
					bd_Loador: '', //发货员
					bd_SenderID: '', //发货员
					bi_OrderNo: '', //订单号
					bi_OrderQty: '' //数量
				},
				car: {
					//车牌列表
					items: [],
					show: false
				},
				follower: {
					//跟车员
					items: [],
					show: false
				},
				loader: {
					//装车员
					items: [],
					show: false
				},
				sender: {
					//发货员
					items: [],
					show: false
				},
				tableData: []
			},
			deletefrom:{},//删除弹框显示数据
			modalTitle:'',//操作弹框标题
		};
	},
	// #ifdef H5
	mounted() {
		// 获取已扫订单
		this.getTemporaryData();
	},
	// #endif
	onShow(){
		// debugger
		this.getTemporaryData();
	},
	// #ifndef H5
	onReady() {
		// 获取已扫订单
		this.getTemporaryData();
	},
	// #endif
	methods: {
		// 修改送货数失去焦点校验
		checkDelQty(data,index){
			let subQty =Number(data.detail.value) //送货数
			let bssatQty =Number(this.modifyfromdata[index].bssat_Qty)//库存 
			if(subQty>bssatQty){
				// this.modifyfromdata[index].bssat_DelQty =JSON.parse(this.modifyfromdata[index].bssat_Qty) 
				uni.showToast({
				    title: '送货数不能大于库存数',
				    duration: 2000,
					icon:'none',
					position:'bottom',
				});
				return
			}
		},
		// 获取已扫订单
		getTemporaryData(){
			let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
			let data = {
				Flag:2,
				UserID:user.erpUserCode,
			}
			this.toast.loading();
			request.post('/warehouse/warehouse/execute/appBoxDeliListAppTemp',data)
			.then(res=>{
				this.toast.hide();
				this.fromdata = res.list
				this.numbertext = res.list.length
			}).catch(err=>{
				this.toast.hide();
				this.toast.message('数据加载失败')
			})
		},
		// 订单号查询
		boxInGetOrderInfo(){
			let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
			if (this.boxOut.formItem.bi_OrderNo == '') {
				this.toast.message('请输入或扫描工单号');
				return;
			}
			this.fromdata = [];
			this.numbertext = 0;
			let data = {
				bcNo: this.boxOut.formItem.bi_OrderNo,
				Flag: 1,
				UserID:user.erpUserCode,
			};
			let _self = this
			this.toast.loading();
			request.post('/warehouse/warehouse/executeMany/appBoxScanOrder',data).then(res=>{
				_self.handlerespond(res)
				return;
			}).catch(err => {
					_self.errorContent = '暂无数据';
					_self.toast.message('获取数据失败:' + err);
			});
		},	
		// 扫码订单返回成功数据处理  信用额
		handlerespond(res){
			let check = res.list[1]
			let data = res.list[0]
			if(!check[0].res){
				this.toast.message(check[0].resDesc);
			}else{
				this.toast.hide();
			}
			this.fromdata = data
			this.numbertext = data.length
		},
		// 保存出仓
		paprtIn(){
			if(this.fromdata.length == 0 && this.boxOut.formItem.bi_OrderNo == ''){
				this.toast.message('请输入工单号');
				return;
			}
			uni.navigateTo({
				  url:'outStorageEdit'
			})
		},
		//进入套件
		inKit(index){
			// debugger
			let bcNo = this.fromdata[index].bcNo
			let ProdNo = this.fromdata[index].ProdNo
			uni.navigateTo({
				// url: `./loadGoodsDownDetail?cardNo=${this.formItem.licensePlate}&carListNo=` + this.formItem.carGoodsNo 
				url:`./taojianmixi/taojianmixi?bcNo=${this.fromdata[index].bcNo}&ProdNo=`+this.fromdata[index].ProdNo
			})
		},
		//清除全部按钮
		resetFrom(){
			this.numbertext = 0;
			this.fromdata = [];
			this.boxOut.formItem.bi_OrderNo = '';
			let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
			let data = {
				UserID:user.erpUserCode,
				Flag:5,
			}
			this.boxOutGetBaseInfo(data).then(res=>{
				// console.log(res)
			})
			
		},
		//编辑弹框确认事件
		confirmFrom(e){
			// debugger
			let index = this.modalindex
			let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
			if(this.modalTitle=='删除'){
				let data = {
					UserID:user.erpUserCode,
					Flag:4,
					OrderNo:this.fromdata[index].bcNo,//订单号
					WorkNo:this.fromdata[index].WorkNo//工单号
				}
				this.boxOutGetBaseInfo(data).then(res=>{
					console.log(res)
					if(res){
						this.fromdata.splice(index,1)
						this.numbertext = this.fromdata.length
						this.modalName = null
					}else{
						this.modalName = null
						this.toast.message('删除失败')
					}
				})
			}else{
				this.toast.loading()
				let res = this.checkmodifyfromdataQty()
				// console.log(res)
				// debugger
				if(!res){
					this.toast.hide();
					this.toast.message('送货数不能大于库存数')
					return
				}
				this.fromdata[index].DelQty = this.deletefrom.DelQty
				request.post('/scan/updateBoxAppTemp',this.modifyfromdata).then(res=>{
					console.log(res)
					if(res > 0 ){
						this.toast.hide();
						this.toast.message('修改成功')
						this.getTemporaryData()
					}else{
						this.toast.hide();
						this.toast.message('修改失败')
					}
				}).catch(err=>{
					this.toast.hide();
					this.toast.message('网络请求超时')
				})
				this.modalName = null
			}
		},
		// 修改保存送货数校验
		checkmodifyfromdataQty(){
			// debugger
			for(let i=0; i<this.modifyfromdata.length; i++){
				let bssat_DelQty =Number(this.modifyfromdata[i].bssat_DelQty) //送货数
				let bssat_Qty =Number(this.modifyfromdata[i].bssat_Qty)  //库存数
				if(bssat_DelQty>bssat_Qty){
					return false
				}
			}
			return true
		},
		// 弹框
		hideModal(){
			this.modalName = null
		},
		//删除按钮
		deletebox(index){
			this.modalindex = index
			this.modalTitle = '删除'
			this.modalName = "DialogModal2";
			this.deletefrom = JSON.parse(JSON.stringify(this.fromdata[index]))
		},
		//修改按钮
		updatebox(index){
			this.modalindex = index
			this.modalTitle = '修改'
			this.modalName = "DialogModal2";
			this.deletefrom = JSON.parse(JSON.stringify(this.fromdata[index]))
			let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
			let data = {
				Flag: 2,
				UserID:user.erpUserCode,
				OrderNo:this.fromdata[index].bcNo,
				WorkNo:this.fromdata[index].WorkNo,
			}
			this.toast.loading()
			request.post('/warehouse/warehouse/execute/appBoxStoreStationAppTemp',data).then(res=>{
				// console.log(res)
				this.toast.hide();
				this.modifyfromdata = res.list
			}).catch( err=>{
				this.toast.hide();
				this.modalName = null
				this.toast.message('请求失败')
				this.getTemporaryData()
			})
		},
		
		//标签切换 事件
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		//跳转到数据选择页面
		turnToPageDataSelect(dataSouce, title) {
			this.currentSelected = title;
			this.cache.put('setDataSelectedPageTitle', title);
			this.cache.put('setDataSelectedList', dataSouce);
			uni.navigateTo({
				url: '/components/list-select/list-select'
			});
		},
		
		//成品===确认===入库
		boxInAspSaveBoxIn() {
			if (this.boxIn.formItem.bi_WorkNo == '') {
				this.toast.message('请输入或扫描工单号');
				return;
			}
			if (this.boxIn.formItem.bi_Group == '') {
				this.toast.message('请输入班别');
				return;
			}
			if (this.boxIn.formItem.bi_InQty == '') {
				this.toast.message('请输入数量');
				return;
			}
			let data = {
				bi_WorkNo: this.boxIn.formItem.bi_WorkNo,
				bi_Group: this.boxIn.formItem.bi_Group,
				bi_InQty: this.boxIn.formItem.bi_InQty
			};
			this.toast.loading();
			this.getWarehouseDataProvider('aspSaveBoxIn', data)
				.then(res => {
					if (res.list.length > 0) {
						if (res.list[0].ErrorStr && res.list[0].ErrorStr != '') {
							this.toast.hide();
							this.toast.message(res.list[0].ErrorStr);
							return;
						} else {
							this.toast.hide();
							this.toast.message('入库成功');
						}
						//重置数据
						this.boxIn.formItem = JSON.parse(JSON.stringify(this.boxIn.formItemInit));
						return;
					} else {
						this.toast.hide();
						this.toast.message('入库失败');
					}
				})
				.catch(err => {
					this.toast.hide();
					this.toast.message('入库失败' + err);
				});
		},
		//纸箱出入库--数据请求
		boxOutGetBaseInfo(params) {
			return request.post('/warehouse/warehouse/execute/appBoxDeliListAppTemp',params)
			
		},
		async turnOnScanCode(type) {
			if(this.checkScan()){
				this.toast.message('请在"e包装"公众号中下载APP后扫码!')
				return
			}
			let scandata = await this.ScanModule(); 
			this.fromdata = [];
			this.numbertext = 0	
			if(scandata.resp_code==1000){
				let a = scandata.resp_result.indexOf(',')
				let b = 0
				if(a<0){
					b = scandata.resp_result
				}else{
					b = scandata.resp_result.substring(0,a)
				}
				this.boxOut.formItem.bi_OrderNo = b;
				this.boxInGetOrderInfo()
			}else{
				this.toast.message('扫码失败请重试')
			}
		},
	}
};
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
.updete {
	width: 33%;
	display: flex;
	/* margin: 10px 10px; */
	justify-content:flex-end
}
.chucangbtm{
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 10;
}
.xunhoutop{
	position: fixed;
	width: 100%;
	z-index: 100;
}
</style>
