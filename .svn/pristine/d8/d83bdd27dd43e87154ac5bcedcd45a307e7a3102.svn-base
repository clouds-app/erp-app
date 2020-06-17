<template>
	<view>
		<view class="cu-form-group border-bottom">
			<view class="title">客 户:</view>
			<input v-model="model.customerName" placeholder="请选择客户" disabled @tap="openDrawer" />
		</view>
		<uni-drawer ref="customerDrawer" mode="right">
			<view :style="{ 'padding-top': CustomBar + StatusBar + 'px' }">
				<view class="uni-title">
					<uni-search-bar :radius="100" placeholder="客户列表" cancelButton="none" @input="customerValueChange"></uni-search-bar>
				</view>
				<uni-list :style="{ height: screen.height - (CustomBar + StatusBar + 44) + 'px','overflow-y':'scroll'}">
					<uni-list-item v-for="(item, index) in customerFilterList" @tap="customerClick(item.ct_ID , item.ct_Desc)" :title="item.ct_ID + '-' + item.ct_Desc" :show-arrow="false" :key="index"></uni-list-item>
				</uni-list>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
import request from '@/utils/request.js';
export default {
	name: 'customerSelect',
	components: { uniDrawer, uniList, uniListItem, uniSearchBar },
	data() {
		return {
			drawerVisible: false,
			model: {
				customerName: ''
			},
			customerList: [],
			customerFilterList: []
		};
	},
	props:{
		value:{
			type:String,
			default: ''
		}
	},
	methods: {
		openDrawer() {
			this.getcustomerListProvider();
			this.$refs.customerDrawer.open();
		},
		getcustomerListProvider() {
			if (this.customerList.length > 0) {
				return;
			}
			this.toast.loading();
			request
				.post('/user/customerList', {})
				.then(res => {
					this.toast.hide()
					this.customerList = res
					this.customerFilterList = res
				})
				.catch(err => {
					this.toast.hide();
				});
		},
		customerValueChange(value){
			if(value.value === ''){
				this.customerFilterList = this.customerList
				return
			}
			this.customerFilterList = this.customerList.filter(item=>{
				return item.ct_ID.toLowerCase().indexOf(value.value.toLowerCase()) != -1 || item.ct_Desc.indexOf(value.value) != -1
			})
		},
		customerClick(code,name){
			this.model.customerName = name
			this.$emit('input',code)
			this.$refs.customerDrawer.close()
			this.customerFilterList = this.customerList
		}
	}
};
</script>

<style>
.uni-title {
	background-color: #f1f1f1;
}
</style>
