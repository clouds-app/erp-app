<template>
	<view>
		<!-- 原纸审批详情 -->
		<approval-detail :spNo="initData.sp_No" ref="approvalDetailComp" :approvalId="initData.ID1" modelName="spaperpo" @approvalConfirm='approvalConfirm'> 
			<view slot="page-title">原纸审批详情</view>
			<view slot="content" slot-scope="{ data }">
				<view class="grid-warp">
					<view class="grid-title">{{ initData.poerName }}-{{ initData.vendName }}</view>
					<view class="grid-body">
						<view class="grid-flex padding-10">
							<view>
								<text>单号:{{ initData.sp_No }}</text>
							</view>
							<view>
								<text>日期:{{ initData.sp_PODate }}</text>
							</view>
						</view>
						<view class="grid-flex padding-10">
							<view>
								<text>税率:{{ initData.sp_Rate }}%</text>
							</view>
							<view>
								<text>币别:{{ initData.sp_Coin }}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 采购单详情 -->
				<view class="grid-warp">
					<view class="grid-title">
						采购单详情
						<view @click="shrinkdate"><text :class="'cuIcon-' + icon" style="font-size:17px"></text></view>
						<!-- <uni-icons type="fold"></uni-icons> -->
					</view>
					<block v-for="(item, index) in data" :key="index">
						<view class="grid-body">
							<view class="grid-flex padding-10">
								<view>
									<text>品名:{{ item.kindName }}</text>
								</view>
								<view>
									<text>纸宽:{{ item.si_Width }}</text>
								</view>
							</view>
							<view class="grid-flex padding-10">
								<view>
									<text>克重:{{ item.si_Gram }}</text>
								</view>
								<view>
									<text>级别:{{ item.gradeName }}</text>
								</view>
							</view>
							<view class="grid-flex padding-10">
								<view>
									<text>卷数:{{ item.si_Coil }}</text>
								</view>
								<view>
									<text>价格(含税):￥{{ item.si_TaxPrice }}</text>
								</view>
							</view>
						</view>
						<!-- <view class="marginBottom10"></view> -->
					</block>
				</view>

				<!--  v-if="(Auditdetailst.length>0)?true:false"  审核详情-->
				<view class="grid-warp" v-show="Auditdetailst.length > 0 ? true : false">
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
				
				<examine-Modal :modalName='modalName' :formModel='formModel' @hideModal='hideModal' modelName="spaperpo"></examine-Modal>
				
			</view>
		</approval-detail>
	</view>
</template>

<script>
import examineModal from '@/components/approval/examineModal.vue'
import approvalDetail from '@/components/approval/approvalDetail.vue';
import request from '@/utils/request.js';
export default {
	components: { approvalDetail,examineModal },
	data() {
		return {
			index: -1,
			type:'',
			modalName:'',
			disabled:true,
			formModel:{
				state: '0',
				approvalId: '',
				remark:'',
				spNo:''
			},
			initData: {},
			icon: 'fold',
			Auditdeicon: 'fold',
			shrink: '', //判断是否隐藏
			Auditdetailst: [], //审核详情数据
			Auditdeta: [],
		};
	},
	methods: {
		approvalConfirm(type){
			this.formModel.state = type
			this.formModel.spNo =this.initData.sp_No
			this.formModel.approvalId =this.initData.ID1
			this.formModel.remark = ''
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
				recordNo: this.initData.sp_No
			};
			this.toast.loading();
			request
				.post('/warehouse/warehouse/execute/appAPPAuditLog', data)
				.then(res => {
					this.toast.hide();
					this.Auditdetailst = res.list;
					this.narrowdata();
				})
				.catch(err => {
					this.toast.hide();
					this.toast.message('网络请求超时');
				});
		},
		//图标点击事件
		shrinkdate() {
			if (this.icon == 'unfold') {
				this.shrink = true;
				this.$refs.approvalDetailComp.shrinkdate(this.shrink);
				this.icon = 'fold';
			} else {
				this.shrink = false;
				this.$refs.approvalDetailComp.shrinkdate(this.shrink);
				this.icon = 'unfold';
			}
		}
	},
	onLoad(option) {
		this.initData = this.cache.get(option.id);
	},
	mounted() {
		this.$refs.approvalDetailComp.getDetailDataProvider('/approval/spaperpo/approvalSubDetail', { approvalId: this.initData.ID1 });
		this.getAuditdetails();
	}
};
</script>

<style>
	.form-container{
		padding: 40rpx;
	}
</style>
