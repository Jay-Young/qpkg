import{_ as e}from"./FormatTransformer.vue_vue_type_script_setup_true_lang-aab72981.js";import{p as m}from"./toml-esm-9c5f6a1e.js";import{d as i,k as s,o as n,am as p}from"./index-648e106a.js";import{w as l}from"./defaults-4d6daddf.js";import{i as u}from"./toml.services-387bcfeb.js";import"./TextareaCopyable-58347e9e.js";import"./Copy-11243cf2.js";import"./Scrollbar-a3740edc.js";import"./boolean-c7e7c785.js";const k=i({__name:"toml-to-yaml",setup(f){const r=o=>o.trim()===""?"":l(()=>p(m(o)),""),t=[{validator:u,message:"Provided TOML is not valid."}];return(o,c)=>{const a=e;return n(),s(a,{"input-label":"Your TOML","input-placeholder":"Paste your TOML here...","output-label":"YAML from your TOML","output-language":"yaml","input-validation-rules":t,transformer:r})}}});export{k as default};