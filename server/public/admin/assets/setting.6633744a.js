import{_ as x}from"./index.f9197633.js";import{t as w,C as E,B as V,D as b,M as C,w as D}from"./element-plus.6ae56789.js";import{a as k,e as A}from"./share.fc8b1e4b.js";import{d as y,r as p,_ as S,ar as N,o as d,c as U,V as o,M as a,a as r,O as q,L as I,W as M,T as R}from"./@vue.581f5ce0.js";import"./vue-drag-resize.3665149e.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.9ffd2ade.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";const T=r("div",{class:"text-xl font-medium mb-[20px]"},"\u5206\u4EAB\u8BBE\u7F6E",-1),L={class:"flex"},O=r("div",{class:"ml-[10px]"},"\u6761",-1),W={class:"flex"},$=r("div",{class:"ml-[10px]"},"\u6B21\u6709\u5956\u52B1",-1),j=R(" \u4FDD\u5B58 "),ke=y({__name:"setting",setup(z){const i=p(),t=p({status:1,rewards:1,max_share:5}),_=S({rewards:[{required:!0,message:"\u8BF7\u8F93\u5165\u5206\u4EAB\u4E00\u6B21\u5956\u52B1\u51E0\u6761",trigger:"blur"}],max_share:[{required:!0,message:"\u8BF7\u8F93\u5165\u6BCF\u5929\u6700\u591A\u5206\u4EAB\u51E0\u6B21\u6570\u6709\u5956\u52B1",trigger:"blur"}]}),m=async()=>{t.value=await k()};m();const c=async l=>{if(!l){console.log(l);return}try{await l.validate(),await A(t.value),await m()}catch(e){console.log(e)}};return(l,e)=>{const v=w,s=E,n=V,B=b,f=C,F=D,g=x,h=N("perms");return d(),U(M,null,[o(f,{shadow:"never",class:"!border-none"},{default:a(()=>[T,o(B,{ref_key:"ruleFormRef",ref:i,rules:_,model:t.value,"label-width":"120px"},{default:a(()=>[o(s,{label:"\u529F\u80FD\u72B6\u6001"},{default:a(()=>[o(v,{modelValue:t.value.status,"onUpdate:modelValue":e[0]||(e[0]=u=>t.value.status=u),"active-value":1,"inactive-value":0},null,8,["modelValue"])]),_:1}),o(s,{label:"\u5206\u4EAB\u4E00\u6B21\u5956\u52B1",prop:"rewards"},{default:a(()=>[r("div",L,[r("div",null,[o(n,{placeholder:"\u8BF7\u8F93\u5165",modelValue:t.value.rewards,"onUpdate:modelValue":e[1]||(e[1]=u=>t.value.rewards=u)},null,8,["modelValue"])]),O])]),_:1}),o(s,{label:"\u6BCF\u5929\u6700\u591A\u5206\u4EAB",prop:"max_share"},{default:a(()=>[r("div",W,[r("div",null,[o(n,{placeholder:"\u8BF7\u8F93\u5165",modelValue:t.value.max_share,"onUpdate:modelValue":e[2]||(e[2]=u=>t.value.max_share=u)},null,8,["modelValue"])]),$])]),_:1})]),_:1},8,["rules","model"])]),_:1}),o(g,null,{default:a(()=>[q((d(),I(F,{type:"primary",onClick:e[3]||(e[3]=u=>c(i.value))},{default:a(()=>[j]),_:1})),[[h,["task.task_share/setConfig"]]])]),_:1})],64)}}});export{ke as default};