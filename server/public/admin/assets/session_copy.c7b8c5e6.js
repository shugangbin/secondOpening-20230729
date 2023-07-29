import{c as j,a0 as Q,H as $,w as H,C as W,B as J,L as X,a as Y,D as Z,G as ee,K as ue}from"./element-plus.6ae56789.js";import{b as te,d as le}from"./AI.48e5a31c.js";import{d as ae,s as oe,r as E,ag as se,ar as ne,o as s,c as n,V as u,M as l,a,W as C,aa as k,S as i,L as F,U as b,T as x,O as pe}from"./@vue.581f5ce0.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.9ffd2ade.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./vue-drag-resize.3665149e.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";const ie={class:"pt-[10px]"},re={key:0},me=a("span",{class:"form-tips !text-[14px]"},"\u5F00\u901A\u7F51\u5740\uFF1Ahttps://open.bigmodel.cn/",-1),de={href:"https://open.bigmodel.cn/",target:"_blank",rel:"noopener noreferrer"},ce=x("\u524D\u5F80\u5F00\u901A"),_e={key:1},Fe=a("span",{class:"form-tips !text-[14px]"},"\u5982\u679C\u60A8\u5DF2\u5F00\u901A\uFF0C\u53EF\u76F4\u63A5\u586B\u5199\uFF1B\u5982\u679C\u672A\u5F00\u901A\uFF0C\u70B9\u51FB",-1),xe={href:"https://api2d.com/r/207827",target:"_blank",rel:"noopener noreferrer"},ve=x("\u524D\u5F80\u5F00\u901A"),fe=x("\u67E5\u8BE2\u4F59\u989D"),Ee=x("\u6DFB\u52A0key"),ye=x("\u5220\u9664key"),Ae=a("div",{class:"form-tips !text-[14px]"},"\u8BF7\u6839\u636E\u60A8\u5F53\u5730\u7684\u6CD5\u89C4\u914C\u60C5\u4F7F\u7528",-1),Ce={class:"flex flex-wrap max-w-[500px]"},ke={key:0,class:"w-[190px] mr-[20px] mb-[20px]"},De={class:"flex items-center text-tx-regular text-xs"},Be=a("span",{class:"mr-[4px] mt-[2px]"},"\u4E0A\u4E0B\u6587\u603B\u6570",-1),ge={key:1,class:"w-[190px] mr-[20px] mb-[20px]"},he={class:"flex items-center text-tx-regular text-xs"},be=a("span",{class:"mr-[4px] mt-[2px]"},"\u6700\u5927\u56DE\u590D",-1),Ve={key:2,class:"w-[190px] mr-[20px] mb-[20px]"},we={class:"flex items-center text-tx-regular text-xs"},Ue=a("span",{class:"mr-[4px] mt-[2px]"},"\u8BCD\u6C47\u5C5E\u6027",-1),qe={key:3,class:"w-[190px] mr-[20px] mb-[20px]"},Ie={class:"flex items-center text-tx-regular text-xs"},Le=a("span",{class:"mr-[4px] mt-[2px]"},"\u968F\u673A\u5C5E\u6027",-1),Re={key:4,class:"w-[190px] mr-[20px] mb-[20px]"},ze={class:"flex items-center text-tx-regular text-xs"},Se=a("span",{class:"mr-[4px] mt-[2px]"},"\u8BDD\u9898\u5C5E\u6027",-1),Ge={key:5,class:"w-[190px] mr-[20px] mb-[20px]"},Ke={class:"flex items-center text-tx-regular text-xs"},Me=a("span",{class:"mr-[4px] mt-[2px]"},"\u91CD\u590D\u5C5E\u6027",-1),Ne={class:"flex"},Oe={class:"form-tips !text-[14px]"},Bu=ae({__name:"session_copy",props:{popRef:{type:Object,default:{}}},setup(V,{expose:w}){const U=V,D=oe(),y=E(""),B=E(),e=E({}),g=E([]),q={api_key:[{required:!0,message:"\u8BF7\u8F93\u5165\u79D8\u94A5",trigger:["blur"]}],api_type:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:["blur"]}]},I=p=>{e.value=B.value[p],e.value.status=1,e.value.api_key.length==0&&(e.value.api_key=[""])},L=()=>{e.value.api_key.push("")},R=p=>{e.value.api_key.splice(p,1)},z=p=>{console.log(U.popRef.open(p))},S=async()=>{const{ai_config_lists:p}=await te();g.value=p,B.value=p,Object.keys(p).map(o=>{p[o].status==1&&(y.value=o,e.value=p[o],e.value.api_key.length==0&&(e.value.api_key=[""]))})},G=async()=>{await D.value.validate(),le(e.value),console.log("\u4FDD\u5B58\u5BF9\u8BDD")};return S(),w({submit:G}),(p,o)=>{const K=ee,M=$,v=H,f=W,h=J,N=ue,O=X,m=se("QuestionFilled"),d=j,c=Y,_=Q,P=Z,T=ne("perms");return s(),n("div",ie,[u(P,{"label-width":"120px",ref_key:"formRef",ref:D,rules:q,model:e.value},{default:l(()=>[u(f,{label:"AI\u63A5\u53E3",class:"is-required"},{default:l(()=>[a("div",null,[u(M,{modelValue:y.value,"onUpdate:modelValue":o[0]||(o[0]=t=>y.value=t),onChange:I},{default:l(()=>[(s(!0),n(C,null,k(g.value,(t,r)=>(s(),F(K,{key:r,label:t.key,disabled:!t.is_open},{default:l(()=>[x(b(t.name),1)]),_:2},1032,["label","disabled"]))),128))]),_:1},8,["modelValue"]),e.value.key=="chatGLM-6B"||e.value.key=="chatGLM-130B"?(s(),n("div",re,[me,a("a",de,[u(v,{type:"primary",link:"",class:"ml-2"},{default:l(()=>[ce]),_:1})])])):i("",!0),e.value.key=="api2d3.5"||e.value.key=="api2d4.0"?(s(),n("div",_e,[Fe,a("a",xe,[u(v,{type:"primary",link:"",class:"ml-2"},{default:l(()=>[ve]),_:1})])])):i("",!0)])]),_:1}),u(f,{label:"apiKey",prop:"api_key"},{default:l(()=>[a("div",null,[a("div",null,[(s(!0),n(C,null,k(e.value.api_key,(t,r)=>(s(),n("div",{class:"flex mb-1",key:r},[u(h,{placeholder:"\u8BF7\u8F93\u5165API\u63A5\u53E3\u5BC6\u94A5",class:"w-[400px]",modelValue:e.value.api_key[r],"onUpdate:modelValue":A=>e.value.api_key[r]=A},null,8,["modelValue","onUpdate:modelValue"]),e.value.key=="gpt3.5"||e.value.key=="gpt4.0"?pe((s(),F(v,{key:0,class:"ml-2",type:"primary",onClick:A=>z(e.value.api_key[r])},{default:l(()=>[fe]),_:2},1032,["onClick"])),[[T,["setting.aiSetting/queryBalance"]]]):i("",!0),r==0?(s(),F(v,{key:1,type:"primary",class:"ml-2",onClick:L,plain:""},{default:l(()=>[Ee]),_:1})):(s(),F(v,{key:2,type:"danger",class:"ml-2",onClick:A=>R(r),plain:""},{default:l(()=>[ye]),_:2},1032,["onClick"]))]))),128))]),Ae])]),_:1}),u(f,{label:"\u6A21\u578B",prop:"name"},{default:l(()=>[a("div",null,[u(O,{class:"w-[400px]",modelValue:e.value.model,"onUpdate:modelValue":o[1]||(o[1]=t=>e.value.model=t)},{default:l(()=>[(s(!0),n(C,null,k(e.value.model_list,t=>(s(),F(N,{value:t,label:t,key:t},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])])]),_:1}),u(f,{label:"\u53C2\u6570\u8BBE\u7F6E",class:"is-required"},{default:l(()=>[a("div",Ce,[e.value.context_num!==""?(s(),n("div",ke,[a("div",De,[Be,u(c,{class:"box-item",effect:"dark",content:"\u751F\u6210\u6587\u672C\u7684\u6700\u5927\u957F\u5EA6\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A1~5\u4E4B\u95F4\u7684\u6574\u6570",placement:"top"},{default:l(()=>[u(d,{size:"16px"},{default:l(()=>[u(m)]),_:1})]),_:1})]),u(_,{modelValue:e.value.context_num,"onUpdate:modelValue":o[2]||(o[2]=t=>e.value.context_num=t),min:1,max:5},null,8,["modelValue"])])):i("",!0),e.value.n!==""?(s(),n("div",ge,[a("div",he,[be,u(c,{class:"box-item",effect:"dark",content:"\u4E3A\u6BCF\u4E2A\u8F93\u5165\u6D88\u606F\u751F\u6210\u591A\u5C11\u4E2A\u804A\u5929\u5B8C\u6210\u9009\u9879\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A1~5\u4E4B\u95F4\u7684\u6574\u6570\u3002",placement:"top"},{default:l(()=>[u(d,{size:"16px"},{default:l(()=>[u(m)]),_:1})]),_:1})]),u(_,{modelValue:e.value.n,"onUpdate:modelValue":o[3]||(o[3]=t=>e.value.n=t),min:1,max:5},null,8,["modelValue"])])):i("",!0),e.value.temperature!==""?(s(),n("div",Ve,[a("div",we,[Ue,u(c,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u7684\u968F\u673A\u6027\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.7\u5DE6\u53F3\u3002",placement:"top"},{default:l(()=>[u(d,{size:"16px"},{default:l(()=>[u(m)]),_:1})]),_:1})]),u(_,{modelValue:e.value.temperature,"onUpdate:modelValue":o[4]||(o[4]=t=>e.value.temperature=t),min:0,max:1,step:.1},null,8,["modelValue","step"])])):i("",!0),e.value.top_p!==""?(s(),n("div",qe,[a("div",Ie,[Le,u(c,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u7684\u591A\u6837\u6027\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.9\u5DE6\u53F3\u3002",placement:"top"},{default:l(()=>[u(d,{size:"16px"},{default:l(()=>[u(m)]),_:1})]),_:1})]),u(_,{modelValue:e.value.top_p,"onUpdate:modelValue":o[5]||(o[5]=t=>e.value.top_p=t),min:0,max:1,step:.1},null,8,["modelValue","step"])])):i("",!0),e.value.presence_penalty!==""?(s(),n("div",Re,[a("div",ze,[Se,u(c,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u4E2D\u662F\u5426\u51FA\u73B0\u7ED9\u5B9A\u7684\u5173\u952E\u8BCD\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.5\u5DE6\u53F3\u3002",placement:"top"},{default:l(()=>[u(d,{size:"16px"},{default:l(()=>[u(m)]),_:1})]),_:1})]),u(_,{modelValue:e.value.presence_penalty,"onUpdate:modelValue":o[6]||(o[6]=t=>e.value.presence_penalty=t),step:.1,min:0,max:1},null,8,["modelValue","step"])])):i("",!0),e.value.frequency_penalty!==""?(s(),n("div",Ge,[a("div",Ke,[Me,u(c,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u4E2D\u91CD\u590D\u7684\u7A0B\u5EA6\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.5\u5DE6\u53F3",placement:"top"},{default:l(()=>[u(d,{size:"16px"},{default:l(()=>[u(m)]),_:1})]),_:1})]),u(_,{modelValue:e.value.frequency_penalty,"onUpdate:modelValue":o[7]||(o[7]=t=>e.value.frequency_penalty=t),step:.1,min:0,max:1},null,8,["modelValue","step"])])):i("",!0)])]),_:1}),e.value.key!=="chatGLM"?(s(),F(f,{key:0,label:"\u81EA\u5B9A\u4E49API\u57DF\u540D",prop:"agency_api"},{default:l(()=>[a("div",null,[a("div",Ne,[u(h,{placeholder:"\u8BF7\u8F93\u5165\u81EA\u5B9A\u4E49API\u57DF\u540D",class:"w-[400px]",modelValue:e.value.agency_api,"onUpdate:modelValue":o[8]||(o[8]=t=>e.value.agency_api=t)},null,8,["modelValue"])]),a("div",Oe," \u53CD\u5411\u4EE3\u7406API\u57DF\u540D\uFF0C\u4E0D\u586B\u5199\u9ED8\u8BA4\u4E3A\uFF1A"+b(e.value.key=="api2d3.5"||e.value.key=="api2d4.0"?"https://openai.api2d.net":"https://api.openai.com"),1)])]),_:1})):i("",!0)]),_:1},8,["model"])])}}});export{Bu as default};