var Me=Object.defineProperty,Be=Object.defineProperties;var De=Object.getOwnPropertyDescriptors;var de=Object.getOwnPropertySymbols;var Ne=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable;var ve=(l,t,e)=>t in l?Me(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e,X=(l,t)=>{for(var e in t||(t={}))Ne.call(t,e)&&ve(l,e,t[e]);if(de)for(var e of de(t))Ee.call(t,e)&&ve(l,e,t[e]);return l},Y=(l,t)=>Be(l,De(t));import{r as I,o as a,e as c,a as $,k as y,q as P,s as p,x as pe,m as n,F as B,g as R,b as g,t as T,y as w,z as W,A as J,c as C,w as M,B as he,C as x,d as j,D as U,E as Ie,G as Pe,H as Re,I as Q,J as Z,K as H,L as V,M as _e,N as fe,u as me,l as D,T as be,O,P as He,f as G,Q as K,R as Ae,S as Oe,U as ee,V as ge,W as ke,i as ze,X as $e,n as Fe,Y as q,Z as te,_ as We,$ as je,a0 as Ue,a1 as Ve}from"./app.1ea428fb.js";import{_ as Ge}from"./plugin-vue_export-helper.21dcd24c.js";const Ke={},qe={class:"theme-default-content custom"};function Xe(l,t){const e=I("Content");return a(),c("div",qe,[$(e)])}var Ye=Ge(Ke,[["render",Xe]]);const Je={key:0,class:"features"},Qe=y({setup(l){const t=P(),e=p(()=>pe(t.value.features)?t.value.features:[]);return(i,o)=>n(e).length?(a(),c("div",Je,[(a(!0),c(B,null,R(n(e),_=>(a(),c("div",{key:_.title,class:"feature"},[g("h2",null,T(_.title),1),g("p",null,T(_.details),1)]))),128))])):w("",!0)}}),Ze=["innerHTML"],et=["textContent"],tt=y({setup(l){const t=P(),e=p(()=>t.value.footer),i=p(()=>t.value.footerHtml);return(o,_)=>n(e)?(a(),c(B,{key:0},[n(i)?(a(),c("div",{key:0,class:"footer",innerHTML:n(e)},null,8,Ze)):(a(),c("div",{key:1,class:"footer",textContent:T(n(e))},null,8,et))],64)):w("",!0)}}),nt=["href","rel","target","aria-label"],at=y({inheritAttrs:!1}),E=y(Y(X({},at),{props:{item:{type:Object,required:!0}},setup(l){const t=l,e=W(),i=Re(),{item:o}=J(t),_=p(()=>U(o.value.link)),f=p(()=>Ie(o.value.link)||Pe(o.value.link)),h=p(()=>{if(!f.value){if(o.value.target)return o.value.target;if(_.value)return"_blank"}}),s=p(()=>h.value==="_blank"),r=p(()=>!_.value&&!f.value&&!s.value),u=p(()=>{if(!f.value){if(o.value.rel)return o.value.rel;if(s.value)return"noopener noreferrer"}}),d=p(()=>o.value.ariaLabel||o.value.text),v=p(()=>{const L=Object.keys(i.value.locales);return L.length?!L.some(m=>m===o.value.link):o.value.link!=="/"}),b=p(()=>v.value?e.path.startsWith(o.value.link):!1),k=p(()=>r.value?o.value.activeMatch?new RegExp(o.value.activeMatch).test(e.path):b.value:!1);return(L,m)=>{const S=I("RouterLink"),N=I("ExternalLinkIcon");return n(r)?(a(),C(S,he({key:0,class:{"router-link-active":n(k)},to:n(o).link,"aria-label":n(d)},L.$attrs),{default:M(()=>[x(L.$slots,"before"),j(" "+T(n(o).text)+" ",1),x(L.$slots,"after")]),_:3},16,["class","to","aria-label"])):(a(),c("a",he({key:1,class:"external-link",href:n(o).link,rel:n(u),target:n(h),"aria-label":n(d)},L.$attrs),[x(L.$slots,"before"),j(" "+T(n(o).text)+" ",1),n(s)?(a(),C(N,{key:0})):w("",!0),x(L.$slots,"after")],16,nt))}}})),st={class:"hero"},ot={key:0,id:"main-title"},rt={key:1,class:"description"},lt={key:2,class:"actions"},ut=y({setup(l){const t=P(),e=Q(),i=Z(),o=p(()=>i.value&&t.value.heroImageDark!==void 0?t.value.heroImageDark:t.value.heroImage),_=p(()=>t.value.heroText===null?null:t.value.heroText||e.value.title||"Hello"),f=p(()=>t.value.heroAlt||_.value||"hero"),h=p(()=>t.value.tagline===null?null:t.value.tagline||e.value.description||"Welcome to your VuePress site"),s=p(()=>pe(t.value.actions)?t.value.actions.map(({text:u,link:d,type:v="primary"})=>({text:u,link:d,type:v})):[]),r=()=>{if(!o.value)return null;const u=V("img",{src:_e(o.value),alt:f.value});return t.value.heroImageDark===void 0?u:V(fe,u)};return(u,d)=>(a(),c("header",st,[$(r),n(_)?(a(),c("h1",ot,T(n(_)),1)):w("",!0),n(h)?(a(),c("p",rt,T(n(h)),1)):w("",!0),n(s).length?(a(),c("p",lt,[(a(!0),c(B,null,R(n(s),v=>(a(),C(E,{key:v.text,class:H(["action-button",[v.type]]),item:v},null,8,["class","item"]))),128))])):w("",!0)]))}}),it={class:"home"},ct=y({setup(l){return(t,e)=>(a(),c("main",it,[$(ut),$(Qe),$(Ye),$(tt)]))}}),dt=y({setup(l){const t=me(),e=Q(),i=D(),o=Z(),_=p(()=>i.value.home||t.value),f=p(()=>e.value.title),h=p(()=>o.value&&i.value.logoDark!==void 0?i.value.logoDark:i.value.logo),s=()=>{if(!h.value)return null;const r=V("img",{class:"logo",src:_e(h.value),alt:f.value});return i.value.logoDark===void 0?r:V(fe,r)};return(r,u)=>{const d=I("RouterLink");return a(),C(d,{to:n(_)},{default:M(()=>[$(s),n(f)?(a(),c("span",{key:0,class:H(["site-name",{"can-hide":n(h)}])},T(n(f)),3)):w("",!0)]),_:1},8,["to"])}}}),Le=y({setup(l){const t=i=>{i.style.height=i.scrollHeight+"px"},e=i=>{i.style.height=""};return(i,o)=>(a(),C(be,{name:"dropdown",onEnter:t,onAfterEnter:e,onBeforeLeave:t},{default:M(()=>[x(i.$slots,"default")]),_:3}))}}),vt=["aria-label"],pt={class:"title"},ht=g("span",{class:"arrow down"},null,-1),_t=["aria-label"],ft={class:"title"},mt={class:"navbar-dropdown"},bt={class:"navbar-dropdown-subtitle"},gt={key:1},kt={class:"navbar-dropdown-subitem-wrapper"},$t=y({props:{item:{type:Object,required:!0}},setup(l){const t=l,{item:e}=J(t),i=p(()=>e.value.ariaLabel||e.value.text),o=O(!1),_=W();He(()=>_.path,()=>{o.value=!1});const f=s=>{s.detail===0?o.value=!o.value:o.value=!1},h=(s,r)=>r[r.length-1]===s;return(s,r)=>(a(),c("div",{class:H(["navbar-dropdown-wrapper",{open:o.value}])},[g("button",{class:"navbar-dropdown-title",type:"button","aria-label":n(i),onClick:f},[g("span",pt,T(n(e).text),1),ht],8,vt),g("button",{class:"navbar-dropdown-title-mobile",type:"button","aria-label":n(i),onClick:r[0]||(r[0]=u=>o.value=!o.value)},[g("span",ft,T(n(e).text),1),g("span",{class:H(["arrow",o.value?"down":"right"])},null,2)],8,_t),$(Le,null,{default:M(()=>[G(g("ul",mt,[(a(!0),c(B,null,R(n(e).children,u=>(a(),c("li",{key:u.text,class:"navbar-dropdown-item"},[u.children?(a(),c(B,{key:0},[g("h4",bt,[u.link?(a(),C(E,{key:0,item:u,onFocusout:d=>h(u,n(e).children)&&u.children.length===0&&(o.value=!1)},null,8,["item","onFocusout"])):(a(),c("span",gt,T(u.text),1))]),g("ul",kt,[(a(!0),c(B,null,R(u.children,d=>(a(),c("li",{key:d.link,class:"navbar-dropdown-subitem"},[$(E,{item:d,onFocusout:v=>h(d,u.children)&&h(u,n(e).children)&&(o.value=!1)},null,8,["item","onFocusout"])]))),128))])],64)):(a(),C(E,{key:1,item:u,onFocusout:d=>h(u,n(e).children)&&(o.value=!1)},null,8,["item","onFocusout"]))]))),128))],512),[[K,o.value]])]),_:1})],2))}}),ye=l=>decodeURI(l).replace(/#.*$/,"").replace(/(index)?\.(md|html)$/,""),Lt=(l,t)=>{if(t.hash===l)return!0;const e=ye(t.path),i=ye(l);return e===i},we=(l,t)=>l.link&&Lt(l.link,t)?!0:l.children?l.children.some(e=>we(e,t)):!1,xe=l=>!U(l)||/github\.com/.test(l)?"GitHub":/bitbucket\.org/.test(l)?"Bitbucket":/gitlab\.com/.test(l)?"GitLab":/gitee\.com/.test(l)?"Gitee":null,yt={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},wt=({docsRepo:l,editLinkPattern:t})=>{if(t)return t;const e=xe(l);return e!==null?yt[e]:null},xt=({docsRepo:l,docsBranch:t,docsDir:e,filePathRelative:i,editLinkPattern:o})=>{if(!i)return null;const _=wt({docsRepo:l,editLinkPattern:o});return _?_.replace(/:repo/,U(l)?l:`https://github.com/${l}`).replace(/:branch/,t).replace(/:path/,Ae(`${Oe(e)}/${i}`)):null},Ct={key:0,class:"navbar-items"},Ce=y({setup(l){const t=()=>{const r=ee(),u=me(),d=Q(),v=D();return p(()=>{var S,N;const b=Object.keys(d.value.locales);if(b.length<2)return[];const k=r.currentRoute.value.path,L=r.currentRoute.value.fullPath;return[{text:(S=v.value.selectLanguageText)!=null?S:"unknown language",ariaLabel:(N=v.value.selectLanguageAriaLabel)!=null?N:"unkown language",children:b.map(A=>{var se,oe,re,le,ue,ie;const z=(oe=(se=d.value.locales)==null?void 0:se[A])!=null?oe:{},ne=(le=(re=v.value.locales)==null?void 0:re[A])!=null?le:{},ae=`${z.lang}`,Te=(ue=ne.selectLanguageName)!=null?ue:ae;let F;if(ae===d.value.lang)F=L;else{const ce=k.replace(u.value,A);r.getRoutes().some(Se=>Se.path===ce)?F=ce:F=(ie=ne.home)!=null?ie:A}return{text:Te,link:F}})}]})},e=()=>{const r=D(),u=p(()=>r.value.repo),d=p(()=>u.value?xe(u.value):null),v=p(()=>u.value&&!U(u.value)?`https://github.com/${u.value}`:u.value),b=p(()=>v.value?r.value.repoLabel?r.value.repoLabel:d.value===null?"Source":d.value:null);return p(()=>!v.value||!b.value?[]:[{text:b.value,link:v.value}])},i=r=>ge(r)?ke(r):r.children?Y(X({},r),{children:r.children.map(i)}):r,_=(()=>{const r=D();return p(()=>(r.value.navbar||[]).map(i))})(),f=t(),h=e(),s=p(()=>[..._.value,...f.value,...h.value]);return(r,u)=>n(s).length?(a(),c("nav",Ct,[(a(!0),c(B,null,R(n(s),d=>(a(),c("div",{key:d.text,class:"navbar-item"},[d.children?(a(),C($t,{key:0,item:d},null,8,["item"])):(a(),C(E,{key:1,item:d},null,8,["item"]))]))),128))])):w("",!0)}}),Tt=["title"],St={class:"icon",focusable:"false",viewBox:"0 0 32 32"},Mt=ze('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>',9),Bt=[Mt],Dt={class:"icon",focusable:"false",viewBox:"0 0 32 32"},Nt=g("path",{d:"M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",fill:"currentColor"},null,-1),Et=[Nt],It=y({setup(l){const t=D(),e=Z(),i=()=>{e.value=!e.value};return(o,_)=>(a(),c("button",{class:"toggle-dark-button",title:n(t).toggleDarkMode,onClick:i},[G((a(),c("svg",St,Bt,512)),[[K,!n(e)]]),G((a(),c("svg",Dt,Et,512)),[[K,n(e)]])],8,Tt))}}),Pt=["title"],Rt=g("div",{class:"icon","aria-hidden":"true"},[g("span"),g("span"),g("span")],-1),Ht=[Rt],At=y({emits:["toggle"],setup(l){const t=D();return(e,i)=>(a(),c("div",{class:"toggle-sidebar-button",title:n(t).toggleSidebar,"aria-expanded":"false",role:"button",tabindex:"0",onClick:i[0]||(i[0]=o=>e.$emit("toggle"))},Ht,8,Pt))}}),Ot=y({emits:["toggle-sidebar"],setup(l){const t=D(),e=O(null),i=O(null),o=O(0),_=p(()=>o.value?{maxWidth:o.value+"px"}:{}),f=p(()=>t.value.darkMode);$e(()=>{const s=719,r=h(e.value,"paddingLeft")+h(e.value,"paddingRight"),u=()=>{var d;window.innerWidth<=s?o.value=0:o.value=e.value.offsetWidth-r-(((d=i.value)==null?void 0:d.offsetWidth)||0)};u(),window.addEventListener("resize",u,!1),window.addEventListener("orientationchange",u,!1)});function h(s,r){var v,b,k;const u=(k=(b=(v=s==null?void 0:s.ownerDocument)==null?void 0:v.defaultView)==null?void 0:b.getComputedStyle(s,null))==null?void 0:k[r],d=Number.parseInt(u,10);return Number.isNaN(d)?0:d}return(s,r)=>{const u=I("NavbarSearch");return a(),c("header",{ref_key:"navbar",ref:e,class:"navbar"},[$(At,{onToggle:r[0]||(r[0]=d=>s.$emit("toggle-sidebar"))}),g("span",{ref_key:"navbarBrand",ref:i},[$(dt)],512),g("div",{class:"navbar-items-wrapper",style:Fe(n(_))},[x(s.$slots,"before"),$(Ce,{class:"can-hide"}),x(s.$slots,"after"),n(f)?(a(),C(It,{key:0})):w("",!0),$(u)],4)],512)}}}),zt={class:"page-meta"},Ft={key:0,class:"meta-item edit-link"},Wt={key:1,class:"meta-item last-updated"},jt={class:"meta-item-label"},Ut={class:"meta-item-info"},Vt={key:2,class:"meta-item contributors"},Gt={class:"meta-item-label"},Kt={class:"meta-item-info"},qt=["title"],Xt=j(", "),Yt=y({setup(l){const t=()=>{const s=D(),r=q(),u=P();return p(()=>{var N,A,z;if(!((A=(N=u.value.editLink)!=null?N:s.value.editLink)!=null?A:!0))return null;const{repo:v,docsRepo:b=v,docsBranch:k="main",docsDir:L="",editLinkText:m}=s.value;if(!b)return null;const S=xt({docsRepo:b,docsBranch:k,docsDir:L,filePathRelative:r.value.filePathRelative,editLinkPattern:(z=u.value.editLinkPattern)!=null?z:s.value.editLinkPattern});return S?{text:m!=null?m:"Edit this page",link:S}:null})},e=()=>{const s=D(),r=q(),u=P();return p(()=>{var b,k,L,m;return!((k=(b=u.value.lastUpdated)!=null?b:s.value.lastUpdated)!=null?k:!0)||!((L=r.value.git)==null?void 0:L.updatedTime)?null:new Date((m=r.value.git)==null?void 0:m.updatedTime).toLocaleString()})},i=()=>{const s=D(),r=q(),u=P();return p(()=>{var v,b,k,L;return((b=(v=u.value.contributors)!=null?v:s.value.contributors)!=null?b:!0)&&(L=(k=r.value.git)==null?void 0:k.contributors)!=null?L:null})},o=D(),_=t(),f=e(),h=i();return(s,r)=>{const u=I("ClientOnly");return a(),c("footer",zt,[n(_)?(a(),c("div",Ft,[$(E,{class:"meta-item-label",item:n(_)},null,8,["item"])])):w("",!0),n(f)?(a(),c("div",Wt,[g("span",jt,T(n(o).lastUpdatedText)+": ",1),$(u,null,{default:M(()=>[g("span",Ut,T(n(f)),1)]),_:1})])):w("",!0),n(h)&&n(h).length?(a(),c("div",Vt,[g("span",Gt,T(n(o).contributorsText)+": ",1),g("span",Kt,[(a(!0),c(B,null,R(n(h),(d,v)=>(a(),c(B,{key:v},[g("span",{class:"contributor",title:`email: ${d.email}`},T(d.name),9,qt),v!==n(h).length-1?(a(),c(B,{key:0},[Xt],64)):w("",!0)],64))),128))])])):w("",!0)])}}}),Jt={key:0,class:"page-nav"},Qt={class:"inner"},Zt={key:0,class:"prev"},en={key:1,class:"next"},tn=y({setup(l){const t=s=>s===!1?null:ge(s)?ke(s):We(s)?s:!1,e=(s,r,u)=>{const d=s.findIndex(v=>v.link===r);if(d!==-1){const v=s[d+u];return(v==null?void 0:v.link)?v:null}for(const v of s)if(v.children){const b=e(v.children,r,u);if(b)return b}return null},i=P(),o=te(),_=W(),f=p(()=>{const s=t(i.value.prev);return s!==!1?s:e(o.value,_.path,-1)}),h=p(()=>{const s=t(i.value.next);return s!==!1?s:e(o.value,_.path,1)});return(s,r)=>n(f)||n(h)?(a(),c("nav",Jt,[g("p",Qt,[n(f)?(a(),c("span",Zt,[$(E,{item:n(f)},null,8,["item"])])):w("",!0),n(h)?(a(),c("span",en,[$(E,{item:n(h)},null,8,["item"])])):w("",!0)])])):w("",!0)}}),nn={class:"page"},an={class:"theme-default-content"},sn=y({setup(l){return(t,e)=>{const i=I("Content");return a(),c("main",nn,[x(t.$slots,"top"),g("div",an,[$(i)]),$(Yt),$(tn),x(t.$slots,"bottom")])}}}),on={class:"sidebar-item-children"},rn=y({props:{item:{type:Object,required:!0},depth:{type:Number,required:!1,default:0}},setup(l){const t=l,{item:e,depth:i}=J(t),o=W(),_=ee(),f=p(()=>we(e.value,o)),h=p(()=>({"sidebar-item":!0,"sidebar-heading":i.value===0,active:f.value,collapsible:e.value.collapsible})),s=O(!0),r=O(void 0);return e.value.collapsible&&(s.value=f.value,r.value=()=>{s.value=!s.value},_.afterEach(()=>{s.value=f.value})),(u,d)=>{var b;const v=I("SidebarItem",!0);return a(),c("li",null,[n(e).link?(a(),C(E,{key:0,class:H(n(h)),item:n(e)},null,8,["class","item"])):(a(),c("p",{key:1,tabindex:"0",class:H(n(h)),onClick:d[0]||(d[0]=(...k)=>r.value&&r.value(...k)),onKeydown:d[1]||(d[1]=je((...k)=>r.value&&r.value(...k),["enter"]))},[j(T(n(e).text)+" ",1),n(e).collapsible?(a(),c("span",{key:0,class:H(["arrow",s.value?"down":"right"])},null,2)):w("",!0)],34)),((b=n(e).children)==null?void 0:b.length)?(a(),C(Le,{key:2},{default:M(()=>[G(g("ul",on,[(a(!0),c(B,null,R(n(e).children,k=>(a(),C(v,{key:`${n(i)}${k.text}${k.link}`,item:k,depth:n(i)+1},null,8,["item","depth"]))),128))],512),[[K,s.value]])]),_:1})):w("",!0)])}}}),ln={key:0,class:"sidebar-items"},un=y({setup(l){const t=te();return(e,i)=>n(t).length?(a(),c("ul",ln,[(a(!0),c(B,null,R(n(t),o=>(a(),C(rn,{key:o.link||o.text,item:o},null,8,["item"]))),128))])):w("",!0)}}),cn={class:"sidebar"},dn=y({setup(l){return(t,e)=>(a(),c("aside",cn,[$(Ce),x(t.$slots,"top"),$(un),x(t.$slots,"bottom")]))}}),vn=y({setup(l){const t=q(),e=P(),i=D(),o=p(()=>e.value.navbar!==!1&&i.value.navbar!==!1),_=te(),f=O(!1),h=m=>{f.value=typeof m=="boolean"?m:!f.value},s={x:0,y:0},r=m=>{s.x=m.changedTouches[0].clientX,s.y=m.changedTouches[0].clientY},u=m=>{const S=m.changedTouches[0].clientX-s.x,N=m.changedTouches[0].clientY-s.y;Math.abs(S)>Math.abs(N)&&Math.abs(S)>40&&(S>0&&s.x<=80?h(!0):h(!1))},d=p(()=>[{"no-navbar":!o.value,"no-sidebar":!_.value.length,"sidebar-open":f.value},e.value.pageClass]);let v;$e(()=>{v=ee().afterEach(()=>{h(!1)})}),Ue(()=>{v()});const b=Ve(),k=b.resolve,L=b.pending;return(m,S)=>(a(),c("div",{class:H(["theme-container",n(d)]),onTouchstart:r,onTouchend:u},[x(m.$slots,"navbar",{},()=>[n(o)?(a(),C(Ot,{key:0,onToggleSidebar:h},{before:M(()=>[x(m.$slots,"navbar-before")]),after:M(()=>[x(m.$slots,"navbar-after")]),_:3})):w("",!0)]),g("div",{class:"sidebar-mask",onClick:S[0]||(S[0]=N=>h(!1))}),x(m.$slots,"sidebar",{},()=>[$(dn,null,{top:M(()=>[x(m.$slots,"sidebar-top")]),bottom:M(()=>[x(m.$slots,"sidebar-bottom")]),_:3})]),x(m.$slots,"page",{},()=>[n(e).home?(a(),C(ct,{key:0})):(a(),C(be,{key:1,name:"fade-slide-y",mode:"out-in",onBeforeEnter:n(k),onBeforeLeave:n(L)},{default:M(()=>[(a(),C(sn,{key:n(t).path},{top:M(()=>[x(m.$slots,"page-top")]),bottom:M(()=>[x(m.$slots,"page-bottom")]),_:3}))]),_:3},8,["onBeforeEnter","onBeforeLeave"]))])],34))}});const pn={mounted(){const l=["\u548B\u8FD8\u8D70\u4E86\u5462\uFF1F","\u4F60\u5FEB\u56DE\u6765\u5440\uFF01","\u7530\u56ED\u5C06\u829C\uFF0C\u80E1\u4E0D\u5F52\uFF1F","\u8F7B\u8F7B\u5730\u4F60\u8D70\u4E86","\u541B\u95EE\u5F52\u671F\u672A\u6709\u671F\uFF0C\u5DF4\u5C71\u591C\u96E8\u6DA8\u79CB\u6C60","\u5C0F\u6837\uFF0C\u6211\u770B\u4F60\u5F80\u54EA\u91CC\u8DD1","< (\uFF40^\u2032) >"];document.addEventListener("visibilitychange",t=>{if(document.visibilityState==="hidden"){window._cuurentTitle=document.title;let e=Math.floor(Math.random()*l.length);document.title=l[e]}else document.title=window._cuurentTitle})}},mn=Object.assign(pn,{setup(l){return(t,e)=>(a(),C(vn))}});export{mn as default};
