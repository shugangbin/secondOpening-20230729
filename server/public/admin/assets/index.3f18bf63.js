import{J as M,Z as O,M as q,N as J,S as R,w as W,O as Z,P as G}from"./element-plus.6ae56789.js";import{_ as H}from"./index.vue_vue_type_script_setup_true_lang.c594a7c2.js";import{r as V}from"./index.9ffd2ade.js";import{u as $}from"./useLockFn.5a553596.js";import{u as I}from"./usePaging.2d3fb421.js";import{d as K,_ as Q,j as X,ar as Y,o as t,c as l,V as s,M as i,O as p,u as F,L as c,a as o,U as C,S as _,W as v,aa as w,k as uu,T as a}from"./@vue.581f5ce0.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./vue-drag-resize.3665149e.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";function eu(B){return V.get({url:"/setting.system.upgrade/lists",params:B})}function tu(B){return V.post({url:"/setting.system.upgrade/downloadPkg",params:B})}function iu(B){return V.post({url:"/setting.system.upgrade/upgrade",params:B})}const ou=o("div",{class:"py-[3px]"},"\u6E29\u99A8\u63D0\u793A\uFF1A",-1),lu=o("div",{class:"py-[3px]"},[a(" 1.\u7248\u672C\u66F4\u65B0\u9700\u8981\u9010\u4E2A\u7248\u672C\u66F4\u65B0\uFF0C "),o("span",{class:"text-[#f56c6c]"}," \u66F4\u65B0\u524D\u8BF7\u5907\u4EFD\u597D\u7CFB\u7EDF\u548C\u6570\u636E\u5E93\uFF0C\u66F4\u65B0\u6210\u529F\u540E\u9700\u8981\u5F3A\u5236\u5237\u65B0\u7AD9\u70B9\uFF1B ")],-1),su=o("div",{class:"py-[3px]"},"2.\u7CFB\u7EDF\u6CA1\u6709\u505A\u4E8C\u6B21\u5F00\u53D1\uFF0C\u53EF\u4EE5\u76F4\u63A5\u9009\u62E9\u5728\u7EBF\u66F4\u65B0\u529F\u80FD\uFF1B",-1),nu=o("div",{class:"py-[3px]"}," 3.\u7CFB\u7EDF\u5DF2\u505A\u4E8C\u6B21\u5F00\u53D1\uFF0C\u8FDB\u884C\u4E86\u529F\u80FD\u4FEE\u6539\uFF0C\u8BF7\u8C28\u614E\u9009\u62E9\u5728\u7EBF\u66F4\u65B0\u529F\u80FD\uFF0C\u63A8\u8350\u4EE5\u66F4\u65B0\u5305\u7684\u5F62\u5F0F\u624B\u52A8\u66F4\u65B0\uFF1B ",-1),au={class:"flex items-center"},ru={class:"mr-2"},du=a(" \u6700\u65B0 "),Fu={class:""},pu={class:"operation flex flex-wrap"},cu=a(" \u4E00\u952E\u66F4\u65B0 "),_u=a(" \u4E0B\u8F7D\u5B8C\u6574\u5B89\u88C5\u5305 "),mu=a(" \u4E0B\u8F7D\u670D\u52A1\u7AEF\u66F4\u65B0\u5305 "),Bu=a(" \u4E0B\u8F7Dpc\u7AEF\u66F4\u65B0\u5305 "),Eu=a(" \u4E0B\u8F7Duniapp\u66F4\u65B0\u5305 "),fu=a(" \u4E0B\u8F7D\u540E\u53F0\u524D\u7AEF\u66F4\u65B0\u5305 "),Cu={class:"flex mt-4 justify-end"},gu={class:"flex flex-col justify-between items-center"},yu={class:"flex flex-col pb-8"},Du=a(" \u672A\u505A\u4E8C\u6B21\u5F00\u53D1\uFF0C\u76F4\u63A5\u66F4\u65B0 "),ku={class:"mt-2.5"},vu=a("\u5DF2\u505A\u4E8C\u6B21\u5F00\u53D1"),wu={class:"mt-2.5"},hu=a(" \u53D6\u6D88\u66F4\u65B0 "),bu={key:0,style:{"text-align":"center"}},Vu={key:1,style:{"text-align":"center"}},xu=o("div",null,"\u4E8C\u6B21\u5F00\u53D1\u540E\u8BF7\u8C28\u614E\u4F7F\u7528\u4E00\u952E\u66F4\u65B0\u529F\u80FD\uFF01",-1),Au=o("div",null,"\u4E8C\u6B21\u5F00\u53D1\u540E\u4E00\u952E\u66F4\u65B0\u5BFC\u81F4\u7684\u7CFB\u7EDF\u95EE\u9898\uFF0C\u5B98\u65B9\u65E0\u6CD5\u5904\u7406\uFF0C\u8BF7\u505A\u597D\u7CFB\u7EDF\u5907\u4EFD\uFF01",-1),$u=[xu,Au],Pu=a(" \u786E\u5B9A\u66F4\u65B0 "),Su=a(" \u53D6\u6D88\u66F4\u65B0 "),Uu={key:0,class:"mt-2.5"},Lu=a(" \u4E0B\u8F7D\u66F4\u65B0\u5305\uFF0C\u624B\u52A8\u66F4\u65B0 "),Nu={class:"pt-10",style:{height:"200px","text-align":"center"}},Tu={"element-loading-text":"\u7CFB\u7EDF\u66F4\u65B0\u4E2D\uFF0C\u66F4\u65B0\u5B8C\u6BD5\u540E\u4F1A\u81EA\u884C\u5237\u65B0\u9875\u9762 \u5207\u52FF\u5173\u95ED\u7A97\u53E3\u6216\u5237\u65B0\u9875\u9762"},De=K({__name:"index",setup(B){const e=Q({id:"",outerVisible:!1,loading:!1,isSecondaryDev:!1,threeVisible:!1,innerVisible:!1}),{pager:E,getLists:h}=I({fetchFun:eu}),{lockFn:g}=$(async(y,n)=>{const k=await tu({id:y,update_type:n});n==6?window.open(k.line,"_blank"):window.location.href=k.line}),P=y=>{e.outerVisible=!0,e.id=y},S=()=>{e.innerVisible=!1,e.threeVisible=!0,N()},U=()=>{e.outerVisible=!1,e.isSecondaryDev=!1,e.innerVisible=!0},L=()=>{e.outerVisible=!1,e.isSecondaryDev=!0,e.innerVisible=!0},{lockFn:N}=$(async()=>{try{e.loading=!0,await iu({id:e.id,update_type:1}),h()}catch{}e.threeVisible=!1,e.innerVisible=!1,e.outerVisible=!1});return X(()=>{h()}),(y,n)=>{const k=O,x=q,D=J,T=R,d=W,j=Z,z=H,b=M,f=Y("perms"),A=G;return t(),l("div",null,[s(x,{class:"!border-none",shadow:"never"},{default:i(()=>[s(k,{class:"text-xxl",type:"warning",closable:!1,"show-icon":""},{title:i(()=>[ou,lu,su,nu]),_:1})]),_:1}),p((t(),c(x,{class:"!border-none mt-4",shadow:"never"},{default:i(()=>[o("div",null,[s(j,{data:F(E).lists,size:"large",border:""},{default:i(()=>[s(D,{prop:"publish_time",label:"\u53D1\u5E03\u65E5\u671F","min-width":"180px"}),s(D,{label:"\u7248\u672C\u53F7","min-width":"160px"},{default:i(u=>[o("div",au,[o("div",ru,C(u.row.version_no),1),u.$index==0&&F(E).page==1?(t(),c(T,{key:0,size:"small",type:"primary"},{default:i(()=>[du]),_:1})):_("",!0)]),o("div",Fu,C(u.row.version_str),1)]),_:1}),s(D,{prop:"",label:"\u7248\u672C\u5185\u5BB9","min-width":"220px"},{default:i(u=>[(t(!0),l(v,null,w(u.row.add,(r,m)=>(t(),l("div",{class:"",key:m},C(r),1))),128)),(t(!0),l(v,null,w(u.row.optimize,(r,m)=>(t(),l("div",{class:"",key:m},C(r),1))),128)),(t(!0),l(v,null,w(u.row.repair,(r,m)=>(t(),l("div",{class:"",key:m},C(r),1))),128))]),_:1}),s(D,{prop:"notice",label:"\u6CE8\u610F\u4E8B\u9879","min-width":"220px"},{default:i(u=>[(t(!0),l(v,null,w(u.row.notice,(r,m)=>(t(),l("div",{class:"text-[red]",key:m},C(r),1))),128))]),_:1}),s(D,{label:"\u64CD\u4F5C",width:"160px",fixed:"right"},{default:i(u=>[o("div",pu,[p((t(),l("div",null,[u.row.able_update==1?(t(),c(d,{key:0,type:"primary",link:"",onClick:r=>P(u.row.id)},{default:i(()=>[cu]),_:2},1032,["onClick"])):_("",!0)])),[[f,["setting.system.upgrade/upgrade"]]]),p((t(),l("div",null,[u.row.integral_package_link?(t(),c(d,{key:0,type:"primary",link:"",onClick:r=>F(g)(u.row.id,6)},{default:i(()=>[_u]),_:2},1032,["onClick"])):_("",!0)])),[[f,["setting.system.upgrade/downloadPkg"]]]),p((t(),l("div",null,[u.row.package_link?(t(),c(d,{key:0,type:"primary",link:"",onClick:r=>F(g)(u.row.id,2)},{default:i(()=>[mu]),_:2},1032,["onClick"])):_("",!0)])),[[f,["setting.system.upgrade/downloadPkg"]]]),p((t(),l("div",null,[u.row.pc_package_link?(t(),c(d,{key:0,type:"primary",link:"",onClick:r=>F(g)(u.row.id,3)},{default:i(()=>[Bu]),_:2},1032,["onClick"])):_("",!0)])),[[f,["setting.system.upgrade/downloadPkg"]]]),p((t(),l("div",null,[u.row.uniapp_package_link?(t(),c(d,{key:0,type:"primary",link:"",onClick:r=>F(g)(u.row.id,4)},{default:i(()=>[Eu]),_:2},1032,["onClick"])):_("",!0)])),[[f,["setting.system.upgrade/downloadPkg"]]]),p((t(),l("div",null,[u.row.web_package_link?(t(),c(d,{key:0,type:"primary",link:"",onClick:r=>F(g)(u.row.id,5)},{default:i(()=>[fu]),_:2},1032,["onClick"])):_("",!0)])),[[f,["setting.system.upgrade/downloadPkg"]]])])]),_:1})]),_:1},8,["data"])]),o("div",Cu,[s(z,{modelValue:F(E),"onUpdate:modelValue":n[0]||(n[0]=u=>uu(E)?E.value=u:null),onChange:F(h)},null,8,["modelValue","onChange"])])]),_:1})),[[A,F(E).loading]]),s(b,{modelValue:e.outerVisible,"onUpdate:modelValue":n[2]||(n[2]=u=>e.outerVisible=u),width:"400px",title:"\u7CFB\u7EDF\u662F\u5426\u8FDB\u884C\u4E8C\u6B21\u5F00\u53D1",center:""},{default:i(()=>[o("div",gu,[o("div",yu,[o("div",null,[s(d,{class:"w-full",type:"primary",onClick:U},{default:i(()=>[Du]),_:1})]),o("div",ku,[s(d,{class:"w-full",onClick:L},{default:i(()=>[vu]),_:1})]),o("div",wu,[s(d,{class:"w-full",onClick:n[1]||(n[1]=u=>e.outerVisible=!1)},{default:i(()=>[hu]),_:1})])])])]),_:1},8,["modelValue"]),s(b,{width:"400px",modelValue:e.innerVisible,"onUpdate:modelValue":n[5]||(n[5]=u=>e.innerVisible=u),"append-to-body":"",center:""},{footer:i(()=>[o("div",null,[s(d,{type:"primary",onClick:S},{default:i(()=>[Pu]),_:1}),s(d,{onClick:n[3]||(n[3]=u=>e.innerVisible=!1)},{default:i(()=>[Su]),_:1})]),e.isSecondaryDev?(t(),l("div",Uu,[s(d,{onClick:n[4]||(n[4]=u=>e.innerVisible=!1)},{default:i(()=>[Lu]),_:1})])):_("",!0)]),default:i(()=>[o("div",null,[e.isSecondaryDev==!1?(t(),l("div",bu," \u4E00\u952E\u66F4\u65B0\u5BFC\u81F4\u7684\u7CFB\u7EDF\u95EE\u9898\uFF0C\u6B22\u8FCE\u524D\u5F80\u793E\u533A\u53CD\u9988\uFF0C\u8BF7\u505A\u597D\u7CFB\u7EDF\u5907\u4EFD\uFF01 ")):(t(),l("div",Vu,$u))])]),_:1},8,["modelValue"]),s(b,{width:"300px",modelValue:e.threeVisible,"onUpdate:modelValue":n[6]||(n[6]=u=>e.threeVisible=u),"append-to-body":"",title:"\u66F4\u65B0\u4E2D",center:"","close-on-click-modal":!1,"close-on-press-escape":!1},{default:i(()=>[o("div",Nu,[p(o("div",Tu,null,512),[[A,e.loading]])])]),_:1},8,["modelValue"])])}}});export{De as default};