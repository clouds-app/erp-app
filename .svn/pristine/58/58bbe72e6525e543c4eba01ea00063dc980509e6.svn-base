<template>
	<view>
		<block v-for="(menu,index) in menuList" :key="index">
			<menu-card :menu="menu"></menu-card>
		</block>
	</view>
</template>

<script>
	import menuCard from './menu-card.vue'
	export default {
		name:'erp-menu',
		components:{ menuCard },
		data() {
			return {
				
			}
		},
		props:{
			menuList:{
				default:[]
			}
		}
	}
</script>

<style>

</style>
