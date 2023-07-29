import{_ as b}from"./index.f9197633.js";import{t as h,C as w,G as g,H as k,B as y,D as U,M as x,w as N}from"./element-plus.6ae56789.js";import{j as S,s as R}from"./distribution.d3416ada.js";import{d as E,r as G,ar as I,o as d,c as _,V as o,M as u,O as M,L as F,a as l,S as m,T as i}from"./@vue.581f5ce0.js";import"./vue-drag-resize.3665149e.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.9ffd2ade.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";const T={class:"user-setup"},j=l("div",{class:"font-medium mb-7"},"\u5206\u9500\u8BBE\u7F6E",-1),H=l("div",{class:"form-tips"},"\u5173\u95ED\u5206\u9500\u529F\u80FD\u65F6\uFF0C\u4E0D\u4F1A\u4EA7\u751F\u65B0\u7684\u5206\u9500\u4F63\u91D1",-1),L=i("\u65E0\u6761\u4EF6"),O=i("\u7533\u8BF7\u5206\u9500"),q={key:0,class:"form-tips"},z={key:1,class:"form-tips"},J=i("\u5F00\u542F"),K=i("\u5173\u95ED"),P=l("div",{class:"form-tips"},"\u7528\u6237\u63D0\u4EA4\u5206\u9500\u7533\u8BF7\u540E\uFF0C\u65E0\u9700\u5BA1\u6838\uFF0C\u81EA\u52A8\u901A\u8FC7",-1),Q=i("\u4E00\u7EA7\u5206\u9500"),W=i("\u4E8C\u7EA7\u5206\u9500"),X=l("div",{class:"form-tips"}," \u5141\u8BB8\u53D1\u653E\u4F63\u91D1\u7684\u5206\u9500\u5C42\u7EA7\uFF0C\u7B49\u7EA7\u9ED8\u8BA4\u4F63\u91D1\u6BD4\u4F8B\u5728 \u5206\u9500\u7B49\u7EA7 \u8FDB\u884C\u8BBE\u7F6E ",-1),Y=i("%"),Z=l("div",{class:"form-tips"},"\u586B0~100\u4E4B\u95F4\u7684\u6570\u5B57",-1),$=i("%"),uu=l("div",{class:"form-tips"},"\u586B0~100\u4E4B\u95F4\u7684\u6570\u5B57",-1),ou=i("\u4FDD\u5B58"),eu=E({name:"userSetup"}),Ou=E({...eu,setup(tu){const e=G({is_open:"",condition:2,auto_audit:0,level:2,first_ratio:"",second_ratio:""}),p=async()=>{e.value=await S()},f=async()=>{await R(e.value),p()};return p(),(lu,t)=>{const B=h,s=w,n=g,r=k,c=y,v=U,C=x,A=N,D=b,V=I("perms");return d(),_("div",T,[o(C,{shadow:"never",class:"!border-none"},{default:u(()=>[j,o(v,{ref:"formRef",model:e.value,"label-width":"120px"},{default:u(()=>[o(s,{label:"\u529F\u80FD\u72B6\u6001"},{default:u(()=>[l("div",null,[o(B,{modelValue:e.value.is_open,"onUpdate:modelValue":t[0]||(t[0]=a=>e.value.is_open=a),"active-value":1,"inactive-value":0},null,8,["modelValue"]),H])]),_:1}),o(s,{label:"\u5206\u9500\u6761\u4EF6"},{default:u(()=>[l("div",null,[o(r,{modelValue:e.value.condition,"onUpdate:modelValue":t[1]||(t[1]=a=>e.value.condition=a),class:"ml-4"},{default:u(()=>[o(n,{label:1},{default:u(()=>[L]),_:1}),o(n,{label:2},{default:u(()=>[O]),_:1})]),_:1},8,["modelValue"]),e.value.condition==1?(d(),_("div",q," \u65E0\u9700\u7528\u6237\u63D0\u4EA4\u5206\u9500\u7533\u8BF7\uFF0C\u5168\u90E8\u7528\u6237\u90FD\u662F\u5206\u9500\u5546\uFF1B\u4EC5\u5BF9\u65B0\u6CE8\u518C\u7684\u7528\u6237\u751F\u6548\uFF0C\u65E7\u7684\u7528\u6237\u9ED8\u8BA4\u4E3A\u7533\u8BF7\u5206\u9500 ")):m("",!0),e.value.condition==2?(d(),_("div",z," \u7528\u6237\u9700\u8981\u63D0\u4EA4\u5206\u9500\u7533\u8BF7\uFF0C\u540E\u53F0\u901A\u8FC7\u540E\u6210\u4E3A\u5206\u9500\u5546\uFF1B\u4EC5\u5BF9\u65B0\u6CE8\u518C\u7684\u7528\u6237\u751F\u6548 ")):m("",!0)])]),_:1}),e.value.condition==2?(d(),F(s,{key:0,label:"\u81EA\u52A8\u901A\u8FC7\u5BA1\u6838"},{default:u(()=>[l("div",null,[o(r,{modelValue:e.value.auto_audit,"onUpdate:modelValue":t[2]||(t[2]=a=>e.value.auto_audit=a),class:"ml-4"},{default:u(()=>[o(n,{label:1},{default:u(()=>[J]),_:1}),o(n,{label:0},{default:u(()=>[K]),_:1})]),_:1},8,["modelValue"]),P])]),_:1})):m("",!0),o(s,{label:"\u5206\u9500\u5C42\u7EA7"},{default:u(()=>[l("div",null,[o(r,{modelValue:e.value.level,"onUpdate:modelValue":t[3]||(t[3]=a=>e.value.level=a),class:"ml-4"},{default:u(()=>[o(n,{label:1},{default:u(()=>[Q]),_:1}),o(n,{label:2},{default:u(()=>[W]),_:1})]),_:1},8,["modelValue"]),X])]),_:1}),o(s,{label:"\u4E00\u7EA7\u5206\u4F63\u6BD4\u4F8B"},{default:u(()=>[l("div",null,[o(c,{placeholder:"\u8BF7\u8F93\u5165",modelValue:e.value.first_ratio,"onUpdate:modelValue":t[4]||(t[4]=a=>e.value.first_ratio=a)},{append:u(()=>[Y]),_:1},8,["modelValue"]),Z])]),_:1}),o(s,{label:"\u4E8C\u7EA7\u5206\u4F63\u6BD4\u4F8B"},{default:u(()=>[l("div",null,[o(c,{placeholder:"\u8BF7\u8F93\u5165",modelValue:e.value.second_ratio,"onUpdate:modelValue":t[5]||(t[5]=a=>e.value.second_ratio=a)},{append:u(()=>[$]),_:1},8,["modelValue"]),uu])]),_:1})]),_:1},8,["model"])]),_:1}),M((d(),F(D,null,{default:u(()=>[o(A,{type:"primary",onClick:f},{default:u(()=>[ou]),_:1})]),_:1})),[[V,["distribution.config/setConfig"]]])])}}});export{Ou as default};