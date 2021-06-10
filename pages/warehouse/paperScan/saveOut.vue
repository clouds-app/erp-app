<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :hideleftArrow="true">
			<block slot="content">保存出仓</block>
			<template slot="backText">
				<view @click="backPage" class="cuIcon-back"></view>
			</template>
		</cu-custom>
		<view class="flex-sub">
			<selectDropdown :defaultValue="defaultValue.licensePlate" :otherHeight='CustomBarHeight' ref="licensePlate" url="appFindCar" title="车ㅤ牌ㅤ"
				placeholdertext="ㅤ请选择车牌" v-model='paperInFormItems.licensePlate' :params='{modelCode:"paper_out"}'>
			</selectDropdown>
		</view>
		<view class="flex-sub">
			<selectDropdown :defaultValue="defaultValue.driver" :otherHeight='CustomBarHeight' ref="driver" url="appFindUser" title="司ㅤ机ㅤ"
				placeholdertext="ㅤ请选择司机" v-model='paperInFormItems.driver' :params='{modelCode:"paper_out",fieldDesc:"司机",workType:"4,18"}'>
			</selectDropdown>
		</view>
		<view class="flex-sub">
			<selectDropdown :defaultValue="defaultValue.load" :multipleChoice="true"  :otherHeight='CustomBarHeight' ref="load" url="appFindUser" title="装ㅤ车ㅤ"
				placeholdertext="ㅤ请选择部装车" v-model='paperInFormItems.load' :params='{modelCode:"paper_out",fieldDesc:"装车员",workType:"6,18"}'>
			</selectDropdown>
		</view>
		<view class="flex-sub">
			<view class="cu-form-group">
				<view class="title">发ㅤ货:</view>
				<input :disabled="true" v-model="paperInFormItems.delivery" />
			</view>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">自提</view>
			<switch @change="isSelfTakeChange" :class="isSelfTake?'checked':''" :checked="isSelfTake?true:false"></switch>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">送货日期</view>
			<picker mode="date" :value="deliverDate"  @change="DateChange">
				<view class="picker">
					{{deliverDate}}
				</view>
			</picker>
		</view>
		<view :style="[{height:tableHeight + 'px' }]">
			
		</view>
		<!-- 操作 按钮 -->
		<view ref="elBtn"  class="elBtn margin-text-center">
				  <view class="text-red">
					 
					 <text>
						 保存出仓自动生成送货单，
						 不能再进行修改，
						 如需修改明细请于ERP送货单中进行修改
						 <p style="margin-top: 20rpx;"></p>
					 </text>
					 
				  </view>
				   <view  class="flex  p-xs ">
					
				   <view  class="flex-twice  radius">
					<!-- <button :loading="false" :disabled="false" @click="preChangeCardNo()" class="cu-btn block round line-blue  lg" > 取消返回</button> -->
				</view> 
					<view  class="flex-sub radius">
						</view>
							<view  class="flex-twice  radius"> 
							<button @tap="aspCarListAppAppend()" :loading="false" type="" class="cu-btn block bg-green  lg" > 保存出仓</button>
						</view>
				</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '@/ui/colorui/components/cu-custom.vue'
	import vTable from "@/components/table.vue"
	import baseMixin from '@/mixins';
	import dayjs from 'dayjs';
	import request from '@/utils/request.js';
	import selectDropdown from '@/components/selectDropdown/selectDropdown.vue'
	export default {
		components: {
			cuCustom,
			vTable,
			selectDropdown
		},
		mixins: [baseMixin],
		data() {
			return {
				loadNo:'', // 装车单号
				tableHeight:350,//表格高度
				deliverDate: dayjs(Date.now()).format('YYYY-MM-DD'),// 送货日期
				isSelfTake:false, // 是否自提
				paperInFormItems: {
					licensePlate: '', // 车牌
					driver: '', // 司机
					load: '', // 装车
					delivery: this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME).erpUserName // 发货
				},
				defaultValue: {
					licensePlate: '', // 车牌
					driver: '', // 司机
					load: '', // 装车
					delivery: '' // 发货
				}
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				this.loadNo = option.zcdh
		    },
		mounted() {
			let groupCode = this.$store.state.loadingOut_hr
			if(groupCode.licensePlate !== undefined){
				this.defaultValue.licensePlate = groupCode.licensePlate
				this.paperInFormItems.licensePlate = groupCode.licensePlate.split("_")[0]
			}
			if(groupCode.driver !== undefined){
				this.defaultValue.driver = groupCode.driver
				this.paperInFormItems.driver = groupCode.driver.split("_")[0]
			}
			if(groupCode.load !== undefined){
				this.defaultValue.load = groupCode.load
				this.paperInFormItems.load = groupCode.load.split("_")[0]
			}
			if(groupCode.delivery !== undefined){
				this.defaultValue.delivery = groupCode.delivery
				this.paperInFormItems.delivery = groupCode.delivery.split("_")[0]
			}
		},
		methods: {
			backPage() {
				// debugger
				uni.navigateBack({
					delta:1
				});
			},
			// 自提按钮
			isSelfTakeChange(item){
				this.isSelfTake= item.detail.value
				console.log(this.isSelfTake);
			},
			// 送货日期变更
			DateChange(e) {
				this.deliverDate = e.detail.value
			},
			// 保存出仓
			aspCarListAppAppend(){
				this.paperInFormItems.load = this.$refs.load.$data.formItem.customers
				console.log(this.paperInFormItems);
				let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
				let params = {
					UserID:user.erpUserCode,
					CarListNo:this.loadNo,
					CarNo:this.paperInFormItems.licensePlate,//车牌
					Chauffeur:this.paperInFormItems.driver,//司机
					Loador:this.paperInFormItems.load,//装车员
					SenderID:this.paperInFormItems.delivery,//发货
					IsZT:this.isSelfTake,//自提
					ADate:this.deliverDate//日期
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appSaveCarListToDeli',params).then(res=>{
					console.log(res);
					if(res.list[0].Error === 0){
						this.isSelfTake = false
					}
					this.toast.message(res.list[0].Result)
				})
			},
			onUnload() {
				this.$store.commit('setLoadingOut_hr', {
					licensePlate: this.$refs.licensePlate.formItem.customers,
					driver: this.$refs.driver.formItem.customers,
					load: this.$refs.load.formItem.customers,
					delivery: this.paperInFormItems.delivery,
					isSelfTake: this.isSelfTake
				})
			}
		}
	}
</script>

<style scoped>
	.margin-text-center{
			text-align: center;
			margin: 20rpx;
		}
		.border-top{
			  border-top: 1px solid #eee;
		}
	.cu-form-group .title {
			min-width: calc(4em + 15px);
		}
</style>
