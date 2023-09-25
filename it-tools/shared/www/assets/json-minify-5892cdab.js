import{_ as a}from"./FormatTransformer.vue_vue_type_script_setup_true_lang-b76e73c9.js";import{J as r}from"./index-d4e515d0.js";import{w as i}from"./defaults-4d6daddf.js";import{d as s,H as l,o as p}from"./index-3141604a.js";import"./TextareaCopyable-e98362fd.js";import"./copy-2e0173a3.js";import"./Copy-40bfe2ab.js";import"./Scrollbar-a3829e4f.js";const u=`{
	"hello": [
		"world"
	]
}`,w=s({__name:"json-minify",setup(m){const t=o=>i(()=>JSON.stringify(r.parse(o),null,0),""),e=[{validator:o=>o===""||r.parse(o),message:"Provided JSON is not valid."}];return(o,f)=>{const n=a;return p(),l(n,{"input-label":"Your raw JSON","input-default":u,"input-placeholder":"Paste your raw JSON here...","output-label":"Minified version of your JSON","output-language":"json","input-validation-rules":e,transformer:t})}}});export{w as default};
