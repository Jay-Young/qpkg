import{_ as a}from"./FormatTransformer.vue_vue_type_script_setup_true_lang-aab72981.js";import{J as r}from"./index-d4e515d0.js";import{w as s}from"./defaults-4d6daddf.js";import{d as i,k as l,o as p}from"./index-648e106a.js";import"./TextareaCopyable-58347e9e.js";import"./Copy-11243cf2.js";import"./Scrollbar-a3740edc.js";const u=`{
	"hello": [
		"world"
	]
}`,h=i({__name:"json-minify",setup(m){const t=o=>s(()=>JSON.stringify(r.parse(o),null,0),""),e=[{validator:o=>o===""||r.parse(o),message:"Provided JSON is not valid."}];return(o,f)=>{const n=a;return p(),l(n,{"input-label":"Your raw JSON","input-default":u,"input-placeholder":"Paste your raw JSON here...","output-label":"Minified version of your JSON","output-language":"json","input-validation-rules":e,transformer:t})}}});export{h as default};
