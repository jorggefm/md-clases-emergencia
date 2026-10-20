(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let current=0, keysVisible=false, ideaVisible=false, start=null;
  const validHash=/^#(?:[1-9]|10)$/;
  if(validHash.test(location.hash)) current=Number(location.hash.slice(1))-1;
  function render(){
    const s=SLIDES[current];
    $('slide').src='assets/'+s.file; $('slide').alt=s.alt;
    $('stage').setAttribute('aria-label',`Lámina ${current+1} de ${SLIDES.length}: ${s.title}`);
    $('counter').textContent=`${current+1} / ${SLIDES.length}`;
    $('prev').disabled=current===0; $('next').disabled=current===SLIDES.length-1;
    $('keywords').replaceChildren(...s.keywords.map(k=>{const tag=document.createElement('span');tag.textContent=k;return tag;}));
    $('idea').textContent=s.idea;
    $('keywords').hidden=!keysVisible; $('idea').hidden=!ideaVisible;
    $('keyToggle').setAttribute('aria-pressed',String(keysVisible));
    $('ideaToggle').setAttribute('aria-pressed',String(ideaVisible));
    $('error').hidden=true;
    history.replaceState(null,'','#'+(current+1));
  }
  function move(delta){current=Math.max(0,Math.min(SLIDES.length-1,current+delta));render();}
  $('prev').addEventListener('click',()=>move(-1));
  $('next').addEventListener('click',()=>move(1));
  $('keyToggle').addEventListener('click',()=>{keysVisible=!keysVisible;render();});
  $('ideaToggle').addEventListener('click',()=>{ideaVisible=!ideaVisible;render();});
  document.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
    if(e.key==='Home'){e.preventDefault();current=0;render();}if(e.key==='End'){e.preventDefault();current=SLIDES.length-1;render();}
  });
  $('stage').addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')start={x:e.clientX,y:e.clientY};});
  $('stage').addEventListener('pointerup',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);});
  $('stage').addEventListener('pointercancel',()=>{start=null;});
  $('full').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('presentation').requestFullscreen();}catch{}});
  document.addEventListener('fullscreenchange',()=>{$('full').setAttribute('aria-label',document.fullscreenElement?'Salir de pantalla completa':'Activar pantalla completa');});
  $('slide').addEventListener('error',()=>{$('error').hidden=false;});
  $('slide').addEventListener('load',()=>{$('error').hidden=true;});
  window.addEventListener('hashchange',()=>{if(validHash.test(location.hash)){current=Number(location.hash.slice(1))-1;render();}});
  render();
})();
