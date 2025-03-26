function p(n,t){let e=document.createElement("template");e.innerHTML=t.trim();let i=e.content.firstElementChild,r=i.querySelectorAll("script");x(r),v(n.parentElement,n,i)}function x(n){n.forEach(t=>{let e=document.createElement("script");e.type=t.type||"text/javascript",t.src?e.src=t.src:e.textContent=t.textContent,document.head.appendChild(e),document.head.removeChild(e)})}function v(n,t,e){if(!t||t.nodeName!==e.nodeName){t&&t._x_dataStack&&Alpine.destroyTree(t),n.replaceChild(e,t||null);return}if(t.nodeType===Node.TEXT_NODE&&t.textContent!==e.textContent){t.textContent=e.textContent;return}if(t.nodeType===Node.ELEMENT_NODE&&t.hasAttribute("x-data")&&t.getAttribute("x-data")!==e.getAttribute("x-data")){Alpine.destroyTree(t),n.replaceChild(e,t);return}if(t.nodeType===Node.ELEMENT_NODE){let a=Array.from(t.attributes);if(Array.from(e.attributes).forEach(o=>{t.getAttribute(o.name)!==o.value&&t.setAttribute(o.name,o.value)}),a.forEach(o=>{let d=a.some(m=>{let h=m.name.match(/^(x-bind:|:)(.+)$/);return h&&h[2]===o.name});!e.hasAttribute(o.name)&&!d&&!(o.name==="style"&&a.some(m=>m.name==="x-show"))&&t.removeAttribute(o.name)}),a.some(o=>["x-text","x-html"].includes(o.name)))return}let i=Array.from(t.childNodes),r=Array.from(e.childNodes);for(;i.length>r.length;){let a=i.pop();a._x_dataStack&&Alpine.destroyTree(a),t.removeChild(a)}r.forEach((a,c)=>{i[c]?v(t,i[c],a):t.appendChild(a)})}function f(n){console.error("FireLine failed:",n),document.dispatchEvent(window.FireLine.events.error),window.FireLine.context.loading=!1}function u(n){try{L(n)}catch(t){f(t)}}function L(n){let t=document.querySelector(window.FireLine.settings.targetEl);if(!t)throw new Error("Router target element not found.");p(t,n)}async function w(n,t="get",e=null){if(!window.FireLine.context.loading){document.dispatchEvent(window.FireLine.events.start),window.FireLine.redirectedUrl=void 0,window.FireLine.context.loading=!0;try{let i=await fetch(n,{method:t,headers:{Accept:"application/json"},body:e,signal:AbortSignal.timeout(1e3*window.FireLine.settings.timeout)});if(!i.ok)throw new Error("Failed to complete the FireLine request.");if(!i.url.endsWith(n)){let r=new URL(i.url);window.location.origin===r.origin&&(window.history.pushState({},"",r),window.FireLine.redirectedUrl=r,document.dispatchEvent(window.FireLine.events.navigate))}return await i.json().catch(r=>f(r))}catch(i){f(i)}}}function s(n,t=!0){w(n).then(e=>{if(!e)return;let{html:i,title:r}=e;r&&(document.title=r),u(i),Alpine.nextTick(()=>{t&&window.FireLine.redirectedUrl===void 0&&window.history.pushState({},"",n),window.FireLine.context.current=window.location.href,document.dispatchEvent(window.FireLine.events.end),window.FireLine.redirectedUrl===void 0&&document.dispatchEvent(window.FireLine.events.navigate),window.FireLine.context.loading=!1})})}function l(n){w(n.getAttribute("action"),n.getAttribute("method"),new FormData(n)).then(t=>{if(t){if(t.status&&t.status==="success"&&n.reset(),t.redirect)window.location.href=t.redirect;else if(t.navigate){window.FireLine.context.loading=!1,s(t.navigate);return}else if(t.status&&t.message)for(let e of n.children)e.attributes.status&&(e.attributes.status.nodeValue===t.status?(e.textContent=t.message,e.style.display="block"):(e.textContent="",e.style.display="none"));else t.html&&(t.title&&(document.title=t.title),n.reset(),u(t.html));Alpine.nextTick(()=>{document.dispatchEvent(window.FireLine.events.end),window.FireLine.context.loading=!1})}})}var g=n=>{let t=n.reactive({version:"1.0.0",name:"fireline",events:{start:new Event("fireStart"),end:new Event("fireEnd"),error:new Event("fireError"),navigate:new Event("fireNavigate")},settings:{targetEl:"#app > div",timeout:30,interceptLinks:!0,interceptForms:!0},context:{current:window.location.href,loading:!1,redirectedUrl:void 0,navigate:e=>s(e),reload:()=>s(window.location.href),replaceHtml:e=>u(e),formSubmit:e=>l(e)}});window.FireLine=t,n.fire=t.context,n.magic("fire",()=>t.context),n.directive("navigate",(e,{expression:i},{evaluate:r,cleanup:a})=>{let c=o=>{o.preventDefault();let d=e.getAttribute("href");d&&(i&&r(i),s(d))};e.addEventListener("click",c),a(()=>{e.removeEventListener("click",c)})}),n.directive("submit",(e,{expression:i},{evaluate:r,cleanup:a})=>{let c=o=>{o.preventDefault(),i&&r(i),l(e)};e.addEventListener("submit",c),a(()=>{e.removeEventListener("submit",c)})}),window.addEventListener("popstate",()=>s(window.location.href,!1)),window.addEventListener("pageshow",e=>e.persisted&&window.location.reload()),window.document.body.addEventListener("click",e=>{if(window.FireLine.settings.interceptLinks===!1)return;let i=e.target.closest("a");if(i&&!i.hasAttribute("native")&&!i.hasAttribute("x-navigate")&&i.target!=="_blank"&&i.hostname===window.location.hostname){e.preventDefault();let r=i.getAttribute("href");if(!r)return;s(r)}}),window.document.body.addEventListener("submit",e=>{if(window.FireLine.settings.interceptForms===!1)return;let i=e.target.closest("form");i&&!i.hasAttribute("native")&&!i.hasAttribute("x-submit")&&i.action.startsWith(window.location.origin)&&(e.preventDefault(),l(i))})};var _=g;export{_ as default};
