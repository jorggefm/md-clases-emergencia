'use strict';
const $ = id => document.getElementById(id);
const C = 3e8, MASS = 9.11e-31;
const fmt = (n, digits = 3) => n.toLocaleString('es-PE', { minimumFractionDigits: digits, maximumFractionDigits: digits }).replaceAll(',', 'X').replaceAll('.', ',').replaceAll('X', ' ');
const sci = n => { if (!n) return '0 J'; const [a,b] = n.toExponential(2).split('e'); return `${a.replace('.', ',')} × 10<sup>${Number(b)}</sup> J`; };
const state = { mode: 'time', beta: .6, own: 5, step: 0, progress: 1, playing: false, last: 0, direction: 1, changedSpeed: false };
const scenarios = {
  time: { title:'El mismo viaje, dos tiempos', subtitle:'La Tierra y la nave comparan sus relojes.', label:'Tiempo propio Δτ', unit:'años', own:5, beta:.6, min:.1, max:100, step:.1, caption:'Movimiento ilustrativo · los relojes conservan la proporción exacta', desc:'La Tierra y una nave con astronauta muestran relojes independientes. El intervalo terrestre es gamma veces el intervalo propio de la nave.' },
  length: { title:'La misma nave, dos longitudes', subtitle:'La contracción ocurre en la dirección del movimiento.', label:'Longitud propia L₀', unit:'m', own:100, beta:.8, min:1, max:1000, step:1, caption:'Esquema de medidas simultáneas · no es una fotografía', desc:'La longitud medida desde la Tierra es la longitud propia dividida entre gamma.' },
  energy: { title:'Más rapidez, más energía', subtitle:'Un electrón conserva su masa en reposo.', label:'Partícula: electrón', own:1, beta:.9, caption:'Energías en el marco de la Tierra · movimiento ilustrativo', desc:'La energía total del electrón se divide entre energía en reposo y energía cinética.' }
};
function physics(beta, own) { const square=beta*beta, diff=1-square, root=Math.sqrt(diff), gamma=1/root, e0=MASS*C*C; return {square,diff,root,gamma,time:gamma*own,length:own/gamma,e0,total:gamma*e0,kinetic:(gamma-1)*e0}; }
function setMode(mode) {
  state.mode=mode; const s=scenarios[mode]; state.beta=s.beta; state.own=s.own; state.direction=1; state.changedSpeed=false;
  $('speed').value=state.beta; $('own-value').value=state.own;
  $('own-value').min=s.min||1; $('own-value').max=s.max||100; $('own-value').step=s.step||1;
  $('own-input-wrap').hidden=mode==='energy'; $('electron-mass').hidden=mode!=='energy';
  $('own-label').textContent=s.label; $('own-unit').textContent=s.unit||'';
  $('scene-title').textContent=s.title; $('scene-subtitle').textContent=s.subtitle;
  $('svg-title').textContent=s.title; $('svg-desc').textContent=s.desc;
  $('scene-caption').textContent=s.caption;
  for (const m of Object.keys(scenarios)) $(`${m}-scene`).toggleAttribute('hidden',m!==mode);
  $('animate').hidden=mode==='length';
  document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===mode));
  $('solution').open=false; stopAnimation(); render();
}
function explain(p) {
  const b=fmt(state.beta), g=fmt(p.gamma);
  const texts=[`β = ${b}: viaja al ${fmt(state.beta*100,1)} % de la rapidez de la luz. c es constante; v es lo que mueves.`, `β² = ${fmt(p.square,3)}. Si β sube, su cuadrado también sube; si β baja, su cuadrado baja.`, `1 − β² = ${fmt(p.diff,3)}. Restar un número mayor deja menos: por eso la flecha cambia de sentido.`, `La raíz vale ${fmt(p.root,3)}. Si lo de dentro disminuye, la raíz también disminuye.`, `Este resultado es γ, el factor de Lorentz. Cerca de 1: efectos pequeños. Cuanto más crece por encima de 1: mayores diferencias entre las medidas.`];
  if(state.beta===0 && state.step===4) texts[4]='Con v = 0, γ = 1 exactamente: no hay diferencias por movimiento relativo. Cuando v aumenta, γ crece y los efectos se hacen más marcados.';
  $('step-explanation').textContent=texts[state.step];
  document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.step)===state.step));
}
function draw(p) {
  const t=state.progress;
  $('earth-time').textContent=fmt(p.time*t,2); $('ship-time').textContent=fmt(state.own*t,2);
  $('earth-time').style.fontSize=$('earth-time').textContent.length>6?'26px':'34px';
  $('time-ship').setAttribute('transform',`translate(${state.playing ? (t-.5)*50*state.beta : 0} 0)`);
  $('scene-speed').textContent=`${fmt(state.beta)}c`;
  $('time-ratio').textContent=`÷ ${fmt(p.gamma,2)}`;
  const width=394/p.gamma;
  // Scale around the common left endpoint: both diagrams share a length scale.
  $('moving-ship').setAttribute('transform',`translate(278 0) scale(${1/p.gamma} 1) translate(-278 0)`);
  $('length-bracket').setAttribute('d',`M278 295v9H${278+width}v-9`);
  $('rest-length').textContent=`${fmt(state.own,1)} m`;
  $('measured-length').textContent=`${fmt(p.length,2)} m`;
  $('rest-energy-bar').setAttribute('width',570/p.gamma);
  $('energy-split').setAttribute('d',`M${60+570/p.gamma} 233v43`);
  $('energy-rest-label').textContent=`E₀ · ${fmt(100/p.gamma,1)} %`;
  $('energy-kinetic-label').textContent=`K · ${fmt(100*(1-1/p.gamma),1)} %`;
  $('electron').setAttribute('transform',`translate(${state.playing ? (t-.5)*160*state.beta : 0} 0)`);
}
function render() {
  const p=physics(state.beta,state.own), g=fmt(p.gamma), b=fmt(state.beta);
  $('gamma-value').textContent=g; $('speed-value').textContent=`${b}c`;
  $('speed-ms').textContent=`v = ${fmt(state.beta*C,0)} m/s`;
  $('speed').setAttribute('aria-valuetext',`${fmt(state.beta*100,1)} por ciento de la rapidez de la luz`);
  ['beta','square','diff','root','inverse'].forEach((key,i)=>$('step-'+key).textContent=fmt([state.beta,p.square,p.diff,p.root,p.gamma][i],3));
  $('trend-context').textContent=state.changedSpeed ? (state.direction>0?'Al aumentar v, estas cantidades cambian así:':'Al disminuir v, las flechas se invierten:') : 'Si aumentas v, ocurre esto:';
  document.querySelectorAll('[data-step]').forEach((button,i)=>{
    const up=[1,1,-1,-1,1][i]*state.direction>0, trend=button.querySelector('.trend');
    trend.dataset.direction=up?'up':'down';trend.setAttribute('aria-label',up?'Aumenta':'Disminuye');
    trend.querySelector('.trend-arrow').textContent=up?'↑':'↓';trend.querySelector('.trend-word').textContent=up?'sube':'baja';
  });
  $('effect-title').textContent=state.beta===0?'γ = 1 · reposo relativo':`γ ≈ ${g} · ${fmt((p.gamma-1)*100,1)} % por encima de 1`;
  $('effect-detail').textContent=state.beta===0?'Sin diferencias por movimiento relativo.':state.mode==='length'?`La longitud medida es ${fmt((1-1/p.gamma)*100,1)} % menor que la propia.`:state.mode==='time'?`El intervalo terrestre es ${fmt((p.gamma-1)*100,1)} % mayor que el propio.`:`La energía total es ${fmt((p.gamma-1)*100,1)} % mayor que mc².`;
  document.querySelectorAll('[data-speed]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.speed)===state.beta));
  explain(p); draw(p);
  let statement, steps, conclusion;
  if(state.mode==='time') {
    $('result-formula').textContent='Δt = γ · Δτ'; $('result-value').textContent=`${fmt(p.time,2)} años`;
    $('result-explanation').textContent=`Mientras el reloj de la nave acumula ${fmt(state.own,2)} años, en el marco de la Tierra transcurren ${fmt(p.time,2)} años entre esos mismos dos sucesos.`;
    statement=`Una nave se mueve a ${b}c respecto de la Tierra. Su reloj registra ${fmt(state.own,2)} años entre dos sucesos. ¿Qué intervalo les asigna el marco de la Tierra?`;
    steps=[`Calcula γ = 1 / √(1 − ${b}²) ≈ ${g}.`,`Identifica el tiempo propio: Δτ = ${fmt(state.own,2)} años, medido por el reloj que acompaña a la nave.`,`Multiplica: Δt = γΔτ ≈ ${g} × ${fmt(state.own,2)} = ${fmt(p.time,2)} años.`];
    conclusion='La Tierra usa relojes sincronizados de su propio marco para asignar tiempos a ambos sucesos. No calculamos la demora con que llegan las imágenes ni un viaje de ida y vuelta.';
    $('takeaway').textContent=`γ = ${g}: el intervalo terrestre es ${g} veces el intervalo propio.`;
  } else if(state.mode==='length') {
    $('result-formula').textContent='L = L₀ / γ'; $('result-value').textContent=`${fmt(p.length,2)} m`;
    $('result-explanation').textContent=`La nave mide ${fmt(state.own,1)} m en su propio marco y ${fmt(p.length,2)} m desde la Tierra. Medimos ambos extremos al mismo tiempo en el marco terrestre.`;
    statement=`Una nave de longitud propia ${fmt(state.own,1)} m viaja a ${b}c respecto de la Tierra. ¿Qué longitud mide un observador terrestre?`;
    steps=[`Calcula γ = 1 / √(1 − ${b}²) ≈ ${g}.`,`Identifica L₀ = ${fmt(state.own,1)} m: longitud medida en reposo con la nave.`,`Divide: L = L₀ / γ = ${fmt(state.own,1)} / γ ≈ ${fmt(p.length,2)} m.`];
    conclusion='Solo se contrae la dimensión paralela al movimiento. La nave no se comprime en su propio marco. A 0,80c y L₀ = 100 m, el resultado es 60 m: redondear γ antes de dividir produce 59,9 m.';
    $('takeaway').textContent=`γ = ${g}: la longitud terrestre es ${fmt(100/p.gamma,1)} % de la longitud propia.`;
  } else {
    $('result-formula').textContent='E = γmc²'; $('result-value').innerHTML=sci(p.total);
    $('result-explanation').innerHTML=`Energía en reposo E₀ = ${sci(p.e0)}. Energía cinética K = (γ − 1)mc² = <b>${sci(p.kinetic)}</b>. La masa en reposo permanece igual.`;
    statement=`Un electrón (m = 9,11 × 10⁻³¹ kg) viaja a ${b}c. ¿Cuáles son su energía total y su energía cinética? Usa c = 3,00 × 10⁸ m/s.`;
    steps=[`Calcula γ = 1 / √(1 − ${b}²) ≈ ${g}.`,`Energía en reposo: E₀ = mc² = (9,11 × 10⁻³¹)(3,00 × 10⁸)² ≈ ${sci(p.e0)}.`,`Energía total: E = γE₀ ≈ ${sci(p.total)}.`,`Energía cinética: K = E − E₀ = (γ − 1)E₀ ≈ ${sci(p.kinetic)}.`];
    conclusion='E incluye energía en reposo y energía cinética. A v = 0, K = 0, pero E = mc². Al acercarse v a c, la energía crece sin límite; un cuerpo con masa no alcanza c.';
    $('takeaway').textContent=`γ = ${g}: la energía total es ${g} veces la energía en reposo.`;
  }
  $('solution-content').innerHTML=`<p><b>Enunciado actual.</b> ${statement}</p><ol>${steps.map(s=>`<li>${s}</li>`).join('')}</ol><p>${conclusion}</p><p class="small">Las cifras mostradas están redondeadas; el cálculo conserva toda la precisión.</p>`;
}
function stopAnimation(){state.playing=false;state.progress=1;$('animate').textContent='Animar comparación';}
function animateFrame(now){
  if(!state.playing)return;
  if(!state.last)state.last=now;
  state.progress=Math.min(1,state.progress+Math.min(now-state.last,100)/7000);state.last=now;
  draw(physics(state.beta,state.own));
  if(state.progress>=1){stopAnimation();draw(physics(state.beta,state.own));}else requestAnimationFrame(animateFrame);
}
function setSpeed(beta){
  if(beta!==state.beta){state.direction=beta>state.beta?1:-1;state.changedSpeed=true;}
  state.beta=beta;$('speed').value=state.beta;stopAnimation();render();
}
$('speed').addEventListener('input',e=>setSpeed(Number(e.target.value)));
document.querySelectorAll('[data-speed]').forEach(b=>b.addEventListener('click',()=>setSpeed(Number(b.dataset.speed))));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{state.step=Number(b.dataset.step);explain(physics(state.beta,state.own));}));
$('beta-info').addEventListener('click',()=>{state.step=0;explain(physics(state.beta,state.own));$('step-explanation').focus();});
$('own-value').addEventListener('input',e=>{if(e.target.validity.valid&&e.target.value!==''){state.own=Number(e.target.value);stopAnimation();render();}});
$('own-value').addEventListener('change',e=>{if(!e.target.validity.valid||e.target.value==='')e.target.value=state.own;});
$('restore').addEventListener('click',()=>setMode(state.mode));
$('animate').addEventListener('click',()=>{
  if(state.playing){state.playing=false;$('animate').textContent='Continuar animación';return;}
  if(state.mode==='length'){
    $('length-scene').animate([{opacity:.25},{opacity:1}],{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:750});return;
  }
  if(state.progress>=1)state.progress=0;
  state.playing=true;state.last=0;$('animate').textContent='Pausar animación';requestAnimationFrame(animateFrame);
});
$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('laboratorio').requestFullscreen();}catch{$('fullscreen').textContent='Usa F11 para ampliar';}});
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Salir de pantalla completa':'Ampliar pantalla';});
$('muon-toggle').addEventListener('click',()=>{const open=$('muon-activity').hidden;$('muon-activity').hidden=!open;$('muon-toggle').setAttribute('aria-expanded',open);$('muon-toggle').textContent=open?'Cerrar actividad':'Explorar una actividad posible';});
$('load-video').addEventListener('click',()=>{$('video-container').innerHTML='<iframe title="MinutePhysics: Lorentz Transformations, Special Relativity capítulo 3 (inglés)" src="https://www.youtube-nocookie.com/embed/Rh0pYtQG5wI" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';});
setMode('time');
