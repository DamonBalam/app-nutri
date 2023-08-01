import{Q as G}from"./QImg.dc3b0414.js";import{Q as k,R as V}from"./use-router-link.7484e254.js";import{Q as H}from"./QInput.6d15ee58.js";import{Q as O,_ as W,a as f}from"./apple.f1b9eb5c.js";import{Q as y,a as b,b as _}from"./QList.c72f9c46.js";import{a6 as Q,_ as X,B as Y,g as p,s as Z,f as P,c,w as a,o,e as L,d as t,J as m,a7 as w,a8 as x,D as N,M as v,N as d,C as A,a9 as M,K as R}from"./index.1362acce.js";import"./dom.23d515a9.js";import"./use-key-composition.cdeb0394.js";import"./uid.a462dcd1.js";class ee{async getCategories(){return(await Q.get("show/categorias",{})).data}async getSubCategoriesByCategoryId(n){return(await Q.get("show/categoria/{{id}}/subcategorias",{params:{id:n}})).data}}const $=new ee;class ae{async getProductos(){return(await Q.get("show/productos",{})).data}}const te=new ae;const oe={style:{width:"100%"},class:"q-px-xs"},re={key:0,class:"q-my-md q-px-xs"},se={key:1,class:"q-my-md q-px-xs"},le={class:"text-bold"},ne=Y({__name:"index",setup(S){const n=p(""),i=p({id:null,nombre:"",icon:""}),s=p({id:null,nombre:"",categoria_id:null}),B=["#339933","#4195F1","#E60026","#27C1C1","#FF005A","#900020","#EE890B","#339933","#4195F1","#E60026","#27C1C1","#FF005A","#900020","#EE890B","#339933","#4195F1","#E60026"],C=p([]),F=p([]),h=p([]);Z(async()=>{await T(),await K()});function z(e){i.value===e?(i.value={id:null,nombre:"",icon:""},s.value={id:null,nombre:"",categoria_id:null}):(i.value=e,U(e.id))}function J(e){s.value===e?s.value={id:null,nombre:"",categoria_id:null}:s.value=e}const K=async()=>{try{const e=await te.getProductos();e.code===200&&(C.value=e.data)}catch(e){console.log(e)}},T=async()=>{try{const e=await $.getCategories();e.code===200&&(F.value=e.data)}catch(e){console.log(e)}},U=async e=>{h.value=[];try{const l=await $.getSubCategoriesByCategoryId(e);l.code===200&&(h.value=l.data.subcategorias||[])}catch(l){console.log(l)}},I=P(()=>n.value===""?C.value:C.value.filter(e=>e.nombre.toLowerCase().includes(n.value.toLowerCase()))),j=P(()=>s.value===null?[]:I.value.filter(e=>{var l;return e.subcategoria_id===((l=s==null?void 0:s.value)==null?void 0:l.id)}));return(e,l)=>(o(),c(O,{class:"q-pa-md"},{default:a(()=>[L("div",oe,[t(G,{src:W,class:"apple"}),t(H,{rounded:"",class:"q-ml-xl",modelValue:n.value,"onUpdate:modelValue":l[0]||(l[0]=r=>n.value=r),outlined:"",dense:"",label:"Buscar alimento","bg-color":"white"},{append:a(()=>[t(k,{name:"search"})]),_:1},8,["modelValue"])]),n.value.length>2?(o(),m("div",re,[t(y,{bordered:"",separator:""},{default:a(()=>[(o(!0),m(w,null,x(N(I),r=>(o(),c(b,{class:"bg-white text-black",key:r.id},{default:a(()=>[t(_,null,{default:a(()=>[t(f,null,{default:a(()=>[v(d(r.nombre),1)]),_:2},1024),t(f,{caption:""},{default:a(()=>[v(d(r.cantidad_producto)+" = "+d(r.intercambio_nutricional),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})])):(o(),m("div",se,[(o(!0),m(w,null,x(F.value,(r,q)=>(o(),c(y,{bordered:"",separator:"",key:r.id},{default:a(()=>{var E;return[A((o(),c(b,{clickable:"",style:M("background-color: "+B[q]),class:"text-white",onClick:u=>z(r)},{default:a(()=>[t(_,null,{default:a(()=>[L("span",le,d(r.nombre),1)]),_:2},1024),t(_,{avatar:""},{default:a(()=>[t(k,{name:i.value.id===r.id?"expand_less":"expand_more",color:"white"},null,8,["name"])]),_:2},1024)]),_:2},1032,["style","onClick"])),[[V]]),((E=i.value)==null?void 0:E.id)===r.id?(o(!0),m(w,{key:0},x(h.value,u=>(o(),c(y,{key:u.id,bordered:"",separator:""},{default:a(()=>{var D;return[A((o(),c(b,{clickable:"",style:M("background-color: "+B[q]),class:"text-white",onClick:g=>J(u)},{default:a(()=>[t(_,{class:"q-ml-md"},{default:a(()=>[t(f,null,{default:a(()=>[v(d(u.nombre),1)]),_:2},1024)]),_:2},1024),t(_,{avatar:""},{default:a(()=>[t(k,{name:s.value.id===u.id?"expand_less":"expand_more",color:"white"},null,8,["name"])]),_:2},1024)]),_:2},1032,["style","onClick"])),[[V]]),((D=s.value)==null?void 0:D.id)===u.id?(o(),c(y,{key:0,bordered:"",separator:""},{default:a(()=>[(o(!0),m(w,null,x(N(j),g=>(o(),c(b,{class:"bg-white text-black",key:g.id},{default:a(()=>[t(_,null,{default:a(()=>[t(f,null,{default:a(()=>[v(d(g.nombre),1)]),_:2},1024),t(f,{caption:""},{default:a(()=>[v(d(g.cantidad_producto)+" = "+d(g.intercambio_nutricional),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})):R("",!0)]}),_:2},1024))),128)):R("",!0)]}),_:2},1024))),128))]))]),_:1}))}});var ve=X(ne,[["__scopeId","data-v-673cd175"]]);export{ve as default};