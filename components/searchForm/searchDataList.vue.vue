<template>
	<view @tap="isShowSearchList=false" class="cu-modal drawer-modal justify-start" :class="isShowSearchList ?'show':''">
		
		<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:DIYCustomBar+'px',height:'calc(100vh - ' + DIYCustomBar + 'px)'}]">
			
				<view :style="[{overflow:'scroll',  height:'calc(100vh - ' + DIYCustomBar + 'px)'}]" class="cu-list menu text-left">
					    <view  class="cu-item">
					    	<!-- 搜索框 -->
					    	<view v-if="!hideSearch" class="cu-bar bg-white search ">
					    		<view class="search-form round">
					    			<text class="cuIcon-search"></text>
					    			<input v-model="searchKeyword" type="text" placeholder="关键词" confirm-type="search"></input>
					    		</view>
					    		<view class="action">
					    			<button @click="filterDataSource()" class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
					    		</view>
					    	</view>
					    	<!-- 描述 -->
							<view v-show="descSearchText!=''" class="cu-bar bg-white search ">
								<view class="cl-tableDesc">	{{descSearchText}}</view>
							
							</view>
					    </view>
						<view @click="getSelectDataInfo(item)" :class="!isMultipel?'arrow':''"  class="cu-item" v-for="(item,index) in dataSourceList" :key="index">
							
							<view  style="overflow: scroll;" class="content">
								<block v-if="isMultipel">
									<checkbox-group class="block" @change="CheckboxChange">
													<view class="cu-form-group">
														<view class="title">{{item.ct_Desc}}</view>
														<checkbox :class="checkIsSelected(item)?'checked':''" :checked="checkIsSelected(item)" :value="item.type"></checkbox>
													</view>
									
												</checkbox-group>
								</block>
								<block v-else>
									<view v-text="item.ct_Desc"></view>
								</block>
							</view>
						</view>
						<!-- <view  class="cu-item"> -->
							<!-- 占位符 不可以删除 -->
							<!-- <view class="cu-bar bg-white search "> -->
								<text style="color: rgb(163,163,163); display: flex; justify-content:center">---我是有底线的---</text>
							<!-- </view> -->
							<!-- 占位符 不可以删除 -->
						<!-- </view> -->
						<view  class="cu-item">
							<!-- 占位符 不可以删除 -->
							<view class="cu-bar bg-white search ">
								<view class="search-form round">
								</view>
								<view class="action">
								</view>
							</view>
							<!-- 占位符 不可以删除 -->
						</view>
				</view>
		
		</view>
		
	
	<view @click="submitMultiple()" v-if="isMultipel" class="cu-bar foot input" :style="[{width:100+'px',bottom:InputBottom+'px'}]">
		<view class="action">
			<!-- <text class="cuIcon-sound text-grey"></text> -->
		</view>
		<view class="action">
			<!-- <text class=" text-grey"></text> -->
		</view>
		<button @click="submitMultiple()" class="cu-btn bg-green shadow">确定</button>
	</view>
	</view>
</template>
<!-- :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" -->
<script>
	export default {
			name:'searchDataList',
			props:{
				// 初始数据源
				dataSource:{
					type:Array,
					default(){
						return []
					}
				},
				// 是否隐藏搜索框
				hideSearch:{
					type:Boolean,
					default:false,
				},
				descSearchText:{
					type:String,
					default:''
				}
			},
			data(){
				return {
					seletedItemList:[],//多选项的值
					InputBottom: 0,
					DIYCustomBar:45,
					isMultipel:false,// 是否多选
					searchKeyword:'',// 关键字
					isShowSearchList:false, //是否显示
					dataSourceList:[],//dataSourceList
					dataSourceListBackup:[],// 数据备份
				}
			},
			computed:{
				// seletedItemListCheck(){
				// 	return this.seletedItemList.
				// }
			},
			mounted(){
				 this.DIYCustomBar =this.CustomBar
				//console.log('======CustomBar==========:'+this.CustomBar)
			},
			methods:{
				// 数据初始化
				init(){
					this.dataSourceListBackup = [...this.dataSource]
				},
				// 校验是否已经选中了
				checkIsSelected(val){
					let isExistIndex = this.seletedItemList.findIndex((item)=>item.type == val.type);
					if(isExistIndex !=-1){
						
						return true
					}else{
						return false
					}
				},
				//过滤数据
				filterDataSource(){
					//debugger
					this.init()
					if(this.searchKeyword.length>0){
						this.dataSourceList = this.dataSourceList.filter(item=>{
							return item.ct_Desc.includes(this.searchKeyword)
						})
					}else{
						this.dataSourceList = this.dataSourceListBackup
					}
				},
				// 多选 触发事件
				CheckboxChange(e) {
					// var items = this.checkbox,
					let values = e.detail.value;
					// for (var i = 0, lenI = items.length; i < lenI; ++i) {
					// 	items[i].checked = false;
					// 	for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
					// 		if (items[i].value == values[j]) {
					// 			items[i].checked = true;
					// 			break
					// 		}
					// 	}
					// }
				},
				// 确认提交多选
				submitMultiple(){
					//debugger
					this.isShowSearchList =false
					let tempList =this.seletedItemList
					if(tempList.length>0){
						this.$emit('getSelectDataInfo',tempList)
					}
				},
				//获取选择的信息
				getSelectDataInfo(val){
					// debugger
					if(!this.isMultipel){
						this.isShowSearchList =false
						this.$emit('getSelectDataInfo',val)
					}else{
						let isExistIndex = this.seletedItemList.findIndex((item)=>item.type == val.type)
						if(isExistIndex !=-1){
							this.seletedItemList.splice(isExistIndex,1)
						}else{
							this.seletedItemList.push(val)
						}
						
						// console.log('==this.seletedItemList==:'+JSON.stringify(this.seletedItemList))
						// console.log('==getSelectDataInfo==:'+JSON.stringify(val))
					}
				
				},
			}
			
	}
</script>

<style>
</style>
