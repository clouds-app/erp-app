<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content" style="height: 30px;">原纸价格查看</block>
		</cu-custom>
		<view class="vtable">
			<v-table
				:row-class-Name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="188"
				:height="tableHeight-50"
				@on-selection-change="onSelectionChange"
				>
			</v-table>
		</view>
		<!-- 底部按钮 -->
		<view class="chucangbtm">
			<view class="flex solid-bottom padding justify-around elBtn" ref="elBtn">
				<view>	
					<!-- <button :disabled="!page.showpage" @click="loadmoreData"  type="primary" size="mini" class="bg-grey radius">加载更多数据</button> -->
					<button :disabled="!page.showpage" class="cu-btn lines-green shadow"  @click="loadmoreData">加载更多数据</button>
				</view>
				<view>	
					<!-- <button @click="updateData"  type="primary" size="mini" class="bg-grey radius">修改</button> -->
					<button  class="cu-btn lines-blue shadow"  @click="updateData">修改</button>
				</view>
			</view>
		</view>
		<!-- 修改操作框 -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">类型:</view>
							<input v-model="tableclickdata.Code" Name="input" disabled/>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">名称:</view>
							<input v-model="tableclickdata.Name" Name="input" disabled/>
						</view>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">克重:</view>
							<input v-model="tableclickdata.Gram" Name="input" disabled/>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">执行价:</view>
							<input type="number" v-model="updataMonny" Name="input" placeholder="请输入执行价" />
						</view>
					</view>
				</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
						<view class="action margin-0 flex-sub text-green solid-left" @tap="confirmFrom">确定</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
import vTable from "@/components/table.vue";
import baseMixin from '@/mixins';
import cuCustom from '../../ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
	export default {
		components:{cuCustom,vTable},
		mixins:[baseMixin],
		data() {
			return {
				updataMonny:'',//编辑框修改字段
				modalName:'',//修改弹框隐藏字段
				tableclickdata:{},//表格选中行
				tableHeight: 0, //表格高度
				dataTableList:[],
				dataColumns:[
					{ key: 'Code', title: '类型', $width: 160, titleAlign: 'center', columnAlign: 'center'},
					{ key: 'Name', title: '名称', $width: 270, titleAlign: 'center', columnAlign: 'center'},
					{ key: 'Gram', title: '克重', $width: 160, titleAlign: 'center', columnAlign: 'center'},
					{ key: 'Price', title: '执行价', $width: 160, titleAlign: 'center', columnAlign: 'center'},
				],
				page:{
					pageSize:50,
					pageNum:1,
					showpage:false
				}
			}
		},
		// #ifdef H5
		mounted() {
			this.calTableHeight()
			// this.getFromtableData()
		},
		// #endif
		// #ifndef H5
		// onReady() {
		// 	this.calTableHeight()
		// 	// this.getFromtableData()
		// },
		onLoad(){
			// debugger
			this.calTableHeight()
		},
		// 监听页面返回时改成正常显示
		// onBackPress(){
		// 	debugger
		// 	this.toast.loading()
		// },
		// #endif
		methods: {
			// 设置表格使用剩余高度
			calTableHeight(){
				this.$nextTick(()=>{
					// this.getOtherContentHeight()
					setTimeout(()=>{
						//延时执行,方便个别小程序兼容
						let tempHeight =  this.setTableHeight(true)
						this.tableHeight =tempHeight//特别处理
						this.getFromtableData()
					},200)
				})
			},
			// 获取表单数据
			getFromtableData(){
				this.tableclickdata = {}
				let parms = {
					UseID:this.userInfo.erpUserCode,
					pageSize:this.page.pageSize,
					pageNum:this.page.pageNum
				}
				this.toast.loading()
				let _self = this
				request.post('/warehouse/warehouse/execute/appGetSPaperPirceSet',parms).then(res=>{
					_self.checkShowpage(res.list)
					_self.dataTableList = _self.dataTableList.concat(res.list)
					this.toast.hide()
				}).catch(err=>{
					this.toast.hide()
					_self.toast.message(err)
				})
			},
			// 数据分页校验
			checkShowpage(data){
				if(data.length >= 50){
					this.page.showpage = true
					this.page.pageNum++
					return
				}
				this.page.showpage = false
				this.page.pageNum = 1
			},
			// 加载更多数据
			loadmoreData(){
				this.getFromtableData()
			},
			// 编辑框确认事件
			confirmFrom(){
				let parms = {
					ID1:this.tableclickdata.ID1,
					UseID:this.userInfo.erpUserCode,
					Price:this.updataMonny
				}
				let _self = this
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appUpSPaperPirceSet',parms).then(res=>{
					if(!!res.list[0].res){
						_self.dataTableList = []
						_self.page.pageNum = 1
						_self.getFromtableData()
						this.toast.hide()
						this.hideModal()
						return
					}
				}).catch(err=>{
					this.toast.hide()
					this.hideModal()
					this.toast.message(err)
				})
			},
			// 编辑框取消点击事件
			hideModal(){
				this.modalName = '',
				this.updataMonny = ''
			},
			// 修改数据
			updateData(){
				// debugger
				if(!this.tableclickdata.Price){
					this.toast.message('请选择操作行')
					return
				}
				this.updataMonny = JSON.parse(JSON.stringify(this.tableclickdata.Price))
				this.modalName = 'DialogModal2'
			},
			// table点击事件
			onSelectionChange(obj){
				// debugger
				this.tableclickdata = obj.new.item
				console.log(this.tableclickdata)
			}
		}
	}
</script>

<style>
.chucangbtm{
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 2;
}
</style>
