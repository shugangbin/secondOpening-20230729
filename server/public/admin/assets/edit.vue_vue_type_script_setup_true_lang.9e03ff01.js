import{L as V,C as x,B as h,v as C,t as y,D as R}from"./element-plus.6ae56789.js";import{a as k,b as A}from"./role.6174c95a.js";import{P as D}from"./index.e9e37d9e.js";import{d as g,s as d,r as I,e as S,_ as U,o as N,c as P,V as l,M as u,u as q}from"./@vue.581f5ce0.js";const z={class:"edit-popup"},K=g({__name:"edit",emits:["success","close"],setup(L,{expose:c,emit:m}){const p=d(),n=d(),r=I("add"),i=S(()=>r.value=="edit"?"\u7F16\u8F91\u95EE\u9898\u793A\u4F8B":"\u65B0\u589E\u95EE\u9898\u793A\u4F8B"),o=U({id:"",name:"",desc:"",sort:0,menu_id:[]}),_={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:["blur"]}]},f=async()=>{var t,e;await((t=p.value)==null?void 0:t.validate()),r.value=="edit"?await k(o):await A(o),(e=n.value)==null||e.close(),m("success")},E=()=>{m("close")};return c({open:(t="add")=>{var e;r.value=t,(e=n.value)==null||e.open()},setFormData:async t=>{for(const e in o)t[e]!=null&&t[e]!=null&&(o[e]=t[e])}}),(t,e)=>{const F=V,s=x,v=h,B=C,w=y,b=R;return N(),P("div",z,[l(D,{ref_key:"popupRef",ref:n,title:q(i),async:!0,width:"550px",onConfirm:f,onClose:E},{default:u(()=>[l(b,{class:"ls-form",ref_key:"formRef",ref:p,rules:_,model:o,"label-width":"90px"},{default:u(()=>[l(s,{label:"\u793A\u4F8B\u7C7B\u76EE",prop:"name"},{default:u(()=>[l(F,{class:"w-full",placeholder:"\u8BF7\u9009\u62E9"})]),_:1}),l(s,{label:"\u793A\u4F8B\u5185\u5BB9",prop:"name"},{default:u(()=>[l(v,{modelValue:o.desc,"onUpdate:modelValue":e[0]||(e[0]=a=>o.desc=a),type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"\u8BF7\u8F93\u5165\u5907\u6CE8",maxlength:"200","show-word-limit":""},null,8,["modelValue"])]),_:1}),l(s,{label:"\u6392\u5E8F",prop:"sort"},{default:u(()=>[l(B,{modelValue:o.sort,"onUpdate:modelValue":e[1]||(e[1]=a=>o.sort=a),min:0,max:9999},null,8,["modelValue"])]),_:1}),l(s,{label:"\u72B6\u6001",prop:"sort"},{default:u(()=>[l(w,{modelValue:o.disable,"onUpdate:modelValue":e[2]||(e[2]=a=>o.disable=a),"active-value":0,"inactive-value":1},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["title"])])}}});export{K as _};
