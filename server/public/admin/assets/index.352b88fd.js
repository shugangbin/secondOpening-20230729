import{_ as A}from"./index.f9197633.js";import{G as C,H as D,C as V,B as b,M as x,D as w,w as k}from"./element-plus.6ae56789.js";import{_ as y}from"./picker.329c432e.js";import{r as d}from"./index.9ffd2ade.js";import{d as M,r as S,ar as U,o as _,c as N,a as r,V as e,M as o,O as R,L as j,W as G,T as i}from"./@vue.581f5ce0.js";import"./vue-drag-resize.3665149e.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.e9e37d9e.js";import"./index.096b96ba.js";import"./index.vue_vue_type_script_setup_true_lang.c594a7c2.js";import"./index.d607c7e6.js";import"./index.f4a54ccc.js";import"./index.vue_vue_type_script_setup_true_lang.7128683d.js";import"./usePaging.2d3fb421.js";import"./vue3-video-play.35f34caf.js";import"./vuedraggable.bb90125a.js";import"./vue.9fe3e23f.js";import"./sortablejs.75a2e2a2.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";function I(){return d.get({url:"/setting.shareSetting/getConfig"})}function T(s){return d.post({url:"/setting.shareSetting/setConfig",params:s})}const q={class:""},H=r("div",{class:"text-xl font-medium mb-[20px]"},"\u5206\u4EAB\u8BBE\u7F6E",-1),L=i("\u5F53\u524D\u9875\u9762"),O=i("\u9996\u9875"),W=r("div",{class:"form-tips"}," \u7528\u6237\u4F7F\u7528\u5FAE\u4FE1\u5206\u4EAB\u628A\u5546\u57CE\u9875\u9762\u53D1\u9001\u7ED9\u5FAE\u4FE1\u597D\u53CB\u65F6\uFF0C\u5206\u4EAB\u5F53\u524D\u9875\u9762\u5BF9\u5E94\u7684\u94FE\u63A5\u3002 ",-1),z={class:"w-80"},J={class:"w-80"},K=r("div",{class:"form-tips"},"\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A\u5BBD200px*\u9AD8200px\u3002jpg\uFF0Cjpeg\uFF0Cpng\u683C\u5F0F",-1),P=i("\u4FDD\u5B58"),We=M({__name:"index",setup(s){const t=S({share_page:1,share_title:"",share_content:"",share_image:""}),m=async()=>{t.value=await I()};m();const c=async()=>{await T(t.value),m()};return(Q,u)=>{const n=C,f=D,l=V,p=b,E=y,F=x,B=w,g=k,h=A,v=U("perms");return _(),N(G,null,[r("div",q,[e(B,{ref:"formRef",class:"ls-form",model:t.value,"label-width":"120px"},{default:o(()=>[e(F,{shadow:"never",class:"!border-none"},{default:o(()=>[H,e(l,{label:"\u5206\u4EAB\u9875\u9762",prop:"name"},{default:o(()=>[r("div",null,[e(f,{modelValue:t.value.share_page,"onUpdate:modelValue":u[0]||(u[0]=a=>t.value.share_page=a),class:"ml-4"},{default:o(()=>[e(n,{label:1},{default:o(()=>[L]),_:1}),e(n,{label:2},{default:o(()=>[O]),_:1})]),_:1},8,["modelValue"]),W])]),_:1}),e(l,{label:"\u5206\u4EAB\u6807\u9898",prop:"name"},{default:o(()=>[r("div",z,[e(p,{modelValue:t.value.share_title,"onUpdate:modelValue":u[1]||(u[1]=a=>t.value.share_title=a),modelModifiers:{trim:!0},placeholder:"\u5206\u4EAB\u6807\u9898\uFF0C\u4E0D\u586B\u5219\u4E3A\u5F53\u524D\u9875\u9762\u6807\u9898"},null,8,["modelValue"])])]),_:1}),e(l,{label:"\u5206\u4EAB\u7B80\u4ECB",prop:"name"},{default:o(()=>[r("div",J,[e(p,{modelValue:t.value.share_content,"onUpdate:modelValue":u[2]||(u[2]=a=>t.value.share_content=a),modelModifiers:{trim:!0},placeholder:"\u5206\u4EAB\u7B80\u4ECB\uFF0C\u4E0D\u586B\u5219\u4E3A\u7A7A",type:"textarea",row:5},null,8,["modelValue"])])]),_:1}),e(l,{label:"\u5206\u4EAB\u5C01\u9762",prop:"name"},{default:o(()=>[r("div",null,[e(E,{modelValue:t.value.share_image,"onUpdate:modelValue":u[3]||(u[3]=a=>t.value.share_image=a),limit:1},null,8,["modelValue"]),K])]),_:1})]),_:1})]),_:1},8,["model"])]),R((_(),j(h,null,{default:o(()=>[e(g,{type:"primary",onClick:c},{default:o(()=>[P]),_:1})]),_:1})),[[v,["setting.shareSetting/setConfig"]]])],64)}}});export{We as default};
