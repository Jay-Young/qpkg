import{d as q,A as u,k as B,w as t,a0 as U,o as $,f as o,g as l,a1 as p,b as F,e as N,a2 as V,ar as D,bE as E,n as L,bC as R}from"./index-648e106a.js";import{u as T}from"./useQRCode-1e5d8200.js";import{u as y}from"./downloadBase64-eff7ba23.js";import{_ as z}from"./ColorPicker-839dd6c7.js";import{_ as A}from"./FormItem-a3e0acf0.js";import{_ as Q}from"./Form-b91cdebc.js";import{_ as Y}from"./Image-a799ff89.js";import"./browser-e933942f.js";import"./index-c38fd5c5.js";import"./___vite-browser-external_commonjs-proxy-3610b844.js";import"./Input-0d060766.js";import"./Button-ed56b767.js";import"./use-form-item-d249922d.js";import"./use-locale-173d951d.js";import"./InputGroup-6581753b.js";const j={flex:"","flex-col":"","items-center":"","gap-3":""},ao=q({__name:"qr-code-generator",setup(G){const a=u("#000000ff"),_=u("#ffffffff"),r=u("medium"),f=["low","medium","quartile","high"],s=u("https://it-tools.tech"),{qrcode:i}=T({text:s,color:{background:_,foreground:a},errorCorrectionLevel:r,options:{width:1024}}),{download:g}=y({source:i,filename:"qr-code.png"});return(H,e)=>{const b=V,c=z,m=A,v=D,x=Q,d=E,w=Y,h=L,k=R,C=U;return $(),B(C,null,{default:t(()=>[o(k,{"x-gap":"12","y-gap":"12",cols:"1 600:3"},{default:t(()=>[o(d,{span:"2"},{default:t(()=>[o(b,{value:l(s),"onUpdate:value":e[0]||(e[0]=n=>p(s)?s.value=n:null),"label-position":"left","label-width":"130px","label-align":"right",label:"Text:",multiline:"",rows:"1",autosize:"",placeholder:"Your link or text...","mb-6":""},null,8,["value"]),o(x,{"label-width":"130","label-placement":"left"},{default:t(()=>[o(m,{label:"Foreground color:"},{default:t(()=>[o(c,{value:l(a),"onUpdate:value":e[1]||(e[1]=n=>p(a)?a.value=n:null),modes:["hex"]},null,8,["value"])]),_:1}),o(m,{label:"Background color:"},{default:t(()=>[o(c,{value:l(_),"onUpdate:value":e[2]||(e[2]=n=>p(_)?_.value=n:null),modes:["hex"]},null,8,["value"])]),_:1}),o(v,{value:l(r),"onUpdate:value":e[3]||(e[3]=n=>p(r)?r.value=n:null),label:"Error resistance:","label-position":"left","label-width":"130px","label-align":"right",options:f.map(n=>({label:n,value:n}))},null,8,["value","options"])]),_:1})]),_:1}),o(d,null,{default:t(()=>[F("div",j,[o(w,{src:l(i),width:"200"},null,8,["src"]),o(h,{onClick:l(g)},{default:t(()=>[N(" Download qr-code ")]),_:1},8,["onClick"])])]),_:1})]),_:1})]),_:1})}}});export{ao as default};