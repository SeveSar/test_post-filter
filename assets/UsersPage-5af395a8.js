import{l as h,V as w}from"./lodash-9bb93e56.js";import{a as C}from"./index-7c73d981.js";import{e as U,f as t,u as V,g as b,h as m,o as v,c as D,i as x,j as B,_ as E}from"./index-bf54e006.js";const I={class:"users-page"},N=U({__name:"UsersPage",setup(R){const l=t(null),r=t({name:"",id:"",username:"",email:"",phone:"",website:""}),_=V(),u=t({perPage:5,totalCount:10}),n=t(1),o=t(""),s=t("asc"),c=t([{key:"id",title:"ID"},{key:"name",title:"Name"},{key:"username",title:"Username"},{key:"email",title:"Email"},{key:"phone",title:"Phone"},{key:"website",title:"Website"}]),d=b(()=>c.value.map(e=>({key:e.key,placeholder:e.title}))),i=async()=>{const e={filters:r.value,sorts:{sortColumn:o.value,sortDirection:s.value},pagination:{limit:u.value.perPage,currentPage:n.value}};try{const{total:a,data:P}=await C.users.getUsers(e);l.value=P,u.value.totalCount=+a}catch(a){console.error(a)}},g=e=>{n.value=e,i()},f=({value:e,key:a})=>{n.value=1,r.value[a]=e},k=e=>{o.value===e?s.value=s.value==="asc"?"desc":"asc":(o.value=e,s.value="asc")},y=e=>{_.push({name:"User",params:{id:e}})};i();const p=h.debounce(i,400);return m(r,p,{deep:!0}),m(()=>[o,s],p,{deep:!0}),(e,a)=>(v(),D("div",I,[l.value?(v(),x(w,{key:0,class:"users-page__table",paginationView:u.value,currentPage:n.value,columns:c.value,filtersView:d.value,sortColumn:o.value,sortDirection:s.value,items:l.value,filters:r.value,"onUpdate:currentPage":g,"onUpdate:filterValue":f,onClickRow:y,onClickSortKey:k},null,8,["paginationView","currentPage","columns","filtersView","sortColumn","sortDirection","items","filters"])):B("",!0)]))}});const F=E(N,[["__scopeId","data-v-d46077f9"]]);export{F as default};
