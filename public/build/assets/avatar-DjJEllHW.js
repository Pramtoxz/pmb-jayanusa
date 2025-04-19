import{c as u,a as v}from"./utils-DxLRVXYz.js";import{r as i,j as c}from"./app-B5vBWpQX.js";import{c as S,d as _,f as p}from"./index-D5u2bwdo.js";import{P as f}from"./index-ahYbua_l.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],z=u("ChevronRight",L);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]],T=u("ClipboardCheck",w);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],U=u("Users",I);var m="Avatar",[N,H]=S(m),[b,h]=N(m),A=i.forwardRef((a,e)=>{const{__scopeAvatar:n,...t}=a,[o,r]=i.useState("idle");return c.jsx(b,{scope:n,imageLoadingStatus:o,onImageLoadingStatusChange:r,children:c.jsx(f.span,{...t,ref:e})})});A.displayName=m;var x="AvatarImage",k=i.forwardRef((a,e)=>{const{__scopeAvatar:n,src:t,onLoadingStatusChange:o=()=>{},...r}=a,d=h(x,n),s=R(t,r.referrerPolicy),l=_(g=>{o(g),d.onImageLoadingStatusChange(g)});return p(()=>{s!=="idle"&&l(s)},[s,l]),s==="loaded"?c.jsx(f.img,{...r,ref:e,src:t}):null});k.displayName=x;var y="AvatarFallback",C=i.forwardRef((a,e)=>{const{__scopeAvatar:n,delayMs:t,...o}=a,r=h(y,n),[d,s]=i.useState(t===void 0);return i.useEffect(()=>{if(t!==void 0){const l=window.setTimeout(()=>s(!0),t);return()=>window.clearTimeout(l)}},[t]),d&&r.imageLoadingStatus!=="loaded"?c.jsx(f.span,{...o,ref:e}):null});C.displayName=y;function R(a,e){const[n,t]=i.useState("idle");return p(()=>{if(!a){t("error");return}let o=!0;const r=new window.Image,d=s=>()=>{o&&t(s)};return t("loading"),r.onload=d("loaded"),r.onerror=d("error"),r.src=a,e&&(r.referrerPolicy=e),()=>{o=!1}},[a,e]),n}var j=A,M=k,E=C;function V({className:a,...e}){return c.jsx(j,{"data-slot":"avatar",className:v("relative flex size-8 shrink-0 overflow-hidden rounded-full",a),...e})}function B({className:a,...e}){return c.jsx(M,{"data-slot":"avatar-image",className:v("aspect-square size-full",a),...e})}function G({className:a,...e}){return c.jsx(E,{"data-slot":"avatar-fallback",className:v("bg-muted flex size-full items-center justify-center rounded-full",a),...e})}export{V as A,z as C,U,B as a,G as b,T as c};
