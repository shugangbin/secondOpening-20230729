import{d as t,x as a,C as s,D as e,r as o,W as l,c as n,o as r,e as i,f as u,j as d,g as p,u as c,a1 as f,$ as x,a as m,b as v,B as _,P as g,bK as y,i as h,h as b,t as w,F,Y as k,af as $,k as j,_ as U}from"./index-5fd89c82.js";import{_ as z}from"./page-meta.e1766212.js";import{_ as D}from"./u-loading.e1adf064.js";import{_ as R}from"./u-image.adbe7f0a.js";import{_ as P}from"./u-button.ea6057e5.js";import{_ as T}from"./page-status.09beba2a.js";import{b as S,_ as C,a as I,d as O}from"./l-painter.bfe68192.js";import{_ as q}from"./u-empty.c5bbad9c.js";import"./u-icon.a1449c4b.js";const N=t({__name:"invite-poster",props:{options:{default:{code:{x:"",y:""},data:{content:"邀请您前来体验",x:"",y:""},default:1,defaultUrl1:"",defaultUrl2:"",posterUrl:"",showData:0}}},emits:["fail","success"],setup(t,{expose:_,emit:g}){const y=t,{getImageUrl:h}=a(),b=s(),{userInfo:w}=e(b),F=o(),k=l({qrcode:"",link:""}),$=n((()=>{const t=null==y?void 0:y.options;return 1==t.default&&1==t.poster?h(t.defaultUrl1):1==t.default&&2==t.poster?h(null==y?void 0:y.options.defaultUrl2):2==t.default?h(t.posterUrl):void 0})),j=()=>{var t;try{console.log("props",y),null==(t=F.value)||t.canvasToTempFilePathSync({fileType:"png",pathType:"base64",quality:1,success:t=>{console.log("生成结果",t),x(),g("success",t.tempFilePath)},fail:t=>{console.log(t),x(),uni.$u.toast("调用海报错误",t)}})}catch(a){x(),uni.$u.toast("调用海报错误")}};return _({drawCanvas:j,initPosterData:async()=>{var t;try{(null==(t=null==w?void 0:w.value)?void 0:t.sn)||await b.getUser();const a=window.origin;k.link=`${a}/mobile/pages/index/index?user_sn=${w.value.sn}`,await f(),await j()}catch(a){}}}),(a,s)=>{const e=m(v("l-painter-qrcode"),S),o=m(v("l-painter-text"),C),l=m(v("l-painter-view"),I),n=m(v("l-painter"),O);return r(),i(n,{ref_key:"painterRef",ref:F,isCanvasToTempFilePath:!1,"after-delay":300,css:`width: 540rpx; background-image: url(${c($)});`,"custom-style":"position: fixed; left: 200%; height: 900rpx;"},{default:u((()=>[d("  主要视图  "),p(l,{css:"\n                position: relative;\n                display: block;\n                box-sizing: border-box;\n                border-radius: 14rpx;\n                width: 100%;\n                height: 900rpx;\n            "},{default:u((()=>{var a,s,l,n,u,c,f,x,m,v;return[d("  H5二维码  "),p(e,{css:`\n                    box-sizing: border-box;\n                    position: absolute;\n                    z-index: 10;\n                    top: ${null==(s=null==(a=t.options)?void 0:a.code)?void 0:s.y}px;\n                    left:${null==(n=null==(l=t.options)?void 0:l.code)?void 0:n.x}px;\n                    width: 200rpx;\n                    height: 200rpx;\n                    padding: 20rpx;\n                    border-radius: 14rpx;\n                    background-color: #FFFFFF;\n                `,text:k.link},null,8,["css","text"]),d("  邀请文案  "),t.options.showData?(r(),i(o,{key:0,text:null==(c=null==(u=t.options)?void 0:u.data)?void 0:c.content,css:`\n                    position: absolute;\n                    z-index: 10;\n                    display: block;\n                    color: #FFFFFF;\n                    font-size: 28rpx;\n                    top: ${null==(x=null==(f=t.options)?void 0:f.data)?void 0:x.y}px;\n                    left:${null==(v=null==(m=t.options)?void 0:m.data)?void 0:v.x}px;\n                `},null,8,["text","css"])):d("v-if",!0)]})),_:1})])),_:1},8,["css"])}}}),A=U(t({__name:"invite_poster",setup(t){const a=s();e(a);const o=_(),n=l({status:g.LOADING,status_text:"服务器请求错误，请稍后再试",poster_params:{code:{x:"",y:""},data:{content:"邀请您前来体验",x:"",y:""},default:1,defaultUrl1:"",defaultUrl2:"",poster:1,posterUrl:"",showData:1},rule_desc:{enabled:1,name:"邀请说明",data:""},poster_url:""}),U=()=>{uni.$u.toast("请长按图片保存")};return y((async()=>{await(async()=>{var t,a;await k({title:"生成中"});try{const s=await $({id:5}),e=JSON.parse(s.data);n.poster_params=(null==(t=e[0])?void 0:t.content)||{},n.rule_desc=(null==(a=e[1])?void 0:a.content)||{},await f(),n.status=g.NORMAL,await o.value.initPosterData()}catch(s){x(),n.status_text=s,n.status=g.ERROR,console.log("获取邀请海报装修失败",s)}})()})),(t,a)=>{const s=m(v("page-meta"),z),e=m(v("u-loading"),D),l=m(v("u-image"),R),f=j,x=m(v("u-button"),P),_=m(v("page-status"),T);return r(),h(F,null,[p(s,{"page-style":t.$theme.pageStyle},null,8,["page-style"]),p(_,{status:n.status},{default:u((()=>{var t;return[p(f,{class:"flex justify-center"},{default:u((()=>[d("  海报  "),p(f,{class:"w-[540rpx] h-[900rpx] bg-white rounded-lg mt-[20rpx]"},{default:u((()=>[p(l,{width:"540",height:"900",src:n.poster_url},{loading:u((()=>[p(e)])),default:u((()=>[p(e,{slot:"loading"})])),_:1},8,["src"])])),_:1})])),_:1}),d("  邀请说明  "),(null==(t=null==n?void 0:n.rule_desc)?void 0:t.enabled)?(r(),i(f,{key:0,class:"bg-white rounded-lg m-[30rpx] p-[20rpx]"},{default:u((()=>[p(f,{class:"font-medium"},{default:u((()=>{var t;return[b(w(null==(t=null==n?void 0:n.rule_desc)?void 0:t.name),1)]})),_:1}),p(f,{class:"mt-[20rpx]"},{default:u((()=>{var t;return[b(w(null==(t=null==n?void 0:n.rule_desc)?void 0:t.data),1)]})),_:1})])),_:1})):d("v-if",!0),d("  保存按钮  "),p(f,{class:"container-bottom bg-white"},{default:u((()=>[p(f,{class:"mx-[30rpx] my-[30rpx]"},{default:u((()=>[p(x,{type:"primary",shape:"circle",size:"default",customStyle:{padding:"0 30rpx",height:"82rpx"},onClick:U},{default:u((()=>[b(" 长按保存图片到相册 ")])),_:1})])),_:1})])),_:1})]})),error:u((()=>[p(q,{"font-size":"28","icon-size":"300",text:n.status_text,src:c("/mobile/assets/error-f2045243.png")},null,8,["text","src"])])),_:1},8,["status"]),p(N,{ref_key:"posterRef",ref:o,options:n.poster_params,onSuccess:a[0]||(a[0]=t=>{n.poster_url=t})},null,8,["options"])],64)}}}),[["__scopeId","data-v-db69a8d3"]]);export{A as default};