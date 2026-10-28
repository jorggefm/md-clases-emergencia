(function(){
 'use strict';
 const q=s=>document.querySelector(s),core=window.ReactionCore,key='2s-exploradores-reacciones-piloto-v1';
 const elementNames={C:'Carbono',H:'Hidrógeno',O:'Oxígeno'};
 const supports={oxygen:{id:'oxygen',name:'Oxígeno',formula:'O2',counts:{O:2},svg:'assets/rx-oxygen.svg'},water:{id:'water',name:'Agua',formula:'H2O',counts:{H:2,O:1},svg:'assets/rx-water.svg'},'carbon-dioxide':{id:'carbon-dioxide',name:'Dióxido de carbono',formula:'CO2',counts:{C:1,O:2},svg:'assets/rx-carbon-dioxide.svg'}};
 let progress={solved:[],values:{},last:'metano'},rows=[],current=null,values=[],hint=0,token=0;
 try{const p=JSON.parse(localStorage.getItem(key)||'{}');if(Array.isArray(p.solved))progress.solved=p.solved.filter(x=>typeof x==='string');if(p.values&&typeof p.values==='object')progress.values=p.values;if(typeof p.last==='string')progress.last=p.last;}catch{}
 const fmt=s=>s.replace(/\d+/g,n=>'<sub>'+n+'</sub>');
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(progress));}catch{}};
 const load=Promise.all([fetch('reactions.json?v=piloto-1'),fetch('molecules.json')]).then(async rs=>{if(rs.some(r=>!r.ok))throw Error('data');return Promise.all(rs.map(r=>r.json()));}).then(([reactions,molecules])=>{
  const catalog=Object.fromEntries(molecules.map(m=>[m.id,m]));
  const species=id=>catalog[id]?{...catalog[id],svg:'assets/rx-'+id+'.svg'}:supports[id];
  rows=reactions.map(r=>({...r,left:r.left.map(species),right:r.right.map(species)}));
  if(rows.length!==5||rows.some(r=>[...r.left,...r.right].some(s=>!s)||!core.evaluate(r.left,r.right,r.solution).balanced))throw Error('Invalid curated reactions');
  q('#rxSelect').innerHTML=rows.map((r,i)=>`<option value="${r.id}">${i+1}. ${r.title}</option>`).join('');return rows;
 });
 // Keep the rejected load handled until the learner opens this mode.
 load.catch(()=>{});
 function ready(enabled){q('#reactionActivity').querySelectorAll('button,input,select').forEach(el=>{if(el.id!=='rxRetry')el.disabled=!enabled;});}
 function modes(){q('#landing').hidden=true;q('#activity').hidden=true;q('#certificatePanel').hidden=true;q('#certificateBtn').hidden=true;q('#reset').hidden=true;q('#activityFooter').textContent='Equilibra reacciones · Ciencia y Tecnología · U7 · L2 · Piloto de aplicación';q('#reactionActivity').hidden=false;q('#modeMolecules').setAttribute('aria-pressed','false');q('#modeReactions').setAttribute('aria-pressed','true');ready(false);q('#rxRetry').hidden=true;}
 window.openReaction=async function(id){const request=++token;modes();try{await load;if(request!==token||!location.hash.startsWith('#r-'))return;current=rows.find(r=>r.id===id)||rows[0];progress.last=current.id;hint=0;const cached=progress.values[current.id];values=Array.isArray(cached)&&cached.length===current.initial.length&&core.valid(cached)?[...cached]:[...current.initial];save();render();window.scrollTo(0,0);}catch{current=null;ready(false);q('#rxRetry').hidden=false;q('#rxName').textContent='No se pudieron cargar las reacciones';q('#rxInstruction').textContent='Comprueba la conexión y pulsa Reintentar carga. Tus moléculas guardadas no se han borrado.';}};
 function go(id){location.hash='r-'+id;}
 function render(){
  ready(true);
  q('#rxName').textContent=current.title;q('#rxCategory').textContent=current.category;q('#rxSelect').value=current.id;const index=rows.indexOf(current);q('#rxPrev').disabled=index===0;q('#rxNext').disabled=index===rows.length-1;
  q('#rxGuide').checked=current.guide!=='none';q('#rxGuide').disabled=current.guide==='none';q('#rxHintText').hidden=true;q('#rxContinue').hidden=true;q('#rxSimplify').hidden=true;
  q('#rxCondition').textContent=current.condition;q('#rxExplanation').textContent=current.explanation;q('#rxImportance').textContent=current.importance;q('#rxLimit').textContent=current.limit;
  q('#rxImage').src=current.scene;q('#rxImage').alt=current.imageAlt;q('.rx-context').dataset.scene=current.id==='fotosintesis'?'diagram':'photo';q('#rxImageCaption').textContent=current.caption;q('#rxSource').href=current.source;
  q('#rxCatalog').innerHTML=[...new Map([...current.left,...current.right].filter(s=>!supports[s.id]).map(s=>[s.id,s])).values()].map(s=>`<a href="#m-${s.id}">Volver a contar ${s.name.toLowerCase()} ↗</a>`).join('');
  const side=(species,offset,title)=>`<div class="rx-equation-side"><span class="rx-side-title">${title}</span>${species.map((s,j)=>{const i=j+offset;return `${j?'<div class="rx-plus" aria-hidden="true">+</div>':''}<div class="rx-term"><div class="rx-coefficient"><button data-coef="${i}" data-delta="-1" aria-label="Quitar una molécula de ${s.name}, ${title.toLowerCase()}">−</button><input type="number" inputmode="numeric" min="1" max="12" step="1" value="${values[i]}" data-coef-input="${i}" aria-label="Coeficiente de ${s.name}, ${title.toLowerCase()}"><button data-coef="${i}" data-delta="1" aria-label="Añadir una molécula de ${s.name}, ${title.toLowerCase()}">+</button></div><div class="rx-chemical">${fmt(s.formula)}<small>${s.name}</small></div></div>`;}).join('')}</div>`;
  q('#rxEquation').innerHTML=side(current.left,0,'Reactivos')+'<span class="rx-arrow" aria-label="produce">→</span>'+side(current.right,current.left.length,'Productos');
  update();feedback('Cambia los coeficientes y comprueba si coincide cada elemento.');
 }
 function feedback(text,kind=''){q('#rxFeedback').className=kind;q('#rxFeedback').textContent=text;}
 function guide(){
  const guided=q('#rxGuide').checked;let enabled=null;
  if(guided&&current.guide==='steps')enabled=[values[3]===2?1:3];
  if(guided&&current.guide==='single')enabled=current.guideIndexes;
  q('#rxInstruction').textContent=enabled?(current.guide==='single'?'Completa solo el número de glucosas. Compara primero los carbonos.':enabled[0]===3?'Paso 1: hay 4 H en el metano. Cada agua tiene 2 H. Añade otra molécula de agua.':'Paso 2: el H ya coincide. Ahora ajusta el oxígeno de los reactivos; cada O₂ aporta 2 O.'):'Ajusta las cantidades de moléculas en ambos lados. Cada elemento debe tener el mismo total antes y después.';
  if(core.evaluate(current.left,current.right,values).balanced)q('#rxInstruction').textContent='Los átomos coinciden en ambos lados. Pulsa Comprobar balance para revisar tus coeficientes.';
  q('#rxEquation').querySelectorAll('[data-coef-input]').forEach(el=>{const i=Number(el.dataset.coefInput);el.disabled=!!enabled&&!enabled.includes(i);el.setAttribute('aria-invalid',String(!core.valid([values[i]])));});
  q('#rxEquation').querySelectorAll('[data-coef]').forEach(el=>{const i=Number(el.dataset.coef),v=values[i];el.disabled=(!!enabled&&!enabled.includes(i))||(Number(el.dataset.delta)<0?v<=1:v>=12);});
 }
 function update(){
  const result=core.evaluate(current.left,current.right,values);guide();
  const elements=[...new Set([...current.left,...current.right].flatMap(s=>Object.keys(s.counts)))].sort((a,b)=>['C','H','O'].indexOf(a)-['C','H','O'].indexOf(b));
  q('#rxTotals').innerHTML=elements.map(e=>{const a=result.valid?result.left[e]||0:'—',b=result.valid?result.right[e]||0:'—',same=result.valid&&a===b;return `<tr data-balanced="${same}"><td><span class="rx-symbol element-${e}" title="${elementNames[e]}">${e}</span></td><td>${a}</td><td>${b}</td><td>${!result.valid?'Revisar':same?'Iguales':`Faltan ${Math.abs(a-b)} ${e} en ${a<b?'reactivos':'productos'}`}</td></tr>`;}).join('');
  const side=(species,offset,title)=>`<div class="rx-copy-side"><h3>${title}</h3>${species.map((s,j)=>{const n=values[j+offset];return `<div class="rx-copy-group"><span class="rx-copy-label">${core.valid([n])?n:'?'} × ${fmt(s.formula)}</span><div class="rx-copy-molecules">${Array.from({length:core.valid([n])?n:0},(_,k)=>`<img src="${s.svg}" alt="${s.name}, molécula ${k+1}" loading="lazy">`).join('')}</div><small class="rx-copy-caption">${core.valid([n])?Object.entries(s.counts).map(([el,c])=>`${n*c} ${el}`).join(' · '):'Usa enteros de 1 a 12'}</small></div>`;}).join('')}</div>`;
  q('#rxCopies').innerHTML=side(current.left,0,'Antes')+side(current.right,current.left.length,'Después');
  q('#rxProgress').textContent=`${rows.filter(r=>progress.solved.includes(r.id)).length} / 5 resueltas`;
  if(result.valid){progress.values[current.id]=[...values];save();}
 }
 function changed(){q('#rxContinue').hidden=true;q('#rxSimplify').hidden=true;update();feedback('Pulsa comprobar para revisar tus nuevos números.');}
 function check(){const result=core.evaluate(current.left,current.right,values);if(!result.valid){feedback('Usa números enteros de 1 a 12 en todos los coeficientes. No cambies las fórmulas.','incorrect');return;}
  if(!result.balanced){feedback('Todavía no coincide '+result.wrong.map(e=>elementNames[e]).join(', ')+'. Revisa el contador y las copias de moléculas.','incorrect');return;}
  if(result.divisor>1){feedback(`Los átomos coinciden. Todos los coeficientes se pueden dividir entre ${result.divisor}; busca los menores números enteros.`);q('#rxSimplify').hidden=false;return;}
  if(!progress.solved.includes(current.id))progress.solved.push(current.id);save();update();q('#rxInstruction').textContent='Reacción equilibrada: se conserva cada tipo de átomo. Puedes continuar o cambiar los números para explorar.';feedback('¡Equilibrada! '+current.reading+(rows.filter(r=>progress.solved.includes(r.id)).length===5?' Completaste las cinco reacciones del piloto.':''),'correct');q('#rxContinue').hidden=rows.indexOf(current)===rows.length-1;
 }
 q('#modeReactions').onclick=()=>{if(location.hash==='#r-'+progress.last)window.openReaction(progress.last);else go(progress.last);};
 q('#rxRetry').onclick=()=>location.reload();
 q('#rxPrev').onclick=()=>go(rows[Math.max(0,rows.indexOf(current)-1)].id);q('#rxNext').onclick=q('#rxContinue').onclick=()=>go(rows[Math.min(rows.length-1,rows.indexOf(current)+1)].id);q('#rxSelect').onchange=e=>go(e.target.value);
 q('#rxEquation').onclick=e=>{const b=e.target.closest('[data-coef]');if(!b||b.disabled)return;const i=Number(b.dataset.coef);values[i]=Math.max(1,Math.min(12,(Number.isFinite(values[i])?values[i]:1)+Number(b.dataset.delta)));q(`[data-coef-input="${i}"]`).value=values[i];changed();};
 q('#rxEquation').oninput=e=>{if(!e.target.matches('[data-coef-input]'))return;values[Number(e.target.dataset.coefInput)]=e.target.value===''?NaN:Number(e.target.value);changed();};
 q('#rxGuide').onchange=guide;q('#rxCheck').onclick=check;q('#rxSimplify').onclick=()=>{const r=core.evaluate(current.left,current.right,values);if(r.balanced&&r.divisor>1){values=values.map(v=>v/r.divisor);render();check();}};
 q('#rxHint').onclick=()=>{q('#rxHintText').hidden=false;q('#rxHintText').textContent=current.hints[Math.min(hint++,current.hints.length-1)];};
 q('#rxSolution').onclick=()=>{q('#rxHintText').hidden=false;const side=(ss,offset)=>ss.map((s,j)=>current.solution[j+offset]+' '+s.formula).join(' + ');q('#rxHintText').textContent=side(current.left,0)+' → '+side(current.right,current.left.length)+'. '+current.reading+' Ver la solución no marca la reacción como resuelta.';};
 q('#rxRestart').onclick=()=>{values=[...current.initial];progress.values[current.id]=values;save();render();};
 q('#rxResetProgress').onclick=()=>{if(confirm('¿Borrar solo el avance de las cinco reacciones? Las 40 moléculas se conservan.')){progress={solved:[],values:{},last:'metano'};save();go('metano');if(current?.id==='metano')window.openReaction('metano');}};
})();
