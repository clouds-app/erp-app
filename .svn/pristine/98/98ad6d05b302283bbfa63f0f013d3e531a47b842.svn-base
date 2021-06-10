<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" class="titlefrom">
			<block slot="content">问题确认</block>
		</cu-custom>
		<view v-if="isLogin">
			<view class="flex-sub">
				<selectDropdown :isShowToast='false' :disabled="disabled" @closeMain='closeMain' :defaultValue="master.custName" ref="department" url="wxCustomerBox" title="客户" placeholdertext="ㅤ请选择客户"
					v-model='master.custId'>
				</selectDropdown>
			</view>
			<view class="flex-sub border-top">
				<selectDropdown :isShowToast='false' :disabled="disabled" @closeMain='closeMain1' :defaultValue="master.custProName" ref="custProId" url="wxCustProBox" title="产品" placeholdertext="ㅤ请选择产品"
					v-model='master.custProId'>
				</selectDropdown>
			</view>
			<view class="flex-sub border-top">
				<selectDropdown :isShowToast='false' :disabled="disabled" @closeMain='closeMain2' :defaultValue="master.custProVcName" ref="custVcId" url="wxCustProVcBox" title="版本" placeholdertext="ㅤ请选择版本"
					v-model='master.custVcId'>
				</selectDropdown>
			</view>
			<view class="flex-sub border-top">
				<selectDropdown :isShowToast='false' :disabled="disabled" ref="mokuai" url="wxProItemBox" title="模块" placeholdertext="ㅤ请选择模块"
					v-model='master.proItemId'>
				</selectDropdown>
			</view>
			<view class="flex-sub border-top">
				<view class="cu-form-group">
					<view class="title">问题编号:</view>
					<input :disabled="true" v-model="master.probCode" />
				</view>
			</view>
			<view class="flex-sub border-top">
				<view class="cu-form-group">
					<view class="title">反馈信息:</view>
					<input :disabled="true" v-model="master.applContent" />
				</view>
			</view>
			<view class="flex-sub border-top">
				<view class="cu-form-group">
					<view class="title">问题内容:
						<view style="text-align: center;">(外部)</view>
					</view>
					<textarea v-model="master.probContentOut" :disabled="true" maxlength="500" class="textarea" type="text" />
				</view>
			</view>
			<view class="flex-sub border-top">
				<view class="cu-form-group">
					<view class="title">问题内容:
					</view>
					<textarea :disabled="disabled" v-model="master.probContent" maxlength="500" class="textarea" type="text" />
				</view>
			</view>
			<view class="flex solid-bottom padding justify-around chucangbtm">
				<button :disabled="disabled" style="background-color: #09BB07;" @click="byKey" type="primary" size="mini"
					class="bg-grey radius">{{disabled ? '审核中' : '提交审核'}}</button>
				<button :disabled="disabled" @click="saveOrUpdate" type="primary" size="mini" class="bg-grey radius">保存</button>
				<!-- <button @click="paprtIn" type="primary" size="mini" class="bg-grey radius">取消</button> -->
			</view>
		</view>
		<view v-else style="margin: 0 auto; padding-top: 20rpx;" class="contentBodyItem">
			<view>请前往系统用户绑定！</view>
		</view>
		<boboMessage ref="Message"></boboMessage>
	</view>
</template>

<script>
	import boboMessage from '@/components/bobo-message/bobo-message.vue';
	import cache from '@/utils/cache.js'
	import wxBase from '@/mixins/wxBase';
	import cuCustom from '@/ui/colorui/components/cu-custom.vue';
	import selectDropdown from './selectDropdown.vue'
	import {
		getQueryString,
		getUrlParams,
		GetRequest
	} from '@/utils/common.js';
	export default {
		components: {
			cuCustom,
			selectDropdown,
			boboMessage
		},
		mixins: [wxBase],
		data() {
			return {
				disabled:false,
				mokuai:'',
				custVcId:'', // 版本value
				custId:'', // 客户value
				iisExistsVc:0,
				isLogin: true, // 用户是否注册过
				master: {}, // 表单数据
				paperInFormItems: {
					
				}
			}
		},
		mounted() {
			// 登录验证
			this.loginCheck()
		},
		// 提交审批回调
		methods: {
			// 客户change事件
			closeMain(e){
				// this.$refs.custProId.formItem.customers = ''
				// this.master.custProId = ''
				
				this.iisExistsVc = e.iisExistsVc
				this.custId = e.type
				this.$refs.custProId.getdataArray({
					iisExistsPro:e.iisExistsPro,
					custId:e.type
				})
				// console.log(this.master);
			},
			closeMain1(e){
				this.master.preDesUser = e.preDesUser
				this.master.preCfmProUser = e.preDesUser
				this.$refs.custVcId.getdataArray({
					iisExistsVc:this.iisExistsVc,
					custProId:e.type,
					custId:this.custId
				})
			},
			closeMain2(e){
				this.$refs.mokuai.getdataArray({
					custVcId:e.type,
				})
			},
			// 登录验证
			loginCheck() {
				let _url = `${this.$config.wxBaseUrl}/wap/wechat/wechatUserCheck`
				let params = {
					wxOpenId: this.wxOpenId
				};
				let config = {
					'Content-Type': 'application/json'
				}
				let _self = this;
				this.getOrPostDataBy(_url, params, config ).then(res => {
					if(res.code === 200){
						// 缓存token
						cache.put('token',res.result)
						this.getData()
					}else{
						this.isLogin = false
					}
				}).catch(err => {
					
				})
			},
			// 根据用户id获取数据
			getData() {
				let id = getUrlParams('probId')
				let token = cache.get('token')
				let _url = `${this.$config.wxBaseUrl}/basic/defectProblem/detail`
				let params = {
					id: id,
					// token:token
				};
				let config = {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				}
				let _self = this;
				this.getOrPostDataBy(_url, params, config).then(res => {
					this.master = res.master
					this.chackData()
				}).catch(err => {
			
				})
			},
			// 检测当前拿到的数据是否可以审批
			chackData(){
				if(this.master.iisAppr === 0 || (this.master.iisAppr === 3 && this.master.iisAudit == false)){
					this.disabled = false
				}else{
					this.disabled = true
				}
			},
			// 获取下拉框的默认参数
			defaultData(){
				
			},
			// 保存效验
			checkout(){
				let flag = false
				if(this.master.custId === '' || this.master.custId === null){
					this.toast.message('请选择客户!')
					return true
				}
				if(this.master.custProId === '' || this.master.custProId === null){
					this.toast.message('请选择产品!')
					return true
				}
				if(this.master.custVcId === '' || this.master.custVcId === null){
					this.toast.message('请选择版本!')
					return true
				}
				if(this.master.probContent === '' || this.master.probContent === null){
					this.toast.message('请输入问题内容!')
					return true
				}
				return flag
			},
			// 保存回调
			saveOrUpdate(clearMessage){
				if (this.checkout()){
					return
				}
				console.log(this.master);
				let _url = `${this.$config.wxBaseUrl}/basic/defectProblem/saveOrUpdate`;
				let params = {
					iisCalUseTime:'0',
					master:this.master,
					items:{
						addList:[
						],
						defaultList:[
						],
						deleteList:[
						],
						updateList:[
						],
						
					}
				};
				let config = {
					'Content-Type': 'application/json'
				}
				let _self = this;
				this.getOrPostDataBy(_url,params,config).then(res=>{
					if(res.code == 200){
						if (clearMessage !== 200){
							this.$refs['Message'].success('保存成功!')
						}
						return false
					}else{
						this.$refs['Message'].error('保存失败!')
						return true
					}
				}).catch(err=>{
					
				})
			},
			// 提交审核回调
			byKey() {
				if(this.saveOrUpdate(200)){
					return
				}
				let _url = `${this.$config.wxBaseUrl}/bpmn/startPro/byKey`
				let params = {
					bKey: this.master.id,
					data: this.master,
					mainFormName: 'defectproblemFm',
					mode: 0,
					processKey: 'basic-defect',
					requstConfig: {"modulePreUrl":"/basic/defectProblem","mainFormName":"defectproblemFm","tab1FormName":"defectproblemitemFm","isStoredProcedure":false,"mainSPName":"","tab2FormName":"","tab3FormName":""}
				};
				let config = {
					'Content-Type': 'application/json'
				}
				let _self = this;
				this.getOrPostDataBy(_url, params, config).then(res => {
					if(res.code === 200){
						this.$refs['Message'].success('提交成功!')
						this.disabled = true
					}else{
						
					}
					console.log(res);
				}).catch(err => {
					this.$refs['Message'].error(err)
				})
			}
		}
	}
</script>

<style>
	.border-top {
		border-top: 1px solid #eee;
	}

	.textarea {
		height: 250rpx;
	}
</style>
