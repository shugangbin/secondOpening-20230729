import{t as I,C as N,G as S,H as j,w as q,b as L,Y as M,L as O,B as G,D as K,K as T}from"./element-plus.6ae56789.js";import{z as H}from"./zhishuyun_code.ce690c45.js";import{a as J,s as P}from"./AI.48e5a31c.js";import{d as W,s as Y,r as c,j as Q,o as r,c as _,V as e,M as t,a,W as m,aa as A,u as X,S as Z,T as d,L as C,U as $}from"./@vue.581f5ce0.js";const uu=a("div",{class:"form-tips !text-[14px]"}," \u9ED8\u8BA4\u5173\u95ED\uFF1B\u7ED8\u753B\u529F\u80FD\u5173\u95ED\u540E\uFF0C\u6709\u5173\u7ED8\u753B\u7684\u5165\u53E3\u5C06\u4E0D\u663E\u793A ",-1),eu={class:"flex items-center"},tu=a("span",{class:"form-tips !text-[14px]"},"\u5982\u679C\u60A8\u5DF2\u5F00\u901A\u77E5\u6570\u4E91\u63A5\u53E3\uFF0C\u53EF\u76F4\u63A5\u586B\u5199\uFF1B\u5982\u679C\u672A\u5F00\u901A",-1),lu={href:"https://auth.zhishuyun.com/auth/login?inviter_id=c7ff8573-940e-4dd0-828c-91adeda5f5dd&redirect=https://data.zhishuyun.com",target:"_blank",rel:"noopener noreferrer"},au=d(" \u524D\u5F80\u5F00\u901A "),ou=d("\u626B\u7801\u5F00\u901A"),su=a("div",{class:"form-tips !text-[14px]"}," \u5F00\u542F\u81EA\u52A8\u7FFB\u8BD1MJ\u5173\u952E\u8BCD\u4E3A\u82F1\u6587\uFF0C\u8BA9\u7ED8\u56FE\u66F4\u7CBE\u51C6\u3002 ",-1),nu=d("\u7CFB\u7EDF\u81EA\u52A8\u7FFB\u8BD1"),ru=d("\u7528\u6237\u624B\u52A8\u7FFB\u8BD1"),iu=a("div",{class:"form-tips"}," \u9009\u62E9\u7FFB\u8BD1\u63A5\u53E3\u540E\uFF0C\u9700\u524D\u5F80\u3010AI\u5BF9\u8BDD\u914D\u7F6E\u3011\u8BBE\u7F6E\u76F8\u5E94\u7684\u5BF9\u8BDD\u6A21\u578B\u53C2\u6570 ",-1),du={class:"w-[420px]"},_u=a("div",{class:"form-tips flex !text-[14px]"}," {prompt}\u662F\u5185\u7F6E\u53D8\u91CF\uFF0C\u8868\u793A\u7528\u6237\u8F93\u5165\u7684\u63CF\u8FF0\u8BCD ",-1),pu=a("div",{class:"form-tips w-[400px] !text-[14px]"},[a("p",null," \u793A\u4F8B\uFF1A\u6211\u4F1A\u7528\u4EFB\u4F55\u8BED\u8A00\u548C\u4F60\u4EA4\u6D41\uFF0C\u4F60\u53EA\u9700\u5C06\u6211\u7684\u8BDD\u7FFB\u8BD1\u4E3A\u82F1\u8BED\uFF0C\u4E0D\u8981\u89E3\u91CA\u6211\u7684\u8BDD\u6216\u8005\u56DE\u590D\u5176\u4ED6\u4FE1\u606F\uFF0C\u8BF7\u7ACB\u523B\u5C06\u6211\u7684\u8BDD\u7FFB\u8BD1\u8FD4\u56DE\uFF0C\u6211\u7684\u8BDD\u662F:{prompt} ")],-1),Eu=W({__name:"draw",props:{popRef:{type:Object,default:{}}},setup(Fu,{expose:g}){const f=Y(),o=c({is_open:"",config_lists:[],translate_config:{model:"",prompt:""},translate_model_lists:[]}),s=c({}),h=i=>{s.value=o.value.config_lists[i],s.value.status=1},p=c(""),x={},B=async()=>{var i;o.value=await J(),s.value=Object.values((i=o.value)==null?void 0:i.config_lists).find(l=>l.status)||{},p.value=s.value.type},V=async()=>{await f.value.validate(),await P({draw_config:{...s.value,is_open:o.value.is_open},translate_config:o.value.translate_config}),B()};return Q(()=>{B()}),g({submit:V}),(i,l)=>{const E=I,n=N,F=S,D=j,v=q,w=L,b=M,y=T,k=O,R=G,U=K;return r(),_("div",null,[e(U,{"label-width":"120px",ref_key:"formRef",ref:f,rules:x,model:s.value},{default:t(()=>[e(n,{label:"\u7ED8\u753B\u529F\u80FD"},{default:t(()=>[a("div",null,[e(E,{modelValue:o.value.is_open,"onUpdate:modelValue":l[0]||(l[0]=u=>o.value.is_open=u),"active-value":1,"inactive-value":0},null,8,["modelValue"]),uu])]),_:1}),e(n,{label:"AI\u63A5\u53E3",class:"is-required"},{default:t(()=>[a("div",null,[e(D,{modelValue:p.value,"onUpdate:modelValue":l[1]||(l[1]=u=>p.value=u),onChange:h},{default:t(()=>[(r(!0),_(m,null,A(o.value.config_lists,(u,z)=>(r(),C(F,{key:z,label:u.type,disabled:!u.is_open},{default:t(()=>[d($(u.name),1)]),_:2},1032,["label","disabled"]))),128))]),_:1},8,["modelValue"]),a("div",eu,[tu,a("a",lu,[e(v,{type:"primary",link:"",class:"ml-2"},{default:t(()=>[au]),_:1})]),e(b,{placement:"top-start",width:"auto",trigger:"hover"},{reference:t(()=>[e(v,{type:"primary",link:"",class:"ml-2 mt-[4px]"},{default:t(()=>[ou]),_:1})]),default:t(()=>[e(w,{src:X(H),class:"w-[150px] h-[150px]"},null,8,["src"])]),_:1})])])]),_:1}),e(n,{label:"\u7ED8\u753B\u7FFB\u8BD1",required:""},{default:t(()=>[a("div",null,[e(E,{modelValue:s.value.auto_translate,"onUpdate:modelValue":l[2]||(l[2]=u=>s.value.auto_translate=u),"active-value":1,"inactive-value":0},null,8,["modelValue"]),su])]),_:1}),s.value.auto_translate?(r(),_(m,{key:0},[e(n,{label:"\u7FFB\u8BD1\u5F62\u5F0F",required:""},{default:t(()=>[e(D,{modelValue:s.value.translate_type,"onUpdate:modelValue":l[3]||(l[3]=u=>s.value.translate_type=u)},{default:t(()=>[e(F,{label:1},{default:t(()=>[nu]),_:1}),e(F,{label:2},{default:t(()=>[ru]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(n,{label:"\u6A21\u578B",prop:"name"},{default:t(()=>[a("div",null,[e(k,{class:"w-[400px]",modelValue:o.value.translate_config.model,"onUpdate:modelValue":l[4]||(l[4]=u=>o.value.translate_config.model=u)},{default:t(()=>[(r(!0),_(m,null,A(o.value.translate_model_lists,u=>(r(),C(y,{value:u,label:u,key:u},null,8,["value","label"]))),128))]),_:1},8,["modelValue"]),iu])]),_:1}),e(n,{label:"\u7FFB\u8BD1\u6307\u4EE4",prop:"translate_config.model"},{default:t(()=>[a("div",du,[e(R,{modelValue:o.value.translate_config.prompt,"onUpdate:modelValue":l[5]||(l[5]=u=>o.value.translate_config.prompt=u),autosize:{minRows:7,maxRows:7},type:"textarea","show-word-limit":"",placeholder:"\u8BF7\u8F93\u5165\u7FFB\u8BD1\u6307\u4EE4"},null,8,["modelValue"]),_u,pu])]),_:1})],64)):Z("",!0)]),_:1},8,["model"])])}}});export{Eu as _};
