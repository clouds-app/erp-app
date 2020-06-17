import request from '../utils/request.js'
import toast from '../utils/toast.js'
export default {
	data(){
		return {
			appMenu:{
				'function': [],
				'report': [],
				'index':[],
				'manager':[]
			},
			menuLoadingSuccess : false
		}
	},
	methods:{
		getMenuListProvider(){
			if(this.menuLoadingSuccess){
				return;
			}
			this.toast.loading()
			request.post('/user/resourceInfoV2').then(menu => {
				this.appMenu = menu
				this.menuLoadingSuccess = true
				this.$nextTick(() => {
					this.removeTabBar();
				})
				this.toast.hide()
			}).catch(err =>{
				this.toast.hide()
				if(typeof err === 'string'){
					toast.message(err)
				} else {
					toast.message('功能加载失败，请联系管理员')
				}
				this.$nextTick(() => {
					this.removeTabBar();
				})
			})
		},
		removeTabBar(){
			// 移除没有数据的tab 一定要倒叙删除
			let tabBar = this.$refs.tabBar
			if( !this.appMenu.report ||  this.appMenu.report.length == 0){
				tabBar.removeBar(3)
			}
			
			if( !this.appMenu['function'] ||  this.appMenu['function'].length == 0){
				tabBar.removeBar(2)
			}
			
			if( !this.appMenu.manager ||  this.appMenu.manager.length == 0){
				tabBar.removeBar(1)
			}
			
			if( !this.appMenu.index ||  this.appMenu.index.length == 0){
				tabBar.removeBar(0)
			}
		}
	},
	mounted(){
		  this.getMenuListProvider();
	},
	onLoad(){
		
	}
}