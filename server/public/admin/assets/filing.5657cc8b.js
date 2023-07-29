import{_ as y}from"./index.f9197633.js";import{B as k,C as V,w as A,D as x,M as U}from"./element-plus.6ae56789.js";import{b as N,f as I}from"./index.9ffd2ade.js";import{_ as L}from"./index.d607c7e6.js";import{g as M,s as T}from"./website.7f128ab0.js";import{d as f,r as $,ar as O,o as n,c as _,V as e,M as o,O as P,L as d,W as S,aa as W,a as t,T as F}from"./@vue.581f5ce0.js";import"./vue-drag-resize.3665149e.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";const j={class:"website-filing"},q=t("div",{class:"mb-5"},"\u7AD9\u70B9\u5E95\u90E8\u7248\u6743\u5907\u6848\u4FE1\u606F\u8BBE\u7F6E",-1),z={class:"py-4 bg-fill-lighter"},G={class:"w-80"},H={class:"w-80"},J=t("div",{class:"form-tips"},"\u8DF3\u8F6C\u94FE\u63A5\u4E0D\u8BBE\u7F6E\uFF0C\u5219\u4E0D\u8DF3\u8F6C",-1),K=F(" \u6DFB\u52A0 "),Q=F("\u4FDD\u5B58"),R=f({name:"webFilling"}),$e=f({...R,setup(X){const l=$([{key:"",value:""}]),r=async()=>{const a=await M();!a.length||(l.value=a)},h=()=>{l.value.push({key:"",value:""})},v=a=>{if(l.value.length<=1)return I.msgError("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A");l.value.splice(a,1)},E=async()=>{await T({config:l.value}),r()};return r(),(a,Y)=>{const i=k,p=V,g=L,w=N,m=A,D=x,b=U,C=y,B=O("perms");return n(),_("div",j,[e(b,{shadow:"never",class:"!border-none"},{default:o(()=>[q,e(D,{ref:"form",class:"ls-form","label-width":"100px"},{default:o(()=>[(n(!0),_(S,null,W(l.value,(s,c)=>(n(),d(g,{class:"mb-4",key:c,"show-close":l.value.length>1,onClose:u=>v(c)},{default:o(()=>[t("div",z,[e(p,{label:"\u663E\u793A\u540D\u79F0",prop:"icp_link"},{default:o(()=>[t("div",G,[t("div",null,[e(i,{modelValue:s.key,"onUpdate:modelValue":u=>s.key=u,placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue","onUpdate:modelValue"])])])]),_:2},1024),e(p,{label:"\u8DF3\u8F6C\u94FE\u63A5",prop:"icp_link"},{default:o(()=>[t("div",H,[t("div",null,[e(i,{modelValue:s.value,"onUpdate:modelValue":u=>s.value=u,placeholder:"\u8BF7\u8F93\u5165\u94FE\u63A5\uFF0C\u4F8B\u5982\uFF1Ahttp://www.beian.gov.cn"},null,8,["modelValue","onUpdate:modelValue"])]),J])]),_:2},1024)])]),_:2},1032,["show-close","onClose"]))),128)),t("div",null,[e(m,{type:"primary",onClick:h},{default:o(()=>[e(w,{name:"el-icon-Plus"}),K]),_:1})])]),_:1},512)]),_:1}),P((n(),d(C,null,{default:o(()=>[e(m,{type:"primary",onClick:E},{default:o(()=>[Q]),_:1})]),_:1})),[[B,["setting.web.web_setting/setCopyright"]]])])}}});export{$e as default};