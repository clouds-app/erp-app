/**
 * 系统缓存，在uni数据缓存的封装
 * https://uniapp.dcloud.io/api/storage/storage?id=setstorage
 */
export default {
	put(key,data){
		//异步缓存
		return new Promise(function(resolve, reject){
			uni.setStorage({
			    key:key,
			    data: data,
			    success: function () {
			       resolve()
			    },
				fail:function(){
					reject()
				}
			})
		})
	},
	get(key){
		//同步获取缓存
		return uni.getStorageSync(key)
	},
	remove(key){
		//删除指定key
		return new Promise(function(resolve, reject){
			uni.removeStorage({
			    key: key,
			    success: function (res) {
			        resolve(res)
			    },
				fail:function(res){
					reject(res)
				}
			});
		})
	},clear(){
		//清空缓存
		uni.clearStorage();
	}
}