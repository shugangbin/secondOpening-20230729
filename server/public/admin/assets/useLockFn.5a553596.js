import{r as n}from"./@vue.581f5ce0.js";function c(t){const e=n(!1);return{isLock:e,lockFn:async(...a)=>{if(!e.value){e.value=!0;try{const r=await t(...a);return e.value=!1,r}catch(r){throw e.value=!1,r}}}}}export{c as u};
