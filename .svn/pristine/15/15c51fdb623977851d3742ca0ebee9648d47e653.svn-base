<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">人员调整</block>
		</cu-custom>
		<view>
			<v-table
				:row-class-name="rowClassNameFn"
				:columns="findGoodsColumns" 
				:list="paperOutTableDataItems" 
				selection="single"
				:td-width="150"
				@on-selection-change='onClick'
				>
				<!--单选	@on-selection-change='onClick' -->
			</v-table>
		</view>
		<!-- 数据操作框 -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modalTitle}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid-body">
					<view class="grid-flex padding-10">
						<view style="color: red;">
							<text>编号:{{findGoodsTableDataItems.w_ID}}</text>
						</view>
						<view>
							<text>姓名:{{findGoodsTableDataItems.w_Name}}</text>
						</view>
					</view>
					<view class="grid-flex padding-10">
						<view>
							<text>工分:{{findGoodsTableDataItems.tt_quotient}}</text>
						</view>
						<view>
							<text>工资:{{findGoodsTableDataItems.money}}</text>
						</view>
					</view>
				</view>
				<view class="updete grid-flex" v-show="modalTitle=='修改'?'show':''">
						<view class="title">工分:</view>
						<input type="number"  style=" border: 1px solid red; width: 30%;" v-model="findGoodsTableDataItems.tt_quotient"/>
				</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
						<view class="action margin-0 flex-sub text-green solid-left" @tap="confirmFrom">确定</view>
					</view>
				</view>
		</view>
		<!-- 新增弹框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''" style="z-index: 10;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">新增</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
					<view class="grid-body">
						<view class="flex border-top">
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">编ㅤ号:</view>
									<input v-model="uptatefrom.w_ID" @blur="getpeopleName()" placeholder="请输入编号" />
								</view>
							</view>
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">姓ㅤ名:</view>
									<input v-model="uptatefrom.w_Name" placeholder="请输入姓名" />
								</view>
							</view>
						</view>
						<view class="flex border-top">
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">工ㅤ分:</view>
									<input type="number" v-model="uptatefrom.tt_quotient" placeholder="请输入工分" />
								</view>
							</view>
							<view class="flex-sub">
								<view class="cu-form-group">
									<view class="title">工ㅤ资:</view>
									<input type="number" v-model="uptatefrom.money" placeholder="请输入工资" />
								</view>
							</view>
						</view>
					</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="addfromList">确定</view>
				</view>
			</view>
		</view>
		<!-- 底部操作框 -->
		<view class="xunhoubtm elBtn">
			<view>				<button class="bank-rest" @tap="addfrom" type="primary" size="mini">新增</button>			</view>
			<view>
				<button class="bank-rest" @tap="updatafrom" type="primary" size="mini">修改</button>
			</view>
			<view>
				<button class="bank-rest" @tap="deletefrom" type="warn" size="mini">删除</button>
			</view>
			<view>
				<button class="bank-rest" @tap="goBack" type="primary" size="mini">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
import vTable from "@/components/table.vue"
import cuCustom from '@/ui/colorui/components/cu-custom.vue';
import request from '@/utils/request.js';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	export default{
		components:{vTable,cuCustom,request,uniDrawer,uniList,uniListItem,uniSearchBar},
		data() {
			return {
				uptatefrom:{w_Name:'',w_ID:'',money:'',tt_quotient:''},
				team:'',
				teamId:'',
				deleteItem:{},
				modalName:null,
				modalTitle:'删除',
				paperOutTableDataItems:[],//人员数据列表
				index:null,//记录操作行
				findGoodsTableDataItems:{},//操作数据
				findGoodsColumns: [
					{
						key: 'Serial',
						title: '序号',
						$width: 80,
						// $fixed:'left'	
					},
					{
						key: 'w_ID',
						title: '编号',
						$width: 180,
					},
					{
						key: 'w_Name',
						title: '姓名',
						$width: 180,
					},
					{
						key: 'tt_quotient',
						title: '工分',
						$width: 158,
					},
					{
						key: 'money',
						title: '工资',
						$width: 158,
					},
				]
			}
		},
		// #ifdef H5
		mounted(option) {
			// debugger
			// this.loadLicensePlateList();
			this.getpaperOutTableDataItems()
		},
		onLoad(option) {
			// debugger			
			// this.paperOutTableDataItems = typeof option.from=='string'? JSON.parse(option.from) :option.from;
			this.team = option.team
			this.teamId = option.teamId
			this.getpaperOutTableDataItems()
			// console.log(this.paperOutTableDataItems)
		    // const item = JSON.parse(decodeURIComponent(option.from));
		},
		// #endif
		// #ifndef H5
		onReady(option) {
			// debugger
			// this.paperOutTableDataItems = option.from
			// const item = JSON.parse(decodeURIComponent(option.item));
			// this.loadLicensePlateList();
			this.getpaperOutTableDataItems()
		},
		// #endif
		methods: {
			// 自定义某行样式
			rowClassNameFn(row, index) {
				if (Number(index) % 2 == 0) {
					return 'table-single-row';
				} 
				return '';//'table-double-row';
			},
			// 输入编号获取人员姓名
			getpeopleName(){
				let data={
					workerID:this.uptatefrom.w_ID.toUpperCase()
				}
				this.toast.loading();
				request.post('/warehouse/warehouse/execute/appFindWorkerNameByID',data).then(res=>{
					if(res.list.length !== 0){
						this.uptatefrom.w_ID = this.uptatefrom.w_ID.toUpperCase()
						this.toast.hide();
						this.uptatefrom.w_Name = res.list[0].workerName
					}else{
						this.toast.hide();
						this.uptatefrom.w_ID = '';
						this.toast.message('该编号无人员信息')
					}
				}).catch(err=>{
					this.toast.hide();
					this.uptatefrom.w_ID = '';
					this.toast.message('数据加载失败')
				})
			},
			// 获取人员列表
			getpaperOutTableDataItems(){
				this.paperOutTableDataItems = this.$store.state.paperOutTableDataItems
			},
			//确认
			goBack(){
				let paperOutTableDataItems = this.paperOutTableDataItems
				let from = {paperOutTableDataItems}
				if(this.paperOutTableDataItems != this.$store.state.paperOutTableDataItems){
					let data = this.paperOutTableDataItems
					this.$store.commit('updataItems',data)
				}
				uni.navigateBack({
				});
				// uni.redirectTo({
				//     url: './boxHalfProdIn'
				// });
			},
			//清除新增列表数据
			restuptatefrom(){
				this.uptatefrom.w_ID = '';
				this.uptatefrom.w_Name = '';
				this.uptatefrom.tt_quotient = '';
				this.uptatefrom.money = 0;
			},
			//新增弹框确认按钮
			addfromList(){
				// this.toast.loading();
				if(this.uptatefrom.w_ID == ''){
					this.toast.message('请输入员工编号')
					return;
				}
				if(this.uptatefrom.w_Name == ''){
					this.toast.message('请输入员工姓名')
					return;
				}
				if(this.uptatefrom.tt_quotient == ''){
					this.toast.message('请输入员工工分')
					return;
				}
				let onlypeople =  this.onlypeople(this.uptatefrom)
				if(!onlypeople){
					this.toast.message('此员工已存在')
					this.modalName = null
					this.restuptatefrom()
					return;
				}
				this.paperOutTableDataItems.push(JSON.parse(JSON.stringify(this.uptatefrom)))
				this.modalName = null
				for(let i= 0; i<this.paperOutTableDataItems.length;i++){
					this.paperOutTableDataItems[i].Serial = i+1
				}
				// this.toast.hide();
				this.restuptatefrom()
			},
			// 新增人员唯一校验
			onlypeople(data){
				for(let i= 0; i<this.paperOutTableDataItems.length;i++){
					if(this.paperOutTableDataItems[i].w_ID == data.w_ID){
						return false;
					}
				}
				return true;
			},
			//编辑宽确认
			confirmFrom(){
				// debugger
				let index = this.index
				if(this.modalTitle == '删除'){
					this.paperOutTableDataItems.splice(index,1)
					this.index = null
					for(let i= 0; i<this.paperOutTableDataItems.length;i++){
						this.paperOutTableDataItems[i].Serial = i+1
					}
					this.modalName = null
				}else{
					this.paperOutTableDataItems[index].tt_quotient = this.findGoodsTableDataItems.tt_quotient
					// console.log(this.paperOutTableDataItems[index])
					this.modalName = null
				}
			},
			//编辑框取消
			hideModal(){
				this.modalName = null
			},
			//删除
			deletefrom(){
				if(this.index == null){
					this.toast.message('请先选择操作数据');
					return;
				}
				this.modalTitle = '删除'
				this.modalName = 'DialogModal2'
			},
			// 修改
			updatafrom(){
				if(this.index == null){
					this.toast.message('请先选择操作数据');
					return;
				}
				this.modalTitle = '修改'
				this.modalName = 'DialogModal2'
			},
			// 新增
			addfrom(){
				this.uptatefrom.money = 0
				this.modalName = 'DialogModal1'
			},
			//table点击事件
			onClick(row){
				// debugger
				this.findGoodsTableDataItems =JSON.parse(JSON.stringify(row.new.item)) 
				this.index = row.new.index
			},
		}
	}
</script>

<style scoped>
.updete {
	/* width: 50%; */
	display: flex;
	margin: 10px 10px;
	justify-content:flex-end
}
.xunhoubtm {
	display: flex;
	justify-content:space-around;
	position: fixed;
	background-color: #FFFFFF;
	bottom: 0px;
	width: 100%;
	z-index: 9;
	
}
</style>
