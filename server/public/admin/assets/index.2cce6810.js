import{B as j,C as q,K as z,L as W,w as G,D as H,M as J,N as Q,S as X,O as Y,P as Z}from"./element-plus.6ae56789.js";import{_ as ee}from"./index.vue_vue_type_script_setup_true_lang.c594a7c2.js";import{f as w,_ as te}from"./index.9ffd2ade.js";import{_ as oe}from"./index.vue_vue_type_script_setup_true_lang.fbe9b76b.js";import{d as R,_ as ae,s as V,r as le,o as r,c as x,V as e,M as o,ac as T,u as i,a as c,O as se,L as f,S as ne,U as v,T as s,W as ue,k as ie}from"./@vue.581f5ce0.js";import{c as re,a as me}from"./chat_records.6a2bd7c9.js";import{u as pe}from"./usePaging.2d3fb421.js";import{_ as de}from"./replyPop.vue_vue_type_script_setup_true_lang.e26f8041.js";import{_ as _e}from"./auditPop.vue_vue_type_script_setup_true_lang.e78324d9.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./vue-drag-resize.3665149e.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";import"./index.e9e37d9e.js";const ce=s("\u67E5\u8BE2"),fe=s("\u91CD\u7F6E"),ve={class:"mb-4"},ye=s(" \u6279\u91CF\u5220\u9664 "),ke={class:"flex items-center"},Ce={class:"ml-4"},be=s(" \u67E5\u770B\u539F\u56E0 "),ge=s(" \u67E5\u770B\u56DE\u590D "),Fe=s(" \u5220\u9664 "),he={class:"flex justify-end mt-4"},Ee=R({name:"dialogueRecord"}),ct=R({...Ee,setup(Be){const l=ae({type:"3",user_info:"",keyword:"",censor_status:"",start_time:"",end_time:""}),F=V(),h=V(),C=le([]),S=n=>{F.value.open(n)},$=n=>{h.value.open(n)},A=n=>{C.value=n},{pager:d,getLists:b,resetPage:g,resetParams:U}=pe({fetchFun:re,params:l}),E=async n=>{await w.confirm("\u786E\u5B9A\u8981\u5220\u9664\uFF1F"),await me({id:n}),w.msgSuccess("\u64CD\u4F5C\u6210\u529F"),b()};return b(),(n,a)=>{const B=j,_=q,m=z,K=W,P=oe,p=G,L=H,D=J,u=Q,N=te,y=X,I=Y,O=ee,M=Z;return r(),x("div",null,[e(D,{class:"!border-none",shadow:"never"},{default:o(()=>[e(L,{ref:"formRef",class:"mb-[-16px]",model:l,inline:!0},{default:o(()=>[e(_,{label:"\u7528\u6237\u4FE1\u606F"},{default:o(()=>[e(B,{class:"w-[280px]",modelValue:l.user_info,"onUpdate:modelValue":a[0]||(a[0]=t=>l.user_info=t),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237ID/\u7528\u6237\u6635\u79F0",clearable:"",onKeyup:T(i(g),["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(_,{label:"\u5173\u952E\u8BCD"},{default:o(()=>[e(B,{class:"w-[280px]",modelValue:l.keyword,"onUpdate:modelValue":a[1]||(a[1]=t=>l.keyword=t),placeholder:"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD",clearable:"",onKeyup:T(i(g),["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(_,{label:"\u5BA1\u6838\u72B6\u6001"},{default:o(()=>[e(K,{class:"w-[280px]",modelValue:l.censor_status,"onUpdate:modelValue":a[2]||(a[2]=t=>l.censor_status=t)},{default:o(()=>[e(m,{label:"\u5168\u90E8",value:""}),e(m,{label:"\u672A\u5BA1\u6838",value:0}),e(m,{label:"\u5408\u89C4",value:1}),e(m,{label:"\u4E0D\u5408\u89C4",value:2}),e(m,{label:"\u7591\u4F3C",value:3}),e(m,{label:"\u5BA1\u6838\u5931\u8D25",value:4})]),_:1},8,["modelValue"])]),_:1}),e(_,{label:"\u63D0\u95EE\u65F6\u95F4"},{default:o(()=>[e(P,{startTime:l.start_time,"onUpdate:startTime":a[3]||(a[3]=t=>l.start_time=t),endTime:l.end_time,"onUpdate:endTime":a[4]||(a[4]=t=>l.end_time=t)},null,8,["startTime","endTime"])]),_:1}),e(_,null,{default:o(()=>[e(p,{type:"primary",onClick:i(g)},{default:o(()=>[ce]),_:1},8,["onClick"]),e(p,{onClick:i(U)},{default:o(()=>[fe]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])]),_:1}),e(D,{class:"!border-none mt-4",shadow:"never"},{default:o(()=>[c("div",ve,[e(p,{type:"default",plain:!0,disabled:!C.value.length,onClick:a[5]||(a[5]=t=>E(C.value.map(k=>k.id)))},{default:o(()=>[ye]),_:1},8,["disabled"])]),se((r(),f(I,{size:"large",data:i(d).lists,onSelectionChange:A},{default:o(()=>[e(u,{type:"selection",width:"55"}),e(u,{label:"ID",prop:"id","min-width":"80"}),e(u,{label:"\u7528\u6237\u4FE1\u606F","min-width":"180"},{default:o(({row:t})=>[c("div",ke,[t.avatar?(r(),f(N,{key:0,class:"flex-none",src:t.avatar,width:48,height:48,"preview-src-list":[t.avatar],"preview-teleported":"",fit:"contain"},null,8,["src","preview-src-list"])):ne("",!0),c("span",Ce,v(t.nickname),1)])]),_:1}),e(u,{label:"\u63D0\u95EE\u65F6\u95F4",prop:"create_time","min-width":"180","show-tooltip-when-overflow":""}),e(u,{label:"\u4F7F\u7528\u6280\u80FD",prop:"other_desc","min-width":"180"}),e(u,{label:"\u7528\u6237\u8F93\u5165",prop:"ask","min-width":"180"}),e(u,{label:"\u5BA1\u6838\u72B6\u6001"},{default:o(({row:t})=>[c("div",null,[t.censor_status==1?(r(),f(y,{key:0,class:"ml-2",type:"success"},{default:o(()=>[s(v(t.censor_status_desc),1)]),_:2},1024)):t.censor_status>=2?(r(),x(ue,{key:1},[e(y,{class:"ml-2 cursor-pointer",type:"danger"},{default:o(()=>[s(v(t.censor_status_desc),1)]),_:2},1024),e(p,{type:"danger",link:!0,onClick:k=>$(t)},{default:o(()=>[be]),_:2},1032,["onClick"])],64)):t.censor_status==0?(r(),f(y,{key:2,class:"ml-2",type:"warning"},{default:o(()=>[s(v(t.censor_status_desc),1)]),_:2},1024)):(r(),f(y,{key:3,class:"ml-2",type:"danger"},{default:o(()=>[s(v(t.censor_status_desc),1)]),_:2},1024))])]),_:1}),e(u,{label:"\u64CD\u4F5C","min-width":"180",fixed:"right"},{default:o(({row:t})=>[e(p,{type:"primary",link:"",onClick:k=>S(t.reply)},{default:o(()=>[ge]),_:2},1032,["onClick"]),e(p,{type:"danger",link:"",onClick:k=>E([t.id])},{default:o(()=>[Fe]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[M,i(d).loading]]),c("div",he,[e(O,{modelValue:i(d),"onUpdate:modelValue":a[6]||(a[6]=t=>ie(d)?d.value=t:null),onChange:i(b)},null,8,["modelValue","onChange"])])]),_:1}),e(_e,{ref_key:"auditRef",ref:h},null,512),e(de,{ref_key:"popRef",ref:F},null,512)])}}});export{ct as default};
