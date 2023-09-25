import{d as Q,h as f,c as I,a$ as $e,a0 as Se,z as B,aJ as Be,a5 as ke,a as b,b0 as Te,O,b1 as oe,K as Pe,W as g,Y as l,aR as J,Z as Re,b as re,S as Ee,L as He,e as R,u as Ie,b2 as Oe,b3 as Fe,b4 as r,b5 as E,f as je,b6 as Z,b7 as ee,R as De,b8 as Ne,U as _e,b9 as Ke,a6 as Me}from"./index-3141604a.js";import{u as Ge}from"./use-form-item-7ba2c55f.js";const eo=Q({name:"Eye",render(){return f("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},f("path",{d:"M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}),f("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"}))}}),We=I("base-wave",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),Ve=Q({name:"BaseWave",props:{clsPrefix:{type:String,required:!0}},setup(e){$e("-base-wave",We,Se(e,"clsPrefix"));const h=B(null),v=B(!1);let u=null;return Be(()=>{u!==null&&window.clearTimeout(u)}),{active:v,selfRef:h,play(){u!==null&&(window.clearTimeout(u),v.value=!1,u=null),ke(()=>{var p;(p=h.value)===null||p===void 0||p.offsetHeight,v.value=!0,u=window.setTimeout(()=>{v.value=!1,u=null},1e3)})}}},render(){const{clsPrefix:e}=this;return f("div",{ref:"selfRef","aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}}),{cubicBezierEaseInOut:C}=Te;function qe({duration:e=".2s",delay:h=".1s"}={}){return[b("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to",{opacity:1}),b("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from",`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),b("&.fade-in-width-expand-transition-leave-active",`
 overflow: hidden;
 transition:
 opacity ${e} ${C},
 max-width ${e} ${C} ${h},
 margin-left ${e} ${C} ${h},
 margin-right ${e} ${C} ${h};
 `),b("&.fade-in-width-expand-transition-enter-active",`
 overflow: hidden;
 transition:
 opacity ${e} ${C} ${h},
 max-width ${e} ${C},
 margin-left ${e} ${C},
 margin-right ${e} ${C};
 `)]}const Qe=O&&"chrome"in window;O&&navigator.userAgent.includes("Firefox");const Ae=O&&navigator.userAgent.includes("Safari")&&!Qe;function $(e){return oe(e,[255,255,255,.16])}function H(e){return oe(e,[0,0,0,.12])}const Le=Pe("n-button-group"),Ye=b([I("button",`
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[g("color",[l("border",{borderColor:"var(--n-border-color)"}),g("disabled",[l("border",{borderColor:"var(--n-border-color-disabled)"})]),J("disabled",[b("&:focus",[l("state-border",{borderColor:"var(--n-border-color-focus)"})]),b("&:hover",[l("state-border",{borderColor:"var(--n-border-color-hover)"})]),b("&:active",[l("state-border",{borderColor:"var(--n-border-color-pressed)"})]),g("pressed",[l("state-border",{borderColor:"var(--n-border-color-pressed)"})])])]),g("disabled",{backgroundColor:"var(--n-color-disabled)",color:"var(--n-text-color-disabled)"},[l("border",{border:"var(--n-border-disabled)"})]),J("disabled",[b("&:focus",{backgroundColor:"var(--n-color-focus)",color:"var(--n-text-color-focus)"},[l("state-border",{border:"var(--n-border-focus)"})]),b("&:hover",{backgroundColor:"var(--n-color-hover)",color:"var(--n-text-color-hover)"},[l("state-border",{border:"var(--n-border-hover)"})]),b("&:active",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[l("state-border",{border:"var(--n-border-pressed)"})]),g("pressed",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[l("state-border",{border:"var(--n-border-pressed)"})])]),g("loading","cursor: wait;"),I("base-wave",`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[g("active",{zIndex:1,animationName:"button-wave-spread, button-wave-opacity"})]),O&&"MozBoxSizing"in document.createElement("div").style?b("&::moz-focus-inner",{border:0}):null,l("border, state-border",`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),l("border",{border:"var(--n-border)"}),l("state-border",{border:"var(--n-border)",borderColor:"#0000",zIndex:1}),l("icon",`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[I("icon-slot",`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[Re({top:"50%",originalTransform:"translateY(-50%)"})]),qe()]),l("content",`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[b("~",[l("icon",{margin:"var(--n-icon-margin)",marginRight:0})])]),g("block",`
 display: flex;
 width: 100%;
 `),g("dashed",[l("border, state-border",{borderStyle:"dashed !important"})]),g("disabled",{cursor:"not-allowed",opacity:"var(--n-opacity-disabled)"})]),b("@keyframes button-wave-spread",{from:{boxShadow:"0 0 0.5px 0 var(--n-ripple-color)"},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)"}}),b("@keyframes button-wave-opacity",{from:{opacity:"var(--n-wave-opacity)"},to:{opacity:0}})]),Ue=Object.assign(Object.assign({},re.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:"button"},type:{type:String,default:"default"},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:"left"},attrType:{type:String,default:"button"},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!Ae}}),Xe=Q({name:"Button",props:Ue,setup(e){const h=B(null),v=B(null),u=B(!1),p=Ee(()=>!e.quaternary&&!e.tertiary&&!e.secondary&&!e.text&&(!e.color||e.ghost||e.dashed)&&e.bordered),te=He(Le,{}),{mergedSizeRef:F}=Ge({},{defaultSize:"medium",mergedSize:t=>{const{size:d}=e;if(d)return d;const{size:m}=te;if(m)return m;const{mergedSize:o}=t||{};return o?o.value:"medium"}}),j=R(()=>e.focusable&&!e.disabled),ne=t=>{var d;j.value||t.preventDefault(),!e.nativeFocusBehavior&&(t.preventDefault(),!e.disabled&&j.value&&((d=h.value)===null||d===void 0||d.focus({preventScroll:!0})))},ie=t=>{var d;if(!e.disabled&&!e.loading){const{onClick:m}=e;m&&Me(m,t),e.text||(d=v.value)===null||d===void 0||d.play()}},ae=t=>{switch(t.key){case"Enter":if(!e.keyboard)return;u.value=!1}},se=t=>{switch(t.key){case"Enter":if(!e.keyboard||e.loading){t.preventDefault();return}u.value=!0}},le=()=>{u.value=!1},{inlineThemeDisabled:A,mergedClsPrefixRef:D,mergedRtlRef:de}=Ie(e),ce=re("Button","-button",Ye,Oe,e,D),ue=Fe("Button",de,D),L=R(()=>{const t=ce.value,{common:{cubicBezierEaseInOut:d,cubicBezierEaseOut:m},self:o}=t,{rippleDuration:N,opacityDisabled:k,fontWeight:_,fontWeightStrong:K}=o,x=F.value,{dashed:M,type:w,ghost:G,text:y,color:i,round:Y,circle:W,textColor:z,secondary:be,tertiary:U,quaternary:fe,strong:he}=e,ve={"font-weight":he?K:_};let a={"--n-color":"initial","--n-color-hover":"initial","--n-color-pressed":"initial","--n-color-focus":"initial","--n-color-disabled":"initial","--n-ripple-color":"initial","--n-text-color":"initial","--n-text-color-hover":"initial","--n-text-color-pressed":"initial","--n-text-color-focus":"initial","--n-text-color-disabled":"initial"};const T=w==="tertiary",X=w==="default",n=T?"default":w;if(y){const s=z||i;a={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":"#0000","--n-text-color":s||o[r("textColorText",n)],"--n-text-color-hover":s?$(s):o[r("textColorTextHover",n)],"--n-text-color-pressed":s?H(s):o[r("textColorTextPressed",n)],"--n-text-color-focus":s?$(s):o[r("textColorTextHover",n)],"--n-text-color-disabled":s||o[r("textColorTextDisabled",n)]}}else if(G||M){const s=z||i;a={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":i||o[r("rippleColor",n)],"--n-text-color":s||o[r("textColorGhost",n)],"--n-text-color-hover":s?$(s):o[r("textColorGhostHover",n)],"--n-text-color-pressed":s?H(s):o[r("textColorGhostPressed",n)],"--n-text-color-focus":s?$(s):o[r("textColorGhostHover",n)],"--n-text-color-disabled":s||o[r("textColorGhostDisabled",n)]}}else if(be){const s=X?o.textColor:T?o.textColorTertiary:o[r("color",n)],c=i||s,P=w!=="default"&&w!=="tertiary";a={"--n-color":P?E(c,{alpha:Number(o.colorOpacitySecondary)}):o.colorSecondary,"--n-color-hover":P?E(c,{alpha:Number(o.colorOpacitySecondaryHover)}):o.colorSecondaryHover,"--n-color-pressed":P?E(c,{alpha:Number(o.colorOpacitySecondaryPressed)}):o.colorSecondaryPressed,"--n-color-focus":P?E(c,{alpha:Number(o.colorOpacitySecondaryHover)}):o.colorSecondaryHover,"--n-color-disabled":o.colorSecondary,"--n-ripple-color":"#0000","--n-text-color":c,"--n-text-color-hover":c,"--n-text-color-pressed":c,"--n-text-color-focus":c,"--n-text-color-disabled":c}}else if(U||fe){const s=X?o.textColor:T?o.textColorTertiary:o[r("color",n)],c=i||s;U?(a["--n-color"]=o.colorTertiary,a["--n-color-hover"]=o.colorTertiaryHover,a["--n-color-pressed"]=o.colorTertiaryPressed,a["--n-color-focus"]=o.colorSecondaryHover,a["--n-color-disabled"]=o.colorTertiary):(a["--n-color"]=o.colorQuaternary,a["--n-color-hover"]=o.colorQuaternaryHover,a["--n-color-pressed"]=o.colorQuaternaryPressed,a["--n-color-focus"]=o.colorQuaternaryHover,a["--n-color-disabled"]=o.colorQuaternary),a["--n-ripple-color"]="#0000",a["--n-text-color"]=c,a["--n-text-color-hover"]=c,a["--n-text-color-pressed"]=c,a["--n-text-color-focus"]=c,a["--n-text-color-disabled"]=c}else a={"--n-color":i||o[r("color",n)],"--n-color-hover":i?$(i):o[r("colorHover",n)],"--n-color-pressed":i?H(i):o[r("colorPressed",n)],"--n-color-focus":i?$(i):o[r("colorFocus",n)],"--n-color-disabled":i||o[r("colorDisabled",n)],"--n-ripple-color":i||o[r("rippleColor",n)],"--n-text-color":z||(i?o.textColorPrimary:T?o.textColorTertiary:o[r("textColor",n)]),"--n-text-color-hover":z||(i?o.textColorHoverPrimary:o[r("textColorHover",n)]),"--n-text-color-pressed":z||(i?o.textColorPressedPrimary:o[r("textColorPressed",n)]),"--n-text-color-focus":z||(i?o.textColorFocusPrimary:o[r("textColorFocus",n)]),"--n-text-color-disabled":z||(i?o.textColorDisabledPrimary:o[r("textColorDisabled",n)])};let V={"--n-border":"initial","--n-border-hover":"initial","--n-border-pressed":"initial","--n-border-focus":"initial","--n-border-disabled":"initial"};y?V={"--n-border":"none","--n-border-hover":"none","--n-border-pressed":"none","--n-border-focus":"none","--n-border-disabled":"none"}:V={"--n-border":o[r("border",n)],"--n-border-hover":o[r("borderHover",n)],"--n-border-pressed":o[r("borderPressed",n)],"--n-border-focus":o[r("borderFocus",n)],"--n-border-disabled":o[r("borderDisabled",n)]};const{[r("height",x)]:q,[r("fontSize",x)]:pe,[r("padding",x)]:xe,[r("paddingRound",x)]:ge,[r("iconSize",x)]:me,[r("borderRadius",x)]:ye,[r("iconMargin",x)]:Ce,waveOpacity:we}=o,ze={"--n-width":W&&!y?q:"initial","--n-height":y?"initial":q,"--n-font-size":pe,"--n-padding":W||y?"initial":Y?ge:xe,"--n-icon-size":me,"--n-icon-margin":Ce,"--n-border-radius":y?"initial":W||Y?q:ye};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":d,"--n-bezier-ease-out":m,"--n-ripple-duration":N,"--n-opacity-disabled":k,"--n-wave-opacity":we},ve),a),V),ze)}),S=A?je("button",R(()=>{let t="";const{dashed:d,type:m,ghost:o,text:N,color:k,round:_,circle:K,textColor:x,secondary:M,tertiary:w,quaternary:G,strong:y}=e;d&&(t+="a"),o&&(t+="b"),N&&(t+="c"),_&&(t+="d"),K&&(t+="e"),M&&(t+="f"),w&&(t+="g"),G&&(t+="h"),y&&(t+="i"),k&&(t+="j"+Z(k)),x&&(t+="k"+Z(x));const{value:i}=F;return t+="l"+i[0],t+="m"+m[0],t}),L,e):void 0;return{selfElRef:h,waveElRef:v,mergedClsPrefix:D,mergedFocusable:j,mergedSize:F,showBorder:p,enterPressed:u,rtlEnabled:ue,handleMousedown:ne,handleKeydown:se,handleBlur:le,handleKeyup:ae,handleClick:ie,customColorCssVars:R(()=>{const{color:t}=e;if(!t)return null;const d=$(t);return{"--n-border-color":t,"--n-border-color-hover":d,"--n-border-color-pressed":H(t),"--n-border-color-focus":d,"--n-border-color-disabled":t}}),cssVars:A?void 0:L,themeClass:S==null?void 0:S.themeClass,onRender:S==null?void 0:S.onRender}},render(){const{mergedClsPrefix:e,tag:h,onRender:v}=this;v==null||v();const u=ee(this.$slots.default,p=>p&&f("span",{class:`${e}-button__content`},p));return f(h,{ref:"selfElRef",class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement==="right"&&u,f(De,{width:!0},{default:()=>ee(this.$slots.icon,p=>(this.loading||this.renderIcon||p)&&f("span",{class:`${e}-button__icon`,style:{margin:Ne(this.$slots.default)?"0":""}},f(_e,null,{default:()=>this.loading?f(Ke,{clsPrefix:e,key:"loading",class:`${e}-icon-slot`,strokeWidth:20}):f("div",{key:"icon",class:`${e}-icon-slot`,role:"none"},this.renderIcon?this.renderIcon():p)})))}),this.iconPlacement==="left"&&u,this.text?null:f(Ve,{ref:"waveElRef",clsPrefix:e}),this.showBorder?f("div",{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?f("div",{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}}),oo=Xe;export{Xe as B,eo as E,oo as X,Le as b,Ae as i};
