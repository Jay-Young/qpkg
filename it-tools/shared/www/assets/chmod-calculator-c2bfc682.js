import{m as u,d as V,as as C,bM as S,A as I,i as h,c as p,f as _,w as j,b as t,t as m,g as a,o as f,F as x,j as b,a4 as B,a5 as G,a6 as P}from"./index-648e106a.js";import{_ as R}from"./InputCopyable.vue_vue_type_script_setup_true_lang-9c054a8a.js";import{_ as E}from"./Checkbox-d577666b.js";import{_ as F}from"./Table-9bd51be6.js";import"./use-form-item-d249922d.js";function N({permissions:e}){const r={read:4,write:2,execute:1},o=n=>u.reduce(n,(s,c,l)=>s+(c?u.get(r,l,0):0),0);return[o(e.owner),o(e.group),o(e.public)].join("")}function O({permissions:e}){const r={read:"r",write:"w",execute:"x"},o=n=>u.reduce(n,(s,c,l)=>s+(c?u.get(r,l,""):"-"),"");return[o(e.owner),o(e.group),o(e.public)].join("")}const U=e=>(B("data-v-da1f2770"),e=e(),G(),e),$=U(()=>t("thead",null,[t("tr",null,[t("th",{class:"text-center",scope:"col"}),t("th",{class:"text-center",scope:"col"}," Owner (u) "),t("th",{class:"text-center",scope:"col"}," Group (g) "),t("th",{class:"text-center",scope:"col"}," Public (o) ")])],-1)),z={class:"line-header"},A={class:"octal-result"},D={class:"octal-result"},L=V({__name:"chmod-calculator",setup(e){C(g=>({"9a009fc0":a(r).primaryColor}));const r=S(),o=[{scope:"read",title:"Read (4)"},{scope:"write",title:"Write (2)"},{scope:"execute",title:"Execute (1)"}],n=["owner","group","public"],s=I({owner:{read:!1,write:!1,execute:!1},group:{read:!1,write:!1,execute:!1},public:{read:!1,write:!1,execute:!1}}),c=h(()=>N({permissions:s.value})),l=h(()=>O({permissions:s.value}));return(g,M)=>{const w=E,v=F;return f(),p("div",null,[_(v,{bordered:!1,"bottom-bordered":!1,"single-column":"",class:"permission-table"},{default:j(()=>[$,t("tbody",null,[(f(),p(x,null,b(o,({scope:i,title:y})=>t("tr",{key:i},[t("td",z,m(y),1),(f(),p(x,null,b(n,d=>t("td",{key:d,class:"text-center"},[_(w,{checked:a(s)[d][i],"onUpdate:checked":k=>a(s)[d][i]=k,size:"large"},null,8,["checked","onUpdate:checked"])])),64))])),64))])]),_:1}),t("div",A,m(a(c)),1),t("div",D,m(a(l)),1),_(R,{value:`chmod ${a(c)} path`,readonly:""},null,8,["value"])])}}});const K=P(L,[["__scopeId","data-v-da1f2770"]]);export{K as default};