import{a as n}from"./index-7c73d981.js";import{e as p,k as v,f as d,l as m,o as c,c as i,a as e,t as a,i as g,j as h,p as f,m as w,_ as y}from"./index-bf54e006.js";import{N as I}from"./NotFound-345646f8.js";const t=_=>(f("data-v-07ba6423"),_=_(),w(),_),B={class:"user-page"},E={key:0,class:"user-page__card"},k={class:"user-page__card-row"},N=t(()=>e("div",{class:"user-page__card-item"},"ID:",-1)),U={class:"user-page__card-item"},S={class:"user-page__card-row"},b=t(()=>e("div",{class:"user-page__card-item"},"NAME:",-1)),x={class:"user-page__card-item"},P={class:"user-page__card-row"},D=t(()=>e("div",{class:"user-page__card-item"},"EMAIL:",-1)),A={class:"user-page__card-item"},C={class:"user-page__card-row"},M=t(()=>e("div",{class:"user-page__card-item"},"PHONE:",-1)),V={class:"user-page__card-item"},j={class:"user-page__card-row"},F=t(()=>e("div",{class:"user-page__card-item"},"WEBSITE:",-1)),H={class:"user-page__card-item"},L=p({__name:"UserPage",setup(_){const u=v(),s=d(null),o=d(!1),l=async()=>{try{s.value=await n.users.getUserById(+u.params.id),o.value=!1}catch(r){console.error(r),o.value=!0}};return m(()=>{l()}),(r,O)=>(c(),i("div",B,[s.value&&!o.value?(c(),i("div",E,[e("div",k,[N,e("div",U,a(s.value.id),1)]),e("div",S,[b,e("div",x,a(s.value.name),1)]),e("div",P,[D,e("div",A,a(s.value.email),1)]),e("div",C,[M,e("div",V,a(s.value.phone),1)]),e("div",j,[F,e("div",H,a(s.value.website),1)])])):o.value?(c(),g(I,{key:1,title:"User not found"})):h("",!0)]))}});const q=y(L,[["__scopeId","data-v-07ba6423"]]);export{q as default};
