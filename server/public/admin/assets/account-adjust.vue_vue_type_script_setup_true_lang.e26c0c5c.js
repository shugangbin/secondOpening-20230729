import{P as V}from"./index.e9e37d9e.js";import{C as g,G as k,H as x,B as N,D as q}from"./element-plus.6ae56789.js";import{f}from"./index.9ffd2ade.js";import{d as I,s as _,_ as S,e as j,w as F,o as G,L as M,M as o,a as P,V as t,T as r,U as C,u as T}from"./@vue.581f5ce0.js";const U={class:"pr-8"},A=r("\u589E\u52A0\u4F59\u989D"),H=r("\u6263\u51CF\u4F59\u989D"),O=I({__name:"account-adjust",props:{title:{type:String,required:!0},show:{type:Boolean,required:!0},value:{type:[Number,String],required:!0}},emits:["update:show","confirm"],setup(l,{emit:p}){const c=l,s=_(),u=S({action:1,num:"",remark:""}),m=_(),i=j(()=>Number(c.value)+Number(u.num)*(u.action==1?1:-1)),b={num:[{required:!0,message:"\u8BF7\u8F93\u5165\u8C03\u6574\u7684\u6761\u6570"}]},h=e=>{if(e.includes("-"))return f.msgError("\u8BF7\u8F93\u5165\u6B63\u6574\u6570");u.num=e},E=async()=>{var e;await((e=s.value)==null?void 0:e.validate()),p("confirm",u)},v=()=>{var e;p("update:show",!1),(e=s.value)==null||e.resetFields()};return F(()=>c.show,e=>{var n,a;e?(n=m.value)==null||n.open():(a=m.value)==null||a.close()}),F(i,e=>{e<0&&(f.msgError("\u8C03\u6574\u540E\u4F59\u989D\u9700\u5927\u4E8E0"),u.num="")}),(e,n)=>{const a=g,d=k,w=x,D=N,y=q,B=V;return G(),M(B,{ref_key:"popupRef",ref:m,title:l.title,width:"500px",onConfirm:E,async:!0,onClose:v},{default:o(()=>[P("div",U,[t(y,{ref_key:"formRef",ref:s,model:u,"label-width":"120px",rules:b},{default:o(()=>[t(a,{label:"\u5F53\u524D\u4F59\u989D"},{default:o(()=>[r(C(l.value)+"\u6761 ",1)]),_:1}),t(a,{label:"\u4F59\u989D\u589E\u51CF",required:"",prop:"action"},{default:o(()=>[t(w,{modelValue:u.action,"onUpdate:modelValue":n[0]||(n[0]=R=>u.action=R)},{default:o(()=>[t(d,{label:1},{default:o(()=>[A]),_:1}),t(d,{label:2},{default:o(()=>[H]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(a,{label:"\u8C03\u6574\u4F59\u989D",prop:"num"},{default:o(()=>[t(D,{"model-value":u.num,placeholder:"\u8BF7\u8F93\u5165\u8C03\u6574\u7684\u6761\u6570",type:"number",onInput:h},null,8,["model-value"])]),_:1}),t(a,{label:"\u8C03\u6574\u540E\u4F59\u989D"},{default:o(()=>[r(C(T(i))+" \u6761",1)]),_:1})]),_:1},8,["model"])])]),_:1},8,["title"])}}});export{O as _};
