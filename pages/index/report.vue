<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
				<block slot="content">报表</block>
		</cu-custom>
		<erp-menu :menuList="appMenu.report"></erp-menu>
	</view>
</template>

<script>
import menuMixin from '../../mixins/menu.js';
import erpMenu from '../../components/menu/menu';
import cuCustom from '../../ui/colorui/components/cu-custom.vue' 
export default {
	components: { erpMenu, cuCustom },
	mixins: [menuMixin],
	data() {
		return {};
	},
	methods: {}
};
</script>

<style></style>
