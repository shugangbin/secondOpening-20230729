import{c as S,a0 as M,H as N,w as O,C as P,L as T,a as j,B as K,D as Q,G as H,K as W}from"./element-plus.6ae56789.js";import{b as J,d as X}from"./AI.48e5a31c.js";import{d as Y,s as Z,r as x,ag as $,o,c as n,V as u,M as a,a as s,W as B,aa as y,S as p,L as f,U as k,T as E}from"./@vue.581f5ce0.js";const ee={class:"pt-[10px]"},ue={key:0},te=s("span",{class:"form-tips !text-[14px]"},"\u5F00\u901A\u7F51\u5740\uFF1Ahttps://open.bigmodel.cn/",-1),le={href:"https://open.bigmodel.cn/",target:"_blank",rel:"noopener noreferrer"},ae=E("\u524D\u5F80\u5F00\u901A"),se={key:1},oe=s("span",{class:"form-tips !text-[14px]"},"\u5982\u679C\u60A8\u5DF2\u5F00\u901A\uFF0C\u53EF\u76F4\u63A5\u586B\u5199\uFF1B\u5982\u679C\u672A\u5F00\u901A\uFF0C\u70B9\u51FB",-1),ne={href:"https://api2d.com/r/207827",target:"_blank",rel:"noopener noreferrer"},pe=E("\u524D\u5F80\u5F00\u901A"),de={class:"flex flex-wrap max-w-[500px]"},ie={key:0,class:"w-[190px] mr-[20px] mb-[20px]"},re={class:"flex items-center text-tx-regular text-xs"},me=s("span",{class:"mr-[4px] mt-[2px]"},"\u4E0A\u4E0B\u6587\u603B\u6570",-1),_e={key:1,class:"w-[190px] mr-[20px] mb-[20px]"},ce={class:"flex items-center text-tx-regular text-xs"},xe=s("span",{class:"mr-[4px] mt-[2px]"},"\u6700\u5927\u56DE\u590D",-1),Fe={key:2,class:"w-[190px] mr-[20px] mb-[20px]"},fe={class:"flex items-center text-tx-regular text-xs"},Ee=s("span",{class:"mr-[4px] mt-[2px]"},"\u8BCD\u6C47\u5C5E\u6027",-1),ve={key:3,class:"w-[190px] mr-[20px] mb-[20px]"},Ae={class:"flex items-center text-tx-regular text-xs"},De=s("span",{class:"mr-[4px] mt-[2px]"},"\u968F\u673A\u5C5E\u6027",-1),Ce={key:4,class:"w-[190px] mr-[20px] mb-[20px]"},Be={class:"flex items-center text-tx-regular text-xs"},ye=s("span",{class:"mr-[4px] mt-[2px]"},"\u8BDD\u9898\u5C5E\u6027",-1),ke={key:5,class:"w-[190px] mr-[20px] mb-[20px]"},be={class:"flex items-center text-tx-regular text-xs"},ge=s("span",{class:"mr-[4px] mt-[2px]"},"\u91CD\u590D\u5C5E\u6027",-1),Ve={class:"flex"},he={class:"form-tips !text-[14px]"},Le=Y({__name:"session",props:{popRef:{type:Object,default:{}}},setup(we,{expose:b}){const v=Z(),F=x(""),A=x(),e=x({}),D=x([]),g={api_key:[{required:!0,message:"\u8BF7\u8F93\u5165\u79D8\u94A5",trigger:["blur"]}],api_type:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:["blur"]}]},V=d=>{e.value=A.value[d],e.value.status=1,e.value.api_key.length==0&&(e.value.api_key=[""])},h=async()=>{const{ai_config_lists:d}=await J();D.value=d,A.value=d,Object.keys(d).map(l=>{d[l].status==1&&(F.value=l,e.value=d[l],e.value.api_key.length==0&&(e.value.api_key=[""]))})},w=async()=>{await v.value.validate(),X(e.value),console.log("\u4FDD\u5B58\u5BF9\u8BDD")};return h(),b({submit:w}),(d,l)=>{const U=H,q=N,C=O,c=P,I=W,L=T,i=$("QuestionFilled"),r=S,m=j,_=M,z=K,R=Q;return o(),n("div",ee,[u(R,{"label-width":"120px",ref_key:"formRef",ref:v,rules:g,model:e.value},{default:a(()=>[u(c,{label:"AI\u63A5\u53E3",class:"is-required"},{default:a(()=>[s("div",null,[u(q,{modelValue:F.value,"onUpdate:modelValue":l[0]||(l[0]=t=>F.value=t),onChange:V},{default:a(()=>[(o(!0),n(B,null,y(D.value,(t,G)=>(o(),f(U,{key:G,label:t.key,disabled:!t.is_open},{default:a(()=>[E(k(t.name),1)]),_:2},1032,["label","disabled"]))),128))]),_:1},8,["modelValue"]),e.value.key=="chatGLM-6B"||e.value.key=="chatGLM-130B"?(o(),n("div",ue,[te,s("a",le,[u(C,{type:"primary",link:"",class:"ml-2"},{default:a(()=>[ae]),_:1})])])):p("",!0),e.value.key=="api2d3.5"||e.value.key=="api2d4.0"?(o(),n("div",se,[oe,s("a",ne,[u(C,{type:"primary",link:"",class:"ml-2"},{default:a(()=>[pe]),_:1})])])):p("",!0)])]),_:1}),u(c,{label:"\u6A21\u578B",prop:"name"},{default:a(()=>[s("div",null,[u(L,{class:"w-[400px]",modelValue:e.value.model,"onUpdate:modelValue":l[1]||(l[1]=t=>e.value.model=t)},{default:a(()=>[(o(!0),n(B,null,y(e.value.model_list,t=>(o(),f(I,{value:t,label:t,key:t},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])])]),_:1}),u(c,{label:"\u53C2\u6570\u8BBE\u7F6E",class:"is-required"},{default:a(()=>[s("div",de,[e.value.context_num!==""?(o(),n("div",ie,[s("div",re,[me,u(m,{class:"box-item",effect:"dark",content:"\u751F\u6210\u6587\u672C\u7684\u6700\u5927\u957F\u5EA6\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A1~5\u4E4B\u95F4\u7684\u6574\u6570",placement:"top"},{default:a(()=>[u(r,{size:"16px"},{default:a(()=>[u(i)]),_:1})]),_:1})]),u(_,{modelValue:e.value.context_num,"onUpdate:modelValue":l[2]||(l[2]=t=>e.value.context_num=t),min:1,max:5},null,8,["modelValue"])])):p("",!0),e.value.n!==""?(o(),n("div",_e,[s("div",ce,[xe,u(m,{class:"box-item",effect:"dark",content:"\u4E3A\u6BCF\u4E2A\u8F93\u5165\u6D88\u606F\u751F\u6210\u591A\u5C11\u4E2A\u804A\u5929\u5B8C\u6210\u9009\u9879\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A1~5\u4E4B\u95F4\u7684\u6574\u6570\u3002",placement:"top"},{default:a(()=>[u(r,{size:"16px"},{default:a(()=>[u(i)]),_:1})]),_:1})]),u(_,{modelValue:e.value.n,"onUpdate:modelValue":l[3]||(l[3]=t=>e.value.n=t),min:1,max:5},null,8,["modelValue"])])):p("",!0),e.value.temperature!==""?(o(),n("div",Fe,[s("div",fe,[Ee,u(m,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u7684\u968F\u673A\u6027\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.7\u5DE6\u53F3\u3002",placement:"top"},{default:a(()=>[u(r,{size:"16px"},{default:a(()=>[u(i)]),_:1})]),_:1})]),u(_,{modelValue:e.value.temperature,"onUpdate:modelValue":l[4]||(l[4]=t=>e.value.temperature=t),min:0,max:1,step:.1},null,8,["modelValue","step"])])):p("",!0),e.value.top_p!==""?(o(),n("div",ve,[s("div",Ae,[De,u(m,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u7684\u591A\u6837\u6027\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.9\u5DE6\u53F3\u3002",placement:"top"},{default:a(()=>[u(r,{size:"16px"},{default:a(()=>[u(i)]),_:1})]),_:1})]),u(_,{modelValue:e.value.top_p,"onUpdate:modelValue":l[5]||(l[5]=t=>e.value.top_p=t),min:0,max:1,step:.1},null,8,["modelValue","step"])])):p("",!0),e.value.presence_penalty!==""?(o(),n("div",Ce,[s("div",Be,[ye,u(m,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u4E2D\u662F\u5426\u51FA\u73B0\u7ED9\u5B9A\u7684\u5173\u952E\u8BCD\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.5\u5DE6\u53F3\u3002",placement:"top"},{default:a(()=>[u(r,{size:"16px"},{default:a(()=>[u(i)]),_:1})]),_:1})]),u(_,{modelValue:e.value.presence_penalty,"onUpdate:modelValue":l[6]||(l[6]=t=>e.value.presence_penalty=t),step:.1,min:0,max:1},null,8,["modelValue","step"])])):p("",!0),e.value.frequency_penalty!==""?(o(),n("div",ke,[s("div",be,[ge,u(m,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u4E2D\u91CD\u590D\u7684\u7A0B\u5EA6\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.5\u5DE6\u53F3",placement:"top"},{default:a(()=>[u(r,{size:"16px"},{default:a(()=>[u(i)]),_:1})]),_:1})]),u(_,{modelValue:e.value.frequency_penalty,"onUpdate:modelValue":l[7]||(l[7]=t=>e.value.frequency_penalty=t),step:.1,min:0,max:1},null,8,["modelValue","step"])])):p("",!0)])]),_:1}),e.value.key!=="chatGLM"?(o(),f(c,{key:0,label:"\u81EA\u5B9A\u4E49API\u57DF\u540D",prop:"agency_api"},{default:a(()=>[s("div",null,[s("div",Ve,[u(z,{placeholder:"\u8BF7\u8F93\u5165\u81EA\u5B9A\u4E49API\u57DF\u540D",class:"w-[400px]",modelValue:e.value.agency_api,"onUpdate:modelValue":l[8]||(l[8]=t=>e.value.agency_api=t)},null,8,["modelValue"])]),s("div",he," \u53CD\u5411\u4EE3\u7406API\u57DF\u540D\uFF0C\u4E0D\u586B\u5199\u9ED8\u8BA4\u4E3A\uFF1A"+k(e.value.key=="api2d3.5"||e.value.key=="api2d4.0"?"https://openai.api2d.net":"https://api.openai.com"),1)])]),_:1})):p("",!0)]),_:1},8,["model"])])}}});export{Le as _};
