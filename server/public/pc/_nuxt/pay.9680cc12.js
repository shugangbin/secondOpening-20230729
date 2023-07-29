import{a as L,bB as I,r as _,bc as Q,ak as G}from"./entry.47644ad8.js";/*!
 * qrcode.vue v3.4.0
 * A Vue.js component to generate QRCode.
 * © 2017-2023 @scopewu(https://github.com/scopewu)
 * MIT License.
 */var O=function(){return O=Object.assign||function(h){for(var f,u=1,c=arguments.length;u<c;u++){f=arguments[u];for(var v in f)Object.prototype.hasOwnProperty.call(f,v)&&(h[v]=f[v])}return h},O.apply(this,arguments)},A;(function(s){var h=function(){function n(e,r,t,a){if(this.version=e,this.errorCorrectionLevel=r,this.modules=[],this.isFunction=[],e<n.MIN_VERSION||e>n.MAX_VERSION)throw new RangeError("Version value out of range");if(a<-1||a>7)throw new RangeError("Mask value out of range");this.size=e*4+17;for(var o=[],i=0;i<this.size;i++)o.push(!1);for(var i=0;i<this.size;i++)this.modules.push(o.slice()),this.isFunction.push(o.slice());this.drawFunctionPatterns();var l=this.addEccAndInterleave(t);if(this.drawCodewords(l),a==-1)for(var d=1e9,i=0;i<8;i++){this.applyMask(i),this.drawFormatBits(i);var m=this.getPenaltyScore();m<d&&(a=i,d=m),this.applyMask(i)}c(0<=a&&a<=7),this.mask=a,this.applyMask(a),this.drawFormatBits(a),this.isFunction=[]}return n.encodeText=function(e,r){var t=s.QrSegment.makeSegments(e);return n.encodeSegments(t,r)},n.encodeBinary=function(e,r){var t=s.QrSegment.makeBytes(e);return n.encodeSegments([t],r)},n.encodeSegments=function(e,r,t,a,o,i){if(t===void 0&&(t=1),a===void 0&&(a=40),o===void 0&&(o=-1),i===void 0&&(i=!0),!(n.MIN_VERSION<=t&&t<=a&&a<=n.MAX_VERSION)||o<-1||o>7)throw new RangeError("Invalid value");var l,d;for(l=t;;l++){var m=n.getNumDataCodewords(l,r)*8,C=v.getTotalBits(e,l);if(C<=m){d=C;break}if(l>=a)throw new RangeError("Data too long")}for(var E=0,p=[n.Ecc.MEDIUM,n.Ecc.QUARTILE,n.Ecc.HIGH];E<p.length;E++){var M=p[E];i&&d<=n.getNumDataCodewords(l,M)*8&&(r=M)}for(var g=[],w=0,N=e;w<N.length;w++){var R=N[w];f(R.mode.modeBits,4,g),f(R.numChars,R.mode.numCharCountBits(l),g);for(var S=0,z=R.getData();S<z.length;S++){var Y=z[S];g.push(Y)}}c(g.length==d);var B=n.getNumDataCodewords(l,r)*8;c(g.length<=B),f(0,Math.min(4,B-g.length),g),f(0,(8-g.length%8)%8,g),c(g.length%8==0);for(var D=236;g.length<B;D^=253)f(D,8,g);for(var b=[];b.length*8<g.length;)b.push(0);return g.forEach(function($,F){return b[F>>>3]|=$<<7-(F&7)}),new n(l,r,b,o)},n.prototype.getModule=function(e,r){return 0<=e&&e<this.size&&0<=r&&r<this.size&&this.modules[r][e]},n.prototype.getModules=function(){return this.modules},n.prototype.drawFunctionPatterns=function(){for(var e=0;e<this.size;e++)this.setFunctionModule(6,e,e%2==0),this.setFunctionModule(e,6,e%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);for(var r=this.getAlignmentPatternPositions(),t=r.length,e=0;e<t;e++)for(var a=0;a<t;a++)e==0&&a==0||e==0&&a==t-1||e==t-1&&a==0||this.drawAlignmentPattern(r[e],r[a]);this.drawFormatBits(0),this.drawVersion()},n.prototype.drawFormatBits=function(e){for(var r=this.errorCorrectionLevel.formatBits<<3|e,t=r,a=0;a<10;a++)t=t<<1^(t>>>9)*1335;var o=(r<<10|t)^21522;c(o>>>15==0);for(var a=0;a<=5;a++)this.setFunctionModule(8,a,u(o,a));this.setFunctionModule(8,7,u(o,6)),this.setFunctionModule(8,8,u(o,7)),this.setFunctionModule(7,8,u(o,8));for(var a=9;a<15;a++)this.setFunctionModule(14-a,8,u(o,a));for(var a=0;a<8;a++)this.setFunctionModule(this.size-1-a,8,u(o,a));for(var a=8;a<15;a++)this.setFunctionModule(8,this.size-15+a,u(o,a));this.setFunctionModule(8,this.size-8,!0)},n.prototype.drawVersion=function(){if(!(this.version<7)){for(var e=this.version,r=0;r<12;r++)e=e<<1^(e>>>11)*7973;var t=this.version<<12|e;c(t>>>18==0);for(var r=0;r<18;r++){var a=u(t,r),o=this.size-11+r%3,i=Math.floor(r/3);this.setFunctionModule(o,i,a),this.setFunctionModule(i,o,a)}}},n.prototype.drawFinderPattern=function(e,r){for(var t=-4;t<=4;t++)for(var a=-4;a<=4;a++){var o=Math.max(Math.abs(a),Math.abs(t)),i=e+a,l=r+t;0<=i&&i<this.size&&0<=l&&l<this.size&&this.setFunctionModule(i,l,o!=2&&o!=4)}},n.prototype.drawAlignmentPattern=function(e,r){for(var t=-2;t<=2;t++)for(var a=-2;a<=2;a++)this.setFunctionModule(e+a,r+t,Math.max(Math.abs(a),Math.abs(t))!=1)},n.prototype.setFunctionModule=function(e,r,t){this.modules[r][e]=t,this.isFunction[r][e]=!0},n.prototype.addEccAndInterleave=function(e){var r=this.version,t=this.errorCorrectionLevel;if(e.length!=n.getNumDataCodewords(r,t))throw new RangeError("Invalid argument");for(var a=n.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][r],o=n.ECC_CODEWORDS_PER_BLOCK[t.ordinal][r],i=Math.floor(n.getNumRawDataModules(r)/8),l=a-i%a,d=Math.floor(i/a),m=[],C=n.reedSolomonComputeDivisor(o),E=0,p=0;E<a;E++){var M=e.slice(p,p+d-o+(E<l?0:1));p+=M.length;var g=n.reedSolomonComputeRemainder(M,C);E<l&&M.push(0),m.push(M.concat(g))}for(var w=[],N=function(R){m.forEach(function(S,z){(R!=d-o||z>=l)&&w.push(S[R])})},E=0;E<m[0].length;E++)N(E);return c(w.length==i),w},n.prototype.drawCodewords=function(e){if(e.length!=Math.floor(n.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");for(var r=0,t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(var a=0;a<this.size;a++)for(var o=0;o<2;o++){var i=t-o,l=(t+1&2)==0,d=l?this.size-1-a:a;!this.isFunction[d][i]&&r<e.length*8&&(this.modules[d][i]=u(e[r>>>3],7-(r&7)),r++)}}c(r==e.length*8)},n.prototype.applyMask=function(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(var r=0;r<this.size;r++)for(var t=0;t<this.size;t++){var a=void 0;switch(e){case 0:a=(t+r)%2==0;break;case 1:a=r%2==0;break;case 2:a=t%3==0;break;case 3:a=(t+r)%3==0;break;case 4:a=(Math.floor(t/3)+Math.floor(r/2))%2==0;break;case 5:a=t*r%2+t*r%3==0;break;case 6:a=(t*r%2+t*r%3)%2==0;break;case 7:a=((t+r)%2+t*r%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[r][t]&&a&&(this.modules[r][t]=!this.modules[r][t])}},n.prototype.getPenaltyScore=function(){for(var e=0,r=0;r<this.size;r++){for(var t=!1,a=0,o=[0,0,0,0,0,0,0],i=0;i<this.size;i++)this.modules[r][i]==t?(a++,a==5?e+=n.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,o),t||(e+=this.finderPenaltyCountPatterns(o)*n.PENALTY_N3),t=this.modules[r][i],a=1);e+=this.finderPenaltyTerminateAndCount(t,a,o)*n.PENALTY_N3}for(var i=0;i<this.size;i++){for(var t=!1,l=0,o=[0,0,0,0,0,0,0],r=0;r<this.size;r++)this.modules[r][i]==t?(l++,l==5?e+=n.PENALTY_N1:l>5&&e++):(this.finderPenaltyAddHistory(l,o),t||(e+=this.finderPenaltyCountPatterns(o)*n.PENALTY_N3),t=this.modules[r][i],l=1);e+=this.finderPenaltyTerminateAndCount(t,l,o)*n.PENALTY_N3}for(var r=0;r<this.size-1;r++)for(var i=0;i<this.size-1;i++){var d=this.modules[r][i];d==this.modules[r][i+1]&&d==this.modules[r+1][i]&&d==this.modules[r+1][i+1]&&(e+=n.PENALTY_N2)}for(var m=0,C=0,E=this.modules;C<E.length;C++){var p=E[C];m=p.reduce(function(w,N){return w+(N?1:0)},m)}var M=this.size*this.size,g=Math.ceil(Math.abs(m*20-M*10)/M)-1;return c(0<=g&&g<=9),e+=g*n.PENALTY_N4,c(0<=e&&e<=2568888),e},n.prototype.getAlignmentPatternPositions=function(){if(this.version==1)return[];for(var e=Math.floor(this.version/7)+2,r=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2,t=[6],a=this.size-7;t.length<e;a-=r)t.splice(1,0,a);return t},n.getNumRawDataModules=function(e){if(e<n.MIN_VERSION||e>n.MAX_VERSION)throw new RangeError("Version number out of range");var r=(16*e+128)*e+64;if(e>=2){var t=Math.floor(e/7)+2;r-=(25*t-10)*t-55,e>=7&&(r-=36)}return c(208<=r&&r<=29648),r},n.getNumDataCodewords=function(e,r){return Math.floor(n.getNumRawDataModules(e)/8)-n.ECC_CODEWORDS_PER_BLOCK[r.ordinal][e]*n.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][e]},n.reedSolomonComputeDivisor=function(e){if(e<1||e>255)throw new RangeError("Degree out of range");for(var r=[],t=0;t<e-1;t++)r.push(0);r.push(1);for(var a=1,t=0;t<e;t++){for(var o=0;o<r.length;o++)r[o]=n.reedSolomonMultiply(r[o],a),o+1<r.length&&(r[o]^=r[o+1]);a=n.reedSolomonMultiply(a,2)}return r},n.reedSolomonComputeRemainder=function(e,r){for(var t=r.map(function(d){return 0}),a=function(d){var m=d^t.shift();t.push(0),r.forEach(function(C,E){return t[E]^=n.reedSolomonMultiply(C,m)})},o=0,i=e;o<i.length;o++){var l=i[o];a(l)}return t},n.reedSolomonMultiply=function(e,r){if(e>>>8||r>>>8)throw new RangeError("Byte out of range");for(var t=0,a=7;a>=0;a--)t=t<<1^(t>>>7)*285,t^=(r>>>a&1)*e;return c(t>>>8==0),t},n.prototype.finderPenaltyCountPatterns=function(e){var r=e[1];c(r<=this.size*3);var t=r>0&&e[2]==r&&e[3]==r*3&&e[4]==r&&e[5]==r;return(t&&e[0]>=r*4&&e[6]>=r?1:0)+(t&&e[6]>=r*4&&e[0]>=r?1:0)},n.prototype.finderPenaltyTerminateAndCount=function(e,r,t){return e&&(this.finderPenaltyAddHistory(r,t),r=0),r+=this.size,this.finderPenaltyAddHistory(r,t),this.finderPenaltyCountPatterns(t)},n.prototype.finderPenaltyAddHistory=function(e,r){r[0]==0&&(e+=this.size),r.pop(),r.unshift(e)},n.MIN_VERSION=1,n.MAX_VERSION=40,n.PENALTY_N1=3,n.PENALTY_N2=3,n.PENALTY_N3=40,n.PENALTY_N4=10,n.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],n.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],n}();s.QrCode=h;function f(n,e,r){if(e<0||e>31||n>>>e)throw new RangeError("Value out of range");for(var t=e-1;t>=0;t--)r.push(n>>>t&1)}function u(n,e){return(n>>>e&1)!=0}function c(n){if(!n)throw new Error("Assertion error")}var v=function(){function n(e,r,t){if(this.mode=e,this.numChars=r,this.bitData=t,r<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}return n.makeBytes=function(e){for(var r=[],t=0,a=e;t<a.length;t++){var o=a[t];f(o,8,r)}return new n(n.Mode.BYTE,e.length,r)},n.makeNumeric=function(e){if(!n.isNumeric(e))throw new RangeError("String contains non-numeric characters");for(var r=[],t=0;t<e.length;){var a=Math.min(e.length-t,3);f(parseInt(e.substring(t,t+a),10),a*3+1,r),t+=a}return new n(n.Mode.NUMERIC,e.length,r)},n.makeAlphanumeric=function(e){if(!n.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");var r=[],t;for(t=0;t+2<=e.length;t+=2){var a=n.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;a+=n.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),f(a,11,r)}return t<e.length&&f(n.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,r),new n(n.Mode.ALPHANUMERIC,e.length,r)},n.makeSegments=function(e){return e==""?[]:n.isNumeric(e)?[n.makeNumeric(e)]:n.isAlphanumeric(e)?[n.makeAlphanumeric(e)]:[n.makeBytes(n.toUtf8ByteArray(e))]},n.makeEci=function(e){var r=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)f(e,8,r);else if(e<16384)f(2,2,r),f(e,14,r);else if(e<1e6)f(6,3,r),f(e,21,r);else throw new RangeError("ECI assignment value out of range");return new n(n.Mode.ECI,0,r)},n.isNumeric=function(e){return n.NUMERIC_REGEX.test(e)},n.isAlphanumeric=function(e){return n.ALPHANUMERIC_REGEX.test(e)},n.prototype.getData=function(){return this.bitData.slice()},n.getTotalBits=function(e,r){for(var t=0,a=0,o=e;a<o.length;a++){var i=o[a],l=i.mode.numCharCountBits(r);if(i.numChars>=1<<l)return 1/0;t+=4+l+i.bitData.length}return t},n.toUtf8ByteArray=function(e){e=encodeURI(e);for(var r=[],t=0;t<e.length;t++)e.charAt(t)!="%"?r.push(e.charCodeAt(t)):(r.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return r},n.NUMERIC_REGEX=/^[0-9]*$/,n.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,n.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",n}();s.QrSegment=v})(A||(A={}));(function(s){(function(h){var f=function(){function u(c,v){this.ordinal=c,this.formatBits=v}return u.LOW=new u(0,1),u.MEDIUM=new u(1,0),u.QUARTILE=new u(2,3),u.HIGH=new u(3,2),u}();h.Ecc=f})(s.QrCode||(s.QrCode={}))})(A||(A={}));(function(s){(function(h){var f=function(){function u(c,v){this.modeBits=c,this.numBitsCharCount=v}return u.prototype.numCharCountBits=function(c){return this.numBitsCharCount[Math.floor((c+7)/17)]},u.NUMERIC=new u(1,[10,12,14]),u.ALPHANUMERIC=new u(2,[9,11,13]),u.BYTE=new u(4,[8,16,16]),u.KANJI=new u(8,[8,10,12]),u.ECI=new u(7,[0,0,0]),u}();h.Mode=f})(s.QrSegment||(s.QrSegment={}))})(A||(A={}));var P=A,U="H",T={L:P.QrCode.Ecc.LOW,M:P.QrCode.Ecc.MEDIUM,Q:P.QrCode.Ecc.QUARTILE,H:P.QrCode.Ecc.HIGH},K=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}();function k(s){return s in T}function H(s,h){h===void 0&&(h=0);var f=[];return s.forEach(function(u,c){var v=null;u.forEach(function(n,e){if(!n&&v!==null){f.push("M".concat(v+h," ").concat(c+h,"h").concat(e-v,"v1H").concat(v+h,"z")),v=null;return}if(e===u.length-1){if(!n)return;v===null?f.push("M".concat(e+h,",").concat(c+h," h1v1H").concat(e+h,"z")):f.push("M".concat(v+h,",").concat(c+h," h").concat(e+1-v,"v1H").concat(v+h,"z"));return}n&&v===null&&(v=e)})}),f.join("")}var y={value:{type:String,required:!0,default:""},size:{type:Number,default:100},level:{type:String,default:U,validator:function(s){return k(s)}},background:{type:String,default:"#fff"},foreground:{type:String,default:"#000"},margin:{type:Number,required:!1,default:0}},W=O(O({},y),{renderAs:{type:String,required:!1,default:"canvas",validator:function(s){return["canvas","svg"].indexOf(s)>-1}}}),q=L({name:"QRCodeSvg",props:y,setup:function(s){var h=_(0),f=_(""),u=function(){var c=s.value,v=s.level,n=s.margin,e=P.QrCode.encodeText(c,T[v]).getModules();h.value=e.length+n*2,f.value=H(e,n)};return u(),Q(u),function(){return I("svg",{width:s.size,height:s.size,"shape-rendering":"crispEdges",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(h.value," ").concat(h.value)},[I("path",{fill:s.background,d:"M0,0 h".concat(h.value,"v").concat(h.value,"H0z")}),I("path",{fill:s.foreground,d:f.value})])}}}),X=L({name:"QRCodeCanvas",props:y,setup:function(s){var h=_(null),f=function(){var u=s.value,c=s.level,v=s.size,n=s.margin,e=s.background,r=s.foreground,t=h.value;if(t){var a=t.getContext("2d");if(a){var o=P.QrCode.encodeText(u,T[c]).getModules(),i=o.length+n*2,l=window.devicePixelRatio||1,d=v/i*l;t.height=t.width=v*l,a.scale(d,d),a.fillStyle=e,a.fillRect(0,0,i,i),a.fillStyle=r,K?a.fill(new Path2D(H(o,n))):o.forEach(function(m,C){m.forEach(function(E,p){E&&a.fillRect(p+n,C+n,1,1)})})}}};return G(f),Q(f),function(){return I("canvas",{ref:h,style:{width:"".concat(s.size,"px"),height:"".concat(s.size,"px")}})}}}),V=L({name:"Qrcode",render:function(){var s=this.$props,h=s.renderAs,f=s.value,u=s.size,c=s.margin,v=s.level,n=s.background,e=s.foreground,r=u>>>0,t=c>>>0,a=k(v)?v:U;return I(h==="svg"?q:X,{value:f,size:r,margin:t,level:a,background:n,foreground:e})},props:W});function Z(s){return $request.get({url:"/pay/payWay",params:s})}function j(s){return $request.post({url:"/recharge/recharge",params:s})}function x(s){return $request.post({url:"/member/buy",params:s})}function ee(s){return $request.post({url:"/pay/prepay",params:s})}function re(s){return $request.get({url:"/pay/payStatus",params:s})}export{re as O,V as Q,j as a,Z as g,x as m,ee as p};
