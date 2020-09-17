<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" class="titlefrom" :isBack="true"><block slot="content">备份设计</block></cu-custom>
		<form>
			<view class="flex bg-white padding-bottom-xs">
				<view class="flex-width-25   flex justify-center align-center"><view class="flex-title base-height justify-center align-center">问题大类</view></view>
				<view class="flex-sub padding-right-xs">
					<radio-group class="block" @change="RadioChange">
						<block v-for="(item, index) in FeedbackType">
							<radio class="radioComponent" :checked="formDataItem.typeCode == item.typecode ? true : false" :value="item.typecode"></radio>
							<text :class="item.typecode == 5 ? 'colorRed' : ''" class="radioQuesDesc">{{ item.typename }}</text>
						</block>
					</radio-group>
				</view>
			</view>
			<view class="flex bg-white padding-top-xs solid-top padding-bottom-xs">
				<view class="flex-width-25">
					<view class="flex-title base-height justify-center align-center">问题详情</view>
				</view>
				<view class="flex-sub">
					<view class="flex text-xs align-center justify-end base-height padding-right-xs">(回复时间: 工作日 8:00-20:00 非工作日 9:00-17:00)</view>
				</view>
			</view>
			<view class="flex bg-white">
				<view class="flex-sub padding-10">
					<textarea v-model="formDataItem.content" maxlength="300"  placeholder="请输入问题详情" style="width: auto; height: 230rpx;border: 1px solid #ccc;" ></textarea>
				</view>
			</view>
			<view class="flex bg-white">
				<view class="flex-width-25">
					<view class="flex-title base-height justify-center align-center">
						图片上传
					</view>
				</view>
				
			</view>
			<view class="flex bg-white imgUpload-cus">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="flex">
				<view class="flex-width-50 ">
					<view class="cu-form-group">
						<view class="flex-title">姓名</view>
						<input placeholder="输入姓名" name="input"></input>
					</view>
				</view>
				<view class="flex-width-50 ">
					<view class="cu-form-group">
						<view class="flex-title">手机</view>
						<input placeholder="输入手机" maxlength="11" v-model="formDataItem.phoneno" name="phoneno" type="number"/>
					</view>
				</view>
			</view>
			<view class="flex">
				<view class="flex-sub">
					<view class="cu-form-group">
						<view class="flex-title">单位</view>
						<input placeholder="输入单位" name="input"></input>
					</view>
				</view>
			</view>
			<view class="flex bg-white">
				<view class="flex-width-14 margin-left-sm">
					<view class="text-black flex-title base-height justify-center align-center">
						省市
					</view>
				</view>
				<view class="flex-sub flex ">
					<view class="flex-width-50 base-height">
						<view class="flex">
							<view class="flex-sub base-height flex align-center">
								<input class="" :disabled="true" @tap="handleTap('provinceName')" v-model="provinceName" placeholder="选择所属省" name="provinceName"/> 
							</view>
							<view class="flex-width-15 base-height ">
								<view class="flex-title base-height justify-center align-center">
									<text @tap="handleTap('provinceName')" :class="[!!!provinceName ? 'text-green' : 'text-gray']"  class='cuIcon-rounddown'></text>
								</view>
								
							</view>
						</view>
						
					</view>
					<view class="flex-width-50 base-height ">
						<view class="flex">
							<view class="flex-sub base-height flex align-center">
								<input :disabled="true" @tap="handleTap('areaName')" v-model="areaName" placeholder="选择所属市" name="areaName"/> 
							</view>
							<view class="flex-width-15 base-height ">
							 <view class="flex-title base-height justify-center align-center">
							 	<text @tap="handleTap('areaName')" :class="[!!!areaName ? 'text-green' : 'text-gray']"  class='cuIcon-rounddown'></text>
							 </view>	
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex">
				<view class="flex-sub padding-xl">
					
					<button :loading="isSubmitting" @click="playMusicDind()"  type="primary" class="primary-btn">提ㅤ交</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
const defaultFormItem = {
	openId: '',
	companyname: '',
	areaId: '',
	content: '',
	imgids: '',
	phoneno: '',
	typeCode: '1',
	uname: ''
};
export default {
	name: '',
	components: { cuCustom },
	data() {
		return {
			triggerFormList:false,// 是否列表触发的数据
			provinceName:'',
			areaName:'',
			//list: areaData,
			provincelist: [
			  {
			    label: '北京',
			    value: '11',
			    children: [
					{
					  label: '北京',
					  value: '1101'
					}
				]
			  }
			],
			areaList:[
				  {
				    label: '北京',
				    value: "1101"
				  }
			],
			verificationForm:{
				mobile:'',
				imgValCode:'',
				mobileValCode:''
			},
			timer: 60, // 定义初始时间为60s
			verification: true, // 通过v-show控制显示获取还是倒计时
			showColorUiDialog:false,
			isSubmitting:false,// 是否正在提交数据
			FeedbackType:[
					{
						"id": 1,
						"typecode": "1",
						"typename": "ERP",
						"usercode": 0
					},
					{
						"id": 2,
						"typecode": "2",
						"typename": "生管",
						"usercode": 0
					},
					{
						"id": 3,
						"typecode": "3",
						"typename": "设备/其它",
						"usercode": 0
					},
					{
						"id": 4,
						"typecode": "4",
						"typename": "业务",
						"usercode": 0
					},
					{
						"id": 5,
						"typecode": "5",
						"typename": "投诉",
						"usercode": 0
					}
				],// 问题大类 列表
			FeedbackList:[],
			formDataItem:Object.assign({},defaultFormItem),
			imgList:[],//存储图片数组
			index: -1,
			FeedbackHistoryInfo:{}
		};
	},
	methods: {
		playMusicDind(){
			const innerAudioContext = uni.createInnerAudioContext();
			debugger
			innerAudioContext.autoplay = true;
			innerAudioContext.src = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-cloud-test01/ab2ee7a0-f700-11ea-b997-9918a5dda011.mp3';
			//innerAudioContext.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';
			//innerAudioContext.src = '../../static/wxbb.mp3';
			innerAudioContext.onPlay(() => {
			  console.log('开始播放123');
			});
			innerAudioContext.onError((res) => {
				debugger
				 console.log('err11111');
			});
		}
	}
};
</script>

<style scoped lang="scss">
.imgUpload-cus{
	//border:1px solid red;
	height: 180rpx;
	overflow: hidden;
}
.uni-textarea-placeholder {
	font-size: 25rpx;
}
.uni-input-placeholder {
	font-size: 25rpx;
	//color: blue !important;
}
.radioComponent {
	margin-top: 10rpx;
	margin-right: 4rpx;
}
.radioQuesDesc {
	font-size: 25rpx;
	margin-right: 50rpx;
}
.radioDesc {
	font-size: 25rpx;
	margin-right: 50rpx;
}
</style>
