import{U as M,F as N,C as O,E as U,D as q,P as H}from"./element-plus.6ae56789.js";import{a as I}from"./role.6174c95a.js";import{P as j}from"./index.e9e37d9e.js";import{t as z}from"./index.9ffd2ade.js";import{m as G}from"./menu.450230e0.js";import{d as J,s as p,r as c,_ as Q,o as v,c as W,V as o,M as u,O as X,L as Y,a as k,n as y}from"./@vue.581f5ce0.js";const Z={class:"edit-popup"},ne=J({__name:"auth",emits:["success","close"],setup($,{expose:C,emit:f}){const a=p(),_=p(),r=p(),x=c(!1),d=c(!0),i=c(!1),h=c([]),m=c([]),s=Q({id:"",name:"",desc:"",sort:0,menu_id:[]}),b={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:["blur"]}]},g=()=>{i.value=!0,G().then(e=>{m.value=e,h.value=z(e),y(()=>{D()}),i.value=!1})},E=()=>{var t,n;const e=(t=a.value)==null?void 0:t.getCheckedKeys(),l=(n=a.value)==null?void 0:n.getHalfCheckedKeys();return e==null||e.unshift.apply(e,l),e},D=()=>{s.menu_id.forEach(e=>{y(()=>{var l;(l=a.value)==null||l.setChecked(e,!0,!1)})})},w=e=>{const l=m.value;for(let t=0;t<l.length;t++)a.value.store.nodesMap[l[t].id].expanded=e},F=e=>{var l,t;e?(l=a.value)==null||l.setCheckedKeys(h.value.map(n=>n.id)):(t=a.value)==null||t.setCheckedKeys([])},A=async()=>{var e,l;await((e=_.value)==null?void 0:e.validate()),s.menu_id=E(),await I(s),(l=r.value)==null||l.close(),f("success")},R=()=>{f("close")},B=()=>{var e;(e=r.value)==null||e.open()},K=async e=>{for(const l in s)e[l]!=null&&e[l]!=null&&(s[l]=e[l])};return g(),C({open:B,setFormData:K}),(e,l)=>{const t=N,n=M,V=O,S=U,T=q,L=H;return v(),W("div",Z,[o(j,{ref_key:"popupRef",ref:r,title:"\u5206\u914D\u6743\u9650",async:!0,width:"550px",onConfirm:A,onClose:R},{default:u(()=>[X((v(),Y(T,{class:"ls-form",ref_key:"formRef",ref:_,rules:b,model:s,"label-width":"60px"},{default:u(()=>[o(S,{class:"h-[400px] sm:h-[600px]"},{default:u(()=>[o(V,{label:"\u6743\u9650",prop:"menu_id"},{default:u(()=>[k("div",null,[o(t,{label:"\u5C55\u5F00/\u6298\u53E0",onChange:w}),o(t,{label:"\u5168\u9009/\u4E0D\u5168\u9009",onChange:F}),o(t,{modelValue:d.value,"onUpdate:modelValue":l[0]||(l[0]=P=>d.value=P),label:"\u7236\u5B50\u8054\u52A8"},null,8,["modelValue"]),k("div",null,[o(n,{ref_key:"treeRef",ref:a,data:m.value,props:{label:"name",children:"children"},"check-strictly":!d.value,"node-key":"id","default-expand-all":x.value,"show-checkbox":""},null,8,["data","check-strictly","default-expand-all"])])])]),_:1})]),_:1})]),_:1},8,["model"])),[[L,i.value]])]),_:1},512)])}}});export{ne as _};