<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
				<block slot="content">看板</block>
		</cu-custom>
	<view>
				<view class="grid-warp">
					<view class="grid-title">
						本月资金情况
					</view>
					<view class="grid-body" style="padding: 10rpx;">
						<uni-grid :column="2" :square="false" :highlight="false" :showBorder="false">
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
									<view class="marginBottom10">
										<text class="text">订单金额</text>
									</view>
									<view class="text-price">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[0].Amount)}}
									</view>
								</view>
							</uni-grid-item>
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
									<view class="marginBottom10">
										<text class="text">送货金额</text>
									</view>
									<view class="text-price">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[0].Amount)}}
									</view>
								</view>
							</uni-grid-item>
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
										<view class="marginBottom10">
										<text class="text">原纸入库金额</text>
									</view>
									<view class="text-price">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[0].inamt)}}
									</view>
								</view>
							</uni-grid-item>
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
										<view class="marginBottom10">
										<text class="text">辅料送货金额</text>
									</view>
									<view class="text-price">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[0].inamt)}}
									</view>
								</view>
							</uni-grid-item>
							
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
										<view class="marginBottom10">
										<text class="text">收入金额</text>
									</view>
									<view class="text-price">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[0].Gathering_Amount)}}
									</view>
								</view>
							</uni-grid-item>
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
										<view class="marginBottom10">
										<text class="text">生产面积</text>
									</view>
									<view class="text-area">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[0].Area)}}
									</view>
								</view>
							</uni-grid-item>
							
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
										<view class="marginBottom10">
										<text class="text">运费金额</text>
									</view>
									<view class="text-price">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[6].TranFee_Amount)}}
									</view>
								</view>
							</uni-grid-item>
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
										<view class="marginBottom10">
										<text class="text">原纸出库金额</text>
									</view>
									<view class="text-price">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[3].outamt)}}
									</view>
								</view>
							</uni-grid-item>
							
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
										<view class="marginBottom10">
										<text class="text">辅料出库金额</text>
									</view>
									<view class="text-price">
										{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[0].outamt)}}
									</view>
								</view>
							</uni-grid-item>
							<uni-grid-item>
								<view class="price-mini-panel margin-left-custom">
										<view class="marginBottom10">
										<text class="text">收支支出金额</text>
									</view>
									<view class="text-price">
									{{toThousands(currentBriefReport.length==0 ?'':currentBriefReport[0].SPay_Amount)}}
									</view>
								</view>
							</uni-grid-item>
						</uni-grid>
					</view>
				</view>
			<!-- color="#4AECDB" -->
				<view class="grid-warp">
					<view @click="handleLink('order',totalReport[0])" class="grid-title">
						本月订单
						<text class="cuIcon-right"></text>
						
					</view>
	
					<view class="grid-body">
						<view>
							<uni-grid :column="4" :square="false" :highlight="false" :showBorder="false">
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">数量</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">面积</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">金额</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月累计</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月累计 数量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthOrderByType(totalReport[0],'Qty',0))}}</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 面积 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthOrderByType(totalReport[0],'Area',0))}}</text>
										</view>
									</view>
								</uni-grid-item>
								   <!--月累计 金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthOrderByType(totalReport[0],'Aoumt',0))}}</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月平均</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月平均 数量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthOrderByType(totalReport[0],'Qty_avg',0))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 面积 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthOrderByType(totalReport[0],'Area_avg',0))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthOrderByType(totalReport[0],'Aoumt_avg',0))}}</text>
										</view>
									</view>
								</uni-grid-item>
							</uni-grid>
						</view>
					</view>
				</view>
				
				<view class="grid-warp">
					<view @click="handleLink('production',totalReport[1])" class="grid-title">
						本月生产
						<text class="cuIcon-right"></text>
					</view>
					<view class="grid-body">
						<view>
							<uni-grid :column="4" :square="false" :highlight="false" :showBorder="false">
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">数量</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">面积</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">米数</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月累计</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月累计 数量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthProductionByType(totalReport[1],'Qty',1))}}</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 面积 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthProductionByType(totalReport[1],'Area',1))}}</text>
										</view>
									</view>
								</uni-grid-item>
								   <!--月累计 米数 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthProductionByType(totalReport[1],'Long',1))}}</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月平均</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月平均 数量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthProductionByType(totalReport[1],'Qty_avg',1))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 面积 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthProductionByType(totalReport[1],'Area_avg',1))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 米数 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthProductionByType(totalReport[1],'Long_avg',1))}}</text>
										</view>
									</view>
								</uni-grid-item>
							</uni-grid>
						</view>
					</view>
				</view>
				
				<view class="grid-warp">
					<view @click="handleLink('delivery',totalReport[2])"  class="grid-title">
						本月送货
						<text class="cuIcon-right"></text>
					</view>
					<view class="grid-body">
						<view>
							<uni-grid :column="4" :square="false" :highlight="false" :showBorder="false">
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">数量</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">面积</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">金额</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月累计</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月累计 数量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[2],'Qty'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 面积 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[2],'Area'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								   <!--月累计 金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[2],'Amount'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月平均</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月平均 数量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[2],'Qty_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 面积 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[2],'Area_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[2],'Amount_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
							</uni-grid>
						</view>
					</view>
				</view>
				
				<view class="grid-warp">
					<view  @click="handleLink('basePaper',totalReport[3])" class="grid-title">
						本月原纸
						<text class="cuIcon-right"></text>
					</view>
					<view class="grid-body">
						<view>
							<uni-grid :column="5" :square="false" :highlight="false" :showBorder="false">
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">入库总量</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">入库金额</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">出库总量</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">出库金额</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月累计</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 入库总量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[3],'inwt'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								   <!--月累计 入库金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[3],'inamt'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 出库总量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[3],'outwt'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 出库金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[3],'outamt'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月平均</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 入库总量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[3],'inwt_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 入库金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[3],'inamt_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 出库总量 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[3],'outwt_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 出库金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthDeliveryByType(totalReport[3],'outamt_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
							</uni-grid>
						</view>
					</view>
				</view>
							
				<view class="grid-warp">
					<view @click="handleLink('subMaterial',totalReport[4])" class="grid-title">
						本月辅料
						<text class="cuIcon-right"></text>
					</view>
					<view class="grid-body">
						<view>
							<uni-grid :column="3" :square="false" :highlight="false" :showBorder="false">
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">入库金额</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">出库金额</text>
										</view>
									</view>
								</uni-grid-item>
							
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月累计</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 入库金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthSubMaterial(totalReport[4],'inamt'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								   <!--月累计 出库金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthSubMaterial(totalReport[4],'outamt'))}}</text>
										</view>
									</view>
								</uni-grid-item>
	
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月平均</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 入库金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthSubMaterial(totalReport[4],'inamt_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 出库金额 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthSubMaterial(totalReport[4],'outamt_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
							
							</uni-grid>
						</view>
					</view>
				</view>
							
						
				<view class="grid-warp">
					<view @click="handleLink('inoutCome',totalReport[5])" class="grid-title">
						本月收支
						<text class="cuIcon-right"></text>
					</view>
					<view class="grid-body">
						<view>
							<uni-grid :column="3" :square="false" :highlight="false" :showBorder="false">
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">收入</text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">支出</text>
										</view>
									</view>
								</uni-grid-item>
							
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月累计</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 收入 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthInOutCome(totalReport[5],'SPay_Amount'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								   <!--月累计 支出 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthInOutCome(totalReport[5],'Gathering_Amount'))}}</text>
										</view>
									</view>
								</uni-grid-item>
				
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月平均</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 收入 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthInOutCome(totalReport[5],'SPay_Amount_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 支出 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthInOutCome(totalReport[5],'Gathering_Amount_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
							
							</uni-grid>
						</view>
					</view>
				</view>
							
				<view class="grid-warp">
					<view @click="handleLink('transportation',totalReport[6])" class="grid-title">
						本月运输
						<text class="cuIcon-right"></text>
					</view>
					<view class="grid-body">
						<view>
							<uni-grid :column="3" :square="false" :highlight="false" :showBorder="false">
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">运费</text>
										</view>
									</view>
								</uni-grid-item>
								<!-- 占位符 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
							
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月累计</text>
										</view>
									</view>
								</uni-grid-item>
								 <!--月累计 运输 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthTransportation(totalReport[6],'TranFee_Amount'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								 <!-- 占位符 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
				
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text margin-left">月平均</text>
										</view>
									</view>
								</uni-grid-item>
								  <!--月平均 运输 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text">{{toThousands(totalReport.length==0 ?'':handleCurrentMonthTransportation(totalReport[6],'TranFee_Amount_avg'))}}</text>
										</view>
									</view>
								</uni-grid-item>
								<!-- 占位符 -->
								<uni-grid-item>
									<view class="price-mini-panel">
										<view>
											<text class="text"></text>
										</view>
									</view>
								</uni-grid-item>
							
							</uni-grid>
						</view>
					</view>
				</view>
							
								
			</view>
		<view class="window-bottom"></view>
		</view>
	</template>

<script>
import baseMixin from '@/mixins';
import uniIcon from "@/components/uni-icon/uni-icon.vue"
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
import { mapActions,mapMutations } from 'vuex';
import cuCustom from '../../ui/colorui/components/cu-custom.vue' 
export default {
	components: {cuCustom,uniGrid,uniGridItem,uniIcon },
	mixins: [baseMixin],
	data() {
		return {
			pageTitle:'全厂综合查询',
			legendData:['面积','金额',''],//图表暂时字段
			actived:['1'],
			currentMode:'0',// 0：订单，1：生产，2：送货，3：原纸，4：辅料，5：收支，6：运输数据
			dataSource:[], //数据源
			currentTextOfReport:'',//popup 图表标题
			currentTitlefReport:'',//popup标题
			barData:[],//柱图数据
			popupShow: false,
			currentBriefReport:[],//本月简报
			totalReport:[],//数据集合  Data中7个数组，分别为 0：订单，1：生产，2：送货，3：原纸，4：辅料，5：收支，6：运输数据
			//0订单 （面积、金额）==数据列描述，格式化
		};
	},
	// #ifdef H5
	mounted() {
		this.getDataSource();
	},
	// #endif
	// #ifndef H5
	onReady() {
		this.getDataSource();
	},
	// #endif
	methods: {
	  //图表显示处理
	  handleLink(type,sourceData){
	    this.legendData=['面积','金额','','','']
	    this.popupShow =true
	    this.barData =sourceData
	    this.dataSource =sourceData
	    //0：订单，1：生产，2：送货，3：原纸，4：辅料，5：收支，6：运输数据
	     switch(type){
	      case 'order':
	        this.currentMode ='0'
	        this.currentTitlefReport ='本月订单'
	        this.currentTextOfReport ='订单(面积、金额)对照'
	        break
	      case 'production':
	        this.currentMode ='1'
	        this.legendData=['面积','米数','']
	        this.currentTitlefReport ='本月生产'
	        this.currentTextOfReport ='生产(面积、米数)对照'
	        break
	     case 'delivery':
	        this.currentMode ='0'
	        this.currentTitlefReport ='本月送货'
	        this.currentTextOfReport ='送货(面积、金额)对照'
	        break
	     case 'basePaper':
	        this.currentMode ='3'
	        this.legendData=['','入库金额','出库金额','入库重量','出库重量']
	        this.currentTitlefReport ='本月原纸'
	        this.currentTextOfReport ='原纸(金额)对照'
	        break
	     case 'subMaterial':
	        this.currentMode ='4'
	        this.legendData=['','入库金额','出库金额','','']
	        this.currentTitlefReport ='本月辅料'
	        this.currentTextOfReport ='辅料(金额)对照'
	        break
	    case 'inoutCome':
	        this.currentMode ='5'
	        this.legendData=['','收入','支出','','']
	        this.currentTitlefReport ='本月收支'
	        this.currentTextOfReport ='收支(金额)对照'
	        break
	    case 'transportation':
	        this.currentMode ='6'
	        this.legendData=['','金额','','','']
	        this.currentTitlefReport ='本月运输'
	        this.currentTextOfReport ='运输(金额)对照'
	        break
	      } 
	  	//存储当前选择数据
	  	if(!!sourceData&& Array.isArray(sourceData)){
	  		this.$store.commit('setTempChartData',sourceData)
	  	}
	  	
	  	//跳转到managerDetail.vue页面并传递参数
		this.router.navigate('/pages/manager/managerDetail?type='+type)
	  },
	  /**
	    * @Desc manager 描述 本月收入支出 数据处理
	    * 
	    * @params 参数 集体数据源
	    * 
	    * @author Andy Huang
	    */
	   handleCurrentMonthTransportation(sourceData,type){
	     //debugger
	     if(sourceData.length==0){
	       return ''
	     }
	     switch(type){
	         case 'TranFee_Amount':
	         return sourceData.slice(-2,-1)[0].TranFee_Amount //月累计 倒数第二个数据 支出金额
	           case 'TranFee_Amount_avg':
	         return sourceData.slice(-1)[0].TranFee_Amount //月平均 倒数第一个数据 
	     }
	   },
	   /**
	    * @Desc manager 描述 本月收入支出 数据处理
	    * 
	    * @params 参数 集体数据源
	    * 
	    * @author Andy Huang
	    */
	   handleCurrentMonthInOutCome(sourceData,type){
	     //debugger
	     if(sourceData.length==0){
	       return ''
	     }
	     switch(type){
	         case 'SPay_Amount':
	         return sourceData.slice(-2,-1)[0].SPay_Amount //月累计 倒数第二个数据 支出金额
	          case 'Gathering_Amount':
	         return sourceData.slice(-2,-1)[0].Gathering_Amount
	           case 'SPay_Amount_avg':
	         return sourceData.slice(-1)[0].SPay_Amount //月平均 倒数第一个数据 
	          case 'Gathering_Amount_avg':
	         return sourceData.slice(1)[0].Gathering_Amount //收入金额 =====备注 修改====
	  
	     }
	   },
	  /**
	    * @Desc manager 描述 本月辅料 数据处理
	    * 
	    * @params 参数 集体数据源
	    * 
	    * @author Andy Huang
	    */
	   handleCurrentMonthSubMaterial(sourceData,type){
	     this.handleCurrentMonthBasePaperByType(sourceData,type)
	   },
	    /**
	    * @Desc manager 描述 本月原纸 数据处理
	    * 
	    * @params 参数 集体数据源
	    * 
	    * @author Andy Huang
	    */
	   handleCurrentMonthBasePaperByType(sourceData,type,index){
	     if(sourceData.length==0){
	       return ''
	     }
	     switch(type){  //入库重量 入库金额 出库重量 出口金额
	         case 'inwt':
	         return sourceData.slice(-2,-1)[0].inwt //月累计 倒数第二个数据
	          case 'inamt':
	         return sourceData.slice(-2,-1)[0].inamt
	          case 'outwt':
	         return sourceData.slice(-2,-1)[0].outwt
	           case 'outamt':
	         return sourceData.slice(-2,-1)[0].outamt
	           case 'inwt_avg':
	         return sourceData.slice(-1)[0].inwt //月平均 倒数第一个数据
	          case 'inamt_avg':
	         return sourceData.slice(-1)[0].inamt
	          case 'outwt_avg':
	         return sourceData.slice(-1)[0].outwt
	           case 'outamt_avg':
	         return sourceData.slice(-1)[0].outamt
	     }
	   },
	   /**
	    * @Desc manager 描述 本月送货 数据处理
	    * 
	    * @params 参数 集体数据源
	    * 
	    * @author Andy Huang
	    */
	   handleCurrentMonthDeliveryByType(sourceData,type){
		   
	     this.handleCurrentMonthOrderByType(sourceData,type)
	   },
	   /**
	    * @Desc manager 描述 本月生产 数据处理
	    * 
	    * @params 参数 集体数据源
	    * 
	    * @author Andy Huang
	    */
	   handleCurrentMonthProductionByType(sourceData,type,index){
	     if(sourceData.length==0){
	       return ''
	     }
		 let data =[]
	     switch(type){
	          case 'Long':
			  data =sourceData.slice(-2,-1)[0].Long //月累计 倒数第二个数据
	         return data
			 break
	          case 'Area':
			   data = sourceData.slice(-2,-1)[0].Area
	         return data
			  break
	          case 'Qty':
			  data = sourceData.slice(-2,-1)[0].Qty
	         return data
			  break
	           case 'Long_avg':
			    data = sourceData.slice(-1)[0].Long //月平均 倒数第一个数据
	         return data
			  break
	          case 'Area_avg':
			   data = sourceData.slice(-1)[0].Area
	         return data
			  break
	          case 'Qty_avg':
			   data = sourceData.slice(-1)[0].Qty
	         return data
			  break
	     }
	   },
	   /**
	    * @Desc manager 描述 本月订单 数据处理
	    * 
	    * @params 参数 集体数据源
	    * 
	    * @author Andy Huang
	    */
	   handleCurrentMonthOrderByType(sourceData,type,index){
		   //debugger
	     if(sourceData.length==0){
	       return ''
	     }
		 let data = []
	     switch(type){
	         case 'Aoumt':
	         return sourceData.slice(-2,-1)[0].Aoumt //月累计 倒数第二个数据
	          case 'Area':
	         return sourceData.slice(-2,-1)[0].Area
	          case 'Qty':
	         return sourceData.slice(-2,-1)[0].Qty
			 break
	           case 'Aoumt_avg':
	         return sourceData.slice(-1)[0].Aoumt //月平均 倒数第一个数据
	          case 'Area_avg':
	         return sourceData.slice(-1)[0].Area
	          case 'Qty_avg':
	         return sourceData.slice(-1)[0].Qty
	     }
	   },
	  /**
	   * @Desc manager 描述 从数据源截取 本月简报 数据
	   * //res Data中7个数组，分别为 订单，生产，送货，原纸，辅料，收支，运输数据
	   * @params 参数 dataList 原始数据源
	   * 
	   * @author Andy Huang
	   */
	    getCurrentBriefReportData(dataList){
	       let _self =this
	        dataList.forEach(item => {
	             _self.currentBriefReport.push(...item.slice(-2,-1)) //获取倒数第二个数据
	        });
	        return  this.currentBriefReport
	    },
	    /**
	     * @Desc manager 描述 获取数据源   //res Data中7个数组，分别为 订单，生产，送货，原纸，辅料，收支，运输数据
	     * 
	     * @params 参数 token
	     * 
	     * @author Andy Huang
	     * 
	     */
	     getDataSource(){
		  // let url = `/warehouse/warehouse/execute/appSpGetFactoryKanban`
		   let url =`/report/appSpGetFactoryKanban`
		   let params ={}
	       let _self =this
		   this.getOrPostDataBy(url,params).then(res=>{
			   //debugger
			   _self.totalReport=res
			   _self.getCurrentBriefReportData(res)
		   })
	     },
		//将数据转换微千分符
	  toThousands(num){
		  if(num==null || num =='' || num ==0){
			return '0.00'
		  }else{
			   return Number(num).toFixed(2)
		  }
		 
		 //  debugger
		 //  let result =''
		 //  num = (num || 0).toString()
				
		 //  while (num.length > 3) {
			//   result = ',' + num.slice(-3) + result
			//   num = num.slice(0, num.length - 3)
		 //  }
		 //  if (num) { result = num + result }
		 //  return result
	  },
	}
};
</script>

<style>
.margin-left-custom {
	margin-left: 8px;
}
.window-bottom{
	height: 100rpx;
}
.marginBottom10{
	margin-bottom: 10rpx;
}
.price-mini-panel{
	margin-bottom: 30rpx;
}

.grid-title{
	display: flex;
	justify-content: space-between;
}
.text-price{
	color:#0081ff;
	font-size: 40rpx;
}
.text-area{
	color:#0081ff;
	font-size: 40rpx;
}

</style>
