<template>
	<view>
		<scroll-view >
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<!-- <block slot="backText">返回</block> -->
				<block slot="content">{{title}}选择</block>
			</cu-custom>
		
		<!-- 	<checkbox-group class="block" @change="CheckboxChange">
				<block v-for="(item,index) in 30" :key="index">
						<view class="cu-form-group ">
							<view class="title">复选选操作</view>
							<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
							
						</view>
				</block>
			</checkbox-group> -->
			
			<!-- margin-top card-menu-->
			<view class="cu-list menu sm-border ">
				<block v-for="(item,index) in crrentSourceList" :key="index">
					<view @click="getSelectData(item)" class="cu-item arrow">
						<view class="content">
							<text class="cuIcon-circlefill text-grey"></text>
							<text  v-text="`${title}: ${item.text}`" class="text-grey"></text>
						</view>
					</view>
				</block>
				
		   </view>

		</scroll-view>
	</view>
</template>

<script>
	import cuCustom from '@/ui/colorui/components/cu-custom.vue';
	export default {
		name:'list-select',
		components:{cuCustom},
		data() {
			return {
				title:'列表',
				crrentSourceList:[],
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
			}
				
		},
		// #ifdef H5
		mounted () {
			this.dataSource()
		},
		  
		// #endif
		// #ifndef H5
		onReady () {
			this.dataSource()
		},
		// #endif
		computed:{
			
		},
		methods: {
			dataSource(){
				this.title = this.cache.get('setDataSelectedPageTitle')
				this.crrentSourceList=this.cache.get('setDataSelectedList')
				//console.log('crrentSourceList:'+JSON.stringify(this.crrentSourceList))
			},
			//获取选择的数据,
			getSelectData(item){
				//接收uni.$on('getSelectData',function(data){})
				 uni.$emit('getSelectData',{msg:item})
				 uni.navigateBack({
				 	delta: 1
				 });
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
		}
	}
</script>

<style>
	
</style>
