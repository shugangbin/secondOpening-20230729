import{_ as h}from"./index.f9197633.js";import{y,M as C,w as D,x as V}from"./element-plus.6ae56789.js";import{_ as x}from"./session.vue_vue_type_script_setup_true_lang.7c9853b6.js";import{_ as E}from"./draw.vue_vue_type_script_setup_true_lang.218f763e.js";import{d as R,s as i,r as T,ar as A,o,c as s,V as e,M as a,W as F,aa as L,u as _,S as u,O as N,L as S,T as $}from"./@vue.581f5ce0.js";import"./vue-drag-resize.3665149e.js";import"./lodash-es.b552e321.js";import"./async-validator.fb49d0f5.js";import"./@vueuse.08c79704.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./ai_model_cost.ddaa8be7.js";import"./index.9ffd2ade.js";import"./lodash.11e5b415.js";import"./vue-router.f90229e4.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";const I={key:0},M={key:1},O=$(" \u4FDD\u5B58 "),xe=R({__name:"index",setup(P){const n=i(),m=i(),p=i(),t=T("session"),c=[{name:"AI\u5BF9\u8BDD\u6A21\u578B",label:"session"},{name:"AI\u7ED8\u753B\u6A21\u578B",label:"draw"}],f=()=>{switch(t.value){case"session":m.value.submit();break;case"draw":p.value.submit();break}};return(U,l)=>{const d=V,b=y,v=C,w=D,B=h,k=A("perms");return o(),s("div",null,[e(v,{shadow:"never",class:"!border-none mt-4"},{default:a(()=>[e(b,{modelValue:t.value,"onUpdate:modelValue":l[0]||(l[0]=r=>t.value=r)},{default:a(()=>[(o(),s(F,null,L(c,(r,g)=>e(d,{label:`${r.name}`,name:r.label,key:g},null,8,["label","name"])),64))]),_:1},8,["modelValue"]),t.value=="session"?(o(),s("div",I,[e(x,{ref_key:"sessionRef",ref:m,"pop-ref":_(n)},null,8,["pop-ref"])])):u("",!0),t.value=="draw"?(o(),s("div",M,[e(E,{ref_key:"drawRef",ref:p,"pop-ref":_(n)},null,8,["pop-ref"])])):u("",!0)]),_:1}),e(B,null,{default:a(()=>[N((o(),S(w,{type:"primary",onClick:f},{default:a(()=>[O]),_:1})),[[k,["setting.aiSetting/setChatBillingConfig","setting.aiSetting/setDrawBillingConfig"]]])]),_:1})])}}});export{xe as default};
