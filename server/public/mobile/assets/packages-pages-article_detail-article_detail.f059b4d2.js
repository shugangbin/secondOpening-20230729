import{d as t,W as a,M as s,o as e,e as l,f as r,j as c,g as d,h as i,t as o,ab as f,k as n,A as u,K as m,a as x,b as p,_}from"./index-5fd89c82.js";import{_ as h}from"./u-parse.ad11c7e7.js";import{_ as w,b}from"./icon_visit.a0cbdafb.js";const y=_(t({__name:"article_detail",setup(t){const _=a({id:""});return s((({id:t})=>{_.id=t;try{if(!_.id)throw new Error("请传入商城咨询ID");(async()=>{try{const t=await b({id:_.id});Reflect.ownKeys(t).map((a=>{_[a]=t[a]})),f({title:_.title})}catch(t){console.log("文章详情错误",t)}})()}catch(a){console.log("商品详情报错",a)}})),(t,a)=>{const s=n,f=u,b=m,y=x(p("u-parse"),h);return e(),l(s,{class:"bg-white news-detail"},{default:r((()=>[c(" 标题信息 "),d(s,{class:"news-detail-header py-[20rpx] px-[30rpx]"},{default:r((()=>[d(s,{class:"text-3xl font-medium"},{default:r((()=>[i(o(_.title),1)])),_:1}),d(s,{class:"flex mt-[20rpx] text-xs"},{default:r((()=>[_.author?(e(),l(s,{key:0,class:"mr-[40rpx]"},{default:r((()=>[i("作者: "+o(_.author),1)])),_:1})):c("v-if",!0),d(s,{class:"text-muted mr-[40rpx] flex-1"},{default:r((()=>[i(o(_.create_time),1)])),_:1}),d(s,{class:"flex items-center flex-none text-muted"},{default:r((()=>[d(f,{src:w,class:"w-[30rpx] h-[30rpx]"}),d(s,{class:"ml-[10rpx]"},{default:r((()=>[i(o(_.click),1)])),_:1})])),_:1})])),_:1})])),_:1}),c(" 咨询内容 "),d(s,{class:"news-detail-section bg-white p-[24rpx]"},{default:r((()=>[c(" 摘要 "),_.abstract?(e(),l(s,{key:0,class:"summary p-[20rpx] text-base"},{default:r((()=>[d(b,{class:"font-medium"},{default:r((()=>[i("摘要: ")])),_:1}),i(" "+o(_.abstract),1)])),_:1})):c("v-if",!0),c(" 内容 "),d(s,{class:"mt-[20rpx]"},{default:r((()=>[d(y,{html:_.content},null,8,["html"])])),_:1})])),_:1})])),_:1})}}}),[["__scopeId","data-v-a959d5e6"]]);export{y as default};
