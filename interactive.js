/* Big Cat Genomes: interactive features shared by the classic and Material 3 editions.
   Uses each page's own tokens (--fg, --muted, --line, --amber, --teal, --surface, --bg, --mono, --display)
   and its .chip / .card / .flag classes, so it picks up whichever theme the page has. */
(function(){
'use strict';

/* ---------- styles ---------- */
const css=`
.ix-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.ix-panel{display:grid;gap:16px}
.ix-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 14px}
.ix-head h3{font-size:1.6rem;line-height:1.2}
.ix-head .sci{font-family:var(--mono);font-style:italic;color:var(--muted);font-size:.95rem}
.ix-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden}
.ix-stats div{background:var(--bg);padding:10px 12px;min-width:0}
.ix-stats small{display:block;font-family:var(--mono);font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.ix-stats b{display:block;font-family:var(--display);font-size:1.05rem;line-height:1.35;font-weight:600}
.ix-lists{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.ix-lists h4{margin:0 0 6px;font-family:var(--mono);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:500}
.ix-lists ul{margin:0;padding-left:1.1rem;display:grid;gap:6px;font-size:.95rem}
.ix-jump{display:flex;flex-wrap:wrap;gap:8px}
.ix-jump a{font-family:var(--mono);font-size:.8rem}

.ix-dt{margin-bottom:20px}
.ix-dt-scroll{overflow-x:auto}
.ix-dt svg{width:100%;height:auto;display:block}.ix-dt svg.wide{min-width:640px}.ix-dt svg.tall{max-width:440px;margin:0 auto}
.ix-dt .ax{stroke:var(--line);stroke-width:1}
.ix-dt .tk{font-family:var(--mono);font-size:11px;fill:var(--muted)}
.ix-dt .rl{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.06em}
.ix-dt .ev{cursor:pointer;outline:none}
.ix-dt .ev .bar{stroke-width:4;stroke-linecap:round;opacity:.45}
.ix-dt .ev circle:not(.hit){stroke:var(--bg);stroke-width:2}.ix-dt .ev .hit{fill:transparent;stroke:none}
.ix-dt .ev:hover circle:not(.hit),.ix-dt .ev:focus circle:not(.hit),.ix-dt .ev.on circle:not(.hit){r:10;stroke:var(--fg)}
.ix-dt .c-dna{fill:var(--amber);stroke:var(--amber)} .ix-dt .c-fossil{fill:var(--teal);stroke:var(--teal)} .ix-dt .c-move{fill:var(--fg);stroke:var(--fg)}
.ix-dt-detail{margin-top:10px;min-height:5.2em}
.ix-dt-detail .when{font-family:var(--mono);color:var(--amber);font-weight:500}
.ix-dt-detail .src{font-family:var(--mono);font-size:.75rem;color:var(--muted)}
.ix-legend{display:flex;flex-wrap:wrap;gap:14px;font-family:var(--mono);font-size:.75rem;color:var(--muted);margin-top:6px}
.ix-legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:-1px}

.ix-breed{margin-top:28px}
.ix-breed .ix-controls{display:flex;flex-wrap:wrap;gap:12px 20px;align-items:end}
.ix-breed label{display:grid;gap:4px;font-family:var(--mono);font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.ix-breed select{font:inherit;font-family:var(--body);text-transform:none;letter-spacing:0;font-size:.95rem;color:var(--fg);background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:8px 10px;min-width:13rem;max-width:100%}
.ix-punnett{display:grid;grid-template-columns:auto 1fr 1fr;gap:6px;max-width:520px;margin-top:6px}
.ix-punnett .h{font-family:var(--mono);font-size:.8rem;color:var(--muted);display:grid;place-items:center;padding:4px}
.ix-punnett .cell{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:8px;display:grid;gap:6px;justify-items:start;font-size:.85rem;min-width:0}
.ix-punnett .cell code{font-family:var(--mono);font-size:.85rem}
.ix-sw{display:inline-block;width:44px;height:24px;border-radius:6px;border:1px solid var(--line);flex:none}
.sw-tiger{background:repeating-linear-gradient(100deg,#1b1209 0 3px,#D9822B 3px 11px)}
.sw-whitetiger{background:repeating-linear-gradient(100deg,#3a3530 0 3px,#F3EEE6 3px 11px)}
.sw-leopard{background:radial-gradient(circle at 50% 50%,#2b1d10 2.2px,transparent 3px) 0 0/9px 9px,#D9A441}
.sw-jaguar{background:radial-gradient(circle at 50% 50%,transparent 1.5px,#2b1d10 2px 3.4px,transparent 3.8px) 0 0/12px 12px,#D49A3C}
.sw-black{background:radial-gradient(circle at 50% 50%,#2c2a28 2.2px,transparent 3px) 0 0/9px 9px,#121110}
.sw-cheetah{background:radial-gradient(circle,#1a1a1a 1.6px,transparent 2.2px) 0 0/7px 7px,#DDB46A}
.sw-king{background:linear-gradient(90deg,transparent 30%,#1a1a1a 30% 42%,transparent 42% 64%,#1a1a1a 64% 74%,transparent 74%),radial-gradient(ellipse 4px 3px at 50% 50%,#1a1a1a 80%,transparent 90%) 0 0/11px 8px,#DDB46A}
.ix-result{display:grid;gap:8px;margin-top:4px}
.ix-result div{display:flex;align-items:center;gap:10px;font-size:.95rem}
.ix-result b{font-family:var(--mono);min-width:3.2em;text-align:right;font-variant-numeric:tabular-nums}

.ix-quiz{display:grid;gap:14px}
.ix-q .opts{display:flex;flex-wrap:wrap;gap:8px}
.ix-q .chip:disabled{cursor:default}
.ix-q .chip.ix-right{outline:2px solid var(--teal);outline-offset:1px}
.ix-q .chip.ix-wrong{outline:2px dashed var(--amber);outline-offset:1px;opacity:.8}
.ix-q .why{font-size:.95rem}
.ix-q .why[hidden]{display:none}
.ix-score{display:flex;flex-wrap:wrap;align-items:center;gap:12px;font-family:var(--mono);font-size:.9rem}
/* ---- phones ---- */
@media (max-width:600px){
  .tbl{border:0;overflow:visible;background:transparent}
  .tbl table,.tbl tbody{display:block;min-width:0}
  .tbl thead{display:none}
  .tbl tr{display:grid;gap:6px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;margin-bottom:10px;background:var(--surface)}
  .tbl td{display:grid;grid-template-columns:6.6em minmax(0,1fr);gap:10px;border:0!important;padding:0;font-size:.95rem}
  .tbl td::before{content:attr(data-label);font-family:var(--mono);font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);padding-top:.25em}
  .tbl td:first-child{display:block;font-weight:600;font-size:1.02rem}
  .tbl td:first-child::before{content:none}
  .tbl td.num{white-space:normal}
  .flag{font-size:12px!important;height:auto!important;padding-block:1px!important}
  .kind,.eyebrow{font-size:12px!important}
  .ix-stats small,.ix-lists h4{font-size:11.5px}
  #tree .leaf{font-size:18px}
  #tree .sci{font-size:13px}
  .ix-dt-detail{min-height:0}
  section{padding-block:2.4rem .5rem!important}
}
@media (max-width:600px),(pointer:coarse){
  .chip{min-height:40px}
  .seed{width:40px!important;height:40px!important}
  nav.tracks a{padding-top:12px!important;padding-bottom:12px!important}
  .ix-jump a{display:inline-block;padding:8px 0}
  ol.refs a{display:inline-block;padding:4px 0}
  .ix-breed select{min-height:44px}
}
@media (max-width:820px){
  nav.tracks ul{-webkit-mask-image:linear-gradient(90deg,#000 82%,transparent);mask-image:linear-gradient(90deg,#000 82%,transparent);padding-right:48px!important}
}#tree text{cursor:pointer}
#tree text:hover{text-decoration:underline}
.ix-tip{font-family:var(--mono);font-size:.75rem;color:var(--muted)}
@media (max-width:820px){.ix-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.ix-lists{grid-template-columns:1fr}.ix-punnett{grid-template-columns:auto 1fr 1fr}}
`;
const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

function el(tag,attrs,html){const e=document.createElement(tag); if(attrs) for(const k in attrs){ if(k==='class') e.className=attrs[k]; else e.setAttribute(k,attrs[k]); } if(html!=null) e.innerHTML=html; return e;}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- 1. Species explorer ---------- */
const SPECIES=[
 {id:'tiger',name:'Tiger',sci:'Panthera tigris',tree:'Tiger',status:'Endangered',pop:'3,726–5,578 (2022)',genome:'2013 · Amur tiger',kin:'Snow leopard',
  dna:['First big cat genome (Cho et al. 2013): 178 genes under selection, enriched for muscle function.',
       'White coat: one change in SLC45A2 (A477V), recessive. Golden coat: CORIN, recessive.',
       'Largest working set of smell and pheromone receptor genes of any big cat.',
       '2026: a Sumatran tiger genome with 17 of 19 chromosomes read end to end.'],
  origin:['Sister species to the snow leopard, the most stable pairing in the Panthera tree.',
       'Tiger-lineage skull Panthera zdanskyi, Gansu, China: 2.55–2.16 Mya.',
       'Living tigers share an ancestor about 110,000 years ago. Genomes split them into six groups; IUCN recognises two subspecies.'],
  jump:[['#coats','Coat genes'],['#conservation','Subspecies debate']]},
 {id:'lion',name:'Lion',sci:'Panthera leo',tree:'Lion',status:'Vulnerable',pop:'~22–25k Africa · 891 India (2025)',genome:'2013 resequenced · 2020 chromosome-level',kin:'Leopard or jaguar (debated)',
  dna:['The lion lineage shows the most ancient hybridization of any Panthera.',
       'White lions: TYR change (R87Q), probably recessive.',
       '68% of one pheromone-receptor gene family (V1R) no longer works, possibly linked to social life.',
       'Asiatic lions in Gir carry almost no genetic diversity.'],
  origin:['Two subspecies, P. l. leo and P. l. melanochaita, split about 70,000 years ago.',
       'Cave lions split from modern lions 0.5–1.9 Mya, and modern lions later added 3–4% to some cave lion genomes.',
       'The American lion was isolated about 340,000 years ago.'],
  jump:[['#tangled','Hybrids'],['#ancient','Cave lions']]},
 {id:'leopard',name:'Leopard',sci:'Panthera pardus',tree:'Leopard',status:'Vulnerable · Amur: Critically Endangered',pop:'No global estimate · Amur ~84 (2014–15)',genome:'2016 · Amur leopard',kin:'Lion (debated)',
  dna:['Black leopards: recessive ASIP stop mutation. About 11% of leopards are black, mostly in Asian rainforests.',
       'The leopard genome showed cats lost starch-digestion and amylase genes.',
       'Amur leopards have the lowest diversity of any leopard sampled.'],
  origin:['Asian leopards descend from one dispersal out of Africa 500,000–600,000 years ago.',
       'The genetic gap between African and Asian leopards exceeds that between brown and polar bears.',
       'The Laetoli "leopard" fossil may be an early puma, leaving the oldest leopard record uncertain.'],
  jump:[['#coats','Melanism'],['#origins','Fossils']]},
 {id:'jaguar',name:'Jaguar',sci:'Panthera onca',tree:'Jaguar',status:'Near Threatened',pop:'~173,000 (2018)',genome:'2017 · Pantanal jaguar',kin:'Lion or leopard (unresolved)',
  dna:['Black jaguars: a 15-base deletion in MC1R, dominant, so one copy is enough.',
       'Skull-shaping genes ESRP1 and SSTR4 under selection, linked by the authors to its powerful bite.',
       'Optic-nerve genes DOCK3 and COL4A5 may have arrived by ancient hybridization.'],
  origin:['Its place in the tree is the biggest open question in Panthera.',
       'Earliest jaguars in North America: about 0.85–1.5 Mya.',
       'Modern jaguar mitochondrial lineages coalesce 280,000–510,000 years ago.'],
  jump:[['#tree-sec','Family tree'],['#tangled','Hybrids']]},
 {id:'snow',name:'Snow leopard',sci:'Panthera uncia',tree:'Snow leopard',status:'Vulnerable',pop:'~4,000–7,500',genome:'2013 resequenced · 2025 chromosome-level',kin:'Tiger',
  dna:['Unique EGLN1 change (Met39) and EPAS1 changes in the low-oxygen response; EPAS1 selection rises with elevation.',
       'Its hemoglobin is not specially adapted, so altitude adaptation works elsewhere.',
       'Carries a mitochondrion borrowed from the lion/leopard lineage through an ancient hybrid.',
       'A Panthera that does not roar; its vocal folds are intermediate.'],
  origin:['Sister to the tiger in nuclear DNA.',
       'Panthera blytheae from Tibet (5.95–4.10 Mya) was described as a relative, but its genus is now disputed.'],
  jump:[['#genomes','Altitude genes'],['#tree-sec','Borrowed mitochondria']]},
 {id:'cheetah',name:'Cheetah',sci:'Acinonyx jubatus',tree:null,status:'Vulnerable',pop:'~7,100 (2017)',genome:'2015 · Namibian cheetah',kin:'Puma and jaguarundi (not Panthera)',
  dna:['About 95% homozygous after bottlenecks over 100,000 and about 12,000 years ago.',
       'Unrelated cheetahs accepted each other’s skin grafts in the 1980s.',
       'Fixed AKAP4 defects may explain why over 80% of sperm are misshapen.',
       'King cheetah: a recessive one-base insertion in Taqpep.'],
  origin:['Split from the puma lineage about 4.9 Mya.',
       'DNA hints at a North American origin, but all Acinonyx fossils are from the Old World.',
       'The "American cheetah" Miracinonyx was actually a puma relative.'],
  jump:[['#conservation','Cheetah debate'],['#coats','King cheetah']]},
 {id:'clouded',name:'Clouded leopard',sci:'Neofelis nebulosa · N. diardi',tree:'Clouded leopard',status:'Not covered here',pop:'Not covered here',genome:'2022 · both species',kin:'Sister to all Panthera',
  dna:['Split into two species in 2006 on DNA, skull and coat evidence.',
       'Whole genomes date the mainland–Sunda split to about 5.1 Mya (3.8–6.5).',
       'The Sunda species has lower heterozygosity.'],
  origin:['Branched from Panthera about 6.2–6.4 Mya.',
       'Pachypanthera from Thailand (9–6 Mya) may be the oldest pantherine.'],
  jump:[['#tangled','Two species']]}
];
const spHost=document.getElementById('ix-species');
function renderSpecies(id){
  const s=SPECIES.find(x=>x.id===id)||SPECIES[0];
  spHost.querySelectorAll('.ix-row .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.id===s.id));
  const p=spHost.querySelector('.ix-panel');
  p.innerHTML=`<div class="ix-head"><h3>${esc(s.name)}</h3><span class="sci">${esc(s.sci)}</span><span class="flag">${esc(s.status)}</span></div>
   <div class="ix-stats">
     <div><small>Wild population</small><b>${esc(s.pop)}</b></div>
     <div><small>First genome</small><b>${esc(s.genome)}</b></div>
     <div><small>Closest relative</small><b>${esc(s.kin)}</b></div>
     <div><small>Chromosomes</small><b>2n = 38</b></div>
   </div>
   <div class="ix-lists">
     <div><h4>What the DNA shows</h4><ul>${s.dna.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div>
     <div><h4>Origins</h4><ul>${s.origin.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div>
   </div>
   <div class="ix-jump">${s.jump.map(j=>`<a href="${j[0]}">More: ${esc(j[1])} →</a>`).join('')}</div>`;
}
if(spHost){
  const row=el('div',{class:'ix-row',role:'group','aria-label':'Choose a cat'});
  SPECIES.forEach(s=>{const b=el('button',{type:'button',class:'chip',id:'sp-'+s.id,'aria-pressed':'false'},esc(s.name)); b.dataset.id=s.id; b.addEventListener('click',()=>renderSpecies(s.id)); row.appendChild(b);});
  spHost.appendChild(row);
  spHost.appendChild(el('div',{class:'card ix-panel','aria-live':'polite'}));
  renderSpecies('tiger');
}

/* tree names open the explorer */
const treeSvg=document.getElementById('tree');
if(treeSvg && spHost){
  treeSvg.addEventListener('click',e=>{
    const t=e.target.closest('text'); if(!t) return;
    const label=t.textContent.trim();
    const s=SPECIES.find(x=>x.tree===label || x.sci.startsWith(label.replace('P. ','Panthera ')) || (label==='Neofelis'&&x.id==='clouded'));
    if(s){ renderSpecies(s.id); document.getElementById('species').scrollIntoView({block:'start'}); }
  });
  const cap=document.getElementById('tree-cap');
  if(cap) cap.insertAdjacentElement('afterend', el('p',{class:'ix-tip'},'Click a cat’s name to open it in Meet the cats.'));
}

/* ---------- 2. Deep-time chart (horizontal on wide screens, vertical on phones) ---------- */
const dtHost=document.getElementById('ix-deeptime');
let EV=[]; try{ EV=events; }catch(e){ EV=[]; }
if(dtHost && EV.length){
  const parse=s=>{const m=String(s).replace(/~/g,'').match(/[\d.]+/g); return m?m.map(Number):null;};
  const CAT={dna:{label:'DNA',cls:'c-dna'},fossil:{label:'FOSSIL',cls:'c-fossil'},move:{label:'MIGRATION',cls:'c-move'}};
  const ORDER=['dna','fossil','move'];
  const NS='http://www.w3.org/2000/svg', minA=0.006, maxA=40, lg=Math.log10;
  const mk=(t,a)=>{const n=document.createElementNS(NS,t); for(const k in a) n.setAttribute(k,a[k]); return n;};
  const TICKS=[[0.01,'10,000 yrs'],[0.1,'100,000 yrs'],[1,'1 million'],[10,'10 million']];
  const tip=el('p',{class:'ix-tip'});
  const sc=el('div',{class:'ix-dt-scroll'});
  const legend=el('div',{class:'ix-legend'},'<span><i style="background:var(--amber)"></i>DNA estimate</span><span><i style="background:var(--teal)"></i>Fossil</span><span><i style="background:var(--fg)"></i>Migration</span>');
  const detail=el('div',{class:'card ix-dt-detail','aria-live':'polite'});
  dtHost.className='ix-dt'; dtHost.append(tip,sc,legend,detail);
  let nodes=[], current=Math.max(0,EV.findIndex(e=>e[0]==='10.8')), mode='';
  function show(i){
    current=i; const e=EV[i]; nodes.forEach((n,j)=>n&&n.classList.toggle('on',j===i));
    detail.innerHTML=`<p><span class="when">${esc(e[0])} Mya</span>${e[1]?` <span class="src">range ${esc(e[1])}</span>`:''} · <span class="kind">${({dna:'DNA estimate',fossil:'Fossil',move:'Migration'})[e[2]]}</span></p><p>${esc(e[3])}</p><p class="src">${esc(e[4])}</p>`;
  }
  function addPoint(svg,i,e,pos,cls){
    const g=mk('g',{class:'ev '+cls,tabindex:'0',role:'button','aria-label':`${e[0]} million years ago: ${e[3]}`});
    if(pos.bar) g.appendChild(mk('line',Object.assign({class:'bar'},pos.bar)));
    g.appendChild(mk('circle',{cx:pos.cx,cy:pos.cy,r:pos.r}));
    g.appendChild(mk('circle',{cx:pos.cx,cy:pos.cy,r:pos.hit,class:'hit'}));
    const go=()=>show(i);
    g.addEventListener('click',go); g.addEventListener('mouseenter',go); g.addEventListener('focus',go);
    g.addEventListener('keydown',k=>{if(k.key==='Enter'||k.key===' '){k.preventDefault();go();}});
    svg.appendChild(g); nodes[i]=g;
  }
  function spans(e){
    const v=parse(e[0]); if(!v) return null; let lo=Math.min(...v), hi=Math.max(...v);
    const rr=e[1]&&/^[\d.]+–[\d.]+$/.test(e[1])?parse(e[1]):null; let rlo=lo,rhi=hi; if(rr){rlo=Math.min(rlo,rr[0]);rhi=Math.max(rhi,rr[1]);}
    return {mid:Math.sqrt(lo*hi),rlo,rhi};
  }
  function build(){
    const vertical=dtHost.clientWidth<560; const m=vertical?'v':'h'; if(m===mode) return; mode=m;
    sc.innerHTML=''; nodes=[];
    const svg=document.createElementNS(NS,'svg'); svg.setAttribute('role','group'); svg.setAttribute('aria-label','Events on a logarithmic deep-time scale');
    const count={dna:0,fossil:0,move:0};
    if(!vertical){
      const W=1000,H=228,L=104,R=24, x=a=>L+(1-(lg(a)-lg(minA))/(lg(maxA)-lg(minA)))*(W-L-R);
      svg.setAttribute('viewBox',`0 0 ${W} ${H}`); svg.classList.add('wide');
      TICKS.forEach(([a,l])=>{svg.appendChild(mk('line',{x1:x(a),x2:x(a),y1:28,y2:190,class:'ax','stroke-dasharray':'3 4'})); const t=mk('text',{x:x(a),y:212,'text-anchor':'middle',class:'tk'}); t.textContent=l; svg.appendChild(t);});
      const o=mk('text',{x:L,y:18,class:'tk'}); o.textContent='← older'; svg.appendChild(o);
      const n=mk('text',{x:W-R,y:18,'text-anchor':'end',class:'tk'}); n.textContent='more recent →'; svg.appendChild(n);
      const Y={dna:58,fossil:112,move:166};
      ORDER.forEach(k=>{svg.appendChild(mk('line',{x1:L,x2:W-R,y1:Y[k],y2:Y[k],class:'ax'})); const t=mk('text',{x:8,y:Y[k]+4,class:'rl '+CAT[k].cls}); t.style.stroke='none'; t.textContent=CAT[k].label; svg.appendChild(t);});
      EV.forEach((e,i)=>{const s=spans(e); if(!s) return; const y=Y[e[2]]+((count[e[2]]++%3)-1)*9;
        addPoint(svg,i,e,{cx:x(s.mid),cy:y,r:6,hit:12,bar:s.rhi>s.rlo?{x1:x(s.rhi),x2:x(s.rlo),y1:y,y2:y}:null},CAT[e[2]].cls);});
      tip.textContent='Hover over or tap a point. The scale is logarithmic: each gridline is ten times older than the one to its right. Bars show the published range.';
    } else {
      const W=360,H=620,T=34,B=16,L=86, colW=(W-L-8)/3, y=a=>T+(lg(maxA)-lg(a))/(lg(maxA)-lg(minA))*(H-T-B);
      svg.setAttribute('viewBox',`0 0 ${W} ${H}`); svg.classList.add('tall');
      TICKS.forEach(([a,l])=>{svg.appendChild(mk('line',{x1:L-4,x2:W-4,y1:y(a),y2:y(a),class:'ax','stroke-dasharray':'3 4'})); const t=mk('text',{x:L-8,y:y(a)+4,'text-anchor':'end',class:'tk'}); t.textContent=l; svg.appendChild(t);});
      const o=mk('text',{x:4,y:T-14,class:'tk'}); o.textContent='↑ older'; svg.appendChild(o);
      const n=mk('text',{x:4,y:H-2,class:'tk'}); n.textContent='↓ more recent'; svg.appendChild(n);
      const X={}; ORDER.forEach((k,j)=>{X[k]=L+colW*(j+.5); svg.appendChild(mk('line',{x1:X[k],x2:X[k],y1:T,y2:H-B,class:'ax'})); const t=mk('text',{x:X[k],y:T-14,'text-anchor':'middle',class:'rl '+CAT[k].cls}); t.style.stroke='none'; t.textContent=CAT[k].label; svg.appendChild(t);});
      EV.forEach((e,i)=>{const s=spans(e); if(!s) return; const x=X[e[2]]+((count[e[2]]++%3)-1)*16;
        addPoint(svg,i,e,{cx:x,cy:y(s.mid),r:7,hit:15,bar:s.rhi>s.rlo?{x1:x,x2:x,y1:y(s.rhi),y2:y(s.rlo)}:null},CAT[e[2]].cls);});
      tip.textContent='Tap a point to read about it. Older events are at the top; each gridline is ten times older than the one below it. Bars show the published range.';
    }
    sc.appendChild(svg); show(current);
  }
  build();
  let rt; window.addEventListener('resize',()=>{clearTimeout(rt); rt=setTimeout(build,150);});
}

/* ---------- 3. Coat genetics calculator ---------- */
const TRAITS={
 tiger:{label:'Tiger · white coat',gene:'SLC45A2',dominant:false,N:'W',V:'w',src:'Xu et al. 2013',
   names:['Orange','Orange, carries white','White'],sw:['tiger','tiger','whitetiger'],ph:['Orange','White']},
 leopard:{label:'Leopard · black coat',gene:'ASIP',dominant:false,N:'A',V:'a',src:'Schneider et al. 2012',
   names:['Spotted','Spotted, carries black','Black'],sw:['leopard','leopard','black'],ph:['Spotted','Black']},
 jaguar:{label:'Jaguar · black coat',gene:'MC1R',dominant:true,N:'e',V:'E',src:'Eizirik et al. 2003',
   names:['Spotted','Black (one copy)','Black (two copies)'],sw:['jaguar','black','black'],ph:['Spotted','Black']},
 cheetah:{label:'Cheetah · king pattern',gene:'Taqpep',dominant:false,N:'T',V:'t',src:'Kaelin et al. 2012',
   names:['Spotted','Spotted, carries king','King'],sw:['cheetah','cheetah','king'],ph:['Spotted','King']}
};
const brHost=document.getElementById('ix-breeder');
if(brHost){
  brHost.className='ix-breed';
  brHost.innerHTML=`<h3 style="margin-bottom:6px">Try it: breed two cats</h3>
  <p class="prose" style="margin-bottom:14px">Pick a trait and two parents to see the odds for their cubs. Each parent passes on one of its two copies of the gene at random.</p>
  <div class="card" style="gap:14px">
    <div class="ix-controls">
      <label for="br-trait">Trait<select id="br-trait">${Object.entries(TRAITS).map(([k,t])=>`<option value="${k}">${esc(t.label)}</option>`).join('')}</select></label>
      <label for="br-p1">Parent 1<select id="br-p1"></select></label>
      <label for="br-p2">Parent 2<select id="br-p2"></select></label>
    </div>
    <div class="ix-punnett" id="br-grid"></div>
    <div class="ix-result" id="br-result" aria-live="polite"></div>
    <p class="src" id="br-src" style="font-family:var(--mono);font-size:.75rem;color:var(--muted)"></p>
  </div>`;
  const tSel=brHost.querySelector('#br-trait'), p1=brHost.querySelector('#br-p1'), p2=brHost.querySelector('#br-p2');
  const grid=brHost.querySelector('#br-grid'), res=brHost.querySelector('#br-result'), src=brHost.querySelector('#br-src');
  const geno=(t,n)=> n===0?t.N+t.N : n===1?(t.dominant?t.V+t.N:t.N+t.V) : t.V+t.V;
  const isVariant=(t,n)=> t.dominant? n>=1 : n===2;
  function fillParents(){
    const t=TRAITS[tSel.value];
    [p1,p2].forEach((s,j)=>{ s.innerHTML=t.names.map((n,i)=>`<option value="${i}">${esc(n)} (${geno(t,i)})</option>`).join(''); s.value=String(j===0?1:(t.dominant?0:1)); });
    calc();
  }
  function calc(){
    const t=TRAITS[tSel.value], a=+p1.value, b=+p2.value;
    const gam=n=> n===0?[0,0]:n===1?[0,1]:[1,1];
    const ga=gam(a), gb=gam(b), al=v=>v?t.V:t.N;
    let h=`<div class="h"></div>${gb.map(v=>`<div class="h">${al(v)}</div>`).join('')}`;
    const tally=[0,0,0];
    ga.forEach(x=>{ h+=`<div class="h">${al(x)}</div>`; gb.forEach(y=>{ const n=x+y; tally[n]++;
      h+=`<div class="cell"><span class="ix-sw sw-${t.sw[n]}" aria-hidden="true"></span><code>${geno(t,n)}</code><span>${esc(t.names[n])}</span></div>`; }); });
    grid.innerHTML=h;
    const ph=[0,0]; tally.forEach((c,n)=>ph[isVariant(t,n)?1:0]+=c);
    res.innerHTML=ph.map((c,i)=>c?`<div><b>${c*25}%</b><span class="ix-sw sw-${t.sw[i?2:0]}" aria-hidden="true"></span>${esc(t.ph[i])} cubs</div>`:'').join('')
      + `<div style="color:var(--muted);font-size:.85rem">Gene: <i class="g">${t.gene}</i> · the ${t.dominant?'black allele is dominant, so one copy is enough':'variant is recessive, so a cub needs two copies'}. Real litters are small, so actual cub counts vary.</div>`;
    src.textContent='Source: '+t.src;
  }
  tSel.addEventListener('change',fillParents); p1.addEventListener('change',calc); p2.addEventListener('change',calc);
  fillParents();
}

/* ---------- phone helpers: table labels and nav that follows you ---------- */
document.querySelectorAll('.tbl table').forEach(tb=>{
  const heads=[...tb.querySelectorAll('thead th')].map(th=>th.textContent.trim());
  tb.querySelectorAll('tbody tr').forEach(tr=>[...tr.children].forEach((td,i)=>{ if(heads[i]) td.setAttribute('data-label',heads[i]); }));
});
const navUl=document.querySelector('nav.tracks ul');
if(navUl){
  const keepVisible=()=>{ const a=navUl.querySelector('a.on'); if(!a) return; const l=a.offsetLeft, r=l+a.offsetWidth;
    if(l<navUl.scrollLeft+8 || r>navUl.scrollLeft+navUl.clientWidth-48) navUl.scrollTo({left:Math.max(0,l-16),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); };
  new MutationObserver(keepVisible).observe(navUl,{subtree:true,attributes:true,attributeFilter:['class']});
}
/* ---------- 4. Quiz ---------- */
const QUIZ=[
 ['How many chromosomes do lions and tigers have?',['36','38','44','46'],1,'Panthera has 2n = 38, the same layout as the house cat. Only the ocelot lineage differs, with 36.'],
 ['What is a "black panther"?',['Its own species','A black leopard or black jaguar','A melanistic puma','A lion–leopard hybrid'],1,'Black panthers are leopards or jaguars with melanism, and their spots are still there under the dark coat.'],
 ['Which gene turns a tiger white?',['MC1R','ASIP','SLC45A2','TYR'],2,'A single change (A477V) in SLC45A2 blocks red and yellow pigment but leaves the black stripes (Xu et al. 2013).'],
 ['In which cat is the black coat dominant?',['Jaguar','Leopard','Both','Neither'],0,'Jaguar melanism comes from a dominant MC1R deletion. Leopard melanism is a recessive ASIP mutation.'],
 ['The tiger’s closest living relative is the…',['Lion','Jaguar','Snow leopard','Leopard'],2,'Tiger + snow leopard is the most stable pairing in every genome-scale study.'],
 ['About how much of a cheetah’s genome is homozygous?',['25%','50%','75%','95%'],3,'Ancient bottlenecks left cheetah genomes about 95% homozygous, versus about 24% in outbred house cats.'],
 ['The extinct "American cheetah" Miracinonyx was most closely related to the…',['Cheetah','Puma','Jaguar','Lion'],1,'Ancient DNA places Miracinonyx next to the puma. Its cheetah-like build evolved separately.'],
 ['Which genes make a lion roar?',['FOXP2','EPAS1','Taqpep','None are known'],3,'Roaring is explained by the larynx and large square vocal folds. No genes for it have been identified.']
];
const qHost=document.getElementById('ix-quiz');
if(qHost){
  qHost.className='ix-quiz';
  const score=el('div',{class:'ix-score','aria-live':'polite'});
  let answered=0, right=0;
  const upd=()=>{score.innerHTML=`<span>${answered} of ${QUIZ.length} answered · ${right} correct</span>`+(answered===QUIZ.length?`<span class="flag ok">${right===QUIZ.length?'Perfect score':right>=6?'Well done':'Keep exploring'}</span>`:'')+`<button type="button" class="chip" id="quiz-reset">Start over</button>`;
    score.querySelector('#quiz-reset').addEventListener('click',build);};
  function build(){
    qHost.innerHTML=''; answered=0; right=0;
    QUIZ.forEach((q,qi)=>{
      const c=el('div',{class:'card ix-q'});
      c.appendChild(el('h3',null,`${qi+1}. ${esc(q[0])}`));
      const opts=el('div',{class:'opts',role:'group','aria-label':'Answers'});
      const why=el('p',{class:'why'}); why.hidden=true;
      q[1].forEach((o,oi)=>{
        const b=el('button',{type:'button',class:'chip',id:`q${qi}-${oi}`},esc(o));
        b.addEventListener('click',()=>{
          opts.querySelectorAll('button').forEach((x,xi)=>{x.disabled=true; if(xi===q[2]){x.classList.add('ix-right'); x.textContent='✓ '+q[1][xi];}});
          const ok=oi===q[2]; if(!ok){b.classList.add('ix-wrong'); b.textContent='✗ '+o;}
          answered++; if(ok) right++;
          why.innerHTML=`<b>${ok?'Correct.':'Not quite.'}</b> ${esc(q[3])}`; why.hidden=false; upd();
        });
        opts.appendChild(b);
      });
      c.appendChild(opts); c.appendChild(why); qHost.appendChild(c);
    });
    qHost.appendChild(score); upd();
  }
  build();
}
})();
