import{v as G,Q as E}from"./use-router-link.7484e254.js";import{Q as P}from"./QInput.6d15ee58.js";import{c as M,h as Q}from"./dom.23d515a9.js";import{u as J,a as L}from"./uid.a462dcd1.js";import{f as A,j as V,q as O,g as l,p as W,E as X,F as Y,s as Z,G as z,x as ee,H as te,B as oe,I as ae,J as I,c as U,w as m,K as C,L as H,o as w,d as r,D as q,M as R,N as D,e as y}from"./index.1362acce.js";import{Q as j}from"./QBtn.9763c416.js";import{a as ne}from"./use-key-composition.cdeb0394.js";var N=M({name:"QBanner",props:{...J,inlineActions:Boolean,dense:Boolean,rounded:Boolean},setup(a,{slots:x}){const{proxy:{$q:p}}=O(),g=L(a,p),i=A(()=>"q-banner row items-center"+(a.dense===!0?" q-banner--dense":"")+(g.value===!0?" q-banner--dark q-dark":"")+(a.rounded===!0?" rounded-borders":"")),s=A(()=>`q-banner__actions row items-center justify-end col-${a.inlineActions===!0?"auto":"all"}`);return()=>{const n=[V("div",{class:"q-banner__avatar col-auto row items-center self-start"},Q(x.avatar)),V("div",{class:"q-banner__content col text-body2"},Q(x.default))],d=Q(x.action);return d!==void 0&&n.push(V("div",{class:s.value},d)),V("div",{class:i.value+(a.inlineActions===!1&&d!==void 0?" q-banner--top-padding":""),role:"alert"},n)}}}),K=M({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(a,{slots:x,emit:p}){const g=O(),i=l(null);let s=0;const n=[];function d(t){const u=typeof t=="boolean"?t:a.noErrorFocus!==!0,F=++s,B=(e,o)=>{p("validation"+(e===!0?"Success":"Error"),o)},k=e=>{const o=e.validate();return typeof o.then=="function"?o.then(c=>({valid:c,comp:e}),c=>({valid:!1,comp:e,err:c})):Promise.resolve({valid:o,comp:e})};return(a.greedy===!0?Promise.all(n.map(k)).then(e=>e.filter(o=>o.valid!==!0)):n.reduce((e,o)=>e.then(()=>k(o).then(c=>{if(c.valid===!1)return Promise.reject(c)})),Promise.resolve()).catch(e=>[e])).then(e=>{if(e===void 0||e.length===0)return F===s&&B(!0),!0;if(F===s){const{comp:o,err:c}=e[0];if(c!==void 0&&console.error(c),B(!1,o),u===!0){const T=e.find(({comp:$})=>typeof $.focus=="function"&&G($.$)===!1);T!==void 0&&T.comp.focus()}}return!1})}function _(){s++,n.forEach(t=>{typeof t.resetValidation=="function"&&t.resetValidation()})}function f(t){t!==void 0&&z(t);const u=s+1;d().then(F=>{u===s&&F===!0&&(a.onSubmit!==void 0?p("submit",t):t!==void 0&&t.target!==void 0&&typeof t.target.submit=="function"&&t.target.submit())})}function h(t){t!==void 0&&z(t),p("reset"),ee(()=>{_(),a.autofocus===!0&&a.noResetFocus!==!0&&v()})}function v(){ne(()=>{if(i.value===null)return;const t=i.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||i.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||i.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(i.value.querySelectorAll("[tabindex]"),u=>u.tabIndex>-1);t!=null&&t.focus({preventScroll:!0})})}W(te,{bindComponent(t){n.push(t)},unbindComponent(t){const u=n.indexOf(t);u>-1&&n.splice(u,1)}});let b=!1;return X(()=>{b=!0}),Y(()=>{b===!0&&a.autofocus===!0&&v()}),Z(()=>{a.autofocus===!0&&v()}),Object.assign(g.proxy,{validate:d,resetValidation:_,submit:f,reset:h,focus:v,getValidationComponents:()=>n}),()=>V("form",{class:"q-form",ref:i,onSubmit:f,onReset:h},Q(x.default))}});const re=y("div",{class:"q-mb-none row justify-center"},[y("label",{for:"email",style:{"font-size":"18px"}},"Correo electr\xF3nico")],-1),se=y("div",{class:"q-mt-sm row justify-center"},[y("label",{for:"password",style:{"font-size":"18px"}},"Contrase\xF1a")],-1),le={key:0},ie={class:"row justify-center"},ue={class:"row justify-center"},ce=y("div",{class:"q-mb-none row justify-center"},[y("label",{for:"email",style:{"font-size":"18px"}},"Se enviara una nueva contrase\xF1a al correo electr\xF3nico registrado")],-1),de={key:0},fe={key:1},me={class:"row justify-center"},he=oe({__name:"Index",setup(a){const x=ae(),{login:p}=x,g=l(null),i=l(null),s=l(!0),n=l(""),d=l(""),_=l(""),f=l(""),h=l("");l(!1);const v=l(!1),b=l(!1),t=A(()=>f.value||null),u=A(()=>h.value||null);async function F(){v.value=!0,f.value="",g.value.validate().then(async S=>{if(S)try{const{code:e,data:o,msg:c}=await H.login(n.value,_.value);e===200?p(o):(f.value=c||"Error al iniciar sesi\xF3n",setTimeout(()=>{f.value=""},3e3))}catch(e){console.log(e)}}),v.value=!1}async function B(){v.value=!0,f.value="",h.value="",i.value.validate().then(async S=>{if(S)try{const e=await H.recover(d.value);e.data.code===200?(console.log("success"),h.value=e.data.msg||"Se ha enviado un correo electr\xF3nico"):(console.log("error"),f.value=e.data.msg||"Error al validar el correo electr\xF3nico",setTimeout(()=>{f.value=""},3e3))}catch(e){console.log(e)}}),v.value=!1}function k(){b.value=!b.value}return(S,e)=>(w(),I("div",null,[b.value?C("",!0):(w(),U(K,{key:0,class:"q-gutter-md q-mx-xl",ref_key:"myForm",ref:g,onSubmit:F},{default:m(()=>[re,r(P,{id:"email",type:"email",rounded:"",dense:"",outlined:"",modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=o=>n.value=o),label:"Ingresa tu correo electr\xF3nico",rules:[o=>o&&o.length>0||"Ingrese un correo electr\xF3nico v\xE1lido"]},{prepend:m(()=>[r(E,{name:"o_email"})]),_:1},8,["modelValue","rules"]),se,r(P,{id:"password",type:s.value?"password":"text",rounded:"",dense:"",outlined:"",modelValue:_.value,"onUpdate:modelValue":e[2]||(e[2]=o=>_.value=o),label:"Ingresa tu contrase\xF1a",rules:[o=>o&&o.length>0||"Ingrese una contrase\xF1a v\xE1lida"]},{prepend:m(()=>[r(E,{name:"o_lock"})]),append:m(()=>[r(E,{name:s.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:e[1]||(e[1]=o=>s.value=!s.value)},null,8,["name"])]),_:1},8,["type","modelValue","rules"]),q(t)?(w(),I("div",le,[r(N,{"inline-actions":"",class:"text-white bg-red text-bold text-center"},{default:m(()=>[R(D(q(t)),1)]),_:1})])):C("",!0),y("div",ie,[r(j,{flat:"",class:"text-primary",onClick:k},{default:m(()=>[R("\xBFHas olvidado tu contrase\xF1a?")]),_:1})]),y("div",ue,[r(j,{label:"Iniciar Sesi\xF3n",rounded:"",type:"submit",color:"primary"})])]),_:1},512)),b.value?(w(),U(K,{key:1,class:"q-gutter-md q-mx-xl",ref_key:"myFormRecovery",ref:i,onSubmit:B},{default:m(()=>[ce,r(P,{id:"email",type:"email",rounded:"",dense:"",outlined:"",modelValue:d.value,"onUpdate:modelValue":e[3]||(e[3]=o=>d.value=o),label:"Ingresa tu correo electr\xF3nico",rules:[o=>o&&o.length>0||"Ingrese un correo electr\xF3nico v\xE1lido"]},{prepend:m(()=>[r(E,{name:"o_email"})]),_:1},8,["modelValue","rules"]),q(u)?(w(),I("div",de,[r(N,{"inline-actions":"",class:"text-white bg-primary text-bold text-center"},{default:m(()=>[R(D(q(u)),1)]),_:1})])):C("",!0),q(t)?(w(),I("div",fe,[r(N,{"inline-actions":"",class:"text-white bg-red text-bold text-center"},{default:m(()=>[R(D(q(t)),1)]),_:1})])):C("",!0),y("div",me,[r(j,{label:"Enviar",rounded:"",type:"submit",color:"primary",style:{width:"200px"},class:"q-mb-md"}),r(j,{label:"Regresar",outline:"",rounded:"",onClick:k,color:"primary",style:{width:"200px"}})])]),_:1},512)):C("",!0)]))}});export{he as default};
