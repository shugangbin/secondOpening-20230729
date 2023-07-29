import{_ as y}from"./index.f9197633.js";import{G as C,H as v,C as b,B as V,D as w,M as x,w as I}from"./element-plus.6ae56789.js";import{d as k,e as P}from"./pay.650adf54.js";import{d as _,_ as S,ar as N,o as m,c as O,V as e,M as t,O as R,L as A,a as r,T as i}from"./@vue.581f5ce0.js";import"./vue-drag-resize.3665149e.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.9ffd2ade.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";const G={class:"hot-search"},M=r("span",{class:"text-lg font-bold"},"\u652F\u4ED8\u8BBE\u7F6E",-1),T=i("\u5141\u8BB8\u652F\u4ED8"),U=i("\u4E0D\u5141\u8BB8\u652F\u4ED8"),H=r("div",{class:"form-tips mt-0"},"\u8BE5\u8BBE\u7F6E\u4EC5\u5BF9IOS\u7CFB\u7EDF\u6709\u6548",-1),L=i("\u4FDD\u5B58"),j=_({name:"paySetup"}),Io=_({...j,setup(q){const o=S({is_open:1,tips:""}),c=a=>{a==1?o.tips="\u7ACB\u5373\u652F\u4ED8":o.tips="\u7531\u4E8E\u76F8\u5173\u89C4\u8303IOS\u6682\u4E0D\u652F\u6301\u8D2D\u4E70"},n=async()=>{try{const a=await k();for(const s in o)o[s]=a[s]}catch(a){console.log("\u83B7\u53D6=>",a)}},d=async()=>{try{await P(o),n()}catch(a){console.log("\u4FDD\u5B58=>",a)}};return n(),(a,s)=>{const l=C,f=v,p=b,E=V,B=w,D=x,F=I,h=y,g=N("perms");return m(),O("div",G,[e(D,{class:"!border-none",shadow:"never"},{header:t(()=>[M]),default:t(()=>[e(B,{ref:"formRef",model:o,"label-width":"100px"},{default:t(()=>[e(p,{label:"ios\u652F\u4ED8\u529F\u80FD"},{default:t(()=>[r("div",null,[e(f,{modelValue:o.is_open,"onUpdate:modelValue":s[0]||(s[0]=u=>o.is_open=u),onChange:c},{default:t(()=>[e(l,{label:1},{default:t(()=>[T]),_:1}),e(l,{label:0},{default:t(()=>[U]),_:1})]),_:1},8,["modelValue"]),H])]),_:1}),e(p,{label:"\u6309\u94AE\u6587\u5B57"},{default:t(()=>[r("div",null,[e(E,{class:"w-[280px]",modelValue:o.tips,"onUpdate:modelValue":s[1]||(s[1]=u=>o.tips=u),placeholder:"\u8BF7\u8F93\u5165",clearable:!0},null,8,["modelValue"])])]),_:1})]),_:1},8,["model"])]),_:1}),R((m(),A(h,null,{default:t(()=>[e(F,{type:"primary",onClick:d},{default:t(()=>[L]),_:1})]),_:1})),[[g,["setting.pay.PayConfig/setIosPayConfig"]]])])}}});export{Io as default};