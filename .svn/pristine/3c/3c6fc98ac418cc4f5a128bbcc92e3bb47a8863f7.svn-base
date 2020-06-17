<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">{{ currentTitlefReport }}</block>
		</cu-custom>
		<!-- 数据图表 -->
		<view class="bodyContentHeight qiun-columns">
			<view class="qiun-charts">
				<!--#ifdef MP-ALIPAY -->
				<canvas
					canvas-id="canvasColumn"
					id="canvasColumn"
					class="charts"
					:width="cWidth * pixelRatio"
					:height="cHeight * pixelRatio"
					:style="{ width: cWidth + 'px', height: cHeight + 'px' }"
					disable-scroll="true"
					@touchstart="touchColumn"
					@touchmove="moveColumn"
					@touchend="touchEndColumn"
				></canvas>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY -->
				<canvas
					canvas-id="canvasColumn"
					id="canvasColumn"
					class="charts"
					disable-scroll="true"
					@touchstart="touchColumn"
					@touchmove="moveColumn"
					@touchend="touchEndColumn"
				></canvas>
				<!--#endif-->
			</view>
		</view>
	<v-table
		:columns="dataColumns" 
		:list="dataTableList" 
		selection="single"
		:td-width="avgWidth"
		:height="tableHeight"
		>
	</v-table>
	</view>
</template>

<script>
import baseMixin from '@/mixins';
import vTable from "@/components/table.vue"
import cuCustom from '../../ui/colorui/components/cu-custom.vue' 
import uCharts from '@/components/u-charts/u-charts.js';
var _self;
var canvaColumn = null;
import zTable from '@/components/z-table/z-table.vue';
export default {
	name: 'comFactoryCharts',
	mixins: [baseMixin],
	components: { zTable,cuCustom,vTable },
	data() {
		return {
			avgWidth:95, // 表格提示信息宽度,取所有字段的平均值
			tableHeight: 0, //表格高度
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: '',
			serverData: '',
			currentType: '',
			currentMode: '1',
			legendData: ['面积', '米数', ''],
			currentTitlefReport: '本月生产',
			currentTextOfReport: '生产(面积、米数)对照',
			categories: [], //类别 X 轴 下标数据
			series: [], //实体数据，series:[{data:{面积}}，{data:{金额}}]
			dataTableList:[],
			dataColumns: [],
			dataColumnsM0: [
				{ key: 'Date', title: '日期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Week', title: '星期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Amount', title: '金额', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Area', title: '面积', $width: 110, titleAlign: 'center', columnAlign: 'center' }
			],

			//1生产（面积、金额） ==数据列描述，格式化
			dataColumnsM1: [
				{ key: 'Date', title: '日期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Week', title: '星期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Qty', title: '数量', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Area', title: '面积', $width: 110, titleAlign: 'center', columnAlign: 'center' }
			],

			//2送货（面积、金额） ==数据列描述，格式化
			dataColumnsM2: [
				{ key: 'Date', title: '日期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Week', title: '星期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Amount', title: '金额', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Area', title: '面积', $width: 110, titleAlign: 'center', columnAlign: 'center' }
			],
			//3原纸（当天、当月） ==数据列描述，格式化
			dataColumnsM3: [
				{ key: 'Date', title: '日期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Week', title: '星期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'inwt', title: '入库重量', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'inamt', title: '入库金额', $width: 100, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'outwt', title: '出库重量', $width: 100, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'outamt', title: '出库金额', $width: 100, titleAlign: 'center', columnAlign: 'center' }
			],
			//4辅料（当天、当月） ==数据列描述，格式化
			dataColumnsM4: [
				{ key: 'Date', title: '日期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Week', title: '星期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'inamt', title: '入库金额', $width: 100, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'outamt', title: '出库金额', $width: 100, titleAlign: 'center', columnAlign: 'center' }
			],
			//5收支（当天、当月） ==数据列描述，格式化
			dataColumnsM5: [
				{ key: 'Date', title: '日期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Week', title: '星期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Gathering_Amount', title: '收入', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Gathering_Amount', title: '支出', $width: 90, titleAlign: 'center', columnAlign: 'center' }
			],
			//6运输数据（当天、当月） ==数据列描述，格式化
			dataColumnsM6: [
				{ key: 'Date', title: '日期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'Week', title: '星期', $width: 90, titleAlign: 'center', columnAlign: 'center' },
				{ key: 'TranFee_Amount', title: '金额', $width: 200, titleAlign: 'center', columnAlign: 'center' }
			]
		};
	},
	computed: {
		//当前图表数据
		currentEchartData() {
			let tempDataList = this.$store.getters.getTempChartData;

			return tempDataList;
		}
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.currentType = option.type;
		this.getTitle(this.currentType);
		//图表配置
		_self = this;
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getDataFromWebStorage();
	},
	// #ifdef H5
	mounted() {
		this.$nextTick(function() {
			_self.dataTableList = _self.$store.getters.getTempChartData
		});
		this.$nextTick(()=>{
			this.getOtherContentHeight()
			setTimeout(()=>{
				//延时执行,方便个别小程序兼容
				let tempHeight =  this.setTableHeight(true)
				this.tableHeight =tempHeight //特别处理
			},200)
		})
	},
	// #endif
	// #ifndef H5
	onReady() {
		this.dataTableList = this.$store.getters.getTempChartData;
		this.$nextTick(()=>{
			this.getOtherContentHeight()
			setTimeout(()=>{
				//延时执行,方便个别小程序兼容
				let tempHeight =  this.setTableHeight(true)
				this.tableHeight =tempHeight //特别处理
			},200)
		})
	},
	// #endif
	methods: {
		isJSON(str){
			if (typeof str == 'string') {
				try {
					let obj=JSON.parse(str);
					if(typeof obj == 'object' && obj ){
						return true;
					}else{
						return false;
					}
				} catch(e) {
					console.log('error：'+str+'!!!'+e);
					return false;
				}
			}
		},
		//从Storage获取对应的数据
		getDataFromWebStorage() {
			this.series = [{ name: '面积', type: 'column', data: [] }, { name: '金额', type: 'line', data: [] }];
			if (!Array.isArray(this.currentEchartData) || this.currentEchartData.length == 0) {
				return;
			}
			this.categories = this.formatDataIntoEchart(this.currentEchartData, 'date');
			switch (this.currentType) {
				case 'order':
					this.dataColumns = this.dataColumnsM0;
					let order_area = this.formatDataIntoEchart(this.currentEchartData, 'area');
					this.series[0].data = order_area;
					let order_amt = this.formatDataIntoEchart(this.currentEchartData, 'amt');
					this.series[1].data = order_amt;
					break;
					this.dataColumns = this.dataColumnsM0;
				case 'delivery':
					this.dataColumns = this.dataColumnsM2;
					let tempAreaList = this.formatDataIntoEchart(this.currentEchartData, 'area');
					this.series[0].data = tempAreaList;
					let tempAmtList = this.formatDataIntoEchart(this.currentEchartData, 'amt');
					this.series[1].data = tempAmtList;
					break;
				case 'production':
					this.dataColumns = this.dataColumnsM1;
					this.series = [{ name: '面积', type: 'column', data: [] }, { name: '米数', type: 'line', data: [] }];
					let production_area = this.formatDataIntoEchart(this.currentEchartData, 'area');
					this.series[0].data = production_area;
					let production_long = this.formatDataIntoEchart(this.currentEchartData, 'amt');
					this.series[1].data = production_long;
					break;
				case 'basePaper':
					this.dataColumns = this.dataColumnsM3;
					this.series = [
						{ name: '入库总量', type: 'column', data: [] },
						{ name: '入库金额', type: 'line', data: [] },
						{ name: '出库重量', type: 'column', data: [] },
						{ name: '出库金额', type: 'line', data: [] }
					];
					// this.currentTitlefReport ='本月原纸'
					let basePaper_inwt = this.formatDataIntoEchart(this.currentEchartData, 'inwt');
					this.series[0].data = basePaper_inwt;
					let basePaper_amt = this.formatDataIntoEchart(this.currentEchartData, 'amt');
					this.series[1].data = basePaper_amt;
					let basePaper_outwt = this.formatDataIntoEchart(this.currentEchartData, 'outwt');
					this.series[2].data = basePaper_outwt;
					let basePaper_outamt = this.formatDataIntoEchart(this.currentEchartData, 'outamt');
					this.series[3].data = basePaper_outamt;
					break;
				case 'subMaterial':
					this.dataColumns = this.dataColumnsM4;
					this.series = [{ name: '入库金额', type: 'line', data: [] }, { name: '出库金额', type: 'line', data: [] }];
					// this.currentTitlefReport ='本月辅料'
					let subMaterial_amt = this.formatDataIntoEchart(this.currentEchartData, 'amt');
					this.series[0].data = subMaterial_amt;
					let subMaterial_outamt = this.formatDataIntoEchart(this.currentEchartData, 'outamt');
					this.series[1].data = subMaterial_outamt;
					break;
				case 'inoutCome':
					this.dataColumns = this.dataColumnsM5;
					this.series = [{ name: '收入', type: 'line', data: [] }, { name: '支出', type: 'line', data: [] }];
					// this.currentTitlefReport ='本月收支'
					let inoutCome_amt = this.formatDataIntoEchart(this.currentEchartData, 'amt');
					this.series[0].data = inoutCome_amt;
					let inoutCome_outamt = this.formatDataIntoEchart(this.currentEchartData, 'outamt');
					this.series[1].data = inoutCome_outamt;
					break;
				case 'transportation':
					this.dataColumns = this.dataColumnsM6;
					this.series = [{ name: '运费', type: 'line', data: [] }];
					// this.currentTitlefReport ='本月运输'
					let transportation_amt = this.formatDataIntoEchart(this.currentEchartData, 'amt');
					this.series[0].data = transportation_amt;

					break;
			}
			this.setChartDataConfig();
		},

		//格式化数成图表需要的类型
		formatDataIntoEchart(itemList, typeValue) {
			let tempList = [];
			for (let item in itemList) {
				let currentObj = itemList[item];
				let currentDateTime = itemList[item].Date;

				let modeArea = this.getModeArea(currentObj);
				let modeAmt = this.getModeAmt(currentObj);
				let modeOutAmt = this.getModeOutAmt(currentObj);
				let modeOutwt = this.getModeOutWt(currentObj);
				let modeInwt = this.getModeInWt(currentObj);
				let params = {};

				if (typeValue == 'date') {
					params.date = currentDateTime;
				}
				if (typeValue == 'area') {
					//====测试数据====
					if (isNaN(modeArea) || modeArea == 0) {
						modeArea = 0//this.getRamdon(10, 1100);
					}
					params.area = modeArea;
				}
				if (typeValue == 'amt') {
					//====测试数据====
					if (isNaN(modeAmt) || modeAmt == 0) {
						modeAmt = 0//this.getRamdon(10, 1100);
					}
					params.amt = modeAmt;
				}
				if (typeValue == 'outamt') {
					//====测试数据====
					if (isNaN(modeOutAmt) || modeOutAmt == 0) {
						modeOutAmt = 0//this.getRamdon(10, 1100);
					}
					params.outAmt = modeOutAmt;
				}
				if (typeValue == 'outwt') {
					//====测试数据====
					if (isNaN(modeOutwt) || modeOutwt == 0) {
						modeOutwt = 0//this.getRamdon(10, 1100);
					}
					params.outAmt = modeOutwt;
				}
				if (typeValue == 'inwt') {
					//====测试数据====
					if (isNaN(modeInwt) || modeInwt == 0) {
						modeInwt =0// this.getRamdon(10, 1100);
					}
					params.outAmt = modeInwt;
				}
				let seriesData = Object.values(params);
				// debugger
				tempList.push(...seriesData);
			}
			//debugger
			// console.warn('typeValue:'+JSON.stringify(tempList))
			return tempList;
		},
		getModeArea(item) {
			switch (this.currentMode) {
				case '0':
				case '1':
				case '2':
					return Number.parseFloat(item.Area);
					break;
				case '3':
				case '4':
				case '5':
				case '6':
					return 0;
					break;
				default:
					return Number.parseFloat(item.Area);
					break;
			}
		},
		getModeAmt(item) {
			switch (this.currentMode) {
				case '0':
					return Number.parseFloat(item.Amount);
					break;
				case '1':
					return Number.parseFloat(item.Qty);
					break;
				case '2':
					return Number.parseFloat(item.Amount);
					break;
				case '3':
				case '4':
					return Number.parseFloat(item.inamt);
				case '5':
					return Number.parseFloat(item.Gathering_Amount);
				case '6':
					return Number.parseFloat(item.TranFee_Amount);
					break;
				default:
					return 0;
					break;
			}
		},
		getModeOutAmt(item) {
			//debugger
			switch (this.currentMode) {
				case '0':
				case '1':
				case '2':
				case '6':
					return 0;
					break;
				case '3':
				case '4':
					return Number.parseFloat(item.outamt);
				case '5':
					return Number.parseFloat(item.SPay_Amount);
				default:
					return 0;
					break;
			}
		},
		getModeInWt(item) {
			switch (this.currentMode) {
				case '0':
				case '1':
				case '2':
				case '4':
				case '5':
				case '6':
					return 0;
					break;
				case '3':
					return Number.parseFloat(item.inwt);
				default:
					return 0;
					break;
			}
		},
		getModeOutWt(item) {
			switch (this.currentMode) {
				case '0':
				case '1':
				case '2':
				case '4':
				case '5':
				case '6':
					return 0;
					break;
				case '3':
					return Number.parseFloat(item.outwt);
				default:
					return 0;
					break;
			}
		},
		//测试使用，获取随机数
		getRamdon(start, end) {
			var temp = start - end + 1; //91
			return Math.abs(Math.floor(Math.random() * temp)) + start; //从start开始
		},
		// 获取表格所有字段的长度的平均值
		getTableAvgWidth(dataColumns){
			let totalLength = 0
			this.avgWidth = 95
			let totalWidht = 0
			if(dataColumns && dataColumns.length>0){
				totalLength = dataColumns.length
				totalWidht = dataColumns.reduce((initWidth,item)=>{
					initWidth = initWidth+ Number(item.$width)
					return initWidth
				},0)
			}
			if(totalWidht>0 && totalLength>0){
				this.avgWidth = ~~(totalWidht/totalLength)
			}
		   
		},
		//获取设置当前标题
		getTitle(type) {
			switch (type) {
				case 'order':
					this.currentMode = '0';
					this.dataColumns = this.dataColumnsM0;
					this.currentTitlefReport = '本月订单';
					this.currentTextOfReport = '订单(面积、金额)对照';
					break;
				case 'production':
					this.currentMode = '1';
					this.legendData = ['面积', '米数', ''];
					this.dataColumns = this.dataColumnsM1;
					this.currentTitlefReport = '本月生产';
					this.currentTextOfReport = '生产(面积、米数)对照';
					break;
				case 'delivery':
					this.currentMode = '0';
					this.dataColumns = this.dataColumnsM2;
					this.currentTitlefReport = '本月送货';
					this.currentTextOfReport = '送货(面积、金额)对照';
					break;
				case 'basePaper':
					this.currentMode = '3';
					this.legendData = ['', '入库金额', '出库金额', '入库重量', '出库重量'];
					this.dataColumns = this.dataColumnsM3;
					this.currentTitlefReport = '本月原纸';
					this.currentTextOfReport = '原纸(金额)对照';
					break;
				case 'subMaterial':
					this.currentMode = '4';
					this.legendData = ['', '入库金额', '出库金额', '', ''];
					this.dataColumns = this.dataColumnsM4;
					this.currentTitlefReport = '本月辅料';
					this.currentTextOfReport = '辅料(金额)对照';
					break;
				case 'inoutCome':
					this.currentMode = '5';
					this.legendData = ['', '收入', '支出', '', ''];
					this.dataColumns = this.dataColumnsM5;
					this.currentTitlefReport = '本月收支';
					this.currentTextOfReport = '收支(金额)对照';
					break;
				case 'transportation':
					this.currentMode = '6';
					this.legendData = ['', '金额', '', '', ''];
					this.dataColumns = this.dataColumnsM6;
					this.currentTitlefReport = '本月运输';
					this.currentTextOfReport = '运输(金额)对照';
					break;
			}
			this.getTableAvgWidth(this.dataColumns)
		},
		//设置图表配置
		setChartDataConfig() {
			let Column = { categories: [], series: [] };
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			Column.categories = _self.categories; //mockData.LineA.categories;//
			Column.series = _self.series; //mockData.LineA.series;//
			if (Column.series.length > 0) {
				// Column.series[0].type='column';
				// Column.series[0].name='面积';
				// Column.series[1].type='line';
				// Column.series[1].name='金额';
				//Column.series[1].lineType='dash';
			}

			_self.showColumn('canvasColumn', Column);
		},
		showColumn(canvasId, chartData) {
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'mix',
				fontSize: 11,
				padding: [5, 15, 15, 15],
				legend: {
					show: true,
					position: 'top',
					float: 'center',
					lineHeight: 11,
					itemGap: 30,
					padding: 10,
					margin: 5,
					//backgroundColor:'rgba(41,198,90,0.2)',
					//borderColor :'rgba(41,198,90,0.5)',
					borderWidth: 1
				},

				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				enableScroll: true,
				xAxis: {
					disableGrid: false,
					type: 'grid',
					gridType: 'dash',
					itemCount: 4,
					scrollShow: true,
					scrollAlign: 'left'
				},
				// yAxis: {
				// 	disabled:true,
				// 	gridType:'dash',
				// 	splitNumber:4,
				// 	 min:10,
				// 	 max:180,
				// },
				yAxis: {
					data: [
						{
							calibration: true,
							position: 'left',
							//   title:'面积',//柱状图
							titleFontSize: 12
						}
					],
					//showTitle:true,
					gridType: 'dash',
					dashLength: 4,
					splitNumber: 5
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						type: 'group',
						width: (_self.cWidth * _self.pixelRatio * 0.45) / chartData.categories.length
					}
				}
			});
		},
		touchColumn(e) {
			canvaColumn.scrollStart(e);
		},
		moveColumn(e) {
			canvaColumn.scroll(e);
		},
		touchEndColumn(e) {
			canvaColumn.scrollEnd(e);
			canvaColumn.touchLegend(e, {
				animation: true
			});
			canvaColumn.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		},
		changeData() {
			if (isJSON(_self.textarea)) {
				let newdata = JSON.parse(_self.textarea);
				canvaColumn.updateData({
					series: newdata.series,
					categories: newdata.categories,
					scrollPosition: 'right',
					animation: false
				});
			} else {
				uni.showToast({
					title: '数据格式错误'
				});
			}
		}
	}
};
</script>

<style>
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
