<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">原纸出仓核对</block></cu-custom>
		<view class="cu-form-group border-top">
			<view class="title">卷ㅤ号:</view>
			<input v-model="dataFrom.coil" @blur="getcheckdata(1)" placeholder="请输入或扫描卷号" name="input" />
			<button @click="turnOnScanCode('orderNo')" type="primary" size="mini">扫描</button>
		</view>
		
		<!-- 出仓信息 -->
		<view class="border-bottom" v-show="(fromdata.length>0)?true:false">
			<view class="grid-title">
				<view>出仓信息</view>
			</view>
				<view  class="grid-body" v-for="(item,index) in fromdata" :key='index'>
					<view class="flex border-top">
						<view class="flex-sub">
							<view class="cu-form-group">
								<view class="title">线ㅤ别：{{item.LineName}}</view>
							</view>
						</view>
						<view class="flex-sub">
							<view class="cu-form-group">
								<view class="title">班ㅤ别：{{item.ClassName}}</view>
							</view>
						</view>
					</view>
					<view class="flex border-top">
						<view class="flex-sub">
							<view class="cu-form-group">
								<view class="title">出仓日期：{{item.soi_Date}}</view>
							</view>
						</view>
					</view>
					<view class="flex border-top">
						<view class="flex-sub">
							<view class="cu-form-group">
								<text class="title">制造商：{{item.VendorName}}</text>
							</view>
						</view>
					</view>
					<view class="flex border-top">
						<view class="flex-sub">
							<view class="cu-form-group">
								<text class="title">类ㅤ型：{{item.SPaperName}}</text>
							</view>
						</view>
					</view>
					<view class="flex border-top">
						<view class="flex-sub">
							<view class="cu-form-group">
								<view class="title">门幅(纸度)：{{item.Width}}</view>
							</view>
						</view>
						<view class="flex-sub">
							<view class="cu-form-group">
								<text class="title">出仓重量：{{item.Owt}}</text>
							</view>
						</view>
					</view>
					<view class="flex border-top">
						<view class="flex-sub">
							<view class="cu-form-group">
								<text class="title">是否核对:</text>
								<input v-model="item.so_ScanAuit" disabled name="input" :style="{'color':(item.so_ScanAuit==='已核对'?'red':'')}"/>
							</view>
						</view>
					</view>
				</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="chucangbtm">
			<view class="flex solid-bottom padding justify-around elBtn" ref="elBtn">
				<view>	<button @click="cancelfrom"  type="primary" size="mini" class="bg-grey radius">清除</button></view>
				<view>	<button :disabled="submitdis" @click="Submitdata"  type="primary" size="mini" class="bg-grey radius">确认</button></view>
			</view>
		</view>
	</view>
</template>

<script>
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import baseMixin from '@/mixins';
export default {
	components:{cuCustom},
	mixins:[baseMixin],
	data() {
		return {
			submitdis:true,
			dataFrom:{
				coil:'',//卷号
			},
			fromdata:[]
		}
	},
	methods:{
		// 清除
		cancelfrom(){
			this.dataFrom.coil = ''
			this.fromdata = []
			this.submitdis = true
		},
		turnOnScanCode(type) {
			if(window !== undefined){
				this.toast.message('请在"e包装"公众号中下载APP后扫码!')
				return
			}
			this.scanType = type;
			this.cancelfrom()
			let _self = this;
			// 调起条码扫描
			uni.scanCode({
				scanType: 'barCode',
				success: function(res) {
					console.log('条码内容：' + res.result);
					_self.dataFrom.coil = res.result
					_self.getcheckdata(1)
				}
			});
		},
		checkvaluedata(){
			if(this.dataFrom.coil){
				return false
			}
			return true
		},
		// 确认按钮
		Submitdata(){
			let data = {
				Flag:2,
				UserID:this.userInfo.erpUserCode,
				ID1:this.fromdata[0].ID1
			}
			this.toast.loading()
			this.requstdata(data).then(res=>{
				if(res == 0){
					this.toast.hide()
					this.toast.message("入仓失败")
					this.submitdis = true
					this.cancelfrom()
					return
				}
				this.toast.hide()
				this.toast.message("入仓成功")
				this.submitdis = true
				this.cancelfrom()
			}).catch(err=>{
				this.toast.message(err)
			})
		},
		// 扫描卷号获取出仓信息
		getcheckdata(Flag){
			let data ={
				Flag:Flag,
				Coil:this.dataFrom.coil,
			} 
			this.toast.loading()
			this.requstdata(data).then(res=>{
				if(res.list.length == 0){
					this.toast.hide()
					this.toast.message('该卷号无数据')
					return
				}
				this.submitdis = res.list[0].so_ScanAuit
				if(res.list[0].so_ScanAuit){
					res.list[0].so_ScanAuit = '已核对'
				}else{
					res.list[0].so_ScanAuit = '未核对'
				}
				this.fromdata = res.list
				this.toast.hide()
			}).catch(err=>{
				this.toast.hide()
				this.toast.message(err)
			})
			
		},
		requstdata(data){
		 return	request.post('/warehouse/warehouse/execute/appSPaperOutCheck',data)
		}
	}
	
}
</script>

<style scoped>
	.chucangbtm{
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #FFFFFF;
	}
</style>
