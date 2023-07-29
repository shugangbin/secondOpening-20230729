import{_ as e}from"./page-meta.e1766212.js";import{_ as t,bS as o,aB as l,a,b as i,o as n,e as r,f as s,g as u,j as c,y as p,n as d,h as m,t as y,k as f,K as h,i as g,F as S,l as x,aj as b,ak as _,R as C,d as v,x as k,r as z,c as w,u as I}from"./index-5fd89c82.js";import{_ as B}from"./u-icon.a1449c4b.js";import{_ as M}from"./u-input.89121eb6.js";import{_ as $}from"./u-button.ea6057e5.js";import{_ as j}from"./u-popup.f70e8582.js";import{_ as N}from"./tabbar.vue_vue_type_script_setup_true_lang.f97ce269.js";import{u as T}from"./useCopy.dbed25b8.js";import{u as P}from"./useLockFn.b0443122.js";import"./emitter.1571a5d9.js";import"./u-badge.c3ab894f.js";const L=t({emits:["close","getMore"],props:{list:{type:Array,default:()=>[]},type:{type:String,default:"warning"},volumeIcon:{type:Boolean,default:!0},moreIcon:{type:Boolean,default:!1},closeIcon:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!0},color:{type:String,default:""},bgColor:{type:String,default:""},show:{type:Boolean,default:!0},fontSize:{type:[Number,String],default:26},volumeSize:{type:[Number,String],default:34},speed:{type:[Number,String],default:160},playState:{type:String,default:"play"},padding:{type:[Number,String],default:"18rpx 24rpx"}},data:()=>({textWidth:0,boxWidth:0,animationDuration:"10s",animationPlayState:"paused",showText:""}),watch:{list:{immediate:!0,handler(e){this.showText=e.join("，"),this.$nextTick((()=>{this.initSize()}))}},playState(e){this.animationPlayState="play"==e?"running":"paused"},speed(e){this.initSize()}},computed:{computeColor(){return this.color?this.color:"none"==this.type?"#606266":this.type},textStyle(){let e={};return this.color?e.color=this.color:"none"==this.type&&(e.color="#606266"),e.fontSize=this.fontSize+"rpx",e},computeBgColor(){return this.bgColor?this.bgColor:"none"==this.type?"transparent":void 0}},mounted(){this.$nextTick((()=>{this.initSize()}))},methods:{initSize(){let e=[],t=new Promise(((e,t)=>{o().in(this).select("#u-notice-content").boundingClientRect().exec((t=>{this.textWidth=t[0].width,e()}))}));e.push(t),Promise.all(e).then((()=>{this.animationDuration=this.textWidth/l(this.speed)+"s",this.animationPlayState="paused",setTimeout((()=>{"play"==this.playState&&this.autoplay&&(this.animationPlayState="running")}),10)}))},click(e){this.$emit("click")},close(){this.$emit("close")},getMore(){this.$emit("getMore")}}},[["render",function(e,t,o,l,g,S){const x=a(i("u-icon"),B),b=f,_=h;return o.show?(n(),r(b,{key:0,class:d(["u-notice-bar",[o.type?`u-type-${o.type}-light-bg`:""]]),style:p({background:S.computeBgColor,padding:o.padding})},{default:s((()=>[u(b,{class:"u-direction-row"},{default:s((()=>[u(b,{class:"u-icon-wrap"},{default:s((()=>[o.volumeIcon?(n(),r(x,{key:0,class:"u-left-icon",name:"volume-fill",size:o.volumeSize,color:S.computeColor},null,8,["size","color"])):c("v-if",!0)])),_:1}),u(b,{class:"u-notice-box",id:"u-notice-box"},{default:s((()=>[u(b,{class:"u-notice-content",id:"u-notice-content",style:p({animationDuration:g.animationDuration,animationPlayState:g.animationPlayState})},{default:s((()=>[u(_,{class:d(["u-notice-text",["u-type-"+o.type]]),onClick:S.click,style:p([S.textStyle])},{default:s((()=>[m(y(g.showText),1)])),_:1},8,["onClick","style","class"])])),_:1},8,["style"])])),_:1}),u(b,{class:"u-icon-wrap"},{default:s((()=>[o.moreIcon?(n(),r(x,{key:0,onClick:S.getMore,class:"u-right-icon",name:"arrow-right",size:26,color:S.computeColor},null,8,["onClick","color"])):c("v-if",!0),o.closeIcon?(n(),r(x,{key:1,onClick:S.close,class:"u-right-icon",name:"close",size:24,color:S.computeColor},null,8,["onClick","color"])):c("v-if",!0)])),_:1})])),_:1})])),_:1},8,["style","class"])):c("v-if",!0)}],["__scopeId","data-v-ffca9182"]]);const V=t({emits:["close","getMore","end"],props:{list:{type:Array,default:()=>[]},type:{type:String,default:"warning"},volumeIcon:{type:Boolean,default:!0},moreIcon:{type:Boolean,default:!1},closeIcon:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!0},color:{type:String,default:""},bgColor:{type:String,default:""},direction:{type:String,default:"row"},show:{type:Boolean,default:!0},fontSize:{type:[Number,String],default:26},duration:{type:[Number,String],default:2e3},volumeSize:{type:[Number,String],default:34},speed:{type:Number,default:160},isCircular:{type:Boolean,default:!0},mode:{type:String,default:"horizontal"},playState:{type:String,default:"play"},disableTouch:{type:Boolean,default:!0},padding:{type:[Number,String],default:"18rpx 24rpx"}},computed:{computeColor(){return this.color?this.color:"none"==this.type?"#606266":this.type},textStyle(){let e={};return this.color?e.color=this.color:"none"==this.type&&(e.color="#606266"),e.fontSize=this.fontSize+"rpx",e},vertical(){return"horizontal"!=this.mode},computeBgColor(){return this.bgColor?this.bgColor:"none"==this.type?"transparent":void 0}},data:()=>({}),methods:{click(e){this.$emit("click",e)},close(){this.$emit("close")},getMore(){this.$emit("getMore")},change(e){e.detail.current==this.list.length-1&&this.$emit("end")}}},[["render",function(e,t,o,l,h,C){const v=a(i("u-icon"),B),k=f,z=b,w=_;return n(),r(k,{class:d(["u-notice-bar",[o.type?`u-type-${o.type}-light-bg`:""]]),style:p({background:C.computeBgColor,padding:o.padding})},{default:s((()=>[u(k,{class:"u-icon-wrap"},{default:s((()=>[o.volumeIcon?(n(),r(v,{key:0,class:"u-left-icon",name:"volume-fill",size:o.volumeSize,color:C.computeColor},null,8,["size","color"])):c("v-if",!0)])),_:1}),u(w,{"disable-touch":o.disableTouch,onChange:C.change,autoplay:o.autoplay&&"play"==o.playState,vertical:C.vertical,circular:"",interval:o.duration,class:"u-swiper"},{default:s((()=>[(n(!0),g(S,null,x(o.list,((e,t)=>(n(),r(z,{key:t,class:"u-swiper-item"},{default:s((()=>[u(k,{class:d(["u-news-item u-line-1",["u-type-"+o.type]]),style:p([C.textStyle]),onClick:e=>C.click(t)},{default:s((()=>[m(y(e),1)])),_:2},1032,["style","onClick","class"])])),_:2},1024)))),128))])),_:1},8,["disable-touch","onChange","autoplay","vertical","interval"]),u(k,{class:"u-icon-wrap"},{default:s((()=>[o.moreIcon?(n(),r(v,{key:0,onClick:C.getMore,class:"u-right-icon",name:"arrow-right",size:26,color:C.computeColor},null,8,["onClick","color"])):c("v-if",!0),o.closeIcon?(n(),r(v,{key:1,onClick:C.close,class:"u-right-icon",name:"close",size:24,color:C.computeColor},null,8,["onClick","color"])):c("v-if",!0)])),_:1})])),_:1},8,["style","class"])}],["__scopeId","data-v-64b50c9f"]]);const G=t({name:"u-notice-bar",emits:["click","close","getMore","end"],props:{list:{type:Array,default:()=>[]},type:{type:String,default:"warning"},volumeIcon:{type:Boolean,default:!0},volumeSize:{type:[Number,String],default:34},moreIcon:{type:Boolean,default:!1},closeIcon:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!0},color:{type:String,default:""},bgColor:{type:String,default:""},mode:{type:String,default:"horizontal"},show:{type:Boolean,default:!0},fontSize:{type:[Number,String],default:28},duration:{type:[Number,String],default:2e3},speed:{type:[Number,String],default:160},isCircular:{type:Boolean,default:!0},playState:{type:String,default:"play"},disableTouch:{type:Boolean,default:!0},borderRadius:{type:[Number,String],default:0},padding:{type:[Number,String],default:"18rpx 24rpx"},noListHidden:{type:Boolean,default:!0}},computed:{isShow(){return 0!=this.show&&(1!=this.noListHidden||0!=this.list.length)}},methods:{click(e){this.$emit("click",e)},close(){this.$emit("close")},getMore(){this.$emit("getMore")},end(){this.$emit("end")}}},[["render",function(e,t,o,l,u,d){const m=a(i("u-row-notice"),L),y=a(i("u-column-notice"),V),h=f;return d.isShow?(n(),r(h,{key:0,class:"u-notice-bar-wrap",style:p({borderRadius:o.borderRadius+"rpx"})},{default:s((()=>["horizontal"==o.mode&&o.isCircular?(n(),r(m,{key:0,type:o.type,color:o.color,bgColor:o.bgColor,list:o.list,volumeIcon:o.volumeIcon,moreIcon:o.moreIcon,volumeSize:o.volumeSize,closeIcon:o.closeIcon,mode:o.mode,fontSize:o.fontSize,speed:o.speed,playState:o.playState,padding:o.padding,onGetMore:d.getMore,onClose:d.close,onClick:d.click},null,8,["type","color","bgColor","list","volumeIcon","moreIcon","volumeSize","closeIcon","mode","fontSize","speed","playState","padding","onGetMore","onClose","onClick"])):c("v-if",!0),"vertical"==o.mode||"horizontal"==o.mode&&!o.isCircular?(n(),r(y,{key:1,type:o.type,color:o.color,bgColor:o.bgColor,list:o.list,volumeIcon:o.volumeIcon,moreIcon:o.moreIcon,closeIcon:o.closeIcon,mode:o.mode,volumeSize:o.volumeSize,"disable-touch":o.disableTouch,fontSize:o.fontSize,duration:o.duration,playState:o.playState,padding:o.padding,onGetMore:d.getMore,onClose:d.close,onClick:d.click,onEnd:d.end},null,8,["type","color","bgColor","list","volumeIcon","moreIcon","closeIcon","mode","volumeSize","disable-touch","fontSize","duration","playState","padding","onGetMore","onClose","onClick","onEnd"])):c("v-if",!0)])),_:1},8,["style"])):c("v-if",!0)}],["__scopeId","data-v-0b852cff"]]);const R=v({__name:"redeem_code",setup(t){const o=k(),l=z(""),p=z(!1),d=z({content:"",failure_time:"",id:"",sn:"",type:"",type_desc:""}),x=w((()=>o.getCardCodeConfig)),{isLock:b,lockFn:_}=P((async()=>{try{const e=await function(e){return C.get({url:"/cardCode/checkCard",data:e})}({sn:l.value});p.value=!0,d.value=e}catch(e){l.value="",console.log("查询卡密失败=>",e)}})),{isLock:v,lockFn:B}=P((async()=>{try{await(e={sn:l.value},C.post({url:"/cardCode/useCard",data:e})),p.value=!1,uni.$u.toast("兑换成功"),l.value=""}catch(t){console.log("兑换卡密失败=>",t)}var e}));return(t,o)=>{const C=a(i("page-meta"),e),k=f,z=a(i("u-notice-bar"),G),w=a(i("u-input"),M),P=a(i("u-button"),$),L=h,V=a(i("u-popup"),j),R=a(i("tabbar"),N);return n(),g(S,null,[u(C,{"page-style":t.$theme.pageStyle},null,8,["page-style"]),u(k,{class:"redeem-code"},{default:s((()=>[I(x).is_show?(n(),r(k,{key:0,class:"flex justify-between bg-primary-light-9 text-primary px-[24rpx] py-[30rpx]"},{default:s((()=>[u(k,{class:"flex flex-1 pr-[20rpx]"},{default:s((()=>[u(k,{class:"w-[124rpx]"},{default:s((()=>[m("购买链接:")])),_:1}),u(k,{class:"flex-1 w-full"},{default:s((()=>[u(z,{padding:"0","bg-color":"none",mode:"horizontal","close-icon":!1,"volume-icon":!1,color:t.$theme.primaryColor,list:[I(x).buy_site]},null,8,["color","list"])])),_:1})])),_:1}),u(k,{class:"underline",onClick:o[0]||(o[0]=e=>(e=>{const{copy:t}=T();t(e)})(I(x).buy_site))},{default:s((()=>[m("复制链接")])),_:1})])),_:1})):c("v-if",!0),u(k,{class:"mt-[80rpx] mx-[24rpx] px-[30rpx] py-[50rpx] bg-white rounded"},{default:s((()=>[u(k,{class:"py-[10rpx] px-[20rpx] bg-[#f5f5f5] rounded"},{default:s((()=>[u(w,{modelValue:l.value,"onUpdate:modelValue":o[1]||(o[1]=e=>l.value=e),placeholder:"请输入卡密编号"},null,8,["modelValue"])])),_:1}),u(k,{class:"flex items-center justify-center mt-[30px]"},{default:s((()=>[u(P,{type:"primary",shape:"circle",size:"medium",customStyle:{width:"250rpx",height:"80rpx",fontSize:"30rpx"},loading:I(b),onClick:I(_)},{default:s((()=>[m(" 查询 ")])),_:1},8,["loading","onClick"])])),_:1})])),_:1}),u(V,{modelValue:p.value,"onUpdate:modelValue":o[2]||(o[2]=e=>p.value=e),mode:"center","border-radius":"24"},{default:s((()=>[u(k,{class:"w-[600rpx] px-[24rpx]"},{default:s((()=>[u(k,{class:"p-[30rpx] text-lg text-center font-medium"},{default:s((()=>[m(" 查询结果 ")])),_:1}),u(k,{class:"h-[200rpx] px-[20rpx]"},{default:s((()=>[u(k,{class:"flex mt-[20rpx]"},{default:s((()=>[u(L,null,{default:s((()=>[m("卡密类型：")])),_:1}),u(L,{class:"ml-[20rpx]"},{default:s((()=>[m(y(d.value.type_desc),1)])),_:1})])),_:1}),u(k,{class:"flex mt-[20rpx]"},{default:s((()=>[u(L,null,{default:s((()=>[m("卡密面额：")])),_:1}),u(L,{class:"ml-[20rpx]"},{default:s((()=>[m(y(d.value.content),1)])),_:1})])),_:1}),u(k,{class:"flex mt-[20rpx]"},{default:s((()=>[u(L,null,{default:s((()=>[m("卡密失效时间：")])),_:1}),u(L,{class:"ml-[20rpx]"},{default:s((()=>[m(y(d.value.failure_time),1)])),_:1})])),_:1})])),_:1}),u(k,{class:"py-[30rpx] px-[16rpx] bg-white"},{default:s((()=>[u(P,{type:"primary",shape:"circle",size:"medium",customStyle:{width:"100%",height:"82rpx",fontSize:"30rpx"},loading:I(v),onClick:I(B)},{default:s((()=>[m(" 立即兑换 ")])),_:1},8,["loading","onClick"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),c("    底部导航    "),u(R)])),_:1})],64)}}});export{R as default};
