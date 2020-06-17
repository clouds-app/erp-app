import request from '@/utils/request.js'
export default {
	data(){
		return {
			
		}
	},
	methods:{
		getWarehouseDataProvider(procName,params){
			return new Promise((resolve, reject) => {
				this.toast.loading()
				request.post(`/warehouse/warehouse/execute/${procName}`, params).then(res => {
					this.toast.hide()
					resolve(res)
				}).catch(err => {
					this.toast.hide()
					this.toast.message('执行失败' + err)
					reject(err)
				})
			})
		}
	}
}