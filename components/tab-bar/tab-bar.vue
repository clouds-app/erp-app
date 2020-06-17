<template>
	<view>
		<view class='cu-bar tabbar bg-white'>
			<view class='action' v-for='(bar,index) in tabBar.list' :key='index' @tap='clickBar(bar.name)'>
				<view class='cuIcon-cu-image'>
					<image :src='clickName === bar.name ? bar.selectedIconPath : bar.iconPath'></image>
				</view>
				<view :style='{color:clickName === bar.name ? tabBar.selectedColor : tabBar.color}'>{{bar.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'TabBar',
		data() {
			return {
				clickName: 'index',
				tabBar:{
					color:'#000000',
					selectedColor:'#0081FF',
					backgroundColor:'#FFFFFF',
					position:'bottom',
					list:[{
						name:'index',
						pagePath:'pages/index/index',
						text:'首页',
						iconPath:'/static/index-unChecked.png',
						selectedIconPath:'/static/index-checked.png'
					},{
						name:'manager',
						pagePath:'pages/index/manager',
						text:'看板',
						iconPath:'/static/kanban.png',
						selectedIconPath:'/static/kanban-checked.png'
					},
					 {
						name:'function',
						pagePath:'pages/index/function',
						text:'功能',
						iconPath:'/static/function-unChecked.png',
						selectedIconPath:'/static/funtion-checked.png'
					},
					{
						name:'report',
						pagePath:'pages/index/report',
						text:'报表',
						iconPath:'/static/count-unChecked.png',
						selectedIconPath:'/static/count-checked.png'
					},
					{
						name:'uCenter',
						pagePath:'pages/uCenter/uCenter',
						text:'我的',
						iconPath:'/static/my-unChecked.png',
						selectedIconPath:'/static/my-checked.png'
					}]
				}
			};
		},
		props:{
			value:{
				type:String,
				default(){
					return 'index'
				}
			}
		},
		watch:{
			value(n,o){
				this.clickName = n
			},
			clickName(n,o){
				this.$emit('input',n)
			}
		},
		methods:{
			removeBar(index){
				this.tabBar.list.splice(index,1);
				this.$emit('input',this.tabBar.list[0].name)
			},
			clickBar(name){
				this.clickName = name;
			}
		},
		created() {
			this.clickName = this.value
		}
	}
</script>

<style>

</style>
