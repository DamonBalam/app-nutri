import{f as r,A as a,B as f,j as s,C as v,D as d}from"./index.1362acce.js";const o={xs:18,sm:24,md:32,lg:38,xl:46},z={size:String};function x(e,n=o){return r(()=>e.size!==void 0?{fontSize:e.size in n?`${n[e.size]}px`:e.size}:null)}const S={size:{type:[Number,String],default:"1em"},color:String};function m(e){return{cSize:r(()=>e.size in o?`${o[e.size]}px`:e.size),classes:r(()=>"q-spinner"+(e.color?` text-${e.color}`:""))}}const h=e=>a(f(e)),y=e=>a(e);var k=h({name:"QSpinner",props:{...S,thickness:{type:Number,default:5}},setup(e){const{cSize:n,classes:t}=m(e);return()=>s("svg",{class:t.value+" q-spinner-mat",width:n.value,height:n.value,viewBox:"25 25 50 50"},[s("circle",{class:"path",cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":e.thickness,"stroke-miterlimit":"10"})])}});function p(e,n){return e!==void 0&&e()||n}function b(e,n){if(e!==void 0){const t=e();if(t!=null)return t.slice()}return n}function D(e,n){return e!==void 0?n.concat(e()):n}function q(e,n){return e===void 0?n:n!==void 0?n.concat(e()):e()}function w(e,n,t,i,u,l){n.key=i+u;const c=s(e,n,t);return u===!0?v(c,l()):c}function C(e,n){const t=e.style;for(const i in n)t[i]=n[i]}function $(e){if(e==null)return;if(typeof e=="string")try{return document.querySelector(e)||void 0}catch{return}const n=d(e);if(n)return n.$el||n}function Q(e,n){if(e==null||e.contains(n)===!0)return!0;for(let t=e.nextElementSibling;t!==null;t=t.nextElementSibling)if(t.contains(n))return!0;return!1}export{k as Q,D as a,C as b,h as c,x as d,y as e,b as f,$ as g,p as h,q as i,w as j,Q as k,z as u};