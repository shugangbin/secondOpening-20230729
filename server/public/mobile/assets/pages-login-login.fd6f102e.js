import{_ as e,o as a,e as t,f as l,g as o,n as s,y as n,T as i,j as r,k as u,d as c,B as d,i as m,h as p,F as f,a as g,b as v,K as _,W as y,c as x,r as h,u as b,t as k,ar as w,as as C,v as j,m as S,Y as L,Z as V,$ as U,A as $,Q as I,z as W,aA as z,x as N,C as B,w as A,M as O,an as F,ao as G,H as M,J as T,aH as H,aI as P,aJ as q,aK as D,aL as K,q as Q,aM as R,aN as J,aO as Z,aP as Y,aQ as E}from"./index-5fd89c82.js";import{_ as X}from"./page-meta.e1766212.js";import{_ as ee}from"./u-icon.a1449c4b.js";import{_ as ae}from"./u-button.ea6057e5.js";import{_ as te}from"./agreement.1bc7ed82.js";import{_ as le}from"./u-input.89121eb6.js";import{_ as oe}from"./u-form-item.2be3ee00.js";import{_ as se}from"./u-verification-code.500a5db0.js";import{_ as ne}from"./u-form.7e2aef85.js";import{_ as ie}from"./avatar-upload.ea30fce9.js";import{_ as re}from"./u-popup.f70e8582.js";import{u as ue}from"./useLockFn.b0443122.js";import"./u-checkbox.60e8ea24.js";import"./emitter.1571a5d9.js";import"./_commonjsHelpers.8b4586d6.js";const ce=e({name:"u-divider",props:{halfWidth:{type:[Number,String],default:150},borderColor:{type:String,default:"#dcdfe6"},type:{type:String,default:"primary"},color:{type:String,default:"#909399"},fontSize:{type:[Number,String],default:26},bgColor:{type:String,default:"#ffffff"},height:{type:[Number,String],default:"auto"},marginTop:{type:[String,Number],default:0},marginBottom:{type:[String,Number],default:0},useSlot:{type:Boolean,default:!0}},computed:{lineStyle(){let e={};return-1!=String(this.halfWidth).indexOf("%")?e.width=this.halfWidth:e.width=this.halfWidth+"rpx",this.borderColor&&(e.borderColor=this.borderColor),e}},methods:{click(){this.$emit("click")}}},[["render",function(e,c,d,m,p,f){const g=u;return a(),t(g,{class:"u-divider",style:n({height:"auto"==d.height?"auto":d.height+"rpx",backgroundColor:d.bgColor,marginBottom:d.marginBottom+"rpx",marginTop:d.marginTop+"rpx"}),onClick:f.click},{default:l((()=>[o(g,{class:s(["u-divider-line",[d.type?"u-divider-line--bordercolor--"+d.type:""]]),style:n([f.lineStyle])},null,8,["class","style"]),d.useSlot?(a(),t(g,{key:0,class:"u-divider-text",style:n({color:d.color,fontSize:d.fontSize+"rpx"})},{default:l((()=>[i(e.$slots,"default",{},void 0,!0)])),_:3},8,["style"])):r("v-if",!0),o(g,{class:s(["u-divider-line",[d.type?"u-divider-line--bordercolor--"+d.type:""]]),style:n([f.lineStyle])},null,8,["class","style"])])),_:3},8,["style","onClick"])}],["__scopeId","data-v-a2ed8e05"]]),de=c({__name:"weixin",props:{loading:{type:Boolean}},emits:["login"],setup(e,{emit:t}){const s=d(),n=()=>{var e;(null==(e=s.value)?void 0:e.checkAgreement())&&t("login")};return(t,i)=>{const r=g(v("u-icon"),ee),c=_,d=g(v("u-button"),ae),y=u,x=g(v("agreement"),te);return a(),m(f,null,[o(y,{class:"my-[30rpx]"},{default:l((()=>[o(d,{type:"primary",shape:"circle","hover-class":"none",loading:e.loading,onClick:n},{default:l((()=>[o(r,{name:"weixin-fill",size:"40"}),o(c,{class:"ml-[10rpx]"},{default:l((()=>[p(" 微信登录")])),_:1})])),_:1},8,["loading"])])),_:1}),o(y,{class:"py-[30rpx] flex justify-center"},{default:l((()=>[o(x,{ref_key:"agreementRef",ref:s},null,512)])),_:1})],64)}}}),me=c({__name:"mobile",emits:["login"],setup(e,{emit:n}){const i=d(),c=y({scene:1,account:"",code:"",password:""}),m=x((()=>1===c.scene)),f=x((()=>2===c.scene)),S=x((()=>uni.$u.test.mobile(c.account))),L=e=>{c.scene=e},V=d(),U=h(""),$=e=>{U.value=e},I=async()=>{var e,a;c.account&&S.value&&(null==(e=V.value)?void 0:e.canGetCode)&&(await w({scene:C.LOGIN,mobile:c.account}),uni.$u.toast("发送成功"),null==(a=V.value)||a.start())},W=()=>{var e;if(null==(e=i.value)?void 0:e.checkAgreement())return c.account?2!=c.scene||c.password?1!=c.scene||c.code?void n("login",c):uni.$u.toast("请输入验证码"):uni.$u.toast("请输入密码"):uni.$u.toast("请输入手机号码")};return(e,n)=>{const d=g(v("u-icon"),ee),y=g(v("u-input"),le),x=g(v("u-form-item"),oe),h=g(v("u-verification-code"),se),w=_,C=u,z=j("router-navigate"),N=g(v("u-form"),ne),B=g(v("agreement"),te),A=g(v("u-button"),ae);return a(),t(C,null,{default:l((()=>[o(C,{class:"mb-[60rpx]"},{default:l((()=>[o(N,null,{default:l((()=>[o(x,null,{default:l((()=>[o(d,{class:"mr-2",size:36,name:"/static/images/icon/icon_mobile.png"}),o(y,{class:"flex-1",modelValue:c.account,"onUpdate:modelValue":n[0]||(n[0]=e=>c.account=e),border:!1,placeholder:"请输入手机号码"},null,8,["modelValue"])])),_:1}),b(m)?(a(),t(x,{key:0},{default:l((()=>[o(d,{class:"mr-2",size:36,name:"/static/images/icon/icon_code.png"}),o(y,{class:"flex-1",modelValue:c.code,"onUpdate:modelValue":n[1]||(n[1]=e=>c.code=e),placeholder:"请输入验证码",border:!1},null,8,["modelValue"]),o(C,{class:"border-l border-solid border-0 border-light pl-3 leading-4 ml-3 w-[180rpx]",onClick:I},{default:l((()=>[o(h,{ref_key:"uCodeRef",ref:V,seconds:60,onChange:$,"change-text":"x秒"},null,512),o(w,{class:s(b(S)?"text-primary":"text-muted")},{default:l((()=>[p(k(U.value),1)])),_:1},8,["class"])])),_:1})])),_:1})):r("v-if",!0),b(f)?(a(),t(x,{key:1},{default:l((()=>[o(d,{class:"mr-2",size:36,name:"/static/images/icon/icon_password.png"}),o(y,{class:"flex-1",modelValue:c.password,"onUpdate:modelValue":n[2]||(n[2]=e=>c.password=e),type:"password",placeholder:"请输入密码",border:!1},null,8,["modelValue"]),o(z,{to:"/pages/forget_pwd/forget_pwd"},{default:l((()=>[o(C,{class:"border-l border-solid border-0 border-light pl-3 text-muted leading-4 ml-3"},{default:l((()=>[p(" 忘记密码？ ")])),_:1})])),_:1})])),_:1})):r("v-if",!0)])),_:1})])),_:1}),o(C,{class:"mb-[40rpx]"},{default:l((()=>[o(B,{ref_key:"agreementRef",ref:i},null,512)])),_:1}),o(A,{type:"primary",shape:"circle","hover-class":"none",onClick:W},{default:l((()=>[p(" 登 录 ")])),_:1}),o(C,{class:"text-content flex justify-between mt-[40rpx]"},{default:l((()=>[o(C,{class:"flex-1"},{default:l((()=>[b(m)?(a(),t(C,{key:0,onClick:n[3]||(n[3]=e=>L(2))},{default:l((()=>[p(" 手机密码登录 ")])),_:1})):r("v-if",!0),b(f)?(a(),t(C,{key:1,onClick:n[4]||(n[4]=e=>L(1))},{default:l((()=>[p(" 手机验证码登录 ")])),_:1})):r("v-if",!0)])),_:1}),o(z,{to:"/pages/register/register"},{default:l((()=>[p(" 注册账号 ")])),_:1})])),_:1})])),_:1})}}}),pe=c({__name:"update-user-info",props:{show:{type:Boolean},logo:{type:String},title:{type:String},userInfo:{type:Object}},emits:["update:show","update"],setup(e,{emit:s}){const n=e,i=x({get:()=>n.show,set(e){s("update:show",e)}}),r=h(),c=async e=>{var a;L({title:"正在上传中..."});try{const t=await V(e,null==(a=n.userInfo)?void 0:a.token);r.value=t.uri,console.log(t),U()}catch(t){console.log(t),U(),uni.$u.toast("上传失败，请重试")}},d=e=>{const{nickname:a}=e.detail.value;return r.value?a?void s("update",{avatar:r.value,nickname:a}):uni.$u.toast("请输入昵称"):uni.$u.toast("请添加头像")};return(s,n)=>{const m=$,f=_,y=u,x=g(v("avatar-upload"),ie),h=g(v("u-form-item"),oe),w=I,C=W,j=z,L=g(v("u-popup"),re);return a(),t(y,null,{default:l((()=>[o(L,{modelValue:b(i),"onUpdate:modelValue":n[2]||(n[2]=e=>S(i)?i.value=e:null),mode:"bottom","border-radius":"14","mask-close-able":!1},{default:l((()=>[o(y,{class:"h-[1000rpx] p-[40rpx]"},{default:l((()=>[o(y,{class:"flex items-center"},{default:l((()=>[o(m,{class:"w-[100rpx] h-[100rpx] rounded",mode:"heightFix",src:e.logo},null,8,["src"]),o(f,{class:"text-3xl ml-5 font-medium"},{default:l((()=>[p(k(e.title),1)])),_:1})])),_:1}),o(y,{class:"mt-5 text-muted"},{default:l((()=>[p(" 建议使用您的微信头像和昵称，以便获得更好的体验 ")])),_:1}),o(y,{class:"mt-[30rpx]"},{default:l((()=>[o(j,{onSubmit:d},{default:l((()=>[o(h,{required:"",label:"头像",labelWidth:120},{default:l((()=>[o(y,{class:"flex-1"},{default:l((()=>[o(x,{modelValue:r.value,"onUpdate:modelValue":n[0]||(n[0]=e=>r.value=e),onUpload:c},null,8,["modelValue"])])),_:1})])),_:1}),o(h,{required:"",label:"昵称",labelWidth:120},{default:l((()=>[o(w,{class:"flex-1 h-[60rpx]",name:"nickname",type:"nickname",placeholder:"请输入昵称"})])),_:1}),o(y,{class:"mt-[80rpx]"},{default:l((()=>[o(C,{class:"bg-primary rounded-full text-white text-lg h-[80rpx] leading-[80rpx]","hover-class":"none","form-type":"submit"},{default:l((()=>[p(" 确定 ")])),_:1})])),_:1}),o(y,{class:"flex justify-center mt-[60rpx]"},{default:l((()=>[o(y,{class:"text-muted",onClick:n[1]||(n[1]=e=>i.value=!1)},{default:l((()=>[p(" 暂不登录 ")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})}}}),fe=e(c({__name:"login",setup(e){const s=N(),n=B(),i=T();H();const c=h(!1),d=h(0),_=x((()=>1==d.value)),y=x((()=>2==d.value)),w=x((()=>{var e;return(null==(e=s.getLoginConfig.login_way)?void 0:e.length)>1})),C=x((()=>s.getWebsiteConfig)),j=e=>{d.value=e},S=h({}),V=async(e={getUrl:!0})=>{const{code:a,getUrl:t}=e;if(!t){return await P({code:a})}return await F.getUrl(G.LOGIN),Promise.reject()},I=async()=>{const{token:e}=S.value;n.login(e),n.getUser();const a=K();if(a.length>1){const e=a[a.length-2];await i.navigateBack();const{onLoad:t,options:l}=e;t&&t(l)}else Q.get(R)?i.redirectTo(Q.get(R)):i.reLaunch("/pages/index/index");Q.remove(R)},W=q((async()=>{const e=Q.get(Z),a=Q.get(Y);try{(e||a)&&(await E({share_id:e,user_sn:a},S.value.token),Q.remove(Z),Q.remove(Y))}catch(t){}}),(async()=>{if(S.value.is_new_user&&!c.value)try{await D({avatar:S.value.avatar,nickname:S.value.nickname},{token:S.value.token})}catch(e){}else if(c.value)return Promise.reject()}),I),{lockFn:z,isLock:ae}=ue((async()=>{let e=null;e=await V(),e&&(S.value=e,W())})),{lockFn:te}=ue((async e=>{L({title:"请稍后..."});try{const a=await J(e);S.value=a,await W(),U()}catch(a){U(),uni.$u.toast(a)}})),le=async e=>{await D(e,{token:S.value.token}),c.value=!1,I()};return A((()=>s.getLoginConfig),(e=>{e.login_way&&(d.value=e.login_way[0])}),{immediate:!0}),O((async()=>{const e=F.getAuthData();try{if(e.code&&e.scene===G.LOGIN){L({title:"请稍后..."});const a=await V(e);a&&(S.value=a,await W())}}catch(a){}finally{U(),F.setAuthData()}})),(e,n)=>{const i=g(v("page-meta"),X),d=$,x=u,h=g(v("u-divider"),ce),L=g(v("u-icon"),ee);return a(),m(f,null,[o(i,{"page-style":e.$theme.pageStyle},null,8,["page-style"]),o(x,{class:"h-full flex flex-col"},{default:l((()=>[o(x,{class:"flex-1 flex flex-col items-center pt-[80rpx] pb-[40rpx]"},{default:l((()=>[o(d,{src:b(s).getWebsiteConfig.shop_logo,mode:"",class:"w-[160rpx] h-[160rpx]"},null,8,["src"]),o(x,{class:"text-[32rpx] font-medium my-[30rpx]"},{default:l((()=>[p(k(b(s).getWebsiteConfig.shop_name),1)])),_:1}),o(x,{class:"w-full px-[75rpx] pt-[120rpx]"},{default:l((()=>[b(_)?(a(),t(de,{key:0,onLogin:b(z),loading:b(ae)},null,8,["onLogin","loading"])):r("v-if",!0),b(y)?(a(),t(me,{key:1,onLogin:b(te)},null,8,["onLogin"])):r("v-if",!0)])),_:1})])),_:1}),b(w)?(a(),t(x,{key:0,class:"p-[40rpx]"},{default:l((()=>[o(h,null,{default:l((()=>[p("其他登录方式")])),_:1}),M("div",{class:"flex justify-center mt-[40rpx]"},[b(y)?(a(),m("div",{key:0,class:"flex flex-col items-center",onClick:n[0]||(n[0]=e=>j(1))},[o(L,{name:"/static/images/icon/icon_wx.png",size:80}),M("div",{class:"text-sm mt-[10px]"},"微信登录")])):r("v-if",!0),b(_)?(a(),m("div",{key:1,class:"flex flex-col items-center",onClick:n[1]||(n[1]=e=>j(2))},[o(L,{name:"/static/images/icon/icon_phone.png",size:80}),M("div",{class:"text-sm mt-[10px]"},"手机号登录")])):r("v-if",!0)]),r(" <agreement /> ")])),_:1})):r("v-if",!0),o(pe,{show:c.value,"onUpdate:show":n[2]||(n[2]=e=>c.value=e),logo:b(C).shop_logo,title:b(C).shop_name,userInfo:S.value,onUpdate:le},null,8,["show","logo","title","userInfo"]),r(' <bind-mobile\n            v-model:show="showBindMobilePopup"\n            :userInfo="loginData"\n            @success="bindMobileSuccess"\n            @close="removeWxQuery"\n        /> ')])),_:1})],64)}}}),[["__scopeId","data-v-4b3179ef"]]);export{fe as default};