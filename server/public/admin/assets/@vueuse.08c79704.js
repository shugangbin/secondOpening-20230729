import{u as we,g as he,f as be,i as ue,j as Pe,n as ce,k as Se,r as g,s as fe,l as de,m as L,w as $,e as T}from"./@vue.581f5ce0.js";var Ee=Object.defineProperty,$e=Object.defineProperties,Fe=Object.getOwnPropertyDescriptors,J=Object.getOwnPropertySymbols,Ie=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable,q=(e,t,r)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ce=(e,t)=>{for(var r in t||(t={}))Ie.call(t,r)&&q(e,r,t[r]);if(J)for(var r of J(t))je.call(t,r)&&q(e,r,t[r]);return e},Ne=(e,t)=>$e(e,Fe(t));function It(e,t){var r;const n=fe();return de(()=>{n.value=e()},Ne(Ce({},t),{flush:(r=t==null?void 0:t.flush)!=null?r:"sync"})),L(n)}var H;const A=typeof window<"u",Te=e=>typeof e<"u",pe=e=>typeof e=="function",De=e=>typeof e=="string",D=()=>{},Ae=A&&((H=window==null?void 0:window.navigator)==null?void 0:H.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function P(e){return typeof e=="function"?e():we(e)}function z(e,t){function r(...n){return new Promise((a,o)=>{Promise.resolve(e(()=>t.apply(this,n),{fn:t,thisArg:this,args:n})).then(a).catch(o)})}return r}const ve=e=>e();function Re(e,t={}){let r,n,a=D;const o=s=>{clearTimeout(s),a(),a=D};return s=>{const u=P(e),f=P(t.maxWait);return r&&o(r),u<=0||f!==void 0&&f<=0?(n&&(o(n),n=null),Promise.resolve(s())):new Promise((p,v)=>{a=t.rejectOnCancel?v:p,f&&!n&&(n=setTimeout(()=>{r&&o(r),n=null,p(s())},f)),r=setTimeout(()=>{n&&o(n),n=null,p(s())},u)})}}function Me(e,t=!0,r=!0,n=!1){let a=0,o,l=!0,s=D,u;const f=()=>{o&&(clearTimeout(o),o=void 0,s(),s=D)};return v=>{const i=P(e),c=Date.now()-a,d=()=>u=v();return f(),i<=0?(a=Date.now(),d()):(c>i&&(r||!l)?(a=Date.now(),d()):t&&(u=new Promise((_,E)=>{s=n?E:_,o=setTimeout(()=>{a=Date.now(),l=!0,_(d()),f()},Math.max(0,i-c))})),!r&&!o&&(o=setTimeout(()=>l=!0,i)),l=!1,u)}}function ke(e=ve){const t=g(!0);function r(){t.value=!1}function n(){t.value=!0}const a=(...o)=>{t.value&&e(...o)};return{isActive:L(t),pause:r,resume:n,eventFilter:a}}function xe(e){return e}function R(e){return he()?(be(e),!0):!1}function Ve(e,t=200,r={}){return z(Re(t,r),e)}function jt(e,t=200,r={}){const n=g(e.value),a=Ve(()=>{n.value=e.value},t,r);return $(e,()=>a()),n}function Ct(e,t=200,r=!1,n=!0,a=!1){return z(Me(t,r,n,a),e)}function Le(e){return typeof e=="function"?T(e):g(e)}function W(e,t=!0){ue()?Pe(e):t?e():ce(e)}function Nt(e,t,r={}){const{immediate:n=!0}=r,a=g(!1);let o=null;function l(){o&&(clearTimeout(o),o=null)}function s(){a.value=!1,l()}function u(...f){l(),a.value=!0,o=setTimeout(()=>{a.value=!1,o=null,e(...f)},P(t))}return n&&(a.value=!0,A&&u()),R(s),{isPending:L(a),start:u,stop:s}}function Tt(e=!1,t={}){const{truthyValue:r=!0,falsyValue:n=!1}=t,a=Se(e),o=g(e);function l(s){if(arguments.length)return o.value=s,o.value;{const u=P(r);return o.value=o.value===u?P(n):u,o.value}}return a?l:[o,l]}var B=Object.getOwnPropertySymbols,ze=Object.prototype.hasOwnProperty,We=Object.prototype.propertyIsEnumerable,Qe=(e,t)=>{var r={};for(var n in e)ze.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&B)for(var n of B(e))t.indexOf(n)<0&&We.call(e,n)&&(r[n]=e[n]);return r};function Je(e,t,r={}){const n=r,{eventFilter:a=ve}=n,o=Qe(n,["eventFilter"]);return $(e,z(a,t),o)}var qe=Object.defineProperty,He=Object.defineProperties,Be=Object.getOwnPropertyDescriptors,M=Object.getOwnPropertySymbols,me=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable,U=(e,t,r)=>t in e?qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ue=(e,t)=>{for(var r in t||(t={}))me.call(t,r)&&U(e,r,t[r]);if(M)for(var r of M(t))_e.call(t,r)&&U(e,r,t[r]);return e},Ge=(e,t)=>He(e,Be(t)),Ke=(e,t)=>{var r={};for(var n in e)me.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&M)for(var n of M(e))t.indexOf(n)<0&&_e.call(e,n)&&(r[n]=e[n]);return r};function Xe(e,t,r={}){const n=r,{eventFilter:a}=n,o=Ke(n,["eventFilter"]),{eventFilter:l,pause:s,resume:u,isActive:f}=ke(a);return{stop:Je(e,t,Ge(Ue({},o),{eventFilter:l})),pause:s,resume:u,isActive:f}}function I(e){var t;const r=P(e);return(t=r==null?void 0:r.$el)!=null?t:r}const S=A?window:void 0,ge=A?window.document:void 0;A&&window.navigator;A&&window.location;function b(...e){let t,r,n,a;if(De(e[0])||Array.isArray(e[0])?([r,n,a]=e,t=S):[t,r,n,a]=e,!t)return D;Array.isArray(r)||(r=[r]),Array.isArray(n)||(n=[n]);const o=[],l=()=>{o.forEach(p=>p()),o.length=0},s=(p,v,i,c)=>(p.addEventListener(v,i,c),()=>p.removeEventListener(v,i,c)),u=$(()=>[I(t),P(a)],([p,v])=>{l(),p&&o.push(...r.flatMap(i=>n.map(c=>s(p,i,c,v))))},{immediate:!0,flush:"post"}),f=()=>{u(),l()};return R(f),f}let G=!1;function Dt(e,t,r={}){const{window:n=S,ignore:a=[],capture:o=!0,detectIframe:l=!1}=r;if(!n)return;Ae&&!G&&(G=!0,Array.from(n.document.body.children).forEach(i=>i.addEventListener("click",D)));let s=!0;const u=i=>a.some(c=>{if(typeof c=="string")return Array.from(n.document.querySelectorAll(c)).some(d=>d===i.target||i.composedPath().includes(d));{const d=I(c);return d&&(i.target===d||i.composedPath().includes(d))}}),p=[b(n,"click",i=>{const c=I(e);if(!(!c||c===i.target||i.composedPath().includes(c))){if(i.detail===0&&(s=!u(i)),!s){s=!0;return}t(i)}},{passive:!0,capture:o}),b(n,"pointerdown",i=>{const c=I(e);c&&(s=!i.composedPath().includes(c)&&!u(i))},{passive:!0}),l&&b(n,"blur",i=>{var c;const d=I(e);((c=n.document.activeElement)==null?void 0:c.tagName)==="IFRAME"&&!(d!=null&&d.contains(n.document.activeElement))&&t(i)})].filter(Boolean);return()=>p.forEach(i=>i())}function Q(e,t=!1){const r=g(),n=()=>r.value=Boolean(e());return n(),W(n,t),r}function Ye(e,t={}){const{window:r=S}=t,n=Q(()=>r&&"matchMedia"in r&&typeof r.matchMedia=="function");let a;const o=g(!1),l=()=>{!a||("removeEventListener"in a?a.removeEventListener("change",s):a.removeListener(s))},s=()=>{!n.value||(l(),a=r.matchMedia(Le(e).value),o.value=a.matches,"addEventListener"in a?a.addEventListener("change",s):a.addListener(s))};return de(s),R(()=>l()),o}function Ze(e){return JSON.parse(JSON.stringify(e))}const x=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},V="__vueuse_ssr_handlers__";x[V]=x[V]||{};const et=x[V];function Oe(e,t){return et[e]||t}function tt(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}var rt=Object.defineProperty,K=Object.getOwnPropertySymbols,nt=Object.prototype.hasOwnProperty,at=Object.prototype.propertyIsEnumerable,X=(e,t,r)=>t in e?rt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Y=(e,t)=>{for(var r in t||(t={}))nt.call(t,r)&&X(e,r,t[r]);if(K)for(var r of K(t))at.call(t,r)&&X(e,r,t[r]);return e};const ot={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},Z="vueuse-storage";function st(e,t,r,n={}){var a;const{flush:o="pre",deep:l=!0,listenToStorageChanges:s=!0,writeDefaults:u=!0,mergeDefaults:f=!1,shallow:p,window:v=S,eventFilter:i,onError:c=m=>{console.error(m)}}=n,d=(p?fe:g)(t);if(!r)try{r=Oe("getDefaultStorage",()=>{var m;return(m=S)==null?void 0:m.localStorage})()}catch(m){c(m)}if(!r)return d;const _=P(t),E=tt(_),O=(a=n.serializer)!=null?a:ot[E],{pause:y,resume:w}=Xe(d,()=>j(d.value),{flush:o,deep:l,eventFilter:i});return v&&s&&(b(v,"storage",F),b(v,Z,k)),F(),d;function j(m){try{if(m==null)r.removeItem(e);else{const h=O.write(m),C=r.getItem(e);C!==h&&(r.setItem(e,h),v&&v.dispatchEvent(new CustomEvent(Z,{detail:{key:e,oldValue:C,newValue:h,storageArea:r}})))}}catch(h){c(h)}}function N(m){const h=m?m.newValue:r.getItem(e);if(h==null)return u&&_!==null&&r.setItem(e,O.write(_)),_;if(!m&&f){const C=O.read(h);return pe(f)?f(C,_):E==="object"&&!Array.isArray(C)?Y(Y({},_),C):C}else return typeof h!="string"?h:O.read(h)}function k(m){F(m.detail)}function F(m){if(!(m&&m.storageArea!==r)){if(m&&m.key==null){d.value=_;return}if(!(m&&m.key!==e)){y();try{d.value=N(m)}catch(h){c(h)}finally{m?ce(w):w()}}}}}function ye(e){return Ye("(prefers-color-scheme: dark)",e)}var lt=Object.defineProperty,ee=Object.getOwnPropertySymbols,it=Object.prototype.hasOwnProperty,ut=Object.prototype.propertyIsEnumerable,te=(e,t,r)=>t in e?lt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ct=(e,t)=>{for(var r in t||(t={}))it.call(t,r)&&te(e,r,t[r]);if(ee)for(var r of ee(t))ut.call(t,r)&&te(e,r,t[r]);return e};function ft(e={}){const{selector:t="html",attribute:r="class",initialValue:n="auto",window:a=S,storage:o,storageKey:l="vueuse-color-scheme",listenToStorageChanges:s=!0,storageRef:u,emitAuto:f}=e,p=ct({auto:"",light:"light",dark:"dark"},e.modes||{}),v=ye({window:a}),i=T(()=>v.value?"dark":"light"),c=u||(l==null?g(n):st(l,n,o,{window:a,listenToStorageChanges:s})),d=T({get(){return c.value==="auto"&&!f?i.value:c.value},set(y){c.value=y}}),_=Oe("updateHTMLAttrs",(y,w,j)=>{const N=a==null?void 0:a.document.querySelector(y);if(!!N)if(w==="class"){const k=j.split(/\s/g);Object.values(p).flatMap(F=>(F||"").split(/\s/g)).filter(Boolean).forEach(F=>{k.includes(F)?N.classList.add(F):N.classList.remove(F)})}else N.setAttribute(w,j)});function E(y){var w;const j=y==="auto"?i.value:y;_(t,r,(w=p[j])!=null?w:j)}function O(y){e.onChanged?e.onChanged(y,E):E(y)}return $(d,O,{flush:"post",immediate:!0}),f&&$(i,()=>O(d.value),{flush:"post"}),W(()=>O(d.value)),d}function At(e,t,{window:r=S,initialValue:n=""}={}){const a=g(n),o=T(()=>{var l;return I(t)||((l=r==null?void 0:r.document)==null?void 0:l.documentElement)});return $([o,()=>P(e)],([l,s])=>{var u;if(l&&r){const f=(u=r.getComputedStyle(l).getPropertyValue(s))==null?void 0:u.trim();a.value=f||n}},{immediate:!0}),$(a,l=>{var s;(s=o.value)!=null&&s.style&&o.value.style.setProperty(P(e),l)}),a}var dt=Object.defineProperty,pt=Object.defineProperties,vt=Object.getOwnPropertyDescriptors,re=Object.getOwnPropertySymbols,mt=Object.prototype.hasOwnProperty,_t=Object.prototype.propertyIsEnumerable,ne=(e,t,r)=>t in e?dt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,gt=(e,t)=>{for(var r in t||(t={}))mt.call(t,r)&&ne(e,r,t[r]);if(re)for(var r of re(t))_t.call(t,r)&&ne(e,r,t[r]);return e},Ot=(e,t)=>pt(e,vt(t));function Rt(e={}){const{valueDark:t="dark",valueLight:r="",window:n=S}=e,a=ft(Ot(gt({},e),{onChanged:(s,u)=>{var f;e.onChanged?(f=e.onChanged)==null||f.call(e,s==="dark"):u(s)},modes:{dark:t,light:r}})),o=ye({window:n});return T({get(){return a.value==="dark"},set(s){s===o.value?a.value="auto":a.value=s?"dark":"light"}})}function Mt({document:e=ge}={}){if(!e)return g("visible");const t=g(e.visibilityState);return b(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var ae=Object.getOwnPropertySymbols,yt=Object.prototype.hasOwnProperty,wt=Object.prototype.propertyIsEnumerable,ht=(e,t)=>{var r={};for(var n in e)yt.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&ae)for(var n of ae(e))t.indexOf(n)<0&&wt.call(e,n)&&(r[n]=e[n]);return r};function kt(e,t,r={}){const n=r,{window:a=S}=n,o=ht(n,["window"]);let l;const s=Q(()=>a&&"ResizeObserver"in a),u=()=>{l&&(l.disconnect(),l=void 0)},f=$(()=>I(e),v=>{u(),s.value&&a&&v&&(l=new ResizeObserver(t),l.observe(v,o))},{immediate:!0,flush:"post"}),p=()=>{u(),f()};return R(p),{isSupported:s,stop:p}}const oe=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]];function xt(e,t={}){const{document:r=ge,autoExit:n=!1}=t,a=e||(r==null?void 0:r.querySelector("html")),o=g(!1);let l=oe[0];const s=Q(()=>{if(r){for(const _ of oe)if(_[1]in r)return l=_,!0}else return!1;return!1}),[u,f,p,,v]=l;async function i(){!s.value||(r!=null&&r[p]&&await r[f](),o.value=!1)}async function c(){if(!s.value)return;await i();const _=I(a);_&&(await _[u](),o.value=!0)}async function d(){o.value?await i():await c()}return r&&b(r,v,()=>{o.value=!!(r!=null&&r[p])},!1),n&&R(i),{isSupported:s,isFullscreen:o,enter:c,exit:i,toggle:d}}var se;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(se||(se={}));var bt=Object.defineProperty,le=Object.getOwnPropertySymbols,Pt=Object.prototype.hasOwnProperty,St=Object.prototype.propertyIsEnumerable,ie=(e,t,r)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Et=(e,t)=>{for(var r in t||(t={}))Pt.call(t,r)&&ie(e,r,t[r]);if(le)for(var r of le(t))St.call(t,r)&&ie(e,r,t[r]);return e};const $t={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};Et({linear:xe},$t);function Vt(e,t,r,n={}){var a,o,l;const{clone:s=!1,passive:u=!1,eventName:f,deep:p=!1,defaultValue:v}=n,i=ue(),c=r||(i==null?void 0:i.emit)||((a=i==null?void 0:i.$emit)==null?void 0:a.bind(i))||((l=(o=i==null?void 0:i.proxy)==null?void 0:o.$emit)==null?void 0:l.bind(i==null?void 0:i.proxy));let d=f;t||(t="modelValue"),d=f||d||`update:${t.toString()}`;const _=O=>s?pe(s)?s(O):Ze(O):O,E=()=>Te(e[t])?_(e[t]):v;if(u){const O=E(),y=g(O);return $(()=>e[t],w=>y.value=_(w)),$(y,w=>{(w!==e[t]||p)&&c(d,w)},{deep:p}),y}else return T({get(){return E()},set(O){c(d,O)}})}function Lt({window:e=S}={}){if(!e)return g(!1);const t=g(e.document.hasFocus());return b(e,"blur",()=>{t.value=!1}),b(e,"focus",()=>{t.value=!0}),t}function zt(e={}){const{window:t=S,initialWidth:r=1/0,initialHeight:n=1/0,listenOrientation:a=!0,includeScrollbar:o=!0}=e,l=g(r),s=g(n),u=()=>{t&&(o?(l.value=t.innerWidth,s.value=t.innerHeight):(l.value=t.document.documentElement.clientWidth,s.value=t.document.documentElement.clientHeight))};return u(),W(u),b("resize",u,{passive:!0}),a&&b("orientationchange",u,{passive:!0}),{width:l,height:s}}export{b as a,I as b,At as c,Nt as d,Ct as e,Ae as f,Mt as g,Lt as h,A as i,It as j,Vt as k,xt as l,Rt as m,Tt as n,Dt as o,zt as p,jt as r,R as t,kt as u};