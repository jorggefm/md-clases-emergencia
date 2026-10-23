'use strict';
const exercises = {
 time: {
  title:'Un viaje, dos tiempos',
  statement:'Una nave espacial se mueve a 0,60c respecto de la Tierra. Un reloj dentro de la nave marca 5,0 años. ¿Cuánto tiempo transcurre en el marco de la Tierra entre esos dos sucesos?',
  data:[['Rapidez relativa','v = 0,60c'],['Tiempo propio','Δτ = 5,0 años'],['Buscamos','Δt, medido en el marco terrestre']],
  prediction:'El reloj de la nave está en movimiento respecto de la Tierra. ¿El intervalo terrestre será mayor o menor que 5 años?',
  illustration:'<div class="problem-space"><img class="problem-earth" src="assets/tierra.png" alt="Tierra"><img class="problem-ship" src="assets/nave.png" alt="Nave con astronauta"><span class="problem-speed">v = 0,60c →</span><span class="problem-clock earth-clock">Tierra: ¿Δt?</span><span class="problem-clock ship-clock">Nave: 5,0 años</span></div>',
  steps:[
   ['Identificamos quién lleva el reloj','Los 5,0 años se leen en <b>un reloj que viaja con la nave</b>. Ese es el tiempo propio, Δτ. La Tierra asigna un intervalo Δt a los mismos dos sucesos.','Δτ = 5,0 años'],
   ['Expresamos la rapidez como fracción de c','Dividir 0,60c entre c deja 0,60. Las unidades de rapidez se cancelan.','β = v/c = 0,60'],
   ['Calculamos el factor de Lorentz','Primero elevamos al cuadrado: 0,60² = 0,36. Luego restamos: 1 − 0,36 = 0,64. La raíz de 0,64 es 0,80. Finalmente invertimos.','γ = 1 / √(1 − 0,60²) = 1 / 0,80 = 1,25'],
   ['Elegimos la relación correcta','En la Tierra, el intervalo entre los dos sucesos del reloj móvil es <b>γ veces el intervalo propio</b>. Como γ es mayor que 1, debemos obtener más de 5 años.','Δt = γ · Δτ'],
   ['Sustituimos y calculamos','Multiplicamos el tiempo propio por 1,25. Las unidades siguen siendo años.','Δt = 1,25 × 5,0 = 6,25 años'],
   ['Le damos significado al resultado','Mientras el reloj de la nave acumula <b>5,0 años</b>, el marco terrestre asigna <b>6,25 años</b> al intervalo: 1,25 años más, es decir, 25 % más. Comparamos medidas de tiempo, no el retraso de una imagen que llega a la Tierra.','Respuesta: 6,25 años']
  ],
  help:'Escribe el intervalo terrestre en años. Puedes usar coma o punto decimal.',
  fields:[{label:'Δt en la Tierra',unit:'años',answer:6.25,tolerance:.01}],
  success:'Correcto: 6,25 años. Es mayor que el tiempo propio porque multiplicamos por γ = 1,25.',
  hint:'Revisa quién mide los 5 años. Son el tiempo propio: multiplica 5 por γ = 1,25.'
 },
 length: {
  title:'¿Cuánto mide la nave desde la Tierra?',
  statement:'Una nave tiene una longitud propia de 100 metros. Se mueve a 0,80c respecto de un observador en la Tierra. ¿Cuál es la longitud de la nave medida por ese observador?',
  data:[['Rapidez relativa','v = 0,80c'],['Longitud propia','L₀ = 100 m'],['Buscamos','L, medida desde la Tierra']],
  prediction:'La nave se mueve en la dirección de su longitud. ¿La medida terrestre será mayor o menor que 100 m?',
  illustration:'<div class="problem-length"><div><span>En reposo con la nave · 100 m</span><img src="assets/nave.png" alt="Nave con su longitud propia"></div><div><span>Desde la Tierra · ¿cuánto mide?</span><img class="contracted-example" src="assets/nave.png" alt="La misma nave medida más corta en movimiento"></div></div>',
  steps:[
   ['Identificamos la longitud propia','Los 100 m se miden <b>en reposo con la nave</b>. No son aún la medida terrestre. La contracción afecta a la dimensión paralela al movimiento.','L₀ = 100 m'],
   ['Calculamos β y su cuadrado','v/c = 0,80. Al elevarlo al cuadrado obtenemos 0,64.','β = 0,80; β² = 0,64'],
   ['Obtenemos γ sin redondear antes de tiempo','1 − 0,64 = 0,36; su raíz es 0,60. El inverso de 0,60 es 1,666… Conservamos ese valor completo al calcular.','γ = 1 / √0,36 = 1 / 0,60 = 1,666…'],
   ['Elegimos la relación de longitudes','La medida terrestre se obtiene <b>dividiendo la longitud propia entre γ</b>. Dividir por un número mayor que 1 produce una longitud menor.','L = L₀ / γ'],
   ['Calculamos la medida terrestre','Dividir entre 1/0,60 equivale a multiplicar por 0,60. Así evitamos el redondeo intermedio.','L = 100 × 0,60 = 60 m'],
   ['Interpretamos y cuidamos la medición','La Tierra mide <b>60 m</b>, 40 % menos que la longitud propia. Debe medir ambos extremos <b>simultáneamente en su marco</b>. La nave sigue midiendo 100 m en su propio marco. En la infografía, 59,9 m aparece por redondear γ a 1,67 antes de dividir.','Respuesta: 60 m']
  ],
  help:'Escribe la longitud medida desde la Tierra en metros.',
  fields:[{label:'L desde la Tierra',unit:'m',answer:60,tolerance:.05}],
  success:'Correcto: 60 m. Conservando la precisión de γ se obtiene 60, no 59,9 m.',
  hint:'Usa L = L₀/γ. Puedes calcular directamente 100 × √(1 − 0,80²). Evita redondear γ antes de dividir.'
 },
 energy: {
  title:'La energía total de un electrón',
  statement:'Un electrón, cuya masa en reposo es m = 9,11 × 10⁻³¹ kg, se mueve a 0,90c. ¿Cuál es su energía total? ¿Cuánta energía cinética tiene?',
  data:[['Rapidez relativa','v = 0,90c'],['Masa en reposo','m = 9,11 × 10⁻³¹ kg'],['Rapidez de la luz','c = 3,00 × 10⁸ m/s'],['Buscamos','E total y K cinética, en joules']],
  prediction:'El electrón ya tiene energía en reposo. Al moverse, ¿la energía total incluye esa base o solo la energía del movimiento?',
  illustration:'<div class="problem-energy"><img src="assets/acelerador.png" alt="Aparato ilustrativo para un electrón en movimiento"><span class="problem-electron" aria-label="Electrón ampliado">−</span><strong>E₀ + K = E</strong><p>Base en reposo + movimiento = total</p></div>',
  steps:[
   ['Separamos las dos partes de la energía','<b>E₀ = mc²</b> es la energía asociada a la masa en reposo. <b>K</b> es la energía cinética, asociada al movimiento en el marco terrestre. La energía total E incluye ambas.','E = E₀ + K'],
   ['Calculamos el factor de Lorentz','β = 0,90; β² = 0,81; 1 − β² = 0,19. La raíz es aproximadamente 0,43589. Invertimos ese valor.','γ = 1 / √0,19 ≈ 2,29416'],
   ['Primero entendemos el resultado sin joules','γ ≈ 2,29416 significa que el total equivale a <b>2,29416 veces la energía en reposo</b>. Una vez E₀ es la base; las otras 1,29416 veces E₀ corresponden al movimiento.','1 E₀ + 1,29416 E₀ ≈ 2,29416 E₀'],
   ['Calculamos cuánto vale la base E₀','Al elevar c al cuadrado: (3,00 × 10⁸)² = 9,00 × 10¹⁶. Luego multiplicamos por m: 9,11 × 9,00 = 81,99 y 10⁻³¹ × 10¹⁶ = 10⁻¹⁵.','E₀ = 81,99 × 10⁻¹⁵ J = 8,199 × 10⁻¹⁴ J'],
   ['Hallamos la energía total','Multiplicamos esa base por γ. Usamos el valor completo de γ y redondeamos el resultado final a tres cifras significativas.','E = γE₀ ≈ 2,29416 × 8,199 × 10⁻¹⁴ ≈ 1,88 × 10⁻¹³ J'],
   ['Quitamos la base para obtener solo K','La energía cinética es lo que queda después de restar la energía en reposo. Para restar, escribimos ambas cantidades con la misma potencia de 10. Conservamos precisión hasta el final.','K = E − E₀ ≈ (1,88098 − 0,8199) × 10⁻¹³ ≈ 1,06 × 10⁻¹³ J'],
   ['Comprobamos que las partes suman','La energía en reposo más la energía cinética debe recuperar el total. La masa en reposo del electrón permanece igual. Lo que aumenta con la rapidez es su energía en el marco terrestre.','8,20 × 10⁻¹⁴ J + 1,06 × 10⁻¹³ J ≈ 1,88 × 10⁻¹³ J']
  ],
  help:'Escribe solo el número que multiplica a 10⁻¹³ J. Por ejemplo, para 2,50 × 10⁻¹³ J escribirías 2,50.',
  fields:[{label:'Energía total E',unit:'× 10⁻¹³ J',answer:1.88,tolerance:.005},{label:'Energía cinética K',unit:'× 10⁻¹³ J',answer:1.06,tolerance:.005}],
  success:'Correcto: E ≈ 1,88 × 10⁻¹³ J y K ≈ 1,06 × 10⁻¹³ J. K es solo la parte del movimiento; E incluye también la energía en reposo.',
  hint:'Comprueba dos operaciones distintas: E = γmc² y K = E − mc². En las casillas escribe solo el coeficiente de 10⁻¹³ J.'
 }
};
let currentExercise='time';
const practiceState={time:{shown:1,answers:[],feedback:'',correct:false},length:{shown:1,answers:[],feedback:'',correct:false},energy:{shown:1,answers:[],feedback:'',correct:false}};
function showWorkspace(view, updateHash=true){
 $('simulator-view').hidden=view!=='simulator';$('exercises-view').hidden=view!=='exercises';
 document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));
 if(state.playing){stopAnimation();render();}
 if(updateHash)history.replaceState(null,'',view==='exercises'?'#ejercicios':'#simulador');
}
function renderExercise(){
 const exercise=exercises[currentExercise], work=practiceState[currentExercise];
 document.querySelectorAll('[data-exercise]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.exercise===currentExercise));
 $('problem-title').textContent=exercise.title;$('problem-statement').textContent=exercise.statement;
 $('problem-prediction').textContent=exercise.prediction;$('problem-illustration').innerHTML=exercise.illustration;
 $('problem-data').innerHTML=exercise.data.map(([name,value])=>`<div><dt>${name}</dt><dd>${value}</dd></div>`).join('');
 $('practice-steps').innerHTML=exercise.steps.slice(0,work.shown).map(([title,explanation,formula],i)=>`<li><span class="practice-number">${i+1}</span><div><h4>${title}</h4><p>${explanation}</p><div class="practice-equation">${formula}</div></div></li>`).join('');
 $('practice-progress').textContent=`${work.shown} de ${exercise.steps.length} pasos`;
 $('practice-next').disabled=work.shown===exercise.steps.length;$('practice-all').disabled=work.shown===exercise.steps.length;
 $('practice-next').textContent=work.shown===exercise.steps.length?'Solución completa':'Mostrar el siguiente paso';
 $('answer-help').textContent=exercise.help;
 $('answer-inputs').innerHTML=exercise.fields.map((field,i)=>`<label for="practice-answer-${i}">${field.label}<span><input id="practice-answer-${i}" type="text" inputmode="decimal" autocomplete="off" aria-describedby="answer-help answer-feedback"><small>${field.unit}</small></span></label>`).join('');
 exercise.fields.forEach((field,i)=>{$('practice-answer-'+i).value=work.answers[i]||'';});
 $('answer-feedback').textContent=work.feedback;$('answer-feedback').dataset.correct=String(work.correct);
}
function rememberAnswers(){const work=practiceState[currentExercise];work.answers=exercises[currentExercise].fields.map((_,i)=>$('practice-answer-'+i).value);}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showWorkspace(b.dataset.view)));
document.querySelectorAll('[data-exercise]').forEach(b=>b.addEventListener('click',()=>{rememberAnswers();currentExercise=b.dataset.exercise;renderExercise();}));
$('practice-next').addEventListener('click',()=>{rememberAnswers();practiceState[currentExercise].shown++;renderExercise();$('practice-steps').lastElementChild.scrollIntoView({block:'nearest',behavior:'instant'});});
$('practice-all').addEventListener('click',()=>{rememberAnswers();practiceState[currentExercise].shown=exercises[currentExercise].steps.length;renderExercise();$('practice-steps').scrollIntoView({block:'start',behavior:'instant'});});
$('practice-reset').addEventListener('click',()=>{practiceState[currentExercise]={shown:1,answers:[],feedback:'',correct:false};renderExercise();});
$('try-simulator').addEventListener('click',()=>{setMode(currentExercise);showWorkspace('simulator');$('simulator-view').scrollIntoView({block:'start',behavior:'instant'});});
$('answer-form').addEventListener('submit',e=>{
 e.preventDefault();rememberAnswers();const work=practiceState[currentExercise], exercise=exercises[currentExercise];
 const values=work.answers.map(s=>s.trim().replace(',','.'));
 const valid=values.every(s=>s!==''&&Number.isFinite(Number(s))&&Number(s)>=0);
 work.correct=valid&&values.every((s,i)=>Math.abs(Number(s)-exercise.fields[i].answer)<=exercise.fields[i].tolerance);
 work.feedback=!valid?'Completa las casillas con números positivos. Puedes usar coma o punto decimal.':work.correct?exercise.success:exercise.hint;
 $('answer-feedback').textContent=work.feedback;$('answer-feedback').dataset.correct=String(work.correct);
});
window.addEventListener('hashchange',()=>{if(['#ejercicios','#simulador'].includes(location.hash))showWorkspace(location.hash==='#ejercicios'?'exercises':'simulator',false);});
renderExercise();showWorkspace(location.hash==='#ejercicios'?'exercises':'simulator',false);
