import{a as n}from"./index-a740f847.js";import{d as p,i as v,j as d,q as m,o as c,c as i,g as e,t as a,l as g,m as h,p as f,h as w,_ as y}from"./index-435a39e9.js";import{N as I}from"./NotFound-574e7c7b.js";const t=_=>(f("data-v-07ba6423"),_=_(),w(),_),B={class:"user-page"},E={key:0,class:"user-page__card"},N={class:"user-page__card-row"},U=t(()=>e("div",{class:"user-page__card-item"},"ID:",-1)),k={class:"user-page__card-item"},S={class:"user-page__card-row"},b=t(()=>e("div",{class:"user-page__card-item"},"NAME:",-1)),x={class:"user-page__card-item"},P={class:"user-page__card-row"},D=t(()=>e("div",{class:"user-page__card-item"},"EMAIL:",-1)),A={class:"user-page__card-item"},C={class:"user-page__card-row"},M=t(()=>e("div",{class:"user-page__card-item"},"PHONE:",-1)),V={class:"user-page__card-item"},j={class:"user-page__card-row"},q=t(()=>e("div",{class:"user-page__card-item"},"WEBSITE:",-1)),F={class:"user-page__card-item"},H=p({__name:"UserPage",setup(_){const u=v(),s=d(null),o=d(!1),l=async()=>{try{s.value=await n.users.getUserById(+u.params.id),o.value=!1}catch(r){console.error(r),o.value=!0}};return m(()=>{l()}),(r,L)=>(c(),i("div",B,[s.value&&!o.value?(c(),i("div",E,[e("div",N,[U,e("div",k,a(s.value.id),1)]),e("div",S,[b,e("div",x,a(s.value.name),1)]),e("div",P,[D,e("div",A,a(s.value.email),1)]),e("div",C,[M,e("div",V,a(s.value.phone),1)]),e("div",j,[q,e("div",F,a(s.value.website),1)])])):o.value?(c(),g(I,{key:1,title:"User not found"})):h("",!0)]))}});const W=y(H,[["__scopeId","data-v-07ba6423"]]);export{W as default};
