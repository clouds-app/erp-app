(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-quotedPrice-matchingQuotation-matchingQuotation"],{1622:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("c8d6")),l=i(n("e4fc")),o=i(n("58be")),c=i(n("ee99")),u={components:{cuCustom:a.default,vTable:l.default},mixins:[o.default],data:function(){return{hiddenLoadMore:!0,tableHeight:0,contentText:{contentdown:"点击显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},dataColumns:[{$fixed:"left",key:"Serial",title:"序号",$width:80},{key:"spaper",title:"纸质",$width:140,titleAlign:"center",columnAlign:"right"},{key:"sam_addFaceamount",title:"面纸",$width:140,titleAlign:"center",columnAlign:"right"},{key:"sam_addBotamount",title:"底纸",$width:140,titleAlign:"center",columnAlign:"right"},{key:"sam_addAamount",title:"A坑",$width:140,titleAlign:"center",columnAlign:"right"},{key:"sam_addBamount",title:"B坑",$width:140,titleAlign:"center",columnAlign:"right"},{key:"sam_addCamount",title:"C坑",$width:140,titleAlign:"center",columnAlign:"right"},{key:"sam_addqkamount",title:"E坑",$width:140,titleAlign:"center",columnAlign:"right"},{key:"sam_addFamount",title:"F坑",$width:140,titleAlign:"center",columnAlign:"right"}],dataTableList:[]}},onReady:function(){this.calTableHeight(),this.getdataTableList()},methods:{getdataTableList:function(){var t=this,e={Mode:1,UserID:this.userInfo.erpUserCode};this.toast.loading(),c.default.post("/proc/execute/appSpPhoneArtPriceQuery",e).then((function(e){t.toast.hide(),t.dataTableList=t.handleList(e.list)})).catch((function(e){t.toast.hide(),t.toast.message(e)}))},handleList:function(t){for(var e=0;e<t.length;e++)t[e].Serial=e+1;return t},calTableHeight:function(){var t=this;this.$nextTick((function(){setTimeout((function(){var e=t.setTableHeight(!0);t.tableHeight=e}),200)}))}}};e.default=u},aea1:function(t,e,n){"use strict";n.r(e);var i=n("f9f0"),a=n("f513");for(var l in a)"default"!==l&&function(t){n.d(e,t,(function(){return a[t]}))}(l);var o,c=n("f0c5"),u=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"4cbdcbc2",null,!1,i["a"],o);e["default"]=u.exports},f513:function(t,e,n){"use strict";n.r(e);var i=n("1622"),a=n.n(i);for(var l in i)"default"!==l&&function(t){n.d(e,t,(function(){return i[t]}))}(l);e["default"]=a.a},f9f0:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return l})),n.d(e,"a",(function(){return i}));var i={uniLoadMore:n("bcd3").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("cu-custom",{attrs:{bgColor:"bg-gradual-blue",isBack:!0}},[n("template",{attrs:{slot:"content"},slot:"content"},[t._v("配纸报价")])],2),n("v-uni-view",{staticClass:"vtable"},[n("v-table",{attrs:{"row-class-name":t.rowClassNameFn,columns:t.dataColumns,list:t.dataTableList,selection:"single","td-width":134,fixedMultipleLeft:!0}})],1),n("v-uni-view",{staticClass:"flex border-top",staticStyle:{height:"15rpx"}},[n("v-uni-view",{staticClass:"flex-sub"},[n("v-uni-view",{staticClass:"cu-form-group"},[t.hiddenLoadMore?t._e():n("uni-load-more",{attrs:{contentText:t.contentText,status:t.more},on:{clickLoadMore:function(e){arguments[0]=e=t.$handleEvent(e),t.clickLoadMore.apply(void 0,arguments)}}})],1)],1)],1)],1)},l=[]}}]);