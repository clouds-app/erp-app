import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		paperOutTableDataItems:[],
		countworlktime:[],
		tempChartData:[],// 看板选择临时数据
	},
	mutations: {
	    updataItems(state,data) {
			  state.paperOutTableDataItems = data
		},
		updataworlktime(state,data){
			state.countworlktime = data
		},
		// 设置看板临时数据
		setTempChartData(state,data){
			state.tempChartData = data
		}
	},
	actions: {

	},
	modules: {
		
	},
	getters: {
	    showArray (state) {
	      return state.paperOutTableDataItems
	    },
		getcountworlktimeArray (state) {	
			return state.countworlktime
		},
		// 获取临时看板图表数据
		getTempChartData (state) {
			return state.tempChartData
		}
	  },
})
