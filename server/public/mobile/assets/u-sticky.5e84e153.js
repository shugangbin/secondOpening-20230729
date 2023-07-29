import{_ as t,aB as e,c5 as s,o as i,e as n,f as o,g as h,n as r,y as d,T as a,k as c}from"./index-5fd89c82.js";const f=t({name:"u-sticky",emits:["fixed","unfixed"],props:{offsetTop:{type:[Number,String],default:0},index:{type:[Number,String],default:""},enable:{type:Boolean,default:!0},h5NavHeight:{type:[Number,String],default:44},bgColor:{type:String,default:"#ffffff"},zIndex:{type:[Number,String],default:""}},data(){return{fixed:!1,height:"auto",stickyTop:0,elClass:this.$u.guid(),left:0,width:"auto"}},watch:{offsetTop(t){this.initObserver()},enable(t){0==t?(this.fixed=!1,this.disconnectObserver("contentObserver")):this.initObserver()}},computed:{uZIndex(){return this.zIndex?this.zIndex:this.$u.zIndex.sticky}},mounted(){this.$nextTick((()=>{this.initObserver()}))},methods:{initObserver(){this.enable&&(this.stickyTop=0!=this.offsetTop?e(this.offsetTop)+this.h5NavHeight:this.h5NavHeight,this.disconnectObserver("contentObserver"),this.$uGetRect("."+this.elClass).then((t=>{this.height=t.height,this.left=t.left,this.width=t.width||"100%",this.$nextTick((()=>{this.observeContent()}))})))},observeContent(){this.disconnectObserver("contentObserver");const t=s(this,{thresholds:[.95,.98,1]});t.relativeToViewport({top:-this.stickyTop}),t.observe("."+this.elClass,(t=>{this.enable&&this.setFixed(t.boundingClientRect.top)})),this.contentObserver=t},setFixed(t){const e=t<this.stickyTop;e?this.$emit("fixed",this.index):this.fixed&&this.$emit("unfixed",this.index),this.fixed=e},disconnectObserver(t){const e=this[t];e&&e.disconnect()}},beforeUnmount(){this.disconnectObserver("contentObserver")}},[["render",function(t,e,s,f,l,u){const p=c;return i(),n(p,{class:""},{default:o((()=>[h(p,{class:r(["u-sticky-wrap",[l.elClass]]),style:d({height:l.fixed?l.height+"px":"auto",backgroundColor:s.bgColor})},{default:o((()=>[h(p,{class:"u-sticky",style:d({position:l.fixed?"fixed":"static",top:l.stickyTop+"px",left:l.left+"px",width:"string"==typeof l.width?l.width:l.width+"px",zIndex:u.uZIndex})},{default:o((()=>[a(t.$slots,"default",{},void 0,!0)])),_:3},8,["style"])])),_:3},8,["class","style"])])),_:3})}],["__scopeId","data-v-c0ceaa32"]]);export{f as _};
