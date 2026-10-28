'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const names={C:'Carbono',H:'Hidrógeno',O:'Oxígeno',N:'Nitrógeno',S:'Azufre',P:'Fósforo'};
const store='2s-exploradores-moleculas-v1';
let data=[], current=0, zoom=1, hintStage=0, loadToken=0, progress={solved:[],last:0}, answers={};
try{progress={...progress,...JSON.parse(localStorage.getItem(store)||'{}')};if(!Array.isArray(progress.solved))progress.solved=[];}catch{}
function save(){try{localStorage.setItem(store,JSON.stringify(progress));}catch{}}
function solvedMolecules(){return data.filter(m=>progress.solved.includes(m.id));}
function formula(counts){return ['C','H',...Object.keys(counts).filter(e=>e!=='C'&&e!=='H').sort()].filter(e=>counts[e]>0).map(e=>e+(counts[e]===1?'':`<sub>${counts[e]}</sub>`)).join('')||'—';}
function renderLibrary(filter='Todas'){
 $('#progress').textContent=`${solvedMolecules().length} de 40 resueltas`;
 $('#filters').innerHTML=['Todas','Inicio','Exploración','Desafío','Experto'].map(x=>`<button class="quiet" aria-pressed="${x===filter}" data-filter="${x}">${x}</button>`).join('');
 $('#library').innerHTML=data.map((m,i)=>filter==='Todas'||m.level===filter?`<button class="molecule-link" data-molecule="${i}"><span class="order">${String(i+1).padStart(2,'0')}</span><span><b>${m.name}</b><small>${m.level} · ${m.category}</small></span>${progress.solved.includes(m.id)?'<span class="done" aria-label="Resuelta">✓</span>':''}</button>`:'').join('');
}
function moleculeMode(){ $('#reactionActivity').hidden=true;$('#certificateBtn').hidden=false;$('#reset').hidden=false;$('#activityFooter').textContent='Cuenta átomos dentro de una molécula · Ciencia y Tecnología · U7 · L1 · P03';$('#modeMolecules').setAttribute('aria-pressed','true');$('#modeReactions').setAttribute('aria-pressed','false');}
function showHome(){moleculeMode(); $('#landing').hidden=false;$('#activity').hidden=true;renderLibrary();$('#resume').hidden=!progress.last;window.scrollTo(0,0);}
function route(){const reaction=location.hash.match(/^#r-(.+)$/);if(reaction){window.openReaction(reaction[1]);return;}const match=location.hash.match(/^#m-(.+)$/);if(match){const i=data.findIndex(m=>m.id===match[1]);if(i>=0){openMolecule(i);return;}}showHome();}
function go(i){location.hash='m-'+data[Math.max(0,Math.min(data.length-1,i))].id;}
async function openMolecule(i){
 moleculeMode();
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
 if(!wrong.length){if(!progress.solved.includes(m.id))progress.solved.push(m.id);save();$('#continue').hidden=current===data.length-1;if(solvedMolecules().length===data.length)$('#feedback').innerHTML+='<p>¡Completaste las 40 moléculas! Ya puedes descargar tu constancia desde «Mi constancia».</p>';else if(current===data.length-1)$('#feedback').innerHTML+='<p>Has llegado al último desafío. Puedes volver al inicio y explorar las moléculas pendientes, o descargar una constancia de avance.</p>';if(!$('#certificatePanel').hidden)updateCertificate();}
}
function hint(solution=false){const m=data[current];hintStage++;$('#hintText').hidden=false;
 if(solution){const carbonH=m.atoms.filter(a=>a.element==='C').reduce((sum,a)=>sum+a.h,0);const otherH=m.counts.H-carbonH;$('#hintText').innerHTML=`<p><b>Solución explicada: ${formula(m.counts)}</b></p><p>H unidos a C: <b>${carbonH}</b>. H unidos a otros elementos: <b>${otherH}</b>. Total H: <b>${m.counts.H}</b>.</p><p>Se muestra la fórmula de esta representación exacta. Ver la solución no marca el reto como resuelto.</p><details><summary>Recuento por átomo del dibujo</summary><table><thead><tr><th>Posición</th><th>Átomo</th><th>H unidos</th></tr></thead><tbody>${m.atoms.map((a,i)=>`<tr><td>${i+1}</td><td>${a.element}</td><td>${a.h}</td></tr>`).join('')}</tbody></table></details>`;return;}
 const list=[`Busca primero los extremos y las esquinas sin letra. Los símbolos O, N, S o P sustituyen al carbono en esa posición: no sumes C allí.`,`Para cada C neutro, resta de 4 la suma de enlaces dibujados. Un C unido por un doble enlace a O y un simple a otro C lleva 1 H.`,`No olvides los H que están escritos junto a otros elementos. Esta estructura tiene ${m.atoms.filter(a=>a.element!=='C').reduce((s,a)=>s+a.h,0)} H unidos a elementos distintos de C.`,`Puedes usar «Ver solución explicada» para revisar el desglose y después volver a intentarlo.`];
 $('#hintText').textContent=list[Math.min(hintStage-1,list.length-1)];
}
$('#start').onclick=()=>go(0);$('#resume').onclick=()=>go(Math.min(progress.last,39));$('#homeBtn').onclick=()=>{location.hash='inicio';};$('#prev').onclick=()=>go(current-1);$('#next').onclick=()=>go(current+1);$('#continue').onclick=()=>go(current+1);$('#moleculeSelect').onchange=e=>go(Number(e.target.value));
$('#modeMolecules').onclick=()=>{location.hash='inicio';};
$('#filters').onclick=e=>{const b=e.target.closest('[data-filter]');if(b)renderLibrary(b.dataset.filter);};$('#library').onclick=e=>{const b=e.target.closest('[data-molecule]');if(b)go(Number(b.dataset.molecule));};
$('#counters').onclick=e=>{const b=e.target.closest('[data-step]');if(!b)return;const input=$('#count-'+b.dataset.el);input.value=Math.max(0,Math.min(999,(Number(input.value)||0)+Number(b.dataset.step)));clearFeedback();};$('#counters').oninput=clearFeedback;$('#check').onclick=check;$('#hint').onclick=()=>hint();$('#solution').onclick=()=>hint(true);
$('#clearMarks').onclick=()=>{$$('.atom-hit.marked').forEach(el=>{el.classList.remove('marked');el.setAttribute('aria-pressed','false');});$('#atomInfo').textContent='Marcas borradas. Puedes volver a contar desde cualquier átomo.';};$('#stereoBtn').onclick=()=>{$('#stereo').hidden=!$('#stereo').hidden;};$('#zoomIn').onclick=()=>{zoom=Math.min(3,zoom+.5);updateZoom();};$('#zoomOut').onclick=()=>{zoom=Math.max(1,zoom-.5);updateZoom();};
$('#teacher').onclick=()=>{const target=$('#answerTable');target.hidden=!target.hidden;if(!target.hidden)target.innerHTML=`<table><thead><tr><th>Molécula</th><th>Fórmula</th><th>Fuente</th></tr></thead><tbody>${data.map(m=>`<tr><td>${m.name}</td><td>${formula(m.counts)}</td><td><a href="${m.source}" target="_blank" rel="noopener">CID ${m.cid}</a></td></tr>`).join('')}</tbody></table>`;};
$('#reset').onclick=()=>{if(confirm('¿Reiniciar las moléculas resueltas en este dispositivo?')){progress={solved:[],last:0};save();renderLibrary();updateCertificate();$('#participantName').value='';}};
function updateCertificate(){
 const solved=solvedMolecules(),complete=solved.length===data.length&&data.length>0;
 $('#certificateHeading').textContent=complete?'Constancia de actividad completada':'Constancia de avance';
 $('#certificateSummary').textContent=solved.length?`${solved.length} de ${data.length} moléculas resueltas en este navegador. ${complete?'Actividad completada.':'Puedes guardar tu avance y seguir practicando.'}`:'Todavía no hay moléculas resueltas. Comprueba correctamente al menos una fórmula para descargar tu avance.';
 $('#downloadCertificate').disabled=!solved.length;
 $('#certificateMolecules').replaceChildren(...solved.map(m=>{const li=document.createElement('li');li.textContent=`${m.name} · ${m.formula}`;return li;}));
}
$('#certificateBtn').onclick=()=>{updateCertificate();$('#participantName').value=typeof progress.participantName==='string'?progress.participantName:'';$('#certificateMessage').textContent='';$('#certificatePanel').hidden=false;$('#certificateHeading').focus({preventScroll:true});$('#certificatePanel').scrollIntoView({behavior:'smooth',block:'start'});};
$('#closeCertificate').onclick=()=>{$('#certificatePanel').hidden=true;$('#certificateBtn').focus();};
$('#participantName').oninput=()=>{progress.participantName=$('#participantName').value;save();};
function wrapCanvas(ctx,text,x,y,maxWidth,lineHeight){
 let line='';for(const word of text.split(/\s+/)){const candidate=line?line+' '+word:word;if(line&&ctx.measureText(candidate).width>maxWidth){ctx.fillText(line,x,y,maxWidth);y+=lineHeight;line=word;}else line=candidate;}if(line){ctx.fillText(line,x,y,maxWidth);y+=lineHeight;}return y;
}
$('#certificateForm').onsubmit=async event=>{
 event.preventDefault();const name=$('#participantName').value.trim(),solved=solvedMolecules();if(!name||!solved.length){$('#certificateMessage').textContent='Escribe un nombre y completa al menos una molécula.';return;}
 const button=$('#downloadCertificate');button.disabled=true;$('#certificateMessage').textContent='Preparando la imagen…';
 try{
  progress.participantName=name;save();const complete=solved.length===data.length;
  const timestamp=new Date(),date=new Intl.DateTimeFormat('es-PE',{dateStyle:'long',timeZone:'America/Lima'}).format(timestamp),time=new Intl.DateTimeFormat('es-PE',{timeStyle:'short',timeZone:'America/Lima'}).format(timestamp);
  const canvas=document.createElement('canvas');canvas.width=1600;canvas.height=1900;const ctx=canvas.getContext('2d');
  ctx.fillStyle='#eaf5f2';ctx.fillRect(0,0,1600,1900);ctx.fillStyle='#ffffff';ctx.fillRect(60,60,1480,1780);ctx.fillStyle='#087e7b';ctx.fillRect(60,60,1480,18);
  ctx.fillStyle='#153c48';ctx.font='bold 52px sans-serif';ctx.fillText('Exploradores de moléculas',115,165);ctx.font='28px sans-serif';ctx.fillText('Ciencia y Tecnología · 2.º secundaria · U7 · L1 · P03',115,216);
  ctx.font='bold 44px sans-serif';ctx.fillText(complete?'Constancia de actividad completada':'Constancia de avance',115,325);
  ctx.font='bold 38px sans-serif';let y=wrapCanvas(ctx,name,115,410,1370,48);
  ctx.fillStyle='#087e7b';ctx.font='bold 55px sans-serif';ctx.fillText(`${solved.length} de ${data.length} moléculas resueltas`,115,y+55);
  ctx.fillStyle='#3c626a';ctx.font='27px sans-serif';ctx.fillText(`Fecha de emisión: ${date} · ${time} (Perú)`,115,y+108);
  ctx.fillText('Sesión de clase: 23 de octubre de 2026',115,y+150);
  y+=225;ctx.fillStyle='#153c48';ctx.font='bold 31px sans-serif';ctx.fillText('Moléculas resueltas',115,y);
  const startY=y+57,rows=20;ctx.font='25px sans-serif';
  solved.forEach((m,i)=>{const column=Math.floor(i/rows),row=i%rows,x=115+column*690,lineY=startY+row*44;let fontSize=25;const text=`${i+1}. ${m.name} · ${m.formula.replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[Number(d)])}`;ctx.font=`${fontSize}px sans-serif`;while(ctx.measureText(text).width>650&&fontSize>16){fontSize--;ctx.font=`${fontSize}px sans-serif`;}ctx.fillText(text,x,lineY,650);});
  ctx.strokeStyle='#bfd7d2';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(115,1700);ctx.lineTo(1485,1700);ctx.stroke();ctx.fillStyle='#4e7079';ctx.font='24px sans-serif';
  wrapCanvas(ctx,'Constancia generada desde el progreso de este navegador. Actividad de práctica con pistas disponibles.',115,1750,1360,33);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('No image');
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`Constancia-2S-${complete?'completada':'avance'}-${solved.length}-de-${data.length}.png`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  $('#certificateMessage').textContent='Constancia preparada. Busca el archivo PNG en Descargas y entrégalo al docente.';
 }catch(error){$('#certificateMessage').textContent='No se pudo generar la imagen. Vuelve a pulsar Descargar constancia.';}finally{button.disabled=!solvedMolecules().length;}
};
window.addEventListener('hashchange',()=>{if(data.length)route();});
window.addEventListener('resize',updateZoom);
fetch('molecules.json').then(r=>{if(!r.ok)throw Error('data');return r.json();}).then(rows=>{data=rows;$('#loadStatus').hidden=true;$('#certificateBtn').disabled=false;$('#moleculeSelect').innerHTML=data.map((m,i)=>`<option value="${i}">${i+1}. ${m.name}</option>`).join('');route();}).catch(()=>{$('#loadStatus').className='fail';$('#loadStatus').textContent='No se pudieron cargar las moléculas. Revisa la conexión y recarga esta página.';});
