<template>
	<view>
		<approval-detail ref="approvalDetailComp" :approvalId="initData.ID1" :spNo="initData.bc_No" modelName="boxSpecPrice" @approvalConfirm='approvalConfirm'>
			<view slot="page-title">
				纸箱特价审批详情
			</view>
			<view slot="content" slot-scope="{data}">
				<view class="grid-warp">
					<view class="grid-title">
						纸箱详情
					</view>
					<view class="grid-body">
						<view class="grid-flex padding-10">
							<view>
								<text>客户名称:{{ initData.bc_CustID_name }}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>单号:{{ initData.bc_No }}</text>
							</view>
							<view>
								<text>订单日期:{{ initData.bc_CoDate }}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>纸质:{{ initData.bp_CArtID }}</text>
							</view>
							<view>
								<text>愣别:{{ initData.bp_ArtLB }}</text>
							</view>
						</view>
						
						<view class="grid-flex padding-10">
							<view>
								<text>纸长:{{ initData.bp_CSizeL }}</text>
							</view>
							<view>
								<text>纸宽:{{ initData.bp_CSizeW }}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>数量:{{ initData.bi_OrderQty }}</text>
							</view>
							<view>
								<text>送货日期:{{ initData.bi_DeDate }}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view><text>&nbsp;</text></view>
							<view>
								<text></text>
								<text class="text-price">{{ initData.bisPrice }}</text>
							</view>
						</view>
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
					
					<examine-Modal :modalName='modalName' :formModel='paperSpecPricedata' @hideModal='hideModal' modelName="boxSpecPrice"></examine-Modal>
				</view>
			</view>
		</approval-detail>
	</view>
</template>

<script>
	import examineModal from '@/components/approval/examineModal.vue'
	import approvalDetail from '@/components/approval/approvalDetail.vue'
	import request from '@/utils/request.js';
	export default {
		components:{ approvalDetail,examineModal },
		data() {
			return {
				modalName:'',
				paperSpecPricedata:{},
				initData:{},
				Auditdeicon: 'fold',
				Auditdetailst:[],
				Auditdeta:[]
			}
		},
		methods: {
			approvalConfirm(type){
				this.paperSpecPricedata.state = type
				this.paperSpecPricedata.spNo = this.initData.bc_No
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
				// 过滤审核详情数据
				narrowdata() {
					if (this.Auditdetailst.length > 2) {
						this.Auditdeta = JSON.parse(JSON.stringify(this.Auditdetailst.slice(0, 2)));
					} else {
						this.Auditdeta = this.Auditdetailst;
					}
				},
				//获取审核详情
				getAuditdetails() {
					let data = {
						recordNo: this.initData.bc_No,
						modelCode:'approval_boxCOMain'
					};
					this.toast.loading();
					request
						.post('/warehouse/warehouse/execute/appAPPAuditLog', data).then(res => {
							this.toast.hide();
							this.Auditdetailst = res.list;
							this.narrowdata();
						}).catch(err => {
							this.toast.hide();
							this.toast.message('网络请求超时');
						});
				}
		},
		onLoad(option){
			this.initData = this.cache.get(option.id)
			this.getAuditdetails();
		}
	}
</script>

<style>
.text-price {
	color: #4aecdb;
	font-size: 50rpx;
}
</style>
