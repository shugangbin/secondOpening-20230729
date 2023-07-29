import{_ as Se}from"./index.f9197633.js";import{P as ke}from"./index.e9e37d9e.js";import{t as oe,L as ae,K as ne,B as re,v as se,H as Re,$ as $e,G as Oe,C as ie,D as pe,c as je,a0 as Te,_ as qe,M as Ue,a as Ie,w as te,Y as Ne,N as Me,O as Pe}from"./element-plus.6ae56789.js";import{n as ze,o as me,j as We}from"./lodash-es.b552e321.js";import{d as A,e as y,o as d,L as V,u as f,k as W,M as a,c as g,aa as U,W as j,R as Le,T,U as Q,q as de,v as Ge,h as Qe,B as He,s as $,r as O,l as Je,V as u,a as c,Q as Ke,S as R,_ as Ye,j as Xe,n as K,ag as Ze}from"./@vue.581f5ce0.js";import{l as et}from"./lodash.11e5b415.js";import{f as tt,b as ut,e as lt}from"./index.9ffd2ade.js";import{_ as ot}from"./picker.329c432e.js";import{u as at,a as nt}from"./vue-router.f90229e4.js";import{e as rt,a as st,c as it}from"./creative_model.dfb2a320.js";import{b as pt}from"./creative_category.98939a3e.js";import{S as mt}from"./sortablejs.75a2e2a2.js";import{g as dt}from"./AI.48e5a31c.js";import{e as ue}from"./@vueuse.08c79704.js";import"./vue-drag-resize.3665149e.js";import"./async-validator.fb49d0f5.js";import"./@element-plus.46540d94.js";import"./dayjs.a4f69d40.js";import"./axios.7b99d80a.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./pinia.8de84ecb.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.fc24180d.js";import"./color.bbb520d8.js";import"./clone.d1f13862.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.ef687e1e.js";import"./ms.a9ae1d6d.js";import"./nprogress.cc8edd65.js";import"./vue-clipboard3.53fa8894.js";import"./clipboard.a704446d.js";import"./echarts.8d7a50ae.js";import"./zrender.1084fa23.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.18a086c3.js";import"./index.096b96ba.js";import"./index.vue_vue_type_script_setup_true_lang.c594a7c2.js";import"./index.d607c7e6.js";import"./index.f4a54ccc.js";import"./index.vue_vue_type_script_setup_true_lang.7128683d.js";import"./usePaging.2d3fb421.js";import"./vue3-video-play.35f34caf.js";import"./vuedraggable.bb90125a.js";import"./vue.9fe3e23f.js";const ct={name:"WidgetCheckbox",title:"\u591A\u9009",props:[{name:"title",label:"\u5B57\u6BB5\u6807\u9898",type:"string",setter:{name:"String",props:{placeholder:"\u8BF7\u8F93\u5165\u5B57\u6BB5\u6807\u9898"}}},{name:"options",label:"\u9009\u9879",type:"array",tip:"\u6BCF\u4E00\u884C\u4E00\u4E2A\u9009\u9879\uFF0C\u6BCF\u884C\u6700\u591A\u4E0D\u8D85\u8FC750\u4E2A\u5B57\uFF0C\u6700\u591A50\u884C",setter:{name:"String",props:{placeholder:`\u793A\u4F8B\uFF1AA
B
C`,type:"textarea",rows:4,onChange(e,l){l.options=Array.from(new Set(l.options)).filter(r=>r)}}},getValue(e){return e.options.join(`
`)},setValue(e,l){e.options=l.split(`
`)},defaultValue:[]},{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",type:"array",setter:{name:"Select",props:{"get:options"(e){return e.options},clearable:!0,multiple:!0}}},{name:"isRequired",label:"\u662F\u5426\u5FC5\u586B",type:"boolean",setter:{name:"Bool"},defaultValue:!1}],sort:5},_t=Object.freeze(Object.defineProperty({__proto__:null,default:ct},Symbol.toStringTag,{value:"Module"})),ft={name:"WidgetInput",title:"\u5355\u884C\u6587\u672C",props:[{name:"title",label:"\u5B57\u6BB5\u6807\u9898",type:"string",setter:{name:"String",props:{placeholder:"\u8BF7\u8F93\u5165\u5B57\u6BB5\u6807\u9898"}}},{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",type:"string",condition:()=>!1,setter:"String",defaultValue:""},{name:"placeholder",label:"\u793A\u4F8B\u6587\u5B57",type:"string",setter:{name:"String",props:{placeholder:"\u8BF7\u8F93\u5165"}}},{name:"maxlength",label:"\u6700\u5927\u8F93\u5165\u957F\u5EA6",type:"number",setter:{name:"Number",props:{min:0}},defaultValue:200},{name:"isRequired",label:"\u662F\u5426\u5FC5\u586B",type:"boolean",setter:{name:"Bool"},defaultValue:!1}],sort:1},Ft=Object.freeze(Object.defineProperty({__proto__:null,default:ft},Symbol.toStringTag,{value:"Module"})),Bt={name:"WidgetRadio",title:"\u5355\u9009",props:[{name:"title",label:"\u5B57\u6BB5\u6807\u9898",type:"string",setter:{name:"String",props:{placeholder:"\u8BF7\u8F93\u5165\u5B57\u6BB5\u6807\u9898"}}},{name:"options",label:"\u9009\u9879",type:"array",tip:"\u6BCF\u4E00\u884C\u4E00\u4E2A\u9009\u9879\uFF0C\u6BCF\u884C\u6700\u591A\u4E0D\u8D85\u8FC750\u4E2A\u5B57\uFF0C\u6700\u591A50\u884C",setter:{name:"String",props:{placeholder:`\u793A\u4F8B\uFF1AA
B
C`,type:"textarea",rows:4,onChange(e,l){l.options=Array.from(new Set(l.options)).filter(r=>r)}}},getValue(e){return e.options.join(`
`)},setValue(e,l){e.options=l.split(`
`)},defaultValue:[]},{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",type:"string",setter:{name:"Select",props:{"get:options"(e){return e.options},clearable:!0}}},{name:"isRequired",label:"\u662F\u5426\u5FC5\u586B",type:"boolean",setter:{name:"Bool"},defaultValue:!1}],sort:4},bt=Object.freeze(Object.defineProperty({__proto__:null,default:Bt},Symbol.toStringTag,{value:"Module"})),gt={name:"WidgetSelect",title:"\u4E0B\u62C9\u9009\u9879",props:[{name:"title",label:"\u5B57\u6BB5\u6807\u9898",type:"string",setter:{name:"String",props:{placeholder:"\u8BF7\u8F93\u5165\u5B57\u6BB5\u6807\u9898"}}},{name:"options",label:"\u9009\u9879",type:"array",tip:"\u6BCF\u4E00\u884C\u4E00\u4E2A\u9009\u9879\uFF0C\u6BCF\u884C\u6700\u591A\u4E0D\u8D85\u8FC750\u4E2A\u5B57\uFF0C\u6700\u591A50\u884C",setter:{name:"String",props:{placeholder:`\u793A\u4F8B\uFF1AA
B
C`,type:"textarea",rows:4,onChange(e,l){l.options=Array.from(new Set(l.options)).filter(r=>r)}}},getValue(e){return e.options.join(`
`)},setValue(e,l){e.options=l.split(`
`)},defaultValue:[]},{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",type:"string",setter:{name:"Select",props:{"get:options"(e){return e.options},clearable:!0}}},{name:"isRequired",label:"\u662F\u5426\u5FC5\u586B",type:"boolean",setter:{name:"Bool"},defaultValue:!1}],sort:3},vt=Object.freeze(Object.defineProperty({__proto__:null,default:gt},Symbol.toStringTag,{value:"Module"})),yt={name:"WidgetTextarea",title:"\u591A\u884C\u6587\u672C",props:[{name:"title",label:"\u5B57\u6BB5\u6807\u9898",type:"string",setter:{name:"String",props:{placeholder:"\u8BF7\u8F93\u5165\u5B57\u6BB5\u6807\u9898"}}},{name:"placeholder",label:"\u793A\u4F8B\u6587\u5B57",type:"string",setter:{name:"String",props:{placeholder:"\u8BF7\u8F93\u5165"}}},{name:"rows",label:"\u9ED8\u8BA4\u884C\u6570",type:"number",setter:{name:"Number",props:{min:0}},defaultValue:4},{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",type:"string",condition:()=>!1,setter:"String",defaultValue:""},{name:"maxlength",label:"\u6700\u5927\u8F93\u5165\u957F\u5EA6",type:"number",setter:{name:"Number",props:{min:0}},defaultValue:200},{name:"autosize",label:"\u9AD8\u5EA6\u81EA\u9002\u5E94",type:"boolean",setter:{name:"Bool"},defaultValue:!1},{name:"isRequired",label:"\u662F\u5426\u5FC5\u586B",type:"boolean",setter:{name:"Bool"},defaultValue:!1}],sort:2},Vt=Object.freeze(Object.defineProperty({__proto__:null,default:yt},Symbol.toStringTag,{value:"Module"})),Ct={string:"",boolean:!1,number:0,array:()=>[],object:()=>({})};function Et(e,l={}){var r;if(!ze(e))return e;for(const o of e)if(o.name){let p=null;o.defaultValue!==void 0?p=o.defaultValue:p=(r=Ct[o.type])!=null?r:null,l[o.name]=me(p)?p():p}return l}const xt=e=>{if(typeof e!="string")return e;let l;const r=`return function() {
    const self = this
    try {
      return (${e}).apply(self, arguments)
    } catch(e) {
      console.log(e)
    }
  }`;try{l=new Function(r)()}catch(o){console.error(o)}return l},At=A({__name:"bool",props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(e,{emit:l}){const r=e,o=y({get(){return r.modelValue},set(p){l("update:modelValue",p)}});return(p,t)=>(d(),V(f(oe),{modelValue:f(o),"onUpdate:modelValue":t[0]||(t[0]=s=>W(o)?o.value=s:null)},null,8,["modelValue"]))}}),ht=A({__name:"select",props:{modelValue:null,options:null},emits:["update:modelValue"],setup(e,{emit:l}){const r=e,o=y({get(){return r.modelValue},set(t){l("update:modelValue",t)}}),p=y(()=>r.options.map(t=>et.exports.isObject(t)?t:{label:t,value:t}));return(t,s)=>(d(),V(f(ae),{modelValue:f(o),"onUpdate:modelValue":s[0]||(s[0]=B=>W(o)?o.value=B:null),teleported:!0,style:{width:"100%"}},{default:a(()=>[(d(!0),g(j,null,U(f(p),B=>(d(),V(f(ne),{key:B.value,label:B.label,value:B.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]))}}),Dt=A({__name:"string",props:{modelValue:null},emits:["update:modelValue"],setup(e,{emit:l}){const r=e,o=y({get(){return r.modelValue},set(p){l("update:modelValue",p)}});return(p,t)=>(d(),V(f(re),{modelValue:f(o),"onUpdate:modelValue":t[0]||(t[0]=s=>W(o)?o.value=s:null)},null,8,["modelValue"]))}}),wt=A({__name:"number",props:{modelValue:null},emits:["update:modelValue"],setup(e,{emit:l}){const r=e,o=y({get(){return r.modelValue},set(p){l("update:modelValue",p)}});return(p,t)=>(d(),V(f(se),{modelValue:f(o),"onUpdate:modelValue":t[0]||(t[0]=s=>W(o)?o.value=s:null)},null,8,["modelValue"]))}}),St=A({__name:"radio",props:{modelValue:{type:[String,Number,Boolean]},options:null,type:null},emits:["update:modelValue"],setup(e,{emit:l}){const r=e,o=y({get(){return r.modelValue},set(p){l("update:modelValue",p)}});return(p,t)=>(d(),V(f(Re),{modelValue:f(o),"onUpdate:modelValue":t[0]||(t[0]=s=>W(o)?o.value=s:null)},{default:a(()=>[(d(!0),g(j,null,U(e.options,s=>(d(),V(Le(r.type=="button"?f($e):f(Oe)),{key:s.value,label:s.value,name:s.label},{default:a(()=>[T(Q(s.label),1)]),_:2},1032,["label","name"]))),128))]),_:1},8,["modelValue"]))}}),kt=Object.freeze(Object.defineProperty({__proto__:null,Bool:At,Select:ht,String:Dt,Number:wt,Radio:St},Symbol.toStringTag,{value:"Module"})),ce=new Map(Object.entries(kt));console.log(ce);function Rt(e){return ce.get(e)||null}function $t(e){const l=_e(e),r=Rt(l);return r||null}function Ot(e,l){return Ge(e)?null:de(e)?l?e.name===l?e.props:null:e.props:null}function _e(e){return de(e)?e.name:e}const jt="on",le="get:",Tt=A({props:{modelValue:{type:Object,required:!0},setterName:{type:String},propsItem:{type:Object,required:!0}},emits:["update:modelValue"],setup(e,{emit:l}){const r=y(()=>{var s;const t=e.modelValue[e.propsItem.name];return e.propsItem.getValue&&(s=e.propsItem.getValue(e.modelValue))!=null?s:t}),o=t=>{const s=e.modelValue;s[e.propsItem.name]=t,e.propsItem.setValue&&e.propsItem.setValue(e.modelValue,t),l("update:modelValue",e.modelValue)},p=y(()=>{const t=Ot(e.propsItem.setter,e.setterName);for(const s in t)if(He(t[s])){const B=t[s];s.startsWith(jt)?t[s]=function(C){B(C,e.modelValue)}:s.startsWith(le)&&(t[s.replace(le,"")]=B(e.modelValue))}return t});return()=>{if(!e.setterName)return null;const t=$t(e.setterName);return t?Qe(t,{modelValue:r.value,"onUpdate:modelValue":o,...p.value}):null}}});let qt=Date.now();function Ut(e=""){return e=e?`${e}_`:"",`${e}${(qt++).toString(36).toLowerCase()}`}const It={class:"flex flex-wrap mx-[-5px]"},Nt=["onClick"],Mt={class:"flex-1"},Pt={class:"form-tips"},zt=A({__name:"container",props:{modelValue:null},emits:["update:modelValue"],setup(e,{emit:l}){const r=e,o=Object.values(Object.assign({"./material/checkbox.ts":_t,"./material/input.ts":Ft,"./material/radio.ts":bt,"./material/select.ts":vt,"./material/textarea.ts":Vt})).map(m=>(m==null?void 0:m.default)||(m==null?void 0:m.meta)).sort((m,F)=>m.sort-F.sort),p=y({get(){return r.modelValue},set(m){l("update:modelValue",m)}}),t=$(),s=y({get(){const m=o.findIndex(F=>F.name===p.value.name);return B.value=o[m],m!==-1?m:0},set(m){var F,b,h;B.value=o[m],p.value={name:(F=B.value)==null?void 0:F.name,title:(b=B.value)==null?void 0:b.title,id:p.value.id||Ut(),props:Et(((h=B.value)==null?void 0:h.props)||{})}}}),B=O(),C=m=>{s.value=m};Je(()=>{var m;(m=p.value)!=null&&m.id||C(0)});const L=m=>m?me(m)?m(p):m.type=="JSFunction"?xt(m.value)(p):!0:!0;return(m,F)=>{const b=ie,h=pe;return d(),V(h,{ref_key:"formRef",ref:t,"label-width":"105px"},{default:a(()=>{var G;return[u(b,{label:"\u7C7B\u578B",prop:"name"},{default:a(()=>[c("div",It,[(d(!0),g(j,null,U(f(o),(v,w)=>(d(),g("div",{class:Ke(["cursor-pointer px-4 border border-br border-solid rounded m-[5px]",{"border-primary text-primary":f(s)===w}]),key:w,onClick:Y=>C(w)},Q(v.title),11,Nt))),128))])]),_:1}),(d(!0),g(j,null,U((G=B.value)==null?void 0:G.props,v=>(d(),g(j,null,[L(v.condition)?(d(),V(b,{key:v.name,label:v.label,prop:v.name},{default:a(()=>[c("div",Mt,[u(f(Tt),{modelValue:f(p).props,"onUpdate:modelValue":F[0]||(F[0]=w=>f(p).props=w),"setter-name":f(_e)(v.setter),"props-item":v},null,8,["modelValue","setter-name","props-item"]),c("div",Pt,Q(v.tip),1)])]),_:2},1032,["label","prop"])):R("",!0)],64))),256))]}),_:1},512)}}}),Wt={class:"edit-popup"},Lt=A({__name:"popup",emits:["add","edit"],setup(e,{expose:l,emit:r}){const o=O({name:"",id:"",title:"",props:{}}),p=$(),t=$(),s=O("add"),B=y(()=>s.value=="edit"?"\u7F16\u8F91\u8868\u5355\u9879":"\u6DFB\u52A0\u8868\u5355\u9879"),C=async()=>{var F,b;await((F=p.value)==null?void 0:F.validate()),s.value=="add"?r("add",o.value):r("edit",o.value),(b=t.value)==null||b.close()};return l({open:(F="add")=>{var b;s.value=F,F==="add"&&(o.value={name:"",id:"",title:"",props:{}}),(b=t.value)==null||b.open()},setFormData:F=>{o.value=We(F)}}),(F,b)=>(d(),g("div",Wt,[u(ke,{ref_key:"popupRef",ref:t,title:f(B),async:!0,width:"550px","destroy-on-close":"",onConfirm:C},{default:a(()=>[u(zt,{modelValue:o.value,"onUpdate:modelValue":b[0]||(b[0]=h=>o.value=h)},null,8,["modelValue"])]),_:1},8,["title"])]))}}),Gt="/admin/assets/example.5f35833a.png";function Qt(e,l){if(e.focus(),e.selectionStart!==void 0){const r=e.selectionStart,o=e.selectionEnd;typeof e.setRangeText!==void 0?e.setRangeText(l):e.value=e.value.substring(0,r)+l+e.value.substring(o,e.value.length),e.selectionStart=r+l.length,e.selectionEnd=r+l.length}else e.value+=l;return e.value}const Ht={class:"w-[380px]"},Jt={class:"w-[380px]"},Kt={class:"w-[380px]"},Yt={class:"w-[380px]"},Xt={class:"flex flex-wrap mx-[-5px]"},Zt={class:"max-w-[100px]"},eu={key:0,class:"flex flex-wrap max-w-[700px]"},tu={key:0,class:"w-[200px] mr-[20px] mb-[20px]"},uu={class:"flex items-center text-tx-regular text-xs"},lu=c("span",{class:"mr-[4px] mt-[2px]"},"\u6700\u5927\u56DE\u590D",-1),ou={key:1,class:"w-[200px] mr-[20px] mb-[20px]"},au={class:"flex items-center text-tx-regular text-xs"},nu=c("span",{class:"mr-[4px] mt-[2px]"},"\u8BCD\u6C47\u5C5E\u6027",-1),ru={key:2,class:"w-[200px] mr-[20px] mb-[20px]"},su={class:"flex items-center text-tx-regular text-xs"},iu=c("span",{class:"mr-[4px] mt-[2px]"},"\u968F\u673A\u5C5E\u6027",-1),pu={key:3,class:"w-[200px] mr-[20px] mb-[20px]"},mu={class:"flex items-center text-tx-regular text-xs"},du=c("span",{class:"mr-[4px] mt-[2px]"},"\u8BDD\u9898\u5C5E\u6027",-1),cu={key:4,class:"w-[200px] mr-[20px] mb-[20px]"},_u={class:"flex items-center text-tx-regular text-xs"},fu=c("span",{class:"mr-[4px] mt-[2px]"},"\u91CD\u590D\u5C5E\u6027",-1),Fu={class:"flex-1 min-w-0 max-w-[1000px]"},Bu={class:"flex"},bu=T("\u6DFB\u52A0"),gu=T("\u67E5\u770B\u793A\u4F8B"),vu=c("img",{src:Gt},null,-1),yu={class:"mt-4"},Vu={class:"move-icon cursor-move"},Cu=T(" \u7F16\u8F91 "),Eu=T(" \u5220\u9664 "),xu=T("\u4FDD\u5B58"),El=A({__name:"edit",setup(e){const l=$(),{query:r}=at(),o=nt(),p=y(()=>r.mode=="edit"?"\u7F16\u8F91\u521B\u4F5C\u6A21\u578B":"\u65B0\u589E\u521B\u4F5C\u6A21\u578B"),t=Ye({id:"",name:"",tips:"",category_id:"",content:"",sort:1,status:1,image:"",form:[],n:1,temperature:.7,top_p:.9,frequency_penalty:.5,presence_penalty:.5}),s=$(),B=()=>{const _=s.value.$el.querySelector(".el-table__body tbody");mt.create(_,{animation:150,handle:".move-icon",onEnd:({newIndex:n,oldIndex:k})=>{console.log(n,k);const E=t.form,H=E.splice(k,1)[0];E.splice(n,0,H),t.form=[],K(()=>{t.form=E})}})},C=$(),L=_=>{var n;t.content=Qt((n=C.value)==null?void 0:n.textarea,`\${${_}}`)},m=O([]),F={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0"}],tips:[{required:!0,message:"\u8BF7\u8F93\u5165\u6A21\u578B\u63CF\u8FF0"}],content:[{required:!0,message:"\u8BF7\u8F93\u5165\u8C03\u6559\u6587\u6848"}],category_id:[{required:!0,message:"\u8BF7\u9009\u62E9\u6240\u5C5E\u7C7B\u76EE"}],image:[{required:!0,message:"\u8BF7\u9009\u62E9\u6A21\u578B\u56FE\u6807"}],form:[{type:"array",required:!0,message:"\u8BF7\u6DFB\u52A0\u8868\u5355\u5185\u5BB9"}]},b=$(),h=async()=>{var _;await K(),(_=b.value)==null||_.open("add")},G=ue(_=>{const n=`field${t.form.length+1}`;t.form.push({..._,key:n})}),v=O(0),w=(_,n)=>{var k,E;v.value=n,(k=b.value)==null||k.open("edit"),(E=b.value)==null||E.setFormData(_)},Y=async _=>{await tt.confirm("\u786E\u5B9A\u5220\u9664\u5F53\u524D\u9879\uFF1F"),t.form.splice(_,1)},fe=ue(_=>{t.form[v.value]=_}),Fe=async()=>{var n;await((n=l.value)==null?void 0:n.validate());const _={...t,form:JSON.stringify(t.form)};r.mode=="edit"?await rt(_):await st(_),o.back()},X=O(!1),Be=async()=>{if(!r.id)return;X.value=!0;const _=await it({id:r.id});Object.keys(_).forEach(n=>{t[n]=_[n]}),X.value=!1},be=async()=>{const{lists:_}=await pt();m.value=_},S=O({});return(async()=>{S.value=await dt()})(),be(),Be(),Xe(()=>{K(()=>{B()})}),(_,n)=>{const k=qe,E=Ue,H=ot,x=ie,J=re,ge=ne,ve=ae,ye=lt,Ve=te,I=Ze("QuestionFilled"),N=je,M=Ie,P=Te,z=te,Ce=Ne,Ee=ut,q=Me,Z=oe,xe=Pe,Ae=se,he=pe,De=Lt,we=Se;return d(),g("div",null,[u(E,{class:"!border-none",shadow:"never"},{default:a(()=>[u(k,{content:f(p),onBack:n[0]||(n[0]=i=>_.$router.back())},null,8,["content"])]),_:1}),u(E,{class:"!border-none mt-4",shadow:"never"},{default:a(()=>[u(he,{class:"ls-form",ref_key:"formRef",ref:l,rules:F,model:t,"label-width":"120px"},{default:a(()=>[u(x,{label:"\u56FE\u6807",prop:"image"},{default:a(()=>[u(H,{modelValue:t.image,"onUpdate:modelValue":n[1]||(n[1]=i=>t.image=i),limit:1},null,8,["modelValue"])]),_:1}),u(x,{label:"\u6A21\u578B\u540D\u79F0",prop:"name"},{default:a(()=>[c("div",Ht,[u(J,{placeholder:"\u8BF7\u8F93\u5165\u6A21\u578B\u540D\u79F0",modelValue:t.name,"onUpdate:modelValue":n[2]||(n[2]=i=>t.name=i)},null,8,["modelValue"])])]),_:1}),u(x,{label:"\u6A21\u578B\u63CF\u8FF0",prop:"tips"},{default:a(()=>[c("div",Jt,[u(J,{placeholder:"\u8BF7\u8F93\u5165\u6A21\u578B\u63CF\u8FF0",type:"textarea",rows:2,modelValue:t.tips,"onUpdate:modelValue":n[3]||(n[3]=i=>t.tips=i)},null,8,["modelValue"])])]),_:1}),u(x,{label:"\u6240\u5C5E\u7C7B\u76EE",prop:"category_id"},{default:a(()=>[c("div",Kt,[u(ve,{modelValue:t.category_id,"onUpdate:modelValue":n[4]||(n[4]=i=>t.category_id=i),placeholder:"\u8BF7\u9009\u62E9\u6240\u5C5E\u7C7B\u76EE",class:"w-full"},{default:a(()=>[(d(!0),g(j,null,U(m.value,(i,D)=>(d(),V(ge,{key:D,label:i.name,value:i.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])]),_:1}),u(x,{label:"\u8C03\u6559\u6587\u6848",prop:"content"},{default:a(()=>[c("div",null,[c("div",Yt,[u(J,{ref_key:"elInputRef",ref:C,placeholder:"\u8BF7\u8F93\u5165\u8C03\u6559\u6587\u6848",type:"textarea",rows:4,modelValue:t.content,"onUpdate:modelValue":n[5]||(n[5]=i=>t.content=i)},null,8,["modelValue"])]),c("div",Xt,[(d(!0),g(j,null,U(t.form,(i,D)=>(d(),g("div",{class:"mx-[5px] mt-[10px]",key:D},[u(Ve,{onClick:ee=>L(i.id)},{default:a(()=>[c("span",Zt,[u(ye,{content:i.props.title},null,8,["content"])])]),_:2},1032,["onClick"])]))),128))])])]),_:1}),u(x,{label:"\u6A21\u578B\u53C2\u6570",required:""},{default:a(()=>[S.value.name?(d(),g("div",eu,[S.value.n!==""?(d(),g("div",tu,[c("div",uu,[lu,u(M,{class:"box-item",effect:"dark",content:"\u4E3A\u6BCF\u4E2A\u8F93\u5165\u6D88\u606F\u751F\u6210\u591A\u5C11\u4E2A\u804A\u5929\u5B8C\u6210\u9009\u9879\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A1~5\u4E4B\u95F4\u7684\u6574\u6570\u3002",placement:"top"},{default:a(()=>[u(N,{size:"16px"},{default:a(()=>[u(I)]),_:1})]),_:1})]),u(P,{modelValue:t.n,"onUpdate:modelValue":n[6]||(n[6]=i=>t.n=i),min:1,max:5},null,8,["modelValue"])])):R("",!0),S.value.temperature!==""?(d(),g("div",ou,[c("div",au,[nu,u(M,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u7684\u968F\u673A\u6027\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.7\u5DE6\u53F3\u3002",placement:"top"},{default:a(()=>[u(N,{size:"16px"},{default:a(()=>[u(I)]),_:1})]),_:1})]),u(P,{modelValue:t.temperature,"onUpdate:modelValue":n[7]||(n[7]=i=>t.temperature=i),min:0,max:1,step:.1},null,8,["modelValue","step"])])):R("",!0),S.value.top_p!==""?(d(),g("div",ru,[c("div",su,[iu,u(M,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u7684\u591A\u6837\u6027\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.9\u5DE6\u53F3\u3002",placement:"top"},{default:a(()=>[u(N,{size:"16px"},{default:a(()=>[u(I)]),_:1})]),_:1})]),u(P,{modelValue:t.top_p,"onUpdate:modelValue":n[8]||(n[8]=i=>t.top_p=i),min:0,max:1,step:.1},null,8,["modelValue","step"])])):R("",!0),S.value.presence_penalty!==""?(d(),g("div",pu,[c("div",mu,[du,u(M,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u4E2D\u662F\u5426\u51FA\u73B0\u7ED9\u5B9A\u7684\u5173\u952E\u8BCD\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.5\u5DE6\u53F3\u3002",placement:"top"},{default:a(()=>[u(N,{size:"16px"},{default:a(()=>[u(I)]),_:1})]),_:1})]),u(P,{modelValue:t.presence_penalty,"onUpdate:modelValue":n[9]||(n[9]=i=>t.presence_penalty=i),step:.1,min:0,max:1},null,8,["modelValue","step"])])):R("",!0),S.value.frequency_penalty!==""?(d(),g("div",cu,[c("div",_u,[fu,u(M,{class:"box-item",effect:"dark",content:"\u7528\u4E8E\u63A7\u5236\u751F\u6210\u6587\u672C\u4E2D\u91CD\u590D\u7684\u7A0B\u5EA6\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A0~1\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570\uFF0C\u5EFA\u8BAE\u53D6\u503C0.5\u5DE6\u53F3",placement:"top"},{default:a(()=>[u(N,{size:"16px"},{default:a(()=>[u(I)]),_:1})]),_:1})]),u(P,{modelValue:t.frequency_penalty,"onUpdate:modelValue":n[10]||(n[10]=i=>t.frequency_penalty=i),step:.1,min:0,max:1},null,8,["modelValue","step"])])):R("",!0)])):R("",!0)]),_:1}),u(x,{label:"\u8868\u5355\u5185\u5BB9",prop:"form"},{default:a(()=>[c("div",Fu,[c("div",Bu,[u(z,{type:"primary",onClick:h},{default:a(()=>[bu]),_:1}),u(Ce,{placement:"right",width:300,trigger:"hover"},{reference:a(()=>[u(z,{type:"primary",link:""},{default:a(()=>[gu]),_:1})]),default:a(()=>[vu]),_:1})]),c("div",yu,[u(xe,{ref_key:"tableRef",ref:s,size:"large",class:"mt-4","row-key":"id",data:t.form},{default:a(()=>[u(q,{width:"50"},{default:a(()=>[c("div",Vu,[u(Ee,{name:"el-icon-Rank"})])]),_:1}),u(q,{label:"\u5B57\u6BB5\u503C","min-width":"120"},{default:a(({row:i})=>[T(Q(i.id),1)]),_:1}),u(q,{label:"\u5B57\u6BB5\u6807\u9898",prop:"props[title]","min-width":"200"}),u(q,{label:"\u7C7B\u578B",prop:"title","min-width":"100"}),u(q,{label:"\u662F\u5426\u5FC5\u586B",prop:"props[isRequired]","min-width":"100"},{default:a(({row:i})=>[u(Z,{modelValue:i.props.isRequired,"onUpdate:modelValue":D=>i.props.isRequired=D},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),u(q,{label:"\u64CD\u4F5C",width:"120",fixed:"right"},{default:a(({row:i,$index:D})=>[u(z,{type:"primary",link:"",onClick:ee=>w(i,D)},{default:a(()=>[Cu]),_:2},1032,["onClick"]),u(z,{type:"primary",link:"",onClick:ee=>Y(D)},{default:a(()=>[Eu]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])])])]),_:1}),u(x,{label:"\u6392\u5E8F",prop:"sort"},{default:a(()=>[u(Ae,{modelValue:t.sort,"onUpdate:modelValue":n[11]||(n[11]=i=>t.sort=i)},null,8,["modelValue"])]),_:1}),u(x,{label:"\u72B6\u6001",prop:"sort"},{default:a(()=>[u(Z,{modelValue:t.status,"onUpdate:modelValue":n[12]||(n[12]=i=>t.status=i),"active-value":1,"inactive-value":0},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1}),u(De,{ref_key:"formDesignerRef",ref:b,onAdd:f(G),onEdit:f(fe)},null,8,["onAdd","onEdit"]),u(we,null,{default:a(()=>[u(z,{type:"primary",onClick:Fe},{default:a(()=>[xu]),_:1})]),_:1})])}}});export{El as default};
