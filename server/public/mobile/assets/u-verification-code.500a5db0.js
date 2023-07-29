import{_ as e,aV as t,aW as s,aX as i,o as n,e as a,f as h,j as r,k as u}from"./index-5fd89c82.js";const c=e({name:"u-verification-code",emits:["start","end","change"],props:{seconds:{type:[String,Number],default:60},startText:{type:String,default:"获取验证码"},changeText:{type:String,default:"X秒重新获取"},endText:{type:String,default:"重新获取"},keepRunning:{type:Boolean,default:!1},uniqueKey:{type:String,default:""}},data(){return{secNum:this.seconds,timer:null,canGetCode:!0}},mounted(){this.checkKeepRunning()},watch:{seconds:{immediate:!0,handler(e){this.secNum=e}}},methods:{checkKeepRunning(){let e=Number(t(this.uniqueKey+"_$uCountDownTimestamp"));if(!e)return this.changeEvent(this.startText);let i=Math.floor(+new Date/1e3);this.keepRunning&&e&&e>i?(this.secNum=e-i,s(this.uniqueKey+"_$uCountDownTimestamp"),this.start()):this.changeEvent(this.startText)},start(){this.timer&&(clearInterval(this.timer),this.timer=null),this.$emit("start"),this.canGetCode=!1,this.changeEvent(this.changeText.replace(/x|X/,this.secNum)),this.setTimeToStorage(),this.timer=setInterval((()=>{--this.secNum?this.changeEvent(this.changeText.replace(/x|X/,this.secNum)):(clearInterval(this.timer),this.timer=null,this.changeEvent(this.endText),this.secNum=this.seconds,this.$emit("end"),this.canGetCode=!0)}),1e3)},reset(){this.canGetCode=!0,clearInterval(this.timer),this.secNum=this.seconds,this.changeEvent(this.endText)},changeEvent(e){this.$emit("change",e)},setTimeToStorage(){if(this.keepRunning&&this.timer&&this.secNum>0&&this.secNum<=this.seconds){let e=Math.floor(+new Date/1e3);i({key:this.uniqueKey+"_$uCountDownTimestamp",data:e+Number(this.secNum)})}}},beforeUnmount(){this.setTimeToStorage(),clearTimeout(this.timer),this.timer=null}},[["render",function(e,t,s,i,c,m){const o=u;return n(),a(o,{class:"u-code-wrap"},{default:h((()=>[r(" 此组件功能由js完成，无需写html逻辑 ")])),_:1})}],["__scopeId","data-v-b966d4e1"]]);export{c as _};
