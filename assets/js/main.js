(() => {
 'use strict';
 const burger=document.querySelector('.nav-burger'),nav=document.querySelector('.nav-links');
 burger?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');burger.setAttribute('aria-expanded',String(open));});
 const overlay=document.querySelector('.search-overlay'),input=document.querySelector('#search-input'),results=document.querySelector('#search-results');
 const script=document.querySelector('script[src$="assets/js/main.js"]');
 const root=new URL('../../',script.src);
 const pages=[['Shop','shop.html','Transmission bushings and visor hangers'],['Visor Quick-Release Hanger','visor-wheel-hanger.html','Set of two · $15 pickup · black ASA, pink ASA, silver ABS'],['Transmission Mount Bushing Set','transmission-mount-bushing.html','BRZ FR-S 86 GR86 · TPU 95A and 72D · Etsy and eBay'],['Pricing guide','pricing.html','Materials, labor and printing estimate'],['Equipment','equipment.html','Bambu Lab H2C H2S A1 P1P X2D and Revopoint MetroY Pro scanner'],['Build blog','blog.html','Projects, S13 cupholder and BRZ'],['FBM Turbo BRZ','blog/fbm-turbo-brz.html','Daily driver and drift build']];
 let previous;
 function render(){const q=input.value.toLowerCase().trim();results.replaceChildren();for(const [title,path,desc] of pages.filter(p=>p.join(' ').toLowerCase().includes(q))){const a=document.createElement('a');a.href=new URL(path,root);const t=document.createElement('div');t.className='search-result-title';t.textContent=title;const d=document.createElement('div');d.className='search-result-snippet';d.textContent=desc;a.append(t,d);results.append(a);}if(!results.children.length){const p=document.createElement('p');p.className='search-empty';p.textContent='No matching pages. Try a product, material or printer name.';results.append(p);}}
 function close(){overlay?.classList.remove('is-open');previous?.focus();}
 if(overlay){overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Search NeoCAD');}
 document.querySelectorAll('[data-search-open]').forEach(b=>b.addEventListener('click',()=>{previous=b;overlay.classList.add('is-open');render();input.focus();}));
 input?.addEventListener('input',render);document.querySelector('.search-close')?.addEventListener('click',close);
 overlay?.addEventListener('click',e=>{if(e.target===overlay)close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(overlay?.classList.contains('is-open'))close();nav?.classList.remove('is-open');burger?.setAttribute('aria-expanded','false');}if(e.key==='Tab'&&overlay?.classList.contains('is-open')){const all=[...overlay.querySelectorAll('input,button,a[href]')];const first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
})();
