(function(){
 'use strict';
 const q=s=>document.querySelector(s),core=window.ReactionCore,key='2s-exploradores-reacciones-piloto-v1';
 const names={C:'Carbono',H:'Hidrógeno',O:'Oxígeno',N:'Nitrógeno',S:'Azufre',Mg:'Magnesio',Fe:'Hierro',Al:'Aluminio',Na:'Sodio',Cl:'Cloro',Ca:'Calcio'};
 const units={molecule:'moléculas',atom:'átomos', 'formula-unit':'unidades fórmula'};
 let progress={solved:[],values:{},last:'agua'},rows=[],supports={},current=null,values=[],hint=0,token=0;
 try{const p=JSON.parse(localStorage.getItem(key)||'{}');if(Array.isArray(p.solved))progress.solved=p.solved.filter(x=>typeof x==='string');if(p.values&&typeof p.values==='object')progress.values=p.values;if(typeof p.last==='string')progress.last=p.last;}catch{}
 const fmt=s=>s.replace(/\d+/g,n=>'<sub>'+n+'</sub>');
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(progress));}catch{}};
 const load=Promise.all(['reactions.json?v=banco-30-1','molecules.json','reaction-species.json?v=banco-30-1'].map(url=>fetch(url))).then(async rs=>{if(rs.some(r=>!r.ok))throw Error('data');return Promise.all(rs.map(r=>r.json()));}).then(([reactions,molecules,extras])=>{
  const catalog=Object.fromEntries(molecules.map(m=>[m.id,m]));supports=Object.fromEntries(extras.map(s=>[s.id,s]));
  const species=id=>catalog[id]?{...catalog[id],kind:'molecule',svg:'assets/rx-'+id+'.svg'}:supports[id];
  rows=reactions.map(r=>({...r,left:r.left.map(species),right:r.right.map(species)}));
  if(rows.length!==30||new Set(rows.map(r=>r.id)).size!==30||rows.some(r=>[...r.left,...r.right].some(s=>!s)||!core.evaluate(r.left,r.right,r.solution).balanced))throw Error('Invalid curated reactions');
  return rows;
 });
 load.catch(()=>{});
 function ready(enabled){q('#reactionActivity').querySelectorAll('button,input,select').forEach(el=>{if(el.id!=='rxRetry')el.disabled=!enabled;});}
 function modes(){q('#landing').hidden=true;q('#activity').hidden=true;q('#certificatePanel').hidden=true;q('#certificateBtn').hidden=true;q('#reset').hidden=true;q('#activityFooter').textContent='Equilibra reacciones · Ciencia y Tecnología · U7 · L2 · 30 retos progresivos';q('#reactionActivity').hidden=false;q('#modeMolecules').setAttribute('aria-pressed','false');q('#modeReactions').setAttribute('aria-pressed','true');ready(false);q('#rxRetry').hidden=true;}
 window.openReaction=async function(id){const request=++token;modes();try{await load;if(request!==token||!location.hash.startsWith('#r-'))return;current=rows.find(r=>r.id===id)||rows[0];progress.last=current.id;hint=0;const cached=progress.values[current.id];values=Array.isArray(cached)&&cached.length===current.initial.length&&core.valid(cached)?[...cached]:[...current.initial];save();render();window.scrollTo(0,0);}catch{current=null;ready(false);q('#rxRetry').hidden=false;q('#rxName').textContent='No se pudieron cargar las reacciones';q('#rxInstruction').textContent='Comprueba la conexión y pulsa Reintentar carga. Tu avance anterior se conserva.';}};
 function go(id){location.hash='r-'+id;}
 function navigation(){
  const solved=r=>progress.solved.includes(r.id);
  const levels=Array.from({length:6},(_,i)=>rows.filter(r=>r.level===i+1));
  q('#rxLevels').innerHTML=levels.map((group,i)=>'<button class="quiet" data-level="'+(i+1)+'" aria-pressed="'+(current.level===i+1)+'" title="'+group[0].levelTitle+'"><span>Nivel '+(i+1)+'</span><small>'+group.filter(solved).length+' / '+group.length+'</small></button>').join('');
  q('#rxSelect').innerHTML=levels.map((group,i)=>'<optgroup label="Nivel '+(i+1)+' · '+group[0].levelTitle+'">'+group.map(r=>'<option value="'+r.id+'">'+r.order+'. '+r.title+(solved(r)?' · Resuelta':'')+'</option>').join('')+'</optgroup>').join('');
  q('#rxSelect').value=current.id;
  q('#rxMap').innerHTML=levels.map((group,i)=>'<section><h3>'+(i+1)+'. '+group[0].levelTitle+'</h3><ol start="'+group[0].order+'">'+group.map(r=>'<li><a href="#r-'+r.id+'"'+(r.id===current.id?' aria-current="step"':'')+'>'+r.title+'</a>'+(solved(r)?'<small>Resuelta</small>':'')+'</li>').join('')+'</ol></section>').join('');
  const count=rows.filter(solved).length;
  q('#rxProgress').textContent=count+' / '+rows.length+' resueltas';q('#rxMeter').value=count;
 }
 function render(){
  ready(true);navigation();
  q('#rxVisuals').open=!matchMedia('(max-width:780px)').matches;
  q('#rxName').textContent=current.title;q('#rxCategory').textContent=current.category;const index=rows.indexOf(current);q('#rxPrev').disabled=index===0;q('#rxNext').disabled=index===rows.length-1;
  q('#rxGuide').checked=current.guide!=='none';q('#rxGuide').disabled=current.guide==='none';q('#rxHintText').hidden=true;q('#rxContinue').hidden=true;q('#rxSimplify').hidden=true;
  q('#rxCondition').textContent=current.condition;q('#rxExplanation').textContent=current.explanation;q('#rxImportance').textContent=current.importance;q('#rxLimit').textContent=current.limit;
  q('#rxImage').src=current.scene;q('#rxImage').alt=current.imageAlt;q('.rx-context').dataset.scene=['fotosintesis-contexto.png','rx-atmosfera.png'].some(s=>current.scene.endsWith(s))?'diagram':'photo';q('#rxImageCaption').textContent=current.caption;q('#rxSource').href=current.source;
  q('#rxCatalog').innerHTML=[...new Map([...current.left,...current.right].filter(s=>!supports[s.id]).map(s=>[s.id,s])).values()].map(s=>'<a href="#m-'+s.id+'">Volver a contar '+s.name.toLowerCase()+' ↗</a>').join('');
  const side=(species,offset,title)=>'<div class="rx-equation-side"><span class="rx-side-title">'+title+'</span>'+species.map((s,j)=>{const i=j+offset;return (j?'<div class="rx-plus" aria-hidden="true">+</div>':'')+'<div class="rx-term"><div class="rx-coefficient"><button data-coef="'+i+'" data-delta="-1" aria-label="Disminuir coeficiente de '+s.name+', '+title.toLowerCase()+'">−</button><input type="number" inputmode="numeric" min="1" max="'+core.MAX+'" step="1" value="'+values[i]+'" data-coef-input="'+i+'" aria-label="Coeficiente de '+s.name+', '+title.toLowerCase()+'"><button data-coef="'+i+'" data-delta="1" aria-label="Aumentar coeficiente de '+s.name+', '+title.toLowerCase()+'">+</button></div><div class="rx-chemical">'+fmt(s.formula)+'<small>'+s.name+'</small></div></div>';}).join('')+'</div>';
  q('#rxEquation').innerHTML=side(current.left,0,'Reactivos')+'<span class="rx-arrow" aria-label="'+(current.reversible?'reacción reversible':'produce')+'">'+(current.reversible?'⇌':'→')+'</span>'+side(current.right,current.left.length,'Productos');
  update();feedback('Compara cada elemento antes y después.');
 }
 function feedback(text,kind=''){q('#rxFeedback').className=kind;q('#rxFeedback').textContent=text;}
 function guide(){
  const guided=q('#rxGuide').checked;let enabled=null,step=0;
  if(guided&&current.guide==='steps'){step=current.guideIndexes.findIndex(i=>values[i]!==current.solution[i]);if(step<0)step=current.guideIndexes.length-1;enabled=[current.guideIndexes[step]];}
  if(guided&&current.guide==='single')enabled=current.guideIndexes;
  q('#rxInstruction').textContent=enabled?current.guideTexts[step]:'Conserva cada tipo de átomo. Cambia los coeficientes, no las fórmulas.';
  if(core.evaluate(current.left,current.right,values).balanced)q('#rxInstruction').textContent='Los átomos coinciden en ambos lados. Comprueba tus coeficientes.';
  q('#rxEquation').querySelectorAll('[data-coef-input]').forEach(el=>{const i=Number(el.dataset.coefInput);el.disabled=!!enabled&&!enabled.includes(i);el.setAttribute('aria-invalid',String(!core.valid([values[i]])));});
  q('#rxEquation').querySelectorAll('[data-coef]').forEach(el=>{const i=Number(el.dataset.coef),v=values[i];el.disabled=(!!enabled&&!enabled.includes(i))||(Number(el.dataset.delta)<0?v<=1:v>=core.MAX);});
 }
 function update(){
  const result=core.evaluate(current.left,current.right,values);guide();
  const elements=[...new Set([...current.left,...current.right].flatMap(s=>Object.keys(s.counts)))];
  q('#rxTotals').innerHTML=elements.map(e=>{const a=result.valid?result.left[e]||0:'—',b=result.valid?result.right[e]||0:'—',same=result.valid&&a===b;return '<tr data-balanced="'+same+'"><td><span class="rx-symbol element-'+e+'" title="'+(names[e]||e)+'">'+e+'</span></td><td>'+a+'</td><td>'+b+'</td><td>'+(!result.valid?'Revisar':same?'Iguales':'Faltan '+Math.abs(a-b)+' '+e+' en '+(a<b?'reactivos':'productos'))+'</td></tr>';}).join('');
  const side=(species,offset,title)=>'<div class="rx-copy-side"><h3>'+title+'</h3>'+species.map((s,j)=>{const n=values[j+offset],valid=core.valid([n]);return '<div class="rx-copy-group"><span class="rx-copy-label">'+(valid?n:'?')+' × '+fmt(s.formula)+' <small>'+(units[s.kind]||units.molecule)+'</small></span><div class="rx-copy-molecules">'+Array.from({length:valid?Math.min(n,6):0},(_,k)=>'<img src="'+s.svg+'" alt="'+s.name+', representación '+(k+1)+'" loading="lazy">').join('')+'</div>'+(valid&&n>6?'<p class="rx-extra">Se muestran 6 de '+n+'. El contador incluye las '+n+'.</p>':'')+'<small class="rx-copy-caption">'+(valid?Object.entries(s.counts).map(([el,c])=>n*c+' '+el).join(' · '):'Usa enteros de 1 a '+core.MAX)+'</small></div>';}).join('')+'</div>';
  q('#rxCopies').innerHTML=side(current.left,0,'Antes')+side(current.right,current.left.length,'Después');
  if(result.valid){progress.values[current.id]=[...values];save();}
 }
 function changed(){q('#rxContinue').hidden=true;q('#rxSimplify').hidden=true;update();feedback('Comprueba tus nuevos coeficientes.');}
 function check(){const result=core.evaluate(current.left,current.right,values);if(!result.valid){feedback('Usa números enteros de 1 a '+core.MAX+' en todos los coeficientes. No cambies las fórmulas.','incorrect');return;}
  if(!result.balanced){feedback('Todavía no coincide '+result.wrong.map(e=>names[e]||e).join(', ')+'. Revisa el contador.','incorrect');return;}
  if(result.divisor>1){feedback('Los átomos coinciden. Todos los coeficientes se pueden dividir entre '+result.divisor+'; busca los menores números enteros.');q('#rxSimplify').hidden=false;return;}
  if(!progress.solved.includes(current.id))progress.solved.push(current.id);save();update();navigation();q('#rxInstruction').textContent='Reacción equilibrada: se conserva cada tipo de átomo.';feedback('¡Equilibrada! '+current.reading+(rows.every(r=>progress.solved.includes(r.id))?' Completaste las 30 reacciones.':''),'correct');q('#rxContinue').hidden=rows.indexOf(current)===rows.length-1;
 }
 q('#modeReactions').onclick=()=>{if(location.hash==='#r-'+progress.last)window.openReaction(progress.last);else go(progress.last);};
 q('#rxRetry').onclick=()=>location.reload();
 matchMedia('(max-width:780px)').addEventListener('change',e=>{q('#rxVisuals').open=!e.matches;});
 q('#rxLevels').onclick=e=>{const b=e.target.closest('[data-level]');if(!b)return;const group=rows.filter(r=>r.level===Number(b.dataset.level));go((group.find(r=>!progress.solved.includes(r.id))||group[0]).id);};
 q('#rxPrev').onclick=()=>go(rows[Math.max(0,rows.indexOf(current)-1)].id);q('#rxNext').onclick=q('#rxContinue').onclick=()=>go(rows[Math.min(rows.length-1,rows.indexOf(current)+1)].id);q('#rxSelect').onchange=e=>go(e.target.value);
 q('#rxEquation').onclick=e=>{const b=e.target.closest('[data-coef]');if(!b||b.disabled)return;const i=Number(b.dataset.coef);values[i]=Math.max(1,Math.min(core.MAX,(Number.isFinite(values[i])?values[i]:1)+Number(b.dataset.delta)));q('[data-coef-input="'+i+'"]').value=values[i];changed();};
 q('#rxEquation').oninput=e=>{if(!e.target.matches('[data-coef-input]'))return;values[Number(e.target.dataset.coefInput)]=e.target.value===''?NaN:Number(e.target.value);changed();};
 q('#rxGuide').onchange=guide;q('#rxCheck').onclick=check;q('#rxSimplify').onclick=()=>{const r=core.evaluate(current.left,current.right,values);if(r.balanced&&r.divisor>1){values=values.map(v=>v/r.divisor);render();check();}};
 q('#rxHint').onclick=()=>{q('#rxHintText').hidden=false;q('#rxHintText').textContent=current.hints[Math.min(hint++,current.hints.length-1)];};
 q('#rxSolution').onclick=()=>{q('#rxHintText').hidden=false;const side=(ss,offset)=>ss.map((s,j)=>current.solution[j+offset]+' '+fmt(s.formula)).join(' + ');q('#rxHintText').innerHTML=side(current.left,0)+(current.reversible?' ⇌ ':' → ')+side(current.right,current.left.length)+'. '+current.reading+' Ver la solución no marca el ejercicio como resuelto.';};
 q('#rxRestart').onclick=()=>{values=[...current.initial];progress.values[current.id]=values;save();render();};
 q('#rxResetProgress').onclick=()=>{if(confirm('¿Borrar solo el avance de las 30 reacciones? Las 40 moléculas se conservan.')){progress={solved:[],values:{},last:'agua'};save();go('agua');if(current?.id==='agua')window.openReaction('agua');}};
})();
