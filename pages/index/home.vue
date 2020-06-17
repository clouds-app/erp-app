<template>
	<view>
	</view>
</template>

<script>
	import {emptyValidator} from '../../utils/validator.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		created() {
			let token = this.cache.get(this.appConst.CLIENT_TOKEN_NAME)
			let user = this.cache.get(this.appConst.CLIENT_USER_CACHE_NAME)
			// this.loginForm.customerCode = this.cache.get(this.appConst.CLIENT_CUSTOMER_CODE)
			// this.customerCodeCacheExists = !emptyValidator(this.loginForm.customerCode)
			if(!emptyValidator(token) && !emptyValidator(user)){
				this.router.reLaunch('/pages/index/index')
			}else{
				this.router.reLaunch('/pages/login/login2')
			}
		}
	}
</script>

<style>

</style>
