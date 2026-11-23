/* Big Cat Genomes: DNA lab. Hands-on tools for how DNA works, shared by both editions.
   Uses the page tokens (--fg --muted --line --amber --teal --surface --bg --mono --display) and .chip/.card classes. */
(function(){
'use strict';
const host=document.getElementById('ix-dnalab'); if(!host) return;

const css=`
.lab{display:grid;gap:22px}
.lab .tool{display:grid;gap:14px}
.lab .tool > h3{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px}
.lab .tool > h3 .no{font-family:var(--mono);font-size:.75rem;color:var(--muted);font-weight:500;letter-spacing:.08em}
.lab .hint{font-size:.95rem;color:var(--muted);max-width:68ch}
.lab .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.lab .mono{font-family:var(--mono)}
.lab .out{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:12px 14px;min-width:0}
.lab .big{font-family:var(--display);font-size:1.6rem;line-height:1.2;font-weight:700}
.lab .muted{color:var(--muted)}
.lab .pill{display:inline-block;font-family:var(--mono);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:6px;background:var(--surface);color:var(--fg);border:1px solid var(--line)}
.lab .pill.hot{background:var(--amber);color:var(--bg);border-color:var(--amber)}
/* bases */
.b{display:inline-grid;place-items:center;width:1.7em;height:1.9em;border-radius:5px;font-family:var(--mono);font-weight:500;font-size:.95rem;color:#111;border:0;padding:0}
.b-A{background:#7CC47F}.b-T{background:#F08A7E}.b-G{background:#F2C14E}.b-C{background:#7FB2E5}.b-U{background:#C9A0E8}.b-x{background:var(--surface);color:var(--muted);outline:1px dashed var(--line)}
button.b{cursor:pointer}
button.b:hover{filter:brightness(1.08);transform:translateY(-1px)}
.b.chg{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--fg)}
/* ladder */
.ladder{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.ladder button{all:unset;cursor:pointer;display:grid;gap:4px;padding:10px 12px;border-radius:10px;border:1px solid var(--line);background:var(--bg);min-width:0}
.ladder button:focus-visible{outline:3px solid var(--amber);outline-offset:2px}
.ladder button[aria-pressed="true"]{border-color:var(--fg);box-shadow:inset 0 -4px 0 var(--amber)}
.ladder b{font-family:var(--display);font-size:1.05rem}
.ladder small{font-family:var(--mono);font-size:.72rem;color:var(--muted)}
.ladder-out{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:16px;align-items:center}
.ladder-out svg{width:100%;height:auto;max-height:150px}
/* pairing game */
.strand{display:flex;flex-wrap:wrap;gap:4px}
.pairs{display:grid;gap:4px}
.keys{display:flex;gap:8px;flex-wrap:wrap}
.keys .b{width:2.6em;height:2.6em;font-size:1.1rem}
.flash-ok{animation:okf .35s} .flash-bad{animation:badf .35s}
@keyframes okf{50%{transform:scale(1.15)}} @keyframes badf{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
@media (prefers-reduced-motion:reduce){.flash-ok,.flash-bad{animation:none}}
/* mutation lab */
.codons{display:flex;flex-wrap:wrap;gap:10px 8px}
.codon{display:grid;gap:4px;justify-items:center}
.codon .trip{display:flex;gap:2px}
.codon .aa{font-family:var(--mono);font-size:.78rem;padding:1px 6px;border-radius:4px;background:var(--surface);border:1px solid var(--line)}
.codon .aa.diff{background:var(--amber);color:var(--bg);border-color:var(--amber)}
.codon .aa.stop{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.codon.dead{opacity:.35}
.protein{display:flex;flex-wrap:wrap;gap:2px;font-family:var(--mono);font-size:.9rem}
.protein span{display:inline-grid;place-items:center;width:1.5em;height:1.5em;border-radius:50%;background:var(--surface);border:1px solid var(--line)}
.protein span.diff{background:var(--amber);color:var(--bg);border-color:var(--amber)}
.protein span.end{border-radius:4px;background:var(--fg);color:var(--bg);border-color:var(--fg);width:auto;padding:0 6px}
.lab-lbl{font-family:var(--mono);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
/* clock */
.lab input[type=range]{width:100%;accent-color:var(--amber)}
.sliders{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.sliders label{display:grid;gap:4px;font-size:.92rem}
.sliders label span{font-family:var(--mono);font-size:.85rem;color:var(--amber)}
.range-bar{position:relative;height:14px;border-radius:7px;background:var(--surface);border:1px solid var(--line);margin:22px 0 26px}
.range-bar .fill{position:absolute;top:2px;bottom:2px;border-radius:5px;background:var(--amber);opacity:.4}
.range-bar .dot{position:absolute;top:50%;width:16px;height:16px;border-radius:50%;background:var(--amber);border:2px solid var(--bg);transform:translate(-50%,-50%)}
.range-bar .tk{position:absolute;top:18px;font-family:var(--mono);font-size:.7rem;color:var(--muted);transform:translateX(-50%);white-space:nowrap}
/* bottleneck */
.sim{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:16px}
.sim canvas{width:100%;height:auto;display:block;border-radius:10px;background:var(--bg);border:1px solid var(--line)}
.sim .stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.sim .stats div{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:8px 10px}
.sim .stats small{display:block;font-family:var(--mono);font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.sim .stats b{font-family:var(--display);font-size:1.3rem;font-variant-numeric:tabular-nums}
@media (max-width:820px){.ladder{grid-template-columns:repeat(2,minmax(0,1fr))}.ladder-out,.sim,.sliders{grid-template-columns:1fr}.sim .stats{grid-template-columns:repeat(3,minmax(0,1fr))}}
`;
const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const COMP={A:'T',T:'A',G:'C',C:'G'};
const bspan=(b,extra='')=>`<span class="b b-${b} ${extra}">${b}</span>`;

host.className='lab';
host.innerHTML=`
<div class="card tool" id="lab-ladder"><h3><span class="no">TOOL 1</span>From genome to base</h3>
  <p class="hint">A tiger's DNA is an instruction manual written in four letters. Click each level to zoom in.</p>
  <div class="ladder" role="group" aria-label="Zoom level"></div>
  <div class="ladder-out out" aria-live="polite"></div></div>

<div class="card tool" id="lab-pair"><h3><span class="no">TOOL 2</span>Pair the bases</h3>
  <p class="hint">DNA is two strands zipped together. A always pairs with T, and G always pairs with C. That rule lets a cell copy its DNA: each strand is a template for the other. Build the partner strand.</p>
  <div class="out"><div class="lab-lbl">Template strand</div><div class="strand" id="pair-top"></div>
  <div class="lab-lbl" style="margin-top:10px">Your partner strand</div><div class="strand" id="pair-bot"></div></div>
  <div class="row"><div class="keys" role="group" aria-label="Choose a base">${['A','T','G','C'].map(b=>`<button type="button" class="b b-${b}" id="key-${b}" aria-label="Base ${b}">${b}</button>`).join('')}</div>
  <span class="mono muted" id="pair-score" aria-live="polite"></span><button type="button" class="chip" id="pair-new">New strand</button></div></div>

<div class="card tool" id="lab-mut"><h3><span class="no">TOOL 3</span>Mutation lab</h3>
  <p class="hint">Cells read DNA three letters at a time. Each three-letter <b>codon</b> stands for one amino acid, and a chain of amino acids folds into a protein. Pick a mutation, or click any base in the mutated strand to change it yourself.</p>
  <div class="row" role="group" aria-label="Mutation type" id="mut-presets"></div>
  <div class="out" id="mut-explain" aria-live="polite"></div>
  <div class="out"><div class="lab-lbl">Original gene → protein</div><div class="codons" id="mut-ref"></div></div>
  <div class="out"><div class="lab-lbl">Mutated gene → protein · click a base to change it</div><div class="codons" id="mut-alt"></div></div>
  <div class="out"><div class="lab-lbl">Proteins compared</div><div style="display:grid;gap:6px"><div class="protein" id="prot-ref"></div><div class="protein" id="prot-alt"></div></div></div>
  <p class="hint" style="font-size:.85rem">The sequences are short teaching examples, not the real gene sequences. Each preset shows the same <i>kind</i> of change found in the real cat.</p></div>

<div class="card tool" id="lab-clock"><h3><span class="no">TOOL 4</span>Molecular clock</h3>
  <p class="hint">Mutations pile up at a roughly steady rate. Count the differences between two species' DNA, divide by the rate (and by two, because both lineages have been changing since they split), and you get the time since their common ancestor.</p>
  <div class="sliders">
    <label for="clk-d">Difference between the two genomes <span id="clk-d-v"></span><input type="range" id="clk-d" min="0.1" max="4" step="0.1" value="1"></label>
    <label for="clk-r">Mutation rate (changes per base, per year) <span id="clk-r-v"></span><input type="range" id="clk-r" min="0.5" max="2.5" step="0.1" value="1"></label>
  </div>
  <div class="out" aria-live="polite"><div class="big" id="clk-out"></div><div class="mono muted" id="clk-eq" style="font-size:.85rem"></div>
    <div class="range-bar" id="clk-bar"></div><p id="clk-note" style="font-size:.95rem"></p></div></div>

<div class="card tool" id="lab-sim"><h3><span class="no">TOOL 5</span>Bottleneck simulator</h3>
  <p class="hint">Each colored dot is a copy of one gene, and each color is a different version of it. Every generation, cubs inherit a random sample of their parents' copies. In small populations, chance alone wipes out versions. This is genetic drift, and it is how cheetahs lost their diversity.</p>
  <div class="row">
    <label class="mono muted" for="sim-n" style="font-size:.85rem">Population <span id="sim-n-v" style="color:var(--amber)"></span></label>
    <input type="range" id="sim-n" min="10" max="400" step="10" value="200" style="width:min(260px,100%)">
  </div>
  <div class="row"><button type="button" class="chip" id="sim-run">▶ Run</button><button type="button" class="chip" id="sim-crash">Crash to 7 animals</button><button type="button" class="chip" id="sim-reset">Reset</button></div>
  <div class="sim"><canvas id="sim-dots" width="360" height="240" aria-label="Gene copies colored by version"></canvas>
    <div style="display:grid;gap:10px;align-content:start"><div class="stats">
      <div><small>Generation</small><b id="sim-g">0</b></div><div><small>Versions left</small><b id="sim-k">8</b></div><div><small>Diversity</small><b id="sim-h">88%</b></div></div>
      <canvas id="sim-chart" width="480" height="200" aria-label="Diversity over generations"></canvas>
      <p class="hint" style="font-size:.88rem" id="sim-msg" aria-live="polite"></p></div></div></div>`;

/* ---------- Tool 1: ladder ---------- */
const LV=[
 {k:'Genome',s:'2.4 billion bases',t:'The whole instruction set: about 2.4 billion letters in every cell. Typed at one letter per second without a break, a tiger genome would take about 76 years. Printed, it would fill roughly 800,000 pages.'},
 {k:'Chromosome',s:'19 pairs',t:'The genome is split into 19 pairs of chromosomes (2n = 38): one set from the mother, one from the father. Big cat chromosomes have barely changed in 11–15 million years, so a tiger’s chromosomes look almost identical to a house cat’s.'},
 {k:'Gene',s:'~20,000 genes',t:'A gene is a stretch of a chromosome that codes for one protein. The tiger genome has about 20,000 protein-coding genes, making up only a small fraction of the DNA. SLC45A2 is the gene that, with one changed letter, makes a white tiger.'},
 {k:'Codon',s:'3 bases = 1 amino acid',t:'Genes are read three letters at a time. Each triplet (codon) names one of 20 amino acids, or says STOP. ATG means "start here."'},
 {k:'Base',s:'A · T · G · C',t:'The four letters: adenine, thymine, guanine and cytosine. A pairs with T, and G pairs with C, which holds the two strands of the double helix together.'}
];
const lad=host.querySelector('.ladder'), ladOut=host.querySelector('.ladder-out');
function helixSVG(level){
  // simple drawing that changes with zoom level
  const W=400,H=150; let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${LV[level].k} illustration">`;
  if(level===0){ for(let i=0;i<19;i++){const h=40+((19-i)*4.6); s+=`<rect x="${12+i*20}" y="${H-12-h}" width="12" height="${h}" rx="6" style="fill:var(--line)"/>`;} s+=`<text x="200" y="20" text-anchor="middle" style="font:12px var(--mono);fill:var(--muted)">all 19 chromosome types</text>`;}
  else if(level===1){ s+=`<rect x="40" y="60" width="320" height="34" rx="17" style="fill:var(--line)"/>`; for(let i=0;i<22;i++){ if(i%3!==1) s+=`<rect x="${52+i*14}" y="60" width="${5+(i*7)%6}" height="34" style="fill:var(--fg);opacity:.75"/>`;} s+=`<rect x="196" y="60" width="8" height="34" style="fill:var(--amber)"/><text x="200" y="120" text-anchor="middle" style="font:12px var(--mono);fill:var(--muted)">one chromosome · a gene is highlighted</text>`;}
  else if(level===2){ s+=`<rect x="20" y="66" width="360" height="20" rx="4" style="fill:var(--line)"/><rect x="120" y="62" width="160" height="28" rx="4" style="fill:var(--amber)"/><text x="200" y="81" text-anchor="middle" style="font:600 13px var(--mono);fill:var(--bg)">SLC45A2</text><text x="200" y="120" text-anchor="middle" style="font:12px var(--mono);fill:var(--muted)">a gene on its chromosome</text>`;}
  else if(level===3){ const tr=['ATG','GCC','TGC','AAA']; tr.forEach((c,i)=>{ s+=`<rect x="${30+i*88}" y="50" width="78" height="40" rx="8" style="fill:${i===1?'var(--amber)':'var(--line)'}"/><text x="${69+i*88}" y="76" text-anchor="middle" style="font:600 16px var(--mono);fill:${i===1?'var(--bg)':'var(--fg)'}">${c}</text><text x="${69+i*88}" y="112" text-anchor="middle" style="font:12px var(--mono);fill:var(--muted)">${['Met','Ala','Cys','Lys'][i]}</text>`;}); }
  else { const top='ATGCGTAC', col={A:'#7CC47F',T:'#F08A7E',G:'#F2C14E',C:'#7FB2E5'}; for(let i=0;i<8;i++){const x=40+i*42, a=top[i], b=COMP[a];
      s+=`<rect x="${x}" y="26" width="30" height="30" rx="5" fill="${col[a]}"/><text x="${x+15}" y="46" text-anchor="middle" style="font:600 14px var(--mono)" fill="#111">${a}</text><line x1="${x+15}" y1="58" x2="${x+15}" y2="92" style="stroke:var(--muted);stroke-dasharray:3 3"/><rect x="${x}" y="94" width="30" height="30" rx="5" fill="${col[b]}"/><text x="${x+15}" y="114" text-anchor="middle" style="font:600 14px var(--mono)" fill="#111">${b}</text>`;} }
  return s+'</svg>';
}
function setLevel(i){ lad.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',j===i)); ladOut.innerHTML=`<div>${helixSVG(i)}</div><div><p class="big" style="margin-bottom:6px">${LV[i].k}</p><p>${esc(LV[i].t)}</p></div>`; }
LV.forEach((l,i)=>{const b=document.createElement('button'); b.type='button'; b.id='lad-'+i; b.innerHTML=`<b>${l.k}</b><small>${l.s}</small>`; b.addEventListener('click',()=>setLevel(i)); lad.appendChild(b);});
setLevel(0);

/* ---------- Tool 2: pairing game ---------- */
const pTop=host.querySelector('#pair-top'), pBot=host.querySelector('#pair-bot'), pScore=host.querySelector('#pair-score');
let strand='', pos=0, streak=0, best=0, misses=0;
function newStrand(){ strand=Array.from({length:12},()=> 'ATGC'[Math.floor(Math.random()*4)]).join(''); pos=0; misses=0; drawPair(); }
function drawPair(){
  pTop.innerHTML=[...strand].map((b,i)=>bspan(b, i===pos?'chg':'')).join('');
  pBot.innerHTML=[...strand].map((b,i)=> i<pos?bspan(COMP[b]):`<span class="b b-x">${i===pos?'?':''}</span>`).join('');
  pScore.textContent = pos>=strand.length ? `Done! ${misses===0?'No mistakes.':misses+' mistake'+(misses>1?'s':'')+'.'} Best streak ${best}.` : `Streak ${streak} · best ${best}`;
}
function press(b){
  if(pos>=strand.length) return;
  const want=COMP[strand[pos]], key=host.querySelector('#key-'+b);
  key.classList.remove('flash-ok','flash-bad'); void key.offsetWidth;
  if(b===want){ pos++; streak++; best=Math.max(best,streak); key.classList.add('flash-ok'); }
  else { streak=0; misses++; key.classList.add('flash-bad'); pScore.textContent=`${strand[pos]} pairs with ${want}, not ${b}. Try again.`; return; }
  drawPair();
}
['A','T','G','C'].forEach(b=>host.querySelector('#key-'+b).addEventListener('click',()=>press(b)));
host.querySelector('#lab-pair').addEventListener('keydown',e=>{const k=e.key.toUpperCase(); if('ATGC'.includes(k)&&k.length===1){press(k);}});
host.querySelector('#pair-new').addEventListener('click',newStrand);
newStrand();

/* ---------- Tool 3: mutation lab ---------- */
const AA='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const AA3={A:'Ala',R:'Arg',N:'Asn',D:'Asp',C:'Cys',Q:'Gln',E:'Glu',G:'Gly',H:'His',I:'Ile',L:'Leu',K:'Lys',M:'Met',F:'Phe',P:'Pro',S:'Ser',T:'Thr',W:'Trp',Y:'Tyr',V:'Val','*':'STOP'};
const tr=c=>{const i='TCAG'; if(c.length<3) return null; return AA[16*i.indexOf(c[0])+4*i.indexOf(c[1])+i.indexOf(c[2])];};
const REF='ATGGCCTGCAAAGCGCTGTTCGAGACCATCCGCTGGAAGGACTAA';
const PRE=[
 {id:'silent',name:'Silent',alt:()=>REF.slice(0,17)+'A'+REF.slice(18),
  t:'<b>Silent mutation.</b> CTG became CTA, but both codons mean leucine, so the protein is unchanged. Many mutations are harmless like this, because the genetic code has spare codons.'},
 {id:'missense',name:'White tiger · missense',alt:()=>REF.slice(0,13)+'T'+REF.slice(14),
  t:'<b>Missense mutation.</b> One letter changed (GCG → GTG), swapping alanine for valine. The white tiger’s <i>SLC45A2</i> has exactly this kind of change: alanine to valine at position 477 (A477V). The protein still works, but it no longer makes red and yellow pigment.'},
 {id:'nonsense',name:'Black leopard · nonsense',alt:()=>REF.slice(0,8)+'A'+REF.slice(9),
  t:'<b>Nonsense mutation.</b> TGC (cysteine) became TGA, a STOP codon, so the protein is cut short. Black leopards carry this kind of change in <i>ASIP</i>: C333A turns codon 111 into a stop. Without working ASIP, the coat turns black. It is recessive, so a leopard needs two copies.'},
 {id:'deletion',name:'Black jaguar · in-frame deletion',alt:()=>REF.slice(0,18)+REF.slice(33),
  t:'<b>In-frame deletion.</b> Fifteen letters (five codons) are missing. Because 15 divides evenly by 3, everything after the gap still reads correctly, and the protein just loses five amino acids. Black jaguars carry a 15-base deletion in <i>MC1R</i> that leaves the receptor switched on, and one copy is enough.'},
 {id:'frameshift',name:'King cheetah · frameshift',alt:()=>REF.slice(0,12)+'A'+REF.slice(12),
  t:'<b>Frameshift.</b> One extra letter shifts every codon after it, so the rest of the protein is gibberish. King cheetahs carry a one-letter insertion in <i>Taqpep</i>, which turns spots into blotches and stripes.'}
];
let alt=PRE[1].alt(), preset='missense';
function translate(seq){ const out=[]; let stopped=false; for(let i=0;i<seq.length;i+=3){ const c=seq.slice(i,i+3); const a=c.length===3?tr(c):null; out.push({c,a,dead:stopped||a===null}); if(a==='*') stopped=true; } return out; }
function protein(seq){ const p=[]; for(const x of translate(seq)){ if(x.dead||x.a===null) break; p.push(x.a); if(x.a==='*') break; } return p; }
function classify(){
  const rp=protein(REF), ap=protein(alt);
  if(alt===REF) return 'No change';
  if(alt.length!==REF.length) return (alt.length-REF.length)%3!==0?'Frameshift':'In-frame '+(alt.length<REF.length?'deletion':'insertion');
  if(rp.join('')===ap.join('')) return 'Silent';
  if(ap.length<rp.length && ap[ap.length-1]==='*') return 'Nonsense (early stop)';
  if(rp.length===ap.length) return 'Missense';
  return 'Changed protein';
}
function drawCodons(target,seq,other,editable){
  const t=translate(seq), o=translate(other);
  const sameLen=seq.length===other.length, shift=(seq.length-other.length)%3!==0;
  target.innerHTML=t.map((x,ci)=>{
    const oc=o[ci]; const diffAA=(sameLen||shift) && !x.dead && oc && !oc.dead && x.a!==oc.a;
    const bases=[...x.c].map((b,k)=>{ const gi=ci*3+k; const chg=sameLen && other[gi]!==b; return editable?`<button type="button" class="b b-${b} ${chg?'chg':''}" data-i="${gi}" aria-label="Base ${gi+1}: ${b}. Click to change">${b}</button>`:bspan(b,chg&&editable?'chg':''); }).join('');
    const aa=x.a===null?'':`<span class="aa ${x.a==='*'?'stop':''} ${diffAA?'diff':''}">${AA3[x.a]||''}</span>`;
    return `<div class="codon ${x.dead?'dead':''}"><div class="trip">${bases}</div>${x.dead?'<span class="aa" style="visibility:hidden">—</span>':aa}</div>`;
  }).join('');
}
function drawProteins(){
  const rp=protein(REF), ap=protein(alt);
  const show=(arr,cmp)=>arr.map((a,i)=> a==='*'?'<span class="end">STOP</span>':`<span class="${cmp&&cmp[i]!==a?'diff':''}" title="${AA3[a]}">${a}</span>`).join('') + (arr[arr.length-1]==='*'?'':'<span class="end" style="opacity:.6">no stop…</span>');
  host.querySelector('#prot-ref').innerHTML='<span class="lab-lbl" style="width:5.5em;margin:0">Original</span>'+show(rp,null);
  const cmp=(alt.length===REF.length || (alt.length-REF.length)%3!==0)?rp:null;
  host.querySelector('#prot-alt').innerHTML='<span class="lab-lbl" style="width:5.5em;margin:0">Mutated</span>'+show(ap,cmp);
}
function drawMut(){
  host.querySelectorAll('#mut-presets .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.id===preset));
  drawCodons(host.querySelector('#mut-ref'),REF,alt,false);
  drawCodons(host.querySelector('#mut-alt'),alt,REF,true);
  drawProteins();
  const p=PRE.find(x=>x.id===preset);
  const kind=classify();
  host.querySelector('#mut-explain').innerHTML=`<p style="margin-bottom:6px"><span class="pill hot">${esc(kind)}</span> <span class="mono muted" style="font-size:.8rem">${protein(alt).filter(a=>a!=='*').length} vs ${protein(REF).filter(a=>a!=='*').length} amino acids</span></p><p>${p?p.t:'<b>Your own edit.</b> Compare the two proteins below. Did your change alter an amino acid, add a STOP, or do nothing at all?'}</p>`;
}
const mp=host.querySelector('#mut-presets');
PRE.forEach(p=>{const b=document.createElement('button'); b.type='button'; b.className='chip'; b.id='mut-'+p.id; b.dataset.id=p.id; b.textContent=p.name; b.addEventListener('click',()=>{preset=p.id; alt=p.alt(); drawMut();}); mp.appendChild(b);});
const rb=document.createElement('button'); rb.type='button'; rb.className='chip'; rb.id='mut-reset'; rb.textContent='Start from original'; rb.addEventListener('click',()=>{preset='none'; alt=REF; drawMut();}); mp.appendChild(rb);
host.querySelector('#mut-alt').addEventListener('click',e=>{const b=e.target.closest('button.b'); if(!b) return; const i=+b.dataset.i; const nx={A:'C',C:'G',G:'T',T:'A'}[alt[i]]; alt=alt.slice(0,i)+nx+alt.slice(i+1); preset='custom'; drawMut(); const again=host.querySelector(`#mut-alt button[data-i="${i}"]`); if(again) again.focus();});
drawMut();

/* ---------- Tool 4: molecular clock ---------- */
const cd=host.querySelector('#clk-d'), cr=host.querySelector('#clk-r');
function clock(){
  const d=+cd.value/100, r=+cr.value; // r per base per billion years -> per year r*1e-9
  const T=d/(2*r*1e-9)/1e6; // million years
  const Tlo=d/(2*2.5e-9)/1e6, Thi=d/(2*0.5e-9)/1e6;
  host.querySelector('#clk-d-v').textContent=(+cd.value).toFixed(1)+'%';
  host.querySelector('#clk-r-v').textContent=(+cr.value).toFixed(1)+' × 10⁻⁹ per year';
  host.querySelector('#clk-out').textContent='≈ '+(T<1?(T*1000).toFixed(0)+' thousand':T.toFixed(1)+' million')+' years since they split';
  host.querySelector('#clk-eq').textContent=`time = ${(+cd.value).toFixed(1)}% ÷ (2 × ${(+cr.value).toFixed(1)} × 10⁻⁹) = ${(T*1e6).toLocaleString(undefined,{maximumFractionDigits:0})} years`;
  const bar=host.querySelector('#clk-bar'), mx=Thi*1.05, pc=v=>Math.min(100,v/mx*100);
  bar.innerHTML=`<div class="fill" style="left:${pc(Tlo)}%;width:${pc(Thi)-pc(Tlo)}%"></div><div class="dot" style="left:${pc(T)}%"></div>
    <span class="tk" style="left:${pc(Tlo)}%">${Tlo.toFixed(1)} My</span><span class="tk" style="left:${pc(Thi)}%">${Thi.toFixed(1)} My</span>`;
  host.querySelector('#clk-note').innerHTML=`The shaded bar shows the answer for the same DNA difference across the whole slider range of rates: from <b>${Tlo.toFixed(1)}</b> to <b>${Thi.toFixed(1)}</b> million years, a fivefold spread. This is why estimates for the Panthera common ancestor range from 3.7 to 10.7 million years ago. Researchers pin the rate down with dated fossils, and recently by counting new mutations in big cat family pedigrees.`;
}
cd.addEventListener('input',clock); cr.addEventListener('input',clock); clock();

/* ---------- Tool 5: bottleneck simulator ---------- */
const COLORS=['#E4572E','#F3A712','#A8C686','#29335C','#669BBC','#B07BAC','#2E933C','#8C5E34'];
const K=COLORS.length;
const nIn=host.querySelector('#sim-n'), dots=host.querySelector('#sim-dots'), chart=host.querySelector('#sim-chart');
const runB=host.querySelector('#sim-run'), msg=host.querySelector('#sim-msg');
let N=+nIn.value, freq, gen, hist, timer=null, crashLeft=0, preN=N;
const H=f=>1-f.reduce((s,p)=>s+p*p,0);
function reset(){ stop(); N=+nIn.value; freq=Array(K).fill(1/K); gen=0; hist=[H(freq)]; crashLeft=0; msg.textContent='Press Run to watch generations pass. Then reset and try a crash.'; draw(); }
function sampleGen(){
  const copies=2*N, counts=Array(K).fill(0);
  const cum=[]; freq.reduce((a,p,i)=>(cum[i]=a+p),0);
  for(let j=0;j<copies;j++){ const r=Math.random(); let i=0; while(i<K-1 && r>cum[i]) i++; counts[i]++; }
  freq=counts.map(c=>c/copies); gen++; hist.push(H(freq));
  if(crashLeft>0){ crashLeft--; if(crashLeft===0){ N=preN; nIn.value=N; msg.textContent=`The population recovered to ${N} animals, but lost versions never come back. Only new mutations, over many thousands of years, can restore them.`; } }
}
function draw(){
  const ctx=dots.getContext('2d'), W=dots.width, Hh=dots.height; ctx.clearRect(0,0,W,Hh);
  const show=Math.min(2*N,240), cols=Math.ceil(Math.sqrt(show*W/Hh)), rows=Math.ceil(show/cols), cw=W/cols, ch=Hh/rows, rad=Math.max(2,Math.min(cw,ch)*0.38);
  let idx=0; const counts=freq.map(p=>Math.round(p*show)); let diff=show-counts.reduce((a,b)=>a+b,0); if(diff) counts[counts.indexOf(Math.max(...counts))]+=diff;
  counts.forEach((c,k)=>{ for(let j=0;j<c;j++,idx++){ const x=(idx%cols+.5)*cw, y=(Math.floor(idx/cols)+.5)*ch; ctx.beginPath(); ctx.arc(x,y,rad,0,Math.PI*2); ctx.fillStyle=COLORS[k]; ctx.fill(); } });
  const cs=getComputedStyle(host), fg=cs.getPropertyValue('--fg').trim()||'#222', mu=cs.getPropertyValue('--muted').trim()||'#888', am=cs.getPropertyValue('--amber').trim()||'#b60', ln=cs.getPropertyValue('--line').trim()||'#ccc';
  const c2=chart.getContext('2d'), w=chart.width, h=chart.height, L=34, B=22, T=10, R=8; c2.clearRect(0,0,w,h);
  c2.strokeStyle=ln; c2.lineWidth=1; c2.font='11px monospace'; c2.fillStyle=mu;
  [0,.25,.5,.75,1].forEach(v=>{const y=T+(1-v)*(h-T-B); c2.beginPath(); c2.moveTo(L,y); c2.lineTo(w-R,y); c2.stroke(); c2.fillText(Math.round(v*100)+'%',2,y+4);});
  const maxG=Math.max(50,hist.length-1); c2.fillText('generation '+maxG,w-R-92,h-5); c2.fillText('0',L,h-5);
  c2.strokeStyle=am; c2.lineWidth=2.5; c2.beginPath(); hist.forEach((v,i)=>{const x=L+i/maxG*(w-L-R), y=T+(1-v)*(h-T-B); i?c2.lineTo(x,y):c2.moveTo(x,y);}); c2.stroke();
  host.querySelector('#sim-g').textContent=gen; host.querySelector('#sim-k').textContent=freq.filter(p=>p>0).length; host.querySelector('#sim-h').textContent=Math.round(H(freq)*100)+'%';
  host.querySelector('#sim-n-v').textContent=N+' animals'+(crashLeft>0?' (crash!)':'');
}
function step(){ sampleGen(); draw(); if(freq.filter(p=>p>0).length===1){ stop(); msg.textContent=`Only one version is left after ${gen} generations. Diversity at this gene is gone.`; } }
function stop(){ if(timer){clearInterval(timer); timer=null;} runB.textContent='▶ Run'; }
runB.addEventListener('click',()=>{ if(timer){stop();return;} runB.textContent='❚❚ Pause'; timer=setInterval(()=>{ step(); if(gen>=400) stop(); },90); });
host.querySelector('#sim-crash').addEventListener('click',()=>{ preN=+nIn.value; N=7; crashLeft=6; msg.textContent='Crash! Only 7 animals survive for 6 generations, as when cheetahs nearly died out at the end of the last ice age.'; draw(); if(!timer) runB.click(); });
host.querySelector('#sim-reset').addEventListener('click',reset);
nIn.addEventListener('input',()=>{ N=+nIn.value; preN=N; crashLeft=0; draw(); });
new MutationObserver(()=>draw()).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
reset();
})();
