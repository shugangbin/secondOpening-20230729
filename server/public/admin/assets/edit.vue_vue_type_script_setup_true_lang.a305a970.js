import{L as x,C as A,B as h,t as L,D as P,K as R}from"./element-plus.6ae56789.js";import{a as K,e as M,b as S}from"./ai_key.0a6517c5.js";import{P as D}from"./index.e9e37d9e.js";import{f as U}from"./index.9ffd2ade.js";import{d as I,s as y,r as d,o as m,c as k,V as t,M as s,W as O,aa as j,L as q}from"./@vue.581f5ce0.js";const N={class:"edit-popup"},Q=I({__name:"edit",emits:["success"],setup(T,{expose:B,emit:w}){const f=y(),c=y(),p=d(""),_=d([]),a=d({id:"",type:"",ai_key:"",key:"",status:1}),b={key:[{required:!0,message:"\u8BF7\u8F93\u5165api\u5BC6\u94A5",trigger:["blur"]}]},C=async()=>{var l,e;try{await((l=f.value)==null?void 0:l.validate()),a.value.id==""?await K(a.value):a.value.id!=""&&await M(a.value),U.msgSuccess("\u64CD\u4F5C\u6210\u529F"),w("success"),(e=c.value)==null||e.close()}catch(n){return n}},F=(l,e,n)=>{var r;e=="add"?(a.value={id:"",type:l,ai_key:"",key:"",status:1},p.value="\u65B0\u589E\u5BC6\u94A5"):e=="edit"&&(Object.keys(a.value).map(u=>{var i;a.value[u]=(i=n[u])!=null?i:0}),a.value.type=l,p.value="\u7F16\u8F91\u5BC6\u94A5"),(r=c.value)==null||r.open(),V(l)},V=async l=>{try{const e=await S({type:l});_.value=e}catch(e){console.log(e)}};return B({open:F}),(l,e)=>{const n=R,r=x,u=A,i=h,E=L,g=P;return m(),k("div",N,[t(D,{ref_key:"popupRef",ref:c,title:p.value,async:!0,width:"550px",onConfirm:C},{default:s(()=>[t(g,{class:"ls-form",ref_key:"formRef",ref:f,rules:b,model:a.value,"label-width":"90px"},{default:s(()=>[t(u,{label:"\u63A5\u53E3\u7C7B\u578B"},{default:s(()=>[t(r,{class:"w-[330px]",modelValue:a.value.ai_key,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value.ai_key=o)},{default:s(()=>[(m(!0),k(O,null,j(_.value,(o,v)=>(m(),q(n,{key:v,label:o,value:v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(u,{label:"api\u5BC6\u94A5",prop:"key"},{default:s(()=>[t(i,{class:"w-[330px]",modelValue:a.value.key,"onUpdate:modelValue":e[1]||(e[1]=o=>a.value.key=o),placeholder:"\u8BF7\u8F93\u5165api\u5BC6\u94A5",rows:4,type:"textarea",clearable:""},null,8,["modelValue"])]),_:1}),t(u,{label:"\u72B6\u6001"},{default:s(()=>[t(E,{modelValue:a.value.status,"onUpdate:modelValue":e[2]||(e[2]=o=>a.value.status=o),"active-value":1,"inactive-value":0},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["title"])])}}});export{Q as _};
