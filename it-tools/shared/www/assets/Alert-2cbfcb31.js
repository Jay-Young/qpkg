import{aN as M,bz as O,b1 as h,b5 as u,c as P,Y as i,W as R,X as N,a as V,d as D,u as K,b as E,b3 as Q,e as $,f as X,z as Y,h as l,R as q,bA as G,bB as J,P as U,Q as Z,bb as oo,bc as eo,bd as ro,ba as no,b7 as so,bs as lo,b4 as a}from"./index-3141604a.js";const to=r=>{const{lineHeight:e,borderRadius:d,fontWeightStrong:v,baseColor:t,dividerColor:f,actionColor:S,textColor1:g,textColor2:s,closeColorHover:b,closeColorPressed:C,closeIconColor:m,closeIconColorHover:p,closeIconColorPressed:n,infoColor:o,successColor:I,warningColor:x,errorColor:z,fontSize:T}=r;return Object.assign(Object.assign({},O),{fontSize:T,lineHeight:e,titleFontWeight:v,borderRadius:d,border:`1px solid ${f}`,color:S,titleTextColor:g,iconColor:s,contentTextColor:s,closeBorderRadius:d,closeColorHover:b,closeColorPressed:C,closeIconColor:m,closeIconColorHover:p,closeIconColorPressed:n,borderInfo:`1px solid ${h(t,u(o,{alpha:.25}))}`,colorInfo:h(t,u(o,{alpha:.08})),titleTextColorInfo:g,iconColorInfo:o,contentTextColorInfo:s,closeColorHoverInfo:b,closeColorPressedInfo:C,closeIconColorInfo:m,closeIconColorHoverInfo:p,closeIconColorPressedInfo:n,borderSuccess:`1px solid ${h(t,u(I,{alpha:.25}))}`,colorSuccess:h(t,u(I,{alpha:.08})),titleTextColorSuccess:g,iconColorSuccess:I,contentTextColorSuccess:s,closeColorHoverSuccess:b,closeColorPressedSuccess:C,closeIconColorSuccess:m,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:n,borderWarning:`1px solid ${h(t,u(x,{alpha:.33}))}`,colorWarning:h(t,u(x,{alpha:.08})),titleTextColorWarning:g,iconColorWarning:x,contentTextColorWarning:s,closeColorHoverWarning:b,closeColorPressedWarning:C,closeIconColorWarning:m,closeIconColorHoverWarning:p,closeIconColorPressedWarning:n,borderError:`1px solid ${h(t,u(z,{alpha:.25}))}`,colorError:h(t,u(z,{alpha:.08})),titleTextColorError:g,iconColorError:z,contentTextColorError:s,closeColorHoverError:b,closeColorPressedError:C,closeIconColorError:m,closeIconColorHoverError:p,closeIconColorPressedError:n})},io={name:"Alert",common:M,self:to},co=io,ao=P("alert",`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[i("border",`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),R("closable",[P("alert-body",[i("title",`
 padding-right: 24px;
 `)])]),i("icon",{color:"var(--n-icon-color)"}),P("alert-body",{padding:"var(--n-padding)"},[i("title",{color:"var(--n-title-text-color)"}),i("content",{color:"var(--n-content-text-color)"})]),N({originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.9)"}}),i("icon",`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),i("close",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),R("show-icon",[P("alert-body",{paddingLeft:"calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))"})]),P("alert-body",`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[i("title",`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[V("& +",[i("content",{marginTop:"9px"})])]),i("content",{transition:"color .3s var(--n-bezier)",fontSize:"var(--n-font-size)"})]),i("icon",{transition:"color .3s var(--n-bezier)"})]),go=Object.assign(Object.assign({},E.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:"default"},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),ho=D({name:"Alert",inheritAttrs:!1,props:go,setup(r){const{mergedClsPrefixRef:e,mergedBorderedRef:d,inlineThemeDisabled:v,mergedRtlRef:t}=K(r),f=E("Alert","-alert",ao,co,r,e),S=Q("Alert",t,e),g=$(()=>{const{common:{cubicBezierEaseInOut:n},self:o}=f.value,{fontSize:I,borderRadius:x,titleFontWeight:z,lineHeight:T,iconSize:H,iconMargin:y,iconMarginRtl:_,closeIconSize:W,closeBorderRadius:A,closeSize:w,closeMargin:B,closeMarginRtl:L,padding:k}=o,{type:c}=r,{left:j,right:F}=lo(y);return{"--n-bezier":n,"--n-color":o[a("color",c)],"--n-close-icon-size":W,"--n-close-border-radius":A,"--n-close-color-hover":o[a("closeColorHover",c)],"--n-close-color-pressed":o[a("closeColorPressed",c)],"--n-close-icon-color":o[a("closeIconColor",c)],"--n-close-icon-color-hover":o[a("closeIconColorHover",c)],"--n-close-icon-color-pressed":o[a("closeIconColorPressed",c)],"--n-icon-color":o[a("iconColor",c)],"--n-border":o[a("border",c)],"--n-title-text-color":o[a("titleTextColor",c)],"--n-content-text-color":o[a("contentTextColor",c)],"--n-line-height":T,"--n-border-radius":x,"--n-font-size":I,"--n-title-font-weight":z,"--n-icon-size":H,"--n-icon-margin":y,"--n-icon-margin-rtl":_,"--n-close-size":w,"--n-close-margin":B,"--n-close-margin-rtl":L,"--n-padding":k,"--n-icon-margin-left":j,"--n-icon-margin-right":F}}),s=v?X("alert",$(()=>r.type[0]),g,r):void 0,b=Y(!0),C=()=>{const{onAfterLeave:n,onAfterHide:o}=r;n&&n(),o&&o()};return{rtlEnabled:S,mergedClsPrefix:e,mergedBordered:d,visible:b,handleCloseClick:()=>{var n;Promise.resolve((n=r.onClose)===null||n===void 0?void 0:n.call(r)).then(o=>{o!==!1&&(b.value=!1)})},handleAfterLeave:()=>{C()},mergedTheme:f,cssVars:v?void 0:g,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var r;return(r=this.onRender)===null||r===void 0||r.call(this),l(q,{onAfterLeave:this.handleAfterLeave},{default:()=>{const{mergedClsPrefix:e,$slots:d}=this,v={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:"alert"};return this.visible?l("div",Object.assign({},G(this.$attrs,v)),this.closable&&l(J,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&l("div",{class:`${e}-alert__border`}),this.showIcon&&l("div",{class:`${e}-alert__icon`,"aria-hidden":"true"},U(d.icon,()=>[l(Z,{clsPrefix:e},{default:()=>{switch(this.type){case"success":return l(no,null);case"info":return l(ro,null);case"warning":return l(eo,null);case"error":return l(oo,null);default:return null}}})])),l("div",{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},so(d.header,t=>{const f=t||this.title;return f?l("div",{class:`${e}-alert-body__title`},f):null}),d.default&&l("div",{class:`${e}-alert-body__content`},d))):null}})}});export{ho as _};
