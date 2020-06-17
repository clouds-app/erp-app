import config from '@/config'
const baseUrl = config.isRunApp ? config.baseUrl.pro : config.baseUrl.dev
let currentToken=''
import Request from './request/request'

const axios = new Request()

axios.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = baseUrl /* 根域名不同 */
	config.header = {
		'Content-Type': 'application/x-www-form-urlencoded',
		//'Content-Type': 'application/json;charset=UTF-8',
		token:'', //uni.getStorageSync("TOKEN") 这里获取无效
		time: Date.now().toString()
	}
	return config
})

axios.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,
	}
	//debugger
	// 特殊情况 重写 Content-Type
	if(config['Content-Type']!=null){
		config.header['Content-Type'] = config['Content-Type']
	}
	currentToken =uni.getStorageSync("TOKEN")==''? '':JSON.parse(uni.getStorageSync("TOKEN")) || ''
	//console.warn('请求之前拦截器==config==='+JSON.stringify(config))
	config.header.token=currentToken

	uni.showLoading({
		mask: true,
		title: '请稍候...'
	})
	/*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
	return config
})

axios.interceptor.response((res) => { /* 请求之后拦截器 */
     uni.hideLoading()
   if(res.status===10000 || res.data.status===10000){
	   uni.showToast({
	       title: '登陆超时，请重新登陆！',
	       duration: 2000
	   });
	   try {
	       uni.removeStorageSync('TOKEN');
	   } catch (e) {
	       // error
	   }
	  
   }else{
	  return res 
   }
   
	
}, (error) => { // 请求错误做点什么
   // debugger
	uni.hideLoading()
	//return Promise.reject(error)
	 if (error && error.statusCode) {
	        switch (error.statusCode) {
	          case 400:
	            error.errMsg = '错误请求'
	            break
	          case 401:
	            error.errMsg = '未授权，请重新登录'
	            break
	          case 403:
	            error.errMsg = '拒绝访问'
	            break
	          case 404:
	            error.errMsg = '请求错误,未找到该资源'
	            break
	          case 405:
	            error.errMsg = '请求方法未允许'
	            break
	          case 408:
	            error.errMsg = '请求超时'
	            break
	          case 500:
	            error.errMsg = '服务器端出错'
	            break
	          case 501:
	            error.errMsg = '网络未实现'
	            break
	          case 502:
	            error.errMsg = '网络错误'
	            break
	          case 503:
	            error.errMsg = '服务不可用'
	            break
	          case 504:
	            error.errMsg = '网络超时'
	            break
	          case 505:
	            error.errMsg = 'http版本不支持该请求'
	            break
	          default:
	            error.errMsg = `连接错误${error.response.status}`
	        }
	      } else {
	        error.errMsg = '连接到服务器失败'
	      }
	      return Promise.reject(error.errMsg + ' ' + error.statusCode)
})

export default axios