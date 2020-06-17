<template>
	<view>
		<cu-custom @BackPageEvent="backPageEvent" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				<slot name="page-title"></slot>
			</block>
		</cu-custom>
		<view>
			<block v-for="(item, index) in approvalList" :key="index">
				<view>
					<slot name="content" :index="index" :data="item"></slot>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
export default {
	components: { cuCustom },
	name: 'approval',
	data() {
		return {
			page: {
				pageNumber: 1,
				totalPage: 1,
				pageOver: false
			},
			approvalList: [],
			pageLoading: 'more',
			firstLoading:true
		};
	},
	props: {
		listLoadUrl: String
	},
	methods: {
		backPageEvent() {
			//this.router.back(uni.getCurrentPages() - 1)
			this.$emit('pageBack')
		},
		//请求待审批数据列表
		approvalListProvider() {
			if (this.page.pageOver) {
				return;
			}
			this.toast.loading()
			request.post(this.listLoadUrl, this.page).then(res => {
				this.approvalList = [...this.approvalList, ...res.records];
				this.page.pageOver = !(this.page.pageNumber < res.pages);
				if (!this.page.pageOver) {
					this.page.pageNumber = res.current + 1;
				}
				this.page.pages = res.pages;
				this.toast.hide()
				
			});
		},
		deleteApproval(index){
			this.approvalList.splice(index,1)
		}
	},
	created() {
		this.approvalListProvider();
	}
};
</script>

<style></style>
