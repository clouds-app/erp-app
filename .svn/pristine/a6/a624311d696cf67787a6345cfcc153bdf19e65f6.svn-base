<template>
	<view>
		<approval-detail ref="approvalDetailComp" :spNo="initData.co_No" :approvalId="initData.ID1" modelName="paperSpecPrice" @approvalConfirm='approvalConfirm'>
			<view slot="page-title">
				辅料采购审批详情
			</view>
			<view slot="content" slot-scope="{data}">
				<view class="grid-warp">
					<view class="grid-title">
						{{initData.PoerName+'-'+initData.VendName}}
					</view>
					<view class="grid-body">
						<view class="grid-flex padding-10">
							<view>
								<text>单号:{{ initData.po_No }}</text>
							</view>
							<view>
								<text>日期:{{ initData.po_PODate }}</text>
							</view>
						</view>
						
						<view class="grid-flex padding-10">
							<view>
								<text>货币:{{initData.CoinName}}</text>
							</view>
							<view>
								<text>含税金额:{{initData.po_SumTax}}</text>
							</view>
						</view>
					</view>
					<!-- 辅料采购单详细 -->
					<view class="grid-warp,text-price">
						<view class="grid-title">
							采购详细
							<view @click="purchaseonClick"><text :class="'cuIcon-' + purchaseicon" style="font-size:17px"></text></view>
						</view>
						<block v-for="(item, index) in showPurchase" :key="index">
							<view class="grid-body">
								<view class="grid-flex padding-10">
									<view>
										<text>辅料名称:{{item.ProdName}}</text>
									</view>
									<view>
										<text>是否含税:{{!!item.poi_Tax?'是':'否'}}</text>
									</view>
								</view>
								<view class="grid-flex padding-10">
									<view>
										<text>规格:{{item.Model}}</text>
									</view>
									<view>
										<text>数量:{{item.poi_PoQty}}</text>
									</view>
								</view>
								<view class="grid-flex padding-10">
									<view>
										<text>单价:{{item.poi_TaxPrice}}</text>
									</view>
									<view>
										<text>金额:{{item.TaxAmt}}</text>
									</view>
								</view>
							</view>
							<view class="marginBottom10"></view>
						</block>
					</view>
					
					<!-- 审核详情 -->
					<view class="grid-warp,text-price" v-show="Auditdetailst.length > 0 ? true : false">
						<view class="grid-title">
							审批详情
							<view @click="Auditdeiconclick"><text :class="'cuIcon-' + Auditdeicon" style="font-size:17px"></text></view>
						</view>
						<block v-for="(item, index) in Auditdeta" :key="index">
							<view class="grid-body">
								<view class="grid-flex padding-10">
									<view>
										<text>审批:{{ item.app_AuditStateName }}</text>
									</view>
									<view>
										<text>审批人:{{ item.app_Auditor }}</text>
									</view>
								</view>
								<view class="grid-flex padding-10">
									<view>
										<text>审批时间:{{ item.app_AuditDate }}</text>
									</view>
								</view>
								<view class="grid-flex padding-10">
									<view>
										<text>审批意见:{{ item.app_AuditRemark }}</text>
									</view>
								</view>
							</view>
							<view class="marginBottom10"></view>
						</block>
					</view>
					
					<!-- 审批同意驳回界面 -->
					<examine-Modal 
						:modalName='modalName' 
						:formModel='paperSpecPricedata' 
						@hideModal='hideModal' 
						modelName="prodpo">
					</examine-Modal>

				</view>
			</view>
		</approval-detail>
	</view>
</template>

<script>
	import examineModal from '@/components/approval/examineModal.vue'
	import approvalDetail from '@/components/approval/approvalDetail.vue';
	import request from '@/utils/request.js';
	export default {
		components:{ approvalDetail,examineModal },
		data() {
			return {
				paperSpecPricedata:{},
				initData:{},
				Auditdeicon: 'fold',
				purchaseicon:'fold',
				Auditdetailst:[],
				Auditdeta:[],
				modalName:'',
				purchaseData:[],//采购详细数据
				showPurchase:[{'ProdName':12},{'ProdName':22}],//采购详情显示数据
			}
		},
		methods: {
			approvalConfirm(type){
				this.paperSpecPricedata.state = type
				this.paperSpecPricedata.spNo = this.initData.po_No
				this.paperSpecPricedata.approvalId = this.initData.ID1
				this.paperSpecPricedata.remark = ''
				this.modalName = 'DialogModal1'
			},
			hideModal(){
				this.modalName = null
			},
			//审核详情点击事件
			Auditdeiconclick() {
				if (this.Auditdeicon == 'unfold') {
					this.Auditdeta = JSON.parse(JSON.stringify(this.Auditdetailst.slice(0, 2)));
					this.Auditdeicon = 'fold';
				} else {
					this.Auditdeta = JSON.parse(JSON.stringify(this.Auditdetailst));
					this.Auditdeicon = 'unfold';
				}
			},
			//采购详情点击事件
			purchaseonClick(){
				if (this.purchaseicon == 'unfold') {
					this.showPurchase = JSON.parse(JSON.stringify(this.purchaseData.slice(0, 2)));
					this.purchaseicon = 'fold';
				} else {
					this.showPurchase = JSON.parse(JSON.stringify(this.purchaseData));
					this.purchaseicon = 'unfold';
				}
			},
			// 过滤审核详情数据
			narrowdata(data) {
				if(!!data){
					if (this.Auditdetailst.length > 2) {
						this.Auditdeta = JSON.parse(JSON.stringify(this.Auditdetailst.slice(0, 2)));
					} else {
						this.Auditdeta = this.Auditdetailst;
					}
				}else{
					if (this.purchaseData.length > 2) {
						this.showPurchase = JSON.parse(JSON.stringify(this.purchaseData.slice(0, 2)));
					} else {
						this.showPurchase = this.purchaseData;
					}
				}
			},
			//获取审核详情
			getAuditdetails() {
				let data = {
					recordNo: this.initData.po_No,
					modelCode:'approval_prodPO'
				};
				this.toast.loading();
				request
					.post('/warehouse/warehouse/execute/appAPPAuditLog', data).then(res => {
						this.toast.hide();
						this.Auditdetailst = res.list;
						this.narrowdata(1);
					}).catch(err => {
						this.toast.message('网络请求超时');
					});
			},
			//获取采购详情数据
			getpurchaseData(){
				this.toast.loading();
				request.post('/approval/prodpo/approvalSubDetail',{approvalId:this.initData.ID1}).then(res=>{
					this.purchaseData = res
					this.narrowdata(0);
					this.toast.hide();
				}).catch(err=>{
					this.toast.message('网络请求超时请重试');
				})
			}
		},
		onLoad(option){
			this.initData = this.cache.get(option.id)
			this.getAuditdetails();
			this.getpurchaseData()
		}
	}
</script>

<style>
.text-price {
	color: #4aecdb;
	font-size: 50rpx;
}
</style>
