import{_ as e,o as t,e as o,n as c,y as l,j as r,k as s}from"./index-5fd89c82.js";const i=e({name:"u-loading",props:{mode:{type:String,default:"circle"},color:{type:String,default:"#c7c7c7"},size:{type:[String,Number],default:"34"},show:{type:Boolean,default:!0}},computed:{cricleStyle(){let e={};return e.width=this.size+"rpx",e.height=this.size+"rpx","circle"==this.mode&&(e.borderColor=`#e4e4e4 #e4e4e4 #e4e4e4 ${this.color?this.color:"#c7c7c7"}`),e}}},[["render",function(e,i,a,n,d,u){const p=s;return a.show?(t(),o(p,{key:0,class:c(["u-loading","circle"==a.mode?"u-loading-circle":"u-loading-flower"]),style:l([u.cricleStyle])},null,8,["class","style"])):r("v-if",!0)}],["__scopeId","data-v-19b245fc"]]);export{i as _};