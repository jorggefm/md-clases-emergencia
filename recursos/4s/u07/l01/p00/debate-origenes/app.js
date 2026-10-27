import { questions as archivedQuestions } from './questions.js';
import { evolutionQuestions, feedback, feedbackSummary, teacherFeedback } from './evolucion.js?v=20261027b';
let round = 'evolucion', questions = evolutionQuestions;
const $ = id => document.getElementById(id);
let names = { ciencia: 'Equipo A', religion: 'Equipo B' };
const timerPanel = document.querySelector('.timer-panel');
const tabs = [...document.querySelectorAll('[role=tab]')];
const savedKey = 'debate-origenes-v2';
let q = 0, phase = 0, first = 'ciencia', tab = 'debate';
let remaining = 45000, deadline = 0, running = false, started = false;
let sound = true, audio, privateData = null, unlockVersion = 0, lockTimeout, noticeTimeout;
let warned = new Set(), projection = false, busy = false;
try { const saved = JSON.parse(localStorage.getItem(savedKey)); if (saved?.round === 'archivo') {round='archivo';questions=archivedQuestions;names={ciencia:'Bando científico',religion:'Bando religioso'};} if (saved && Number.isInteger(saved.q) && saved.q >= 0 && saved.q < questions.length) q = saved.q; if (saved?.sound === false) sound = false; } catch {}
first = q % 2 ? 'religion' : 'ciencia';
function save() { try { localStorage.setItem(savedKey, JSON.stringify({round, q, sound})); } catch {} }
function order() { const second = first === 'ciencia' ? 'religion' : 'ciencia'; return [first, second, first, second]; }
function duration() { return phase < 2 ? 45000 : 30000; }
function notify(message) { $('notice').textContent = message; $('notice').classList.add('visible'); clearTimeout(noticeTimeout); noticeTimeout = setTimeout(() => $('notice').classList.remove('visible'), 3200); }
function beep(kind = 'warn') {
 if (!sound || !audio) return;
 try { const count = kind === 'end' ? 3 : kind === 'urgent' ? 2 : 1; for (let i=0;i<count;i++) {const osc=audio.createOscillator(), gain=audio.createGain(), t=audio.currentTime+i*.24; osc.frequency.value=kind==='end'?440:kind==='urgent'?880:660; gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.13,t+.015);gain.gain.exponentialRampToValueAtTime(.0001,t+.17);osc.connect(gain);gain.connect(audio.destination);osc.start(t);osc.stop(t+.19);} } catch {}
}
function initAudio() { try { audio ||= new (window.AudioContext || window.webkitAudioContext)(); audio.resume().catch(() => {}); } catch { notify('Este navegador no permite sonido. Los avisos visuales siguen activos.'); } }
function drawClock() {
 const seconds = Math.max(0,Math.ceil(remaining/1000));
 $('timer').textContent = `00:${String(seconds).padStart(2,'0')}`;
 $('time-fill').style.transform = `scaleX(${Math.max(0,remaining/duration())})`;
 timerPanel.dataset.urgency = seconds <= 5 ? 'urgent' : seconds <= 10 ? 'warning' : 'normal';
 let status = !started ? 'Listo para empezar' : !seconds ? 'Tiempo terminado · cede la palabra' : !running ? 'En pausa' : seconds <= 5 ? 'Últimos 5 segundos' : seconds <= 10 ? 'Quedan 10 segundos' : 'Turno en curso';
 if ($('timer-status').textContent !== status) $('timer-status').textContent = status;
 $('start').textContent = running ? 'Pausar' : remaining === 0 ? 'Repetir turno' : started ? 'Continuar' : 'Iniciar turno';
}
function tick() {
 if (!running) return;
 remaining = Math.max(0, deadline - Date.now());
 if (!remaining) {running=false;beep('end');warned.add(0);}
 else if (remaining <= 5000 && !warned.has(5)) {warned.add(5);warned.add(10);beep('urgent');}
 else if (remaining <= 10000 && !warned.has(10)) {warned.add(10);beep();}
 drawClock();
}
function pause() { if(running) {remaining = Math.max(0,deadline-Date.now());running=false;drawClock();} }
function reset() {running=false;remaining=duration();started=false;warned.clear();drawClock();}
function toggleTimer() {initAudio();if(running){tick();pause();return;}if(remaining<=0)reset();started=true;running=true;deadline=Date.now()+remaining;drawClock();}
function drawTurn() {
 const teams=order(); timerPanel.dataset.team=teams[phase];$('team').textContent=names[teams[phase]];$('phase-name').textContent=`${phase<2?'Respuesta · 45 segundos':'Réplica · 30 segundos'} · turno ${phase+1} de 4`;
 $('starter').value=first;$('rounds').replaceChildren();
 teams.forEach((team,i)=>{const b=document.createElement('button');b.className='round';b.setAttribute('aria-pressed',String(i===phase));b.setAttribute('aria-label',`Turno ${i+1}: ${i<2?'respuesta':'réplica'} del ${names[team]}`);b.textContent=`${i+1}. ${round==='evolucion'?(team==='ciencia'?'Equipo A':'Equipo B'):(team==='ciencia'?'Ciencia':'Religión')}`;const s=document.createElement('span');s.textContent=i<2?'45 s':'30 s';b.append(s);b.onclick=()=>{if(i===phase)return;phase=i;reset();drawTurn();};$('rounds').append(b);});
 $('advance').disabled=phase===3&&q===questions.length-1;
 $('advance').textContent=phase===3?(q===questions.length-1?'Último turno del debate':'Pasar a la siguiente pregunta →'):'Siguiente turno →';
}
function navigate(index) {
 if(index<0||index>=questions.length||index===q)return;
 const wasRunning=running;q=index;phase=0;first=q%2?'religion':'ciencia';reset();renderQuestion();save();if(wasRunning)notify('Nueva pregunta: el cronómetro está listo, sin iniciar.');
}
function renderQuestion() {
 const item=questions[q];$('topic').textContent=item.topic;$('position').textContent=`${q+1} / ${questions.length}`;$('question').textContent=item.question;$('context').textContent=item.context;$('short-title').textContent=item.title;
 $('previous').disabled=q===0;$('next').disabled=q===questions.length-1;
 document.querySelectorAll('.nav-question').forEach((b,i)=>b.setAttribute('aria-current',String(i===q)));
 drawTurn();if(tab==='ciencia'||tab==='religion')renderPrivate();
}
function buildNav() {let last='';questions.forEach((item,i)=>{if(item.topic!==last){const t=document.createElement('p');t.className='topic-nav';t.textContent=item.topic;$('question-nav').append(t);last=item.topic;}const b=document.createElement('button');b.className='nav-question';b.title=item.title;b.setAttribute('aria-label',`Pregunta ${i+1}: ${item.title}`);const n=document.createElement('span'),label=document.createElement('span');n.className='number';n.textContent=String(i+1).padStart(2,'0');label.className='nav-label';label.textContent=item.title;b.append(n,label);b.onclick=()=>navigate(i);$('question-nav').append(b);});}
function lockPrivate() {unlockVersion++;busy=false;privateData=null;clearTimeout(lockTimeout);$('arguments').replaceChildren();$('arguments').hidden=true;$('unlock-form').hidden=false;$('lock').hidden=true;$('password').value='';$('unlock-error').textContent='';$('unlock').disabled=false;$('unlock').textContent='Entrar';}
function selectTab(value) {
 lockPrivate();tab=value;if(tab!=='debate'){if(running){pause();notify('Cronómetro en pausa.');}if(tab!=='feedback')renderPrivate();}
 tabs.forEach(b=>{const active=b.dataset.tab===tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
 $('panel-debate').hidden=tab!=='debate';$('panel-feedback').hidden=tab!=='feedback';$('panel-private').hidden=!['ciencia','religion'].includes(tab);if(['ciencia','religion'].includes(tab))$('panel-private').setAttribute('aria-labelledby',`tab-${tab}`);
 history.replaceState(null,'',tab==='feedback'?(/^#fragmento-\d+-\d+$/.test(location.hash)?location.hash:'#feedback'):location.pathname+location.search);
}
function textBlock(tag,text,className=''){const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;return node;}
function renderPrivate() {
 $('private-title').textContent=`Argumentos · ${names[tab]}`;$('private-question').textContent=`${q+1}. ${questions[q].question}`;
 if(!privateData)return;
 const item=privateData[q];const box=$('arguments');box.replaceChildren();
 box.append(textBlock('h2','Idea principal'),textBlock('p',item.idea,'argument-main'),textBlock('h2','Desarrolla tu argumento'));
 item.explanation.forEach(p=>box.append(textBlock('p',p)));
 box.append(textBlock('h2','En qué se apoya'),textBlock('p',item.basis));
 item.sources.forEach(source=>{const p=textBlock('p','','source'),a=textBlock('a',source.label);a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';p.append(a);box.append(p);});
 box.append(textBlock('h2','Una posible réplica'),textBlock('p',item.reply,'replica'),textBlock('h2','Un ejemplo para explicarlo'),textBlock('p',item.example));
 $('unlock-form').hidden=true;box.hidden=false;$('lock').hidden=false;
}
function refreshLock(){if(privateData){clearTimeout(lockTimeout);lockTimeout=setTimeout(()=>{lockPrivate();notify('Argumentos bloqueados por inactividad.');},180000);}}
const bytes = base64 => Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
$('unlock-form').addEventListener('submit',async event=>{
 event.preventDefault();if(busy)return;busy=true;const ticket=++unlockVersion;const side=tab;const password=$('password').value;$('password').value='';$('unlock').disabled=true;$('unlock').textContent='Abriendo…';$('unlock-error').textContent='';
 try {
  if(!crypto.subtle)throw new Error('insecure');
  const response=await fetch(round==='evolucion'?'./evolucion.enc.json':'./guides.enc.json',{cache:'no-store'});if(!response.ok)throw new Error('network');const bundle=(await response.json())[side];
  const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(bundle.salt),iterations:bundle.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
  const decoded=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(bundle.iv)},key,bytes(bundle.data));
  if(ticket!==unlockVersion||side!==tab||document.hidden)return;
  privateData=JSON.parse(new TextDecoder().decode(decoded));renderPrivate();refreshLock();$('lock').focus();
 } catch(error){if(ticket===unlockVersion){$('unlock-error').textContent=error.message==='insecure'?'Abre el enlace HTTPS publicado para usar las claves.':error.message==='network'||error instanceof TypeError?'No se pudieron cargar los argumentos. Revisa la conexión e intenta otra vez.':'Clave incorrecta. Solicítala al docente e inténtalo de nuevo.';$('password').focus();}}
 finally{if(ticket===unlockVersion){busy=false;$('unlock').disabled=false;$('unlock').textContent='Entrar';}}
});
tabs.forEach(button=>button.onclick=()=>selectTab(button.dataset.tab));
document.querySelector('.tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const i=tabs.indexOf(document.activeElement);const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length;selectTab(tabs[next].dataset.tab);tabs[next].focus();});
$('lock').onclick=()=>{lockPrivate();$('password').focus();};
$('start').onclick=toggleTimer;$('reset').onclick=()=>{reset();notify('Tiempo reiniciado. Pulsa Iniciar turno cuando estén listos.');};
$('advance').onclick=()=>{if(phase===3){navigate(q+1);return;}phase++;reset();drawTurn();};
$('starter').onchange=()=>{first=$('starter').value;phase=0;reset();drawTurn();};
$('sound').onclick=()=>{sound=!sound;$('sound').textContent=`Sonido: ${sound?'sí':'no'}`;$('sound').setAttribute('aria-pressed',String(sound));if(sound){initAudio();beep();}save();};
$('previous').onclick=()=>navigate(q-1);$('next').onclick=()=>navigate(q+1);
function setProjection(value){projection=value;document.body.classList.toggle('projecting',value);$('exit-project').hidden=!value;}
$('project').onclick=async()=>{if(tab!=='feedback')selectTab('debate');setProjection(true);try{await document.documentElement.requestFullscreen();}catch{notify('Vista de proyección activada.');}};
$('exit-project').onclick=()=>{setProjection(false);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});};
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement)setProjection(false);});
document.addEventListener('keydown',event=>{if(['INPUT','TEXTAREA','SELECT','BUTTON','A'].includes(event.target.tagName))return;if(event.code==='Space'&&tab==='debate'){event.preventDefault();toggleTimer();}if(event.key==='Escape'&&projection)setProjection(false);});
document.addEventListener('visibilitychange',()=>{if(document.hidden){lockPrivate();}else tick();});
window.addEventListener('pagehide',()=>{lockPrivate();pause();});
document.addEventListener('pointerdown',refreshLock,{passive:true});document.addEventListener('keydown',refreshLock);
window.addEventListener('hashchange',()=>{if(location.hash==='#feedback'||/^#fragmento-\d+-\d+$/.test(location.hash))selectTab('feedback');else if(tab==='feedback')selectTab('debate');});
function renderRound() {
 $('debate-round').value=round;$('nav-title').textContent=round==='evolucion'?'Las tres preguntas':'Siete preguntas anteriores';
 for(const side of ['ciencia','religion']) {const button=$('tab-'+side);button.lastChild.textContent='Argumentos · '+(round==='evolucion'?names[side]:(side==='ciencia'?'Ciencia':'Religión'));document.querySelector(`#starter option[value="${side}"]`).textContent=names[side];}
 $('question-nav').replaceChildren();buildNav();renderQuestion();
}
$('debate-round').onchange=()=>{lockPrivate();round=$('debate-round').value;questions=round==='evolucion'?evolutionQuestions:archivedQuestions;names=round==='evolucion'?{ciencia:'Equipo A',religion:'Equipo B'}:{ciencia:'Bando científico',religion:'Bando religioso'};q=0;phase=0;first='ciencia';reset();selectTab('debate');renderRound();save();};
feedbackSummary.forEach(line=>$('feedback-summary').append(textBlock('p',line)));
feedback.forEach((item,index)=>{
 const article=document.createElement('article');article.className='feedback-example';article.id='fragmento-'+item.time.replace(':','-');
 const literal=item.time==='6:26'?'Los seres vivos estamos hechos completamente de materia y no hay ninguna dimensión divina':item.quote;
 article.append(textBlock('h2',`${index+1}. ${item.title}`),textBlock('p',`Minuto ${item.time} aprox. · CITA LITERAL (fragmento)`,'quote-time'),textBlock('p','Texto de la transcripción automática, no una corrección nuestra.','quote-source'),textBlock('blockquote','«'+literal+'»'),textBlock('h3','Lo que puedes decirles ahora'),textBlock('p',teacherFeedback[item.time],'teacher-speech'),textBlock('h3','Así podría responder un estudiante'),textBlock('p','Ejemplo propuesto; no es una cita del video.','example-note'),textBlock('p',item.response,'model-response'),textBlock('h3','Así podría hacer una repregunta'),textBlock('p','Ejemplo propuesto; no es una cita del video.','example-note'),textBlock('p',item.question,'model-question'));
 const detail=document.createElement('details');detail.className='feedback-detail';detail.append(textBlock('summary','Nota adicional para el docente'),textBlock('p',item.observation),textBlock('p',item.practice));article.append(detail);
 const link=textBlock('a',item.time);link.href='#'+article.id;link.setAttribute('aria-label',`Ir a la cita del minuto ${item.time}`);$('feedback-index').append(link);
 $('feedback-examples').append(article);
});
setInterval(tick,100);renderRound();drawClock();$('sound').textContent=`Sonido: ${sound?'sí':'no'}`;$('sound').setAttribute('aria-pressed',String(sound));if(location.hash==='#feedback'||/^#fragmento-\d+-\d+$/.test(location.hash)){selectTab('feedback');document.getElementById(location.hash.slice(1))?.scrollIntoView();}
