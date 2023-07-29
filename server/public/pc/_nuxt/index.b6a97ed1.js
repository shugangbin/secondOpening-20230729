import{a as J,a9 as P,a5 as H,r as y,al as j,am as O,b as F,an as Z,ao as Y,ap as L,ad as U,o as d,i as m,f as r,e as u,z as N,c as D,h as t,F as b,j as T,t as E,l as z,v as W,H as V,k as q,aq as X,a7 as ee,ac as te,u as l,ar as oe,as as se,at as ae,au as le,M as ne,av as ie,a8 as re,J as ce,K as M,aw as $,ag as de,ah as ue}from"./entry.47644ad8.js";import{E as pe}from"./index.fd4342e5.js";import{E as me}from"./index.7ded7c66.js";import{E as Ae}from"./index.5f1ada03.js";/* empty css                *//* empty css                  *//* empty css                        *//* empty css                     */import{b as ge}from"./index.1d02bbbe.js";import{e as he,k as fe}from"./drawing.e1203c85.js";import{u as _e}from"./useLockFn.20997974.js";import{E as ve,a as xe}from"./index.749efd5f.js";import{E as we}from"./index.53e0169a.js";/* empty css                  */import{_ as G}from"./_plugin-vue_export-helper.c27b6911.js";import{K as Ce}from"./keyword-suggestion.b6027bde.js";import"./throttle.a2b1ebd6.js";import"./debounce.ad6365f0.js";import"./position.0a5dfbe0.js";import"./_baseClone.7cdf9853.js";import"./_getTag.ff85c21b.js";import"./isEqual.1f1c08b1.js";import"./use-dialog.c1a38897.js";import"./refs.1a6521b3.js";import"./index.fa6b8d9e.js";import"./strings.6f89bc4f.js";import"./index.d4237e01.js";const Ee=J({components:{},props:{type:{type:String,default:"image"},multiple:{type:Boolean,default:!0},limit:{type:Number,default:10},data:{type:Object,default:()=>({})},showProgress:{type:Boolean,default:!1}},emits:["change","error","success"],setup(e,{emit:A}){const x=P(),g=H(),s=y(`${j()}${O()}/upload/${e.type}`),C=F(()=>({token:x.token,version:Z()})),n=y(!1),p=y([]),_=(o,c,f)=>{n.value=!0,p.value=Y(f)},h=(o,c,f)=>{var I;f.every(B=>B.status=="success")&&((I=g.value)==null||I.clearFiles(),n.value=!1),A("change",c),o.code==L.SUCCESS&&A("success",o),o.code==L.FAIL&&o.msg&&U.msgError(o.msg)},k=(o,c)=>{var f;U.msgError(`${c.name}文件上传失败`),(f=g.value)==null||f.abort(c),n.value=!1,A("change",c),A("error",c)},Q=()=>{U.msgError(`超出上传上限${e.limit}，请重新上传`)},S=()=>{var o;(o=g.value)==null||o.clearFiles(),n.value=!1},i=F(()=>{switch(e.type){case"image":return".jpg,.png,.gif,.jpeg";case"video":return".wmv,.avi,.mpg,.mpeg,.3gp,.mov,.mp4,.flv,.rmvb,.mkv";default:return"*"}});return{uploadRefs:g,action:s,headers:C,visible:n,fileList:p,getAccept:i,handleProgress:_,handleSuccess:h,handleError:k,handleExceed:Q,handleClose:S}}});const Ve={class:"upload"},ye={class:"file-list p-4"},Re={class:"flex-1"};function ke(e,A,x,g,s,C){const n=ve,p=xe,_=we;return d(),m("div",Ve,[r(n,{class:"w-[inherit]",ref:"uploadRefs",action:e.action,multiple:e.multiple,limit:e.limit,"show-file-list":!1,headers:e.headers,data:e.data,"on-progress":e.handleProgress,"on-success":e.handleSuccess,"on-exceed":e.handleExceed,"on-error":e.handleError,accept:e.getAccept},{default:u(()=>[N(e.$slots,"default",{},void 0,!0)]),_:3},8,["action","multiple","limit","headers","data","on-progress","on-success","on-exceed","on-error","accept"]),e.showProgress&&e.fileList.length?(d(),D(_,{key:0,modelValue:e.visible,"onUpdate:modelValue":A[0]||(A[0]=h=>e.visible=h),title:"上传进度","close-on-click-modal":!1,width:"500px",modal:!1,onClose:e.handleClose},{default:u(()=>[t("div",ye,[(d(!0),m(b,null,T(e.fileList,(h,k)=>(d(),m("div",{key:k,class:"mb-5"},[t("div",null,E(h.name),1),t("div",Re,[r(p,{percentage:parseInt(h.percentage)},null,8,["percentage"])])]))),128))])]),_:1},8,["modelValue","onClose"])):z("",!0)])}const be=G(Ee,[["render",ke],["__scopeId","data-v-b8558465"]]);const Se=["data-error"],Ie=["placeholder","rows","value","maxlength"],Ue={key:0,class:"l-textarea-length-maxlength"},Qe={__name:"index",props:{placeholder:"",maxlength:"",error:"",rows:"",customStyle:{},showWordLimit:!1,modelValue:""},emits:["update:modelValue"],setup(e,{emit:A}){var n;const x=e,g=y(x.modelValue),s=y(((n=x.modelValue)==null?void 0:n.length)||0),C=p=>{const _=p||window.event,h=_.srcElement||_.taget;A("update:modelValue",h.value)};return W(()=>x.modelValue,p=>{g.value=p,s.value=p.length}),(p,_)=>(d(),m("div",{class:q(["l-textarea",{error:e.error}]),"data-error":e.error,style:X(e.customStyle)},[t("textarea",{class:"l-textarea__inner",placeholder:e.placeholder,rows:e.rows,value:g.value,maxlength:e.maxlength,onInput:C},null,40,Ie),e.showWordLimit?(d(),m("div",Ue,[t("span",null,E(s.value),1),V(" / "),t("span",null,E(e.maxlength),1)])):z("",!0),N(p.$slots,"length-suffix",{},void 0,!0)],14,Se))}},Be=G(Qe,[["__scopeId","data-v-dd0ec5e8"]]),Fe="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAfklEQVRIx+3WMQ7CMAwF0GfI0oghJ+D+5+IEDKgIVBSGCFWsaQeE4t1P317sKNUulcC8UckNmp3dJD3ZwuLkIrdEdw/PawdUQnVcRwtE6RkqVLFCFbUr0afboX/D3zWgAQ1oQAMa0D9Bv3eyGzR5SV0vV1hMEKXu92iRN0J4AwbXHqr/G0jFAAAAAElFTkSuQmCC",De="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAv0lEQVRIx+2WsQrCUAxFz4ulUF3eF1j8Ef12cfcPHHRz69SKYOLgoPTllQpO8u6YhMNNltzAh6KgtOxpUQRfinBmxxnp9F2unNEADIQMyFh5vRSk1FzZcqJBRz3hxoYDddJxHYHS86DvRuNRUAZ0nqPXcgKEGJI6BH9pHwQGWGcjR0ZWwo9UQAVUQAVUQAX0T6Dcpw3Zl/0VyNDsyzZsfogQlixoohdrGgSbAxLurDlOBq1LetvKHYVmIvrhOXoCnJUxVYSTwCMAAAAASUVORK5CYII=",Te="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAnElEQVRIx+3WMQsCMQyG4TdeQa44dHH1//8uwcnlBqmceMRBtPbOg3QTyTcVWh7SLIlAEpTImYgi2KMImT0ZGTRUV9cGBiCWY4E6Rg5cCKiBEO7sONEtoWdFI7fBACVBC7KEBJBk+ZTM+1lDCqipotfrdzaN7V2NQw455JBDDv0T9Hsju4Z6JkKyrjX9d2gicmxszJa8VlHb6veRB+vkJ3d/5MaRAAAAAElFTkSuQmCC",Ne="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAlklEQVRIx+3Wqw4CMRAF0DPsJIQFUYPm/z8LjUHwCARSBCFBdytW7Pie3I7oLZ0mSvSiuiUa+0DphGGi8iaNeEyERhJXBxeptqzGy87RNhHuHp7nBqiEahDfRASitFwqVMEPqqhNiX6nrSYt+W8WaIEWaIHmAs3vqU1UG29ZWutooxKldijINenWobJvpP1EpPfM76P1Af6EI8NC0twlAAAAAElFTkSuQmCC",ze="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAnUlEQVRIx+3WMQsCMQyG4TdeQa44dHH1//8uwcnlBqmceMRBHGrv0o4i+bZCeEizJAIASVAiVyKK0I4iZI5kZFKAUJXcOxiAWD5LaGDmxI2AGoTw5MCFYRt6dzTzmAwoCVoi65AAkqxPydoca0gBNTv6VBXZdY62GYcccsghhxz6J+j3VnYNjSyE1DprRhtaiJw7h7IntzrqO/2+8gLIgCd3OnpbpgAAAABJRU5ErkJggg==",Ge="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAfklEQVRIx+3WMQ7CMAwF0GfI0oghJ+D+5+IEDKgIVBSGCFWsaQeE4t1P317sKNUulcC8UckNmp3dJD3ZwuLkIrdEdw/PawdUQnVcRwtE6RkqVLFCFbUr0afboX/D3zWgAQ1oQAMa0D9Bv3eyGzR5SV0vV1hMEKXu92iRN0J4AwbXHqr/G0jFAAAAAElFTkSuQmCC",R=e=>(de("data-v-c01b075e"),e=e(),ue(),e),Ke={class:"left-side flex flex-col justify-between"},Le={class:"left-side__main pb-[20px]"},Me=R(()=>t("h3",{class:"text-xl font-bold"},[t("span",null,"文本描述"),t("span",{class:"text-error"},"*")],-1)),$e={class:"mt-[10px] flex"},Je={class:"length-suffix justify-end"},Pe={class:"flex items-center cursor-pointer mt-[8px] text-base"},We=R(()=>t("span",{class:"ml-[4px]"},"随便试试:",-1)),qe={class:"flex truncate w-[230px]"},He=["onClick"],je={class:"mt-[30px]"},Oe=R(()=>t("h1",{class:"text-xl font-bold"},"上传参考图",-1)),Ze={class:"w-full h-[120px] rounded-[4px] flex flex-col items-center justify-center upload-view-box",style:{border:"1px dashed #dcdfe6"}},Ye=R(()=>t("div",{class:"mt-[10px]"},"上传图片",-1)),Xe={class:"upload-view-item"},et={class:"mt-[20px]"},tt=R(()=>t("h1",{class:"text-xl font-bold"},"图片尺寸",-1)),ot={class:"flex justify-between flex-wrap"},st=["onClick"],at={class:"flex justify-center mt-[10px]"},lt=["src"],nt={key:0,class:"text-xl text-[#101010] mt-[4px]"},it={key:1,class:"text-xl text-[#101010] mt-[4px]"},rt=["onUpdate:modelValue"],ct=R(()=>t("span",null," : ",-1)),dt=["onUpdate:modelValue"],ut={class:"text-base text-[#999] mt-[4px]"},pt={class:"left-side__footer text-center"},mt=J({__name:"index",props:{modelValue:{default:{prompt:"",action:"",image_base:"",image_id:"",scale:""}},isReceiving:{type:Boolean,default:!1}},emits:["drawing","update:modelValue"],setup(e,{emit:A}){const x=e;P();const g=ee(),{modelValue:s}=ge(x,A),C=y([]),n=te({current:0,lists:[{icon:Fe,name:"头像图",widthRatio:1,heightRatio:1},{icon:De,name:"手机壁纸",widthRatio:1,heightRatio:2},{icon:Te,name:"文案图",widthRatio:3,heightRatio:4},{icon:Ne,name:"社交媒体",widthRatio:4,heightRatio:3},{icon:ze,name:"宣传海报",widthRatio:9,heightRatio:16},{icon:Ge,name:"自定义",widthRatio:"",heightRatio:""}]}),p=F(()=>{const i=n.lists[n.current];if(i){const{widthRatio:o,heightRatio:c}=i;if(o&&c)return`${o}:${c}`}return""});W(()=>n,i=>{i.current>=0&&(s.value.scale=p.value)},{immediate:!0,deep:!0});const{isLock:_,lockFn:h}=_e(async()=>{try{if(s.value.prompt.trim()==""){U.msgError("请输入描述词");return}const{translate:i}=await fe({prompt:s.value.prompt});s.value.prompt=i}catch(i){console.log("翻译失败=>",i)}}),k=i=>{s.value.prompt=i},Q=()=>{s.value.action="generate",A("drawing",{drawing:s.value,isClear:!0})},S=async()=>{try{C.value=await he()}catch(i){console.log("请求绘画示例失败=>",i)}};return S(),(i,o)=>{const c=re,f=ce,K=pe,I=me,B=Ae;return d(),m("div",Ke,[r(B,{class:"flex-1 min-h-0"},{default:u(()=>[t("div",Le,[Me,t("div",$e,[r(Be,{modelValue:l(s).prompt,"onUpdate:modelValue":o[2]||(o[2]=a=>l(s).prompt=a),maxlength:"1024",rows:7,clearable:!0,"show-word-limit":!1,customStyle:{paddingBottom:"24px"},placeholder:"输入英文描述词，生成效果会更好；描述词越详细，生成的图片效果更加真实哦～"},{"length-suffix":u(()=>{var a,v;return[t("div",Je,[r(Ce,{modelValue:l(s).prompt,"onUpdate:modelValue":o[0]||(o[0]=w=>l(s).prompt=w)},{trigger:u(()=>[r(c,{type:"primary",link:!0,class:"ml-[10px] mb-[1px]"},{default:u(()=>[V(" 关键词推荐 ")]),_:1})]),_:1},8,["modelValue"]),((v=(a=l(g))==null?void 0:a.getDrawConfig)==null?void 0:v.translate_type)==2?(d(),D(c,{key:0,type:"default",link:!0,class:"ml-[10px]",icon:l(oe),loading:l(_),onClick:l(h)},{default:u(()=>[V(" 翻译成英文 ")]),_:1},8,["icon","loading","onClick"])):z("",!0),r(c,{type:"default",link:!0,class:"ml-[10px]",icon:l(se),onClick:o[1]||(o[1]=w=>l(s).prompt="")},{default:u(()=>[V(" 清空 ")]),_:1},8,["icon"])])]}),_:1},8,["modelValue"])]),t("div",Pe,[t("div",{class:"flex items-center text-[#8e8e8e] hover:text-primary select-none",onClick:S},[r(f,{size:"16",color:"inherit"},{default:u(()=>[r(l(ae))]),_:1}),We]),t("div",qe,[(d(!0),m(b,null,T(l(C),(a,v)=>(d(),D(K,{class:"ml-[10px]",effect:"light",key:v,content:a.prompt,placement:"bottom"},{default:u(()=>[t("span",{class:"ml-[10px]",onClick:w=>k(a.prompt_en)},E(a.prompt),9,He)]),_:2},1032,["content"]))),128))])]),t("div",je,[Oe,r(be,{class:"w-full mt-[10px]","show-progress":!0,onSuccess:o[4]||(o[4]=a=>l(s).image_base=a.data.uri)},{default:u(()=>[t("div",Ze,[l(s).image_base?(d(),m(b,{key:1},[r(I,{class:"w-full h-[120px]",src:l(s).image_base,fit:"contain"},null,8,["src"]),t("div",Xe,[r(f,{size:"24",class:"upload-clear",color:"#ffffff",onClick:o[3]||(o[3]=ne(a=>l(s).image_base="",["stop"]))},{default:u(()=>[r(l(ie))]),_:1}),r(c,{type:"primary"},{default:u(()=>[V("重新上传")]),_:1})])],64)):(d(),m(b,{key:0},[r(f,{size:40},{default:u(()=>[r(l(le))]),_:1}),Ye],64))])]),_:1})]),t("div",et,[tt,t("div",ot,[(d(!0),m(b,null,T(n.lists,(a,v)=>(d(),m("div",{key:v,class:q(["picture-size w-[100px] h-[88px] mt-[10px] rounded-[4px] cursor-pointer text-center",{"picture-size-active":n.current==v}]),onClick:w=>n.current=v},[t("div",at,[t("img",{class:"w-[18px] h-[18px]",src:a.icon,alt:"图片尺寸"},null,8,lt)]),v!=5?(d(),m("div",nt,E(a.widthRatio)+":"+E(a.heightRatio),1)):(d(),m("div",it,[M(t("input",{"onUpdate:modelValue":w=>a.widthRatio=w,class:"input-ratio w-7 text-center",type:"number",min:"0",max:"50"},null,8,rt),[[$,a.widthRatio]]),ct,M(t("input",{"onUpdate:modelValue":w=>a.heightRatio=w,class:"input-ratio w-7 text-center",type:"number",min:"0",max:"50"},null,8,dt),[[$,a.heightRatio]])])),t("div",ut,E(a.name),1)],10,st))),128))])])])]),_:1}),t("div",pt,[N(i.$slots,"model",{},void 0,!0),r(c,{size:"large",type:"default",class:"w-full submit-btn",disabled:i.isReceiving,onClick:o[5]||(o[5]=a=>Q())},{default:u(()=>[V(" 立即生成 ")]),_:1},8,["disabled"])])])}}});const Lt=G(mt,[["__scopeId","data-v-c01b075e"]]);export{Lt as default};