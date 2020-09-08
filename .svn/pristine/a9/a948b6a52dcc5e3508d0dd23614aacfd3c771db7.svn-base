<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content" style="height: 30px;">报价纸质设定</block>
		</cu-custom>
		<view class="flex border-top">
			<view class="flex-sub">
				<selectDropdown
					:otherHeight='CustomBarHeight' 
					ref="lineDrawer"
					url="appArtListSearch"
					title="增加纸质"
					placeholdertext=""
					v-model='lineCode'
					:multipleChoice='true'
					:params='{pageSize:100,pageNum:1}'
					@getcheckboxval="getcheckboxval"
				></selectDropdown>
			</view>
		</view>
		<view class="vtable">
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="dataColumns" 
				:list="dataTableList" 
				selection="single"
				:td-width="186"
				:height="tableHeight-40"
				@on-selection-change="onSelectionChange"
				>
			</v-table>
		</view>
		<!-- 底部按钮 -->
		<view class="chucangbtm">
			<view class="flex solid-bottom padding justify-around elBtn" ref="elBtn">
				<button v-show="page.showpage" @click="searchModeClick('0')" class="margin-left-custom cu-btn round line-blue">加载更多</button>
				<button  class="cu-btn lines-blue shadow"  @click="updateData" size="mini">修改</button>
				<!-- <button @click="updateData"  type="primary" size="mini" class="bg-grey radius">修改</button> -->
				<!-- <button @click="modalName = 'DialogModal1'"  type="primary" size="mini" class="bg-grey radius">清空</button> -->
				<!-- <button @click="deleteData"  type="primary" size="mini" class="bg-grey radius">删除</button> -->
				<button  class="cu-btn lines-pink shadow"  @click="deleteData" size="mini">删除</button>
				<button  class="cu-btn lines-red shadow"  @click="modalName = 'DialogModal1'" size="mini">清空</button>
			</view>
		</view>
		<!-- 修改操作框 -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modeltitle}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">序号:</view>
							<input v-model="tableclickdata.rownumber" Name="input" disabled/>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">纸质:</view>
							<input v-model="tableclickdata.art_Id" Name="input" disabled/>
						</view>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">层数:</view>
							<input v-model="tableclickdata.art_Cs" Name="input" disabled/>
						</view>
					</view>
					<view class="flex-sub">
						<view class="cu-form-group">
							<view class="title">楞别:</view>
							<input v-model="updataLB" Name="input" :disabled="modeltitle==='修改'?false:true"/>
						</view>
					</view>
				</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
						<view class="action margin-0 flex-sub text-green solid-left" @tap="modeltitle==='修改'?updatarequest():delectrequest(1)">确定</view>
					</view>
				</view>
		</view>
		<!-- 清空弹框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">清空</view>
					<view class="action" @tap="modalName = ''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="flex border-top">
					<view class="flex-sub">
						<view class="cu-form-group">
							<text>是否清空全部数据</text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="modalName = ''">取消</view>
						<view class="action margin-0 flex-sub text-green solid-left" @tap="clearFromData">确定</view>
					</view>
				</view>
		</view>
		
	</view>
</template>

<script>
import vTable from "@/components/table.vue";
import baseMixin from '@/mixins';
import cuCustom from '../../ui/colorui/components/cu-custom.vue';
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import request from '@/utils/request.js';
	export default {
		components:{cuCustom,vTable,uniLoadMore},
		mixins:[baseMixin],
		data() {
			return {
				page:{
					pageNum:1,
					pageSize:100,
					showpage:false
				},
				updataLB:'',//修改楞别字段
				modeltitle:'',//编辑框标题
				modalName:'',//编辑弹框隐藏字段
				tableclickdata:{},//表单单选数据
				bottomHeight:0,//底部按钮高度
				lineCode:{},
				tableHeight: 0, //表格高度
				dataTableList:[],
				dataColumns:[
					{ key: 'rownumber', title: '序号', $width: 80, titleAlign: 'center', columnAlign: 'center'},
					{ key: 'art_Id', title: '纸质', $width: 240, titleAlign: 'center', columnAlign: 'center'},
					{ key: 'art_LB', title: '楞别', $width: 215, titleAlign: 'center', columnAlign: 'center'},
					{ key: 'art_Cs', title: '层数', $width: 210, titleAlign: 'center', columnAlign: 'center'},
				],
			}
		},
		// #ifdef H5
		mounted() {
			this.calTableHeight()
		},
		// #endif
		// #ifndef H5
		onReady() {
			this.calTableHeight()
		},
		// 监听页面返回时改成正常显示
		// onBackPress(){
		// 	this.toast.loading()
		// },
		// #endif
		methods: {
			// 请求统一回调事件
			requestCallback(data,message){
				// debugger
				if(!!data){
					this.page.pageNum = 1
					this.dataTableList = []
					this.modalName = ''
					this.getFromtableData()			
				}else{
					this.modalName = ''
					this.toast.message(message)
				}
			},
			// 纸质确认回调事件
			getcheckboxval(data){
				if(!!data){
					let _self = this
					this.toast.loading()
					let params = {UserID:this.userInfo.erpUserCode,ArtIdStr:data}
					request.post('/warehouse/warehouse/execute/appSPaperArtSetAdd',params).then(res=>{
						_self.requestCallback(res.list[0].res,'新增失败')
					}).catch(err=>{
						this.toast.hide()
						this.toast.message(err)
					})
				}
			},
			// 修改请求
			updatarequest(){
				let parms = {
					ID1:this.tableclickdata.ID1,
					UserID:this.userInfo.erpUserCode,
					IndexNo:this.tableclickdata.IndexNo,
					art_Id:this.tableclickdata.art_Id,
					art_LB:this.updataLB
				}
				let _self = this
				this.toast.loading()
				request.post('/warehouse/warehouse/execute/appSPaperArtSetUp',parms).then(res=>{
					_self.requestCallback(res.list[0].res,'修改失败')
				}).catch(err=>{
					this.toast.hide()
					this.toast.message(err)
				})
			},
			// 删除请求
			delectrequest(flag){
				let parms = {
					ID1:this.tableclickdata.ID1,
					UserID:this.userInfo.erpUserCode,
					Flag:flag //-- 1、单个删除
				}
				let _self = this
				request.post('/warehouse/warehouse/execute/appSPaperArtSetDel',parms).then(res=>{
					_self.requestCallback(res.list[0].res,'删除失败')
				}).catch(err=>{
					this.toast.hide()
					this.toast.message(err)
				})
			},
			// 操作框取消事件
			hideModal(){
				this.modalName = ''
				this.modeltitle = ''
				this.updataLB = ''
			},
			// 修改删除统一操作
			unifyopenModel(name){
				this.modeltitle = name
				this.modalName = 'DialogModal2'
			},
			// 修改事件
			updateData(){
				if(!!this.tableclickdata.ID1){
					this.updataLB = this.tableclickdata.art_LB
					this.unifyopenModel('修改')
					return
				}
					this.toast.message('请选择操作数据')
			},
			// 删除事件
			deleteData(){
				if(!!this.tableclickdata.ID1){
					this.updataLB = this.tableclickdata.art_LB
					this.unifyopenModel('是否删除该数据')
					return
				}
					this.toast.message('请选择操作数据')
			},
			// 清空事件
			clearFromData(){
				this.delectrequest(2)
			},
			// 加载更多数据
			clickLoadMore(){},
			// 设置表格使用剩余高度
			calTableHeight(){
				this.$nextTick(()=>{
					setTimeout(()=>{
						//延时执行,方便个别小程序兼容
						let tempHeight =  this.setTableHeight(true)
						this.tableHeight =tempHeight-50//特别处理
						this.getFromtableData()
					},200)
				})
			},
			// 加载初始数据
			getFromtableData(){
				let parms = {
					UserID:this.userInfo.erpUserCode,
					pageSize:this.page.pageSize,
					pageNum:this.page.pageNum
				}
				this.toast.loading()
				let _self = this
				request.post('/warehouse/warehouse/execute/appSPaperArtSetList',parms).then(res=>{
					_self.toast.hide()
					_self.checkFromTabledata(res.list)
					_self.dataTableList = _self.dataTableList.concat(res.list)
					_self.tableclickdata = {}
				}).catch(err=>{
					_self.toast.hide()
					_self.tableclickdata = {}
					_self.toast.message(err)
				})
			},
			// table数据校验是否分页
			checkFromTabledata(data){
				if(data.length < this.page.pageSize){
					this.page.showpage = false
					this.page.pageNum = 1
					return
				}
					this.page.showpage = true
					this.page.pageNum++
			},
			// table点击事件
			onSelectionChange(obj){
				this.tableclickdata = obj.new.item
			}
			
		}
	}
</script>

<style>
.chucangbtm{
	height: 50px;
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #FFFFFF;
	z-index: 2;
}
</style>
