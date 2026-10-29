'use strict';
const slides = [
  {file:'01-seleccion-natural.png',title:'Selección natural',keys:['Variación heredable','Ambiente','Descendencia'],idea:'Una variante heredable puede hacerse más común si favorece dejar descendencia en ese ambiente.',alt:'Pinzones con picos variados, sequía y descendientes con distinta proporción de picos.'},
  {file:'02-deriva-genetica.png',title:'Deriva genética',keys:['Azar','Variantes','Generaciones'],idea:'El azar puede cambiar qué variantes se transmiten, especialmente en poblaciones pequeñas.',alt:'Modelo de escarabajos verdes y marrones cuya proporción cambia tras una tormenta aleatoria.'},
  {file:'03-flujo-genico.png',title:'Flujo génico',keys:['Polen','Fecundación','Descendencia'],idea:'Hay flujo génico cuando variantes de una población pasan a la descendencia de otra.',alt:'Polen entre grupos de flores de la misma especie, fecundación y nuevas semillas.'},
  {file:'04-efecto-fundador.png',title:'Efecto fundador',keys:['Colonizadores','Nueva población','Deriva'],idea:'Pocos fundadores pueden llevar solo una parte de las variantes de la población original.',alt:'Tres escarabajos colonizan una isla y originan una población con parte de la diversidad inicial.'},
  {file:'05-cuello-botella.png',title:'Cuello de botella',keys:['Reducción','Recuperación','Diversidad genética'],idea:'Una población puede recuperar su tamaño sin recuperar toda la diversidad genética perdida.',alt:'Elefantes marinos antes y después de una gran reducción, con fichas que representan variantes.'},
  {file:'06-convergencia.png',title:'Evolución convergente',keys:['Linajes diferentes','Función semejante','Convergencia'],idea:'Linajes diferentes pueden desarrollar independientemente rasgos semejantes para funciones parecidas.',alt:'Tiburón y delfín: forma hidrodinámica semejante, branquias y cola vertical frente a pulmones y cola horizontal.'},
  {file:'07-divergencia.png',title:'Evolución divergente',keys:['Antepasado común','Diferencias','Generaciones'],idea:'Los descendientes de un antepasado común pueden acumular diferencias a lo largo de generaciones.',alt:'Árbol ilustrativo de pinzones con un antepasado común y descendientes con picos distintos.'}
];
const $=id=>document.getElementById(id);
let index=Math.max(0,Math.min(slides.length-1,(Number(location.hash.slice(1))||1)-1));
let showKeys=false,showIdea=false;
function loaded(){ $('stage').setAttribute('aria-busy','false'); }
$('slide').addEventListener('load',()=>{loaded();$('error').hidden=true;});
$('slide').addEventListener('error',()=>{loaded();$('error').hidden=false;});
function overlays(){
  $('keywords').replaceChildren(...slides[index].keys.map(key=>{const el=document.createElement('span');el.textContent=key;return el;}));
  $('keywords').hidden=!showKeys;$('idea').textContent=slides[index].idea;$('idea').hidden=!showIdea;
  $('keyToggle').setAttribute('aria-pressed',String(showKeys));$('ideaToggle').setAttribute('aria-pressed',String(showIdea));
}
function render(){
  const s=slides[index];$('stage').setAttribute('aria-busy','true');$('error').hidden=true;
  $('slide').alt=s.alt;$('slide').src='laminas/'+s.file;
  $('title').textContent=s.title;$('counter').textContent=`${index+1} / ${slides.length}`;
  $('stage').setAttribute('aria-label',`Lámina ${index+1} de ${slides.length}: ${s.title}`);
  $('prev').disabled=index===0;$('next').disabled=index===slides.length-1;
  history.replaceState(null,'',`#${index+1}`);overlays();
  if($('slide').complete&&$('slide').naturalWidth)loaded();
  if(index+1<slides.length){const preload=new Image();preload.src='laminas/'+slides[index+1].file;}
}
function step(delta){const target=Math.max(0,Math.min(slides.length-1,index+delta));if(target!==index){index=target;render();}}
$('prev').addEventListener('click',()=>step(-1));$('next').addEventListener('click',()=>step(1));
$('keyToggle').addEventListener('click',()=>{showKeys=!showKeys;overlays();});
$('ideaToggle').addEventListener('click',()=>{showIdea=!showIdea;overlays();});
$('retry').addEventListener('click',render);
document.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}if(e.key==='Home'){index=0;render();}if(e.key==='End'){index=slides.length-1;render();}});
let touch=null;
$('stage').addEventListener('touchstart',e=>{if(e.touches.length===1)touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
$('stage').addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4)step(dx<0?1:-1);touch=null;},{passive:true});
$('full').hidden=!document.documentElement.requestFullscreen;
$('full').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{ $('full').hidden=true; }});
document.addEventListener('fullscreenchange',()=>{const active=!!document.fullscreenElement;$('full').setAttribute('aria-label',active?'Salir de pantalla completa':'Activar pantalla completa');$('full').title=active?'Salir de pantalla completa':'Pantalla completa';});
window.lucide?.createIcons();render();
