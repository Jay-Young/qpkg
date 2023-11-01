import{H as n,K as o,d as C,M as S,O as v,be as R,aW as $,i as T,S as w,q as a,a_ as r}from"./index-648e106a.js";const E=n("statistic",[o("label",`
 font-weight: var(--n-label-font-weight);
 transition: .3s color var(--n-bezier);
 font-size: var(--n-label-font-size);
 color: var(--n-label-text-color);
 `),n("statistic-value",`
 margin-top: 4px;
 font-weight: var(--n-value-font-weight);
 `,[o("prefix",`
 margin: 0 4px 0 0;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-prefix-text-color);
 `,[n("icon",{verticalAlign:"-0.125em"})]),o("content",`
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-text-color);
 `),o("suffix",`
 margin: 0 0 0 4px;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-suffix-text-color);
 `,[n("icon",{verticalAlign:"-0.125em"})])])]),P=Object.assign(Object.assign({},v.props),{tabularNums:Boolean,label:String,value:[String,Number]}),N=C({name:"Statistic",props:P,setup(s){const{mergedClsPrefixRef:t,inlineThemeDisabled:i,mergedRtlRef:c}=S(s),u=v("Statistic","-statistic",E,R,s,t),f=$("Statistic",c,t),e=T(()=>{const{self:{labelFontWeight:d,valueFontSize:x,valueFontWeight:b,valuePrefixTextColor:m,labelTextColor:h,valueSuffixTextColor:g,valueTextColor:p,labelFontSize:z},common:{cubicBezierEaseInOut:_}}=u.value;return{"--n-bezier":_,"--n-label-font-size":z,"--n-label-font-weight":d,"--n-label-text-color":h,"--n-value-font-weight":b,"--n-value-font-size":x,"--n-value-prefix-text-color":m,"--n-value-suffix-text-color":g,"--n-value-text-color":p}}),l=i?w("statistic",void 0,e,s):void 0;return{rtlEnabled:f,mergedClsPrefix:t,cssVars:i?void 0:e,themeClass:l?.themeClass,onRender:l?.onRender}},render(){var s;const{mergedClsPrefix:t,$slots:{default:i,label:c,prefix:u,suffix:f}}=this;return(s=this.onRender)===null||s===void 0||s.call(this),a("div",{class:[`${t}-statistic`,this.themeClass,this.rtlEnabled&&`${t}-statistic--rtl`],style:this.cssVars},r(c,e=>a("div",{class:`${t}-statistic__label`},this.label||e)),a("div",{class:`${t}-statistic-value`,style:{fontVariantNumeric:this.tabularNums?"tabular-nums":""}},r(u,e=>e&&a("span",{class:`${t}-statistic-value__prefix`},e)),this.value!==void 0?a("span",{class:`${t}-statistic-value__content`},this.value):r(i,e=>e&&a("span",{class:`${t}-statistic-value__content`},e)),r(f,e=>e&&a("span",{class:`${t}-statistic-value__suffix`},e))))}});export{N as _};
