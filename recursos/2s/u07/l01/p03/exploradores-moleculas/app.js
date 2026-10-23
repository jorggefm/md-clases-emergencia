'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const names={C:'Carbono',H:'Hidrógeno',O:'Oxígeno',N:'Nitrógeno',S:'Azufre',P:'Fósforo'};
const store='2s-exploradores-moleculas-v1';
let data=[], current=0, zoom=1, hintStage=0, loadToken=0, progress={solved:[],last:0}, answers={};
try{progress={...progress,...JSON.parse(localStorage.getItem(store)||'{}')};if(!Array.isArray(progress.solved))progress.solved=[];}catch{}
function save(){try{localStorage.setItem(store,JSON.stringify(progress));}catch{}}
function formula(counts){return ['C','H',...Object.keys(counts).filter(e=>e!=='C'&&e!=='H').sort()].filter(e=>counts[e]>0).map(e=>e+(counts[e]===1?'':`<sub>${counts[e]}</sub>`)).join('')||'—';}
function renderLibrary(filter='Todas'){
 $('#progress').textContent=`${progress.solved.length} de 40 resueltas`;
 $('#filters').innerHTML=['Todas','Inicio','Exploración','Desafío','Experto'].map(x=>`<button class="quiet" aria-pressed="${x===filter}" data-filter="${x}">${x}</button>`).join('');
 $('#library').innerHTML=data.map((m,i)=>filter==='Todas'||m.level===filter?`<button class="molecule-link" data-molecule="${i}"><span class="order">${String(i+1).padStart(2,'0')}</span><span><b>${m.name}</b><small>${m.level} · ${m.category}</small></span>${progress.solved.includes(m.id)?'<span class="done" aria-label="Resuelta">✓</span>':''}</button>`:'').join('');
}
function showHome(){ $('#landing').hidden=false;$('#activity').hidden=true;renderLibrary();$('#resume').hidden=!progress.last;window.scrollTo(0,0);}
function route(){const match=location.hash.match(/^#m-(.+)$/);if(match){const i=data.findIndex(m=>m.id===match[1]);if(i>=0){openMolecule(i);return;}}showHome();}
function go(i){location.hash='m-'+data[Math.max(0,Math.min(data.length-1,i))].id;}
async function openMolecule(i){
 current=i;const m=data[i];const token=++loadToken;progress.last=i;save();zoom=1;hintStage=0;answers={};
 $('#landing').hidden=true;$('#activity').hidden=false;$('#name').textContent=m.name;$('#category').textContent=m.category;$('#level').textContent=`${i+1} / 40 · ${m.level}`;$('#moleculeSelect').value=i;$('#prev').disabled=i===0;$('#next').disabled=i===data.length-1;
 $('#role').textContent=m.role;$('#contextImage').src=`assets/${m.scene}.webp`;$('#contextImage').alt=`Contexto de ${m.name}: ${m.role}`;$('#source').href=m.source;$('#source').textContent=`PubChem · CID ${m.cid} ↗`;
 $('#hintText').hidden=true;$('#stereo').hidden=true;$('#continue').hidden=true;$('#feedback').className='';$('#feedback').innerHTML='<span class="soft">Tu fórmula aparecerá aquí al comprobar.</span>';
 $('#atomInfo').textContent=m.id==='methane'?'En el metano aislado se escribe CH₄: cuenta los símbolos y el subíndice. En los siguientes dibujos verás carbonos implícitos.':'Cada carbono neutro completa cuatro enlaces. Cuenta una vez los H que ya están escritos junto a O, N o S.';
 const elements=['C','H',...Object.keys(m.counts).filter(e=>e!=='C'&&e!=='H').sort()];
 $('#counters').innerHTML=elements.map(e=>{answers[e]=0;return `<div class="element-row"><span class="element-symbol element-${e}">${e}</span><label class="element-name" for="count-${e}">${names[e]||e}</label><button class="step" data-el="${e}" data-step="-1" aria-label="Restar un átomo de ${names[e]}">−</button><input id="count-${e}" data-element="${e}" type="number" inputmode="numeric" min="0" max="999" step="1" value="0" aria-label="Cantidad de átomos de ${names[e]}"><button class="step" data-el="${e}" data-step="1" aria-label="Sumar un átomo de ${names[e]}">+</button></div>`;}).join('');
 $('#structure').innerHTML='<p class="soft">Cargando estructura…</p>';
 window.scrollTo(0,0);updateZoom();
 try{
  const r=await fetch(m.svg);if(!r.ok)throw Error('SVG '+r.status);const raw=await r.text();if(token!==loadToken)return;
  const svg=new DOMParser().parseFromString(raw,'image/svg+xml').documentElement;
  const xs=m.atoms.map(a=>a.x),ys=m.atoms.map(a=>a.y),padding=70;
  const left=Math.min(...xs)-padding,top=Math.min(...ys)-padding;
  svg.setAttribute('viewBox',`${left} ${top} ${Math.max(200,Math.max(...xs)-left+padding)} ${Math.max(180,Math.max(...ys)-top+padding)}`);svg.removeAttribute('width');svg.removeAttribute('height');svg.setAttribute('role','group');svg.setAttribute('aria-label',`Estructura de ${m.name}; ${m.atoms.length} átomos distintos de hidrógeno para explorar`);
  m.atoms.forEach((atom,n)=>{
   const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');circle.setAttribute('cx',atom.x);circle.setAttribute('cy',atom.y);circle.setAttribute('r',m.heavy>40?12:18);circle.setAttribute('class','atom-hit');circle.setAttribute('tabindex','0');circle.setAttribute('role','button');circle.setAttribute('aria-label',`Explorar posición ${n+1}`);circle.setAttribute('aria-pressed','false');
   function inspect(){const marked=circle.classList.toggle('marked');circle.setAttribute('aria-pressed',String(marked));const onCarbon=atom.element==='C';$('#atomInfo').textContent=`Posición ${n+1}: ${names[atom.element]||atom.element} (${atom.element}). Suma de enlaces hacia otros átomos del dibujo: ${atom.bonds}. ${onCarbon?`H unidos a este C: ${atom.h}. ${atom.h?'Completa cuatro contando simples, dobles y triples.':'Este carbono ya tiene cuatro enlaces; no añade H.'}`:`H escritos con este átomo: ${atom.h}. Inclúyelos una sola vez.`}`;}
   circle.addEventListener('click',inspect);circle.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();inspect();}});svg.appendChild(circle);
  });
  $('#structure').replaceChildren(svg);
 }catch(e){if(token===loadToken)$('#structure').innerHTML='<p class="fail">No se pudo cargar el dibujo. Recarga la página para volver a intentarlo.</p>';}
}
function updateZoom(){ $('#structure').style.width=`${zoom*100}%`;$('#structure').style.height=`${(innerWidth<780?330:400)*zoom}px`;$('#zoomValue').textContent=`${Math.round(zoom*100)} %`;$('#zoomOut').disabled=zoom<=1;$('#zoomIn').disabled=zoom>=3;}
function clearFeedback(){ $('#feedback').className='';$('#feedback').innerHTML='<span class="soft">Pulsa comprobar para revisar tus nuevos números.</span>';$('#continue').hidden=true;$$('#counters input').forEach(el=>el.removeAttribute('aria-invalid'));}
function getCounts(){const counts={};$$('#counters input').forEach(el=>{const n=Number(el.value);counts[el.dataset.element]=Number.isInteger(n)&&n>=0&&n<=999?n:NaN;});return counts;}
function check(){const m=data[current],counts=getCounts();if(Object.values(counts).some(n=>!Number.isFinite(n))){$('#feedback').className='incorrect';$('#feedback').textContent='Escribe cantidades enteras entre 0 y 999.';return;}
 const wrong=Object.keys(m.counts).filter(e=>counts[e]!==m.counts[e]);$('#feedback').className=wrong.length?'incorrect':'correct';
 $('#feedback').innerHTML=`<span>${wrong.length?'Tu fórmula contada:':'Fórmula confirmada:'}</span><strong class="formula-display">${formula(counts)}</strong><span>${wrong.length?`Revisa ${wrong.map(e=>names[e]).join(', ')}. ${wrong.includes('H')?'Recuerda: los dobles enlaces cuentan como dos y los H de OH o NH₂ también cuentan.':'Puedes tocar los átomos para marcar los que ya contaste.'}`:'¡Correcto! Coinciden todos los elementos.'}</span>`;
 $$ ('#counters input').forEach(el=>el.setAttribute('aria-invalid',String(wrong.includes(el.dataset.element))));
 if(!wrong.length){if(!progress.solved.includes(m.id))progress.solved.push(m.id);save();$('#continue').hidden=current===data.length-1;if(current===data.length-1)$('#feedback').innerHTML+='<p>Has llegado al último desafío. Puedes volver al inicio y explorar las moléculas pendientes.</p>';}
}
function hint(solution=false){const m=data[current];hintStage++;$('#hintText').hidden=false;
 if(solution){const carbonH=m.atoms.filter(a=>a.element==='C').reduce((sum,a)=>sum+a.h,0);const otherH=m.counts.H-carbonH;$('#hintText').innerHTML=`<p><b>Solución explicada: ${formula(m.counts)}</b></p><p>H unidos a C: <b>${carbonH}</b>. H unidos a otros elementos: <b>${otherH}</b>. Total H: <b>${m.counts.H}</b>.</p><p>Se muestra la fórmula de esta representación exacta. Ver la solución no marca el reto como resuelto.</p><details><summary>Recuento por átomo del dibujo</summary><table><thead><tr><th>Posición</th><th>Átomo</th><th>H unidos</th></tr></thead><tbody>${m.atoms.map((a,i)=>`<tr><td>${i+1}</td><td>${a.element}</td><td>${a.h}</td></tr>`).join('')}</tbody></table></details>`;return;}
 const list=[`Busca primero los extremos y las esquinas sin letra. Los símbolos O, N, S o P sustituyen al carbono en esa posición: no sumes C allí.`,`Para cada C neutro, resta de 4 la suma de enlaces dibujados. Un C unido por un doble enlace a O y un simple a otro C lleva 1 H.`,`No olvides los H que están escritos junto a otros elementos. Esta estructura tiene ${m.atoms.filter(a=>a.element!=='C').reduce((s,a)=>s+a.h,0)} H unidos a elementos distintos de C.`,`Puedes usar «Ver solución explicada» para revisar el desglose y después volver a intentarlo.`];
 $('#hintText').textContent=list[Math.min(hintStage-1,list.length-1)];
}
$('#start').onclick=()=>go(0);$('#resume').onclick=()=>go(Math.min(progress.last,39));$('#homeBtn').onclick=()=>{location.hash='inicio';};$('#prev').onclick=()=>go(current-1);$('#next').onclick=()=>go(current+1);$('#continue').onclick=()=>go(current+1);$('#moleculeSelect').onchange=e=>go(Number(e.target.value));
$('#filters').onclick=e=>{const b=e.target.closest('[data-filter]');if(b)renderLibrary(b.dataset.filter);};$('#library').onclick=e=>{const b=e.target.closest('[data-molecule]');if(b)go(Number(b.dataset.molecule));};
$('#counters').onclick=e=>{const b=e.target.closest('[data-step]');if(!b)return;const input=$('#count-'+b.dataset.el);input.value=Math.max(0,Math.min(999,(Number(input.value)||0)+Number(b.dataset.step)));clearFeedback();};$('#counters').oninput=clearFeedback;$('#check').onclick=check;$('#hint').onclick=()=>hint();$('#solution').onclick=()=>hint(true);
$('#clearMarks').onclick=()=>{$$('.atom-hit.marked').forEach(el=>{el.classList.remove('marked');el.setAttribute('aria-pressed','false');});$('#atomInfo').textContent='Marcas borradas. Puedes volver a contar desde cualquier átomo.';};$('#stereoBtn').onclick=()=>{$('#stereo').hidden=!$('#stereo').hidden;};$('#zoomIn').onclick=()=>{zoom=Math.min(3,zoom+.5);updateZoom();};$('#zoomOut').onclick=()=>{zoom=Math.max(1,zoom-.5);updateZoom();};
$('#teacher').onclick=()=>{const target=$('#answerTable');target.hidden=!target.hidden;if(!target.hidden)target.innerHTML=`<table><thead><tr><th>Molécula</th><th>Fórmula</th><th>Fuente</th></tr></thead><tbody>${data.map(m=>`<tr><td>${m.name}</td><td>${formula(m.counts)}</td><td><a href="${m.source}" target="_blank" rel="noopener">CID ${m.cid}</a></td></tr>`).join('')}</tbody></table>`;};
$('#reset').onclick=()=>{if(confirm('¿Reiniciar las moléculas resueltas en este dispositivo?')){progress={solved:[],last:0};save();renderLibrary();}};
window.addEventListener('hashchange',()=>{if(data.length)route();});
window.addEventListener('resize',updateZoom);
fetch('molecules.json').then(r=>{if(!r.ok)throw Error('data');return r.json();}).then(rows=>{data=rows;$('#loadStatus').hidden=true;$('#moleculeSelect').innerHTML=data.map((m,i)=>`<option value="${i}">${i+1}. ${m.name}</option>`).join('');route();}).catch(()=>{$('#loadStatus').className='fail';$('#loadStatus').textContent='No se pudieron cargar las moléculas. Revisa la conexión y recarga esta página.';});
