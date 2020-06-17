<template>
	<view>
		<view  class="cu-form-group border-top">
			<view  class="title">类ㅤ型:</view>
			<input @click="showModal" disabled v-model="formItem.customers"  placeholder="请选择类型" name="input"></input>
			<!-- <text @click="showModal" class='cuIcon-rounddown text-green'></text> -->
		</view>
		<!-- 搜索框 -->
		<view :style="[{top:otherHeight + 'px' }]" class="cu-bar bg-white search" v-show="modalName=='DrawerModalL'" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchKeyword" type="text" placeholder="类型列表" confirm-type="search" @input="filterDataSource"></input>
			</view>
		</view>
		<!-- 抽屉 -->
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)' }]" style="overflow: scroll;" @tap="hideModal">
				<view class="cu-list menu text-left" style="padding-top: 43px;">
					<view class="cu-item arrow" v-for="(item,index) in modalArry" :key="index">
						<view class="content">
							<view @click="modalclicl(index)">{{item.ct_Desc}}</view>
						</view>
					</view>
				</view>
				<view  class="cu-item">
					<!-- 占位符 不可以删除 -->
					<view class="cu-bar bg-white "><strong></strong>
						<view class="search-form round">
						</view>
						<view class="action">
						</view>
					</view>
					<!-- 占位符 不可以删除 -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from '@/utils/request.js';
	const defaultformItem={
							customers:'',//产品
							productId:'',//产品id
						}
	export default {
		data() {
			return {
				productList:[],
				modalName:null,
				// otherHeight:0,//标题高度
				searchKeyword:'',//抽屉搜索关键词
				modalArry:[],//抽屉弹框数据
				formItem:Object.assign({},defaultformItem),
			};
		},
		props:{
			otherHeight: {
				type:Number,
				default:50
			}
			
		},
		mounted() {
			this.loadproductList();
			// this.getTableHeight()
		},
		
		onReady() {
			this.loadproductList();
			// this.getTableHeight()
		},
		methods: {
			// 加载列表
			loadproductList(){
				// debugger
				this.productList =[]
				let params ={
				}
				this.toast.loading();
				request.post(`/warehouse/warehouse/execute/appFindSPaperType`,params).then(res=>{
					let resData=res.list.map(item=>{
						let formatData = {
							type:item.value,
							ct_Desc:item.text
						}
						return formatData
					})
					this.productList = resData // 客户
				}).catch(err => {
					this.toast.meseage('数据加载失败');
				});
				this.toast.hide()
			},
			modalclicl(index){
				let e = this.modelVal
				this.formItem.customers=this.modalArry[index].ct_Desc
				this.formItem.productId=this.modalArry[index].type
				this.$emit('input',this.formItem.productId)
				this.modalName = null
			},
			hideModal(e) {
				this.modalName = null
			},
			//抽屉搜索事件
			filterDataSource(value){
				let data = {
					Name:value.detail.value
				}
				// console.log(value)
				request.post('/warehouse/warehouse/execute/appFindSPaperType',data).then(res=>{
					// console.log(res)
					let resData=res.list.map(item=>{
						let formatData = {
							type:item.value,
							ct_Desc:item.text
						}
						return formatData
					})
					this.modalArry = resData
				})
			},
			showModal(e) {
				this.modelVal = e
				this.searchKeyword = ''
				this.modalName = 'DrawerModalL'
				this.modalArry = this.productList
			},
			//计算设置表格高度
			setTableHeight(needOtherHeight=false){
					  if(!needOtherHeight){
						  this.otherHeight = 0
					  }
					try {
						//debugger
					    const res = uni.getSystemInfoSync();
					    // console.log('windowHeight:'+res.windowHeight);
					     // console.log('CustomBar:'+this.CustomBar);
					    // console.log('bodyContentHeight:'+this.otherHeight);
						this.leftContentHeight =res.windowHeight -this.CustomBar - this.otherHeight -10
						//console.log('tableHeight:'+this.leftContentHeight);
						return this.leftContentHeight
					} catch (e) {
					    // error
					}
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
			async getTableHeight(){
			  let _self=this
			  let tempHeight =  _self.setTableHeight()
			  console.log(tempHeight)
			  let otherHeight= await _self.getOtherContentHeight("titlefrom") 
			  console.log(otherHeight)
			  // let serchHeight= await _self.getOtherContentHeight("searchfrom")
			  // console.log(serchHeight)
			},
		}
	}
</script>

<style scoped>
.search{
	/* display: flex; */
	position: fixed;
	width: 60%;
	z-index: 2000000;
}
</style>
