import{C as v,D as g,P as F}from"./element-plus.6ae56789.js";import{P as h}from"./index.e9e37d9e.js";import{g as D}from"./ai_key.0a6517c5.js";import{d as w,r as u,s as y,o as r,L as n,M as a,O as B,V as _,T as c,U as i}from"./@vue.581f5ce0.js";const V=w({__name:"balance",setup(b,{expose:p}){const t=u(!1),s=y(),o=u({hard_limit_usd:"",access_until:"",total_usage:"",surplus:""}),m=async e=>{t.value=!0,o.value=await D({id:e}),t.value=!1};return p({open:e=>{s.value.open(),m(e)}}),(e,C)=>{const l=v,f=g,d=F;return r(),n(h,{ref_key:"popRef",ref:s,title:"\u67E5\u8BE2\u4F59\u989D"},{default:a(()=>[B((r(),n(f,{"label-width":"90"},{default:a(()=>[_(l,{label:"\u4F59\u989D\u603B\u91CF"},{default:a(()=>[c("$"+i(o.value.hard_limit_usd),1)]),_:1}),_(l,{label:"\u5230\u671F\u65F6\u95F4"},{default:a(()=>[c(i(o.value.access_until),1)]),_:1})]),_:1})),[[d,t.value]])]),_:1},512)}}});export{V as _};