(function(root){
 'use strict';
 const MAX=30;
 function valid(values){return values.every(n=>Number.isInteger(n)&&n>=1&&n<=MAX);}
 function totals(left,right,values){
  const count=(species,offset)=>species.reduce((sum,s,index)=>{for(const [el,n] of Object.entries(s.counts))sum[el]=(sum[el]||0)+n*values[index+offset];return sum;},{});
  return {left:count(left,0),right:count(right,left.length)};
 }
 function gcd(a,b){return b?gcd(b,a%b):a;}
 function evaluate(left,right,values){
  if(values.length!==left.length+right.length||!valid(values))return {valid:false,balanced:false};
  const t=totals(left,right,values),elements=[...new Set([...Object.keys(t.left),...Object.keys(t.right)])];
  const wrong=elements.filter(e=>(t.left[e]||0)!==(t.right[e]||0));
  return {valid:true,balanced:!wrong.length,wrong,...t,divisor:values.reduce(gcd),elements};
 }
 const api={MAX,valid,totals,evaluate};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ReactionCore=api;
})(typeof window!=='undefined'?window:globalThis);
