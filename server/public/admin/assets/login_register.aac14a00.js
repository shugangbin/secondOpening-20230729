import{_ as b}from"./index.f9197633.js";import{F as V,a3 as x,C as k,t as q,w as U,Y as R,B as W,M as L,D as N}from"./element-plus.6ae56789.js";import{g as P,s as S}from"./user.d552dc5e.js";import{d as v,r as I,_ as f,ar as M,o as E,c as T,V as e,M as l,O as j,L as G,a as o,U as F,T as s}from"./@vue.581f5ce0.js";import"./vue-drag-resize.3665149e.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.9ffd2ade.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";const O="/admin/assets/follow_official.5d85732b.png",Y={class:"login-register"},z=o("div",{class:"font-medium mb-7"},"\u901A\u7528\u8BBE\u7F6E",-1),H=s("\u5FAE\u4FE1\u767B\u5F55"),J=s("\u624B\u673A\u53F7\u767B\u5F55"),K=o("div",{class:"form-tips"}," \u81F3\u5C11\u52FE\u9009\u4E00\u9879\uFF0C\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u548C\u516C\u4F17\u53F7\u73AF\u5883\u4E0B\u4F7F\u7528\u7684\u662F\u5FAE\u4FE1\u767B\u5F55\u3001PC\u7AEF\u73AF\u5883\u4E0B\u7528\u7684\u662F\u516C\u4F17\u53F7\u626B\u7801\u767B\u5F55 ",-1),Q={class:"mt-1 ml-2"},X=o("div",{class:"form-tips"},[s(" 1\u3001\u7528\u6237\u901A\u8FC7\u624B\u673A\u53F7\u7801\u6CE8\u518C\u5E10\u53F7\u65F6\uFF0C\u662F\u5426\u9700\u8981\u77ED\u4FE1\u9A8C\u8BC1\u7801\u9A8C\u8BC1\u586B\u5199\u7684\u624B\u673A\u53F7\u7801\uFF0C\u9ED8\u8BA4\u5173\u95ED"),o("br"),s(" 2\u3001\u8BF7\u5F00\u542F\u5BF9\u5E94\u77ED\u4FE1\u9A8C\u8BC1\u7801\u529F\u80FD ")],-1),Z={class:"mt-1 ml-2"},$=o("div",{class:"form-tips"},"\u7528\u6237\u767B\u5F55/\u6CE8\u518C\u65F6\uFF0C\u662F\u5426\u663E\u793A\u670D\u52A1\u534F\u8BAE\u548C\u9690\u79C1\u653F\u7B56",-1),uu={class:"mt-1 mx-2"},eu=s("\u67E5\u770B\u793A\u4F8B"),ou=o("img",{src:O,alt:""},null,-1),tu=o("div",{class:"form-tips"},[s(" \u9ED8\u8BA4\u5173\u95ED\uFF0C\u5F00\u542F\u65F6\u4F1A\u5728\u524D\u7AEF\u9996\u9875\u663E\u793A\uFF0C\u6CE8\u610F\uFF1A "),o("span",{class:"text-danger"}," \u5F00\u542F\u7684\u8BDD\u8BF7\u524D\u5F80\u6E20\u9053\u8BBE\u7F6E-\u516C\u4F17\u53F7\u914D\u7F6E-\u4E0A\u4F20\u516C\u4F17\u53F7\u4E8C\u7EF4\u7801 ")],-1),lu={class:"flex"},iu=s("\u4FDD\u5B58"),ru=v({name:"loginRegister"}),Yu=v({...ru,setup(su){const _=I(),u=f({login_way:[1,2],login_agreement:0,sms_verify:0,is_follow_official:0,involved_text:""}),g=f({loginWay:[{required:!0,validator:(r,t,a)=>{if(u.login_way.join("").length===0)a(new Error("\u767B\u5F55\u65B9\u5F0F\u81F3\u5C11\u9009\u62E9\u4E00\u9879\uFF01"));else{if(u.login_way!==""){if(!_.value)return;_.value.validateField("checkPass",()=>null)}a()}},trigger:"change"}],sms_verify:[{required:!0,trigger:"blur"}],login_agreement:[{required:!0,trigger:"blur"}],third_auth:[{required:!0,trigger:"blur"}],involved_text:[{required:!0,message:"\u8BF7\u8F93\u5165\u5173\u6CE8\u6587\u6848"}]}),d=async()=>{try{const r=await P();for(const t in u)u[t]=r[t]}catch(r){console.log("\u83B7\u53D6=>",r)}},B=async()=>{var r;await((r=_.value)==null?void 0:r.validate());try{await S(u),d()}catch(t){console.log("\u4FDD\u5B58=>",t)}};return d(),(r,t)=>{const a=V,p=x,n=k,m=q,c=U,C=R,A=W,h=L,D=N,y=b,w=M("perms");return E(),T("div",Y,[e(D,{ref_key:"formRef",ref:_,rules:g,model:u,"label-width":"120px"},{default:l(()=>[e(h,{shadow:"never",class:"!border-none"},{default:l(()=>[z,e(n,{label:"\u767B\u5F55\u65B9\u5F0F",prop:"loginWay"},{default:l(()=>[o("div",null,[e(p,{modelValue:u.login_way,"onUpdate:modelValue":t[0]||(t[0]=i=>u.login_way=i)},{default:l(()=>[e(a,{label:"1"},{default:l(()=>[H]),_:1}),e(a,{label:"2"},{default:l(()=>[J]),_:1})]),_:1},8,["modelValue"]),K])]),_:1}),e(n,{label:"\u6CE8\u518C\u9700\u9A8C\u8BC1\u7801",prop:"sms_verify"},{default:l(()=>[o("div",null,[e(m,{modelValue:u.sms_verify,"onUpdate:modelValue":t[1]||(t[1]=i=>u.sms_verify=i),"active-value":1,"inactive-value":0},null,8,["modelValue"]),o("span",Q,F(u.sms_verify?"\u5F00\u542F":"\u5173\u95ED"),1),X])]),_:1}),e(n,{label:"\u653F\u7B56\u534F\u8BAE",prop:"login_agreement"},{default:l(()=>[o("div",null,[e(m,{modelValue:u.login_agreement,"onUpdate:modelValue":t[2]||(t[2]=i=>u.login_agreement=i),"active-value":1,"inactive-value":0},null,8,["modelValue"]),o("span",Z,F(u.login_agreement?"\u5F00\u542F":"\u5173\u95ED"),1),$])]),_:1}),e(n,{label:"\u5F15\u5BFC\u5173\u6CE8\u516C\u4F17\u53F7",required:"",prop:"is_follow_official"},{default:l(()=>[o("div",null,[e(m,{modelValue:u.is_follow_official,"onUpdate:modelValue":t[3]||(t[3]=i=>u.is_follow_official=i),"active-value":1,"inactive-value":0},null,8,["modelValue"]),o("span",uu,F(u.is_follow_official?"\u5F00\u542F":"\u5173\u95ED"),1),e(C,{placement:"top-start",width:"250",trigger:"hover"},{reference:l(()=>[e(c,{link:"",type:"primary"},{default:l(()=>[eu]),_:1})]),default:l(()=>[ou]),_:1}),tu])]),_:1}),e(n,{label:"\u5173\u6CE8\u6587\u6848",prop:"involved_text"},{default:l(()=>[o("div",null,[o("div",lu,[e(A,{placeholder:"\u8BF7\u8F93\u5165\u5173\u6CE8\u6587\u6848",class:"w-[400px]",modelValue:u.involved_text,"onUpdate:modelValue":t[4]||(t[4]=i=>u.involved_text=i)},null,8,["modelValue"])])])]),_:1})]),_:1})]),_:1},8,["rules","model"]),j((E(),G(y,null,{default:l(()=>[e(c,{type:"primary",onClick:B},{default:l(()=>[iu]),_:1})]),_:1})),[[w,["setting.user.user/setRegisterConfig"]]])])}}});export{Yu as default};