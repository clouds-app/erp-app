<template>
	<view>
		<cu-custom class="titlefrom" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">纸板扫码标签</block>
		</cu-custom>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown :defaultValue="loopPorLine" :otherHeight='CustomBarHeight' ref="porLine" url="appFindLineSeparation" title="线ㅤ别ㅤ"
					placeholdertext="ㅤ请选择线别" v-model='paperInFormItems.porLine' :params='{modelCode:"papersm_In"}'>
				</selectDropdown>
			</view>
			<view class="flex-sub">
				<selectDropdown :defaultValue="loopGroupCode" :otherHeight='CustomBarHeight' ref="groupCode" url="appFindClassBan" title="班ㅤ别"
					placeholdertext="ㅤ请选择班别" v-model='paperInFormItems.groupCode' :params='{modelCode:"papersm_In"}'>
				</selectDropdown>
			</view>
		</view>
		<view class="cu-form-group border-top">
			<view class="title">工单号ㅤ:</view>
			<input v-model="paperInFormItems.prodNo" @blur="barCodeBlur" placeholder="请扫描工单号" />
			<button @click="turnOnScanCode" type="primary" size="mini">扫描</button>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view style="color: red;" class="title">板ㅤ号ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.boardNo" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title" style="color: red;">本板数:</view>
					<input @blur="boardNumberEvent" type="number" v-model="paperInFormItems.boardNumber" placeholder="请输入数量" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">备ㅤ注ㅤ:</view>
					<input v-model="paperInFormItems.formRemark" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view style="font-size:18px; font-weight: 700;" class="title">纸板信息</view>
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">客ㅤ户ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.client" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">工单数ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.workNo" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view style="color:#3f48dd" class="title">剩余工单数:</view>
					<input :disabled="true" v-model="residueWorkNo" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">纸ㅤ质ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.paperCapacitor" />
				</view>
			</view>
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">楞别:</view>
					<input :disabled="true" v-model="paperInFormItems.lbCode" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">规ㅤ格ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.Mode" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">压ㅤ线ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.co_YxStr" />
				</view>
			</view>
		</view>
		<view class="flex border-top">
			<view class="flex-sub">
				<view class="cu-form-group">
					<view class="title">备ㅤ注ㅤ:</view>
					<input :disabled="true" v-model="paperInFormItems.remark" />
				</view>
			</view>
		</view>
		<view class="checked1">
		<view class="checked-btn">
			<label @click="FeedbackTypeChange">
				<checkbox :class="isSeve? 'checked':'' " /><text style="padding-left: 8rpx;">保存时打标签</text>
			</label>
		</view>
		<view @click="repairTag" class="checked-r">
			<span>补打标签</span>
		</view>
		</view>
		<view style="height: 140rpx;"></view>
		<view class="flex solid-bottom padding justify-around chucangbtm">
			<button @click="resetFrom" type="primary" size="mini" class="bg-grey radius">清除</button>
			<button @click="paprtIn" type="primary" size="mini" class="bg-grey radius">保存</button>
		</view>
		<!-- 详情弹出层 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				
				<view class="cu-bar bg-white justify-end">
					<view class="content">补打标签</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height:600rpx;overflow-y:scroll;" @scrolltolower="activityScroll">
				<view class="tagBox padding-10" v-for="(item,index) in tabList" :key="index" id="fff">
<!-- 					<view class="tag-t">
						<span>客户：{{item.ct_Name}}</span>
					</view>
					<view class="tag-c">
						<view style="padding-right: 60rpx;">工单号：{{item.ppo_GroupNO}}</view>
						<view>板号：{{item.bNumber}}</span></view>
						<button @click="repairLabel(item)" class="btntag">补打标签</button>
					</view>
					<view class="tag-b">
						<view style="text-align: left;">纸板信息：{{item.paperData}}</view>
						<view style="text-align: right; width: 215rpx" >本版数量：{{item.qty}}</view>
					</view> -->
					<view class="grid-title">
						<view>{{item.ct_Name}}</view>
						<!--  -->
						<view>
							<text>发送:{{item.sendNum}}</text>
						</view>
						<view>
							<text>打印:{{item.printNum}}</text>
						</view>
						<view @click="repairLabel(item,index)" class="tag-t bg-gray radius cu-tag">补打标签</view>
					</view>
					<view class="grid-body">
						<view class="grid-flex padding-10">
							<view>
								<text>工单号:{{item.ppo_GroupNO}}</text>
							</view>
							<view>
								<text>板号:{{item.bNumber}}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>纸板信息:{{item.paperData}}</text>
							</view>
							<view>
								<text>本版数量:{{item.qty}}</text>
							</view>
						</view>
					</view>
				</view>
				<text style="color: rgb(163,163,163); text-align: center;">---我是有底线的---</text>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	import request from '@/utils/request.js';
	import warehouse from '@/mixins';
	import cuCustom from '@/ui/colorui/components/cu-custom.vue'
	export default {
		components: {
			cuCustom,
			selectDropdown
		},
		mixins: [warehouse],
		data() {
			return {
				residueWorkNo:'', // 剩余工单数
				loopPorLine:'', // 线别回显
				loopGroupCode:'', // 班别回显
				modalName: "", // 弹框
				isSeve: true, // 是否保存时打标签
				tabList: [], // 补打标签数据
				Qty:'', // 存入板数
				paperInFormItems: {
					porLine: '', // 线别
					groupCode: '', // 班别
					boardNo: '', // 板号
					boardNumber: '', // 本板数
					formRemark: '', // 备注
					remark: '', // 备注
					client: '', // 客户
					workNo: '', // 工单数
					paperCapacitor: '', // 纸质
					lbCode: '', // 楞别
					prodNo: '', //工单号
					Mode:'', // 规格
					co_YxStr:'', // 压线
				},
				page: { //分页查询参数
					pageNumber: 1, //分页页码
					LoadorNot: true, //是否可以分页
				}
			}
		},
		mounted() {
			// 回显
			if(this.$store.state.paperScanLabel.porLine !== undefined){
				this.loopPorLine = this.$store.state.paperScanLabel.porLine
				this.paperInFormItems.porLine = this.$store.state.paperScanLabel.porLine.split("_")[0]
			}
			if(this.$store.state.paperScanLabel.groupCode != undefined){
				this.loopGroupCode = this.$store.state.paperScanLabel.groupCode
				this.paperInFormItems.groupCode = this.$store.state.paperScanLabel.groupCode.split("_")[0]
			}
		},
		methods: {
			// 本板数失焦处理数据是否合法
			boardNumberEvent(){
				let sum = this.Qty + +this.paperInFormItems.boardNumber
				if(this.paperInFormItems.workNo === '' ){
					this.toast.message('请先扫描工单号!')
					this.paperInFormItems.boardNumber = ''
					return
				}
				if(this.paperInFormItems.boardNumber === '' ){
					this.toast.message('请输入本板数!')
					return
				}
				if(+this.paperInFormItems.boardNumber === 0 ){
					this.toast.message('本板数不能为0!')
					this.paperInFormItems.boardNumber = ''
					return
				}
				if(this.paperInFormItems.workNo < sum){
					this.toast.message('本板数不能超过剩余订单数!')
					this.paperInFormItems.boardNumber = ''
					return
				}
			},
			activityScroll(){
				if (this.page.LoadorNot) {
					this.page.pageNumber++
					this.repairTag()
				}
			},
			repairLabel(item,index){
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let data = {
					UserID: user.erpUserCode,
					CreatePhone: user.phoneNo,
					WorkNo: item.ppo_GroupNO,
					BanNo: item.bNumber
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appReLabel', data).then(res=>{
					if(res.list[0].res == 1){
						// this.tabList = res.list
						this.toast.message('发送补打命令成功!');
						// this.tabList = []
						this.refreshPage()
					}else{
						this.toast.message('补打失败');
					}
					setTimeout(()=>{
						this.toast.hide();
					},1500)
				})
				.catch(err => {
					this.toast.message('补打失败');
					setTimeout(() => {
						this.toast.hide();
					}, 1000)
				});
			},
			// 清除数据
			delData(){
				this.paperInFormItems.prodNo = ''
				this.paperInFormItems.boardNo = ''
				this.paperInFormItems.workNo = ''
				this.paperInFormItems.boardNumber = ''
				this.paperInFormItems.formRemark = ''
				this.paperInFormItems.client = ''
				this.paperInFormItems.paperCapacitor = ''
				this.paperInFormItems.lbCode = ''
				this.paperInFormItems.Mode = ''
				this.paperInFormItems.co_YxStr = ''
				this.paperInFormItems.remark = ''
				this.residueWorkNo = ''
			},
			// 清除按钮
			resetFrom(){
				this.delData()
				this.isSeve = false
				this.$refs.porLine.formItem.customers = ''
				this.paperInFormItems.porLine = ''
				this.$refs.groupCode.formItem.customers = ''
				this.paperInFormItems.groupCode = ''
			},
			// 扫码失焦事件
			barCodeBlur() {
				this.getParamsFromScanCode()
			},
			//====工单====获取所需参数 从扫描中...
			getParamsFromScanCode() {
				// debugger
				let params = {
					WorkNo: this.paperInFormItems.prodNo,
					// UserID:this.userInfo.phoneNo,
				}
				let data = []
				this.toast.loading();
				// request.post('/proc/execute/spGetPaperCOInfoForAPP',{OrderNo:fOrderNo})
				request.post('/warehouse/warehouse/execute/appGetScanPaperNo', params)
					.then(res => {
						if (res.list.length === 0) {
							this.toast.hide();
							this.toast.message('无此工单号，请重新扫描!');
							this.delData()
							return;
						}
						this.paperInFormItems.prodNo = res.list[0].co_No//"工单号"
						this.paperInFormItems.client = res.list[0].ct_Name //客户
						this.paperInFormItems.workNo = res.list[0].co_Qty //"订单数"
						this.paperInFormItems.paperCapacitor = res.list[0].co_ArtId //"纸质"
						this.paperInFormItems.lbCode = res.list[0].co_ArtLB //"愣别"
						this.paperInFormItems.Mode = res.list[0].Mode //"规格"
						this.paperInFormItems.co_YxStr = res.list[0].co_YxStr// "压线"
						this.paperInFormItems.remark = res.list[0].co_Remark// "备注"
						this.paperInFormItems.boardNo = res.list[0].bNumber// "板号"
						this.residueWorkNo = res.list[0].co_Qty - res.list[0].Qty
						this.Qty = res.list[0].Qty// "存入板数"
						this.toast.hide();
					}).catch(err => {
						this.toast.hide()
						this.toast.message('执行失败')
					})

				Object.assign(this.paperInFormItems, data);
			},
			//打开扫描
			async turnOnScanCode(type) {
				if (this.checkScan()) {
					this.toast.message('请在"e包装"公众号中下载APP后扫码!')
					return
				}
				let scandata = await this.ScanModule();
				if (scandata.resp_code == 1000) {
					let a = scandata.resp_result.indexOf(',')
					let b = 0
					if (a < 0) {
						b = scandata.resp_result
					} else {
						b = scandata.resp_result.substring(0, a)
					}
					this.paperInFormItems.prodNo = b;
					this.getParamsFromScanCode();
				} else {
					this.toast.message('扫码失败请重试')
				}
			},
			// 点击单选框切换状态
			FeedbackTypeChange() {
				this.isSeve = !this.isSeve
			},
			// 关闭弹框事件
			hideModal() {
				this.modalName = ''
				// 还原分页条件,否则会查询重复数据
				this.tabList = []
				this.page.pageNumber = 1
				this.page.LoadorNot = true
			},
			// 打开补打标签查询数据
			repairTag(){
				this.modalName = 'DialogModal1'
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let data = {
					UserID: user.erpUserCode,
					pageSize: 6,
					pageNum: this.page.pageNumber
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appGetReLabel', data).then(res=>{
					if (res.list.length < 6) {
						this.page.pageNumber = 1
						this.page.LoadorNot = false
					}
					if(res.list.length !== 0){
						this.tabList = this.tabList.concat(res.list)
						this.toast.hide();
					}else{
						this.toast.message('暂无数据');
					}
					setTimeout(()=>{
						this.toast.hide();
					},1500)
				})
				.catch(err => {
					this.toast.message('查询失败');
					setTimeout(() => {
						this.toast.hide();
					}, 1000)
				});
			},
			// 发送补打命令成功，刷新页面
			refreshPage(){
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let data = {
					UserID: user.erpUserCode,
					pageSize: 1000,
					pageNum: 1
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appGetReLabel', data).then(res=>{
					if(res.list.length !== 0){
						// debugger
						this.tabList = res.list
						this.toast.hide();
						console.log(this.tabList);
					}else{
						this.toast.message('暂无数据');
					}
					setTimeout(()=>{
						this.toast.hide();
					},1500)
				})
				.catch(err => {
					this.toast.message('查询失败');
					setTimeout(() => {
						this.toast.hide();
					}, 1000)
				});
			},
			// 保存前效验
			ValidateOut(){
				let flag = false
				if(this.paperInFormItems.boardNumber === ''){
					this.toast.message('本板数不能为空')
					flag = true
				}
				if(this.paperInFormItems.prodNo === ''){
					this.toast.message('工单号不能为空')
					flag = true
				}
				if(this.paperInFormItems.boardNo === ''){
					this.toast.message('板号不能为空')
					flag = true
				}
				if(this.paperInFormItems.groupCode === ''){
					this.toast.message('班别不能为空')
					flag = true
				}
				if(this.paperInFormItems.porLine === ''){
					this.toast.message('线别不能为空')
					flag = true
				}
				return flag
			},
			//确认提交===辅料盘点===
			paprtIn() {
				if (!!this.ValidateOut()) {
					return
				}
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				console.log(user);
				let data = {
					UserID: user.erpUserCode,
					CreatePhone: user.phoneNo,
					WorkNo: this.paperInFormItems.prodNo,
					BanNo: this.paperInFormItems.boardNo,
					Line: this.paperInFormItems.porLine,
					Groups: this.paperInFormItems.groupCode,
					IsTab: `${this.isSeve}`,
					Qty: this.paperInFormItems.boardNumber,
					Remark: this.paperInFormItems.formRemark,
				};
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appPaperScanTab', data).then(res => {
						this.toast.hide();
						if (res.list && res.list[0].res == 1) {
							this.toast.message('保存成功');
							// 清除数据
							this.delData()
						} else {
							this.toast.message('保存失败');
						}
					})
					.catch(err => {
						this.toast.message('保存失败');
						setTimeout(() => {
							this.toast.hide();
						}, 1000)
					});
			},
			// 销毁页面保存相关信息
			onUnload(){
				this.$store.commit('setPaperScanLabel',{
					porLine: this.$refs.porLine.formItem.customers,
					groupCode: this.$refs.groupCode.formItem.customers,
				})
			}
		}
	}
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

	.chucangbtm {
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 2;
	}
	.checked1{
		display: flex;
		justify-content: space-between;
		padding-top: 20rpx;
		padding-left: 100rpx;
		padding-right: 100rpx;
	}
	.checked-btn{

	}
	.checked-r{
		padding-top: 5rpx;
		color: #007aff;
	}
	.tagBox{
		font-size: 26rpx;
		flex-direction: column;
		display: flex;
		align-content: space-between;
	}
	.tag-t{
		color: #FFFFFF;
		background-color: #007aff;
	}
	.tag-c{
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.tag-b{
		display: flex;
	}
	.btntag{
		font-size: 26rpx;
		color: #FFFFFF;
		background-color: #007aff;
	}

</style>
