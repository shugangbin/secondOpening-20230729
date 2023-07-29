import{cL as Hl,bw as Vl,bz as Rl,m as Nl,bX as jl,a as ae,b0 as $l,y as ie,b as h,o as b,i as z,h as V,z as le,k as g,u as I,c as P,e as w,f as Y,R as yl,M as N,J as dl,l as D,aq as _,T as cl,A as ye,N as zl,E as Pe,ao as De,bl as W,v as F,aO as pl,ac as Be,bv as fl,aM as Ql,a0 as B,K as ge,L as vl,t as x,r as A,ak as ml,aL as Pl,V as hl,S as Gl,a5 as Cl,aY as Ul,aZ as Xl,Z as te,cM as be,s as Zl,cN as sl,bu as Sl,b2 as Ol,U as ee,aN as Dl,cO as Jl,cP as Yl,C as Bl,a3 as xl,cQ as _l,aI as wl,aW as en,ax as ln,x as Al,cR as nn,X as Z,bx as on,F as ze,j as rl,G as q,aw as tn,cc as an,a6 as El,O as ql}from"./entry.47644ad8.js";import{E as sn,a as rn,d as un}from"./index.fd4342e5.js";import{E as dn}from"./index.5f1ada03.js";import{e as cn}from"./strings.6f89bc4f.js";import{i as Ll}from"./isEqual.1f1c08b1.js";import{d as Tl}from"./debounce.ad6365f0.js";const pn=e=>Hl[e||"default"],fn=e=>({focus:()=>{var l,i;(i=(l=e.value)==null?void 0:l.focus)==null||i.call(l)}}),J=new Map;let Il;Vl&&(document.addEventListener("mousedown",e=>Il=e),document.addEventListener("mouseup",e=>{for(const l of J.values())for(const{documentHandler:i}of l)i(e,Il)}));function Ml(e,l){let i=[];return Array.isArray(l.arg)?i=l.arg:Rl(l.arg)&&i.push(l.arg),function(m,u){const d=l.instance.popperRef,s=m.target,p=u==null?void 0:u.target,r=!l||!l.instance,S=!s||!p,f=e.contains(s)||e.contains(p),y=e===s,O=i.length&&i.some(T=>T==null?void 0:T.contains(s))||i.length&&i.includes(p),E=d&&(d.contains(s)||d.contains(p));r||S||f||y||O||E||l.value(m,u)}}const vn={beforeMount(e,l){J.has(e)||J.set(e,[]),J.get(e).push({documentHandler:Ml(e,l),bindingFn:l.value})},updated(e,l){J.has(e)||J.set(e,[]);const i=J.get(e),m=i.findIndex(d=>d.bindingFn===l.oldValue),u={documentHandler:Ml(e,l),bindingFn:l.value};m>=0?i.splice(m,1,u):i.push(u)},unmounted(e){J.delete(e)}},Wl=Nl({type:{type:String,values:["success","info","warning","danger",""],default:""},closable:Boolean,disableTransitions:Boolean,hit:Boolean,color:{type:String,default:""},size:{type:String,values:jl,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),mn={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent},hn=ae({name:"ElTag"}),bn=ae({...hn,props:Wl,emits:mn,setup(e,{emit:l}){const i=e,m=$l(),u=ie("tag"),d=h(()=>{const{type:r,hit:S,effect:f,closable:y,round:O}=i;return[u.b(),u.is("closable",y),u.m(r),u.m(m.value),u.m(f),u.is("hit",S),u.is("round",O)]}),s=r=>{l("close",r)},p=r=>{l("click",r)};return(r,S)=>r.disableTransitions?(b(),z("span",{key:0,class:g(I(d)),style:_({backgroundColor:r.color}),onClick:p},[V("span",{class:g(I(u).e("content"))},[le(r.$slots,"default")],2),r.closable?(b(),P(I(dl),{key:0,class:g(I(u).e("close")),onClick:N(s,["stop"])},{default:w(()=>[Y(I(yl))]),_:1},8,["class","onClick"])):D("v-if",!0)],6)):(b(),P(cl,{key:1,name:`${I(u).namespace.value}-zoom-in-center`,appear:""},{default:w(()=>[V("span",{class:g(I(d)),style:_({backgroundColor:r.color}),onClick:p},[V("span",{class:g(I(u).e("content"))},[le(r.$slots,"default")],2),r.closable?(b(),P(I(dl),{key:0,class:g(I(u).e("close")),onClick:N(s,["stop"])},{default:w(()=>[Y(I(yl))]),_:1},8,["class","onClick"])):D("v-if",!0)],6)]),_:3},8,["name"]))}});var gn=ye(bn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const yn=zl(gn),Fl=Symbol("ElSelectGroup"),Ae=Symbol("ElSelect");function Cn(e,l){const i=Pe(Ae),m=Pe(Fl,{disabled:!1}),u=h(()=>Object.prototype.toString.call(e.value).toLowerCase()==="[object object]"),d=h(()=>i.props.multiple?y(i.props.modelValue,e.value):O(e.value,i.props.modelValue)),s=h(()=>{if(i.props.multiple){const t=i.props.modelValue||[];return!d.value&&t.length>=i.props.multipleLimit&&i.props.multipleLimit>0}else return!1}),p=h(()=>e.label||(u.value?"":e.value)),r=h(()=>e.value||e.label||""),S=h(()=>e.disabled||l.groupDisabled||s.value),f=pl(),y=(t=[],v)=>{if(u.value){const L=i.props.valueKey;return t&&t.some(K=>De(W(K,L))===W(v,L))}else return t&&t.includes(v)},O=(t,v)=>{if(u.value){const{valueKey:L}=i.props;return W(t,L)===W(v,L)}else return t===v},E=()=>{!e.disabled&&!m.disabled&&(i.hoverIndex=i.optionsArray.indexOf(f.proxy))};F(()=>p.value,()=>{!e.created&&!i.props.remote&&i.setSelected()}),F(()=>e.value,(t,v)=>{const{remote:L,valueKey:K}=i.props;if(Object.is(t,v)||(i.onOptionDestroy(v,f.proxy),i.onOptionCreate(f.proxy)),!e.created&&!L){if(K&&typeof t=="object"&&typeof v=="object"&&t[K]===v[K])return;i.setSelected()}}),F(()=>m.disabled,()=>{l.groupDisabled=m.disabled},{immediate:!0});const{queryChange:T}=De(i);return F(T,t=>{const{query:v}=I(t),L=new RegExp(cn(v),"i");l.visible=L.test(p.value)||e.created,l.visible||i.filteredOptionsCount--},{immediate:!0}),{select:i,currentLabel:p,currentValue:r,itemSelected:d,isDisabled:S,hoverItem:E}}const Sn=ae({name:"ElOption",componentName:"ElOption",props:{value:{required:!0,type:[String,Number,Boolean,Object]},label:[String,Number],created:Boolean,disabled:{type:Boolean,default:!1}},setup(e){const l=ie("select"),i=Be({index:-1,groupDisabled:!1,visible:!0,hitState:!1,hover:!1}),{currentLabel:m,itemSelected:u,isDisabled:d,select:s,hoverItem:p}=Cn(e,i),{visible:r,hover:S}=fl(i),f=pl().proxy;s.onOptionCreate(f),Ql(()=>{const O=f.value,{selected:E}=s,t=(s.props.multiple?E:[E]).some(v=>v.value===f.value);B(()=>{s.cachedOptions.get(O)===f&&!t&&s.cachedOptions.delete(O)}),s.onOptionDestroy(O,f)});function y(){e.disabled!==!0&&i.groupDisabled!==!0&&s.handleOptionSelect(f)}return{ns:l,currentLabel:m,itemSelected:u,isDisabled:d,select:s,hoverItem:p,visible:r,hover:S,selectOptionClick:y,states:i}}});function On(e,l,i,m,u,d){return ge((b(),z("li",{class:g([e.ns.be("dropdown","item"),e.ns.is("disabled",e.isDisabled),{selected:e.itemSelected,hover:e.hover}]),onMouseenter:l[0]||(l[0]=(...s)=>e.hoverItem&&e.hoverItem(...s)),onClick:l[1]||(l[1]=N((...s)=>e.selectOptionClick&&e.selectOptionClick(...s),["stop"]))},[le(e.$slots,"default",{},()=>[V("span",null,x(e.currentLabel),1)])],34)),[[vl,e.visible]])}var bl=ye(Sn,[["render",On],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);const wn=ae({name:"ElSelectDropdown",componentName:"ElSelectDropdown",setup(){const e=Pe(Ae),l=ie("select"),i=h(()=>e.props.popperClass),m=h(()=>e.props.multiple),u=h(()=>e.props.fitInputWidth),d=A("");function s(){var p;d.value=`${(p=e.selectWrapper)==null?void 0:p.offsetWidth}px`}return ml(()=>{s(),Pl(e.selectWrapper,s)}),{ns:l,minWidth:d,popperClass:i,isMultiple:m,isFitInputWidth:u}}});function En(e,l,i,m,u,d){return b(),z("div",{class:g([e.ns.b("dropdown"),e.ns.is("multiple",e.isMultiple),e.popperClass]),style:_({[e.isFitInputWidth?"width":"minWidth"]:e.minWidth})},[le(e.$slots,"default")],6)}var Ln=ye(wn,[["render",En],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]);function Tn(e){const{t:l}=hl();return Be({options:new Map,cachedOptions:new Map,createdLabel:null,createdSelected:!1,selected:e.multiple?[]:{},inputLength:20,inputWidth:0,optionsCount:0,filteredOptionsCount:0,visible:!1,selectedLabel:"",hoverIndex:-1,query:"",previousQuery:null,inputHovering:!1,cachedPlaceHolder:"",currentPlaceholder:l("el.select.placeholder"),menuVisibleOnFocus:!1,isOnComposition:!1,prefixWidth:11,tagInMultiLine:!1,mouseEnter:!1})}let ul=!1;const In=(e,l,i)=>{const{t:m}=hl(),u=ie("select");Gl({from:"suffixTransition",replacement:"override style scheme",version:"2.3.0",scope:"props",ref:"https://element-plus.org/en-US/component/select.html#select-attributes"},h(()=>e.suffixTransition===!1));const d=A(null),s=A(null),p=A(null),r=A(null),S=A(null),f=A(null),y=A(null),O=A(-1),E=Cl({query:""}),T=Cl(""),t=A([]);let v=0;const{form:L,formItem:K}=Ul(),Ce=h(()=>!e.filterable||e.multiple||!l.visible),Q=h(()=>e.disabled||(L==null?void 0:L.disabled)),qe=h(()=>{const n=e.multiple?Array.isArray(e.modelValue)&&e.modelValue.length>0:e.modelValue!==void 0&&e.modelValue!==null&&e.modelValue!=="";return e.clearable&&!Q.value&&l.inputHovering&&n}),Se=h(()=>e.remote&&e.filterable&&!e.remoteShowSuffix?"":e.suffixIcon),We=h(()=>u.is("reverse",Se.value&&l.visible&&e.suffixTransition)),Oe=h(()=>e.remote?300:0),ue=h(()=>e.loading?e.loadingText||m("el.select.loading"):e.remote&&l.query===""&&l.options.size===0?!1:e.filterable&&l.query&&l.options.size>0&&l.filteredOptionsCount===0?e.noMatchText||m("el.select.noMatch"):l.options.size===0?e.noDataText||m("el.select.noData"):null),$=h(()=>{const n=Array.from(l.options.values()),o=[];return t.value.forEach(a=>{const c=n.findIndex(M=>M.currentLabel===a);c>-1&&o.push(n[c])}),o.length?o:n}),Fe=h(()=>Array.from(l.cachedOptions.values())),Ke=h(()=>{const n=$.value.filter(o=>!o.created).some(o=>o.currentLabel===l.query);return e.filterable&&e.allowCreate&&l.query!==""&&!n}),ne=$l(),He=h(()=>["small"].includes(ne.value)?"small":"default"),Re=h({get(){return l.visible&&ue.value!==!1},set(n){l.visible=n}});F([()=>Q.value,()=>ne.value,()=>L==null?void 0:L.size],()=>{B(()=>{H()})}),F(()=>e.placeholder,n=>{l.cachedPlaceHolder=l.currentPlaceholder=n,e.multiple&&Array.isArray(e.modelValue)&&e.modelValue.length>0&&(l.currentPlaceholder="")}),F(()=>e.modelValue,(n,o)=>{e.multiple&&(H(),n&&n.length>0||s.value&&l.query!==""?l.currentPlaceholder="":l.currentPlaceholder=l.cachedPlaceHolder,e.filterable&&!e.reserveKeyword&&(l.query="",G(l.query))),de(),e.filterable&&!e.multiple&&(l.inputLength=20),!Ll(n,o)&&e.validateEvent&&(K==null||K.validate("change").catch(a=>Xl()))},{flush:"post",deep:!0}),F(()=>l.visible,n=>{var o,a,c,M,k;n?((a=(o=r.value)==null?void 0:o.updatePopper)==null||a.call(o),e.filterable&&(l.filteredOptionsCount=l.optionsCount,l.query=e.remote?"":l.selectedLabel,(M=(c=p.value)==null?void 0:c.focus)==null||M.call(c),e.multiple?(k=s.value)==null||k.focus():l.selectedLabel&&(l.currentPlaceholder=`${l.selectedLabel}`,l.selectedLabel=""),G(l.query),!e.multiple&&!e.remote&&(E.value.query="",be(E),be(T)))):(e.filterable&&(te(e.filterMethod)&&e.filterMethod(""),te(e.remoteMethod)&&e.remoteMethod("")),s.value&&s.value.blur(),l.query="",l.previousQuery=null,l.selectedLabel="",l.inputLength=20,l.menuVisibleOnFocus=!1,Ne(),B(()=>{s.value&&s.value.value===""&&l.selected.length===0&&(l.currentPlaceholder=l.cachedPlaceHolder)}),e.multiple||(l.selected&&(e.filterable&&e.allowCreate&&l.createdSelected&&l.createdLabel?l.selectedLabel=l.createdLabel:l.selectedLabel=l.selected.currentLabel,e.filterable&&(l.query=l.selectedLabel)),e.filterable&&(l.currentPlaceholder=l.cachedPlaceHolder))),i.emit("visible-change",n)}),F(()=>l.options.entries(),()=>{var n,o,a;if(!Vl)return;(o=(n=r.value)==null?void 0:n.updatePopper)==null||o.call(n),e.multiple&&H();const c=((a=f.value)==null?void 0:a.querySelectorAll("input"))||[];Array.from(c).includes(document.activeElement)||de(),e.defaultFirstOption&&(e.filterable||e.remote)&&l.filteredOptionsCount&&Ee()},{flush:"post"}),F(()=>l.hoverIndex,n=>{Zl(n)&&n>-1?O.value=$.value[n]||{}:O.value={},$.value.forEach(o=>{o.hover=O.value===o})});const H=()=>{B(()=>{var n,o;if(!d.value)return;const a=d.value.$el.querySelector("input");v=v||(a.clientHeight>0?a.clientHeight+2:0);const c=S.value,M=pn(ne.value||(L==null?void 0:L.size)),k=ne.value||M===v||v<=0?M:v;!(a.offsetParent===null)&&(a.style.height=`${(l.selected.length===0?k:Math.max(c?c.clientHeight+(c.clientHeight>k?6:0):0,k))-2}px`),l.tagInMultiLine=Number.parseFloat(a.style.height)>=k,l.visible&&ue.value!==!1&&((o=(n=r.value)==null?void 0:n.updatePopper)==null||o.call(n))})},G=async n=>{if(!(l.previousQuery===n||l.isOnComposition)){if(l.previousQuery===null&&(te(e.filterMethod)||te(e.remoteMethod))){l.previousQuery=n;return}l.previousQuery=n,B(()=>{var o,a;l.visible&&((a=(o=r.value)==null?void 0:o.updatePopper)==null||a.call(o))}),l.hoverIndex=-1,e.multiple&&e.filterable&&B(()=>{const o=s.value.value.length*15+20;l.inputLength=e.collapseTags?Math.min(50,o):o,we(),H()}),e.remote&&te(e.remoteMethod)?(l.hoverIndex=-1,e.remoteMethod(n)):te(e.filterMethod)?(e.filterMethod(n),be(T)):(l.filteredOptionsCount=l.optionsCount,E.value.query=n,be(E),be(T)),e.defaultFirstOption&&(e.filterable||e.remote)&&l.filteredOptionsCount&&(await B(),Ee())}},we=()=>{l.currentPlaceholder!==""&&(l.currentPlaceholder=s.value.value?"":l.cachedPlaceHolder)},Ee=()=>{const n=$.value.filter(c=>c.visible&&!c.disabled&&!c.states.groupDisabled),o=n.find(c=>c.created),a=n[0];l.hoverIndex=Ie($.value,o||a)},de=()=>{var n;if(e.multiple)l.selectedLabel="";else{const a=Le(e.modelValue);(n=a.props)!=null&&n.created?(l.createdLabel=a.props.value,l.createdSelected=!0):l.createdSelected=!1,l.selectedLabel=a.currentLabel,l.selected=a,e.filterable&&(l.query=l.selectedLabel);return}const o=[];Array.isArray(e.modelValue)&&e.modelValue.forEach(a=>{o.push(Le(a))}),l.selected=o,B(()=>{H()})},Le=n=>{let o;const a=sl(n).toLowerCase()==="object",c=sl(n).toLowerCase()==="null",M=sl(n).toLowerCase()==="undefined";for(let X=l.cachedOptions.size-1;X>=0;X--){const C=Fe.value[X];if(a?W(C.value,e.valueKey)===W(n,e.valueKey):C.value===n){o={value:n,currentLabel:C.currentLabel,isDisabled:C.isDisabled};break}}if(o)return o;const k=a?n.label:!c&&!M?n:"",j={value:n,currentLabel:k};return e.multiple&&(j.hitState=!1),j},Ne=()=>{setTimeout(()=>{const n=e.valueKey;e.multiple?l.selected.length>0?l.hoverIndex=Math.min.apply(null,l.selected.map(o=>$.value.findIndex(a=>W(a,n)===W(o,n)))):l.hoverIndex=-1:l.hoverIndex=$.value.findIndex(o=>me(o)===me(l.selected))},300)},je=()=>{var n,o;Qe(),(o=(n=r.value)==null?void 0:n.updatePopper)==null||o.call(n),e.multiple&&H()},Qe=()=>{var n;l.inputWidth=(n=d.value)==null?void 0:n.$el.offsetWidth},Ge=()=>{e.filterable&&l.query!==l.selectedLabel&&(l.query=l.selectedLabel,G(l.query))},Ue=Tl(()=>{Ge()},Oe.value),Xe=Tl(n=>{G(n.target.value)},Oe.value),oe=n=>{Ll(e.modelValue,n)||i.emit(Bl,n)},se=n=>{if(n.code!==Ol.delete){if(n.target.value.length<=0&&!fe()){const o=e.modelValue.slice();o.pop(),i.emit(ee,o),oe(o)}n.target.value.length===1&&e.modelValue.length===0&&(l.currentPlaceholder=l.cachedPlaceHolder)}},Ze=(n,o)=>{const a=l.selected.indexOf(o);if(a>-1&&!Q.value){const c=e.modelValue.slice();c.splice(a,1),i.emit(ee,c),oe(c),i.emit("remove-tag",o.value)}n.stopPropagation()},Te=n=>{n.stopPropagation();const o=e.multiple?[]:"";if(!Dl(o))for(const a of l.selected)a.isDisabled&&o.push(a.value);i.emit(ee,o),oe(o),l.hoverIndex=-1,l.visible=!1,i.emit("clear")},ce=n=>{var o;if(e.multiple){const a=(e.modelValue||[]).slice(),c=Ie(a,n.value);c>-1?a.splice(c,1):(e.multipleLimit<=0||a.length<e.multipleLimit)&&a.push(n.value),i.emit(ee,a),oe(a),n.created&&(l.query="",G(""),l.inputLength=20),e.filterable&&((o=s.value)==null||o.focus())}else i.emit(ee,n.value),oe(n.value),l.visible=!1;pe(),!l.visible&&B(()=>{re(n)})},Ie=(n=[],o)=>{if(!Sl(o))return n.indexOf(o);const a=e.valueKey;let c=-1;return n.some((M,k)=>De(W(M,a))===W(o,a)?(c=k,!0):!1),c},pe=()=>{const n=s.value||d.value;n&&(n==null||n.focus())},re=n=>{var o,a,c,M,k;const j=Array.isArray(n)?n[0]:n;let X=null;if(j!=null&&j.value){const C=$.value.filter(R=>R.value===j.value);C.length>0&&(X=C[0].$el)}if(r.value&&X){const C=(M=(c=(a=(o=r.value)==null?void 0:o.popperRef)==null?void 0:a.contentRef)==null?void 0:c.querySelector)==null?void 0:M.call(c,`.${u.be("dropdown","wrap")}`);C&&Jl(C,X)}(k=y.value)==null||k.handleScroll()},Je=n=>{l.optionsCount++,l.filteredOptionsCount++,l.options.set(n.value,n),l.cachedOptions.set(n.value,n)},Ye=(n,o)=>{l.options.get(n)===o&&(l.optionsCount--,l.filteredOptionsCount--,l.options.delete(n))},xe=n=>{n.code!==Ol.backspace&&fe(!1),l.inputLength=s.value.value.length*15+20,H()},fe=n=>{if(!Array.isArray(l.selected))return;const o=l.selected[l.selected.length-1];if(o)return n===!0||n===!1?(o.hitState=n,n):(o.hitState=!o.hitState,o.hitState)},_e=n=>{const o=n.target.value;if(n.type==="compositionend")l.isOnComposition=!1,B(()=>G(o));else{const a=o[o.length-1]||"";l.isOnComposition=!Yl(a)}},el=()=>{B(()=>re(l.selected))},ll=n=>{ul?ul=!1:((e.automaticDropdown||e.filterable)&&(e.filterable&&!l.visible&&(l.menuVisibleOnFocus=!0),l.visible=!0),i.emit("focus",n))},U=()=>{var n,o,a;l.visible=!1,(n=d.value)==null||n.blur(),(a=(o=p.value)==null?void 0:o.blur)==null||a.call(o)},Me=n=>{setTimeout(()=>{var o;if((o=r.value)!=null&&o.isFocusInsideContent()){ul=!0;return}l.visible&&ve(),i.emit("blur",n)})},nl=n=>{Te(n)},ve=()=>{l.visible=!1},ol=n=>{l.visible&&(n.preventDefault(),n.stopPropagation(),l.visible=!1)},ke=n=>{var o;n&&!l.mouseEnter||Q.value||(l.menuVisibleOnFocus?l.menuVisibleOnFocus=!1:(!r.value||!r.value.isFocusInsideContent())&&(l.visible=!l.visible),l.visible&&((o=s.value||d.value)==null||o.focus()))},Ve=()=>{l.visible?$.value[l.hoverIndex]&&ce($.value[l.hoverIndex]):ke()},me=n=>Sl(n.value)?W(n.value,e.valueKey):n.value,tl=h(()=>$.value.filter(n=>n.visible).every(n=>n.disabled)),he=h(()=>l.selected.slice(0,e.maxCollapseTags)),il=h(()=>l.selected.slice(e.maxCollapseTags)),$e=n=>{if(!l.visible){l.visible=!0;return}if(!(l.options.size===0||l.filteredOptionsCount===0)&&!l.isOnComposition&&!tl.value){n==="next"?(l.hoverIndex++,l.hoverIndex===l.options.size&&(l.hoverIndex=0)):n==="prev"&&(l.hoverIndex--,l.hoverIndex<0&&(l.hoverIndex=l.options.size-1));const o=$.value[l.hoverIndex];(o.disabled===!0||o.states.groupDisabled===!0||!o.visible)&&$e(n),B(()=>re(O.value))}};return{optionList:t,optionsArray:$,selectSize:ne,handleResize:je,debouncedOnInputChange:Ue,debouncedQueryChange:Xe,deletePrevTag:se,deleteTag:Ze,deleteSelected:Te,handleOptionSelect:ce,scrollToOption:re,readonly:Ce,resetInputHeight:H,showClose:qe,iconComponent:Se,iconReverse:We,showNewOption:Ke,collapseTagSize:He,setSelected:de,managePlaceholder:we,selectDisabled:Q,emptyText:ue,toggleLastOptionHitState:fe,resetInputState:xe,handleComposition:_e,onOptionCreate:Je,onOptionDestroy:Ye,handleMenuEnter:el,handleFocus:ll,blur:U,handleBlur:Me,handleClearClick:nl,handleClose:ve,handleKeydownEscape:ol,toggleMenu:ke,selectOption:Ve,getValueKey:me,navigateOptions:$e,dropMenuVisible:Re,queryChange:E,groupQueryChange:T,showTagList:he,collapseTagList:il,reference:d,input:s,iOSInput:p,tooltipRef:r,tags:S,selectWrapper:f,scrollbar:y,handleMouseEnter:()=>{l.mouseEnter=!0},handleMouseLeave:()=>{l.mouseEnter=!1}}};var Mn=ae({name:"ElOptions",emits:["update-options"],setup(e,{slots:l,emit:i}){let m=[];function u(d,s){if(d.length!==s.length)return!1;for(const[p]of d.entries())if(d[p]!=s[p])return!1;return!0}return()=>{var d,s;const p=(d=l.default)==null?void 0:d.call(l),r=[];function S(f){Array.isArray(f)&&f.forEach(y=>{var O,E,T,t;const v=(O=(y==null?void 0:y.type)||{})==null?void 0:O.name;v==="ElOptionGroup"?S(!Dl(y.children)&&!Array.isArray(y.children)&&te((E=y.children)==null?void 0:E.default)?(T=y.children)==null?void 0:T.default():y.children):v==="ElOption"?r.push((t=y.props)==null?void 0:t.label):Array.isArray(y.children)&&S(y.children)})}return p.length&&S((s=p[0])==null?void 0:s.children),u(r,m)||(m=r,i("update-options",r)),p}}});const kl="ElSelect",kn=ae({name:kl,componentName:kl,components:{ElInput:xl,ElSelectMenu:Ln,ElOption:bl,ElOptions:Mn,ElTag:yn,ElScrollbar:dn,ElTooltip:sn,ElIcon:dl},directives:{ClickOutside:vn},props:{name:String,id:String,modelValue:{type:[Array,String,Number,Boolean,Object],default:void 0},autocomplete:{type:String,default:"off"},automaticDropdown:Boolean,size:{type:String,validator:_l},effect:{type:String,default:"light"},disabled:Boolean,clearable:Boolean,filterable:Boolean,allowCreate:Boolean,loading:Boolean,popperClass:{type:String,default:""},popperOptions:{type:Object,default:()=>({})},remote:Boolean,loadingText:String,noMatchText:String,noDataText:String,remoteMethod:Function,filterMethod:Function,multiple:Boolean,multipleLimit:{type:Number,default:0},placeholder:{type:String},defaultFirstOption:Boolean,reserveKeyword:{type:Boolean,default:!0},valueKey:{type:String,default:"value"},collapseTags:Boolean,collapseTagsTooltip:{type:Boolean,default:!1},maxCollapseTags:{type:Number,default:1},teleported:rn.teleported,persistent:{type:Boolean,default:!0},clearIcon:{type:wl,default:en},fitInputWidth:{type:Boolean,default:!1},suffixIcon:{type:wl,default:ln},tagType:{...Wl.type,default:"info"},validateEvent:{type:Boolean,default:!0},remoteShowSuffix:{type:Boolean,default:!1},suffixTransition:{type:Boolean,default:!0},placement:{type:String,values:un,default:"bottom-start"}},emits:[ee,Bl,"remove-tag","clear","visible-change","focus","blur"],setup(e,l){const i=ie("select"),m=ie("input"),{t:u}=hl(),d=Tn(e),{optionList:s,optionsArray:p,selectSize:r,readonly:S,handleResize:f,collapseTagSize:y,debouncedOnInputChange:O,debouncedQueryChange:E,deletePrevTag:T,deleteTag:t,deleteSelected:v,handleOptionSelect:L,scrollToOption:K,setSelected:Ce,resetInputHeight:Q,managePlaceholder:qe,showClose:Se,selectDisabled:We,iconComponent:Oe,iconReverse:ue,showNewOption:$,emptyText:Fe,toggleLastOptionHitState:Ke,resetInputState:ne,handleComposition:He,onOptionCreate:Re,onOptionDestroy:H,handleMenuEnter:G,handleFocus:we,blur:Ee,handleBlur:de,handleClearClick:Le,handleClose:Ne,handleKeydownEscape:je,toggleMenu:Qe,selectOption:Ge,getValueKey:Ue,navigateOptions:Xe,dropMenuVisible:oe,reference:se,input:Ze,iOSInput:Te,tooltipRef:ce,tags:Ie,selectWrapper:pe,scrollbar:re,queryChange:Je,groupQueryChange:Ye,handleMouseEnter:xe,handleMouseLeave:fe,showTagList:_e,collapseTagList:el}=In(e,d,l),{focus:ll}=fn(se),{inputWidth:U,selected:Me,inputLength:nl,filteredOptionsCount:ve,visible:ol,selectedLabel:ke,hoverIndex:Ve,query:me,inputHovering:tl,currentPlaceholder:he,menuVisibleOnFocus:il,isOnComposition:$e,options:al,cachedOptions:gl,optionsCount:n,prefixWidth:o,tagInMultiLine:a}=fl(d),c=h(()=>{const C=[i.b()],R=I(r);return R&&C.push(i.m(R)),e.disabled&&C.push(i.m("disabled")),C}),M=h(()=>({maxWidth:`${I(U)-32}px`,width:"100%"})),k=h(()=>({maxWidth:`${I(U)>123?I(U)-123:I(U)-75}px`}));Al(Ae,Be({props:e,options:al,optionsArray:p,cachedOptions:gl,optionsCount:n,filteredOptionsCount:ve,hoverIndex:Ve,handleOptionSelect:L,onOptionCreate:Re,onOptionDestroy:H,selectWrapper:pe,selected:Me,setSelected:Ce,queryChange:Je,groupQueryChange:Ye})),ml(()=>{d.cachedPlaceHolder=he.value=e.placeholder||(()=>u("el.select.placeholder")),e.multiple&&Array.isArray(e.modelValue)&&e.modelValue.length>0&&(he.value=""),Pl(pe,f),e.remote&&e.multiple&&Q(),B(()=>{const C=se.value&&se.value.$el;if(C&&(U.value=C.getBoundingClientRect().width,l.slots.prefix)){const R=C.querySelector(`.${m.e("prefix")}`);o.value=Math.max(R.getBoundingClientRect().width+5,30)}}),Ce()}),e.multiple&&!Array.isArray(e.modelValue)&&l.emit(ee,[]),!e.multiple&&Array.isArray(e.modelValue)&&l.emit(ee,"");const j=h(()=>{var C,R;return(R=(C=ce.value)==null?void 0:C.popperRef)==null?void 0:R.contentRef});return{isIOS:nn,onOptionsRendered:C=>{s.value=C},tagInMultiLine:a,prefixWidth:o,selectSize:r,readonly:S,handleResize:f,collapseTagSize:y,debouncedOnInputChange:O,debouncedQueryChange:E,deletePrevTag:T,deleteTag:t,deleteSelected:v,handleOptionSelect:L,scrollToOption:K,inputWidth:U,selected:Me,inputLength:nl,filteredOptionsCount:ve,visible:ol,selectedLabel:ke,hoverIndex:Ve,query:me,inputHovering:tl,currentPlaceholder:he,menuVisibleOnFocus:il,isOnComposition:$e,options:al,resetInputHeight:Q,managePlaceholder:qe,showClose:Se,selectDisabled:We,iconComponent:Oe,iconReverse:ue,showNewOption:$,emptyText:Fe,toggleLastOptionHitState:Ke,resetInputState:ne,handleComposition:He,handleMenuEnter:G,handleFocus:we,blur:Ee,handleBlur:de,handleClearClick:Le,handleClose:Ne,handleKeydownEscape:je,toggleMenu:Qe,selectOption:Ge,getValueKey:Ue,navigateOptions:Xe,dropMenuVisible:oe,focus:ll,reference:se,input:Ze,iOSInput:Te,tooltipRef:ce,popperPaneRef:j,tags:Ie,selectWrapper:pe,scrollbar:re,wrapperKls:c,selectTagsStyle:M,nsSelect:i,tagTextStyle:k,handleMouseEnter:xe,handleMouseLeave:fe,showTagList:_e,collapseTagList:el}}}),Vn=["disabled","autocomplete"],$n=["disabled"],zn={style:{height:"100%",display:"flex","justify-content":"center","align-items":"center"}};function Pn(e,l,i,m,u,d){const s=Z("el-tag"),p=Z("el-tooltip"),r=Z("el-icon"),S=Z("el-input"),f=Z("el-option"),y=Z("el-options"),O=Z("el-scrollbar"),E=Z("el-select-menu"),T=on("click-outside");return ge((b(),z("div",{ref:"selectWrapper",class:g(e.wrapperKls),onMouseenter:l[21]||(l[21]=(...t)=>e.handleMouseEnter&&e.handleMouseEnter(...t)),onMouseleave:l[22]||(l[22]=(...t)=>e.handleMouseLeave&&e.handleMouseLeave(...t)),onClick:l[23]||(l[23]=N((...t)=>e.toggleMenu&&e.toggleMenu(...t),["stop"]))},[Y(p,{ref:"tooltipRef",visible:e.dropMenuVisible,placement:e.placement,teleported:e.teleported,"popper-class":[e.nsSelect.e("popper"),e.popperClass],"popper-options":e.popperOptions,"fallback-placements":["bottom-start","top-start","right","left"],effect:e.effect,pure:"",trigger:"click",transition:`${e.nsSelect.namespace.value}-zoom-in-top`,"stop-popper-mouse-event":!1,"gpu-acceleration":!1,persistent:e.persistent,onShow:e.handleMenuEnter},{default:w(()=>[V("div",{class:"select-trigger",onMouseenter:l[19]||(l[19]=t=>e.inputHovering=!0),onMouseleave:l[20]||(l[20]=t=>e.inputHovering=!1)},[e.multiple?(b(),z("div",{key:0,ref:"tags",class:g([e.nsSelect.e("tags"),e.nsSelect.is("disabled",e.selectDisabled)]),style:_(e.selectTagsStyle)},[e.collapseTags&&e.selected.length?(b(),P(cl,{key:0,onAfterLeave:e.resetInputHeight},{default:w(()=>[V("span",{class:g([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[(b(!0),z(ze,null,rl(e.showTagList,t=>(b(),P(s,{key:e.getValueKey(t),closable:!e.selectDisabled&&!t.isDisabled,size:e.collapseTagSize,hit:t.hitState,type:e.tagType,"disable-transitions":"",onClose:v=>e.deleteTag(v,t)},{default:w(()=>[V("span",{class:g(e.nsSelect.e("tags-text")),style:_(e.tagTextStyle)},x(t.currentLabel),7)]),_:2},1032,["closable","size","hit","type","onClose"]))),128)),e.selected.length>e.maxCollapseTags?(b(),P(s,{key:0,closable:!1,size:e.collapseTagSize,type:e.tagType,"disable-transitions":""},{default:w(()=>[e.collapseTagsTooltip?(b(),P(p,{key:0,disabled:e.dropMenuVisible,"fallback-placements":["bottom","top","right","left"],effect:e.effect,placement:"bottom",teleported:e.teleported},{default:w(()=>[V("span",{class:g(e.nsSelect.e("tags-text"))},"+ "+x(e.selected.length-e.maxCollapseTags),3)]),content:w(()=>[V("div",{class:g(e.nsSelect.e("collapse-tags"))},[(b(!0),z(ze,null,rl(e.collapseTagList,t=>(b(),z("div",{key:e.getValueKey(t),class:g(e.nsSelect.e("collapse-tag"))},[Y(s,{class:"in-tooltip",closable:!e.selectDisabled&&!t.isDisabled,size:e.collapseTagSize,hit:t.hitState,type:e.tagType,"disable-transitions":"",style:{margin:"2px"},onClose:v=>e.deleteTag(v,t)},{default:w(()=>[V("span",{class:g(e.nsSelect.e("tags-text")),style:_({maxWidth:e.inputWidth-75+"px"})},x(t.currentLabel),7)]),_:2},1032,["closable","size","hit","type","onClose"])],2))),128))],2)]),_:1},8,["disabled","effect","teleported"])):(b(),z("span",{key:1,class:g(e.nsSelect.e("tags-text"))},"+ "+x(e.selected.length-e.maxCollapseTags),3))]),_:1},8,["size","type"])):D("v-if",!0)],2)]),_:1},8,["onAfterLeave"])):D("v-if",!0),e.collapseTags?D("v-if",!0):(b(),P(cl,{key:1,onAfterLeave:e.resetInputHeight},{default:w(()=>[V("span",{class:g([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[(b(!0),z(ze,null,rl(e.selected,t=>(b(),P(s,{key:e.getValueKey(t),closable:!e.selectDisabled&&!t.isDisabled,size:e.collapseTagSize,hit:t.hitState,type:e.tagType,"disable-transitions":"",onClose:v=>e.deleteTag(v,t)},{default:w(()=>[V("span",{class:g(e.nsSelect.e("tags-text")),style:_({maxWidth:e.inputWidth-75+"px"})},x(t.currentLabel),7)]),_:2},1032,["closable","size","hit","type","onClose"]))),128))],2)]),_:1},8,["onAfterLeave"])),e.filterable?ge((b(),z("input",{key:2,ref:"input","onUpdate:modelValue":l[0]||(l[0]=t=>e.query=t),type:"text",class:g([e.nsSelect.e("input"),e.nsSelect.is(e.selectSize),e.nsSelect.is("disabled",e.selectDisabled)]),disabled:e.selectDisabled,autocomplete:e.autocomplete,style:_({marginLeft:e.prefixWidth&&!e.selected.length||e.tagInMultiLine?`${e.prefixWidth}px`:"",flexGrow:1,width:`${e.inputLength/(e.inputWidth-32)}%`,maxWidth:`${e.inputWidth-42}px`}),onFocus:l[1]||(l[1]=(...t)=>e.handleFocus&&e.handleFocus(...t)),onBlur:l[2]||(l[2]=(...t)=>e.handleBlur&&e.handleBlur(...t)),onKeyup:l[3]||(l[3]=(...t)=>e.managePlaceholder&&e.managePlaceholder(...t)),onKeydown:[l[4]||(l[4]=(...t)=>e.resetInputState&&e.resetInputState(...t)),l[5]||(l[5]=q(N(t=>e.navigateOptions("next"),["prevent"]),["down"])),l[6]||(l[6]=q(N(t=>e.navigateOptions("prev"),["prevent"]),["up"])),l[7]||(l[7]=q((...t)=>e.handleKeydownEscape&&e.handleKeydownEscape(...t),["esc"])),l[8]||(l[8]=q(N((...t)=>e.selectOption&&e.selectOption(...t),["stop","prevent"]),["enter"])),l[9]||(l[9]=q((...t)=>e.deletePrevTag&&e.deletePrevTag(...t),["delete"])),l[10]||(l[10]=q(t=>e.visible=!1,["tab"]))],onCompositionstart:l[11]||(l[11]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onCompositionupdate:l[12]||(l[12]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onCompositionend:l[13]||(l[13]=(...t)=>e.handleComposition&&e.handleComposition(...t)),onInput:l[14]||(l[14]=(...t)=>e.debouncedQueryChange&&e.debouncedQueryChange(...t))},null,46,Vn)),[[tn,e.query]]):D("v-if",!0)],6)):D("v-if",!0),D(" fix: https://github.com/element-plus/element-plus/issues/11415 "),e.isIOS&&!e.multiple&&e.filterable&&e.readonly?(b(),z("input",{key:1,ref:"iOSInput",class:g([e.nsSelect.e("input"),e.nsSelect.is(e.selectSize),e.nsSelect.em("input","iOS")]),disabled:e.selectDisabled,type:"text"},null,10,$n)):D("v-if",!0),Y(S,{id:e.id,ref:"reference",modelValue:e.selectedLabel,"onUpdate:modelValue":l[15]||(l[15]=t=>e.selectedLabel=t),type:"text",placeholder:typeof e.currentPlaceholder=="function"?e.currentPlaceholder():e.currentPlaceholder,name:e.name,autocomplete:e.autocomplete,size:e.selectSize,disabled:e.selectDisabled,readonly:e.readonly,"validate-event":!1,class:g([e.nsSelect.is("focus",e.visible)]),tabindex:e.multiple&&e.filterable?-1:void 0,onFocus:e.handleFocus,onBlur:e.handleBlur,onInput:e.debouncedOnInputChange,onPaste:e.debouncedOnInputChange,onCompositionstart:e.handleComposition,onCompositionupdate:e.handleComposition,onCompositionend:e.handleComposition,onKeydown:[l[16]||(l[16]=q(N(t=>e.navigateOptions("next"),["stop","prevent"]),["down"])),l[17]||(l[17]=q(N(t=>e.navigateOptions("prev"),["stop","prevent"]),["up"])),q(N(e.selectOption,["stop","prevent"]),["enter"]),q(e.handleKeydownEscape,["esc"]),l[18]||(l[18]=q(t=>e.visible=!1,["tab"]))]},an({suffix:w(()=>[e.iconComponent&&!e.showClose?(b(),P(r,{key:0,class:g([e.nsSelect.e("caret"),e.nsSelect.e("icon"),e.iconReverse])},{default:w(()=>[(b(),P(El(e.iconComponent)))]),_:1},8,["class"])):D("v-if",!0),e.showClose&&e.clearIcon?(b(),P(r,{key:1,class:g([e.nsSelect.e("caret"),e.nsSelect.e("icon")]),onClick:e.handleClearClick},{default:w(()=>[(b(),P(El(e.clearIcon)))]),_:1},8,["class","onClick"])):D("v-if",!0)]),_:2},[e.$slots.prefix?{name:"prefix",fn:w(()=>[V("div",zn,[le(e.$slots,"prefix")])])}:void 0]),1032,["id","modelValue","placeholder","name","autocomplete","size","disabled","readonly","class","tabindex","onFocus","onBlur","onInput","onPaste","onCompositionstart","onCompositionupdate","onCompositionend","onKeydown"])],32)]),content:w(()=>[Y(E,null,{default:w(()=>[ge(Y(O,{ref:"scrollbar",tag:"ul","wrap-class":e.nsSelect.be("dropdown","wrap"),"view-class":e.nsSelect.be("dropdown","list"),class:g([e.nsSelect.is("empty",!e.allowCreate&&!!e.query&&e.filteredOptionsCount===0)])},{default:w(()=>[e.showNewOption?(b(),P(f,{key:0,value:e.query,created:!0},null,8,["value"])):D("v-if",!0),Y(y,{onUpdateOptions:e.onOptionsRendered},{default:w(()=>[le(e.$slots,"default")]),_:3},8,["onUpdateOptions"])]),_:3},8,["wrap-class","view-class","class"]),[[vl,e.options.size>0&&!e.loading]]),e.emptyText&&(!e.allowCreate||e.loading||e.allowCreate&&e.options.size===0)?(b(),z(ze,{key:0},[e.$slots.empty?le(e.$slots,"empty",{key:0}):(b(),z("p",{key:1,class:g(e.nsSelect.be("dropdown","empty"))},x(e.emptyText),3))],64)):D("v-if",!0)]),_:3})]),_:3},8,["visible","placement","teleported","popper-class","popper-options","effect","transition","persistent","onShow"])],34)),[[T,e.handleClose,e.popperPaneRef]])}var Dn=ye(kn,[["render",Pn],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);const Bn=ae({name:"ElOptionGroup",componentName:"ElOptionGroup",props:{label:String,disabled:{type:Boolean,default:!1}},setup(e){const l=ie("select"),i=A(!0),m=pl(),u=A([]);Al(Fl,Be({...fl(e)}));const d=Pe(Ae);ml(()=>{u.value=s(m.subTree)});const s=r=>{const S=[];return Array.isArray(r.children)&&r.children.forEach(f=>{var y;f.type&&f.type.name==="ElOption"&&f.component&&f.component.proxy?S.push(f.component.proxy):(y=f.children)!=null&&y.length&&S.push(...s(f))}),S},{groupQueryChange:p}=De(d);return F(p,()=>{i.value=u.value.some(r=>r.visible===!0)},{flush:"post"}),{visible:i,ns:l}}});function An(e,l,i,m,u,d){return ge((b(),z("ul",{class:g(e.ns.be("group","wrap"))},[V("li",{class:g(e.ns.be("group","title"))},x(e.label),3),V("li",null,[V("ul",{class:g(e.ns.b("group"))},[le(e.$slots,"default")],2)])],2)),[[vl,e.visible]])}var Kl=ye(Bn,[["render",An],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);const Nn=zl(Dn,{Option:bl,OptionGroup:Kl}),jn=ql(bl);ql(Kl);export{vn as C,jn as E,Nn as a,yn as b};
