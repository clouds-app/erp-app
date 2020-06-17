日期时间、省市区选择
引入插件

import wPicker from "@/components/w-picker/w-picker.vue";
export default {
    components:{
        wPicker
    }
}

<w-picker :mode="mode" startYear="2016" endYear="2030" step="1" :defaultVal="defaultVal" :current="true" @confirm="onConfirm" ref="picker" themeColor="#f00" :selectList="selectList"></w-picker>
如需要引入多个相同的mode请使用多个

例如一个页面内可能存在2个相同的 需要选择年月日的, 请按如下调用相同多组件

<w-picker 
    mode="date" 
    startYear="2016" 
    endYear="2030" 
    :defaultVal="defaultVal1" 
    :current="true" 
    @confirm="onConfirm1" 
    ref="picker1" 
    themeColor="#f00" 
    :selectList="selectList1">
</w-picker>
<w-picker 
    mode="date" 
    startYear="2018" 
    endYear="2019" 
    :defaultVal="defaultVal2" 
    :current="true" 
    @confirm="onConfirm2" 
    ref="picker2" 
    themeColor="#f00" 
    :selectList="selectList2">
</w-picker>
mode类型：

half:"年月日上下午"
date:"年月日"
dateTime"年月日时分秒"
yearMonth:"年月"
time："时分秒"
region:"省市区"
selector："单列选择"
limitHour：选择短期日期上下午时段
limit："选择短期日期时间段"
range:"选择日期区间"
显示插件

this.$refs.picker.show();
隐藏

this.$refs.picker.hide();
点击确定

输出选择的值、对应值的下标、结果
参数描述

startYear 开始年份 不传默认1970 对half、date、yearMonth、dateTime、range生效

endYear 结束年份 不传默认当前年份 对half、date、yearMonth、dateTime、range生效

step 分钟间隔步长，非必传，默认为1，仅对dateTime、time生效

defaultVal (Array) 选择初始值:数组例[1,2,3]; 值为索引;
mode=region省市区三级联动，传具体值:defaultVal="['浙江省','杭州市','滨江区']";

@confirm (Fun) 点击确认的回调获取picker结果

themeColor (String) 确认按钮的主题颜色

current (Boolean) 是否默认选中当前时间,使用该字段defaultVal不起效（重要），该字段仅对half、date、yearMonth、dateTime、time、range生效;

disabledAfter (Boolean) 是否禁用当前之后的日期，该字段仅对half、date、yearMonth3个mode生效,其它例如dateTime、time时间每秒都在变动，做此限制无意义;

mode=range(时间段选择例2019-06-08至2019年09-08)；默认值defaultVal为7个值的数组，第四位值0代表中间的分隔符

<w-picker 
    mode="range" 
    startYear="2019" 
    endYear="2030"
    :defaultVal="[0,0,0,0,0,0,0]" 
    :current="true"
    @confirm="onConfirm" 
    ref="range" 
    themeColor="#f00">
</w-picker>
mode=half（年月日上午下午）

<w-picker 
    mode="half" 
    startYear="2019" 
    endYear="2030"
    :defaultVal="[0,0,0,0]" 
    :current="true"
    @confirm="onConfirm" 
    ref="range" 
    themeColor="#f00">
</w-picker>
mode=date（年月日）

<w-picker 
    mode="date" 
    startYear="2019" 
    endYear="2030"
    :defaultVal="[0,0,0]" 
    :current="true"
    @confirm="onConfirm" 
    ref="range" 
    themeColor="#f00">
</w-picker>
mode=yearMonth(年月)

<w-picker 
    mode="yearMonth" 
    startYear="2019" 
    endYear="2030"
    :defaultVal="[0,0]" 
    :current="true"
    @confirm="onConfirm" 
    ref="range" 
    themeColor="#f00">
</w-picker>
mode=dateTime（年月日时分秒）

<w-picker 
    mode="dateTime" 
    startYear="2019" 
    endYear="2030"
    step="1"
    :defaultVal="[1,1,1,1,2,5]" 
    :current="true" 
    @confirm="onConfirm" 
    ref="dateTime" 
    themeColor="#f00">
</w-picker>
mode=time(时间选择)

<w-picker 
    mode="time"
    :defaultVal="[1,1,0]" 
    :current="true"
    step="1"
    @confirm="onConfirm" 
    ref="time" 
    themeColor="#f00">
</w-picker>
mode=limitHour(短期日期上午下午时选择)

<w-picker 
    mode="limitHour" 
    dayStep="60"
    :defaultVal="[0,0,0]"
    @confirm="onConfirm" 
    ref="limitHour" 
    themeColor="#f00">
</w-picker>
参数	取值	备注
defaultVal	默认值：[0,0,0]	此选项默认不可修改
dayStep	默认值：7	当前日期向后推移天数
mode=limit(短期日期时分选择)

<w-picker 
    mode="limit" 
    dayStep="60"
    startHour="8"
    endHour="20"
    minuteStep="5"
    afterStep="30"
    :defaultVal="[0,0,0]"
    @confirm="onConfirm" 
    ref="limit" 
    themeColor="#f00">
</w-picker>
参数	取值	备注
defaultVal	默认值：[0,0,0]	此选项默认不可修改
dayStep	默认值：7	当前日期向后推移天数
startHour	默认值：8	小时开始：0-23
endHour	默认值：20	小时结束：0-23
minuteStep	默认值：10	分钟步长取值：1-59
afterStep	默认值：30	当前时间往后推移多少分钟
mode=region(省市区三级联动)

<w-picker 
    mode="region"
    :defaultVal="['浙江省','杭州市','滨江区']" 
    @confirm="onConfirm" 
    ref="region" 
    themeColor="#f00">
</w-picker>
mode=selector

<w-picker 
    v-if="selectList.length!=0"
    mode="selector" 
    :defaultVal="[1]" 
    @confirm="onConfirm" 
    ref="selector" 
    themeColor="#f00"
    :selectList="selectList">
</w-picker>
参数	取值	备注
selectList		[{label:"",value:""},{label:"",value:""}]
温馨提示：

关于对插件有疑问的，先从自身代码找原因，也可先跑下我的示例，如果是示例确实有bug再联系我，谢谢，都挺忙的
本人写插件的初衷是方便各位有同类需求的朋友，并非自找麻烦，别uni-app怎么用，sass怎么用这类问题都来找我，谢谢合作！
别把插件放在其它组件里面去用，放最外层view下就行，已经有一堆奇葩调用方法整出来的错误，有放swiper里面的,有放v-for里面的，等等！~
<template>
<view>
<w-picker></w-picker>
</view>
</template>