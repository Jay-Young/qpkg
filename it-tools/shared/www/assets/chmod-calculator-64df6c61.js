import{h as i,K as fe,a as f,c,Y as m,W as R,Z as ke,bw as xe,bx as me,d as H,z as P,u as ve,L as pe,a0 as ge,a1 as _e,S as Ce,b as L,bY as we,b3 as ye,e as D,b4 as F,f as ze,a4 as Re,U as Se,aW as Ve,a6 as I,v as B,an as De,bS as Be,j as M,k as T,w as $e,q as b,s as j,n as S,o as K,F as E,r as N,a9 as Ie,aa as Me,p as Te}from"./index-3141604a.js";import{_ as je}from"./InputCopyable.vue_vue_type_script_setup_true_lang-72165070.js";import{u as Ke}from"./use-form-item-7ba2c55f.js";import{_ as Pe}from"./Table-3b80a307.js";import"./content-copy-dd3e3384.js";import"./copy-2e0173a3.js";const Ue=i("svg",{viewBox:"0 0 64 64",class:"check-icon"},i("path",{d:"M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"})),Fe=i("svg",{viewBox:"0 0 100 100",class:"line-icon"},i("path",{d:"M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"})),Ee=fe("n-checkbox-group"),Ne=f([c("checkbox",`
 line-height: var(--n-label-line-height);
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 --n-merged-color-table: var(--n-color-table);
 `,[f("&:hover",[c("checkbox-box",[m("border",{border:"var(--n-border-checked)"})])]),f("&:focus:not(:active)",[c("checkbox-box",[m("border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),R("inside-table",[c("checkbox-box",`
 background-color: var(--n-merged-color-table);
 `)]),R("checked",[c("checkbox-box",`
 background-color: var(--n-color-checked);
 `,[c("checkbox-icon",[f(".check-icon",`
 opacity: 1;
 transform: scale(1);
 `)])])]),R("indeterminate",[c("checkbox-box",[c("checkbox-icon",[f(".check-icon",`
 opacity: 0;
 transform: scale(.5);
 `),f(".line-icon",`
 opacity: 1;
 transform: scale(1);
 `)])])]),R("checked, indeterminate",[f("&:focus:not(:active)",[c("checkbox-box",[m("border",`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),c("checkbox-box",`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[m("border",{border:"var(--n-border-checked)"})])]),R("disabled",{cursor:"not-allowed"},[R("checked",[c("checkbox-box",`
 background-color: var(--n-color-disabled-checked);
 `,[m("border",{border:"var(--n-border-disabled-checked)"}),c("checkbox-icon",[f(".check-icon, .line-icon",{fill:"var(--n-check-mark-color-disabled-checked)"})])])]),c("checkbox-box",`
 background-color: var(--n-color-disabled);
 `,[m("border",{border:"var(--n-border-disabled)"}),c("checkbox-icon",[f(".check-icon, .line-icon",{fill:"var(--n-check-mark-color-disabled)"})])]),m("label",{color:"var(--n-text-color-disabled)"})]),c("checkbox-box-wrapper",`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),c("checkbox-box",`
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `,[m("border",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `),c("checkbox-icon",`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[f(".check-icon, .line-icon",`
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `),ke({left:"1px",top:"1px"})])]),m("label",`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[f("&:empty",{display:"none"})])]),xe(c("checkbox",`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),me(c("checkbox",`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),He=Object.assign(Object.assign({},L.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),Le=H({name:"Checkbox",props:He,setup(e){const l=P(null),{mergedClsPrefixRef:n,inlineThemeDisabled:u,mergedRtlRef:t}=ve(e),d=Ke(e,{mergedSize(o){const{size:k}=e;if(k!==void 0)return k;if(a){const{value:s}=a.mergedSizeRef;if(s!==void 0)return s}if(o){const{mergedSize:s}=o;if(s!==void 0)return s.value}return"medium"},mergedDisabled(o){const{disabled:k}=e;if(k!==void 0)return k;if(a){if(a.disabledRef.value)return!0;const{maxRef:{value:s},checkedCountRef:_}=a;if(s!==void 0&&_.value>=s&&!x.value)return!0;const{minRef:{value:y}}=a;if(y!==void 0&&_.value<=y&&x.value)return!0}return o?o.disabled.value:!1}}),{mergedDisabledRef:h,mergedSizeRef:p}=d,a=pe(Ee,null),r=P(e.defaultChecked),V=ge(e,"checked"),g=_e(V,r),x=Ce(()=>{if(a){const o=a.valueSetRef.value;return o&&e.value!==void 0?o.has(e.value):!1}else return g.value===e.checkedValue}),v=L("Checkbox","-checkbox",Ne,we,e,n);function C(o){if(a&&e.value!==void 0)a.toggleCheckbox(!x.value,e.value);else{const{onChange:k,"onUpdate:checked":s,onUpdateChecked:_}=e,{nTriggerFormInput:y,nTriggerFormChange:$}=d,z=x.value?e.uncheckedValue:e.checkedValue;s&&I(s,z,o),_&&I(_,z,o),k&&I(k,z,o),y(),$(),r.value=z}}function O(o){h.value||C(o)}function G(o){if(!h.value)switch(o.key){case" ":case"Enter":C(o)}}function A(o){switch(o.key){case" ":o.preventDefault()}}const W={focus:()=>{var o;(o=l.value)===null||o===void 0||o.focus()},blur:()=>{var o;(o=l.value)===null||o===void 0||o.blur()}},Y=ye("Checkbox",t,n),U=D(()=>{const{value:o}=p,{common:{cubicBezierEaseInOut:k},self:{borderRadius:s,color:_,colorChecked:y,colorDisabled:$,colorTableHeader:z,colorTableHeaderModal:q,colorTableHeaderPopover:Z,checkMarkColor:J,checkMarkColorDisabled:Q,border:X,borderFocus:ee,borderDisabled:oe,borderChecked:ce,boxShadowFocus:re,textColor:ne,textColorDisabled:ae,checkMarkColorDisabledChecked:le,colorDisabledChecked:te,borderDisabledChecked:se,labelPadding:de,labelLineHeight:ie,labelFontWeight:be,[F("fontSize",o)]:ue,[F("size",o)]:he}}=v.value;return{"--n-label-line-height":ie,"--n-label-font-weight":be,"--n-size":he,"--n-bezier":k,"--n-border-radius":s,"--n-border":X,"--n-border-checked":ce,"--n-border-focus":ee,"--n-border-disabled":oe,"--n-border-disabled-checked":se,"--n-box-shadow-focus":re,"--n-color":_,"--n-color-checked":y,"--n-color-table":z,"--n-color-table-modal":q,"--n-color-table-popover":Z,"--n-color-disabled":$,"--n-color-disabled-checked":te,"--n-text-color":ne,"--n-text-color-disabled":ae,"--n-check-mark-color":J,"--n-check-mark-color-disabled":Q,"--n-check-mark-color-disabled-checked":le,"--n-font-size":ue,"--n-label-padding":de}}),w=u?ze("checkbox",D(()=>p.value[0]),U,e):void 0;return Object.assign(d,W,{rtlEnabled:Y,selfRef:l,mergedClsPrefix:n,mergedDisabled:h,renderedChecked:x,mergedTheme:v,labelId:Re(),handleClick:O,handleKeyUp:G,handleKeyDown:A,cssVars:u?void 0:U,themeClass:w==null?void 0:w.themeClass,onRender:w==null?void 0:w.onRender})},render(){var e;const{$slots:l,renderedChecked:n,mergedDisabled:u,indeterminate:t,privateInsideTable:d,cssVars:h,labelId:p,label:a,mergedClsPrefix:r,focusable:V,handleKeyUp:g,handleKeyDown:x,handleClick:v}=this;return(e=this.onRender)===null||e===void 0||e.call(this),i("div",{ref:"selfRef",class:[`${r}-checkbox`,this.themeClass,this.rtlEnabled&&`${r}-checkbox--rtl`,n&&`${r}-checkbox--checked`,u&&`${r}-checkbox--disabled`,t&&`${r}-checkbox--indeterminate`,d&&`${r}-checkbox--inside-table`],tabindex:u||!V?void 0:0,role:"checkbox","aria-checked":t?"mixed":n,"aria-labelledby":p,style:h,onKeyup:g,onKeydown:x,onClick:v,onMousedown:()=>{Ve("selectstart",window,C=>{C.preventDefault()},{once:!0})}},i("div",{class:`${r}-checkbox-box-wrapper`}," ",i("div",{class:`${r}-checkbox-box`},i(Se,null,{default:()=>this.indeterminate?i("div",{key:"indeterminate",class:`${r}-checkbox-icon`},Fe):i("div",{key:"check",class:`${r}-checkbox-icon`},Ue)}),i("div",{class:`${r}-checkbox-box__border`}))),a!==null||l.default?i("span",{class:`${r}-checkbox__label`,id:p},l.default?l.default():a):null)}});function Oe({permissions:e}){const l={read:4,write:2,execute:1},n=u=>B.reduce(u,(t,d,h)=>t+(d?B.get(l,h,0):0),0);return[n(e.owner),n(e.group),n(e.public)].join("")}function Ge({permissions:e}){const l={read:"r",write:"w",execute:"x"},n=u=>B.reduce(u,(t,d,h)=>t+(d?B.get(l,h,""):"-"),"");return[n(e.owner),n(e.group),n(e.public)].join("")}const Ae=e=>(Ie("data-v-da1f2770"),e=e(),Me(),e),We=Ae(()=>b("thead",null,[b("tr",null,[b("th",{class:"text-center",scope:"col"}),b("th",{class:"text-center",scope:"col"}," Owner (u) "),b("th",{class:"text-center",scope:"col"}," Group (g) "),b("th",{class:"text-center",scope:"col"}," Public (o) ")])],-1)),Ye={class:"line-header"},qe={class:"octal-result"},Ze={class:"octal-result"},Je=H({__name:"chmod-calculator",setup(e){De(p=>({"9a009fc0":S(l).primaryColor}));const l=Be(),n=[{scope:"read",title:"Read (4)"},{scope:"write",title:"Write (2)"},{scope:"execute",title:"Execute (1)"}],u=["owner","group","public"],t=P({owner:{read:!1,write:!1,execute:!1},group:{read:!1,write:!1,execute:!1},public:{read:!1,write:!1,execute:!1}}),d=D(()=>Oe({permissions:t.value})),h=D(()=>Ge({permissions:t.value}));return(p,a)=>{const r=Le,V=Pe;return K(),M("div",null,[T(V,{bordered:!1,"bottom-bordered":!1,"single-column":"",class:"permission-table"},{default:$e(()=>[We,b("tbody",null,[(K(),M(E,null,N(n,({scope:g,title:x})=>b("tr",{key:g},[b("td",Ye,j(x),1),(K(),M(E,null,N(u,v=>b("td",{key:v,class:"text-center"},[T(r,{checked:S(t)[v][g],"onUpdate:checked":C=>S(t)[v][g]=C,size:"large"},null,8,["checked","onUpdate:checked"])])),64))])),64))])]),_:1}),b("div",qe,j(S(d)),1),b("div",Ze,j(S(h)),1),T(je,{value:`chmod ${S(d)} path`,readonly:""},null,8,["value"])])}}});const no=Te(Je,[["__scopeId","data-v-da1f2770"]]);export{no as default};
