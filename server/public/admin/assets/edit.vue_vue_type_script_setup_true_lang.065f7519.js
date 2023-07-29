import{B as x,C as A,I as P,t as R,D as U}from"./element-plus.6ae56789.js";import{r as n}from"./index.9ffd2ade.js";import{g as q}from"./draw_category.c6bb4f1b.js";import{P as L}from"./index.e9e37d9e.js";import{d as S,s as B,r as c,_ as I,o as _,c as F,V as t,M as p,L as N,a as d,W as j}from"./@vue.581f5ce0.js";function ue(l){return n.get({url:"/draw.draw_prompt/lists",params:l})}function z(l){return n.post({url:"/draw.draw_prompt/add",params:l})}function M(l){return n.post({url:"/draw.draw_prompt/edit",params:l})}function te(l){return n.post({url:"/draw.draw_prompt/delete",params:l})}function oe(l){return n.post({url:"/draw.draw_prompt/status",params:l})}const O={class:"edit-popup"},T={class:"w-full"},W=d("div",{class:"form-tips"},"\u6DFB\u52A0\u591A\u4E2A\u5173\u952E\u8BCD\uFF0C\u4E2D\u82F1\u6587\u4EE5&\u9694\u5F00\uFF0C\u6309\u56DE\u8F66\u6362\u884C",-1),G={class:"w-full"},H={class:"w-full"},J={class:"w-full"},K=d("div",{class:"form-tips"},"\u9ED8\u8BA4\u4E3A0\uFF0C\u6570\u636E\u8D8A\u5927\u8D8A\u6392\u524D\u9762",-1),le=S({__name:"edit",emits:["success","close"],setup(l,{expose:C,emit:f}){const v=B(),i=B(),m=c(""),E=c([]),w=I({multiple:!1,checkStrictly:!0,label:"name",value:"id",children:"children",emitPath:!1}),e=c({id:"",category_id:"",prompt:"",prompt_en:"",sort:0,status:"1"}),g={prompt:[{required:!0,message:"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD",trigger:["blur"]}],prompt_en:[{required:!0,message:"\u8BF7\u8F93\u5165\u82F1\u6587\u5173\u952E\u8BCD",trigger:["blur"]}],category_id:[{required:!0,message:"\u8BF7\u9009\u62E9\u6240\u5C5E\u7C7B\u76EE",trigger:["blur"]}]},D=async()=>{const s=await q();E.value=s},V=async()=>{var s,u;try{await((s=v.value)==null?void 0:s.validate()),e.value.id==""?await z({...e.value,prompt:e.value.prompt.split(`
`)}):e.value.id!=""&&await M(e.value),(u=i.value)==null||u.close(),f("success")}catch(a){return a}},y=()=>{f("close")};return C({open:(s,u)=>{var a;D(),s=="add"?(e.value={id:"",category_id:"",prompt:"",prompt_en:"",sort:0,status:1},m.value="\u65B0\u589E\u5173\u952E\u8BCD"):s=="edit"&&(Object.keys(e.value).map(r=>{e.value[r]=u[r]}),console.log(e.value,u),m.value="\u7F16\u8F91\u5173\u952E\u8BCD"),(a=i.value)==null||a.open()}}),(s,u)=>{const a=x,r=A,b=P,h=R,k=U;return _(),F("div",O,[t(L,{ref_key:"popupRef",ref:i,title:m.value,async:!0,width:"550px",onConfirm:V,onClose:y},{default:p(()=>[t(k,{ref_key:"formRef",ref:v,rules:g,model:e.value,"label-width":"100px"},{default:p(()=>[e.value.id?(_(),F(j,{key:1},[t(r,{label:"\u82F1\u6587\u5173\u952E\u8BCD",prop:"prompt_en"},{default:p(()=>[d("div",G,[t(a,{modelValue:e.value.prompt_en,"onUpdate:modelValue":u[1]||(u[1]=o=>e.value.prompt_en=o),placeholder:"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD"},null,8,["modelValue"])])]),_:1}),t(r,{label:"\u4E2D\u6587\u5173\u952E\u8BCD",prop:"prompt"},{default:p(()=>[d("div",H,[t(a,{modelValue:e.value.prompt,"onUpdate:modelValue":u[2]||(u[2]=o=>e.value.prompt=o),placeholder:"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD"},null,8,["modelValue"])])]),_:1})],64)):(_(),N(r,{key:0,label:"\u5173\u952E\u8BCD",prop:"prompt"},{default:p(()=>[d("div",T,[t(a,{modelValue:e.value.prompt,"onUpdate:modelValue":u[0]||(u[0]=o=>e.value.prompt=o),type:"textarea",autosize:{minRows:8,maxRows:20},placeholder:`\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\uFF0C\u5982\uFF1ASurrealism&\u8D85\u73B0\u5B9E\u4E3B\u4E49
Baroque&\u5DF4\u6D1B\u514B
modern&\u73B0\u4EE3`},null,8,["modelValue"]),W])]),_:1})),t(r,{label:"\u6240\u5C5E\u7C7B\u76EE",prop:"category_id"},{default:p(()=>[t(b,{class:"w-full",modelValue:e.value.category_id,"onUpdate:modelValue":u[3]||(u[3]=o=>e.value.category_id=o),options:E.value,props:w,clearable:!0,filterable:!0},null,8,["modelValue","options","props"])]),_:1}),t(r,{label:"\u6392\u5E8F",prop:"sort"},{default:p(()=>[d("div",J,[t(a,{type:"text",modelValue:e.value.sort,"onUpdate:modelValue":u[4]||(u[4]=o=>e.value.sort=o),min:0,max:9999},null,8,["modelValue"]),K])]),_:1}),t(r,{label:"\u72B6\u6001",prop:"sort"},{default:p(()=>[t(h,{modelValue:e.value.status,"onUpdate:modelValue":u[5]||(u[5]=o=>e.value.status=o),"active-value":1,"inactive-value":0},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["title"])])}}});export{le as _,te as d,oe as e,ue as g};
